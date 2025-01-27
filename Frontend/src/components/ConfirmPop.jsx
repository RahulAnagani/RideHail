import { FaMapPin } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { RideActions } from "../store/Ride";
const ConfirmPop = (props) => {
    const ride = useSelector(store => store.Ride);
    const nav = useNavigate();
    const disp=useDispatch();
    const Swiping = useSwipeable({
        onSwipedDown: () => {
            props.setConfirmRidePop(false);
            props.setRidePop(false);
        },
        trackMouse: true,
        preventScrollOnSwipe: true
    });
    const [otp, setOtp] = useState(["", "", "", ""]);
    const changeHandler = (e, index) => {
        const value = e.target.value;
        if (!isNaN(value) && value.length === 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < 3) {
                document.getElementById(`otp-input${index + 1}`).focus();
            }
        }
    };

    const keyHandler = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index] === "") {
                if (index > 0) {
                    document.getElementById(`otp-input${index - 1}`).focus();
                }
            } else {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };

    return (
        <div className="flex flex-col w-full bg-white">
            <div {...Swiping} className="relative w-full h-[20] p-3">
                <div className="flex flex-col bg-white justify-center items-center">
                    <div className="w-[10%] bg-gray-200 h-1 rounded-full"></div>
                </div>
            </div>
            <div className="w-full h-[10%] flex justify-center items-center bg-white">
                <h1 className="text-xl font-semibold my-2">Confirm this Ride to startUP</h1>
            </div>
            <div className="w-full p-1">
                <div className="h-[30%] bg-gray-300 rounded-lg p-2 flex w-full justify-around items-center overflow-hidden">
                    <div className="w-[30%] justify-start items-center flex h-[100%]">
                        <div className="user-picture">
                            <img src="dp.jpg" className="rounded" alt="User" />
                        </div>
                    </div>
                    <div className="flex justify-between gap-1 w-[70%]">
                        <div>
                            <h1 className="text-xl text-black font-bold flex-wrap">{ride[0]?.user?.fullName?.firstName}</h1>
                        </div>
                        <div>
                            <h1 className="text-xl text-black font-semibold">{ride[0]?.distance}KM</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[60%] bg-white">
                <div className="w-[100%] mb-4 h-0.5 bg-gray-200"></div>
                <div className="flex flex-col p-0">
                    <div className="flex m-1 gap-5 justify-start items-center">
                        <FaMapPin />
                        <div className="flex flex-col border-b-2 w-full pb-1 overflow-y-scroll">
                            <h1 className="text-l font-semibold">{ride[0]?.pickup}</h1>
                            <p className="text-gray-400">Pickup</p>
                        </div>
                    </div>
                    <div className="flex m-1 gap-5 justify-start items-center">
                        <FaLocationArrow />
                        <div className="flex flex-col w-full border-b-2 pb-1">
                            <h1 className="text-l font-semibold">{ride[0]?.destination}</h1>
                            <p className="text-gray-400">Destination</p>
                        </div>
                    </div>
                    <div className="flex m-1 gap-5 justify-start items-center">
                        <FaWallet />
                        <div className="flex flex-col w-full border-b-2 pb-1">
                            <h1 className="text-l font-semibold">{ride[0]?.fare}</h1>
                            <p className="text-gray-400">Cash</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h1 className="font-bold">Enter otp</h1>
                    <div className="inputContainer">
                        <input value={otp[0]} required="required"
                            onChange={(e) => changeHandler(e, 0)}
                            onKeyDown={(e) => keyHandler(e, 0)}
                            maxLength="1" type="text" className="otp-input" id="otp-input0" />
                        <input value={otp[1]} onChange={(e) => changeHandler(e, 1)}
                            onKeyDown={(e) => keyHandler(e, 1)} required="required" maxLength="1" type="text" className="otp-input" id="otp-input1" />
                        <input value={otp[2]} onChange={(e) => changeHandler(e, 2)}
                            onKeyDown={(e) => keyHandler(e, 2)} required="required" maxLength="1" type="text" className="otp-input" id="otp-input2" />
                        <input value={otp[3]} onChange={(e) => changeHandler(e, 3)}
                            onKeyDown={(e) => keyHandler(e, 3)} required="required" maxLength="1" type="text" className="otp-input" id="otp-input3" />
                    </div>
                            </div>
                    <div className="flex m-3 gap-2 justify-center flex-col items-center">
                        <button onClick={async() => { 
                            fetch("http://localhost:9090/rides/start-ride",{
                                method:"POST",
                                headers:{
                                    "Content-Type":"application/json",
                                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                                },
                                body:JSON.stringify({
                                    rideId:ride[0]._id,
                                    otp:otp[0]+otp[1]+otp[2]+otp[3]
                                })
                            }).then(resp=>{
                                if(resp.status===200)
                                return resp.json();
                                else throw new Error("Something Went wrong");
                            })
                            .then(data=>
                            {
                                disp(RideActions.init(data));
                                nav("/captain-riding");
                            }
                            )
                            .catch(e=>{
                                console.log(e);
                                setOtp(["","","",""])
                                document.getElementById("opt-input0").focus;
                            }
                            )

                         }} className="font-semibold text-white bg-green-400 p-2 w-[50%] active:bg-green-600 rounded">Confirm</button>
                        <button onClick={() => { props.setConfirmRidePop(false); props.setRidePop(false) }} id="rahul" className="font-semibold text-black bg-red-600 p-2 w-[50%] active:bg-red-500 rounded">Reject</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPop;