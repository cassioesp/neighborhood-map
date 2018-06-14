/* eslint-disable no-undef */
import React, {Component} from 'react'
import {GoogleMap, withGoogleMap, withScriptjs, Marker} from 'react-google-maps'

const MapComponent = withScriptjs(withGoogleMap(props => {
        return <GoogleMap
            defaultZoom={13}
            center={{lat: -7.12, lng: -34.84}}>
            {props.getFilteredPlaces.map((place, index) =>
                <Marker
                    key={index}
                    id={place.id}
                    position={{lat: place.lat, lng: place.lng}}
                    onClick={() => props.onMarkerClick(place.id)}
                />)
            }
        </GoogleMap>
    }
));

class Map extends Component {

    render() {
        return <div
            role='region'
            aria-label='map'
            className='map-container'
            style={{marginLeft: '250px'}}>
            <MapComponent
                googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyAi-athQZA-MeHI9ST6Br16Esxta8_z49g&v=3.exp&libraries=geometry,drawing,places'
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `768px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
                onMarkerClick={(id) => this.props.onMarkerClick(id)}
                getFilteredPlaces={this.props.getFilteredPlaces()}
            />
        </div>;
    }
}

export default Map