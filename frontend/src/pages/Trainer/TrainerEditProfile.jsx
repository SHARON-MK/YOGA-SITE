import React, { useState, useEffect } from 'react';
import { trainerDataAPI, updateTrainerProfileAPI } from '../../api/trainerAPI';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import TrainerNavbar from '../../components/trainer/TrainerNavbar'

function TrainerEditProfile() {
    const [trainer, setTrainer] = useState(null);
    const [formData, setFormData] = useState({ name: '', age: '', city: '', country: '' });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        const response = await trainerDataAPI();
        const trainerData = response.data.data;
        setTrainer(trainerData);
        setFormData(trainerData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleFormChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleImageChange(e) {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formDataWithImage = new FormData();
        formDataWithImage.append('name', formData.name);
        formDataWithImage.append('age', formData.age);
        formDataWithImage.append('city', formData.city);
        formDataWithImage.append('country', formData.country);
        if (image) {
            formDataWithImage.append('image', image);
        }

        updateTrainerProfileAPI(formDataWithImage)
            .then((response) => {
                if (response.data.success) {
                    toast.success('Profile data updated');
                    navigate('/trainer/profile');
                }
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
            });
    }

    return (
        <div className='landing-page'>
            <TrainerNavbar/>
            <div className="edit-profile-form flex justify-center items-center h-screen">
                <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
                    <h2 className="text-2xl font-semibold mb-4 text-center">EDIT PROFILE</h2>
                    <form
                        encType="multipart/form-data"
                        noValidate=""
                        action=""
                        className="container flex flex-col mx-auto space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-full sm:col-span-1">
                                <label htmlFor="name" className="text-sm">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full p-2 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-gray-900"
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="col-span-full sm:col-span-1">
                                <label htmlFor="age" className="text-sm">Age</label>
                                <input
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    type="text"
                                    placeholder="Enter your age"
                                    className="w-full p-2 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-gray-900"
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>
                        <div className="col-span-full sm:col-span-1">
                            <label htmlFor="city" className="text-sm">City</label>
                            <input
                                id="city"
                                name="city"
                                value={formData.city}
                                type="text"
                                placeholder="Enter your city"
                                className="w-full p-2 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-gray-900"
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-1">
                            <label htmlFor="country" className="text-sm">Country</label>
                            <input
                                id="country"
                                name="country"
                                value={formData.country}
                                type="text"
                                placeholder="Enter your country"
                                className="w-full p-2 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-gray-900"
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="image" className="text-sm">Profile Image</label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="w-full p-2 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-gray-900"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="col-span-full">
                            <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Submit</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default TrainerEditProfile;
