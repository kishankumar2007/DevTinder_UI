import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import connectionSlice from"./connectionSlice"
import userSlice from "./userSlice"

const store = configureStore({
    reducer: {
            auth: authSlice,
            connection: connectionSlice,
            users: userSlice
    }}
)


export default store