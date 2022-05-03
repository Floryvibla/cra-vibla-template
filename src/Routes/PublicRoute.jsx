import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify';

function PublicRoute({ children }) {

    const storage= JSON.parse(localStorage.getItem("@investpage/auth"))
    
    if (storage) {
        // toast.error("need to be logged in.")
        return <Navigate to='/feed' replace />
    }

    return children ? children : <Outlet />
}



export default PublicRoute