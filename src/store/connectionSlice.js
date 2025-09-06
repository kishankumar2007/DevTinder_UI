import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myConnection: [],
    connectionRequests: []
}
const connectionSlice = createSlice({
    name: "connection",
    initialState,
    reducers: {
        addConnection: (state, action) => {
            state.myConnection = [...action.payload]
        },
        connectionRequest: (state, action) => {
           state.connectionRequests = action.payload.map(user => user.fromUserId)

        },
        removeConnection: (state, action) => {
            state.connectionRequests = state.connectionRequests.filter(user => user._id !== action.payload)
        }
    }
})

export const { addConnection, removeConnection,connectionRequest } = connectionSlice.actions
export default connectionSlice.reducer