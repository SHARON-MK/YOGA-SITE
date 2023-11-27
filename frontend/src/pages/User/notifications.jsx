import React, { useEffect, useState } from 'react';
import HomeNavbar from '../../components/user/HomeNavbar';
import { userInterceptor } from '../../helper/interceptor/axios';
import { useNavigate } from 'react-router-dom';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await userInterceptor({
          url: "/api/user/get-notifications",
          method: 'GET',
        });

        if (Array.isArray(response.data.data)) {
          const notificationsArray = response.data.data.map(item => item.notifications);
          const flattenedNotifications = [].concat(...notificationsArray);

          setNotifications(flattenedNotifications);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.log('Error fetching notifications', error);
      }
    };

    getNotifications();
  }, []);

  const handleCrossButtonClick = async (notificationId) => {
    try {
      await userInterceptor({
        url: `/api/user/update-notification-status?notificationId=${notificationId}`,
        method: 'POST',
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotificationClick = (notification) => {
    const roomId = notification.room
    navigate('/profile/purchases/room/', { state: { roomId } })
  };



  return (
    <div>
      <HomeNavbar />
      <div className="notification-user">
        {notifications &&
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="pt-20 flex flex-row pl-4 py-2 gap-2 items-center border rounded-lg shadow overflow-hidden dark:bg-gray-900 dark:border-pink-400"
            >
              <span className="flex-shrink-0 inline-flex mx-3 item-center justify-center leadi rounded-full dark:bg-pink-400 dark:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a1 1 0 011 1v6a1 1 0 01-2 0V5a1 1 0 011-1zm0 10a1 1 0 110 2 1 1 0 010-2z"
                  />
                </svg>
              </span>
              <div className="flex-1 p-2">
                {notification.name && notification.name.startsWith('Your class has been started') ? (
                  // If notification.content exists and starts with the specified text, call the function directly
                  <div onClick={() => handleNotificationClick(notification)}>
                    <p className="text-sm dark:text-gray-100">{notification.name}</p>
                  </div>
                ) : (
                  // Otherwise, render a plain paragraph
                  <p className="text-sm dark:text-gray-100">{notification.name}</p>
                )}
              </div>
              <button
                type="button"
                className="ml-6 p-2 dark:text-gray-400"
                onClick={() => handleCrossButtonClick(notification._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Notifications;
