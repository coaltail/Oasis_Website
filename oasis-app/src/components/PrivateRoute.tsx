import React from 'react'
import { AuthState } from '../state/redux'
import { Navigate } from 'react-router-dom'
const PrivateRoute = ({ user, children }: { user: AuthState['user'], children: React.ReactNode }) => {
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default PrivateRoute