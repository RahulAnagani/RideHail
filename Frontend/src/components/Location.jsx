import { IoLocationSharp } from "react-icons/io5";
const Location=({obj,setPredictions,pick,dest,type})=>{
    return (
        <>
        <div onClick={()=>{
            if(type==='pick')
            pick(obj.description);
            else
                dest(obj.description);
            setPredictions({type:"null",suggestions:[]});
        }} className=" hover:bg-gray-200 rounded-md border  active:border-black focus:bg-red-500 cursor-pointer flex justify-start items-center gap-5 mt-5 ml-3 mr-3 pl-2">
            <div className="bg-gray-300 rounded-full p-1">
            <IoLocationSharp size={25}/>
            </div>
                <div className="w-full  flex-nowrap p-0">
                    <h3 className=" text-ellipsis font-semibold ">{obj.terms[0].value}</h3>
                    <h5 className="text-gray-900 text-s">{obj.description}</h5>
                </div>
            </div>
            <div className="mt-3 mb-3 w-[100%] h-0.5 bg-gray-200">
            </div>
        </>
    )
}
export default Location;