import { createSlice } from "@reduxjs/toolkit";
const Cap=createSlice({
    name:"Captain",
    initialState:{},
    reducers:{
        init:(state,action)=>{
            return action.payload;
        }
    }
})
export const capActions=Cap.actions;
export default Cap;