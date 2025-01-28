import { FaMapPin } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import {RideActions} from "../store/Ride"
import { fetchactions } from "../store/fetchSlice";
const ConfirmRide=(props)=>{
    const dispatch=useDispatch();
    const base_api=import.meta.env.VITE_API_BASE_URL;
    return (
        <div className="flex flex-col w-full bg-white">
            <div className="relative w-full h-[20] p-3">
                <div className="flex flex-col bg-white justify-center items-center">
                <div className="w-[10%] bg-gray-200 h-1 rounded-full"> 
                </div>
            </div>
               
            </div>
            <div className="w-full h-[10%]  flex  justify-center items-center bg-white">
            <h1 className="text-xl font-semibold my-1">Confirm your ride</h1>
                <img className="object-contain w-1/3" src={`${props.vehicle}${props.vehicle==="Car"?".png":".webp"}`}></img>
            </div>
            <div className="w-full  h-[60%] bg-white">
                <div className=" w-[100%] mb-4 h-0.5 bg-gray-200">
                </div>
                <div className="flex flex-col p-0">
                    <div className="flex m-1 gap-5 justify-start items-center">
                    <FaMapPin />
                        <div className="flex flex-col border-b-2 w-full pb-1">
                            <h1 className="text-l font-semibold">{props.pick}</h1>
                            <p className="text-gray-400">Pickup</p>
                        </div>
                    </div>

                    <div className="flex m-1 gap-5 justify-start items-center">
                    <FaLocationArrow/>
                        <div className="flex flex-col w-full border-b-2 pb-1">
                            <h1 className="text-l font-semibold">{props.dest}</h1>
                            <p className="text-gray-400">Destination</p>
                        </div>
                    </div>

                    <div className="flex m-1 gap-5 justify-start items-center">
                    <FaWallet />
                        <div className="flex flex-col w-full border-b-2 pb-1">
                            <h1 className="text-l font-semibold">{props.fares[props.vehicle]}</h1>
                            <p className="text-gray-400">Cash</p>
                        </div>
                    </div>
                    <div className="flex m-3 gap-5 justify-center   items-center">
                        <button onClick={async()=>{
                            dispatch(fetchactions.fetchStart());
                            axios.post(`${base_api}/rides/create`,{
                                "pickup":props.pick,
                                "destination":props.dest,
                                "vehicleType":props.vehicle,
                                "pickCoords":props.fares.pickup,
                                "destCoords":props.fares.destination
                            },{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(resp=>{
                                dispatch(RideActions.init(resp.data));
                                dispatch(fetchactions.fetchEnd());
                                props.confirmPanel({status:false,vehicle:props.vehicle})
                                props.look({status:true,vehicle:props.vehicle});
                                console.log(resp.data);
                            })
                            .catch(e=>{
                                console.log(e);
                            })
                        }
                            } className="font-semibold text-white bg-green-400 p-2 w-[50%] active:bg-green-600 rounded">Confirm</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ConfirmRide;