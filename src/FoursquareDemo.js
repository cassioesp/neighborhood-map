import React, {Component} from 'react';


var foursquare = require('react-foursquare')({
    clientID: 'GE33NIJ2DMXDSLDYCJZ2DYQWAUJG3G3NCDAFXKNSCIMLCI1I',
    clientSecret: 'SMRBE3PZ2Y4TQPUS44M24VYSQ2RZY24FJSYGISZYUVTV0MHP'
});

var params = {
    "ll": "37.7749,-122.4194",
    "query": 'Blue Bottle'
};

class FoursquareDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        foursquare.venues.getVenues(params)
            .then(res => {
                this.setState({items: res.response.venues});
            });
    }

    render() {
        return (
            <div>
                <div>Items:</div>
                {this.state.items.map(item => {
                    return <div key={item.id}>{item.name}</div>
                })}
            </div>
        )
    }
}

export default FoursquareDemo;