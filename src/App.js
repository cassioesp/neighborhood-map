import React, {Component} from 'react';
import './App.css';
import GoogleMapsContainer from "./GoogleMapsContainer";
import List from "./List";

class App extends Component {
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
        ]
    };

    handleSetMarkers = (places) => {
        this.setState({places});
    };

    render() {
        return (
            <div className="App">
                <List
                    setMarkers={this.handleSetMarkers}
                    places={this.state.places}/>
                <GoogleMapsContainer
                    places={this.state.places}/>
            </div>
        );
    }
}

export default App;
