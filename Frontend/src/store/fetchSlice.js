import { createSlice } from "@reduxjs/toolkit";
const fetchIt=createSlice({
    name:"Fetch",
    initialState:{fetching:false,fetchShim:false},
    reducers:{
        fetchStart:(state)=>{
            return {...state,fetching:true}
        },
        fetchEnd:(state)=>{
            return {...state,fetching:false};
        },
        fetchShimStart:(state)=>{
            return {...state,fetchShim:true}
        },
        fetchshimEnd:(state)=>{
            return {...state,fetchShim:false};
        }
    }
})
export const fetchactions=fetchIt.actions;
export default fetchIt;