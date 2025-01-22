import { createSlice } from "@reduxjs/toolkit";
const UserSlice=createSlice({
    name:"User",
    initialState:{},
    reducers:{
        setIt:(state,action)=>{
            return {
                fullName:action.payload.fullName,
                email:action.payload.email
            }
        }
    }
});
export const actions=UserSlice.actions
export default UserSlice