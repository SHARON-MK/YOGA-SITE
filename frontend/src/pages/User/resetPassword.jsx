import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice'

function ResetPassword() {

  const [token, setToken] = useState('');
  useEffect(() => {
    const tokenValue = window.location.search.split('=')[1];  // used to fetch token from query 
    setToken(tokenValue);
  }, []);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/resetPassword', { ...values, token });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
      } else {
        dispatch(hideLoading());
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast('Something went wrong');
    }
  };

  return (
    <div className='authentication'>
      <div className='authentication-form card p-4'>
        <h1 className='card-title'> RESET PASSWORD </h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Enter new password' name='password'>
            <Input.Password type='password' placeholder='Enter new password' />
          </Form.Item>
          <Form.Item label='Confirm password' name='cpassword'>
            <Input.Password type='password' placeholder='Confirm password' />
          </Form.Item>
          <Button className='primary my-1' htmlType='submit'> RESET </Button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;





