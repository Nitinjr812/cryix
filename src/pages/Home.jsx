import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Mining from '../components/Mining';
import Footer from '../components/Footer';
import RoadmapItem from '../components/RoadmapItem';
import FAQSection from './FAQSection';
 
const Home = () => {
    return (
        <>


            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
                <Navbar />
                {/* Hero Section */}
                <Hero />
                {/* Stats Section */}
                <Stats />
                {/* About Section */}
                <About />
                {/* Mining Section */}
                <Mining />
                {/* Roadmap Section */}
                <RoadmapItem />

                {/* CTA Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="py-20 bg-gradient-to-r from-cyan-500/10 to-blue-600/10"
                >
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Cryvix Revolution?</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Don't miss your chance to be part of the next big cryptocurrency. Start mining Cryvix Coin today and secure your financial future.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full font-medium text-lg shadow-lg shadow-cyan-500/30"
                        >
                            Start Mining Now - It's Free!
                        </motion.button>
                    </div>
                </motion.section> 
                {/* -----faq's----- */}
                <FAQSection/>

                {/* Footer */}
                <Footer />
            </div>
        </>
    )
}

export default Home