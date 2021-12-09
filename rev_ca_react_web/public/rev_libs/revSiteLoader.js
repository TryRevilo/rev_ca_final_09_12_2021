var revDrawPage = () => {
    let revPage = `
    <div class="App">
        <div id="revSiteLeftSection"></div>

        <div class="revRightSectionContainer">
            <RevSiteTopSection />

            <div class="revSiteMidRightContainer">
                <div class="revSiteCenter">
                    <div id="revSwitchArea" class="invisible revSwitchArea"></div>
                    <div id="revPageHome" class="revPageScrollArea"></div>
                </div>

                <div class="revSightRightSidebar">
                    <div dangerouslySetInnerHTML={{ __html: this.state.revPageViewMembesReccomendRightWidget }></div>
                    <div class="revServicesArea} dangerouslySetInnerHTML={{ __html: this.state.revPageViewCommsRightSidebar }"></div>
                    <div class="revRightSideBarFooterMenuArea">Terms</div>
                </div>
            </div>
        </div>
    </div>
    `;

    return revPage;
};

module.exports.revDrawPage = revDrawPage;