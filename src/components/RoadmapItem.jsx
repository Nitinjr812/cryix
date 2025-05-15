import React from 'react'
import { motion } from 'framer-motion'

const RoadmapItem = () => {
    const roadmapData = [
        {
            phase: "Phase 1",
            title: "Pre-Mining Launch",
            date: "Q1 2023",
            desc: "Initial launch of Cryvix Coin with pre-mining phase for early adopters.",
            status: "current"
        },
        {
            phase: "Phase 2",
            title: "Wallet Development",
            date: "Q2 2026-2027",
            desc: "Release of official Cryvix Wallet for secure storage and transactions.",
            status: "upcoming"
        },
        {
            phase: "Phase 3",
            title: "Exchange Listings",
            date: "Q3 2027",
            desc: "Listing on major cryptocurrency exchanges for public trading.",
            status: "upcoming"
        },
        {
            phase: "Phase 4",
            title: "Merchant Adoption",
            date: "Q4 2027",
            desc: "Partnerships with online merchants to accept Cryvix as payment.",
            status: "upcoming"
        },
        {
            phase: "Phase 5",
            title: "Mobile App Launch",
            date: "Q1 2028",
            desc: "Full-featured mobile application for mining and transactions.",
            status: "upcoming"
        }
    ];

    return (
        <section id="roadmap" className="container mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Roadmap</h2>
                <div className="w-20 h-1 bg-cyan-500 mx-auto"></div>
            </motion.div>

            <div className="relative">
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 to-blue-600"></div>

                {roadmapData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`mb-8 md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                    >
                        <div className="md:w-1/2 md:px-8 mb-4 md:mb-0">
                            <div className={`p-6 rounded-xl ${item.status === 'current' ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30' : 'bg-gray-800/50'} relative`}>
                                <div className="absolute -top-3 left-4 bg-cyan-500 text-xs font-bold px-3 py-1 rounded-full">
                                    {item.phase}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <div className="text-cyan-400 mb-3">{item.date}</div>
                                <p className="text-gray-300">{item.desc}</p>
                                {item.status === 'current' && (
                                    <div className="absolute -right-3 -top-3 flex h-6 w-6">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-6 w-6 bg-cyan-500"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="hidden md:block md:w-1/2"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default RoadmapItem