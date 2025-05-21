import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Mining", href: "#mining" },
        { name: "Roadmap", href: "#roadmap" },
        { name: "FAQ", href: "#faq" }
    ];

    const scrollToSection = (sectionId) => {
        // Remove the # from the beginning
        const id = sectionId.replace('#', '');
        const element = document.getElementById(id);

        if (element) {
            // Add a small delay to ensure DOM is ready
            setTimeout(() => {
                const yOffset = -80; // Navbar height offset
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }, 100);
        }
    };

    const handleLinkClick = (href) => {
        setIsOpen(false);

        if (href.startsWith('/')) {
            navigate(href);
        } else if (href.startsWith('#')) {
            if (location.pathname !== '/') {
                // Navigate to home and then scroll to the section
                navigate('/', { state: { scrollTo: href } });
            } else { 
                scrollToSection(href);
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            // Only run scroll detection on home page
            if (location.pathname !== '/') return;

            // Get all section elements
            const sections = [];
            navLinks.forEach(link => {
                if (link.href.startsWith('#')) {
                    const id = link.href.replace('#', '');
                    const section = document.getElementById(id);
                    if (section) sections.push(section);
                }
            });

            if (sections.length === 0) return;

            const scrollPosition = window.scrollY + 100;

            // Find active section
            let current = '';
            for (const section of sections) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = `#${section.id}`;
                    break;
                }
            }

            // Default to first section if we're at the top of the page
            if (scrollPosition < 300 && sections[0]) {
                current = `#${sections[0].id}`;
            }

            setActiveSection(current);
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Run once on mount to set initial active section
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [navLinks, location.pathname]);

    // Handle scroll to section after navigation
    useEffect(() => {
        if (location.state?.scrollTo) {
            scrollToSection(location.state.scrollTo);

            // Clean up the state to prevent scrolling on subsequent renders
            // Create a new history entry without the scrollTo state
            window.history.replaceState(
                { ...location.state, scrollTo: undefined },
                document.title
            );
        }
    }, [location.state]);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo/Brand */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center cursor-pointer group"
                        onClick={() => {
                            navigate('/');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center overflow-hidden">
                            <img
                                src="/fawicon (2).png"
                                alt="Cryvix Coin Logo"
                                className="w-full scale-130 ml-1 h-full object-contain transition-transform duration-300 group-hover:scale-130"
                            />
                        </div>
                        <span className="ml-3 text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-blue-500">
                            Cryvix Coin
                        </span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.name}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-3 py-2 rounded-md text-sm sm:text-base transition-all duration-300 ${activeSection === link.href
                                        ? 'text-white bg-blue-600 dark:bg-cyan-600 shadow-md'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                                    }`}
                                onClick={() => handleLinkClick(link.href)}
                            >
                                {link.name}
                            </motion.button>
                        ))}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="ml-2 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-500 dark:to-blue-600 px-4 sm:px-6 py-2 rounded-full font-medium text-white shadow-lg hover:shadow-xl transition-all"
                            onClick={() => handleLinkClick("/register")}
                        >
                            Start Mining
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
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
                            className="md:hidden overflow-hidden mt-2"
                        >
                            <div className="pt-2 pb-4 space-y-2 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                                {navLinks.map((link) => (
                                    <motion.button
                                        key={link.name}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-full text-left px-4 py-3 rounded-md transition-all duration-300 ${activeSection === link.href
                                                ? 'text-white bg-blue-600 dark:bg-cyan-600'
                                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                            }`}
                                        onClick={() => handleLinkClick(link.href)}
                                    >
                                        {link.name}
                                    </motion.button>
                                ))}
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-500 dark:to-blue-600 px-6 py-3 rounded-full font-medium text-white shadow-md mt-2"
                                    onClick={() => {
                                        handleLinkClick("/register");
                                    }}
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