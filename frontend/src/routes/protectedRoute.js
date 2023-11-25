import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRouteUser = (props) =>{
  
    if(localStorage.getItem('token'))
    {
        return props.children
    }
    else
    {
        return <Navigate to='/login' />
    }
}


export const ProtectedRouteTrainer = (props) =>{
  
    if(localStorage.getItem('trainerKey'))
    {
       
        return props.children
    }
    else
    {
        return <Navigate to='/trainer/login' />
    }
}

export const ProtectedRouteAdmin = (props) =>{
  
    if(localStorage.getItem('adminKey'))
    {
        return props.children
    }
    else
    {
        return <Navigate to='/admin/login' />
    }
}
