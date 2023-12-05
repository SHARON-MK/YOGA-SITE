import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiUser } from 'react-icons/fi';
import { BellIcon } from '@heroicons/react/outline'
import io from 'socket.io-client'
import { userInterceptor } from '../../helper/interceptor/axios';


const HomeNavbar = () => {
  const socket = io.connect('http://localhost:5000');

  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState()

  const getNotificationCount = async () => {
    const response = await userInterceptor({
      url: "/api/user/notification-count",
      method: 'GET'
    })
    if(response.data){
      setNotificationCount(response.data.data)
    }
  }

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  

  const getData = async () => {
    try {
      const response = await axios.post('/api/user/get-user-info-by-id', {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (response.status === 200 && response.data.message === "Your account is blocked. Contact an admin for assistance.") {
        toast.error('Your account is blocked by Admin, contact Admin');
        localStorage.removeItem('token');
        navigate('/login');
      }

      const userData = response.data.data;
      setUser(userData);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
    getNotificationCount();

    socket.on('notification_user', (data) => {
      const { count, room } = data
      console.log('reached the end point')
      toast.success('You have a new notification')
      setNotificationCount(count)
    });

    socket.on('class_start_roomid_pass', (data) => {
      const { room } = data
      toast.success('Class Started, Visit Room')
      setNotificationCount(prevCount => prevCount + 1);
    });

    const token = localStorage.getItem('token');
    const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userId = tokenPayload ? tokenPayload.id : null;

    socket.emit('join', userId);
    // for making the room connection to server socket

    return () => {
      socket.disconnect();
    };
  },[]);

  const signOut = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (error) {
      toast('Something went wrong');
    }
  }

  const userMenu = (
    <div className={`absolute right-10 mt-2 py-2 dark:bg-gray-900 rounded-lg  ${isUserDropdownOpen ? 'block' : 'hidden'}`} style={{ top: '1.4rem', backgroundColor: '#8acbc2' }}>
      <Link to="/profile" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Profile</Link>
      <button onClick={signOut} className="block w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800">Logout</button>
    </div>
  );

  return (
    <nav className="navbar-custom dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <a href="https://flowbite.com" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pure Yoga</span>
        </a>
        <div className="flex md:order-2">
          {user ? (
            <div className="relative group flex items-center">





              <button
                onClick={toggleUserDropdown}
                className="relative z-10 flex items-center ml-3 mr-4 text-gray-500 focus:outline-none  focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-expanded={isUserDropdownOpen}
              >
                <FiUser size={20} className="mr-2" />
                <span className="navbar-custom mr-2">{user.name}</span>
              </button>
              {isUserDropdownOpen && userMenu}


              <a href='/notifications'>
                <button type="button" className="artist-header d-flex relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                  {notificationCount > 0 && (
                    <div className='artist_count'>
                      <h1> {notificationCount} </h1>
                    </div>
                  )}
                </button>
              </a>



            </div>
          ) : (
            // Render "Sign Up" button when the user is not available
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 custom-button-class"
            >
              <Link to="/login">Sign Up</Link>
            </button>
          )}
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? '' : 'hidden'
            }`}
          id="navbar-sticky"
        >
          <ul className="navbar-custom flex flex-col p-2 md:p-0 mt-4 font-medium rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-transparent">
            <li>
              <a href="/#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                Home
              </a>
            </li>
            {/* <li>
              <a href="/#" className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent dark:border-gray-700">
                About
              </a>
            </li> */}
            <li>
              <a href="/#" className="block py-2 pl-3 pr-4  rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 md:dark:hover-text-blue-500 dark-text-white dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent dark-border-gray-700">
                <Link to='/trainer'>Trainer</Link>
              </a>
            </li>
            <li>
              <a href="/#" className="block py-2 pl-3 pr-4  rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 md:dark:hover-text-blue-500 dark-text-white dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent dark-border-gray-700">
                <Link to='/courses'>Courses</Link>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
