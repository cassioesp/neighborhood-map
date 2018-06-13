import React, {Component} from 'react';
import escapeRegExp from 'escape-string-regexp'

class List extends Component {

    state = {
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
            return this.props.places;
        }

        const match = new RegExp(escapeRegExp(query), 'i');
        return this.props.places.filter(p => match.test(p.name));
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
            </div>
        );
    }
}

export default List;