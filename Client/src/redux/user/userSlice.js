import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
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
            state.currentUser = action.payload; // Ensure profile picture is included in payload
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
})

export const { signInFailure, signInStart, signInSuccess, updateUser } = userSlice.actions;
export default userSlice.reducer;
