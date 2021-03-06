import React, {Component} from 'react';
import './App.css';
import Map from './Map'
import List from './List'
import escapeRegExp from "escape-string-regexp";

var foursquare = require('react-foursquare')({
    clientID: 'GE33NIJ2DMXDSLDYCJZ2DYQWAUJG3G3NCDAFXKNSCIMLCI1I',
    clientSecret: 'SMRBE3PZ2Y4TQPUS44M24VYSQ2RZY24FJSYGISZYUVTV0MHP'
});

class App extends Component {

    state = {
        query: "",
        places: [
            {
                "id": "589fae9ad9705c7b87640bb4",
                "name": "Le Pub Bar Alternatif",
                "lat": -7.106710,
                "lng": -34.832104
            },
            {
                "id": "57c60b69498e90302e84addc",
                "name": "General Store",
                "lat": -7.117390,
                "lng": -34.884799
            },
            {
                "id": "4bff0666e584c92879a36d25",
                "name": "Espaço Cultural José Lins do Rêgo",
                "lat": -7.121785,
                "lng": -34.843107
            },
            {
                "id": "4cc5fe241e596dcb9298db67",
                "name": "Praça Antenor Navarro",
                "lat": -7.113452,
                "lng": -34.888581
            },
            {
                "id": "5877cc8603cf252551869b26",
                "name": "Estação de Ciência e Artes",
                "lat": -7.149027,
                "lng": -34.797814
            },
            {
                "id": "4ce180e4f8a4a143db04ebbc",
                "name": "Usina Cultural da Energisa",
                "lat": -7.1194918,
                "lng": -34.8701119
            }],
        selectedPlace: null,
        isOpen: false,
        info: []
    };


    /**
     * Filter places list based on query.
     * @param query
     */
    updateQuery(query) {
        this.setState({
            query: query
        });
    }

    getFilteredPlaces() {
        const {query, places} = this.state;

        if (!query) {
            return places;
        }

        const match = new RegExp(escapeRegExp(query), 'i');
        return places.filter(p => match.test(p.name));
    }


    onToggleOpen(selectedPlace, isOpen) {
        if (!isOpen) {
            for (let i = 0; i < this.state.places.length; i++) {
                if (this.state.places[i].id === selectedPlace) {
                    this.setState({
                        selectedPlace: this.state.places[i],
                        isOpen: true
                    });

                    var params = {};

                    params.venue_id = this.state.places[i].id;
                    params.query = this.state.places[i].name;
                    params.ll = this.state.places[i].lat + ", " + this.state.places[i].lng;
                    foursquare.venues.getVenues(params)
                        .then(res => {
                            this.setState({info: res.response.venues[0]});
                        });
                }
            }
        } else {
            this.setState({
                selectedPlace: null,
                isOpen: false

            });
        }
    };

    onMenuClick() {
        const map = document.querySelector('.map-container');
        map.style.marginLeft = map.style.marginLeft === '250px' ? '0' : '250px';

        const sandwich = document.querySelector('.sandwich');
        sandwich.style.left = sandwich.style.left === '250px' ? '0' : '250px';
    }

    render() {
        return (
            <div className="App" style={{width: '100%', height: '100%'}}>
                <List
                    updateQuery={this.updateQuery.bind(this)}
                    getFilteredPlaces={this.getFilteredPlaces.bind(this)}
                    onToggleOpen={this.onToggleOpen.bind(this)}
                    onMenuClick={this.onMenuClick.bind(this)}
                    query={this.state.query}/>
                <Map
                    onToggleOpen={this.onToggleOpen.bind(this)}
                    getFilteredPlaces={this.getFilteredPlaces.bind(this)}
                    selectedPlace={this.state.selectedPlace}
                    isOpen={this.state.isOpen}
                    info={this.state.info}
                />
            </div>
        );
    }
}

export default App;
