import React, { Component } from 'react';

import { revGetPublisherEntity } from '../../../../rev_core/rev_libs/revLibRevEntity';

import RevCommentsListingsView from './rev_template_views/revCommentsListingsView';

class RevCommentsListings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revTemplateView: <div>HELLO ???</div>,
            revEntityPublishersArr: this.props.revEntityPublishersArr,
            revCommentsArr: this.props.revCommentsArr,
        }

        this.styles = this.styles.bind(this);
        this.revGetEntityComments = this.revGetEntityComments.bind(this);
    }

    revGetEntityComments = (revCommentsArr) => {
        let revEntityPublishersArr = this.state.revEntityPublishersArr;

        if (revCommentsArr.length == 0) return <div></div>;

        let revCommentsViewsList = [];

        for (let i = 0; i < revCommentsArr.length; i++) {
            if (i == 4) {
                revCommentsViewsList.push(<div style={this.styles().revViewAllStyle}>viEw moRE commENTs</div>);
                break;
            }

            let revCommentItem = revCommentsArr[i];
            revCommentItem.revPublisher = revGetPublisherEntity(revEntityPublishersArr, revCommentItem._revEntityOwnerGUID);

            let revClassStyles = 'revContainer ' + (revCommentItem.revPublisher._remoteRevEntityGUID == 1 ? 'revCommentOwnerBlock' : '');

            let revCommentChild =
                <div
                    className={revClassStyles}
                    style={
                        revCommentItem.revPublisher._remoteRevEntityGUID !== 1 && (revCommentsArr.length == 1 || (i == 3)) ? this.styles().revCommentListStyle_No_Border : this.styles().revCommentListStyle
                    }
                >
                    <RevCommentsListingsView revEntity={revCommentItem} />
                </div>;

            revCommentsViewsList.push(revCommentChild);
        }
        return revCommentsViewsList.map((revCommentItem, i) => {
            return revCommentItem;
        });
    }

    render() {
        return (
            <div style={(this.state.revCommentsArr.length === 0) ? this.styles().revEntityCommentsContainer_No_Border : this.styles().revEntityCommentsContainer}>
                {this.revGetEntityComments(this.state.revCommentsArr)}
            </div>
        );
    }

    styles = () => {

        return {

            revCommentListStyle: {
                padding: '.6em .6em',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderBottom: '1px solid #EDE7F6'
            },

            revCommentListStyle_No_Border: {
                padding: '.6em .6em',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderBottom: '0 solid #EDE7F6'
            },

            revEntityCommentsContainer: {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '1px solid #EDE7F6',
                borderBottom: '0 solid #EDE7F6',
                borderLeft: '0 solid #EDE7F6',
            },

            revEntityCommentsContainer_No_Border: {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '1px solid #EDE7F6',
                borderBottom: '0 solid #EDE7F6',
                borderTop: '0 solid #EDE7F6',
                borderLeft: '0 solid #EDE7F6',
            },

            revViewAllStyle: {
                color: '#7986CB',
                fontSize: '.9em',
                margin: '.7em 0 1em 57px',
            }
        }
    }
}

export default RevCommentsListings;