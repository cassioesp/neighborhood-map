/* eslint-disable no-undef */
import React from 'react'
import {compose, withProps} from 'recompose'
import {GoogleMap, withGoogleMap, withScriptjs, Marker} from 'react-google-maps'

const Map = compose(
    withProps({
        containerElement: <div style={{height: '100%'}}/>,
        mapElement: <div style={{height: '100%'}}/>,
        loadingElement: <div style={{height: '100%'}}/>,
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAi-athQZA-MeHI9ST6Br16Esxta8_z49g&v=3.exp&libraries=geometry,drawing,places'
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={13}
        center={{lat: -7.12, lng: -34.84}}>
        {props.places.map((place, index) =>
            <Marker
                key={index}
                position={{lat: place.lat, lng: place.lng}}
            />)
        }
    </GoogleMap>
);

export default Map