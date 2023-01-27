import React, { useState, useRef } from "react";
import "./App.css";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";


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

function clearRoute(){
  setDirectionsResponse(null)
  setDistance('')
  originRef.current.value = ''
  destiantionRef.current.value = ''
}


return <div>
  <div className="navbar"></div>

  <p className="title">Let's calculate <strong>distance</strong> from Google maps</p>
  <GoogleMap center={center} zoom={10} mapContainerStyle={{width:'550px', height:'511px'}}>
  Map<Marker position={center} />
  {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
  </GoogleMap>
  <span className='origin'>Origin: </span>
<Autocomplete>
      
      <input type="text" placeholder="Origin" ref={originRef}></input>
      </Autocomplete>
      <span className='destination'>Destination:</span>
      <Autocomplete>
      <input type="text" placeholder="Destination" ref={destiantionRef}></input>
      
      </Autocomplete>
      <button type="submit" onClick={calculateRoute}>Calculate</button>
      <button type="submit" onClick={clearRoute}>Clear</button>
      <div className="card">
      <text>Distance:{distance}</text>
      
      </div>

</div>


}




export default App;
