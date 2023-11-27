import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeNavbar from '../../components/user/HomeNavbar'
import { useLocation } from 'react-router-dom';

function RoomUser() {
  const [roomCode, setRoomCode] = useState('')
  const navigate = useNavigate()

  const location = useLocation();
  const { roomId } = location.state || {};
  

  useEffect(()=>{
    setRoomCode(roomId)
  },[])

  const handleFormSubmit = (ev) => {
    // ev.preventDefault();
    navigate(`/profile/purchases/room/videocall/${roomCode}`)
  }

  return (
    <div className="home-page pt-12">
      <HomeNavbar />
      <div className="pt-10">
        <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
          <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
            <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 dark:bg-gray-900">
              <span className="block bold mb-2 dark:text-violet-400">
                PURE ATHMA
              </span>
              <h1 className="text-4xl font-extrabold dark:text-gray-50">
                Learn from Experts
              </h1>

              <p className="my-8">
                <span className="font-small dark:text-gray-50">
                  Enter Room ID
                </span>{" "}
              </p>


              <div className="mb-3 relative">
                <input
                  value={roomCode}
                  id="lastname"
                  type="text"
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="w-16 h-8 rounded-md focus:ring text-black focus:ring dark:border-gray-700 pl-2 font-bold text-center border focus:border-gray-500"
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
  )
}

export default RoomUser
