import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 

// MongoDB connection and API endpoints would be set up separately
// This is just the frontend component

const Home2 = () => {
  const [miningStats, setMiningStats] = useState({
    totalMined: '10M+',
    activeMiners: '50K+',
    uptime: '100%'
  });

  const [userCount, setUserCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simulate fetching data from MongoDB
  useEffect(() => {
    // In a real app, you would fetch this from your API
    // Example:
    // fetch('/api/mining-stats')
    //   .then(res => res.json())
    //   .then(data => setMiningStats(data));
    
    // Simulated data
    const interval = setInterval(() => {
      setUserCount(prev => {
        const randomIncrement = Math.floor(Math.random() * 10);
        return prev + randomIncrement;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleStartMining = async () => {
    // In a real app, you would call your API endpoint
    // Example:
    // try {
    //   const response = await fetch('/api/start-mining', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ userId: '123' }),
    //   });
    //   const data = await response.json();
    //   console.log('Mining started:', data);
    // } catch (error) {
    //   console.error('Error starting mining:', error);
    // }
    
    alert('Mining session started! (This would connect to your MongoDB in production)');
  };

  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
        
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Cryvix Coin
              </span>
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
              <a href="#mining" className="text-gray-300 hover:text-white transition">Mining</a>
              <a href="#roadmap" className="text-gray-300 hover:text-white transition">Roadmap</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition">FAQ</a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartMining}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-full font-medium text-sm"
              >
                Start Mining
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-3"
            >
              <a href="#about" className="block text-gray-300 hover:text-white transition">About</a>
              <a href="#mining" className="block text-gray-300 hover:text-white transition">Mining</a>
              <a href="#roadmap" className="block text-gray-300 hover:text-white transition">Roadmap</a>
              <a href="#faq" className="block text-gray-300 hover:text-white transition">FAQ</a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartMining}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-full font-medium text-sm"
              >
                Start Mining
              </motion.button>
            </motion.div>
          )}
        </nav>

        {/* Hero Section - Optimized for mobile */}
        <section className="container mx-auto px-4 py-12 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-bold leading-tight mb-4"
              >
                The Next Generation <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Cryptocurrency</span>
              </motion.h1>
              <p className="text-lg text-gray-300 mb-6">
                Cryvix Coin is the future of digital currency. Mine now and secure your position in the upcoming financial revolution.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartMining}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full font-medium text-sm md:text-base"
                >
                  Start Pre-Mining
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-full font-medium text-sm md:text-base"
                >
                  Learn More
                </motion.button>
              </div>
              <div className="mt-6 text-gray-400 text-sm">
                <p>Join {userCount.toLocaleString()}+ early miners today</p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/20">
                  <div className="w-40 h-40 md:w-56 md:h-56 bg-gray-900 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl md:text-4xl font-bold mb-1">CRYVIX</div>
                      <div className="text-sm md:text-lg text-cyan-300">COIN</div>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-full border-2 border-dashed border-cyan-400/30 rounded-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-800/50 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: miningStats.totalMined, label: "Coins Mined" },
                { value: miningStats.activeMiners, label: "Active Miners" },
                { value: miningStats.uptime, label: "Uptime" }
              ].map((stat, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-900/50">
                  <div className="text-xl md:text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Simplified for mobile */}
        <section id="about" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Choose Cryvix Coin?</h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Future-Proof Tech",
                desc: "Secure blockchain with advanced features for longevity.",
                icon: "🔮"
              },
              {
                title: "High Growth",
                desc: "Early adopters benefit most from adoption.",
                icon: "📈"
              },
              {
                title: "Easy Mining",
                desc: "No expensive hardware needed.",
                icon: "⛏️"
              },
              {
                title: "Limited Supply",
                desc: "Fixed supply creates scarcity and value.",
                icon: "💰"
              },
              {
                title: "Secure",
                desc: "Military-grade encryption for all transactions.",
                icon: "🔒"
              },
              {
                title: "Community",
                desc: "Transparent community governance.",
                icon: "👥"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mining Section - Optimized for mobile */}
        <section id="mining" className="bg-gray-800/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Start Mining Cryvix Today</h2>
              <div className="w-16 h-1 bg-cyan-500 mx-auto"></div>
            </div>

            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h3 className="text-xl font-bold mb-3">Simple Pre-Mining</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Join pre-mining to accumulate Cryvix Coins before public launch.
                </p>
                <ul className="space-y-3">
                  {[
                    "No expensive hardware",
                    "Cloud-based solution",
                    "Real-time stats",
                    "Instant withdrawals",
                    "Referral bonuses"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/2 bg-gray-900/50 p-6 rounded-xl border border-gray-700/50 w-full">
                <h3 className="text-xl font-bold mb-4 text-center">Mining Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Hashrate (MH/s)</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Mining Time (hours/day)</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="24" 
                      defaultValue="12" 
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" 
                    />
                  </div>
                  <div className="pt-4 border-t border-gray-700 text-sm">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Daily Earnings:</span>
                      <span className="font-bold text-cyan-400">24.5 CRYV</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Monthly:</span>
                      <span className="font-bold text-cyan-400">735 CRYV</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Yearly:</span>
                      <span className="font-bold text-cyan-400">8,925 CRYV</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStartMining}
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 py-2 rounded-lg font-medium text-sm"
                >
                  Start Mining Now
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section - Simplified for mobile */}
        <section id="roadmap" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Roadmap</h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto"></div>
          </div>

          <div className="space-y-6">
            {[
              {
                phase: "Phase 1",
                title: "Pre-Mining Launch",
                date: "Q1 2023",
                desc: "Initial launch with pre-mining for early adopters.",
                status: "completed"
              },
              {
                phase: "Phase 2",
                title: "Wallet Development",
                date: "Q2 2023",
                desc: "Official Cryvix Wallet release.",
                status: "completed"
              },
              {
                phase: "Phase 3",
                title: "Exchange Listings",
                date: "Q3 2023",
                desc: "Listing on major crypto exchanges.",
                status: "current"
              },
              {
                phase: "Phase 4",
                title: "Merchant Adoption",
                date: "Q4 2023",
                desc: "Partnerships with online merchants.",
                status: "upcoming"
              },
              {
                phase: "Phase 5",
                title: "Mobile App",
                date: "Q1 2024",
                desc: "Mobile app for mining and transactions.",
                status: "upcoming"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`p-5 rounded-xl ${item.status === 'current' ? 
                  'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30' : 
                  'bg-gray-800/50'} relative`}
              >
                <div className="absolute -top-3 left-4 bg-cyan-500 text-xs font-bold px-2 py-1 rounded-full">
                  {item.phase}
                </div>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <div className="text-cyan-400 text-sm mb-2">{item.date}</div>
                <p className="text-gray-300 text-sm">{item.desc}</p>
                {item.status === 'current' && (
                  <div className="absolute -right-2 -top-2 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-cyan-500"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Cryvix Revolution</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm md:text-base">
              Start mining Cryvix Coin today and secure your financial future.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartMining}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full font-medium text-sm md:text-base shadow-lg shadow-cyan-500/20"
            >
              Start Mining Now - It's Free!
            </motion.button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900/80 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-2">
                  <span className="font-bold text-lg">C</span>
                </div>
                <span className="text-xl font-bold">Cryvix Coin</span>
              </div>
              <div className="flex space-x-4 mb-4 md:mb-0">
                {['facebook', 'twitter', 'instagram', 'github'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition">
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {/* Simplified social icons */}
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                ))}
              </div>
              <div className="text-gray-400 text-xs md:text-sm">
                &copy; {new Date().getFullYear()} Cryvix Coin. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home2;