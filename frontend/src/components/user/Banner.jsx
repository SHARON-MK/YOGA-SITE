import React from 'react'

function Banner() {
    return (

        <div className="banner-custom p-6 py-12 dark:bg-pink-400 dark:text-gray-900">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <h2 className="text-center text-6xl tracki font-bold">Up to
                        <br className="sm:hidden"/>10% Off
                    </h2>
                    <div className="space-x-2 text-center py-2 lg:py-0">
                        <span>Plus free mentoring! Use code:</span>
                        <span className="font-bold text-lg">ATHMA</span>
                    </div>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full custom-button-class">
                                Get Started
                            </button>
                </div>
            </div>
        </div>

    )
}

export default Banner
