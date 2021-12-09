import React, { Component } from 'react';

class RevSiteMiddleBodySection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revImgUrl: 'https://picsum.photos/50',
            revPluginMenuItemsArr: [],
            revPluginInits: [],
        }
    }

    render() {
        let revSidth = 730;

        let styles = {
            revSiteCenter: {
                display: 'flex',
                flexDirection: 'column',
                minWidth: revSidth,
                maxWidth: revSidth,
                height: '100%',
                paddingBottom: '2.2em',
            },

            revPageScrollArea: {
                paddingBottom: '1.2em',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'auto',
            }
        }

        return (
            <div style={styles.revSiteCenter}>

                <div dangerouslySetInnerHTML={{ __html: window.revPageSwitchArea() }}></div>

                <div style={styles.revPageScrollArea}>
                    {this.props.revPageViews.revMainCenterView}
                </div>
            </div>
        );
    }
}

export default RevSiteMiddleBodySection;