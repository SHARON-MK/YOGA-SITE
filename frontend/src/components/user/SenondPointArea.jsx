import React from 'react'
import icon7 from '../images/icon7.png'
import image1 from '../images/pointsection1.jpg'
import image2 from '../images/pointsection2.jpg'

function SenondPointArea() {
    return (
        <div>
            <section className="dark:bg-gray-800 dark:text-gray-100">
                <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
                    <div>
                        <h2 className="text-3xl font-bold tracki text-center sm:text-5xl dark:text-gray-50">Serenity Through Movement</h2>
                        <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-400">Wellness Through Inner Balance</p>
                    </div>
                    <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h3 className="text-2xl font-bold tracki sm:text-3xl dark:text-gray-50">Flow of Inner Energy</h3>
                            <p className="mt-3 text-lg dark:text-gray-400">Delve into advanced postures, sequences, and practices for those seeking a deeper yoga experience</p>
                            <div className="mt-12 space-y-12">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-pink-400 dark:text-gray-900">
                                        <img src= {icon7} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />
  
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium leadi dark:text-gray-50">Discovering Inner Radiance</h4>
                                        <p className="mt-2 dark:text-gray-400">Start your yoga journey with a beginner's guide, including basic poses and fundamental principles</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-pink-400 dark:text-gray-900">
                                            <img src= {icon7} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />
  
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium leadi dark:text-gray-50">Flow of Inner Energy</h4>
                                        <p className="mt-2 dark:text-gray-400">Understand how yoga can alleviate common health issues and support overall well-being</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-pink-400 dark:text-gray-900">
                                            <img src= {icon7} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />

                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium leadi dark:text-gray-50">Uniting Self and Universe</h4>
                                        <p className="mt-2 dark:text-gray-400">Dive into the spiritual and ethical aspects of yoga, exploring concepts like the Eight Limbs of Yoga</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div aria-hidden="true" className="mt-10 lg:mt-0">
                            <img src={image1} alt="" className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"/>
                        </div>
                    </div>
                    <div>
                        <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                            <div className="lg:col-start-2">
                                <h3 className="text-2xl font-bold tracki sm:text-3xl dark:text-gray-50">Wellness Through Inner Balance</h3>
                                <p className="mt-3 text-lg dark:text-gray-400">Develop mental clarity and emotional well-being through meditation practices and mindfulness exercises</p>
                                <div className="mt-12 space-y-12">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-pink-400 dark:text-gray-900">
                                                <img src= {icon7} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />
  
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium leadi dark:text-gray-50">Embrace Your Inner Light</h4>
                                            <p className="mt-2 dark:text-gray-400">Discover the power of controlled breathing for stress reduction and overall vitality</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-pink-400 dark:text-gray-900">
                                                <img src= {icon7} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />
  
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium leadi dark:text-gray-50">Path to Self-Discovery</h4>
                                            <p className="mt-2 dark:text-gray-400">Explore the history, philosophy, and different yoga styles to understand its holistic approach to well-being</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-pink-400 dark:text-gray-900">
                                            <img src= {icon7} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />
  
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium leadi dark:text-gray-50">Mind, Body Harmony</h4>
                                            <p className="mt-2 dark:text-gray-400">Learn a variety of postures to improve flexibility, strength, and balance, enhancing physical health</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
                                <img src={image2} alt="" className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SenondPointArea
