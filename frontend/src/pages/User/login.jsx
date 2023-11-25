import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice'
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/login', values);
            const { success, message, data } = response.data;
            dispatch(hideLoading())
            if (success) {
                toast.success(message);
                toast('Redirecting to Home page')
                localStorage.setItem('token', data)
                navigate('/')
            } else {
                dispatch(hideLoading())
                toast.error(message);
            }

        } catch (error) {
            toast.error('Something went wrong');
        }
    }

    const googleSigin = async (name, email) => {
        try {
            const values = { name, email }
            if (values) {
                dispatch(showLoading())
                const response = await axios.post('/api/user/google-login', values);
                const { success, message, data } = response.data;
                dispatch(hideLoading())
                if (success) {
                    toast.success(message);
                    toast('Redirecting to Home page')
                    localStorage.setItem('token', data)
                    navigate('/')
                } else {
                    dispatch(hideLoading())
                    toast.error(message);
                }
            }
            else {
                console.log('no email or name fetched from google login')
            }

        } catch (error) {
            toast.error('Something went wrong');
        }
    }


    return (
        <div className='authentication'>
            <div className='authentication-form card p-4'>
                <h1 className='login-google'>LOGIN USING GMAIL</h1>
                <GoogleOAuthProvider clientId="539914483472-s467g3nhsucr53gmqa6nm9e61uued2t6.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const details = jwtDecode(credentialResponse.credential)
                            googleSigin(details.name, details.email)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }} />
                </GoogleOAuthProvider>
                <h1 className='login-google-or'>OR</h1>
                <Form layout='vertical' onFinish={onFinish}>

                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Enter your email' />
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <Input.Password placeholder='Enter your password' type='password' />
                    </Form.Item>

                    <Link to="/forgotPassword" className="forgot-password">Forgot Password</Link>

                    <Button className='primary-button mt-3' htmlType='submit'> LOGIN</Button>

                    <Link to="/register" className="register">New Here ? Create An Account</Link>

                </Form>
            </div>
        </div>)
}

export default Login
