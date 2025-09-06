import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state,action) => {
           state.users = action.payload
        },
        removeUserFromFeed: (state,action) => {

            state.users = state.users.filter(user => user._id !== action.payload )


        }
    }
})

export const {setUsers, removeUserFromFeed} =  userSlice.actions

export default userSlice.reducer;


