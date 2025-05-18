import { motion } from 'framer-motion';
import { FaShieldAlt,FaUserPlus,FaMobileAlt ,FaGift ,FaHeadset , FaCoins, FaLeaf, FaUserLock, FaChartLine } from 'react-icons/fa';

const FAQSection = () => {
    const faqs = [


        {
    question: "Is Cryvix secure for beginners and experts alike?",
    answer: "Absolutely. Cryvix includes advanced security features like multi-layer encryption, wallet protection, and 2FA to protect user assets.",
    icon: <FaShieldAlt className="text-purple-500 text-xl" />,
    trustFact: "Zero security breaches since launch with real-time threat detection"
  },
  {
    question: "How easy is it to start using Cryvix?",
    answer: "Getting started is simple. Create your account, set up your wallet, and explore intuitive dashboards with market tools and charts.",
    icon: <FaUserPlus className="text-purple-500 text-xl" />,
    trustFact: "New users can onboard and start in under 3 minutes"
  },
  {
    question: "What makes Cryvix environmentally conscious?",
    answer: "Cryvix utilizes efficient consensus mechanisms and operates through partners using renewable energy sources for sustainability.",
    icon: <FaLeaf className="text-purple-500 text-xl" />,
    trustFact: "35% reduction in energy use compared to legacy platforms"
  },
  {
    question: "Can I use Cryvix on mobile devices?",
    answer: "Yes, Cryvix is mobile-optimized and accessible through all major mobile browsers, offering a smooth on-the-go experience.",
    icon: <FaMobileAlt className="text-purple-500 text-xl" />,
    trustFact: "Tested and responsive on over 90% of Android and iOS devices"
  },
  {
    question: "Is Cryvix free or does it require payment?",
    answer: "Cryvix is free to use during the beta phase. We aim to keep core features accessible while planning premium add-ons.",
    icon: <FaGift className="text-purple-500 text-xl" />,
    trustFact: "Currently in beta with no usage fees or hidden charges"
  },
  {
    question: "Does Cryvix provide user support?",
    answer: "Yes, we offer responsive email support and are rolling out live chat to ensure a smooth experience for all users.",
    icon: <FaHeadset className="text-purple-500 text-xl" />,
    trustFact: "Average support response time: under 12 hours"
  }
    ];

    return (
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get answers to common questions about Cryvix Coin's security, compliance, and mining processes.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-purple-200 transition-all"
                        >
                            <div className="flex items-start">
                                <div className="bg-purple-100 p-3 rounded-full mr-4">
                                    {faq.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h3>
                                    <p className="text-gray-600 mb-4">{faq.answer}</p>
                                    <div className="bg-purple-50 px-4 py-2 rounded-lg border border-purple-100">
                                        <p className="text-purple-600 text-sm font-medium">{faq.trustFact}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-white rounded-xl shadow-sm p-8 border border-gray-200"
                >
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Our support team is available 24/7 to help with any inquiries about Cryvix Coin At cryixinfo@gmail.com.
                        </p>
                        
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;