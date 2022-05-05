import React from "react";
import { DirectionsRenderer, DirectionsService, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';

function Directions({myLocationAddress,destination,origin,setMyLocationAddress}) {
    const [directionsResponse,setDirectionsResponse] = React.useState({})
    function directionsCallback(response) {
        console.log(response)
        let common = response.routes[0].legs[0]
        setMyLocationAddress({...myLocationAddress,mode:'Driving',distance:common.distance,duration:common.duration,})
        if (response !== null) {
          if (response.status === 'OK') {
            // this.setState(
            //   () => ({
            //     response
            //   })
            // )
            setDirectionsResponse(response)
          } else {
            console.log('response: ', response)
          }
        }
      }
      console.log('direction')
  return (
    <div className="directions-wrapper">
      <DirectionsService
        // required
        options={{
          // destination: this.state.destination,
          // origin: this.state.origin,
          // travelMode: this.state.travelMode
          destination: destination,
          origin: origin,
          travelMode: "DRIVING",
        }}
        // required
        callback={directionsCallback}
        // optional
        // onLoad={directionsService => {
        //   console.log('DirectionsService onLoad directionsService: ', directionsService)
        // }}
        // // optional
        // onUnmount={directionsService => {
        //   console.log('DirectionsService onUnmount directionsService: ', directionsService)
        // }}
      />

      <DirectionsRenderer
        // required
        options={{
          directions: directionsResponse,
        }}
        // optional
        onLoad={(directionsRenderer) => {
          console.log(
            "DirectionsRenderer onLoad directionsRenderer: ",
            directionsRenderer
          );
        }}
        // optional
        onUnmount={(directionsRenderer) => {
          console.log(
            "DirectionsRenderer onUnmount directionsRenderer: ",
            directionsRenderer
          );
        }}
      />
    </div>
  );
}

export default React.memo(Directions)
