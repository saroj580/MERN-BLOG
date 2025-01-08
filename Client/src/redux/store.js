import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/user/userSlice.js'
export const store = configureStore({
    reducer: {
        user : userReducer,
    },
})