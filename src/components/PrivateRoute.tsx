import React from 'react';
import { AuthState } from '../state/redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ user, children, message }: { user: AuthState['user'], children: React.ReactNode, message?: string }): JSX.Element => {
    if (!user) {
        return (
            <React.Fragment>
                <Navigate to="/login" replace state={message} />
            </React.Fragment>
        )
    }
    return (
        <>
            {children}
        </>

    )
}

export default PrivateRoute;