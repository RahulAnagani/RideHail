import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { actions } from "../store/UserSlice";
import Loader from "../components/Loader";
import { fetchactions } from "../store/fetchSlice";
const AuthProtect=({children})=>{
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const dis=useDispatch();
    const nav=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token){
            nav("/login");
        }
        else{
            dis(fetchactions.fetchStart());
            axios.get(`${API_BASE_URL}/user/profile`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then((resp)=>{
                if(resp.status!==201){
                    localStorage.removeItem("token");
                    dis(fetchactions.fetchEnd());
                    nav("/login");
                }
                else if(resp.status===201){
                    dis(fetchactions.fetchEnd());
                    dis(actions.setIt(resp.data.user));
                }
            })
            .catch(e=>{
                dis(fetchactions.fetchEnd());
                localStorage.removeItem("token");
                nav("/login");
            })
        }
    },[])
    return (
        <>
            <Loader></Loader>
            {children}
        </>
    )
}
export default AuthProtect