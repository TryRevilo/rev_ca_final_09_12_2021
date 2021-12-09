import React, { Component } from 'react';

import RevIMSideBarItemView from '../rev_object_view/revIMSideBarItemView';

class RevIMSidebarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revReccomends: null,
            revComms: null,
            revObjectViewIM: null
        }
    }

    componentDidMount = async () => {
        await window.revGetLoadedPageViewAreaContainer('revPageViewMembesReccomendRightWidget', null, (revMainCenterScrollArea) => {
            this.setState({ revReccomends: revMainCenterScrollArea });
        });

        await window.revGetLoadedPageViewAreaContainer('revPageViewCommsRightSidebar', null, (revMainCenterScrollArea) => {
            this.setState({ revComms: revMainCenterScrollArea });
        });

        let revMessagesView = async () => {
            let revItems = [];

            let revArr = [1, 2, 3, 4, 5];

            for (let i = 0; i < revArr.length; i++) {
                await window.revGetLoadedPageView('revObjectViewIM', null, (revMainCenterScrollArea) => {
                    revItems.push(revMainCenterScrollArea);
                })
            }

            return revItems;
        };

        let revItems = await revMessagesView();
        revItems = revItems.join('');
        this.setState({ revObjectViewIM: revItems });


        console.log(revItems);
    };

    render() {

        let styles = {
            revIMHeaderMenuArea: {
                display: 'flex',
                marginLeft: '.5rem'
            },

            revIMHeaderTabWrapper: {
                lineHeight: 1.1,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderBottom: '1px solid #F5F5F5',
                padding: '0 1em',
            },

            revIMHeaderTab: {
                fontSize: '1em',
                fontWeight: 'bold',
                marginLeft: '1em',
                borderBottom: '2px solid #F5F5F5',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            },

            revIMHeaderTabIcon: {
                fontSize: '1.4em',
                color: '#007bff'
            },

            revIMHeaderTabText: {
                fontSize: '1em',
                color: '#FFF'
            },

            revIMContainer: {
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '1em',
                overflow: 'auto',
                overflowY: 'scroll',
                maxHeight: '49em'
            },
        }

        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: this.state.revReccomends }}></div>

                <div dangerouslySetInnerHTML={{ __html: this.state.revComms }}></div>

                <div style={styles.revIMContainer} dangerouslySetInnerHTML={{ __html: this.state.revObjectViewIM }}></div>
            </div>);
    }
}

export default RevIMSidebarView;