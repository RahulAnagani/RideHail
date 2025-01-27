import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import fetchIt from "./fetchSlice";
import Cap from "./Captain";
import Ride from "./Ride";
const store=configureStore({
    reducer:{
        user:UserSlice.reducer,
        fetchStatus:fetchIt.reducer,
        captain:Cap.reducer,
        Ride:Ride.reducer,
    }
})
export default store