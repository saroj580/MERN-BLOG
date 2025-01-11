import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    deleteStatus: null // Track deletion status
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUser: (state, action) => {
            state.currentUser = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
            state.deleteStatus = null;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
            state.deleteStatus = 'success';
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.deleteStatus = 'failure';
        }
    }
})

export const { signInFailure, signInStart, signInSuccess, updateUser, deleteUserStart, deleteUserSuccess, deleteUserFailure } = userSlice.actions;
export default userSlice.reducer;
