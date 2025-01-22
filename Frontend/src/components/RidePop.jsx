import { FaMapPin } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const RidePop=(props)=>{
    const Swiping=useSwipeable({
        onSwipedDown:()=>{
            props.setRidePop(false);
        },
        trackMouse:true,
        preventScrollOnSwipe:true
    });
    return (
        <div className="flex flex-col w-full bg-white">
                    <div  {...Swiping} className=" relative w-full h-[20] p-3">
                        <div className="flex flex-col bg-white justify-center items-center">
                        <div className="w-[10%] bg-gray-200 h-1 rounded-full"> 
                        </div>
                    </div>
                       
                    </div>
                    <div className="w-full h-[10%]  flex  justify-center items-center bg-white">
                    <h1 className="text-xl font-semibold my-0">New Ride Available</h1>
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
                                    <h1 className="text-l font-semibold">562/11-A</h1>
                                    <p className="text-gray-400">Kaikondrahalli, Bengalurur, Karnataka</p>
                                </div>
                            </div>
        
                            <div className="flex m-1 gap-5 justify-start items-center">
                            <FaLocationArrow/>
                                <div className="flex flex-col w-full border-b-2 pb-1">
                                    <h1 className="text-l font-semibold">Third Wave Coffee</h1>
                                    <p className="text-gray-400">17th Cross Rd, PWD Quaters, 1st Sector, HSR Layout, Bengaluru, Bengaluru, Karnataka</p>
                                </div>
                            </div>
        
                            <div className="flex m-1 gap-5 justify-start items-center">
                            <FaWallet />
                                <div className="flex flex-col w-full border-b-2 pb-1">
                                    <h1 className="text-l font-semibold">562.11</h1>
                                    <p className="text-gray-400">Cash</p>
                                </div>
                            </div>
                            <div className="flex m-3 gap-4   p-3 justify-between items-center">
                                <button onClick={()=>{props.setRidePop(false)}} className="p-4 font-semibold text-white bg-gray-500  w-[50%] active:bg-red-600 rounded">Ignore</button>
                                <button onClick={()=>{props.setConfirmRidePop(true)}} className="p-4 font-semibold text-white bg-green-400 w-[50%] hover:bg-green-300 active:bg-green-600 rounded">Accept</button>
                            </div>
        
                        </div>
                    </div>
                </div>
    )
}
export default RidePop;