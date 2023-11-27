import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { categoryListAPI } from '../../api/trainerAPI';
import { trainerInterceptor } from '../../helper/interceptor/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import TrainerNavbar from '../../components/trainer/TrainerNavbar';

function TrainerEditCourse() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const { course } = location.state || {};

    const [formData, setFormData] = useState({
        category: course ? course.category : '',
        course_name: course ? course.course_name : '',
        time: course ? course.time : '',
        amount: course ? course.amount : '',
        description: course ? course.description : '',
        image: null,
    });

    const [formErrors, setFormErrors] = useState({
        category: '',
        course_name: '',
        time: '',
        amount: '',
        description: '',
    });

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await categoryListAPI();
                const { success, data } = response.data;
                if (success) {
                    setCategories(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const validateForm = () => {
        let errors = {};

        if (!formData.category.trim()) {
            errors.category = 'Category is required';
        }
        if (!formData.course_name.trim()) {
            errors.course_name = 'Course name is required';
        }
        if (!formData.time) {
            errors.time = 'time is required';
        }
        const amountString = String(formData.amount);
        if (!amountString.trim()) {
            errors.amount = 'Amount is required';
        } else if (!/^\d+$/.test(amountString)) {
            errors.amount = 'Amount should only contain numbers';
        }
        if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            try {
                const formDataForUpdate = new FormData();

                formDataForUpdate.append('courseId', course._id);
                formDataForUpdate.append('category', formData.category);
                formDataForUpdate.append('course_name', formData.course_name);
                formDataForUpdate.append('time', formData.time);
                formDataForUpdate.append('amount', formData.amount);
                formDataForUpdate.append('description', formData.description);

                if (imageFile) {
                    formDataForUpdate.append('image', imageFile);
                }

                trainerInterceptor({
                    url: "/api/trainer/course_edit",
                    method: 'POST',
                    data: formDataForUpdate
                })
                .then((response)=>{
                    if(response.data.success){
                        toast.success('Course updated successfully');
                        navigate('/trainer/profile/services'); 
                    }
                })

            } catch (error) {
                console.error(error);
                toast.error('Error in updating course');
            }
        } else {
            setFormErrors(errors);
            toast.error('Please fill all the fields.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setImageFile(files[0]);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    return (
        <div>
            <TrainerNavbar />
            <div className="p-6 artist_details-form ">
                <h1 className="mb-9 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white category_heading">
                    Edit Course Details
                </h1>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="category" className="artistDetailsLabel">
                                Course Category
                            </label>
                            <select
                                id="category"
                                value={formData.category}
                                name="category"
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 artistDetailsInput"
                            >
                                <option value="">Choose a Category</option>
                                {categories.map((element) => (
                                    <option key={element.name} value={element.name}>
                                        {element.name}
                                    </option>
                                ))}
                            </select>
                            <div className="text-red-500 text-sm mb-2">{formErrors.category}</div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="floating_last_name" className="artistDetailsLabel">
                                Course Name
                            </label>
                            <input
                                type="text"
                                name="course_name"
                                value={formData.course_name}
                                id="floating_last_name"
                                onChange={handleInputChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer artistDetailsInput"
                                placeholder=" "
                            />
                            <div className="text-red-500 text-sm mb-2">{formErrors.course_name}</div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="time" className="artistDetailsLabel">
                                Time
                            </label>
                            <select
                                id="time"
                                value={formData.time}
                                name="time"
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 artistDetailsInput"
                            >
                                <option value="">Choose time</option>
                                <option value="6">6 AM</option>
                                <option value="7">7 AM</option>
                                <option value="8">8 AM</option>
                            </select>
                            <div className="text-red-500 text-sm mb-2">{formErrors.time}</div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="floating_first_name" className="artistDetailsLabel">
                                Amount per Month
                            </label>
                            <input
                                type="text"
                                name="amount"
                                value={formData.amount}
                                id="floating_first_name"
                                onChange={handleInputChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer artistDetailsInput"
                                placeholder=" "
                            />
                            <div className="text-red-500 text-sm mb-2">{formErrors.amount}</div>
                        </div>
                    </div>
                    <label htmlFor="message" className="artistDetailsLabel">
                        Description
                    </label>
                    <textarea
                        id="message"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 artistDetailsInput"
                        placeholder="Write your thoughts here..."
                    ></textarea>
                    <div className="text-red-500 text-sm mb-2">{formErrors.description}</div>
                    <label className="artistDetailsLabel" htmlFor="file_input">
                        Existing Image
                    </label>
                    {course.image && (
                        <div className="mb-3">
                            <img src={course.image} alt="Existing Course" className="max-w-full h-auto max-h-16"/>
                        </div>
                    )}
                    <label className="artistDetailsLabel" htmlFor="file_input">
                        Upload a New Picture
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 artistDetailsInput"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        onChange={handleInputChange}
                    />
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

export default TrainerEditCourse;
