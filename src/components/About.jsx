import { motion } from 'framer-motion'
import React from 'react'

const About = () => {
    return (
        <>
            <section id="about" className="container mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Cryvix Coin?</h2>
                    <div className="w-20 h-1 bg-cyan-500 mx-auto"></div>
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
                            className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-300">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    )
}
export default About