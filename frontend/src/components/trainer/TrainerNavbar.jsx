import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BellIcon } from '@heroicons/react/outline'
import { trainerInterceptor } from '../../helper/interceptor/axios';
import io from 'socket.io-client'

function TrainerNavbar() {

  const socket = io.connect('http://localhost:5000');

  const navigate = useNavigate()
  const [trainer, setTrainer] = useState(null);
  const [notificationCount, setNotificationCount] = useState()

  const getNotificationCount = async () => {
    const response = await trainerInterceptor({
      url: "/api/trainer/notification-count",
      method: 'GET'
    })
    setNotificationCount(response.data.data)
    console.log('wow',notificationCount)
  }

  const getData = async () => {
    try {
      const response = await axios.post('/api/trainer/get-trainer-info-by-id', {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('trainerKey')
          }
        });

      if (response.status === 200 && response.data.message === "Your account is blocked. Contact an admin for assistance.") {
        toast.error('Your account is blocked by Admin, contact Admin');
        localStorage.removeItem('trainerKey');
        navigate('/trainer/login');
      }
      const trainerData = response.data.data;
      setTrainer(trainerData);
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getData();
    getNotificationCount();

    socket.on('notification_trainer', (data) => {
      const { count, room } = data
      console.log('wyaaah')
      toast.success('You have a new notification')
      setNotificationCount(count)
    });

    const token = localStorage.getItem('trainerKey');
    const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const trainerId = tokenPayload ? tokenPayload.id : null;

    socket.emit('join', trainerId);
    // for making the room connection to server socket

    return () => {
      socket.disconnect();
    };

  }, []);




  const logOut = () => {
    try {
      localStorage.removeItem('trainerKey');
      navigate('/');
    } catch (error) {
      toast('Something went wrong');
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/trainer/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <a href="/#" onClick={logOut}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div >
      <Menu mode="horizontal" style={{ backgroundColor: '#8acbc2', display: 'flex', justifyContent: 'flex-end' }}>
        <Menu.Item key="home">
          <Link to="/trainer">Home</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="trainer">
          <Dropdown overlay={menu}>
            <a
              href="/#"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {trainer ? 'T - ' + trainer.name : 'Trainer'}
            </a>
          </Dropdown>
        </Menu.Item>
        <Menu.Item key="contact">
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item key="notification">
          <a href='/trainer/notification'>
            <button type="button" className="artist-header d-flex relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              {notificationCount > 0 && (
                <div className='artist_count'>
                  <h1> {notificationCount} </h1>
                </div>
              )}
            </button>
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default TrainerNavbar;
