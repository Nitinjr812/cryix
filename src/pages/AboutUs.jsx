import React from 'react';
import { FaShieldAlt, FaLock, FaGavel, FaCoins, FaUserShield, FaChartLine, FaLeaf, FaGlobe } from 'react-icons/fa';
import { GiMining, GiCrystalBars } from 'react-icons/gi';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AboutUs = () => {
    const features = [
        {
            icon: <FaShieldAlt className="text-3xl" />,
            title: "Military-Grade Security",
            desc: "Enterprise-level encryption protects all transactions and mining activities with bank-level security protocols."
        },
        {
            icon: <FaLock className="text-3xl" />,
            title: "Zero Data Collection",
            desc: "We don't track, store, or monetize your personal information. Your privacy is non-negotiable."
        },
        {
            icon: <FaGavel className="text-3xl" />,
            title: "Regulatory Compliance",
            desc: "Fully compliant with international financial regulations including AML and KYC requirements."
        },
        {
            icon: <GiMining className="text-3xl" />,
            title: "Green Mining Technology",
            desc: "Our proprietary algorithms use 70% less energy than traditional mining methods."
        },
        {
            icon: <FaChartLine className="text-3xl" />,
            title: "Proven Performance",
            desc: "Consistent 99.9% uptime with real-time monitoring and automatic failover systems."
        },
        {
            icon: <GiCrystalBars className="text-3xl" />,
            title: "Transparent Operations",
            desc: "Publicly verifiable mining logs and quarterly third-party audits."
        },
        {
            icon: <FaLeaf className="text-3xl" />,
            title: "Sustainable Growth",
            desc: "Carbon-neutral initiative with renewable energy partnerships."
        },

    ];

    const stats = [
        { value: "1M+", label: "Coins Mined" },
        { value: "0.01%", label: "Downtime" },
        { value: "24/7", label: "Support Coverage" }
    ];

    return (
        <>
        <Navbar/>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto text-center mb-20"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        The Future of <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Digital Currency</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Cryvix Coin combines cutting-edge blockchain technology with sustainable mining practices to deliver unparalleled performance and security.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-200 min-w-[150px]"
                            >
                                <p className="text-2xl font-bold text-purple-600">{stat.value}</p>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Mission Statement */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-20"
                >
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 bg-gradient-to-br from-purple-600 to-blue-600 p-8 md:p-12 flex flex-col justify-center">
                            <FaCoins className="text-6xl text-white mb-6 mx-auto lg:mx-0" />
                            <h2 className="text-3xl font-bold text-white mb-4 text-center lg:text-left">Our Vision</h2>
                            <p className="text-white/90 mb-6 text-center lg:text-left">
                                To create the most accessible, efficient, and environmentally responsible cryptocurrency ecosystem.
                            </p>
                            <div className="flex items-center justify-center lg:justify-start">
                                <FaUserShield className="mr-2 text-white text-xl" />
                                <span className="text-white font-medium">User-Centric Design</span>
                            </div>
                        </div>
                        <div className="lg:w-1/2 p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Core Principles</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                                        <FaLock className="text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Security First</h3>
                                        <p className="text-gray-600">Multi-layered protection with biometric authentication options</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                                        <FaLeaf className="text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Eco-Friendly</h3>
                                        <p className="text-gray-600">Carbon offset programs and renewable energy partnerships</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                                        <FaGlobe className="text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Global Access</h3>
                                        <p className="text-gray-600">Available worldwide with localized support in 15 languages</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* Key Features */}
                <section className="max-w-7xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Industry Leaders Choose Cryvix</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:border-purple-200 transition-all"
                            >
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-center mb-3 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600 text-center">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Compliance Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white"
                >
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                            <FaGavel className="text-6xl" />
                        </div>
                        <div className="md:w-2/3 md:pl-8 text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-4">Regulatory Excellence</h2>
                            <p className="text-white/90 mb-6">
                                Cryvix Coin meets the highest standards of financial compliance, holding certifications in multiple jurisdictions including the EU's MiCA framework and US financial regulations.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="bg-white/10 px-4 py-2 rounded-full">AML Compliance</div>
                                <div className="bg-white/10 px-4 py-2 rounded-full">KYC Verified</div>
                                <div className="bg-white/10 px-4 py-2 rounded-full">GDPR Compliant</div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;