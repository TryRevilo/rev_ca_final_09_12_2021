import React, { Component } from 'react';

class RevRecommendationSidebarItemsView extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.styles = this.styles.bind(this);
    }

    render() {

        let revItemsListView = () => {
            let revArr = [];
            let i = 0;

            while (i < 42) {
                i++;
                revArr.push(i);
            }

            return revArr.map((val) => {
                return (
                    <div style={this.styles().revUserIconStyle}><i class="fa fa-user"></i></div>
                )
            });
        };

        return (
            <div style={this.styles().revItemContainer}>
                <div style={this.styles().revRecommendTitleStyle}>pEopLE you mAy kNow</div>
                <div style={this.styles().revListItemsContainer}>{revItemsListView()}</div>
                <div style={this.styles().revMoreReccomendationsStyle}>+255 moRE</div>
            </div>);
    }

    styles = () => {
        return {
            revItemContainer: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
                maxWidth: '500px',
                overflow: 'hidden',
                marginTop: '.25em',
                marginLeft: '2.3em',
                marginBottom: '2.04em',
            },

            revRecommendTitleStyle: {
                fontSize: '.9rem',
                fontWeight: '600',
                color: '#5C6BC0',
                textAlign: 'left',
                lineHeight: '1.1em',
                width: '100%',
                paddingBottom: '1px',
                borderBottom: '1px solid #EDE7F6'
            },

            revListItemsContainer: {
                display: 'flex',
                maxWidth: 485,
                marginTop: '1px',
                overflowY: 'scroll'
            },

            revUserIconStyle: {
                fontSize: '1.4rem',
                color: '#7986CB',
                backgroundColor: '#F5F5F5',
                borderRadius: '0 0 0 5px',
                display: 'flex',
                padding: '.17em',
                marginRight: '.3em',
                border: '1px solid #EDE7F6',
                borderTop: '0 solid #D1C4E9',
            },

            revMoreReccomendationsStyle: {
                fontSize: '.9rem',
                color: '#7986CB',
                marginTop: '.4em'
            }
        }
    };
}

export default RevRecommendationSidebarItemsView;