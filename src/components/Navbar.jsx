import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Mining", href: "#mining" },
        { name: "Roadmap", href: "#roadmap" },
        { name: "FAQ", href: "#faq" }
    ];

    const handleLinkClick = (href) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between"> 
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                            <span className="font-bold text-xl">C</span>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Cryvix Coin
                        </span>
                    </motion.div> 
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.name}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-gray-300 hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer"
                                onClick={() => handleLinkClick(link.href)}
                            >
                                {link.name}
                            </motion.button>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full font-medium"
                            onClick={() => handleLinkClick("/mining")}
                        >
                            Start Mining
                        </motion.button>
                    </div>
 
                    <button
                        className="md:hidden text-gray-300 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="pt-4 pb-2 space-y-3">
                                {navLinks.map((link) => (
                                    <motion.button
                                        key={link.name}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full text-left px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-300 bg-transparent border-none cursor-pointer"
                                        onClick={() => handleLinkClick(link.href)}
                                    >
                                        {link.name}
                                    </motion.button>
                                ))}
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full font-medium mt-2"
                                    onClick={() => handleLinkClick("#mining")}
                                >
                                    Start Mining
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;