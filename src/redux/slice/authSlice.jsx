import {createSlice} from "@reduxjs/toolkit";


export const authSlice = createSlice({

    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || {},
        isLogging: JSON.parse(localStorage.getItem("isLogging")) || false
    },
    reducers: {
        getUserDetails: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload))
            localStorage.setItem("isLogging", true)
            state.user = action.payload
            state.isLogging = true
        },

        userLogout:(state)=>{
            localStorage.clear();
            state.user={}
            state.isLogging = false

        }


    }

})


export const {getUserDetails, userLogout} = authSlice.actions

export default authSlice.reducer