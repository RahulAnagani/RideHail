import { CgDanger } from "react-icons/cg";  
const Invalid=()=>{
    return (
        <div className="flex flex-row flex-1 mt-5 items-center justify-start">
     <h3 className="text-red-600">Enter valid <span className="underline cursor-pointer">Gmail</span> and <span className="underline cursor-pointer">Password</span></h3>&nbsp; <CgDanger color="red-100" />
        </div>
    )
}
export default Invalid