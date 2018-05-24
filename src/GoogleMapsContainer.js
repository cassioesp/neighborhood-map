import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';

var foursquare = require('react-foursquare')({
    clientID: 'GE33NIJ2DMXDSLDYCJZ2DYQWAUJG3G3NCDAFXKNSCIMLCI1I',
    clientSecret: 'SMRBE3PZ2Y4TQPUS44M24VYSQ2RZY24FJSYGISZYUVTV0MHP'
});

class GoogleMapsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            foursquarePlaceInfo: [],
            foursquarePlacePhoto: []
        };

        this.onMapClick = this.onMapClick.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

        var params = {};

        params.venue_id = props.id;
        params.query = props.name;
        params.ll = props.position.lat + ", " + props.position.lng;

        foursquare.venues.getVenues(params)
            .then(res => {
                this.setState({foursquarePlaceInfo: res.response.venues[0]});
            });

        foursquare.venues.getVenuePhotos(params)
            .then(res => {
                this.setState({foursquarePlacePhoto: res.response.photos});
            });
    };

    onMapClick = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        const style = {
            width: '100%',
            height: '100%',
        };

        return (
            <div
                style={{marginLeft: '250px'}}>
                <Map
                    item
                    xs={12}
                    style={style}
                    google={this.props.google}
                    onClick={this.onMapClick}
                    zoom={12}
                    initialCenter={{lat: -7.119722, lng: -34.849280}}
                >
                    {this.props.places.map((place, i) => {
                        return <Marker
                            key={place.id}
                            id={place.id}
                            title={place.name}
                            position={{lat: place.lat, lng: place.lng}}
                            name={place.name}
                            onClick={this.onMarkerClick.bind(this)}
                        >
                        </Marker>
                    })}
                    {this.state && this.state.foursquarePlaceInfo &&
                    this.state.foursquarePlacePhoto.items &&
                    <InfoWindow
                        className='info-window'
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div align="center">
                            {this.state.foursquarePlacePhoto.items[0] && (
                                <img src={this.state.foursquarePlacePhoto.items[0].prefix
                                + '128' +
                                this.state.foursquarePlacePhoto.items[0].suffix} alt="placeImg1"/>
                            )}
                            {this.state.foursquarePlacePhoto.items[1] && (
                                <img src={this.state.foursquarePlacePhoto.items[1].prefix
                                + '128' +
                                this.state.foursquarePlacePhoto.items[1].suffix} alt="placeImg2"/>
                            )}
                            {this.state.foursquarePlacePhoto.items[2] && (
                                <img src={this.state.foursquarePlacePhoto.items[2].prefix
                                + '128' +
                                this.state.foursquarePlacePhoto.items[2].suffix} alt="placeImg2"/>
                            )}

                            <div key={this.state.foursquarePlaceInfo.id}>
                                <h1>{this.state.foursquarePlaceInfo.name}</h1>
                                {this.state.foursquarePlaceInfo.categories && (
                                    <h3>{this.state.foursquarePlaceInfo.categories[0].name}</h3>
                                )}
                            </div>
                        </div>
                    </InfoWindow>
                    }
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAwvxELYZLyUbkq9FFm96bB0khFPMLdHIo'
})(GoogleMapsContainer)
