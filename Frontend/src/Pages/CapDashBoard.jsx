import { BsClock } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MdOutlineSpeed } from "react-icons/md";
import RidePop from "../components/RidePop";
import Logo from "../components/Logo";
import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmPop from "../components/ConfirmPop";
import { SocketContext } from "./SocketProvider";
import Map from "../components/Map";
    const CapDashBoard=()=>{
        const [ridePop,setRidePop]=useState(false);
        const ridePanel=useRef();
        const [confirmRidePop,setConfirmRidePop]=useState(false);
        const confirmPanel=useRef();
        const [locationPermission,setLocationPermission]=useState(false);
        const [location,setLocation]=useState({ltd:0,lng:0});
        const [ride,setRide]=useState({});
        console.log(ride)
        useGSAP(()=>{
            if(ridePop)
                gsap.to(ridePanel.current,{
            bottom:"0"
        })
        else
        gsap.to(ridePanel.current,{
    bottom:"-100%"
})
},[ridePop]);

        useGSAP(()=>{
            if(confirmRidePop)
            gsap.to(confirmPanel.current,{
                bottom:"0",
                height:"100dvh"
            })
            else
            gsap.to(confirmPanel.current,{
                bottom:"-100%"
            })
        },[confirmRidePop]);
        const data=useSelector(store=>store.captain);
        const dat=useContext(SocketContext);
        useEffect(()=>{
            if(dat)
            dat.on("newRide",(data)=>{
                console.log(data)
                setRide(data);
                setRidePop(true);
            })
        },[dat]);
        useEffect(()=>{
        if(dat&&data._id){
            dat.emit("join",{userId:data._id,userType:"CAPTAIN"});
        };
        if(location.ltd&&location.lng)
            dat.emit("update-captain-location",{userId:data._id,coords:{lng:location.lng,ltd:location.ltd}});
    },[data,dat,location]);
        useEffect(()=>{
            const locationAccess=()=>{
                if("geolocation" in navigator){
                    navigator.geolocation.getCurrentPosition((position)=>{
                        const {latitude,longitude}=position.coords;
                        setLocation({lng:longitude,ltd:latitude});
                        console.log(latitude,longitude)
                    },(error)=>{
                        if(!locationPermission){
                            if(error.code===error.PERMISSION_DENIED){
                                setLocationPermission(true);
                                alert("Location permission has denied");
                            }
                        }
                    })
                }
                else{
                    console.log("Enable geolocation in your browser");
                }
            };
            const Interval=setInterval(locationAccess,5000);
        },[]);
        return (
            <div className="relative h-screen w-screen">
                <Logo></Logo>
                <div className="absolute w-full h-full z-0">
                    <Map destination={ride.pickCoords?[ride.pickCoords.lat,ride.pickCoords.lng]:null}></Map>
                </div>
                <div className="absolute z-40 bottom-0 bg-gray-300 h-1/3 w-full rounded-t-xl p-3">
                <div className="h-[40%] flex w-full justify-around items-center ">
                        <div className=" w-[30%] justify-start  items-center flex h-[100%]   ">
                            <div className="user-picture">
                            <img src="Cap.jpg" className="rounded"></img>
                            </div>
                        </div>
                        <div className="flex justify-between gap-1 w-[70%]">
                            <div >
                            <h1 className="text-xl font-bold flex-wrap">{"fullName" in data?data.fullName.firstName+" "+data.fullName.lastName:""}</h1>
                            <h5 className="font-normal text-gray-500 text-sm">Basic level</h5>
                            </div>
                            <div> 
                                <h1 className="text-xl font-bold">$320.23</h1>
                                <h5 className="font-normal text-gray-500 text-sm">Earned</h5>
                            </div>
                        </div>
                    </div>
                    <div className="w-[100%]  h-[60%] flex  bg-black  rounded-md"> 
                        <div className="w-1/2 flex flex-col justify-center items-center">
                        <BsClock size={30} fill="white"/>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-center text-white font-bold">
                                10.2
                            </h1>
                            <h5 className="text-gray-300 font-medium text-sm">
                                HOURS
                            </h5>
                        </div>
                        
                        </div>
                        <div className="w-1/2 flex flex-col justify-center items-center">
                        <MdOutlineSpeed fill="white" size={30}/>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-bold text-white text-center">
                                30KM
                            </h1>
                            <h5 className="text-gray-300 font-medium text-sm ">
                                TOTAL DISTANCE
                            </h5>
                        </div>
                        </div>
                    </div>
                </div>
                <div ref={ridePanel} className="fixed z-40 bg-white bottom-[-100%] w-full">
                        <RidePop ride={ride} setConfirmRidePop={setConfirmRidePop} setRidePop={setRidePop}></RidePop> 
                </div>
                <div ref={confirmPanel} className="fixed z-50 bg-white bottom-[-200%] w-full">
                        <ConfirmPop setConfirmRidePop={setConfirmRidePop} setRidePop={setRidePop}></ConfirmPop> 
                </div>
            </div>
        )
    }
    export default CapDashBoard;