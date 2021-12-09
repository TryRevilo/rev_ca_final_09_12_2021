import React, { Component } from 'react';

class RevItemListingLikesMenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    revTabClicked = () => {
        console.log(JSON.stringify(this.props));
    }

    render() {
        let styles = {

            revItemOptionsIcon: {
                color: '#7986CB',
                fontSize: '.95em',
            },

            revItemOptionsText: {
                color: '#9E9E9E',
                fontSize: '.7em',
            },
        };

        return (
            <span>
                <span style={styles.revItemOptionsIcon}><i class="fas fa-arrow-up"></i></span>
                <span style={styles.revItemOptionsText}> 22 </span>
                <span style={styles.revItemOptionsIcon}><i class="fas fa-arrow-down" ></i></span>
            </span>
        );
    }
}

export default RevItemListingLikesMenuItem;