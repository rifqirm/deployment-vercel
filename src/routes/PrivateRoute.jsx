import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const PrivateRoute = () => {

    let user

    // Get token dari Local Storage
    const token = localStorage.getItem('token')
    console.log(token)

    // Check token dari Local Storage
    token ? user = true : user= false;

    if(!user) {
        return <Navigate to={'/login'} replace />
    } else{
        return <Outlet />
    }
}

export default PrivateRoute