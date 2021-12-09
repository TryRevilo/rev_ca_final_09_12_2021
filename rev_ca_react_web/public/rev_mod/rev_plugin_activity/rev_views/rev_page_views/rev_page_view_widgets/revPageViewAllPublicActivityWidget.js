var revPageViewWidget = async (revVarArgs) => {
    let revPageViewPageNavHeaderId = "revPageViewPageNavHeaderId_" + window.revGenUniqueId();

    let revAllPublicActivityListingContainerId = "revAllPublicActivityListingContainerId";

    let revAllPublicActivityListingPageHeader = window.revPageHeader("ALL puBLic posTs");

    window.revSetInterval(revPageViewPageNavHeaderId, async () => {
        let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSpaceType" } });
        document.getElementById(revPageViewPageNavHeaderId).innerHTML = revPageViewPageNavHeader;
    });

    window.revSetInterval(revAllPublicActivityListingContainerId, async () => {
        try {
            let revPageViewTimeline = await window.revGetLoadedPageViewAreaContainer("revPageViewTimeline", null);

            if (revPageViewTimeline) {
                document.getElementById(revAllPublicActivityListingContainerId).innerHTML = revPageViewTimeline;
            }
        } catch (error) {
            console.log("ERR -> revPageViewAllPublicActivityWidget.js -> !revPageViewTimeline -> " + error);
        }
    });

    let revPage = `
            <div class="revFlexContainer revAllPublicActivityPageListingContainer">
                <div class="revFlexContainer revPageHeaderAreaContainer">
                    ${revAllPublicActivityListingPageHeader}
                    <div id="${revPageViewPageNavHeaderId}" class="revFlexWrapper revPageViewTitledPageNavHeader"></div>
                </div>
                <div id="${revAllPublicActivityListingContainerId}" class="revFlexContainer revAllPublicActivityListingContainer"></div>
            </div>
            `;

    return revPage;
};

module.exports.revPageViewWidget = revPageViewWidget;
