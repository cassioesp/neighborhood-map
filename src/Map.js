/* eslint-disable no-undef */
import React, {Component} from 'react'
import {GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow} from 'react-google-maps'

const MapComponent = withScriptjs(withGoogleMap(props => {
        return <GoogleMap
            defaultZoom={13}
            center={{lat: -7.12, lng: -34.84}}>
            {props.getFilteredPlaces.map((place, index) =>
                <Marker
                    key={index}
                    id={place.id}
                    position={{lat: place.lat, lng: place.lng}}
                    onClick={() => props.onToggleOpen(place.id)}
                >
                    {props.isOpen && props.info.categories
                    && (props.selectedPlace.id === place.id) && (
                        <InfoWindow
                            key={index}
                            id={place.id}>
                            <div className={'info'}>
                                <h1>
                                    {place.name}
                                </h1>
                                <h3>
                                    {props.info.categories[0].name}
                                </h3>
                                <h4>Data from foursquare</h4>
                            </div>
                        </InfoWindow>
                    )}
                </Marker>)
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
                containerElement={<div style={{width: '100%', height: '100%'}}/>}
                mapElement={<div style={{height: `100%`}}/>}
                onToggleOpen={(id) => this.props.onToggleOpen(id)}
                getFilteredPlaces={this.props.getFilteredPlaces()}
                isOpen={this.props.isOpen}
                selectedPlace={this.props.selectedPlace}
                info={this.props.info}
            />
        </div>;
    }
}

export default Map