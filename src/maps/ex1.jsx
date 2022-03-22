import React from 'react'
import { GoogleMap, useJsApiLoader ,Autocomplete,Marker} from '@react-google-maps/api';
import '../styles/map.css'
const containerStyle = {
    width: "80vw",
    height: "60vh",
  };
  const center = {
    lat: -3.745,
    lng: -38.523,
  };

function MapEx({mapsData}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries:['places']
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

   function onLoad2 (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    // Autocomplete = {...autocomplete}
  }

  function onPlaceChanged (val) {
      console.log(val)
    // if (Autocomplete !== null) {
    //   console.log(Autocomplete.getPlace())
    // } else {
    //   console.log('Autocomplete is not loaded yet!')
    // }
  }
  const position = {
    lat: 37.772,
    lng: -122.214
  }
  return <div className='mapWrapper' >
{
    isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {/* <></> */}
        {/* <Autocomplete
            onLoad={onLoad2}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
          </Autocomplete> */}
          {
            mapsData.map((obj,i)=>{
                return <Marker key={i} position={{lat:obj.address.lat,lng:obj.address.lng}} />
            })
          }
          {/* <Marker
    //   onLoad={onLoad}
      position={position}
    /> */}
      </GoogleMap>
  ) : <></>
}
  </div>

}

export default React.memo(MapEx)