import axios from "axios";
// to config base url
// FOR USER
const user = axios.create({ baseURL: "http://localhost:5000" }) 
export const userInterceptor = ({ ...options }) => {
    user.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return user(options).then(onSuccess).catch(onError)
}

// FOR TRAINER
const trainer = axios.create({ baseURL: "http://localhost:5000" })
export const trainerInterceptor = ({ ...options }) => {
    trainer.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('trainerKey')}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return trainer(options).then(onSuccess).catch(onError)
}

// FOR ADMIN
const admin = axios.create({ baseURL: "http://localhost:5000" })
export const adminInterceptor = ({ ...options }) => {
    admin.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('adminKey')}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return admin(options).then(onSuccess).catch(onError)
}   