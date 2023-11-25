import React from 'react'
import icon1 from '../images/icon1.png'
import icon2 from '../images/icon2.png'
import icon3 from '../images/icon3.png'
import icon4 from '../images/icon4.png'
import icon5 from '../images/icon5.png'
import icon6 from '../images/icon6.png'

function PointsArea() {
  return (
    <div>
      <section className="m-4 md:m-8 dark:bg-gray-800 dark:text-gray-100">
	<div className="container mx-auto p-4 my-6 space-y-2 text-center">
		<h2 className="text-5xl font-bold">Yoga: Union of Body, Mind</h2>
		<p className="dark:text-gray-400">Breath of Life's Journey</p>
	</div>
	<div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<div className="flex flex-col items-center p-4">
        <img src= {icon2} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />
			<h3 className="my-3 text-3xl font-semibold">Yoga</h3>
			<div className="space-y-1 leadi">
				<p>Mind-body balance</p>
				<p>Strength, flexibility, peace</p>
				<p>Every body, every day</p>
			</div>
		</div>
		<div className="flex flex-col items-center p-4">
			 <img src= {icon3} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />
			<h3 className="my-3 text-3xl font-semibold">Meditation</h3>
			<div className="space-y-1 leadi">
				<p>Connect with your body</p>
				<p>Breathe deeply, let go</p>
				<p>Find your inner calm</p>
			</div>
		</div>
		<div className="flex flex-col items-center p-4">
			 <img src= {icon4} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />
			<h3 className="my-3 text-3xl font-semibold">Inner wellbeing</h3>
			<div className="space-y-1 leadi">
				<p>Find your center</p>
				<p>Challenge yourself, grow</p>
				<p>Move with grace and ease</p>
			</div>
		</div>
		<div className="flex flex-col items-center p-4">
			 <img src= {icon1} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />
			<h3 className="my-3 text-3xl font-semibold">Group sessions</h3>
			<div className="space-y-1 leadi">
				<p>Live mindfully</p>
				<p>Cultivate compassion</p>
				<p>Be present in the moment</p>
			</div>
		</div>
		<div className="flex flex-col items-center p-4">
			 <img src= {icon5} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />
			<h3 className="my-3 text-3xl font-semibold">Workshops</h3>
			<div className="space-y-1 leadi">
				<p>Unwind and de-stress</p>
				<p>A path to self-discovery</p>
				<p>Your journey starts here</p>
			</div>
		</div>
		<div className="flex flex-col items-center p-4">
			 <img src= {icon6} alt="" className="w-12 h-12 dark:text-pink-400 icon-color" />
			<h3 className="my-3 text-3xl font-semibold">Mental fitness</h3>
			<div className="space-y-1 leadi">
				<p>Relieve pain and stiffness</p>
				<p>Improve your sleep quality</p>
				<p>Boost your energy levels</p>
			</div>
		</div>
	</div>
</section>
    </div>
  )
}

export default PointsArea
