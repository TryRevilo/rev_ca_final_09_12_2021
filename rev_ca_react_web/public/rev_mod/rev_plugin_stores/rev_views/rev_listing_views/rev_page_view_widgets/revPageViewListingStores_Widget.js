var revPageViewWidget = async (revVarArgs) => {
    let revListedStoresArr = [];
    let revStoreAdminssArr;

    try {
        let revURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "rev_logged_in_entity_guid=" + window.REV_LOGGED_IN_ENTITY_GUID + "&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetListedStoreEntities";

        let revData = await window.revGetServerData_JSON_Async(revURL);
        revListedStoresArr = revData.filter;

        revStoreAdminssArr = revData.revPublishers;
    } catch (error) {
        console.log("ERR -> revPageViewListingResolutions_Widget.js -> !revData" + error);
    }

    if (!Array.isArray(revListedStoresArr) || revListedStoresArr.length < 1) {
        let revNoPostsTxt = "No Posts on tHis pRoFiLE BOARD YET";

        revNoPostsTxt = "No ListingsStoress askEd YET";

        return `
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revNoPostsView">${revNoPostsTxt}</div>
        `;
    }

    let revrevListedStoresViewsArr = [];

    for (let i = 0; i < revListedStoresArr.length; i++) {
        let revStoreEntity = revListedStoresArr[i];

        let revPageViewStoreBriefInfo = await window.revGetLoadedPageView("revPageViewStoreBriefInfo", revStoreEntity);

        revrevListedStoresViewsArr.push(`<div class="revFlexContainer revListingsStoresItemContainer">${revPageViewStoreBriefInfo}</div>`);
    }

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    let revPageHeader = window.revPageHeader(`7 sToREs puBLisHED`);
    /** REV END HEADER AREA */

    let revAddNewListingsStoresHeaderTab_Id = "revAddNewListingsStoresHeaderTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAddNewListingsStoresHeaderTab_Id, () => {
        document.getElementById(revAddNewListingsStoresHeaderTab_Id).addEventListener("click", async (event) => {
            let revSelectStore = await window.revGetForm("revSelectStore", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revSelectStore, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revRetPageView = `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">
                ${revPageViewPageNavHeader}
            </div>
            <div class="revFlexWrapper revPageHeaderListingsStoresWrapper">
                ${revPageHeader}
                <div class="revFlexWrapper revAddNewListingsStoresHeaderWrapper">
                    <div class="revSmall-V-Line-1em"></div>
                    <div class="revSmall-H-Line"></div>
                    <div id="${revAddNewListingsStoresHeaderTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revAddNewListingsStoresTabWrapper">
                    </div>
                </div>
            </div>
        </div>
        <div class="revFlexContainer revFlexContainerScroll revListingsStoresContainer">${revrevListedStoresViewsArr.join("")}</div>
    </div>
    `;

    return revRetPageView;
};

module.exports.revPageViewWidget = revPageViewWidget;
