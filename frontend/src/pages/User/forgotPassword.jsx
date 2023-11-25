import React from 'react'
import {Button, Form, Input} from 'antd'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice'

function ForgotPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async(value)=>{
           try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/forgotpassword', value)
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/login')
            } else {
                dispatch(hideLoading())
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast('somthing went wrong')
        }
  }
  return (
    <div>
       <div className='authentication'>
        <div className='authentication-form card p-4'>
            <h1 className='card-title'> Verify Your Accouont </h1>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label='Enter email' name='email'>
                    <Input placeholder='email'/>
                </Form.Item>
                <Button className='primary my-1' htmlType='submit'> SUBMIT </Button>
            </Form>
        </div>
    </div>
    </div>
  )
}

export default ForgotPassword
