import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { userInterceptor } from '../../helper/interceptor/axios'
import HomeNavbar from '../../components/user/HomeNavbar'

function Rating() {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [comment, setComment] = useState('')
    const [title, setTitle] = useState('')

    const location = useLocation();
    const { courseId } = location.state || {};

    const navigate = useNavigate()

    const handelSubmit = (e) => {
        e.preventDefault()
        userInterceptor({
            url: '/api/user/review',
            method: 'post',
            data: {
                courseId: courseId,
                comment: comment,
                rating: rating,
                title: title
            }
        }).then((response) => {
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/profile/purchases')
            } else {
                toast.error(response.data.message)
            }
        }).catch((err) => {
            console.error('Error from backend:', err);
            toast.error('please login after try again')
        })
    }
    return (
        <>
            <HomeNavbar />
            <div>
                <div class="min-h-screen mt-10 py-5 flex flex-col justify-center sm:py-12 review_main_div">
                    <div class="py-3 sm:max-w-xl sm:mx-auto">
                        <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                            <div class="px-12 py-4 review-ist-box ">
                                <h2 class="text-gray-800 text-3xl font-semibold">Your opinion matters to us!</h2>
                            </div>
                            <div class="bg-gray-200 w-full flex flex-col items-center">
                                <form onSubmit={handelSubmit}>
                                    <div class="flex flex-col items-center py-2 space-y-3">
                                        <span class="text-lg text-gray-800">How was of the Course?</span>
                                        <div style={{ display: 'flex' }}>
                                            {[...Array(5)].map((star, index) => {
                                                const currentRating = index + 1
                                                return (
                                                    <label>
                                                        <input
                                                            type='radio'
                                                            name='rating'
                                                            className='star_input'
                                                            value={currentRating}
                                                            onClick={() => {
                                                                setRating(currentRating)
                                                            }}
                                                        />
                                                        < FaStar
                                                            color={currentRating <= (hover || rating) ? '#ffc107' : 'grey'}
                                                            className='star'
                                                            onMouseEnter={() => setHover(currentRating)}
                                                            onMouseLeave={() => setHover(null)}
                                                            key={index} size={50} />
                                                    </label>
                                                )
                                            })}
                                        </div >
                                        {/*  */}
                                    </div>
                                    <div className='title_div'>
                                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white rating_lable">Title</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name='title'
                                            onChange={(e) => setTitle(e.target.value)}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                                    </div>
                                    <div class="w-4/4 flex flex-col">
                                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white rating_lable">Comment</label>

                                        <textarea
                                            rows="3"
                                            className='comant_input'
                                            name='comment'
                                            onChange={(e) => setComment(e.target.value)}
                                            class="p-4 text-gray-500 rounded-xl resize-none"></textarea>
                                        <button
                                            type='submit'
                                            class="rating-button py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">Rate now</button>
                                    </div>
                                </form>
                            </div>
                            <div class="h-12 flex items-center justify-center review-ist-box">
                                <a href="#" class="text-gray-600">Maybe later</a>
                            </div>
                        </div>
                    </div>
                </div >
            </div>

        </>
    )
}

export default Rating
