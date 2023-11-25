import React from 'react';
import image from '../images/trainerLanding.png';

function LandingPage() {
  return (
    <div className='trainer-landing'>
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-5xl font-bold leading-tight sm:text-6xl">Be a <br />
              <span className="dark:text-pink-400">Yoga</span> Trainer
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">Give some light to the life of millions <br/>
              <br className="hidden md:inline lg:hidden"/>Let the world be peaceful
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <div className="text-center"> {/* Container for centering */}
                <a rel="noopener noreferrer" href="/#" className="px-12 py-4 text-lg font-semibold rounded dark:bg-pink-400 dark:text-gray-900">Get started</a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img src={image} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage;
