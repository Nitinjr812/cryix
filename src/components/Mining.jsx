import React from 'react';
import { motion } from 'framer-motion';

const miningBenefits = [
  {
    icon: '⏱️',
    title: "12-Hour Mining Cycles",
    description: "Earn 1 CRYV automatically every 12 hours - balances update instantly after each cycle"
  },
  {
    icon: '🚀',
    title: "Early Growth Potential",
    description: "Get in before public launch for maximum rewards as value grows"
  },
  {
    icon: '👥',
    title: "Powerful Referrals",
    description: "Earn 15% of what friends mine for 72 hours - no limits!"
  },
  {
    icon: '☁️',
    title: "Cloud-Based",
    description: "No hardware needed - mine directly from any device"
  },
  {
    icon: '⚡',
    title: "Instant Withdrawals",
    description: "Withdraw your CRYV anytime with no waiting periods"
  }
];

const Mining = () => {
  return (
    <section id="mining" className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            Mine CRYV With Just One Click
          </motion.h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Start earning CRYV coins now and benefit from early adopter rewards before public launch
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {miningBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-400/30 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400">{benefit.title}</h3>
              <p className="text-gray-300 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-3 text-white">How It Works</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
              {[
                { step: "1", text: "Click Start Mining" },
                { step: "2", text: "Earn 1 CRYV every 12h" },
                { step: "3", text: "Invite friends for bonuses" },
                { step: "4", text: "Withdraw anytime" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border border-cyan-400/20"
                >
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </div>
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-white shadow-lg shadow-cyan-500/30"
          >
            <span className="relative z-10">Start Mining Now</span>
            <motion.span
              animate={{
                x: [-100, 100],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 left-0 w-20 h-full bg-white/20 skew-x-12"
            />
          </motion.button>

          <p className="text-gray-400 text-sm mt-4">
            Your first CRYV will be available in your wallet after 12 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mining;