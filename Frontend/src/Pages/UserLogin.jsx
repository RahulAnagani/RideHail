import { useState,useRef } from "react";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { HiMiniEye } from "react-icons/hi2";
import { Link } from "react-router-dom";
const UserLogin=()=>{
    const [type,setType]=useState("password");
    const email=useRef();
        const password=useRef();
    const handlePrivacy=(e)=>{
        type=="password"?setType("text"):setType("password");
    }
    return (
        <div className="h-screen w-full flex flex-col">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" className="mt-5 ml-10 h-15 w-20"></img>
            <div className="w-full flex flex-col  h-3/4 p-10 gap-1/2">
            <form onSubmit={(e)=>{
                e.preventDefault();
            }}>
            <div className="flex flex-col gap-4 mb-10">
            <h3 className="text-l font-semibold ">What's your email</h3>
            <input ref={email} required type="email" className="rounded border-transparent p-3 bg-[#eeeeee] " placeholder="John@example.com"></input>
            </div>
            <div className="flex flex-col gap-4">
            <h3 className="text-l font-semibold">Enter Password</h3>
            <div className="collab relative flex flex-col justify-center">
            <input ref={password} type={`${type}`} className="w-full rounded border-transparent p-3 bg-[#eeeeee]" placeholder="password"></input>
            {
                type=="password"?<HiMiniEyeSlash onClick={()=>handlePrivacy()} className="absolute right-5 cursor-pointer" />:<HiMiniEye onClick={()=>handlePrivacy()} className="absolute right-5 cursor-pointer"/>
            }
            </div>
            </div>
            <button className="w-full bg-black rounded mt-5 p-2 font-semibold text-white">Login</button>
            </form>
            <div className="flex-wrap div w-full flex justify-center items-center mt-3">
                New here? <Link to="/signup" className="text-blue-600">Create new Account</Link>
            </div>
            </div>
            <div className="flex  justify-center items-center h-1/4 p-10">
                <Link className="border-transparent bg-green-500 rounded text-center font-semibold text-white p-2 w-full" to="/captain-login">Sign in as Captain</Link>
            </div>
        </div>
    )
}
export default UserLogin