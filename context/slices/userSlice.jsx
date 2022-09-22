import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticated: false,
    currentUser: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        currentUser: (state, action) => {
            state.authenticated = true
            state.currentUser = action.payload
        }
    }
})


export const { currentUser } = userSlice.actions;

export default userSlice.reducer;