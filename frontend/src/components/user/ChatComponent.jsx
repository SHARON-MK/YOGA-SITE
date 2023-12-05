import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import { adminInterceptor, userInterceptor } from '../../helper/interceptor/axios';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice'


const socket = io.connect('http://localhost:5000');

function ChatComponent() {
  const [message, setMessage] = useState('') // done
  const [messages, setMessages] = useState([]) // done
  const [adminId, setAdminId] = useState('')   // done

  const [userData, setUserdata] = useState('')
  const [adminData, setAdmindata] = useState('')   // done

  const [history, setHistory] = useState([])  // done
  const dispatch = useDispatch()

  const userIdActual = userData._id


  const getUserData = async () => {
    // dispatch(showLoading())
    userInterceptor({
      url: '/api/user/get-user-data',
      method: 'get'
    }).then((response) => {
      // dispatch(hideLoading())
      if (response.data.success) {
        setUserdata(response.data.data)
      }

    }).catch((error) => {
      // dispatch(hideLoading())
      toast.error('please login after try agains')
    })
  }



  function getChatHistory() {  // done
    // dispatch(showLoading())
    adminInterceptor({
      url: `/api/admin/chat-history?idOfUser=${userIdActual}`,
      method: 'get',
    }).then((response) => {
      // dispatch(hideLoading())
      if (response.data.success) {
        setHistory(response.data.chatData)
        setAdminId(response.data.adminId)
        history.map((items) => {
          if (items?.history.sender_id === response.data.adminId) {
            setMessages((prevMessages) => [...prevMessages, {
              message: items?.history.chat, sender: response.data.adminId, time: items?.history.time
            }]);
          } else {
            setMessages((prevMessages) => [...prevMessages, { text: items?.history.chat, sender: response.data.userIdActual, time: items?.history.time }]);
          }
        })
      }
    }).catch((error) => {
      // dispatch(hideLoading())
      toast.error('please login after try agains')
    })
  }

  const getAdminData = async () => {
    // dispatch(showLoading())
    userInterceptor({
      url: `/api/user/get-admin-data?test=${adminId}`,
      method: 'get'
    }).then((response) => {
      // dispatch(hideLoading())
      if (response.data.success) {
        setAdmindata(response.data.data)
      }

    }).catch((error) => {
      dispatch(hideLoading())
      toast.error('please login after try agains')
    })
  }

  useEffect(() => {
    if(userIdActual){
      getChatHistory()
    }
    getUserData()
    if (adminId) {
      getAdminData()
    }


    socket.on('chat', (data) => {
      const { room, text, sender } = data;
      if (room === userIdActual && sender !== userIdActual) {
        setMessages((prevMessages) => [...prevMessages, { message: text, sender, time: new Date() }]);
      }
    });
    socket.emit('join', userIdActual);

    return () => {
      socket.off('chat');
      socket.emit('leave', userIdActual);
    };

  }, [userIdActual, adminId])

  const handleSendMessage = () => {   // done
    if (message.trim() !== '') {
      socket.emit('chat', { room: userIdActual, text: message, sender: userIdActual });
      setMessages((prevMessages) => [...prevMessages, { text: message, time: new Date() }])
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="flex-1 p-2 sm:p-6 flex flex-col h-screen overflow-hidden">
        <div className="msg_divs flex flex-col justify-between h-full">
          <div id="messages" className="div-one flex flex-col space-y-4 p-3 overflow-y-auto flex-1">
            {messages.map((items) => {
              if (items.message) {
                const timeAgo = formatDistanceToNow(new Date(items?.time), {
                  addSuffix: true,
                });
                return < div className="chat-message" >
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                      <div >
                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-black-800">
                          {items.message}
                        </span>
                        <p className='text-gray-700'>{timeAgo}</p>
                      </div>
                    </div>
                    {items.message && (<>< img
                      src={adminData.image}
                      alt="My profile"
                      className="w-6 h-6 rounded-full order-1"
                    />
                    </>)
                    }
                  </div>

                </div>
              } else {
                const timeAgos = formatDistanceToNow(new Date(items?.time), {
                  addSuffix: true,
                });
                return <>< div class="" >
                  <div class="flex items-end justify-end">
                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">

                      <div >
                        <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                          {items.text}
                        </span>
                        <p className='text-gray-700'>{timeAgos}</p>
                      </div>

                    </div>
                    {items.text && < img src={userData.image} alt="My profile" class="w-6 h-6 rounded-full order-2" />}
                  </div>

                </div>

                </>
              }
            })}
          </div >
          <div className="div-2 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="type message"
                className="w-2/3 chat-input-field focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-2 bg-gray-100 rounded-md py-1 mr-2"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="chat-sen-button-user h-8 inline-flex items-center justify-center rounded-lg px-2 py-1 transition duration-500 ease-in-out text-white bg-gray-600 hover:bg-blue-500 focus:outline-none send_btn"
              >
                <span className="font-bold text-sm">Send</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 ml-1 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div >
      </div >
    </div>
  );
}

export default ChatComponent;
