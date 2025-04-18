import { useState,useRef } from "react";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { HiMiniEye } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";
import { fetchactions } from "../store/fetchSlice";
import axios from "axios";
import Loader from "../components/Loader";
const UserSignup=()=>{
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const dispatch=useDispatch();
    const nav=useNavigate();
    const [type,setType]=useState("password");
    const handlePrivacy=(e)=>{
        type=="password"?setType("text"):setType("password");
    }
        const email=useRef();
            const password=useRef();
            const firstName=useRef();
            const lastName=useRef();
    return (
        <>
        <Loader></Loader>
        <div className="h-screen w-full flex flex-col">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" className="mt-5 ml-10 h-15 w-20"></img>
            <div className="w-full flex flex-col  h-3/4 p-10 gap-1/2">
            <form onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault();}}} onSubmit={async(e)=>{
                e.preventDefault();
                const user={
                    fullName:{
                        firstName:firstName.current.value,
                        lastName:lastName.current.value
                    },
                    email:email.current.value,
                    password:password.current.value
                }
                try{
                    dispatch(fetchactions.fetchStart())
                    const response=await axios.post(`${API_BASE_URL}/user/register`,user);
                    dispatch(fetchactions.fetchEnd())
                    if(response.status===201){
                        localStorage.setItem("token",response.data.token);
                        dispatch(actions.setIt(user));
                        nav("/dashboard");
                    }
                    email.current.value="";
                    firstName.current.value="";
                    lastName.current.value="";
                    password.current.value="";
                }
                catch(e){
                    dispatch(fetchactions.fetchEnd())
                    if(e.response.data.goal){
                        nav("/login");
                    }
                }
            }}>
            <div className="flex flex-col gap-4 mb-10 w-full">
            <h3 className="text-l font-semibold ">What's your name</h3>
            <div className="flex flex-row gap-2.5 w-full justify-center items-center">
            <input required ref={firstName} type="text" className="rounded border-transparent p-3 bg-[#eeeeee] w-1/2" placeholder="First name"></input>
            <input type="text" ref={lastName} className="rounded border-transparent p-3 bg-[#eeeeee] w-1/2" placeholder="Last name"></input>
            </div>
            </div>
            <div className="flex flex-col gap-4 mb-10">
            <h3 className="text-l font-semibold ">What's your email</h3>
            <input required ref={email} type="email" className="rounded border-transparent p-3 bg-[#eeeeee] " placeholder="Snow @example.com"></input>
            </div>
            <div className="flex flex-col gap-4">
            <h3 className="text-l font-semibold">Enter Password</h3>
            <div className="collab relative flex flex-col justify-center">
            <input type={`${type}`} ref={password} className="w-full rounded border-transparent p-3 bg-[#eeeeee]" placeholder="password"></input>
            {
                type=="password"?<HiMiniEyeSlash onClick={()=>handlePrivacy()} className="absolute right-5 cursor-pointer" />:<HiMiniEye onClick={()=>handlePrivacy()} className="absolute right-5 cursor-pointer"/>
            }
            </div>
            </div>
            <button className="w-full bg-black rounded mt-5 p-2 font-semibold text-white">Register as a User</button>
            </form>
            <div className="flex-wrap div w-full flex justify-center items-center mt-3">
                Already have a account?&nbsp;<Link to="/login" className="text-blue-600">Login here</Link>
            </div>
            </div> 
        </div>
            </>
    )
}
export default UserSignup