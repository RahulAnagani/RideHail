import {MapContainer,TileLayer,Marker,Popup,useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers';
import 'font-awesome/css/font-awesome.min.css';

const MapUpdater = ({ position, zoom }) => {
  const map = useMap();
  map.setView(position, zoom);  
  return null; 
};
    const awesomeMarker = L.AwesomeMarkers.icon({
      icon: 'flag', // Icon name (e.g., "home", "star")
      markerColor: 'red', // Color options: 'red', 'blue', 'green', 'orange', etc.
      prefix: 'fa',
  });
    const awesomeMarker1 = L.AwesomeMarkers.icon({
      icon: 'motorcycle', // Icon name (e.g., "home", "star")
      markerColor: 'red', // Color options: 'red', 'blue', 'green', 'orange', etc.
      prefix: 'fa',
  });
const RidingMap=(props)=>{
  return (
    <MapContainer center={props.current} zoom={16} style={{width:"100%",height:"100%"}}>
      <MapUpdater position={props.current} zoom={16} /> 
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={props.current} icon={awesomeMarker1}>
        
      </Marker>
      {props.destination&&<Marker icon={awesomeMarker} position={props.destination}>

      </Marker>}
    </MapContainer>
  )
}
export default RidingMap;