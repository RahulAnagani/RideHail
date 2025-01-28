import FinishRide from "../components/FinishRide";
import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";    
import Payment from "../components/Payment";
import { useSelector } from "react-redux";
import { SocketContext } from "./SocketProvider";
import { useNavigate } from "react-router-dom";
import RidingMap from "../components/RidingMap";
const UserRiding=()=>{
    const nav=useNavigate();
    const socket=useContext(SocketContext);
    const ride=useSelector(store=>store.Ride);
    const [position,setPosition]=useState([0,0]);
    useEffect(()=>{
        if(socket){
            socket.emit("join", { userId: ride.result?.ride[0].user._id, userType: "USER" });
            const handler=(data)=>{
                if(data.status){
                    nav("/dashboard");
                }
            }
            socket.on("ride-end",handler);
            return ()=>{
                socket.off("ride-end",handler);
            }
        }
    },[socket]);
    useEffect(()=>{
        const updateLocation=()=>{
            if("geolocation" in navigator){
                navigator.geolocation.getCurrentPosition((position)=>{
                    setPosition([position.coords.latitude,position.coords.longitude])
                },(error)=>{
                    console.log(error);
                })
            }
            else{
                console.warn("Geo location is not found");
            }
        }
        const inter=setInterval(updateLocation,5000);
        updateLocation();
    },[])
    const coords=ride?.result?.ride[0].destCoords?[ride?.result?.ride[0].destCoords.lat,ride?.result?.ride[0].destCoords.lng]:null;
    return (
        <div className="relative h-screen w-screen">
            <div className="h-full w-full z-0">
                    <RidingMap destination={coords} current={position}></RidingMap>
            </div>
        <div className="h-[1/4] z-50 absolute w-full bottom-0">
            <Payment ride={ride}></Payment>
        </div>
        </div>
    )
}
export default UserRiding;