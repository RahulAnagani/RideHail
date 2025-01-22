const Bike=()=>{
    return (
        <div className="h-1/3 active:bg-gray-200 bg-white p-1 rounded-lg border-2 active:border-black flex gap-2 items-center justify-center">
                        <div className="w-[20%]">
                        <img className="rounded-lg w-full h-full" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_384,w_576/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"></img>
                        </div>
                        <div className="w-[80%] flex mr-5 items-start justify-between">
                            <div className="p-2 flex flex-col  gap-0 w-[80%]">
                            <h4 className="flex items-center gap-3 font-semibold">UberAuto
                                <span className="flex items-center justify-center font-normal gap-1">
                            <FaUserLarge size={13}/> 4
                                </span>
                            </h4>
                            <h5 className="font">2 mins away</h5>
                            <p className="text-gray-500 text-xs">Affordable, compact rides</p>
                            </div>
                            <div className="w-[20%]">
                                <h2 className="text-lg font-medium">₹192.34</h2>
                            </div>
                        </div>
                        </div>
    )
}
export default