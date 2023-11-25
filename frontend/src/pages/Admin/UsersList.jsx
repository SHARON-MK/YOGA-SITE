import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice'
import {Table, Button, Layout} from 'antd';
import HeadNavbar from '../../components/admin/HeadNavbar';
import Sidebar from '../../components/admin/Sidebar';
import { usersListAPI, blockUserAPI } from '../../api/adminAPI';
const {Content} = Layout;


function UsersList() {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({current: 1, pageSize: 10});

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(showLoading());
                const response = await usersListAPI();
                const {message, success, data} = response.data
                dispatch(hideLoading());
                if (success) {
                    toast.success(message);
                    setUsers(data);
                } else {
                    toast.error(message);
                }
            } catch (error) {
                dispatch(hideLoading());
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const columns = [
        {
            title: 'NO',
            dataIndex: 'key',
            key: 'key',
            render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'STATUS',
            dataIndex: 'blocked',
            key: 'blocked',
            render: (blocked) => (blocked ? 'BLOCKED' : 'ACTIVE')
        }, {
            title: 'ACTION',
            dataIndex: 'blocked',
            key: 'action',
            render: (blocked, record) => (blocked ? (
                <Button  type="primary"
                    onClick={
                        () => blockActionUser(record)
                }>
                    UNBLOCK
                </Button>
            ) : (
                <Button type="primary"
                    onClick={
                        () => blockActionUser(record)
                }>
                    BLOCK
                </Button>
            ))
        },
    ];

    const blockActionUser = async (record) => {
        try {
            dispatch(showLoading());
            const response = await blockUserAPI(record);
            const {success, message, data} = response.data;
            dispatch(hideLoading());
            if (success) {
                toast.success(message);
                setUsers(data);
            } else {
                toast.error(message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };


    return (
        <div>
            <Layout style={ {minHeight: '100vh'} }>
            <Sidebar/>    {/* component */}
            <Layout className="site-layout">
                <HeadNavbar/>     {/* component */}
                <Content style={ {margin: '16px'} }>
                    
                        <div style={ {  padding: 24, background: '#fff', minHeight: 360 } }>
                           <Table columns={columns}
                                  dataSource={users}
                                  pagination={pagination}
                                  onChange={
                                      (pagination) => setPagination(pagination)
                            }/>
                        </div>
                   </Content>
            </Layout>
        </Layout>
        </div>
    );
}

export default UsersList;
