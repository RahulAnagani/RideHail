import { createSlice } from "@reduxjs/toolkit";
const Selction=createSlice({
    name:"Selection",
    initialState:{},
    reducers:{
        setLocation:(state,action)=>{
            return {...state,location:action.payload.location}
        },
        setVehicle:(state,action)=>{
            return {...state,vehicle:{status:true,vehicle:action.payload.vehicle}}
        },
                
        }
    }
})