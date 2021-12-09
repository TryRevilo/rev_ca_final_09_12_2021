import React, { Component } from 'react';

import RevLeftStripSiteNav from '../rev_page_widgets/revLeftStripSiteNav';

class RevSiteLeftSection extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <RevLeftStripSiteNav revResetRevMainCenterView={this.props.revResetRevMainCenterView} />
        );
    }
}

export default RevSiteLeftSection;