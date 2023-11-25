import React, { useEffect, useState } from 'react';
import HomeNavbar from '../../components/user/HomeNavbar';
import FooterMain from '../../components/user/FooterMain';
import { getReviewsAPI } from '../../api/userAPI';
import {  useLocation } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const CourseDetailedPage = () => {

    const [rating, setRating] = useState()

    const initialReviewsToShow = 2
    const [visibleReviews, setVisibleReviews] = useState(initialReviewsToShow);
    const [showAllRatings, setShowAllRatings] = useState(false);

    const handleShowMore = () => {
        setShowAllRatings(true);
        setVisibleReviews(rating.reviews.length);
    };
    const handelShowLess = () => {
        setShowAllRatings(false);
        setVisibleReviews(initialReviewsToShow)
    }

    // DATA PASSED AND RECEIVED BY USELOCATION METHOD
    const location = useLocation();
    const { selectedCourse } = location.state || {};
    const courseDetail = selectedCourse

    useEffect(() => {
        const reviewData = async () => {
            try {
                const courseId = courseDetail._id
                const response = await getReviewsAPI(courseId)

                if (response.data.success) {
                    const review = response.data.data
                    setRating(review)
                }
            } catch (error) {
                console.log('Error in fetching review data', error)
            }
        }
        reviewData();
    }, [])

    return (
        <div>
            <HomeNavbar />
            <div class="w-10/12 mx-auto">
                {rating && < div className="mt-6" >
                    <h2 className="text-2xl font-semibold mb-2 ">Review & Ratings</h2>
                    <h2 className="text-gray-700 font-semibold  mb-2">Average Rating</h2>
                    <div className="bg-gray-50 rounded-lg shadow-md p-4 mt-3">
                        <div className="mt-4 flex items-center reviews_in_artist_view_page">
                            {rating?.reviews.slice(0, showAllRatings ? rating?.reviews.length : visibleReviews).map((items, index) => {
                                const timeAgo = formatDistanceToNow(new Date(items.timestamp), {
                                    addSuffix: true,
                                });
                                return (
                                    <>
                                        <div key={index} className="flex items-center mb-4 space-x-4 mr-20">
                                            <article className=' mt-4 mb-4'>
                                                < div class="flex  items-center mb-4 space-x-4" >
                                                    <img class="w-10 h-10 rounded-full" src={items?.userImage} alt="" />
                                                    <div class="space-y-1 font-medium dark:text-white">
                                                        <p>{items?.userName} </p>
                                                    </div>
                                                </div>
                                                <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed in <time datetime="2017-03-03 19:00">{timeAgo}</time></p></footer>
                                                <p class="mb-2 text-gray-500 dark:text-gray-400">{items.review}</p>
                                            </article >
                                        </div>
                                        <br />
                                    </>
                                )
                            })}
                        </div >
                    </div>
                </div >}
                <div class="max-w-md mx-auto p-4 flex justify-center">
                    {rating?.reviews.length > initialReviewsToShow && !showAllRatings && (<button
                        id="showMoreBtn"
                        onClick={handleShowMore}
                        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
                        Show More
                    </button>)}
                </div>
                <div class="max-w-md mx-auto p-4 flex justify-center">
                    {rating?.reviews.length > initialReviewsToShow && showAllRatings && (<button
                        id="showMoreBtn"
                        onClick={handelShowLess}
                        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
                        Hide
                    </button>)}
                </div>
            </div>
            <FooterMain />
        </div >
    );
};

export default CourseDetailedPage;
