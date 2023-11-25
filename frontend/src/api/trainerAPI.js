import {trainerInterceptor} from "../helper/interceptor/axios";


export const trainerDataAPI = async () => {
    try {
        const response = await trainerInterceptor({url:'/api/trainer/get-trainerdata', method: "GET"});
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};


// for getting all the categories
export const categoryListAPI = async () => {
    try {
        const response = await trainerInterceptor({url:'/api/trainer/categoryList', method: "GET" });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};

export const updateTrainerProfileAPI = async (formData) => {
    try {
        const response = await trainerInterceptor({url:'/api/trainer/edit-profile', method: "POST", data:formData});
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};


export const listServicesAPI = async () => {
    try {
        const response = await trainerInterceptor({url:'/api/trainer/list-services', method: "GET"});
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};

export const deletecourseAPI = async (courseId) => {
    try {
        const response = await trainerInterceptor({url:'/api/trainer/delete-course', method: "DELETE", data:{courseId} });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};

export const getReviewsAPI = async (courseId) => {
    try {
        const response = await trainerInterceptor({url:`/api/trainer/get-reviews?courseId=${courseId}`, method: "GET" });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};
