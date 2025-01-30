import {MapContainer,TileLayer,Marker,Popup,useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from "react";

const MapUpdater = ({ position, zoom }) => {
  const map = useMap();
  map.setView(position, zoom);  
  return null; 
};
const awesomeMarker = L.AwesomeMarkers.icon({
  icon: 'flag', // Icon name (e.g., "home", "star")
  markerColor: 'green', // Color options: 'red', 'blue', 'green', 'orange', etc.
  prefix: 'fa',
});
const awesomeMarker1 = L.AwesomeMarkers.icon({
  icon: 'motorcycle', // Icon name (e.g., "home", "star")
  markerColor: 'red', // Color options: 'red', 'blue', 'green', 'orange', etc.
  prefix: 'fa',
});
const RidingMap=(props)=>{
  const [position,setPosition]=useState([0,0]);
  useEffect(()=>{
    const liveIt=()=>{
      if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition((position)=>{
          setPosition([position.coords.latitude,position.coords.longitude]);
        },error=>console.log(error),{
          enableHighAccuracy: true, // Requests the most precise location available
          timeout: 10000, // Time to wait for a location
          maximumAge: 0, // Prevents caching old location
        })
      }
    }
    const inter=setInterval(liveIt,5000);
    liveIt();
  },[])
  return (
    <MapContainer center={position} zoom={16} style={{width:"100%",height:"100%"}}>
      <MapUpdater position={position} zoom={16} /> 
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={awesomeMarker1}>
        
      </Marker>
      {props.destination&&<Marker icon={awesomeMarker} position={props.destination}>
      </Marker>}
    </MapContainer>
  )
}
export default RidingMap;