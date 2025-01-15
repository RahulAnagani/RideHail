import { Link } from "react-router-dom";

const Home=()=>{
    return(
        <div>
            <div className="bg-cover bg-center h-screen w-full bg-red-400 flex flex-col justify-end pt-10 bg-[url('/image.jpg')]">
                <h3 className="absolute top-5 left-5 font-extrabold text-gray-500 opacity-0.1">UBR</h3>
                <div className="bg-white h-40 w-full pl-5 pt-5 pr-10"> 
                    <h2 className="text-2xl font-bold mb-5">Get started with UBR</h2>
                    <Link to="/login" className="p-3 w-full flex justify-center border bg-black border-black rounded text-white">Continue</Link>
                </div>
            </div>
        </div>
    )
}
export default Home;