import React, { Component } from 'react';

class RevSiteRightSidebarSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revPageViewMembesReccomendRightWidget: null,
            revPageViewCommsRightSidebar: null,
        }
    }

    componentDidMount = async () => {
        await window.revGetLoadedPageViewAreaContainer('revPageViewMembesReccomendRightWidget', null, (_revView) => {
            this.setState({ revPageViewMembesReccomendRightWidget: _revView });
        });

        await window.revGetLoadedPageViewAreaContainer('revPageViewCommsRightSidebar', null, (_revView) => {
            this.setState({ revPageViewCommsRightSidebar: _revView });
        });
    };

    render() {
        let styles = {
            revSightRightSidebar: {
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                position: '-webkit-sticky',
                position: 'sticky',
                top: 0,
                overflow: 'Hidden',
                width: 555
            },

            revRightSideBarFooterMenuArea: {
                fontSize: '1rem',
                fontWeight: 400,
                color: '#5C6BC0',
                display: 'flex',
                padding: '1em 2em',
                marginTop: 'auto',
                marginLeft: '4.4em',
                marginBottom: '3.4em',
                borderTop: '1px solid #D1C4E9',
            },

            revServicesArea: {
                width: '100%'
            }
        }

        return (
            <div style={styles.revSightRightSidebar}>
                <div dangerouslySetInnerHTML={{ __html: this.state.revPageViewMembesReccomendRightWidget }}></div>

                <div style={styles.revServicesArea} dangerouslySetInnerHTML={{ __html: this.state.revPageViewCommsRightSidebar }}></div>

                <div style={styles.revRightSideBarFooterMenuArea}>Terms</div>
            </div>
        );
    }
}

export default RevSiteRightSidebarSection;