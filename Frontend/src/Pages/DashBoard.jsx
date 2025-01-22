import Logo from "../components/Logo";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { Flip, ToastContainer, toast } from 'react-toastify';
import { FaLocationArrow } from "react-icons/fa6";
import { useSwipeable } from "react-swipeable";
import { useRef, useState } from "react";
import {useGSAP} from "@gsap/react"
import { RiArrowDownWideFill } from "react-icons/ri";
import { RiArrowUpWideFill } from "react-icons/ri"; 
import {gsap} from "gsap"
import Locations from "../components/Locations";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import Wait4Driver from "../components/Wait4Driver";
import Look4Driver from "../components/Look4Driver";
const DashBoard=()=>{
    const [pick,setPick]=useState("");
    const [dest,setDest]=useState("");
    const [panelUp,setPanelUp]=useState(false);
    const panel=useRef();
    const [vehiclePanel,setVehiclePanel]=useState(false);
    const [confirmPanel,setConfirmPanel]=useState({status:false,vehicle:"bike"});
    const [lookPanel,setlookPanel]=useState({status:false,vehicle:"bike"});
    const [waitPanel,setwaitPanel]=useState({status:false,vehicle:"bike"});
    const notify = () => toast.success("Rider found! ",{transition:Flip})
    const vehicle=useRef(); 
    const confirmPop=useRef();
    const look=useRef();
    const wait=useRef();
    const swipeController=useSwipeable({
        onSwipedUp:()=>{
            setPanelUp(true);
        },
        onSwipedDown:()=>{
            setPanelUp(false);
        },
        preventScrollOnSwipe:true,
        trackMouse:true
    });
    useGSAP(()=>{
        if(lookPanel.status){
            gsap.to(look.current,{
                bottom:0
            })
        }
        else{
            gsap.to(look.current,{
                bottom:"-100%"
            })
        }
    },[lookPanel.status]);
    useGSAP(()=>{
        if(confirmPanel.status){
            setVehiclePanel(false);
            gsap.to(confirmPop.current,{
                bottom:0
            })
        }
        else{
            gsap.to(confirmPop.current,{
                bottom:"-100%"
            })
        }
    },[confirmPanel.status]);
    useGSAP(()=>{
        if(waitPanel.status){
            gsap.to(wait.current,{
                bottom:0
            })
        }
        else{
            gsap.to(wait.current,{
                bottom:"-100%"
            })
        }
    },[waitPanel.status]);
    useGSAP(()=>{
        if(panelUp){
            gsap.to(panel.current,{
                height:"70%"
            })
        }
        else{
            gsap.to(panel.current,{
                height:"0%"
            })
        }
    },[panelUp])
    useGSAP(()=>{
        if(vehiclePanel){
            gsap.to(vehicle.current,{
                bottom:0
            })
        }
        else{
            gsap.to(vehicle.current,{
                bottom:"-100%"
            })
        }
    },[vehiclePanel])
    return (
        <div className="relative h-screen overflow-hidden">
                  <ToastContainer className="rounded-none" pauseOnHover={false}/>
            <Logo></Logo>
            <div>
            <img className="h-screen w-screen object-cover object-bottom" src="map.png"></img>
            </div>
            <div className="w-full h-screen top-0 absolute flex flex-col justify-end overflow-y-scroll gap-0">
            <div {...swipeController} className={`relative w-full bg-white h-1/3 ${!panelUp?"rounded-t-3xl":""} flex flex-col`}>
                <h3 className="text-xl font-bold m-5">Find a ride</h3>
                {panelUp?<RiArrowDownWideFill onClick={()=>
                    {
                        setPanelUp(false);
                    }
                } className="absolute active:bg-gray-200 rounded-full right-5 top-5 size-8 cursor-pointer"/>:
                <RiArrowUpWideFill className="active:bg-gray-200  rounded-full absolute right-5 top-5 size-8 cursor-pointer"
                    onClick={()=>{
                        setPanelUp(true);
                    }}
                />
                }

                <form onSubmit={(e)=>{
                    e.preventDefault();
                }}>
                <div className="flex flex-col relative gap-5 justify-center items-center ">
                <div className=" w-full pl-5 pr-5 flex">
                <div className=" bg-[#EEEE] rounded-l-md  w-[20%]  flex justify-center items-center">
                    <BsFillRecordCircleFill size={10}/>
                </div>
                <input onClick={(e)=>{setPanelUp(true)}} value={pick} onChange={(e)=>setPick(e.target.value)} className="bg-[#EEEE] rounded-r-md focus:outline-none w-3/4 p-2 rounded-l-none" type="text" placeholder="Add a pick-up location"></input>
                </div>  
                <div className=" w-full pl-5 pr-5 flex">
                <div className="bg-[#EEEE] rounded-l-md w-[20%] flex justify-center items-center">
                <FaLocationArrow size={15}/>
                </div>
                <input onClick={(e)=>{setPanelUp(true)}} value={dest} onChange={(e)=>setDest(e.target.value)} className="bg-[#EEEE] rounded-r-md focus:outline-none w-3/4 p-2 rounded-l-none" type="text" placeholder="Enter your destination"></input>
                </div>
                </div>
                </form>
            </div>
            <div className="bg-white h-0 overflow-x-scroll" ref={panel}>
                <Locations panel={panelUp} setPanel={setPanelUp} vehicle={vehiclePanel} setVehiclePanel={setVehiclePanel}></Locations>
            </div>
                <div ref={vehicle} className="fixed bg-gray-400 bottom-[-100%] w-full">
                    <VehiclePanel setConfirmPanel={setConfirmPanel} setVehiclePanel={setVehiclePanel}></VehiclePanel>
                </div>
                <div ref={confirmPop} className="fixed bg-gray-400 bottom-[-100%] w-full">
                    <ConfirmRide look={setlookPanel} confirmPanel={setConfirmPanel} vehicle={confirmPanel.vehicle}></ConfirmRide>
                </div>
                <div ref={look} className="fixed bg-gray-400 bottom-[-100%] w-full">
                    <Look4Driver notify={notify} wait={setwaitPanel} vehicle={lookPanel.vehicle}></Look4Driver>
                </div>
                <div ref={wait} className="fixed bg-gray-400 bottom-[-100%] w-full">
                    <Wait4Driver vehicle={waitPanel.vehicle}></Wait4Driver>
                </div>
            </div>
        </div>
    )
}
export default DashBoard;