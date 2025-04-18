import { FaMapPin } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";

const Look4Driver=(props)=>{{
    const ride=useSelector(store=>store.Ride);
    return (
         <div className="flex flex-col w-full bg-white">
                    <div className="relative w-full h-[20] p-3">
                        <div className="flex flex-col bg-white justify-center items-center">
                        <div className="w-[10%] bg-gray-200 h-1 rounded-full"> 
                        </div>
                    </div>
                        <div  className="lineit">
                        </div>
                    </div>
                    <div className="w-full h-[10%]  flex  justify-center items-center bg-white">
                    <h1 className="text-xl font-semibold my-1">Looking for a driver</h1>
                        <img className="object-contain w-1/3" src={`${props.vehicle}${props.vehicle==="Car"?".png":".webp"}`}></img>
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
                            <div className="flex m-3 gap-5 justify-center   items-center">
                            </div>
        
                        </div>
                    </div>
                </div>
    )
}}

export default Look4Driver