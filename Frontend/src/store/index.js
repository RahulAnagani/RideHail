import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import fetchIt from "./fetchSlice";
import Cap from "./Captain";
const store=configureStore({
    reducer:{
        user:UserSlice.reducer,
        fetchStatus:fetchIt.reducer,
        captain:Cap.reducer
    }
})
export default store