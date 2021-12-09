import React, { Component } from 'react';

import RevSiteTopBar from '../rev_page_widgets/revSiteTopBar';

class RevSiteTopSection extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let styles = {
            revSiteTopBarStyle: {
                width: '100%'
            }
        }
        return (
            <div style={styles.revSiteTopBarStyle}>
                <RevSiteTopBar />
            </div>
        );
    }
}

export default RevSiteTopSection;