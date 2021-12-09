import React, { Component } from 'react';

class RevItemListingShareMenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    revTabClicked = () => {
        console.log('>>> CLICKED! ' + JSON.stringify(this.props));
    }

    render() {
        return (<i className="fas fa-share-alt" onClick={() => { this.revTabClicked() }}></i>);
    }
}

export default RevItemListingShareMenuItem;