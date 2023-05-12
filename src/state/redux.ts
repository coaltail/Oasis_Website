import { createSlice } from '@reduxjs/toolkit';


export interface User {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    paymentMethods: number[],
    phone: string,
    shippingAddress: string,
    role: string
}

export interface AuthState {
    user: User | null | undefined,
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
        },
        setLogout: (state) => {
            state.user = null;
        }
    }
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;