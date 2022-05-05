import React, { useEffect } from "react";
import Directions from "../components/Directions";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  DirectionsService,
  Autocomplete,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "../styles/map.css";
import axios from "axios";
const containerStyle = {
  width: "80vw",
  height: "60vh",
};
const center = {
  lat: -3.745,
  lng: -38.523,
};

function MapEx({
  mapsData,
  setMapsData,
  setDestination,
  destination,
  setMyLocationAddress,
  myLocationAddress,
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(null);
  const [myLocation, setMyLocation] = React.useState({ lat: "", lng: "" });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  // const directionsUsecb = React.useCallback(setDirectionsResponse,[])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  function onLoad2(autocomplete) {
    console.log("autocomplete: ", autocomplete);

    // Autocomplete = {...autocomplete}
  }

  function onPlaceChanged(val) {
    console.log(val);
    // if (Autocomplete !== null) {
    //   console.log(Autocomplete.getPlace())
    // } else {
    //   console.log('Autocomplete is not loaded yet!')
    // }
  }
  const position = {
    lat: 37.772,
    lng: -122.214,
  };
  useEffect(() => {
    setTimeout(() => {
      getLocation();
    });
    setInterval(() => {
      getLocation();
    }, 60000);
    // getLocation()
  }, []);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    console.log(position);
    // if(myLocation.lat === position.coords.latitude && myLocation.lng === position.coords.longitude ){
    //   return
    // }
    setMyLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    // let url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=true/false`
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setMyLocationAddress({...myLocationAddress,address:res.data.results[1].formatted_address});
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(myLocation);
    //  position.coords.latitude
    // position.coords.longitude;
  }
  function dblClick(obj) {
    setDestination(obj.formatted_address);
    // setMyLocationAddress({})
  }
  function toggleInfo(e, obj, index) {
    let arr = mapsData.map((obj, i) => {
      if (index === i) {
        obj.showInfo = !obj.showInfo;
      }
      if (index !== i) {
        obj.showInfo = false;
      }
      return obj;
    });
    setMapsData(arr);
  }
  return (
    <div className="mapWrapper">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={1}
          onLoad={onLoad}
          onUnmount={onUnmount}
          // required
          id="direction-example"
        >
          {mapsData.map((obj, i) => {
            return (
              <Marker
                key={i}
                onDblClick={(e) => {
                  dblClick(obj);
                }}
                onClick={(e) => {
                  toggleInfo(e, obj, i);
                }}
                position={{ lat: obj.address.lat, lng: obj.address.lng }}
              >
                {obj.showInfo && (
                  <InfoWindow
                    // onLoad={onLoad}
                    position={position}
                  >
                    <div className="profile-details">
                      <div className="profile">
                        <img
                          referrerpolicy="no-referrer"
                          style={{
                            display: "block",
                            height: "20px",
                            width: "20px",
                          }}
                          src={obj.profilePicture}
                          alt=""
                        />
                        <h3>{obj.displayName} </h3>
                      </div>
                      <div className="custom-table">
                        <div className="bgroup">
                          Blood Group: <b> {obj.bloodGroup} </b>
                        </div>
                        <div className="gender">
                          Gender: <b> {obj.gender} </b>
                        </div>
                        <div className="age">
                          Age: <b> {obj.dob} </b>
                        </div>
                        {
                          obj.phoneNumber &&  <div className="age">
                          Phone: <b> {obj.phoneNumber?obj.phoneNumber:''} </b>
                        </div>
                        }

                        {obj.aadhar && 
                          <div className="age">
                          Aadhar: <b> {obj.aadhar?obj.aadhar:''} </b>
                        </div>
                        }
                       

                        <div className="address">
                          Address: <b> {obj.formatted_address} </b>
                        </div>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
          {/* <Marker
            icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
            position={myLocation ? myLocation : center}
          /> */}
          <Directions myLocationAddress={myLocationAddress} setMyLocationAddress={setMyLocationAddress} destination={destination} origin={myLocationAddress.address} />

          {/* <Marker
    //   onLoad={onLoad}
      position={position}
    /> */}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.memo(MapEx);
