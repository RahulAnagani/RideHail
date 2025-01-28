
import { useSelector } from "react-redux";
import Location from "./Location";
const Locations=(props)=>{
    const fetch=useSelector(store=>store.fetchStatus);
    return (
        <div className={`${" h-full w-full pspk z-50 overflow-y-scroll"} ${fetch.fetchShim?"skeleton-box":""}`} >
            {
                props.predictions.suggestions.map(
                    (e,i)=>{
                        return (
                            <Location setPredictions={props.setPredictions} type={props.predictions.type} dest={props.setDest} pick={props.setPick} vehi={props} obj={e} key={i}></Location>
                        )
                    }
                )
            }
        </div>
    )
}
export default Locations