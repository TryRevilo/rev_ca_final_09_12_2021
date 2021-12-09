import React, { Component } from 'react';

class RevIMSideBarItemView extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.styles = this.styles.bind(this);
    }

    render() {
        return (
            <div style={this.styles().revIMItemWrapperStyle}>
                <div style={this.styles().revUserIMDetailsStyle}>
                    <div><i class="fa fa-user" style={this.styles().revIMUserIconStyle}></i></div>
                </div>

                <div style={this.styles().revCenterStyle}>
                    <div style={this.styles().revUser_Names_Number_Style}>
                        <div style={this.styles().revIMUserFullNamesStyle}>oLivER mucHAi <span style={this.styles().revTimeCreatedStyle}>Last seen 11/26/19 - 10:01AM</span></div>
                        <div style={this.styles().revIMUsercctNumberStyle}>+254 710 335 077</div>
                    </div>

                    <div style={this.styles().revMessagesBatchContainer}>
                        <div><input class="form-control" type="text" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;composE mEssAGE . . ." style={this.styles().revCommentInputStyle} /></div>

                        <div style={this.styles().revMessageDetailsStyle}>
                            <div style={this.styles().revMsgSourceStyle}><i class="fas fa-upload"></i></div>
                            <div style={this.styles().revIMMsgContentContainerStyle}>
                                <div style={this.styles().revIMMsgContentStyle}>no time for caution?</div>
                                <div style={this.styles().revTimeCreatedStyle}>11/26/19 - 10:01AM</div>
                            </div>
                        </div>

                        <div style={this.styles().revMessageDetailsStyle}>
                            <div style={this.styles().revMsgSourceStyle}><i class="fas fa-download"></i></div>
                            <div style={this.styles().revIMMsgContentContainerStyle}>
                                <div style={this.styles().revIMMsgContentStyle}>Bacon ipsum dolor amet ipsum brisket lorem, chicken kevin bacon t-bone. Frankfurter beef ground round, kielbasa jowl porchetta veniam meatloaf short ribs do biltong.</div>
                                <div style={this.styles().revTimeCreatedStyle}>11/26/19 - 10:01AM</div>
                            </div>
                        </div>

                        <div style={this.styles().revMessageDetailsStyle}>
                            <div style={this.styles().revMsgSourceStyle}><i class="fas fa-download"></i></div>
                            <div style={this.styles().revIMMsgContentContainerStyle}>
                                <div style={this.styles().revIMMsgContentStyle}>glad to see you Shiku</div>
                                <div style={this.styles().revTimeCreatedStyle}>11/26/19 - 10:01AM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }

    styles = () => {
        return {
            revIMItemWrapperStyle: {
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginTop: '2em',
                marginLeft: '2.7em',
                textAlign: 'left',
            },

            revCenterStyle: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            },

            revUser_Names_Number_Style: {
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '1em',
            },

            revIMUserIconStyle: {
                color: '#D1C4E9',
                fontSize: '1.2em'
            },

            revUserIMDetailsStyle: {
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '.9em',
            },

            revMessagesBatchContainer: {
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '.5em'
            },

            revIMUserFullNamesStyle: {
                color: '#5C6BC0',
                lineHeight: '1.1em',
                fontSize: '1.1em',
            },

            revIMUsercctNumberStyle: {
                color: '#5C6BC0',
                fontSize: '.7em',
            },

            revMessageDetailsStyle: {
                display: 'flex',
                width: '100%',
                padding: '.3em .7em',
                marginBottom: '1px',
                backgroundColor: '#EDE7F6',
            },

            revMsgSourceStyle: {
                color: '#5C6BC0',
                fontSize: '.8em',
            },

            revIMMsgContentContainerStyle: {
                marginLeft: '.7em'
            },

            revIMMsgContentStyle: {
                color: '#616161',
                fontSize: '.92em',
                lineHeight: '1.1em',
                maxWidth: '29em',
                wordWrap: 'break-word',
            },

            revTimeCreatedStyle: {
                color: '#9E9E9E',
                fontSize: '.7em',
                marginTop: '.4em'
            },

            revCommentInputStyle: {
                fontSize: '.9em',
                border: '1px solid #EDE7F6',
                borderBottom: '0 solid #EDE7F6',
                padding: '1em',
                marginTop: '.5em',
                outline: 'none',
                borderRadius: '0',
            },
        }
    }
}

export default RevIMSideBarItemView;