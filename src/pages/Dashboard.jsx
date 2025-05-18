import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Enhanced toast notification component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-xl ${type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
      } text-white z-50 transition-all duration-300 transform`}>
      <div className="flex items-center">
        <span className="mr-2">
          {type === 'success' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </span>
        {message}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "User",
    balance: 0,
    referralCode: "",
    referrals: []
  });
  const [balance, setBalance] = useState(0);
  const [nextMineTime, setNextMineTime] = useState(null);
  const [canMine, setCanMine] = useState(true);
  const [timeLeft, setTimeLeft] = useState('Ready to mine!');
  const [isLoading, setIsLoading] = useState(false);
  const [miningCountdown, setMiningCountdown] = useState(null);
  const [isMining, setIsMining] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [activeTab, setActiveTab] = useState('mine'); // 'mine' or 'referral'
  const [referralURL, setReferralURL] = useState('');
  const [copied, setCopied] = useState(false);

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

      const response = await fetch('https://cryix-backend.vercel.app/user', {
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

        // Create referral URL
        const baseURL = window.location.origin;
        setReferralURL(`${baseURL}/register?ref=${userData.referralCode}`);

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

      const response = await fetch('https://cryix-backend.vercel.app/mine', {
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

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralURL).then(() => {
      setCopied(true);
      showToast("Referral link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      showToast("Failed to copy referral link", "error");
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nextMineTime');

    showToast("Logged out successfully", "success");

    setTimeout(() => {
      navigate('/login');
    }, 1000); // 1 second delay to allow toast to be seen
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-400 rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-medium text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-900 p-4 md:p-6">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img className='h-20 w-20 ' src="/fawicon (2).png" alt="" />
            <h1 className="text-3xl font-bold text-white tracking-tight">Cryvix</h1>
          </div>
          
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 md:p-8 shadow-2xl backdrop-blur-sm mb-6 border border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl text-gray-300">Welcome </h2>
              <p className="text-2xl md:text-3xl font-bold text-white mt-1">{user.username}</p>
            </div>
            <div className="text-center md:text-right">
              <h2 className="text-xl text-gray-300">Your Balance</h2>
              <div className="flex items-center justify-center md:justify-end mt-1">
                <img className='w-16 h-16 ml-3.5' src="/fawicon (2).png" alt="" />
                <p className="text-3xl md:text-4xl font-bold text-yellow-400">{balance.toFixed(1)} <span className="text-xl">Coins</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab('mine')}
            className={`px-4 py-3 rounded-t-lg text-white font-medium flex-1 flex justify-center items-center transition-all duration-200 ${activeTab === 'mine'
              ? 'bg-gray-800 bg-opacity-80 border-t-2 border-l border-r border-blue-500'
              : 'bg-gray-800 bg-opacity-30 hover:bg-opacity-50 border-b border-gray-700'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Mine Coins
          </button>
          <button
            onClick={() => setActiveTab('referral')}
            className={`px-4 py-3 rounded-t-lg text-white font-medium flex-1 flex justify-center items-center transition-all duration-200 ${activeTab === 'referral'
              ? 'bg-gray-800 bg-opacity-80 border-t-2 border-l border-r border-green-500'
              : 'bg-gray-800 bg-opacity-30 hover:bg-opacity-50 border-b border-gray-700'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            Referral Program
          </button>
        </div>

        {/* Mining Tab */}
        {activeTab === 'mine' && (
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 md:p-8 shadow-2xl backdrop-blur-sm border border-gray-700">
            <div className="flex items-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <h2 className="text-2xl font-bold text-white">Mine Coins</h2>
            </div>

            {isMining ? (
              <div className="bg-gray-900 bg-opacity-80 rounded-xl p-8 mb-6 text-center border border-blue-900">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Mining in Progress</h3>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${((10 - miningCountdown) / 10) * 100}%` }}
                  ></div>
                </div>
                <p className="text-5xl font-bold text-white my-6">{miningCountdown}</p>
                <div className="flex justify-center">
                  <div className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 inline-block">
                    Wait {miningCountdown} seconds to mine your coin
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800">
                <div>
                  <h3 className="text-xl text-gray-300 mb-2">Next Mining Available:</h3>
                  <p className="text-2xl font-bold text-white">
                    {canMine ? (
                      <span className="text-green-400">Ready to mine now!</span>
                    ) : (
                      <span>{timeLeft}</span>
                    )}
                  </p>
                </div>

                <button
                  onClick={startMining}
                  disabled={!canMine || isLoading}
                  className={`mt-4 md:mt-0 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg ${!canMine || isLoading
                    ? 'bg-gray-600 cursor-not-allowed opacity-70'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl animate-pulse'
                    } text-white flex items-center justify-center w-full md:w-auto`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mining...
                    </>
                  ) : canMine ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mine Coin
                    </>
                  ) : (
                    'Wait Time Remaining'
                  )}
                </button>
              </div>
            )}

            <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 border border-gray-800">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-300">
                  Mining process: Wait 10 seconds to mine 1 coin. After mining, there's a 12-hour cooldown before you can mine again.
                  {user.miningBonus > 0 && (
                    <span className="text-yellow-400 ml-2 block mt-2">
                      <span className="font-bold">Bonus:</span> Your referral bonus gives you +{user.miningBonus} coins per mining!
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Referral Tab */}
        {activeTab === 'referral' && (
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 md:p-8 shadow-2xl backdrop-blur-sm border border-gray-700">
            <div className="flex items-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <h2 className="text-2xl font-bold text-white">Referral Program</h2>
            </div>

            <div className="bg-gray-900 bg-opacity-80 rounded-xl p-6 mb-6 border border-green-900">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your Referral Code
              </h3>
              <div className="bg-gray-800 p-5 rounded-lg flex flex-col sm:flex-row justify-between items-center mb-4 border border-gray-700">
                <span className="text-3xl font-mono font-bold text-white mb-3 sm:mb-0">{user.referralCode}</span>
                <button
                  onClick={copyReferralLink}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
              <p className="text-gray-300 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                Share your referral link with friends:
              </p>
              <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto whitespace-nowrap mb-4 border border-gray-700 shadow-inner">
                <span className="text-green-400 font-mono select-all">{referralURL}</span>
              </div>
              <div className="bg-green-900 bg-opacity-20 p-4 rounded-lg border border-green-800">
                <p className="text-gray-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Earn <span className="text-yellow-400 font-bold">5 coins</span> for each friend who joins using your referral code!</span>
                </p>
              </div>
            </div>

            <div className="bg-gray-900 bg-opacity-80 rounded-xl p-6 border border-green-900">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Your Referrals
              </h3>

              {user.referrals && user.referrals.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full  bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                    <thead>
                      <tr className="bg-gray-900 border-b border-gray-700">
                        <th className="py-3 px-4 text-left text-gray-300 font-semibold">Username</th>
                        <th className="py-3 px-4 text-left text-gray-300 font-semibold">Balance</th>
                        <th className="py-3 px-4 text-left text-gray-300 font-semibold">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.referrals.map((referral, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-750 bg-opacity-50"}>
                          <td className="py-3 px-4 text-white font-medium">{referral.username}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">

                              <span className="text-yellow-400 font-medium">{referral.balance} Coins</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-300">{formatDate(referral.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-800 p-8 rounded-lg text-center border border-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-300 font-medium text-lg">You haven't referred anyone yet.</p>
                  <p className="text-gray-400 mt-2">Share your referral code to start earning rewards!</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 mt-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Referral Benefits
              </h3>
              <ul className="space-y-3 mt-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">You earn <span className="text-yellow-400 font-medium">5 coins</span> for each friend who joins</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Your friends get a <span className="text-yellow-400 font-medium">+0.2 coin mining bonus</span> on every mine</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">No limit to how many friends you can refer!</span>
                </li>
              </ul>
            </div>

            {user.referredBy && (
              <div className="bg-green-900 bg-opacity-20 rounded-lg p-6 mt-6 border border-green-800">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-gray-300">
                      You were referred by: <span className="text-white font-medium">{user.referredBy.username}</span>
                    </p>
                    <p className="text-yellow-400 mt-2 font-medium">
                      You earn +{user.miningBonus} additional coins per mining operation!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <button
            onClick={handleLogout}
            className="px-4 mt-9 m-auto py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 flex items-center shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
    </div>
  );
};

export default Dashboard;