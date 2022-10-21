import logo from './logo.svg';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import {  MapContainer,  TileLayer,  useMapEvents, Marker, Popup} from 'react-leaflet';
import L from 'leaflet'

var iconBar = L.icon({
  iconUrl: './img/icons/bar-pin.png',
  iconRetinaUrl: require('./img/icons/bar-pin.png'),
  iconSize:     [30, 30], // size of the icon
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function App() {
  return (
    <div className="App">
      <body>
        <MapContainer center={[48.1140097,-1.6816562]} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[48.1142996,-1.6833788]} icon={iconBar}>
            <Popup>
              La bonne nouvelle
            </Popup>
          </Marker>
          <Marker position={[48.112996,-1.6869107]} icon={iconBar}>
            <Popup>
              Delirium café
            </Popup>
          </Marker>
          <LocationMarker />
        </MapContainer>
      </body>
    </div>
  );
}


export default App;
