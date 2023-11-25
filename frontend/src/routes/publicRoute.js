import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRouteUser = (props) => {
    if(localStorage.getItem('token'))
    {
        return <Navigate to='/' />
    }
    else
    {
        return props.children
    }
}

export const PublicRouteTrainer = (props) => {
    if(localStorage.getItem('trainerKey'))
    {
        return <Navigate to='/trainer' />
    }
    else
    {
        return props.children
    }
}

export const PublicRouteAdmin = (props) => {
    if(localStorage.getItem('adminKey'))
    {
        return <Navigate to='/admin' />
    }
    else
    {
        return props.children
    }
}




