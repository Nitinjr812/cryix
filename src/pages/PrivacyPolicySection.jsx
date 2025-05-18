import React from 'react';
import { FaShieldAlt, FaLock, FaUserCheck, FaDatabase, FaCookie } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const PrivacyPolicySection = () => {
    return (
        <>
            <Navbar />
            <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden my-10 border border-gray-100">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <FaShieldAlt className="text-4xl" />
                        Our Privacy Commitment
                    </h2>
                    <p className="mt-2 opacity-90">
                        Transparency and security are at the core of everything we do
                    </p>
                </div>

                <div className="p-8 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="flex items-start">
                            <div className="bg-purple-100 p-3 rounded-full mr-4">
                                <FaLock className="text-purple-600 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Data Collection Policy</h3>
                                <p className="text-gray-600">
                                    We only collect essential information required for account verification and transaction processing.
                                    No personal data is stored beyond legal requirements (typically 30 days after account closure).
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-purple-100 p-3 rounded-full mr-4">
                                <FaUserCheck className="text-purple-600 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">User Control</h3>
                                <p className="text-gray-600">
                                    You can request access, correction, or deletion of your data at any time through your account dashboard.
                                    All requests are processed within 72 hours.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-purple-100 p-3 rounded-full mr-4">
                                <FaDatabase className="text-purple-600 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Data Protection</h3>
                                <p className="text-gray-600">
                                    We use AES-256 encryption for all stored data and TLS 1.3 for transmissions.
                                    Regular security audits are conducted by independent third parties.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-purple-100 p-3 rounded-full mr-4">
                                <FaCookie className="text-purple-600 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Cookie Usage</h3>
                                <p className="text-gray-600">
                                    Only essential session cookies are used. No tracking cookies are implemented.
                                    You have full control through our cookie consent manager.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Full Privacy Policy Highlights</h3>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2">•</span>
                                <span>We never sell or share personal data with third parties for marketing purposes</span>
                            </li>

                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2">•</span>
                                <span>Clear data retention policies with automatic deletion schedules</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2">•</span>
                                <span>24/7 security monitoring with immediate breach notification protocols</span>
                            </li>
                        </ul>


                    </div>
                </div>
            </section>
        </>
    );
};

export default PrivacyPolicySection;