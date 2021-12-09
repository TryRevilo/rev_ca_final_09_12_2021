import React, { Component } from 'react';

class RevSiteTopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let styles = {
            revTopBarWrapperStyle: {
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
            },

            revInputOverrideStyle: {
                maxWidth: 723,
                color: '#BDBDBD',
                fontSize: '1em',
                backgroundColor: '#FFF',
                border: '1px solid #EDE7F6',
                borderTop: '0 solid #EDE7F6',
                borderLeft: '0 solid #EDE7F6',
                padding: '1.25em 1.25em 1.25em 2.95em',
                outline: 'none',
                borderRadius: '0',
            },

            revLogoutTabStyle: {
                color: '#5C6BC0',
                fontSize: '1.4em',
                alignSelf: 'flex-end',
                padding: '0 0 .14em 0',
                position: 'relative',
                right: '.5em'
            },

            revSiteLeft: {
                display: 'flex',
                width: '100%'
            },

            vl: {
                borderBottom: '1.4em solid #F5F5F5',
                position: 'absolute',
                zIndex: -1,
                alignSelf: 'center',
                width: '100%',
            },
        }

        return (
            <div style={styles.revTopBarWrapperStyle}>
                <div style={styles.revSiteLeft}>
                    <input className="form-control mr-sm-2" type="search" placeholder="sEARcH" aria-label="Search" style={styles.revInputOverrideStyle} />
                </div>
                <span style={styles.revLogoutTabStyle}><i className="fas fa-sign-out-alt"></i></span>
                <div style={styles.vl}></div>
            </div>
        );
    }
}

export default RevSiteTopBar;