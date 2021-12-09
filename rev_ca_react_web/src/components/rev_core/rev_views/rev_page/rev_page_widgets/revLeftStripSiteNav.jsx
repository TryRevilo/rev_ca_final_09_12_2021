import React, { Component } from 'react';

class RevLeftStripSiteNav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    revCalendarsTab = () => {
        let revCalContainer = document.createElement('div');
        revCalContainer.id = 'revCalContainer';
        revCalContainer.classList.add('revCalContainer');

        let checkExist = setInterval(function () {
            if (window.$('#revCalContainer').length) {
                window.$(function () {
                    window.$('#revCalContainer').fullCalendar({
                        defaultView: 'agendaWeek',
                        header: {
                            left: 'prev,today,next',
                            center: 'title',
                            right: 'agendaDay,agendaWeek,month,list',
                        },
                        height: 'auto',
                        contentHeight: 'auto',
                        events: 'https://fullcalendar.io/demo-events.json'
                    })
                });


                clearInterval(checkExist);
            }
        }, 100);

        window.revLoadContainerInnerHTMLContent('revPageHome', window.revNodeToString(revCalContainer));
    };

    revDrawHome = async () => {
        let revVarArgs = { 'revPublisher': { '_remoteRevEntityGUID': 34 } };

        await window.revGetLoadedPageViewAreaContainer('revMainCenterScrollArea', revVarArgs, (revMainCenterScrollArea) => {
            window.revLoadContainerInnerHTMLContent('revPageHome', revMainCenterScrollArea);
        });
    }

    render() {
        const x = 90;
        const y = 100;

        let styles = {
            revSiteLeft: {
                backgroundColor: '#EDE7F6',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '0 0.25em',
                borderRadius: '0 0 22px 22px',
            },

            vl: {
                borderLeft: '1px solid #F5F5F5',
                height: '100%',
                position: 'absolute',
                zIndex: 1
            },

            revStripTab: {
                fontSize: '1.2rem',
                color: '#5C6BC0',
                zIndex: 2,
                cursor: 'pointer',
                padding: '.3em',
                marginTop: '1em',
                backgroundColor: '#D1C4E9',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
            },

            revStripTabsContainer: {
                paddingTop: '2.2em',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                zIndex: 2,
                height: '100%'
            },

            revAdvertiseTabStyle: {
                fontSize: '1rem',
                lineHeight: '1em',
                color: '#5C6BC0',
                padding: '2em .3em',
                marginTop: 'auto',
                zIndex: 2,
                backgroundColor: '#D1C4E9',
                marginBottom: '.7em',
                borderRadius: '50%',
                marginTop: 72
            },
        };

        return (
            <div style={styles.revSiteLeft}>
                <div style={styles.vl}></div>
                <div style={styles.revStripTabsContainer}>
                    <div style={styles.revStripTab} onClick={() => { this.revHistoryTab(<div>my REcENT HisToRy</div>) }}><i className="fas fa-history"></i></div>
                    <div style={styles.revStripTab} onClick={() => { this.revDrawHome() }}><i className="fas fa-home"></i></div>
                    <div style={styles.revStripTab} onClick={() => { this.revActivityTab() }}><i className="fas fa-chart-line"></i></div>
                    <div style={styles.revStripTab} onClick={() => { this.revMembersTab() }}><i className="fas fa-street-view"></i></div>
                    <div style={styles.revStripTab}><i className="fas fa-users"></i></div>
                    <div style={styles.revStripTab}><i className="fas fa-hashtag"></i></div>
                    <div style={styles.revStripTab} onClick={() => { this.revCalendarsTab() }}><i className="far fa-calendar-alt"></i></div>
                    <div style={styles.revStripTab}><i className="fas fa-expand-arrows-alt"></i></div>

                    <div style={styles.revStripTab, styles.revAdvertiseTabStyle}><i className="fas fa-expand-arrows-alt"></i></div>
                </div>
            </div>
        );
    }
}

export default RevLeftStripSiteNav;