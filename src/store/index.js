import userSlice from "./auth/userReducer";
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {user: userSlice.reducer}
})

export default store;