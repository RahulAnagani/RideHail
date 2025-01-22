
import Location from "./Location";
const Locations=(props)=>{
    const addresses = [
        {
          main: "Marina Beach",
          sub: "Kamarajar Salai, Triplicane, Chennai, Tamil Nadu",
        },
        {
          main: "India Gate",
          sub: "Rajpath, India Gate, New Delhi, Delhi",
        },
        {
          main: "Chhatrapati Shivaji Maharaj Terminus",
          sub: "DN Road, Fort, Mumbai, Maharashtra",
        },
        {
          main: "Howrah Bridge",
          sub: "Strand Road, Howrah, Kolkata, West Bengal",
        },
        {
          main: "Charminar",
          sub: "Charminar Rd, Char Kaman, Hyderabad, Telangana",
        },
        {
          main: "Golden Temple",
          sub: "Golden Temple Road, Atta Mandi, Amritsar, Punjab",
        },
      ];
      
    return (
        <div onFocus={()=>{
          console.log("i")
        }} className=" h-full w-full pspk  overflow-y-scroll" >
            {
                addresses.map(
                    (e,i)=>{
                        return (
                            <Location vehi={props} obj={e} key={i}></Location>
                        )
                    }
                )
            }
        </div>
    )
}
export default Locations