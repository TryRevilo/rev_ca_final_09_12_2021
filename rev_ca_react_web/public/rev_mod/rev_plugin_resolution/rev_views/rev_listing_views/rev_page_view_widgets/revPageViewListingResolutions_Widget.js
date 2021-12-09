var revPageViewWidget = async (revVarArgs) => {
    let revResolutionRequestsArr = [];
    let revResolutionRequestPublishersArr;

    try {
        let revURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "rev_logged_in_entity_guid=" + window.REV_LOGGED_IN_ENTITY_GUID + "&revPluginHookContextsRemoteArr=revHookRemoteContext_GetEntityResolutionRequests";

        let revData = await window.revGetServerData_JSON_Async(revURL);
        revResolutionRequestsArr = revData.filter;

        revResolutionRequestPublishersArr = revData.revPublishers;
    } catch (error) {
        console.log("ERR -> revPageViewListingResolutions_Widget.js -> !revData" + error);
    }

    let revResolutionsResView = `<div class="revFontSiteGreyTxtColor revFontSizeNormal revResolutionRequestListingItemContainer">No ResolutionRequests askEd YET</div>`;

    if (Array.isArray(revResolutionRequestsArr) && revResolutionRequestsArr.length > 0) {
        let revResolutionRequestsAskedArr = [];

        for (let i = 0; i < revResolutionRequestsArr.length; i++) {
            let revResolutionEntity = revResolutionRequestsArr[i];

            let revPassVarArgs = {
                "revResolutionContainerEntity": revVarArgs.revResolutionContainerEntity,
                "revResolutionCallBack": revVarArgs.revResolutionCallBack,
                "revResolutionEntity": revResolutionEntity,
                "revResolutionRequestPublisher": window.revGetPublisherEntity(revResolutionRequestPublishersArr, revResolutionEntity._revEntityOwnerGUID),
            };

            let revObjectViewResolutionRequestRequestItemListing = await window.revGetLoadedPageView("revObjectViewResolutionRequestItemListing", revPassVarArgs);

            revResolutionRequestsAskedArr.push(`<div class="revFlexContainer revResolutionRequestListingItemContainer">${revObjectViewResolutionRequestRequestItemListing}</div>`);
        }

        if (revResolutionRequestsAskedArr.length > 0) {
            revResolutionsResView = revResolutionRequestsAskedArr.join("");
        }
    }

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    let revPageHeader = window.revPageHeader(`over 141, 656 resolutioNRequest rEQuesTs`);
    /** REV END HEADER AREA */

    let revAddNewResolutionRequestHeaderTab_Id = "revAddNewResolutionRequestHeaderTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAddNewResolutionRequestHeaderTab_Id, () => {
        document.getElementById(revAddNewResolutionRequestHeaderTab_Id).addEventListener("click", async (event) => {
            let revResolutionRequestForm = await window.revGetForm("revResolutionRequestForm", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revResolutionRequestForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revRetPageView = `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">
                ${revPageViewPageNavHeader}
            </div>
            <div class="revFlexWrapper revPageHeaderResolutionRequestWrapper">
                ${revPageHeader}
                <div class="revFlexWrapper revAddNewResolutionRequestHeaderWrapper">
                    <div class="revSmall-V-Line-1em"></div>
                    <div class="revSmall-H-Line"></div>
                    <div id="${revAddNewResolutionRequestHeaderTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revAddNewResolutionRequestTabWrapper">
                    </div>
                </div>
            </div>
        </div>
        <div class="revFlexContainer revFlexContainerScroll revResolutionRequestsAskedContainer">${revResolutionsResView}</div>
    </div>
    `;

    return revRetPageView;
};

module.exports.revPageViewWidget = revPageViewWidget;
