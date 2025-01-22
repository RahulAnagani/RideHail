import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const CapSignout=()=>{
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const nav=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token){
            nav("/captain-login");
        }
        axios.post(`${API_BASE_URL}/captain/logout`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(resp=>{
            if(resp.status===200){
                localStorage.removeItem("token");
                nav("/captain-login");
            }
        })
        .catch(E=>{
            console.log(E);
            localStorage.removeItem("token");
            nav("/captain-login");
        })
    },[])
    return (
        <>
        </>
    )
}
export default CapSignout