import React, { Component } from "react";

import "./App.css";

import RevSiteLeftSection from "./components/rev_core/rev_views/rev_page/rev_page_sections/revSiteLeftSection";

import RevSiteTopSection from "./components/rev_core/rev_views/rev_page/rev_page_sections/revSiteTopSection";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revPageViewMembesReccomendRightWidget: null,
            revPageViewCommsRightSidebar: null,
        };
    }

    async componentDidMount() {
        await window.revLoadModules("revPluginModuleSessions", (revScriptModule) => {
            window.revPluginModuleSessions.revGetLoggedInEntity(async (revData) => {
                await window.revGetLoadedPageViewAreaContainer("revMainCenterScrollArea", revData, (revView) => {
                    window.revLoadContainerInnerHTMLContent("revPageHome", revView);
                });
            });
        });

        await window.revGetLoadedPageViewAreaContainer("revPageViewMembesReccomendRightWidget", null, (_revView) => {
            this.setState({ revPageViewMembesReccomendRightWidget: _revView });
        });

        await window.revGetLoadedPageViewAreaContainer("revPageViewCommsRightSidebar", null, (_revView) => {
            this.setState({ revPageViewCommsRightSidebar: _revView });
        });
    }

    render() {
        return (
            <div className="App">
                <div style={this.styles().revRightSectionContainer}>
                    <RevSiteTopSection />

                    <div style={this.styles().revSiteMidRightContainer}>
                        <div style={this.styles().revSiteCenter}>
                            <div id="revSwitchArea" className="invisible revSwitchArea"></div>
                            <div id="revPageHome" style={this.styles().revPageScrollArea}></div>
                        </div>

                        <div style={this.styles().revSightRightSidebar}>
                            <div dangerouslySetInnerHTML={{ __html: this.state.revPageViewMembesReccomendRightWidget }}></div>
                            <div style={this.styles().revServicesArea} dangerouslySetInnerHTML={{ __html: this.state.revPageViewCommsRightSidebar }}></div>
                            <div style={this.styles().revRightSideBarFooterMenuArea}>Terms</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    styles = () => {
        return {
            revRightSectionContainer: {
                height: "100%",
                display: "flex",
                flexDirection: "column",
            },

            revSiteMidRightContainer: {
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
                flexGrow: 1,
            },

            revSiteCenter: {
                display: "flex",
                flexDirection: "column",
                height: "100%",
                paddingBottom: "2.2em",
                flexGrow: 1,
            },

            revPageScrollArea: {
                paddingBottom: "1.2em",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflowY: "auto",
                flexGrow: 1,
                width: 723,
            },

            revSightRightSidebar: {
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                position: "-webkit-sticky",
                position: "sticky",
                top: 0,
                overflow: "Hidden",
                width: 555,
                marginLeft: "1.7em",
            },

            revRightSideBarFooterMenuArea: {
                fontSize: "1rem",
                fontWeight: 400,
                color: "#5C6BC0",
                display: "flex",
                padding: "1em 2em",
                marginTop: "auto",
                marginLeft: "4.4em",
                marginBottom: "3.4em",
                borderTop: "1px solid #D1C4E9",
            },

            revServicesArea: {
                width: "100%",
            },
        };
    };
}

export default App;
