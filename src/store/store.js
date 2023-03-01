import { configureStore } from "@reduxjs/toolkit";
import NotificationSlice from "./NotificationSlice";


const store = configureStore({
    reducer: {
        notification: NotificationSlice.reducer
    }
})

export default store;