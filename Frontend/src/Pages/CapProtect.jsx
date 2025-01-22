import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { actions } from "../store/UserSlice";
import { capActions } from "../store/Captain";
import { fetchactions } from "../store/fetchSlice";
const CapProtect=({children})=>{
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const dis=useDispatch();
    const nav=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token){
            nav("/captain-login");
        }
        else{
            dis(fetchactions.fetchStart());
            axios.get(`${API_BASE_URL}/captain/getProfile`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then((resp)=>{
                if(resp.status===201){
                    dis(fetchactions.fetchEnd());
                    dis(capActions.init(resp.data.captain));
                }
                else{
                    dis(fetchactions.fetchEnd());
                    localStorage.removeItem("token");
                    nav("/captain-login");   
                }
            })
            .catch(e=>{
                dis(fetchactions.fetchEnd());
                localStorage.removeItem("token");
                nav("/captain-login");
            })
        }
    },[])
    return (
        <>
            {children}      
        </>
    )
}
export default CapProtect