import React, { Component } from 'react';

class RevItemListingBookmarkMenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.revBookmarkTabClicked = this.revBookmarkTabClicked.bind(this);
    }

    revBookmarkTabClicked = () => {
        console.log('>>> CLICKED! ' + JSON.stringify(this.props));
    }

    render() {
        return (<i className="far fa-bookmark" onClick={() => { this.revBookmarkTabClicked() }}></i>);
    }
}

export default RevItemListingBookmarkMenuItem;