import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';


class GoogleMapsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onMapClick = this.onMapClick.bind(this);
    }

    /**
     * Deselect any selected marker.
     */
    onMapClick = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
            ;
        }
    };

    render() {
        const style = {
            width: '100%',
            height: '100%',
        };
        return (
            <div
                className='map-container'
                style={{marginLeft: '250px'}}>
                <Map
                    item
                    xs={12}
                    style={style}
                    google={this.props.google}
                    onClick={this.onMapClick}
                    zoom={12}
                    initialCenter={{lat: -7.119722, lng: -34.849280}}>
                    {this.props.markers}
                    {this.props && this.props.foursquarePlaceInfo &&
                    <InfoWindow
                        className='info-window'
                        marker={this.props.activeMarker}
                        visible={this.props.showingInfoWindow}>
                        <div align="center">
                            <div key={this.props.foursquarePlaceInfo.id}>
                                <h1>{this.props.foursquarePlaceInfo.name}</h1>
                                {this.props.foursquarePlaceInfo.categories && (
                                    <h3>{this.props.foursquarePlaceInfo.categories[0].name}</h3>
                                )}
                            </div>
                            <footer>Data from Foursquare</footer>
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
