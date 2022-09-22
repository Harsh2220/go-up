import { configureStore } from "@reduxjs/toolkit";
import { currentUser } from "./slices/userSlice";
import currentUserReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        userData: currentUserReducer
    }
})