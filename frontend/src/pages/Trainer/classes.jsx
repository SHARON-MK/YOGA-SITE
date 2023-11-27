import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import TrainerNavbar from '../../components/trainer/TrainerNavbar';
import { trainerInterceptor } from '../../helper/interceptor/axios';

function Classes() {
    const navigate = useNavigate()

    const location = useLocation();
    const { course } = location.state || {};
    const courseDetail = course;

    const [monthAndYear, setMonthYear] = useState('');

    const getData = async () => {
        try {
            const response = await trainerInterceptor({
                url: '/api/trainer/get-classdetails',
                method: 'GET',
            });
            setMonthYear(response.data.month);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleStartClick = () => {
        const currentDateTime = new Date();
        const classStartTime = new Date();
        classStartTime.setHours(courseDetail.time, 0, 0, 0);

        const timeDifference = Math.abs(currentDateTime - classStartTime) / (1000 * 60);

        // if (timeDifference <= 15) {
           navigate('/trainer/profile/services/classes/room',{state:{courseDetail}})

        // } else {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Its not the time',
        //         text: `The class can only start around ${courseDetail.time} AM`,
        //     });
        // }
    };

    return (
        <div className='classes'>
            <TrainerNavbar />
            <article className="classes-trainer flex flex-col items-center justify-center max-w-2xl px-6 py-24 mx-auto space-y-16 dark:bg-gray-800 dark:text-gray-50">
                <div className="w-full space-y-4 text-center">
                    <h2 className="text-2xl dark:text-gray-400">{courseDetail.course_name}</h2>
                    <h1 className="text-3xl pt-3 leadi">BATCH :  {monthAndYear}</h1>
                    <h1 className="text-1xl dark:text-gray-400">
                        Class has to start daily at {courseDetail.time} AM
                    </h1>
                </div>
                <div className="dark:text-gray-100">
                    <button onClick={handleStartClick} className="classes-button text-white px-4 py-2 ">
                        START
                    </button>
                </div>
            </article>
        </div>
    );
}

export default Classes;
