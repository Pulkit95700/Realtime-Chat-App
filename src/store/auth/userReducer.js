import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    userPhotoUrl: null,
    userName: null
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        setUser(state, action){
            state.isAuthenticated = true;
            state.userPhotoUrl = action.payload.userPhotoUrl;
            state.userName = action.payload.userName;
        },
        logout(state){

        }
    }
})

export default userSlice;