import { motion } from 'framer-motion'
import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

const Footer = () => {
    return (
        <footer className="bg-white/95 backdrop-blur-md border-t border-gray-100 py-8 md:py-12">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-10">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="col-span-2 md:col-span-1 space-y-4"
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                                <span className="font-bold text-xl text-white">C</span>
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-gray-800">Cryvix Coin</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            The next generation of cryptocurrency mining and blockchain technology.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h3 className="text-base md:text-lg font-semibold text-gray-800">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-500 hover:text-purple-600 transition-colors text-sm md:text-base">Home</a></li>
                            <li><a href="#about" className="text-gray-500 hover:text-purple-600 transition-colors text-sm md:text-base">About</a></li>
                            <li><a href="#mining" className="text-gray-500 hover:text-purple-600 transition-colors text-sm md:text-base">Mining</a></li>
                            <li><a href="#roadmap" className="text-gray-500 hover:text-purple-600 transition-colors text-sm md:text-base">Roadmap</a></li>
                            <li><a href="#faq" className="text-gray-500 hover:text-purple-600 transition-colors text-sm md:text-base">FAQ</a></li>
                        </ul>
                    </motion.div>

                    {/* Legal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-base md:text-lg font-semibold text-gray-800">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="/policy" className="text-gray-500 hover:text-purple-600 transition-colors text-sm md:text-base">Privacy Policy</a></li> 
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="col-span-2 md:col-span-1 space-y-4"
                    >
                        <h3 className="text-base md:text-lg font-semibold text-gray-800">Contact Us</h3>
                        <div className="flex items-start space-x-3">
                            <HiOutlineMail className="text-gray-400 mt-0.5 flex-shrink-0" />
                            <a href="mailto:cryvixinfo@gmail.com" className="text-gray-500 hover:text-purple-600 transition-colors text-sm md:text-base">
                                cryvixinfo@gmail.com
                            </a>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Our support team is available 24/7 to assist you.
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-gray-100 text-center md:text-left"
                >
                    <p className="text-gray-500 text-xs md:text-sm">
                        &copy; {new Date().getFullYear()} Cryvix Coin. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer