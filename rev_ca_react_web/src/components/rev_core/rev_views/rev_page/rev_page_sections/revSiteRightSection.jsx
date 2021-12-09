import React, { Component } from 'react';

import RevSiteTopSection from './revSiteTopSection';
import RevSiteMiddleBodySection from './revSiteMiddleBodySection';
import RevSiteRightSidebarSection from './revSiteRightSidebarSection';

class RevSiteRightSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let styles = {
            revSiteContainer: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            },

            revSiteMidRightContainer: {
                height: '100%',
                display: 'flex',
            },
        }

        return (
            <div style={styles.revSiteContainer}>
                <RevSiteTopSection />
                <div style={styles.revSiteMidRightContainer}>
                    <RevSiteMiddleBodySection revPageViews={this.props.revPageViews} revResetRevMainCenterView={this.props.revResetRevMainCenterView} />
                    <RevSiteRightSidebarSection />
                </div>
            </div>
        );
    }
}

export default RevSiteRightSection;