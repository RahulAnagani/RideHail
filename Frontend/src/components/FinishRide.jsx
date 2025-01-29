import { FaMapPin } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const FinishRide=(props)=>{
    const nav=useNavigate();
    const ride=useSelector(store=>store.Ride);
    return (
        <div className="flex z-50 flex-col w-full bg-white">
                            <div   className=" relative w-full h-[20] p-3">
                                <div className="flex flex-col bg-white justify-center items-center">
                                <div className="w-[10%] bg-gray-200 h-1 rounded-full"> 
                                </div>
                            </div>
                               
                            </div>
                            <div className="w-full h-[10%]  flex  justify-start ml-5 items-center bg-white">
                            <h1 className="text-xl font-bold my-0">Finish Ride</h1>
                                {/* <img className="object-contain w-1/3" src={`${props.vehicle}${props.vehicle==="car"?".png":".webp"}`}></img> */}
                            </div>  
                            <div className="w-full p-1">
                            <div className="h-[30%]  bg-yellow-300 rounded-lg  p-2 flex w-full justify-around items-center overflow-hidden">
                                <div className=" w-[30%] justify-start  items-center flex h-[100%]   ">
                                    <div className="user-picture">
                                    <img src="dp.jpg" className="rounded"></img>
                                    </div>
                                </div>
                                <div className="flex justify-between gap-1 w-[70%]">
                                    <div >
                                    <h1 className="text-xl font-bold flex-wrap">{"Rahul"}</h1>
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold">14.5KM</h1>
                                        {/* <h5 className="font-normal text-gray-500 text-sm">Earned</h5> */}
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="w-full  h-[60%] bg-white">
                                <div className=" w-[100%] mb-4 h-0.5 bg-gray-200">
                                </div>
                                <div className="flex flex-col p-0">
                                    <div className="flex m-1 gap-5 justify-start items-center">
                                    <FaMapPin />
                                        <div className="flex flex-col border-b-2 w-full pb-1">
                                            <h1 className="text-l font-semibold">{ride.pickup}</h1>
                                            <p className="text-gray-400">Pickup</p>
                                        </div>
                                    </div>
                
                                    <div className="flex m-1 gap-5 justify-start items-center">
                                    <FaLocationArrow/>
                                        <div className="flex flex-col w-full border-b-2 pb-1">
                                            <h1 className="text-l font-semibold">{ride.destination}</h1>
                                            <p className="text-gray-400">Destination</p>
                                        </div>
                                    </div>
                
                                    <div className="flex m-1 gap-5 justify-start items-center">
                                    <FaWallet />
                                        <div className="flex flex-col w-full border-b-2 pb-1">
                                            <h1 className="text-l font-semibold">{ride.fare}</h1>
                                            <p className="text-gray-400">Cash</p>
                                        </div>
                                    </div>
                                    <div className="flex m-3 gap-4   p-3 justify-center items-center">
                                        <button onClick={async()=>{
                                            await fetch("http://localhost:9090/rides/end-ride",{
                                                method:"POST",
                                                headers:{
                                                    'Content-Type':"application/json",
                                                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                                                },
                                                body:JSON.stringify({
                                                    rideId:ride._id
                                                })
                                            }).then(resp=>resp.json())
                                            .then(data=>{
                                                nav("/CapDashboard");
                                            })
                                            .catch(e=>{
                                                console.log(e);
                                            })
                                        }} className="p-2 font-semibold text-white bg-green-500 w-[50%]  active:bg-green-600 rounded">End Ride</button>
                                    </div>
                
                                </div>
                            </div>
                        </div>
    )
}
export default FinishRide;