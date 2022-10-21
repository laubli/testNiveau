import logo from './logo.svg';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect, createElement } from 'react';
import {  MapContainer,  TileLayer,  useMapEvents, Marker, Popup} from 'react-leaflet';
import L from 'leaflet'

var iconBar = L.icon({
  iconUrl: './img/icons/bar-pin.png',
  iconRetinaUrl: require('./img/icons/bar-pin.png'),
  iconSize:     [30, 30], // size of the icon
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var iconRouge = L.icon({
  iconUrl: './img/icons/placeholder.png',
  iconRetinaUrl: require('./img/icons/placeholder.png'),
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
    <Marker position={position} icon={iconRouge}>
      <Popup>Vous êtes ici</Popup>
    </Marker>
  )
}


function App() {
  const [markers, setMarkers] = useState(false);
  useEffect(() => {
    getMarker();
  }, []);
  function getMarker() {
    fetch('https://hasuramaps.herokuapp.com/api/rest/markers')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setMarkers(data);
      });
  }
  function createMarker() {
    let nom = prompt('Nom du marker');
    let latitude = prompt('latitude du marker');
    let longitude = prompt('longitude du marker');
    let description = prompt('description');
    fetch('http://localhost:3001/markers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nom, latitude, longitude, description}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMarker();
      });
  }
  function deleteMarker() {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMarker();
      });
  }  
  function MarkersAplacer(markersamettre) {
    console.log( markersamettre  ) 
    markersamettre.forEach(marker => {
      return (<Marker position={[marker['latitude'],marker['longitude']]} icon={iconBar}>
                <Popup>
                  marker['nom']
                </Popup>
              </Marker>);
    })
  }
  return (
    <div className="App">
      {markers}
      <body>
        <MapContainer center={[48.1140097,-1.6816562]} zoom={17} scrollWheelZoom={false}>
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
          <LocationMarker/>
        </MapContainer>
      </body>
    </div>
  );
}


export default App;
