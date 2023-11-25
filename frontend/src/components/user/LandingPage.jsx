import React from 'react'
import image from '../images/Mainpic.jpg'
import {Link} from 'react-router-dom'

function LandingPage() {
    return (
        <div>
            <section>
                <div className="landing-page dark:bg-pink-400">
                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-900">
                        <h1 className="text-5xl font-bold leadi sm:text-6xl xl:max-w-3xl dark:text-gray-900">Your home for online yoga</h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900">Practice with world-class teachers in the comfort of your home with our online yoga and meditation classes and programs</p>
                        <div className="flex flex-wrap justify-center">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full custom-button-class">
                               <Link to='/courses'>Get Started</Link>
                            </button>
                        </div>
                    </div>
                </div>
                <img src= {image} alt="" className="w-5/6 mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 dark:bg-gray-500"/>
            </section>
        </div>
    )
}

export default LandingPage
