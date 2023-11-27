import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { trainerInterceptor } from '../../helper/interceptor/axios';
import io from 'socket.io-client'
import TrainerNavbar from '../../components/trainer/TrainerNavbar';

function Room() {

  const newSocket = io.connect('http://localhost:5000');


  const generateRandomCode = () => {
    return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
  };

  const [roomCode, setRoomCode] = useState(generateRandomCode());
  const navigate = useNavigate();

  const location = useLocation();
  const { courseDetail } = location.state || {};
  const courseId = courseDetail._id

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    try {
      const response = await trainerInterceptor({
        url: `/api/trainer/get-allusers-fornotification?courseId=${courseId}&&roomId=${roomCode}`,
        method: 'GET',
      });
      newSocket.emit('class_start_roomid_pass', { rooms: response.data.data });
    } catch (error) {
    }
    navigate(`/trainer/profile/services/classes/room/videocall/${roomCode}`);
  };


  return (
    <div className="home-page">
      <TrainerNavbar />
      <div className=" p-5">
        <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
          <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
            <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 dark:bg-gray-900">
              <span className="block bold mb-2 dark:text-violet-400">
                PURE ATHMA
              </span>
              <h1 className="text-4xl font-extrabold dark:text-gray-50">
                Empower clients through yoga's gift
              </h1>

              <p className="my-8">
                <span className="font-small dark:text-gray-50">
                  Room ID is provided below
                </span>{" "}
              </p>


              <div className="mb-3 relative">
                <input
                  value={roomCode}
                  id="lastname"
                  type="text"
                  placeholder="Enter Room Id"
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="w-16 h-8 rounded-md focus:ring text-black focus:ring dark:border-gray-700 pl-2 font-bold text-center"
                />
              </div>


              <button
                type="button"
                onClick={() => {
                  handleFormSubmit();
                }}
                className="classes-button w-30 py-2 font-semibold dark:bg-violet-400 dark:text-gray-900"
              >
                Join the Room
              </button>
            </div>
            <img
              src="https://www.reviews.org/app/uploads/2020/05/Woman-on-a-video-conference-call-1.jpg"
              alt=""
              className="object-cover w-full rounded-md xl:col-span-3 dark:bg-gray-500"
            />
          </div>
        </section>
      </div>

    </div>
  );
}

export default Room;



