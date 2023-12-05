import React, { useState } from 'react';
import { Button, Layout, Space, Badge } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const { Header } = Layout;

function HeadNavbar() {
    const navigate = useNavigate();
    const [messageCount, setMessageCount] = useState(0);

    const singOut = () => {
        try {
            localStorage.removeItem('adminKey');
            navigate('/admin/login');
        } catch (error) {
            toast('something went wrong');
        }
    };

    const handleChatClick = () => {
       navigate('/admin/chats')
    };

    // Example: You can update the message count using this function
    const updateMessageCount = (count) => {
        setMessageCount(count);
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
                    <h2 style={{ color: 'white' }}>Admin Dashboard</h2>
                </div>
                <div>
                    <Space>

                        <Button type="link" onClick={handleChatClick}>
                            <Badge count={messageCount} overflowCount={99}>
                                <MessageOutlined style={{ fontSize: '1.5em', color: 'white' }} />
                            </Badge>
                        </Button>

                        <Button type="primary" onClick={singOut}>
                            Logout
                        </Button>

                    </Space>
                </div>
            </Header>
        </div>
    );
}

export default HeadNavbar;
