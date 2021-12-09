import React, { Component } from 'react';

import { revGetMetadataValue } from '../../../../rev_core/rev_libs/revLibRevMetadata';

class RevOverrideView_MemoItemListing extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.styles = this.styles.bind(this);
    }
    render() {
        let revTimelineEntity = this.props.props.revEntity;
        let revEntityPublishersArr = this.props.props.revEntityPublishersArr;

        if (!revTimelineEntity || !revEntityPublishersArr) return (<div>HELLO >>> revTimelineEntity</div>);

        return (
            <div style={this.styles().revListStyle}>
                <div style={this.styles().revListCenterStyle}>
                    <div style={this.styles().revEntityDescriptionStyle}>
                        <i class="fas fa-quote-left" style={this.styles().revQuoteIconStyle}></i>
                            &nbsp;{revGetMetadataValue(revTimelineEntity._revEntityMetadataList, 'rev_memo_message_value').slice(1, 155)}
                    </div>
                </div>
            </div>
        );
    }

    styles = () => {
        let revImgSize = 45;

        return {
            revListStyle: {
                margin: '0 0 1em 2.2em',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderBottom: '.1em solid #EDE7F6'
            },

            revPublisherIconStyle: {
                padding: '.2em .2em',
                backgroundColor: '#EEEEEE',
                borderRadius: '50%',
                width: revImgSize, height: revImgSize,
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                objectFit: 'cover',
            },

            revListCenterStyle: {
                width: '100%',
                margin: '0 0 0 .7em',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            },

            revPublisherNamesStyle: {
                color: '#757575',
                fontWeight: 'bold',
                fontSize: '.9em',
            },

            revTimeCreatedStyle: {
                color: '#757575',
                fontSize: '.7em',
            },

            revEntityDescriptionStyle: {
                color: '#616161',
                fontSize: '1em',
                textAlign: 'left',
                lineHeight: '1.2em',
                paddingRight: '1em',
                maxWidth: '37em',
                wordWrap: 'break-word',
            },

            revQuoteIconStyle: {
                color: '#EDE7F6',
            },

            revCommentInputStyle: {
                fontSize: '.9em',
                width: '100%',
                border: '1px solid #EDE7F6',
                borderBottom: '0 solid #EDE7F6',
                padding: '1em',
                marginTop: '.8em',
                outline: 'none',
                borderRadius: '0',
            },

            revCommentInputStyle_No_Border: {
                fontSize: '.8em',
                width: '100%',
                border: '1px solid #EDE7F6',
                borderBottom: '0px solid #EDE7F6',
                padding: '1em',
                marginTop: '.8em',
                outline: 'none',
                borderRadius: '0',
            },

            revItemOptionsText: {
                color: '#9E9E9E',
                fontSize: '.9em',
            },
        }
    }
}

export default RevOverrideView_MemoItemListing;