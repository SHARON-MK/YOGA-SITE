import {userInterceptor} from "../helper/interceptor/axios";



export const userDataAPI = async () => {
    try {
        const response = await userInterceptor({url:'/api/user/get-userdata', method: "GET"});
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};


export const updateUserProfileAPI = async (formData) => {
    try {
        const response = await userInterceptor({url:'/api/user/edit-profile', method: "POST", data:formData});
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
        const response = await userInterceptor({url:'/api/user/categoryList', method: "GET" });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};


export const coursesListAPI = async () => {
    try {
        const response = await userInterceptor({url:'/api/user/coursesList', method: "GET" });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};

export const filteredCoursesListAPI = async (selectedCategory,searchQuery,sortOrder) => {
    try {
        const apiUrl = `/api/user/selected-courseList`;
        const queryString = `?category=${encodeURIComponent(selectedCategory)}&search=${encodeURIComponent(searchQuery)}&order=${encodeURIComponent(sortOrder)}`;
        
        const response = await userInterceptor({
            url: apiUrl + queryString,
            method: "GET",
        });
        
        
        
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};

export const purchasesAPI = async () => {
    try {
        const response = await userInterceptor({url:'/api/user/purchaselist', method: "GET" });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};


export const cancelPurchaseAPI = async (orderId) => {
    try {
        const response = await userInterceptor({url:'/api/user/cancel-purchase', method: "DELETE", data:{orderId}});
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
        const response = await userInterceptor({url:`/api/user/get-reviews?courseId=${courseId}`, method: "GET" });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};
