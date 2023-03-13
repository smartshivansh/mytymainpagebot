import { configureStore } from "@reduxjs/toolkit";
import NotificationSlice from "./NotificationSlice";
import UserSlice from "./UserSlice";


const store = configureStore({
    reducer: {
        notification: NotificationSlice.reducer,
        user: UserSlice.reducer,
    }
})

export default store;