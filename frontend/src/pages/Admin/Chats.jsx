import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { adminInterceptor } from '../../helper/interceptor/axios';
const { Header } = Layout;

function Chats() {
    const navigate = useNavigate();
    const [chattedUsers, setChattedUsers] = useState([]);

    const getChattedUsersList = async () => {
        try {
            const response = await adminInterceptor({
                url: '/api/admin/get-chatted-users-list',
                method: 'get'
            });
            setChattedUsers(response.data.chattedUsers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getChattedUsersList();
    }, []);

    const chatWithThisUser = (userData) => {
        navigate('/admin/chats/personal',{ state: { userData } })
    };

    return (
        <div>
            <Header
                className="site-layout-background"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 16px',
                }}
            >
                <div>
                    <button>
                        <Link to="/admin">
                            <h2 style={{ color: 'white' }}>Dashboard</h2>
                        </Link>
                    </button>
                </div>
            </Header>

            <div className="main_chats_div">
                <div
                    className="chats-contact"
                    style={{ maxHeight: '500px', overflowY: 'auto' }}
                >
                    <div className="container mx-auto py-8">
                        <h1 className="text-2xl font-semibold mb-4 text-black">CHATS</h1>
                        {!chattedUsers ? (
                            <div className="text-center text-black">NO CHATS</div>
                        ) : (
                            
                            <ul className="">
                                {chattedUsers.map((user) => (
                                    <li
                                        key={user._id}
                                        className="bg-white p-4 mb-4 rounded-lg shadow cursor-pointer"
                                        onClick={() => chatWithThisUser(user)}
                                    >
                                        <div className="sample1">
                                            <div className="sample3">
                                                <img
                                                    src={user.image}
                                                    alt="Profile"
                                                    className="w-12 h-12 rounded-full mr-4"
                                                />
                                            </div>
                                            <div className="sample" onClick={() => chatWithThisUser(user)}>
                                                <h2 className="text-lg text-black font-semibold">
                                                    {user.name}
                                                </h2>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chats;
