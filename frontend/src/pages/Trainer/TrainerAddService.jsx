import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice';
import { categoryListAPI } from '../../api/trainerAPI';
import { trainerInterceptor } from '../../helper/interceptor/axios';
import { useNavigate } from 'react-router-dom';
import TrainerNavbar from '../../components/trainer/TrainerNavbar'

function TrainerAddService() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        category: '',
        course_name: '',
        time: '',
        amount: '',
        description: '',
        image: null
    });

    const [validations, setValidations] = useState({
        category: true,
        course_name: true,
        time: true,
        amount: true,
        description: true,
        image: true
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(showLoading());
                const response = await categoryListAPI();
                const { success, message, data } = response.data;
                dispatch(hideLoading());
                if (success) {
                    toast.success(message);
                    setCategories(data);
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBlur = (name) => {
        if (name === 'amount') {
            setValidations({
                ...validations,
                [name]: !isNaN(formData[name]) && formData[name].trim() !== ''
            });
        } else {
            setValidations({
                ...validations,
                [name]: formData[name].trim() !== ''
            });
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file
            }));
            setValidations({
                ...validations,
                image: true
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Object.values(validations).every((value) => value);

        if (!isValid) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (formData.category === '') {
            toast.error('please select category')
        } else if (formData.time === '') {
            toast.error('please select time')
        } else {
            const formDataToSend = new FormData();
            formDataToSend.append('category', formData.category);
            formDataToSend.append('course_name', formData.course_name);
            formDataToSend.append('time', formData.time);
            formDataToSend.append('amount', formData.amount);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('image', formData.image);

            trainerInterceptor({
                url: "/api/trainer/course_registration",
                method: 'POST',
                data: formDataToSend
            })
                .then((response) => {
                    if (response.data.success === 'image') {
                        toast.error(response.data.message)
                    }
                    else if (response.data.success) {
                        toast.success(response.data.message)
                        navigate('/trainer/profile')
                    }
                    else {
                        toast.error(response.data.message)
                    }
                })
                .catch((err) => toast('Please log in after trying'));
        }
    };

    return (
        <div>
            <TrainerNavbar/>
            <div className="p-6 artist_details-form ">
                <h1 className="mb-9 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white category_heading">Register Course Details</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="category" className="artistDetailsLabel">Course Category</label>
                            <select
                                id="category"
                                onChange={handleChange}
                                value={formData.category}
                                name='category'
                                onBlur={() => handleBlur('category')}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 artistDetailsInput"
                            >
                                <option value=''>Choose a Category</option>
                                {categories.map((element) => (
                                    <option key={element.name} value={element.name}>{element.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="floating_last_name" className="artistDetailsLabel">Course Name</label>
                            <input
                                type="text"
                                name="course_name"
                                id="floating_last_name"
                                onChange={handleChange}
                                onBlur={() => handleBlur('course_name')}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer artistDetailsInput"
                                placeholder=" "
                            />
                            {validations.course_name === false && <p className="text-red-500">Please enter a category name.</p>}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="time" className="artistDetailsLabel">Time</label>
                            <select
                                id="time"
                                onChange={handleChange}
                                value={formData.time}
                                name="time"
                                onBlur={() => handleBlur('time')}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 artistDetailsInput"
                            >
                                <option value="">Choose time</option>
                                <option value="6">6 AM</option>
                                <option value="7">7 AM</option>
                                <option value="8">8 AM</option>
                            </select>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="floating_first_name" className="artistDetailsLabel">Amount per Month</label>
                            <input
                                type="text"
                                name="amount"
                                id="floating_first_name"
                                onChange={handleChange}
                                onBlur={() => handleBlur('amount')}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer artistDetailsInput"
                                placeholder=" "
                            />
                            {validations.amount === false && <p className="text-red-500">Please enter an amount.</p>}
                        </div>
                    </div>
                    <label htmlFor="message" className="artistDetailsLabel">Description</label>
                    <textarea
                        id="message"
                        rows="4"
                        onChange={handleChange}
                        onBlur={() => handleBlur('description')}
                        name="description"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 artistDetailsInput"
                        placeholder="Write your thoughts here..."
                    ></textarea>
                    {validations.description === false && <p className="text-red-500">Please enter a description.</p>}
                    <label className="artistDetailsLabel" htmlFor="file_input">Upload a Picture</label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 artistDetailsInput"
                        aria-describedby="file_input_help"
                        onChange={handleImageChange}
                        id="file_input"
                        type="file"
                    />
                    {validations.image === false && <p className="text-red-500">Please upload an image.</p>}
                    <button
                        type="submit"
                        className="mt-5 mb-2text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 artistDetails_botton"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TrainerAddService;
