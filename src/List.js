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
            },
            {
                "id": "4ce180e4f8a4a143db04ebbc",
                "name": "Usina Cultural da Energisa",
                "lat": "-7.1194918",
                "lng": "-34.8701119"
            }
        ],
        query: ''
    };

    /**
     * Filter places list based on query.
     * @param query
     */
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

    /**
     * Show/Hide list of places.
     */
    handleMenuClick() {
        const map = document.querySelector('.map-container');
        map.style.marginLeft = map.style.marginLeft === '250px' ? '0' : '250px';

        const sandwich = document.querySelector('.sandwich');
        sandwich.style.left = sandwich.style.left === '250px' ? '0' : '250px';
    }

    render() {
        return (
            <div>
                <div id='sideBar' className='sidebar'>
                    <div className='heading'>
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
                    <div className='place-list'>
                        <ol>
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
                <div
                    tabIndex='-1'
                    style={{left: '250px'}}
                    className='sandwich'
                    onClick={this.handleMenuClick}>
                    <img
                        src='menu.png'
                        alt='Show/Hide List'/>
                </div>
            </div>

        );
    }
}

export default List;