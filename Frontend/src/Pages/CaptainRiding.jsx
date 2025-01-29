import FinishRide from "../components/FinishRide";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";    
import RidingMap from "../components/RidingMap";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
const CaptainRiding=()=>{
    const[finishPanel,setFinishPanel]=useState(false);
    const Fin=useRef();
    const ride=useSelector(store=>store.Ride);
    console.log(ride)
    useGSAP(()=>{
        if(finishPanel)
            gsap.to(Fin.current,{
                bottom:0,
                height:"100dvh"
            })
        else
            gsap.to(Fin.current,{
                bottom:"-100%"
            })
    },[finishPanel])
    return (
        <div className=" relative h-screen w-screen">
            
            <div className="h-full w-full Z-0">
                    <RidingMap destination={ride.destCoords?[ride.destCoords.lat,ride.destCoords.lng]:null}></RidingMap>
        </div>
        <div className="z-50 absolute flex flex-col  items-center h-1/4 bottom-0 bg-gray-400 w-full rounded-lg">
        <div  className=" relative w-full h-[20] p-3">
                        <div className="flex flex-col justify-center items-center">
                        <div className="w-[10%] bg-gray-200 h-1 rounded-full"> 
                        </div>
                    </div>
                    </div>
            <div className="w-full h-full flex justify-center items-center">
            <div className="gap-5 h-full p-2 justify-around items-center flex w-full">
                <button onClick={()=>setFinishPanel(true)} className="bg-black p-2 font-medium rounded-lg text-white text-xl">Complete Ride</button>
            </div>
            </div>
        </div>
            <div ref={Fin} className="z-50 bottom-[-100%] w-full h-[-100%] bg-white fixed">
            <FinishRide></FinishRide>
            </div>
        </div>
    )
}
export default CaptainRiding;