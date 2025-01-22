import axios from "axios"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout=()=>{
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const nav=useNavigate();
    useEffect(()=>{

        axios.post(`${API_BASE_URL}/user/logout`,{},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        }).then((resp)=>{
            console.log(resp)
            if(resp.data.status){
                console.log(localStorage.getItem("token"))
                localStorage.removeItem("token");
                nav("/login");
            }
        })
        .catch(e=>{
            console.log(e);
            nav("/login");
        })
    },[])
    return (
        <>
        </>
    )
}
export default UserLogout