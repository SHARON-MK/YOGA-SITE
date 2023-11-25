import {adminInterceptor} from "../helper/interceptor/axios";


// for fetching user details to display in admin user list page
export const usersListAPI = async () => {
    try {
        const response = await adminInterceptor({url:'/api/admin/get-userdata', method: "GET"});
        if (response.data.success) {

            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};

// for block or unblock the user
export const blockUserAPI = async (user) => {
    try {
        const response = await adminInterceptor({url:'/api/admin/blockActionUser', method: "POST", data:user });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};

// for fetching trainers details to display in admin trainer list page
export const trainersListAPI = async () => {
    try {
        const response = await adminInterceptor({url:'/api/admin/get-trainerData', method: "GET"});
        if (response.data.success) {

            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        console.log('1');
        throw error;
    }
};


// for block or unblock the trainer
export const blockTrainerAPI = async (trainer) => {
    try {
        const response = await adminInterceptor({url:'/api/admin/blockActionTrainer', method: "POST", data:trainer });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};

// for adding new category
export const addCategoryAPI = async (category) => {
    try {
        const response = await adminInterceptor({url:'/api/admin/addCategory', method: "POST", data:category });
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
export const categoryListAPI = async (category) => {
    try {
        const response = await adminInterceptor({url:'/api/admin/categoryList', method: "GET" });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};


// for block or unblock the trainer
export const blockCategoryAPI = async (category) => {
    try {
        const response = await adminInterceptor({url:'/api/admin/blockCategory', method: "POST", data:category });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};