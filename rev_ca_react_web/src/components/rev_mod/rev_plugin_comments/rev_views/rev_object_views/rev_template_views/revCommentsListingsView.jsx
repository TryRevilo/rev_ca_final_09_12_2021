import React, { Component } from 'react';

import { revGetRemoteScriptObject } from '../../../../../rev_core/rev_libs/revLibScriptLoaders';
import { revGetMetadataValue } from '../../../../../rev_core/rev_libs/revLibRevMetadata';

class RevCommentsListingsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revTemplateView: <div>HELLO ???</div>,
            revPublisher: this.props.revEntity.revPublisher,
            revEntity: this.props.revEntity
        }

        this.styles = this.styles.bind(this);
    }

    async componentDidMount() {
        this.setState({ revTemplateView: await revGetRemoteScriptObject(this.state.revEntity) });
    }

    render() {
        let revPublisher = this.state.revPublisher;
        let revOwnerName = revGetMetadataValue(revPublisher._revEntityMetadataList, 'rev_entity_full_names_value');

        let revUserIconPath = window.revGetEntityIcon(revPublisher);
        revUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + '/' + revUserIconPath;

        revGetRemoteScriptObject(this.props.revEntity);

        return (
            <div style={this.styles().revCommentListStyle} >
                <img style={this.styles().revCommentPublisherIconStyle} src={revUserIconPath} onError={(e) => { e.target.onerror = null; e.target.src = window.REV_DEFAULT_USER_ICON_PATH }} />
                <div style={this.styles().revListCenterStyle}>
                    <div>
                        <span style={this.styles().revPublisherNamesStyle}>{revOwnerName}</span>
                        <span style={this.styles().revTimeCreatedStyle}>{this.state.revEntity._timeCreated}</span>
                    </div>
                    <div style={this.styles().revEntityDescriptionStyle}>{revGetMetadataValue(this.state.revEntity._revEntityMetadataList, 'rev_comment_value')}</div>
                </div>
            </div>
        );
    }

    styles = () => {
        let revCommentOwnerIconSize = 35;

        return {

            revCommentListStyle: {
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
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
                color: '#616161',
                fontWeight: '600',
                fontSize: '.85em',
            },

            revTimeCreatedStyle: {
                color: '#757575',
                fontSize: '.7em',
            },

            revEntityDescriptionStyle: {
                color: '#616161',
                fontSize: '.9em',
                textAlign: 'left',
                lineHeight: '1em',
                paddingRight: '1em',
                maxWidth: '37em',
                wordWrap: 'break-word',
            },

            revCommentPublisherIconStyle: {
                padding: '.2em .2em',
                backgroundColor: '#EEEEEE',
                borderRadius: '50%',
                width: revCommentOwnerIconSize, height: revCommentOwnerIconSize,
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                objectFit: 'cover'
            },

            revViewAllStyle: {
                color: '#7986CB',
                fontSize: '.9em',
                margin: '.4em 0 1em 49px',
            }
        }
    }
}

export default RevCommentsListingsView;