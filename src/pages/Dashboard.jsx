import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple toast notification component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white z-50 transition-opacity duration-300`}>
      {message}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "User", balance: 0 });
  const [balance, setBalance] = useState(0);
  const [nextMineTime, setNextMineTime] = useState(null);
  const [canMine, setCanMine] = useState(true);
  const [timeLeft, setTimeLeft] = useState('Ready to mine!');
  const [isLoading, setIsLoading] = useState(false);
  const [miningCountdown, setMiningCountdown] = useState(null);
  const [isMining, setIsMining] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Hide toast notification
  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user data from API using the token
    fetchUserData(token);
  }, [navigate]);

  // Fetch user data from API
  const fetchUserData = async (token) => {
    try {
      // Log the token to verify it exists and has a proper format
      console.log('Using token:', token);
      
      const response = await fetch('http://localhost:8080/user', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('User data response:', data);
      
      if (data.success) {
        const userData = data.user;
        setUser(userData);
        setBalance(userData.balance);
        
        if (userData.nextMineTime) {
          setNextMineTime(new Date(userData.nextMineTime));
          
          // Check if user can mine now
          const now = new Date().getTime();
          const mineTime = new Date(userData.nextMineTime).getTime();
          setCanMine(now >= mineTime);
        } else {
          setCanMine(true);
        }
      } else {
        console.error('Failed to fetch user data:', data.message);
        showToast(data.message || "Failed to fetch user data", "error");
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      
      // If unauthorized or token expired
      if (error.message && error.message.includes('401')) {
        localStorage.removeItem('token');
        showToast("Session expired. Please login again.", "error");
        navigate('/login');
        return;
      }
      
      // Fallback to localStorage for nextMineTime if API call fails
      const storedNextMineTime = localStorage.getItem('nextMineTime');
      if (storedNextMineTime) {
        setNextMineTime(new Date(storedNextMineTime));
        
        // Check if user can mine now
        const now = new Date().getTime();
        const mineTime = new Date(storedNextMineTime).getTime();
        setCanMine(now >= mineTime);
      } else {
        setCanMine(true);
      }

      showToast("Failed to connect to server. Using cached data.", "error");
    }
  };

  // Timer for cooldown countdown
  useEffect(() => {
    const timer = setInterval(() => {
      if (nextMineTime) {
        const now = new Date().getTime();
        const mineTime = new Date(nextMineTime).getTime();
        const difference = mineTime - now;
        
        if (difference <= 0) {
          setCanMine(true);
          setTimeLeft('Ready to mine!');
        } else {
          setCanMine(false);
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [nextMineTime]);

  // Mining countdown timer
  useEffect(() => {
    let countdownTimer;
    if (isMining && miningCountdown !== null) {
      countdownTimer = setInterval(() => {
        setMiningCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            completeMining();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownTimer) clearInterval(countdownTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMining, miningCountdown]);

  const startMining = () => {
    if (!canMine || isMining) return; // Prevent duplicate mining
    setIsMining(true);
    setMiningCountdown(10); // 10 second countdown
  };

  const completeMining = async () => {
    if (isLoading) return; // Prevent duplicate calls
    
    setIsLoading(true);
    
    const token = localStorage.getItem('token');
    if (!token) {
      showToast("Authentication token missing. Please login again.", "error");
      setIsLoading(false);
      setIsMining(false);
      navigate('/login');
      return;
    }
    
    try {
      // Make API call to the backend mining endpoint
      console.log('Sending mining request with token:', token);
      
      const response = await fetch('http://localhost:8080/mine', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Mining request failed:', response.status, errorText);
        throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Mining response:', data);
      
      if (data.success) {
        setBalance(data.newBalance);
        setNextMineTime(new Date(data.nextMineTime));
        localStorage.setItem('nextMineTime', data.nextMineTime);
        setCanMine(false);
        showToast(data.message, "success");
      } else {
        showToast(data.message || "Mining failed", "error");
      }
    } catch (error) {
      console.error('Mining error:', error);
      
      // Check if unauthorized
      if (error.message && error.message.includes('401')) {
        localStorage.removeItem('token');
        showToast("Session expired. Please login again.", "error");
        navigate('/login');
      } else {
        showToast("Mining failed. Server error or network issue.", "error");
      }
    } finally {
      setIsLoading(false);
      setIsMining(false);
    }
  };

  const handleLogout = () => {
    // Clear all relevant localStorage items
    localStorage.removeItem('token');
    localStorage.removeItem('nextMineTime');
    
    // Show toast notification
    showToast("Logged out successfully", "success");
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate('/login');
    }, 1000); // 1 second delay to allow toast to be seen
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-800 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-800 p-4">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Coin Miner Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 shadow-2xl backdrop-blur-sm mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl text-gray-300">Welcome back,</h2>
              <p className="text-2xl font-bold text-white">{user.username}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl text-gray-300">Your Balance</h2>
              <p className="text-3xl font-bold text-yellow-400">{balance} Coins</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6">Mine Coins</h2>
          
          {isMining ? (
            <div className="bg-gray-700 bg-opacity-70 rounded-xl p-8 mb-6 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Mining in Progress</h3>
              <div className="w-full bg-gray-600 rounded-full h-4 mb-4">
                <div
                  className="bg-yellow-500 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${((10 - miningCountdown) / 10) * 100}%` }}
                ></div>
              </div>
              <p className="text-4xl font-bold text-white">{miningCountdown}</p>
              <p className="text-gray-300 mt-2">Wait {miningCountdown} seconds to mine your coin</p>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl text-gray-300">Next Mining Available:</h3>
                <p className="text-2xl font-bold text-white">
                  {canMine ? 'Ready to mine now!' : timeLeft}
                </p>
              </div>
              
              <button
                onClick={startMining}
                disabled={!canMine || isLoading}
                className={`px-8 py-4 rounded-lg font-bold text-lg transition ${
                  !canMine || isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-yellow-600 hover:bg-yellow-700 animate-pulse'
                } text-white`}
              >
                {isLoading ? 'Mining...' : canMine ? 'Mine Coin' : 'Wait Time Remaining'}
              </button>
            </div>
          )}
          
          <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
            <p className="text-gray-300">
              Mining process: Wait 10 seconds to mine 1 coin. After mining, there's a 12-hour cooldown before you can mine again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;