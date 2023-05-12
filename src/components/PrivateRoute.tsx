import React from 'react'
import { AuthState } from '../state/redux'
import { Navigate } from 'react-router-dom'
const PrivateRoute = ({ user, children, message }: { user: AuthState['user'], children: React.ReactNode, message?: string }) => {
    if (!user) {
        return <Navigate to="/login" replace state={message}/>
    }
    return children
}

export default PrivateRoute