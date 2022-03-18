import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "../styles/map.css";
const containerStyle = {
  width: "80vw",
  height: "60vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function Map() {
  return (
    <div className="mapWrapper">
      <LoadScript googleMapsApiKey="AIzaSyDDdcrX0rUGZi9kplSBZ7hA-4c0Zjl5E0s">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
