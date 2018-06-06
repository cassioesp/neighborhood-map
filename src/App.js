import React, {Component} from 'react';
import './App.css';
import GoogleMapsContainer from "./GoogleMapsContainer";
import List from "./List";
import {Marker} from "google-maps-react";

var foursquare = require('react-foursquare')({
    clientID: 'GE33NIJ2DMXDSLDYCJZ2DYQWAUJG3G3NCDAFXKNSCIMLCI1I',
    clientSecret: 'SMRBE3PZ2Y4TQPUS44M24VYSQ2RZY24FJSYGISZYUVTV0MHP'
});


class App extends Component {

    constructor(props) {
        super(props);

        this.onMarkerClick = this.onMarkerClick.bind(this);

        this.state.places.map((place, i) => {
            var marker = <Marker
                key={place.id}
                id={place.id}
                title={place.name}
                position={{lat: place.lat, lng: place.lng}}
                name={place.name}
                onClick={this.onMarkerClick.bind(this)}
            >
            </Marker>;
            this.state.markers.push(marker);
            return marker;
        })
    }


    state = {
        places: [
            {
                "id": "589fae9ad9705c7b87640bb4",
                "name": "Le Pub Bar Alternatif",
                "lat": "-7.106710",
                "lng": "-34.832104"
            },
            {
                "id": "57c60b69498e90302e84addc",
                "name": "General Store",
                "lat": "-7.117390",
                "lng": "-34.884799"
            },
            {
                "id": "4bff0666e584c92879a36d25",
                "name": "Espaço Cultural José Lins do Rêgo",
                "lat": "-7.121785",
                "lng": "-34.843107"
            },
            {
                "id": "4cc5fe241e596dcb9298db67",
                "name": "Praça Antenor Navarro",
                "lat": "-7.113452",
                "lng": "-34.888581"
            },
            {
                "id": "5877cc8603cf252551869b26",
                "name": "Estação de Ciência e Artes",
                "lat": "-7.149027",
                "lng": "-34.797814"
            },
            {
                "id": "4ce180e4f8a4a143db04ebbc",
                "name": "Usina Cultural da Energisa",
                "lat": "-7.1194918",
                "lng": "-34.8701119"
            }
        ],
        markers: [],
        showingInfoWindow: false,
        activeMarker: {},
        foursquarePlaceInfo: {}
    };

    handleSetMarkers = (places) => {
        this.setState({places});
    };

    /**
     * Handles a click on a marker.
     */
    onMarkerClick = (props) => {

        for (let i = 0; i < this.state.markers.length; i++) {
            if (this.state.markers[i].props.title === props.title) {
                this.setState({
                    activeMarker: this.state.markers[i],
                    showingInfoWindow: true
                })
            }
        }

        var params = {};

        params.venue_id = props.id;
        params.query = props.name;
        params.ll = props.position.lat + ", " + props.position.lng;

        foursquare.venues.getVenues(params)
            .then(res => {
                console.log(res);
                this.setState({foursquarePlaceInfo: res.response.venues[0]});
            });

    };


    render() {
        return (
            <div className="App">
                <List
                    setMarkers={this.handleSetMarkers}
                    places={this.state.places}/>
                <GoogleMapsContainer
                    showingInfoWindow={this.state.showingInfoWindow}
                    foursquarePlaceInfo={this.state.foursquarePlaceInfo}
                    activeMarker={this.state.activeMarker}
                    markers={this.state.markers}
                    places={this.state.places}/>
            </div>
        );
    }
}

export default App;
