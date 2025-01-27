import { createSlice } from "@reduxjs/toolkit";
const Ride=createSlice({
    name:"Ride",
    initialState:{},
    reducers:{
        init:(state,action)=>{
            return action.payload;
        }
    }
})
export const RideActions=Ride.actions;
export default Ride;