import React, { Component } from 'react';

import { revGetEntityChildren_By_Subtype } from '../../../../rev_core/rev_libs/revLibRevEntity';

class RevItemListingCommentsCountMenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revEntityComments: [],
        }
    }

    revTabClicked = () => {
        console.log('revTabClicked > > > > : ' + revGetEntityChildren_By_Subtype(this.state.revEntityComments, 'rev_comment').length);
    }

    componentDidMount() {
        if (this.props && this.props.props.revTimelineEntity && this.props.props.revTimelineEntity._revEntityChildrenList) {
            let revEntityComments = revGetEntityChildren_By_Subtype(this.props.props.revTimelineEntity._revEntityChildrenList, 'rev_comment');
            this.setState({ revEntityComments: revEntityComments })
        }
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
                <span style={styles.revItemOptionsIcon}><i class="far fa-comments" onClick={() => { this.revTabClicked() }}></i></span>
                <span style={styles.revItemOptionsText}> {this.state.revEntityComments.length} </span>
            </span>
        );
    }
}

export default RevItemListingCommentsCountMenuItem;