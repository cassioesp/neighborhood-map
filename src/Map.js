/* eslint-disable no-undef */
import React from 'react'
import {compose, lifecycle, withProps} from 'recompose'
import SearchBox from 'react-google-maps/lib/components/places/SearchBox'
import {GoogleMap, withGoogleMap, withScriptjs, Marker} from 'react-google-maps'

const MapWithSearchBox = compose(
    withProps({
        containerElement: <div style={{height: '100%'}}/>,
        mapElement: <div style={{height: '400px'}}/>,
        loadingElement: <div style={{height: '100%'}}/>,
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAi-athQZA-MeHI9ST6Br16Esxta8_z49g&v=3.exp&libraries=geometry,drawing,places'
    }),
    lifecycle({
            componentDidMount() {
                const refs = {};

                this.setState({
                    bounds: null,
                    mapMounted: ref => {
                        refs.map = ref
                    },
                    center: {
                        lat: 41.9,
                        lng: -87.846
                    },
                    searchBoxMounted: ref => {
                        refs.searchBox = ref
                    },

                    onBoundsChange: () => {
                        this.setState({
                            bounds: refs.map.getBounds(),
                            center: refs.map.getCenter()
                        })
                    },

                    onPlacesChanged: () => {
                        const places = refs.searchBox.getPlaces();
                        const bounds = new google.maps.LatLngBounds();

                        const nextPlaces = places.map(place => {
                            return {position: place.geometry.location}

                        });

                        this.setState(({
                            center: nextPlaces[0].position
                        }))


                    }

                })
            }
        }
    ),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={9}
        ref={props.mapMounted}
        center={props.center}
        onBoundsChange={props.onBoundsChange}>
        <SearchBox
            ref={props.searchBoxMounted}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}>
            <input type="text"
                   placeholder='Digite seu endereço'
                   style={{height: '80px'}}/>
        </SearchBox>
        <Marker
            position={props.center}/>
    </GoogleMap>
);

export default MapWithSearchBox