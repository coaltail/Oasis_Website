import { createSlice } from '@reduxjs/toolkit';

export interface AuthState{
    user: any,
    accessToken: string | null,
    refreshToken: string | null
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setLogout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null
        }
    }
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;