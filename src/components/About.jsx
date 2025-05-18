import { motion } from 'framer-motion'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom' // or use Next.js Link if applicable

const About = () => {
    return (
        <section id="about" className="container mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Cryvix Coin?</h2>
                <div className="w-20 h-1 bg-cyan-500 mx-auto mb-8"></div>
                <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                    Discover the future of cryptocurrency with Cryvix Coin's revolutionary technology.
                </p>
                
                {/* Learn More Button with Arrow Icon */}
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                >
                    <Link 
                        to="/about" // Change this to your actual about page route
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                    >
                        Learn More About Us
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <FaArrowRight className="text-sm" />
                        </motion.span>
                    </Link>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        title: "Future-Proof Technology",
                        desc: "Built on a secure blockchain with advanced features that ensure longevity and scalability.",
                        icon: "🔮"
                    },
                    {
                        title: "High Growth Potential",
                        desc: "Early adopters benefit the most as Cryvix Coin gains mainstream adoption.",
                        icon: "📈"
                    },
                    {
                        title: "Easy Mining",
                        desc: "User-friendly mining process that doesn't require expensive hardware.",
                        icon: "⛏️"
                    },
                    {
                        title: "Limited Supply",
                        desc: "Fixed maximum supply creates scarcity and value appreciation.",
                        icon: "💰"
                    },
                    {
                        title: "Secure Transactions",
                        desc: "Military-grade encryption protects all transactions and holdings.",
                        icon: "🔒"
                    },
                    {
                        title: "Community Driven",
                        desc: "Decisions made by and for the community through transparent governance.",
                        icon: "👥"
                    }
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 hover:bg-gray-800/70 transition-all duration-300"
                    >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                        <p className="text-gray-300">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default About