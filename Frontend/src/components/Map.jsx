import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers';
import 'font-awesome/css/font-awesome.min.css';
const MapUpdater = ({ position, zoom }) => {
  const map = useMap();
  map.setView(position, zoom);  
  return null; 
};

const Map = (props) => {
    const [position, setPosition] = useState([0, 0]);
    const zoom=props.distance?(props.distance<2?15:props.distance<10?12:10):15;
    const center = props.destination 
    ? [(position[0] + props.destination[0]) / 2, (position[1] + props.destination[1]) / 2]
    : position;
    const captain=props.captain?.ltd?[props.captain?.ltd,props.captain?.lng]:null;
  useEffect(() => {
    const fn = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition([position.coords.latitude, position.coords.longitude]); 
          },
          (error) => {
            console.error(error);
          }
        );
      }
    };
    fn();  
  }, []);
  const awesomeMarker = L.AwesomeMarkers.icon({
    icon: 'home', // Icon name (e.g., "home", "star")
    markerColor: 'blue', // Color options: 'red', 'blue', 'green', 'orange', etc.
    prefix: 'fa',
});
const awesomeMarkerCap = L.AwesomeMarkers.icon({
    icon: 'map-pin',
    markerColor: 'green', 
    prefix: 'fa', 

  });
const Rider = L.AwesomeMarkers.icon({
    icon: 'motorcycle',
    markerColor: 'red', 
    prefix: 'fa', 
    spin:true
  });
  return (
    <div className='h-screen w-screen'>
    <MapContainer center={center} zoom={zoom} style={{ width: '100%', height: '100%' }} scrollWheelZoom={true}>
      <MapUpdater position={captain?captain:center} zoom={captain?15:zoom} />    
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={awesomeMarker}>
        <Popup>
          <span>pickup</span>
        </Popup>
      </Marker>
      {props.destination&&
        <Marker position={props.destination} icon={awesomeMarkerCap}>
        <Popup>
          <span>destination</span>
        </Popup>
      </Marker>
      }
      {
        captain&&
        <Marker position={captain} icon={Rider}>
        <Popup>
          <span>destination</span>
        </Popup>
      </Marker>
      }
    </MapContainer>
    </div>
  );
};

export default Map;
