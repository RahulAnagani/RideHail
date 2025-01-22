import { createSlice } from "@reduxjs/toolkit";
const fetchIt=createSlice({
    name:"Fetch",
    initialState:{fetching:false},
    reducers:{
        fetchStart:(state)=>{
            return {...state,fetching:true}
        },
        fetchEnd:(state)=>{
            return {...state,fetching:false};
        }
    }
})
export const fetchactions=fetchIt.actions;
export default fetchIt;