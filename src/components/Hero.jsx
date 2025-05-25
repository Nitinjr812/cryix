import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AdsterraBanner from './AdsterraBanner'

const Hero = () => {
    const go = useNavigate()
    const [isFlipped, setIsFlipped] = useState(false)
    const handle = () => {
        go("/register")
    }
    
    const toggleFlip = () => {
        setIsFlipped(!isFlipped)
    }
    
    return (
        <>
            <section className="container mx-auto px-6 py-20 md:py-32">
                <div className="flex flex-col md:flex-row items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 mb-10 md:mb-0"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                            The Next Generation <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Cryptocurrency</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Cryvix Coin is the future of digital currency. Mine now and secure your position in the upcoming financial revolution.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-full font-medium text-lg"
                                onClick={handle}
                            >
                                Start Pre-Mining
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 flex justify-center"
                    >
                        <div className="relative">
                            <motion.div
                                whileHover={{ rotateY: isFlipped ? 0 : 180 }}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6 }}
                                className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/30 cursor-pointer"
                                style={{
                                    transformStyle: 'preserve-3d',
                                }}
                                onClick={toggleFlip}
                            >
                                {/* Front side - CRYVIX COIN text */}
                                <motion.div
                                    className="absolute w-full h-full flex items-center justify-center backface-hidden"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                    }}
                                >
                                    <div className="w-56 h-56 md:w-72 md:h-72 bg-gray-900 rounded-full flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-4xl md:text-5xl font-bold mb-2">CRYVIX</div>
                                            <div className="text-lg text-cyan-300">COIN</div>
                                        </div>
                                    </div>
                                </motion.div>
                                
                                {/* Back side - Logo */}
                                <motion.div
                                    className="absolute w-full h-full flex items-center justify-center backface-hidden"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)',
                                    }}
                                >
                                    <div className="w-56 h-56 md:w-72 md:h-72 bg-gray-900 rounded-full flex items-center justify-center p-0">
                                        <img 
                                            src="/fawicon (2).png" 
                                            alt="Cryvix Coin Logo"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                            
                            <motion.div
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute top-0 left-0 w-full h-full border-2 border-dashed border-cyan-400/30 rounded-full pointer-events-none"
                            ></motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
            <AdsterraBanner/>
        </>
    )
}

export default Hero