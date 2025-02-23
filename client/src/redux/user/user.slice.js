import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    token: null,
    error: null,
    loading: false,
};

const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        authInStart: (state) => {
            state.loading = true;
        },
        authInSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;
        },
        authInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUser: (state) => {
            return initialState;
        },
        logOutUser: (state) => {
            return initialState;
        },
    },
});

export const { 
    authInStart, 
    authInSuccess, 
    authInFailure,
    deleteUser, 
    logOutUser,
} = userSlice.actions;

export default userSlice.reducer;