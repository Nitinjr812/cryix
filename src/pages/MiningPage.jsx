import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MiningPage = () => {
    const [isReadyToMine, setIsReadyToMine] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [cooldown, setCooldown] = useState(0);
    const [balance, setBalance] = useState(0);
    const [isMining, setIsMining] = useState(false);
    const [miningComplete, setMiningComplete] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [authForm, setAuthForm] = useState({ username: '', password: '' });
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0')
        ].join(':');
    };

    const startActivationCountdown = () => {
        setCountdown(10);
        setIsReadyToMine(false);
    };

    const handleMine = async () => {
        if (!isReadyToMine || isMining) return;

        setIsMining(true);
        try {
            const response = await axios.post('/api/mining/mine', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setBalance(response.data.newBalance);
            setMiningComplete(true);
            setCooldown(12 * 60 * 60); // 12 hours in seconds
        } catch (error) {
            console.error('Error mining:', error);
            if (error.response?.status === 401) {
                handleLogout();
            }
        } finally {
            setIsMining(false);
        }
    };

    // Check auth status on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkAuthStatus();
        }
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setIsAuthenticated(true);
            setBalance(response.data.balance);
            setShowLogin(false);
            checkMiningStatus();
        } catch (error) {
            localStorage.removeItem('token');
            setShowLogin(true);
        }
    };

    const checkMiningStatus = async () => {
        try {
            const response = await axios.get('/api/mining/status', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setBalance(response.data.balance);

            if (response.data.lastMined) {
                const twelveHoursInMs = 12 * 60 * 60 * 1000;
                const nextMineTime = new Date(response.data.lastMined).getTime() + twelveHoursInMs;
                const now = new Date().getTime();

                if (now < nextMineTime) {
                    setCooldown(Math.floor((nextMineTime - now) / 1000));
                } else {
                    startActivationCountdown();
                }
            } else {
                startActivationCountdown();
            }
        } catch (error) {
            console.error('Error checking mining status:', error);
            startActivationCountdown();
        }
    };

    useEffect(() => {
        if (countdown > 0 && !isReadyToMine) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && !isReadyToMine) {
            setIsReadyToMine(true);
        }
    }, [countdown, isReadyToMine]);

    // Handle cooldown timer
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (cooldown === 0 && miningComplete) {
            setMiningComplete(false);
            startActivationCountdown();
        }
    }, [cooldown, miningComplete]);

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
            const response = await axios.post(endpoint, authForm);

            localStorage.setItem('token', response.data.token);
            setBalance(response.data.balance);
            setIsAuthenticated(true);
            setShowLogin(false);
            checkMiningStatus();
        } catch (error) {
            alert(error.response?.data?.message || 'Authentication failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setShowLogin(true);
    };


    if (showLogin) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        {isRegister ? 'Create Account' : 'Login to Mine'}
                    </h2>

                    <form onSubmit={handleAuth}>
                        <div className="mb-4">
                            <label className="block text-gray-400 mb-2">Username</label>
                            <input
                                type="text"
                                value={authForm.username}
                                onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-400 mb-2">Password</label>
                            <input
                                type="password"
                                value={authForm.password}
                                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-2 rounded-lg font-medium mb-4"
                        >
                            {isRegister ? 'Register' : 'Login'}
                        </motion.button>

                        <p className="text-center text-gray-400">
                            {isRegister ? 'Already have an account? ' : 'Need an account? '}
                            <button
                                type="button"
                                onClick={() => setIsRegister(!isRegister)}
                                className="text-cyan-400 hover:underline"
                            >
                                {isRegister ? 'Login' : 'Register'}
                            </button>
                        </p>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            CRYVIX Mining Station
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-cyan-400 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                    <p className="text-xl text-gray-300">
                        Mine CRYV coins with just one click every 12 hours
                    </p>
                </motion.div>

                {/* Mining Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 shadow-lg shadow-cyan-500/10 mb-8"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Balance Display */}
                        <div className="text-center md:text-left">
                            <h3 className="text-lg text-gray-400 mb-2">Your Balance</h3>
                            <div className="text-4xl font-bold text-cyan-400">{balance.toFixed(2)} CRYV</div>
                        </div>

                        {/* Mining Button */}
                        <div className="flex flex-col items-center">
                            {cooldown > 0 ? (
                                <>
                                    <div className="text-gray-400 mb-2">Next mining available in:</div>
                                    <div className="text-2xl font-mono text-cyan-300">
                                        {formatTime(cooldown)}
                                    </div>
                                </>
                            ) : isReadyToMine ? (
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleMine}
                                    disabled={isMining}
                                    className={`px-12 py-4 rounded-full font-bold text-lg ${isMining
                                        ? 'bg-gray-600 text-gray-400'
                                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                                        }`}
                                >
                                    {isMining ? 'Mining...' : 'Mine Now'}
                                </motion.button>
                            ) : (
                                <>
                                    <div className="text-gray-400 mb-2">Activating mining in:</div>
                                    <div className="text-2xl font-mono text-cyan-300">
                                        {countdown.toString().padStart(2, '0')}s
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                >
                    {[
                        { title: "Mining Reward", value: "1.00 CRYV", icon: "💰" },
                        { title: "Cooldown", value: "12 Hours", icon: "⏳" },
                        { title: "Next Reward", value: miningComplete ? "Available in 12h" : "Ready to mine", icon: "⚡" },
                    ].map((stat, index) => (
                        <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <h3 className="text-gray-400 text-sm">{stat.title}</h3>
                            <p className="text-lg font-medium text-cyan-400">{stat.value}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Instructions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-gray-800/30 p-6 rounded-xl border border-gray-700"
                >
                    <h3 className="text-xl font-bold mb-4 text-cyan-400">How Mining Works</h3>
                    <ul className="space-y-3">
                        {[
                            "Click the 'Mine Now' button when available",
                            "Receive 1 CRYV instantly to your balance",
                            "12-hour cooldown period starts immediately",
                            "Return after cooldown to mine again",
                            "Invite friends to earn referral bonuses"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start">
                                <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default MiningPage;