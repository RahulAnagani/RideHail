import Wheel from "./Wheel";

const Pickup=(props)=>{
    return (
        <div className="z-40 bottom-0 bg-black h-[30%   ] w-full rounded-t-xl p-3">
            <div className="flex flex-col justify-center items-center gap-3 p-2">
                <h1 className="text-lg  font-bold text-white">Go to the Pickup Location</h1>
                <Wheel></Wheel>
                <button 
                    onClick={()=>{
                        props.setPick(false);
                        props.setConfirmRidePop(true);
                    }}
                className="text-white p-2 font-bold bg-green-400 rounded-xl">Reached</button>
            </div>
        </div>
    )
}
export default Pickup;