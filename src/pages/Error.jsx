import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate()
    const go = () => {
        navigate("/")
    }
    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col justify-center items-center font-sans px-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-center max-w-md w-full"
            >
                <svg
                    viewBox="0 0 541.17206 328.45184"
                    height="200"
                    width="300"
                    className="mx-auto sm:height-328 sm:width-541"
                    style={{
                        transformOrigin: '85px 4px',
                        animation: 'rotateWobble 12s infinite ease-out',
                    }}
                >
                    <style>
                        {`
              @keyframes rotateWobble {
                0% { transform: rotate(0deg); }
                5% { transform: rotate(3deg); }
                15% { transform: rotate(-2.5deg); }
                25% { transform: rotate(2deg); }
                35% { transform: rotate(-1.5deg); }
                45% { transform: rotate(1deg); }
                55% { transform: rotate(-1.5deg); }
                65% { transform: rotate(2deg); }
                75% { transform: rotate(-2deg); }
                85% { transform: rotate(2.5deg); }
                95% { transform: rotate(-3deg); }
                100% { transform: rotate(0deg); }
              }
            `}
                    </style>
                    <defs>
                        <pattern
                            patternUnits="userSpaceOnUse"
                            width="1.5"
                            height="1"
                            patternTransform="translate(0,0) scale(10,10)"
                            id="Strips2_1"
                        >
                            <rect
                                style={{ fill: 'black', stroke: 'none' }}
                                x="0"
                                y="-0.5"
                                width="1"
                                height="2"
                            />
                        </pattern>
                        <linearGradient id="linearGradient6096">
                            <stop
                                id="stop6094"
                                offset="0"
                                style={{ stopColor: '#000000', stopOpacity: 1 }}
                            />
                        </linearGradient>
                    </defs>
                    <g transform="translate(170.14515,0.038164)">
                        <g id="g6219">
                            <path
                                transform="matrix(1.0150687,0,0,11.193923,-1.3895945,-2685.7441)"
                                style={{
                                    display: 'inline',
                                    fill: '#000000',
                                    fillOpacity: 1,
                                    stroke: '#000000',
                                    strokeWidth: '0.1px',
                                    strokeLinecap: 'butt',
                                    strokeLinejoin: 'miter',
                                    strokeOpacity: 1,
                                }}
                                d="m 145.0586,263.51309 c -90.20375,-0.0994 -119.20375,-0.0994 -119.20375,-0.0994"
                            />
                            <g id="g6174">
                                <ellipse
                                    ry="9.161705"
                                    rx="9.3055239"
                                    cy="91.32917"
                                    cx="84.963676"
                                    style={{
                                        display: 'inline',
                                        opacity: 1,
                                        fill: 'none',
                                        fillOpacity: 0.4627451,
                                        fillRule: 'nonzero',
                                        stroke: '#000000',
                                        strokeWidth: 1.08691013,
                                        strokeMiterlimit: 4,
                                        strokeDasharray: 'none',
                                        strokeOpacity: 1,
                                    }}
                                />
                                <path
                                    id="path4490"
                                    d="m 84.984382,-0.03816399 c 0.911733,-5.0186e-4 1.661858,18.47051499 1.674386,41.22988399 0.0069,12.610431 -0.214009,23.904598 -0.56753,31.469836 -0.282878,6.088471 -0.652275,9.761785 -1.058838,9.762119 -0.406564,3.33e-4 -0.78198,-3.672386 -1.074838,-9.760657 -0.36185,-7.564779 -0.595233,-18.858715 -0.602175,-31.469228 -0.01253,-22.759565 0.717262,-41.23145213 1.628995,-41.23195399 z"
                                    style={{
                                        display: 'inline',
                                        fill: '#000000',
                                        stroke: 'none',
                                        strokeWidth: '0.23743393px',
                                        strokeLinecap: 'butt',
                                        strokeLinejoin: 'miter',
                                        strokeOpacity: 1,
                                    }}
                                />
                                <path
                                    id="path4496"
                                    d="m 85.115421,100.5729 c -0.0036,3.37532 -0.0071,6.75165 -0.0107,10.12897 m 0.512159,0.18258 c -1.914603,-0.23621 -3.505591,1.17801 -4.861444,2.68113 -1.355853,1.50312 -2.473764,3.09173 -3.387866,4.59538 -0.914103,1.50365 -1.620209,2.91586 -2.416229,4.41952 -0.79602,1.50365 -1.67928,3.09352 -0.808656,3.24054 0.870624,0.14702 3.490408,-1.14815 5.700074,-1.91396 2.209666,-0.76581 4.001473,-1.00079 5.922125,-0.86765 1.920652,0.13314 3.947462,0.6325 6.245357,1.6195 2.297896,0.98701 4.861161,2.46015 4.9051,0.91309 0.04394,-1.54706 -2.430929,-6.11379 -4.787811,-9.33976 -2.356882,-3.22597 -4.596047,-5.11158 -6.51065,-5.34779 z"
                                    style={{
                                        display: 'inline',
                                        fill: '#000000',
                                        fillOpacity: 1,
                                        stroke: '#000000',
                                        strokeWidth: '1px',
                                        strokeLinecap: 'butt',
                                        strokeLinejoin: 'miter',
                                        strokeOpacity: 1,
                                    }}
                                />
                                <rect
                                    ry="5"
                                    y="314.84082"
                                    x="35.355339"
                                    height="9.8994951"
                                    width="100.76272"
                                    style={{
                                        display: 'inline',
                                        opacity: 1,
                                        fill: '#000000',
                                        fillOpacity: 1,
                                        fillRule: 'nonzero',
                                        stroke: '#000000',
                                        strokeWidth: 1.00157475,
                                        strokeMiterlimit: 4,
                                        strokeDasharray: 'none',
                                        strokeOpacity: 1,
                                    }}
                                />
                            </g>
                        </g>
                    </g>
                    <g id="layer3">
                        <g
                            id="text4526"
                            style={{ fill: 'url(#Strips2_1)', fillOpacity: 1, stroke: 'none', strokeWidth: 1.23488784 }}
                            transform="matrix(0.97168718,0,0,1.0291378,170.14515,0.038164)"
                        >
                            <path
                                id="path4555"
                                style={{ fill: 'url(#Strips2_1)', fillOpacity: 1, stroke: '#000000', strokeWidth: 1.23488784, strokeOpacity: 1 }}
                                d="M -0.46490841,256.59082 H -26.166013 v 43.5298 h -41.214384 v -43.5298 h -75.829833 l -9.95629,-15.28174 64.136994,-140.0826 h 8.914347 l 33.573515,15.8606 -48.507941,89.60655 -11.461305,19.56526 h 39.130513 l 4.399288,-43.06672 h 36.815096 v 43.06672 h 25.70110459 z"
                            />
                        </g>
                        <g
                            id="text4526-2"
                            style={{ fill: 'url(#Strips2_1)', fillOpacity: 1, stroke: 'none', strokeWidth: 1.23488784 }}
                            transform="matrix(0.97168718,0,0,1.0291378,377.95605,103.2934)"
                        >
                            <path
                                id="path4558"
                                style={{ fill: 'url(#Strips2_1)', fillOpacity: 1, stroke: '#000000', strokeWidth: 1.23488784, strokeOpacity: 1 }}
                                d="m 147.55592,156.33602 h -25.70111 v 43.5298 H 80.640431 v -43.5298 H 4.8105946 L -5.1456892,141.05429 58.991302,0.97168512 h 8.914347 L 101.47916,16.832277 52.971223,106.43883 41.50992,126.00409 h 39.130511 l 4.399288,-43.06672 h 36.815091 v 43.06672 h 25.70111 z"
                            />
                        </g>
                    </g>
                </svg>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 mt-4 sm:mt-6"
                >
                    Oops! Page Not Found
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-base sm:text-lg md:text-xl text-gray-600 mt-2 sm:mt-4"
                >
                    It seems we can't find what you're looking for.
                </motion.p>
                <motion.button
                    onClick={go}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-4 sm:mt-6 inline-block px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold text-black border-2 border-black rounded-lg hover:scale-105 hover:bg-black hover:text-white transition-all duration-500"
                >
                    Go Back Home
                </motion.button>
            </motion.div>
        </main>
    );
};

export default Error;