import React from 'react'
import {Button, Form, Input} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice'

function Adminlogin() {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            console.log('2');
            const response = await axios.post('/api/admin/login', values);
            console.log(response);
            console.log('4');
            const { success, message, data } = response.data;
            dispatch(hideLoading())
            if (success) {
                toast.success(message);
                toast('Redirecting to Dashboard')
                localStorage.setItem('adminKey',data)
                navigate('/admin')
            } else {
                dispatch(hideLoading())
                toast.error(message);
                
            }

        } catch (error) {
            toast.error('Something went wrong');
        }
    }
    return (
        <div className='authentication-admin'>
            <div className='authentication-form card p-4' style={{width: '400px'}}>
                <h1 className='card-title'>ADMIN</h1>
                <Form layout='vertical' onFinish={onFinish}>

                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email'/>
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <Input.Password placeholder='password' type='password'/>
                    </Form.Item>

                    <Button className='primary-button mt-3' htmlType='submit'> Login</Button>

                </Form>
            </div>
        </div>
    )
}

export default Adminlogin
