import React, { Component } from 'react';

import RevSlateRichTextDefault from '../../rev_view_templates/rev_view_input_form_emplates/revSlateRichTextDefault';

class RevPublisher extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "" };
    }

    render() {
        let styles = {
            revPublisherContainer: {
                display: 'flex',
                flexDirection: 'column',
                margin: '.7em 0 0 2em',
                width: '94.47%'
            },

            revpageOwnerHeader: {
                width: '100%',
                paddingLeft: '.4em',
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '.01em solid #ECEFF1',
                alignItems: 'baseline',
            },

            revUserIcon: {
                color: '#EDE7F6',
                fontSize: '2em',
                borderBottom: '.01em solid #ECEFF1',
            },

            revPageOwnerNames: {
                paddingLeft: '.3em'
            },

            revPublisherTabsMenuArea: {
                margin: '1.1em 0 .1em .9em'
            },

            revPublisherTabs: {
                margin: '1em 0 .1em 1.2em'
            },

            revUploadTab: {
                color: '#5C6BC0',
                fontSize: '1.2em'
            },

            revOptionsStabsWrapper: {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            },

            revOptionsStab: {
                color: '#7986CB',
                padding: '0 1em',
            },

            revTextAreaAutoGrow: {
                minHeight: "3vh",
                resize: 'none',
                height: "unset",
                border: '0 solid #FFF',
                borderBottom: '.01em solid #EDE7F6',
                padding: '1em',
                marginTop: '.8em',
                outline: 'none',
                overflow: 'auto',
                boxShadow: '0 0 10px #719ECE'
            },

            revBtnColorOverride: {
                color: '#5C6BC0',
                backgroundColor: '#D1C4E9',
                borderColor: '#D1C4E9',
                borderRadius: '4px',
                padding: '.175rem .65rem'
            },

            revDropDownIconStyle: {
                color: '#5C6BC0',
                fontSize: '1.5em',
                padding: '0 1em',
            },

            revBtnColorOverrideBottomRadius: {
                color: '#FFF',
                fontWeight: 'bold',
                backgroundColor: '#D1C4E9',
                borderColor: '#D1C4E9',
                borderRadius: '0 0 4px 4px',
                padding: '.175rem .65rem'
            },
        }

        const textArea = document.querySelector("textarea");
        const textRowCount = textArea ? textArea.value.split("\n").length : 0;
        const rows = textRowCount + 1;

        return (
            <div style={styles.revPublisherContainer}>
                <div style={styles.revpageOwnerHeader}>

                    <div style={styles.revPageOwnerNames, styles.revOptionsStab}><a href="#" style={styles.revUserIcon}><i class="fa fa-user"></i></a> Oliver Muchai</div>

                    <nav className="nav">
                        <a class="nav-link" href="" style={styles.revOptionsStab}>iNFo</a>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="dropdown" style={styles.revOptionsStab} href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fas fa-compress"></i></a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Separated link</a>
                            </div>
                        </li>

                        <a class="nav-link" href="#" style={styles.revOptionsStab}><i class="fas fa-user-plus"></i></a>
                        <a class="nav-link" href="#" style={styles.revOptionsStab}><i class="fas fa-search"></i></a>
                    </nav>

                    <div style={styles.revOptionsStabsWrapper}>
                        <div style={styles.revOptionsStab}><span><i class="fas fa-plus"></i></span></div>
                        <div style={styles.revOptionsStab}><span><i class="fas fa-braille"></i> FAmiLy</span></div>
                    </div>
                </div>

                <div style={styles.revPublisherTabsMenuArea}>
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <a class="nav-link active" href="#" style={styles.revBtnColorOverride}><i class="fa fa-upload" style={styles.revUploadTab}></i></a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" style={styles.revDropDownIconStyle}></a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Separated link</a>
                            </div>
                        </li>
                    </ul>
                </div>

                <RevSlateRichTextDefault />
            </div>);
    }
}

export default RevPublisher;