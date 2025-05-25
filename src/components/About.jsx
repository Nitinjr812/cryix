import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section id="about" className="container mx-auto px-6 py-20">
            {/* SEO-Optimized Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">About Cryvix Coin (CRVX)</h1>
                <div className="w-20 h-1 bg-cyan-500 mx-auto mb-8"></div>
                
                {/* Expanded Content with Keywords */}
                <div className="text-gray-300 max-w-4xl mx-auto mb-8 text-left space-y-4">
                    <p>
                        <strong>Cryvix Coin (CRVX)</strong> is a next-generation cryptocurrency designed for fast, 
                        secure transactions and energy-efficient mining. Unlike traditional coins like Bitcoin, 
                        Cryvix uses a hybrid Proof-of-Work/Proof-of-Stake system that reduces energy 
                        consumption by up to 70% while maintaining blockchain security.
                    </p>
                    <p>
                        Founded in 2023, Cryvix aims to solve three major crypto challenges: <strong>scalability</strong>, 
                        <strong> accessibility</strong>, and <strong>sustainability</strong>. Our unique algorithm allows users to mine CRVX 
                        on consumer-grade hardware, democratizing cryptocurrency mining.
                    </p>
                    <p>
                        With a fixed supply of <strong>21 million coins</strong> (mirroring Bitcoin's scarcity model), Cryvix Coin 
                        is positioned for long-term value appreciation. Over 50,000 miners already participate 
                        in our network, processing 5,000+ transactions daily.
                    </p>
                </div>

                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                >
                    <Link 
                        to="/about" 
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                    >
                        More About Us
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <FaArrowRight className="text-sm" />
                        </motion.span>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Features Section with Semantic HTML */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        title: "Future-Proof Blockchain",
                        desc: "Cryvix uses quantum-resistant encryption and sharding technology to ensure scalability beyond 100,000 TPS.",
                        icon: "🔮"
                    },
                    {
                        title: "Low-Cost Mining",
                        desc: "Mine CRVX with GPUs or even CPUs—no ASICs required. Average ROI for miners is 6 months.",
                        icon: "⛏️"
                    },
                    {
                        title: "Eco-Friendly Protocol",
                        desc: "Our PoS hybrid reduces energy use by 70% compared to Bitcoin's PoW system.",
                        icon: "🌱"
                    },
                    {
                        title: "Deflationary Model",
                        desc: "Built-in burning mechanism removes 0.5% of transaction fees from circulation.",
                        icon: "💰"
                    },
                    {
                        title: "Military-Grade Security",
                        desc: "Elliptic curve cryptography + zero-knowledge proofs protect all transactions.",
                        icon: "🔒"
                    },
                    {
                        title: "Governance DAO",
                        desc: "CRVX holders vote on protocol upgrades through our decentralized autonomous organization.",
                        icon: "🗳️"
                    }
                ].map((feature, index) => (
                    <motion.article
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 hover:bg-gray-800/70 transition-all duration-300"
                    >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h2 className="text-xl font-bold mb-3 text-white">{feature.title}</h2>
                        <p className="text-gray-300">{feature.desc}</p>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default About;