import React from 'react'
import {Button, Form, Input} from 'antd'
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice'

function Register() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/register', values);
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message);
                toast('Redirecting to Login page')
                navigate('/OtpPage')
            } else {
                dispatch(hideLoading())
                toast.error(response.data.message);
            }

        } catch (error) {
            dispatch(hideLoading())
            toast.error('Something went wrong');
        }
    }

    return (
        <div className='authentication'>
            <div className='authentication-form card p-4'>
                <h1 className='card-title'>SIGN UP</h1>
                <Form layout='vertical'
                    onFinish={onFinish}>

                    <Form.Item label='Name' name='name'>
                        <Input placeholder='name'/>
                    </Form.Item>

                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email'/>
                    </Form.Item>

                    <Form.Item label='Password' name='password' >
                        <Input.Password placeholder='password' type='password'/>
                    </Form.Item>

                    <Form.Item label='Confirm Password' name='confirmpassword'>
                        <Input.Password placeholder='confirm password' type='password'/>
                    </Form.Item>

                    <Button className='primary-button mt-3' htmlType='submit'>
                        Create an account</Button>

                    <Link to="/login">CLICK HERE TO LOGIN</Link>

                </Form>
            </div>
        </div>
    )
}

export default Register
