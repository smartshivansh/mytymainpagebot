import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        mobile: "",
        email: "",
        chat:[],
        prompt:"",
    },
    reducers:{
        chatUpdate: (state, action) => {
            console.log(state.chat)
            state.chat = [...state.chat, action.payload.chat],
            state.prompt = action.payload.prompt
        },

        userUpdate: (state, action) => {
            console.log(action.payload)
            state.chat = action.payload.chat,
            state.prompt = action.payload.prompt,
            state.name = action.payload.name,
            state.email = action.payload.email,
            state.name = action.payload.name
        },
    }
})
export const {chatUpdate, userUpdate} = UserSlice.actions;
export default UserSlice;