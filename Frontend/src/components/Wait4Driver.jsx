import { FaMapPin } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
const Wait4Driver=(props)=>{
    // console.log(props)
    return (
         <div className="flex flex-col w-full bg-white">
                    <div className="relative w-full h-[20] p-3">
                        <div className="flex flex-col bg-white justify-center items-center">
                        <div className="w-[10%] bg-gray-200 h-1 rounded-full"> 
                        </div>
                    </div>
                    </div>
                    <div className="w-full text-lg font-bold p-1">
                        <h1>Waiting for Captain⏳</h1>
                    </div>
                    <div className="w-full h-[10%]  flex  justify-between items-center bg-white">
                    <img className="object-contain w-1/3" src={`${props.Ride?.result?.ride[0]?.vehicleType}${props.Ride?.result?.ride[0]?.vehicleType==="Car"?".png":".webp"}`}></img>
                        <div className="p-3 flex flex-col justify-center items-center">
                        <h1 className="text-xl font-semibold my-1">{props.Ride?.result?.ride[0].captain.fullName?.firstName}</h1>
                        <div className="flex gap-2">
                        <h1 className="text-md text-gray-500 font-medium my-1">{props.Ride?.result?.ride[0]?.vehicleType}</h1>
                        <h2 className="text-md font-semibold my-1">{props.Ride?.result?.ride[0].captain.vehicle?.plate}</h2>
                        </div>
                        <div className="flex gap-3">
                            <h1 className="text-md rounded border border-black p-1 font-bold text-gray-800">{props.Ride?.result?.otp[0]}</h1>
                            <h1 className="text-md rounded border border-black p-1 font-bold text-gray-800">{props.Ride?.result?.otp[1]}</h1>
                            <h1 className="text-md rounded border border-black p-1 font-bold text-gray-800">{props.Ride?.result?.otp[2]}</h1>
                            <h1 className="text-md rounded border border-black p-1 font-bold text-gray-800">{props.Ride?.result?.otp[3]}</h1>
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
                                    <h1 className="text-l font-semibold">{props.Ride?.result?.ride[0]?.pickup}</h1>
                                    <p className="text-gray-400">Pickup</p>
                                </div>
                            </div>
        
                            <div className="flex m-1 gap-5 justify-start items-center">
                            <FaLocationArrow/>
                                <div className="flex flex-col w-full border-b-2 pb-1">
                                    <h1 className="text-l font-semibold">{props.Ride?.result?.ride[0]?.destination}</h1>
                                    <p className="text-gray-400">Destination</p>
                                </div>
                            </div>
        
                            <div className="flex m-1 gap-5 justify-start items-center">
                            <FaWallet />
                                <div className="flex flex-col w-full border-b-2 pb-1">
                                    <h1 className="text-l font-semibold">{props.Ride?.result?.ride[0]?.fare}</h1>
                                    <p className="text-gray-400">Cash</p>
                                </div>
                            </div>
                            <div className="flex m-3 gap-5 justify-center   items-center">
                            </div>
        
                        </div>
                    </div>
                </div>
    )
}

export default Wait4Driver;