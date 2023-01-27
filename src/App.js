import React, { useState, useRef } from "react";
import "./App.css";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import logo from './img/logo.jpg'

const center = { lat:19.0760, lng: 72.8777 };

function App() {
  //  const { isLoaded } = useLoadScript({
  //    googleMapsApiKey: process.env.MAPS_API_KEY,
  //    libraries: ["places"],
  //  });

  // const center = useMemo(() => ({ lat: 19, lng: 73 }), []);

  //  if (!isLoaded) return <div>"Loading..."</div>;
  // return  <div className="main-container">
    
  //    <GoogleMap
  //       zoom={15}
  //       center={center}
  //       mapContainerClassName="map-container"
  //     >
  //       <Marker position={center} />
  //     </GoogleMap> 
    //   <form>
    //   <input type="text" placeholder="Origin">Origin</input>
    //   <input type="text" placeholder="Destination">Destination</input>
    //   <button type="submit">Calculate</button>
    // </form>
  //   </div>;
const {isLoaded} = useJsApiLoader({
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,  libraries: ["places"]
})

const [directionsResponse, setDirectionsResponse] = useState(null)
const [distance, setDistance] = useState('')

/**@type React.MutableRefObject<HTMLInputElement> */
const originRef = useRef()
/**@type React.MutableRefObject<HTMLInputElement> */
const destiantionRef = useRef()

if(!isLoaded) return <div>Loading...</div>

async function calculateRoute(){
  if(originRef.current.value === '' || destiantionRef.current.value === '') 
  {return} 
  const directionsService = new window.google.maps.DirectionsService()
  const results = await directionsService.route({
    origin: originRef.current.value,
    destination: destiantionRef.current.value,
    travelMode: window.google.maps.TravelMode.DRIVING
  })
  setDirectionsResponse(results)
  setDistance(results.routes[0].legs[0].distance.text)

  
}




return <div className="parent-container">
  <div className="navbar">
    <img className="logo" src={logo} alt="logo"/>
  </div>
<div className="container">
  <p className="title">Let's calculate <strong>distance</strong> from Google maps</p>
  <div className="map-container">
  <GoogleMap center={center} zoom={10} mapContainerStyle={{width:'550px', height:'511px'}}>
  Map<Marker position={center} />
  {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
  </GoogleMap>
  </div>
  <div className="form-container">
  <span className='origin'>Origin: </span>
<Autocomplete>
      
      <input type="text" placeholder="Origin" className="i-origin" ref={originRef}></input>
      </Autocomplete>
      <span className='destination'>Destination:</span>
      <Autocomplete>
      <input type="text" placeholder="Destination" className="i-destination" ref={destiantionRef}></input>
      
      </Autocomplete>
      <button type="submit" className="calc-btn" onClick={calculateRoute}>Calculate</button>

      <div className="card">
        <text className="distance">Distance: <div className="kms">{distance} </div></text>
      </div>
      </div>
      </div>

</div>


}




export default App;
