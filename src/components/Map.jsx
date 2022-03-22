import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import "../styles/map.css";
const containerStyle = {
  width: "80vw",
  height: "60vh",
};
// let auto = new GoogleMap.Autocomplete()
console.dir(GoogleMap);
const center = {
  lat: -3.745,
  lng: -38.523,
};
console.log(process.env)
export default function Map() {
  return (
    <div className="mapWrapper">
      <LoadScript googleMapsApiKey={ process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
          {/* <Autocomplete /> */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
