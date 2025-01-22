import { useRef, useState } from "react";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { HiMiniEye } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GiCaptainHatProfile } from "react-icons/gi";
import DropDown from "../components/DropDown";
import { useDispatch } from "react-redux";
import { fetchactions } from "../store/fetchSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { capActions } from "../store/Captain";
import Loader from "../components/Loader";
const CaptainSignup=()=>{
    const dispatch=useDispatch();
    const nav=useNavigate();
    const [type,setType]=useState("password");
    const [tab,setTab]=useState("bike");
    const email=useRef();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const password=useRef();
        const firstName=useRef();
        const lastName=useRef();
        const plate=useRef();
        const color=useRef();
        const [capacity,setCapacity]=useState(1);
    const handlePrivacy=(e)=>{
        type=="password"?setType("text"):setType("password");
    }
    return (
        <>
        <Loader></Loader>
        <div className="h-screen w-full flex flex-col">
            <div className="flex">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" className="mt-5 ml-10 h-15 w-20"></img>
                        <GiCaptainHatProfile size={30} />
                        </div>
            <div className="w-full flex flex-col  h-3/4 p-10 gap-1/2">
            <form onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault();}}} onSubmit={async(e)=>{
                e.preventDefault();
                console.log(lastName.current.value)
                const captain={
                    fullName:{
                        firstName:firstName.current.value,
                        lastName:lastName.current.value
                    },
                    email:email.current.value,
                    password:password.current.value,
                    vehicle:{
                        color:color.current.value,
                        plate:plate.current.value,
                        type:tab,
                        capacity:capacity
                    }
                };
                try{
                    dispatch(fetchactions.fetchStart());
                    const response= await axios.post(`${API_BASE_URL}/captain/register`,captain);
                    dispatch(fetchactions.fetchEnd());
                    if(response.status===201){
                        localStorage.setItem("token",response.data.token);
                        dispatch(capActions.init({fullName:captain.fullName,email:captain.email,vehicle:captain.vehicle}));
                        nav("/CapDashboard");
                    }
                }
                catch(e){
                    dispatch(fetchactions.fetchEnd());
                    console.log(e)
                    if(e.response.data.goal){
                        nav("/captain-login")
                    }
                }
            }}>
            <div className="flex flex-col gap-4 mb-10 w-full">
            <h3 className="text-l font-semibold ">What's our captain's name</h3>
            <div className="flex flex-row gap-2.5 w-full justify-center items-center">
            <input ref={firstName} required type="text" className="rounded border-transparent p-3 bg-[#eeeeee] w-1/2" placeholder="First name"></input>
            <input type="text" ref={lastName} className="rounded border-transparent p-3 bg-[#eeeeee] w-1/2" placeholder="Last name"></input>
            </div>
            </div>
            <div className="flex flex-col gap-4 mb-10">
            <h3 className="text-l font-semibold ">What's our captain's email</h3>
            <input required ref={email} type="email" className="rounded border-transparent p-3 bg-[#eeeeee] " placeholder="Snow @example.com"></input>
            </div>
            <div className="flex flex-col gap-4">
            <h3 className="text-l font-semibold">Enter Password</h3>
            <div className="collab relative flex flex-col justify-center">
            <input ref={password} type={`${type}`} className="w-full rounded border-transparent p-3 bg-[#eeeeee]" placeholder="password"></input>
            {
                type=="password"?<HiMiniEyeSlash onClick={()=>handlePrivacy()} className="absolute right-5 cursor-pointer" />:<HiMiniEye onClick={()=>handlePrivacy()} className="absolute right-5 cursor-pointer"/>
            }
            </div>
            <div className="flex flex-col gap-4 mb-10 w-full">
            <h3 className="text-l font-semibold ">Vehicle Information</h3>
            <div className="grid grid-cols-2 gap-2.5 w-full justify-center items-center ">
            <input ref={color} required type="text" className="rounded border-transparent p-3 bg-[#eeeeee] w-full" placeholder="Vehicle color"></input>
            <input value={capacity} onChange={(e)=>{
                if(isNaN(e.target.value)){
                    e.target.value="";
                }
                else if(Number(e.target.value)>12){
                    setCapacity(12);
                }
                else{
                    setCapacity(Number(e.target.value));
                }
            }} required type="text" className="rounded border-transparent p-3 bg-[#eeeeee] w-full" placeholder="Vehicle Capacity"></input>
            <input ref={plate} required type="text" className="rounded border-transparent p-3 bg-[#eeeeee] w-full" placeholder="Vehicle Registration Number"></input>
            <DropDown tab={tab} setTab={setTab}></DropDown>
            </div>
            </div>
            </div>
            <button className="w-full bg-black rounded mt-5 p-2 font-semibold text-white">Register as a Captain</button>
            </form>
            <div className="flex-wrap div w-full flex justify-center items-center mt-3">
                Already have a account?&nbsp;<Link to="/login" className="text-blue-600">Login here</Link>
            </div>
            <div className="mt-5 ml-0 text-gray-500">
                <h5 className="text-xs">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</h5>
            </div>
            </div> 
        </div>
            </>
    )
}
export default CaptainSignup