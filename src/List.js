import React, {Component} from 'react';

class List extends Component {

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
                            value={this.props.query}
                            onChange={event => this.props.updateQuery(event.target.value)}
                            placeholder='Filter places'/>
                    </div>
                    <div className='place-list'>
                        <ol>
                            {this.props.getFilteredPlaces().map((place) => (
                                <li key={place.id}
                                    className='place-list-item'
                                    onClick={() => this.props.onToggleOpen(place.id)}>
                                    <div className='place-details'>
                                        <p>{place.name}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div
                        tabIndex='-1'
                        style={{left: '250px'}}
                        className='sandwich'
                        onClick={this.props.onMenuClick}>
                        <img
                            src='menu.png'
                            alt='Show/Hide List'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;