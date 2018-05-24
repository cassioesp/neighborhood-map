import React, {Component} from 'react';
import escapeRegExp from 'escape-string-regexp'

class List extends Component {

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
            }
        ],
        query: ''
    };


    updateQuery(query) {
        this.setState({query}, () => {
            const filtered = this.getFilteredPlaces();
            this.props.setMarkers(filtered);
        });
    }

    getFilteredPlaces() {
        const {query} = this.state;

        if (!query) {
            return this.state.places;
        }

        const match = new RegExp(escapeRegExp(query), 'i');
        return this.state.places.filter(p => match.test(p.name));
    }

    render() {

        return (
            <div>
                <div className='sidebar'>
                    <div className='heading' role='heading'>
                        <h1 className='title'>
                            Cassio's Places
                        </h1>
                        <input
                            className='filter-places'
                            type='text'
                            value={this.state.query}
                            onChange={event => this.updateQuery(event.target.value)}
                            placeholder='Filter places'/>
                    </div>
                    <div className='place-list' role='region'>
                        <ol className='places-list'>
                            {this.getFilteredPlaces().map((place) => (
                                <li key={place.id} className='place-list-item'>
                                    <div className='place-details'>
                                        <p>{place.name}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;