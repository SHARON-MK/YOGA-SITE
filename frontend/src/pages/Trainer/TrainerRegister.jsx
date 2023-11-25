import React from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice';
import { UploadOutlined } from '@ant-design/icons';

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

function TrainerRegister() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());

            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('confirmpassword', values.confirmpassword);
            formData.append('idcard', values.idcard[0].originFileObj);

            const response = await axios.post('/api/trainer/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            dispatch(hideLoading());

            if (response.data.success) {
                toast.success(response.data.message);
                toast('Redirecting to otp page');
                navigate('/trainer/otpPage');
            } else {
                dispatch(hideLoading());
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className='authentication-trainer'>
            <div className='authentication-form card p-4'>
                <h1 className='card-title'>TRAINER'S REGISTER</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Name' name='name'>
                        <Input placeholder='name' />
                    </Form.Item>

                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email' />
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <Input.Password placeholder='password' type='password' />
                    </Form.Item>

                    <Form.Item label='Confirm Password' name='confirmpassword'>
                        <Input.Password placeholder='password' type='password' />
                    </Form.Item>

                    <Form.Item
                        label='ID Card Image'
                        name='idcard'
                        valuePropName='fileList'
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: 'Please upload your ID card image!',
                            },
                        ]}
                    >
                        <Upload name='idcard' action='/api/trainer/register' listType='picture'>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>

                    </Form.Item>

                    <Button className='primary-button mt-3' htmlType='submit'>
                        REGISTER
                    </Button>

                    <Link to='/trainer/login'>CLICK HERE TO LOGIN</Link>
                </Form>
            </div>
        </div>
    );
}

export default TrainerRegister;
