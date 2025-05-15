import React from 'react'
import { motion } from 'framer-motion'
const Stats = () => {
    return (
        <>
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-800/50 py-12"
            >
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 rounded-xl bg-gray-900/50">
                            <div className="text-4xl font-bold text-cyan-400 mb-2">1.5M+</div>
                            <div className="text-gray-300">Coins Mined</div>
                        </div>
                        <div className="p-6 rounded-xl bg-gray-900/50">
                            <div className="text-4xl font-bold text-cyan-400 mb-2">50K+</div>
                            <div className="text-gray-300">Active Miners</div>
                        </div>
                        <div className="p-6 rounded-xl bg-gray-900/50">
                            <div className="text-4xl font-bold text-cyan-400 mb-2">100%</div>
                            <div className="text-gray-300">Uptime Guarantee</div>
                        </div>
                    </div>
                </div>
            </motion.section>

        </>
    )
}

export default Stats
