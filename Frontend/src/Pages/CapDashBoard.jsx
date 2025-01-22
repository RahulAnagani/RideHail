import { BsClock } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MdOutlineSpeed } from "react-icons/md";
import RidePop from "../components/RidePop";
import Logo from "../components/Logo";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmPop from "../components/ConfirmPop";
    const CapDashBoard=()=>{
        const [ridePop,setRidePop]=useState(true);
        const ridePanel=useRef();
        const [confirmRidePop,setConfirmRidePop]=useState(false);
        const confirmPanel=useRef();
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
        return (
            <div className="relative h-screen w-screen">
                <Logo></Logo>
                <div className="h-full w-full">
                    <img src="map.png" className="w-full h-full object-cover" ></img>
                </div>
                <div className="absolute bottom-0 bg-gray-300 h-1/3 w-full rounded-t-xl p-3">
                <div className="h-[40%] flex w-full justify-around items-center overflow-hidden">
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
                    <div className="w-[100%] h-[60%] flex  bg-pink-500 rounded-md"> 
                        <div className="w-1/2 flex flex-col justify-center items-center">
                        <BsClock size={30}/>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-center font-bold">
                                10.2
                            </h1>
                            <h5 className="text-gray-800 font-medium text-sm">
                                HOURS
                            </h5>
                        </div>
                        
                        </div>
                        <div className="w-1/2 flex flex-col justify-center items-center">
                        <MdOutlineSpeed size={30}/>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-bold text-center">
                                30KM
                            </h1>
                            <h5 className="text-gray-800 font-medium text-sm ">
                                TOTAL DISTANCE
                            </h5>
                        </div>
                        </div>
                    </div>
                </div>
                <div ref={ridePanel} className="fixed bg-white bottom-[-100%] w-full">
                        <RidePop setConfirmRidePop={setConfirmRidePop} setRidePop={setRidePop}></RidePop> 
                </div>
                <div ref={confirmPanel} className="fixed bg-white bottom-[-200%] w-full">
                        <ConfirmPop setConfirmRidePop={setConfirmRidePop} setRidePop={setRidePop}></ConfirmPop> 
                </div>
            </div>
        )
    }
    export default CapDashBoard;