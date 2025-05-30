    import Logo from "../components/Logo";
    import { BsFillRecordCircleFill } from "react-icons/bs";
    import { Flip, ToastContainer, toast } from 'react-toastify';
    import { FaLocationArrow, FaLocationPinLock } from "react-icons/fa6";
    import { useSwipeable } from "react-swipeable";
    import { useContext, useEffect, useRef, useState } from "react";
    import {useGSAP} from "@gsap/react"
    import { RiArrowDownWideFill } from "react-icons/ri";
    import { RiArrowUpWideFill } from "react-icons/ri"; 
    import {gsap} from "gsap"
    import Locations from "../components/Locations";
    import VehiclePanel from "../components/VehiclePanel";
    import ConfirmRide from "../components/ConfirmRide";
    import Wait4Driver from "../components/Wait4Driver";
    import Look4Driver from "../components/Look4Driver";
    import axios from "axios"
    import { useDispatch, useSelector } from "react-redux";
    import { fetchactions } from "../store/fetchSlice";
    import { SocketContext } from "./SocketProvider";
    import { RideActions } from "../store/Ride";
    import { useNavigate } from "react-router-dom";
    import Map from "../components/Map";
    const DashBoard=()=>{
        const nav=useNavigate();
        const disp=useDispatch();
        const userData=useSelector(store=>store.user);
        const rideData=useSelector(store=>store.Ride);
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const [pick,setPick]=useState("");
        const [dest,setDest]=useState("");
        const [panelUp,setPanelUp]=useState(false);
        const panel=useRef();
        const [vehiclePanel,setVehiclePanel]=useState(false);
        const [confirmPanel,setConfirmPanel]=useState({status:false,vehicle:"Bike"});
        const [lookPanel,setlookPanel]=useState({status:false,vehicle:"Bike"});
        const [waitPanel,setwaitPanel]=useState({status:false,vehicle:"Bike"});
        const notify = () => toast.success("Rider found! ",{transition:Flip});
        const notifyS = () => toast.success("Ride Started! ",{transition:Flip});
        const [rider,setRider]=useState(false);
        const [fares,setFares]=useState({Auto:0,Bike:0,Car:0});
        const vehicle=useRef(); 
        const confirmPop=useRef();
        const look=useRef();
        const wait=useRef();  
        const pik=useRef();
        const dect=useRef();
        const pspk=useRef();
        const [suggestions,setSuggestions]=useState({type:null,suggestions:[]});
        const [captain,setCaptain]=useState({})
        const data=useContext(SocketContext);
        useEffect(() => {
            if (data && userData.userId) {
                data.emit("join", { userId: userData.userId, userType: "USER" });
                const handleRiderFound = (data) => {
                    notify();
                    setRider(true);
                    disp(RideActions.init(data));
                    setlookPanel({ status: false, vehicle: lookPanel.vehicle });
                    setwaitPanel({ status: true, vehicle: rideData.vehicleType });
                };
                const handler=(data)=>{
                    notifyS();
                    nav("/user-riding");
                }
                const pspk=(data)=>{
                    setCaptain(data);
                    console.log(data);
                }
                data.on("riderFound", handleRiderFound);
                data.on("startRiding",handler);
                data.on("Janasena",pspk)
                return () => {
                    data.off("riderFound", handleRiderFound);
                    data.off("startRiding", handler);
                    data.off("Janasena",pspk)
                };
            }
        }, [data, userData]);
        // useEffect(() => {
        //     if (data) {
                
        //         return () => {
        //             data.off("riderFound", handleRiderFound);
        //         };
        //     }
        // }, [data,userData]);
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
            if(waitPanel.status||confirmPanel.status||vehiclePanel.status||lookPanel.status){
                gsap.to(pspk.current,{
                    display:"none",

                })
            }
            else{
                gsap.to(pspk.current,{
                    display:"block"
                })
            }
        },[waitPanel.status,confirmPanel.status,vehiclePanel.status,lookPanel.status])
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
                gsap.to(look.current,{
                    bottom:"-100%"
                });
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
        const getSuggestions=async(dumb,type)=>{
            if(dumb.length>4){
                setSuggestions({...suggestions,suggestions:[]})
                const params={input:dumb};
                disp(fetchactions.fetchShimStart());
                axios.get(`${API_BASE_URL}/maps/get-suggestions/`,{params,headers:{
                    'Content-Type':"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }}).then((respnse)=>{
                    if(respnse.data.takeIt){
                    setSuggestions({type:type,suggestions:respnse.data.takeIt})
                };
                disp(fetchactions.fetchshimEnd())})
                .catch(e=>{console.log(e)})
            }
            else{
                setSuggestions({type:"null",suggestions:[]})
            }
        }
        return (
            <div className="relative h-screen w-screen">
                <Logo></Logo>   
                <div className="absolute w-full h-full z-0">
                    <Map captain={captain} destination={fares.destination?[fares.destination?.lat,fares.destination?.lng]:null} distance={fares.distance}></Map>
                </div>
                <div className="w-full h-screen top-0 absoulte flex flex-col justify-end  gap-0 z-50">
                <div {...swipeController} ref={pspk} className={`relative w-full z-50 bg-white h-[20] pb-1  ${!panelUp?"rounded-t-3xl":""} flex flex-col`}>
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

                    <form onSubmit={async(e)=>{
                        e.preventDefault();
                    if(pick.trim().length===0||dest.trim().length===0||pick.length<4||dest.length<4){
                            if(!pick){
                                pik.current.click();
                                pik.current.focus();
                                return;
                            }
                            else{
                                dect.current.click();
                                dect.current.focus();
                                return;
                            }
                        }
                        setPanelUp(false);
                        setVehiclePanel(true);
                        axios.get(`${API_BASE_URL}/rides/get-fare`,{params:{pickup:pick,destination:dest},headers:{Authorization:`bearer ${localStorage.getItem("token")}`
                    }}).then(resp=>{
                        setFares(resp.data);
                    })
                    }}>
                    <div className="flex flex-col relative gap-5 justify-center items-center ">
                    <div className=" w-full pl-5 pr-5 flex">
                    <div className=" bg-[#EEEE] rounded-l-md  w-[20%]  flex justify-center items-center">
                        <BsFillRecordCircleFill size={10}/>
                    </div>
                    <input ref={pik} onClick={(e)=>{setPanelUp(true)}} value={pick} onChange={(e)=>{setPick(e.target.value);getSuggestions(e.target.value,"pick")}} className="bg-[#EEEE] rounded-r-md focus:outline-none w-3/4 p-2 rounded-l-none" type="text" placeholder="Add a pick-up location"></input>
                    </div>  
                    <div className=" w-full pl-5 pr-5 flex">
                    <div className="bg-[#EEEE] rounded-l-md w-[20%] flex justify-center items-center">
                    <FaLocationArrow size={15}/>
                    </div>
                    <input ref={dect} onClick={(e)=>{setPanelUp(true)}} value={dest} onChange={(e)=>{setDest(e.target.value);getSuggestions(e.target.value,"dest")}} className="bg-[#EEEE] rounded-r-md focus:outline-none w-3/4 p-2 rounded-l-none" type="text" placeholder="Enter your destination"></input>
                    </div>
                        <button className="p-3 bg-black rounded-lg text-white text-md font-bold">Get Rides</button>
                    </div>
                    </form>
                </div>
                <div className="bg-white h-0 overflow-x-scroll z-50" ref={panel}>
                    {<Locations setPick={setPick} setPredictions={setSuggestions} setDest={setDest} predictions={suggestions}></Locations>}
                </div>
                    <div ref={vehicle} className="z-50 fixed bg-gray-400 bottom-[-100%] w-full">
                        <VehiclePanel fares={fares} setConfirmPanel={setConfirmPanel} setVehiclePanel={setVehiclePanel}></VehiclePanel>
                    </div>
                    <div ref={confirmPop} className="z-50 fixed bg-gray-400 bottom-[-100%] w-full">
                        <ConfirmRide fares={fares} pick={pick} dest={dest} look={setlookPanel} confirmPanel={setConfirmPanel} vehicle={confirmPanel.vehicle}></ConfirmRide>
                    </div>
                    <div ref={look} className="z-50 fixed bg-gray-400 bottom-[-100%] w-full">
                        <Look4Driver pick={pick} dest={dest} notify={notify} lookPanel={lookPanel} vehicle={lookPanel.vehicle}></Look4Driver>
                    </div>
                    <div ref={wait} className="z-50 fixed bg-transparent bottom-[-100%] w-full">
                        <Wait4Driver setwaitPanel={setwaitPanel} Ride={rideData}  vehicle={rideData.vehicleType}></Wait4Driver>
                    </div>
                </div>
            </div>
        )
    }
    export default DashBoard;