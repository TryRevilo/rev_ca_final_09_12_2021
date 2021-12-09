var revPageViewWidget = async (revVarArgs) => {
    let revEntityMetadataList = revVarArgs._revEntityMetadataList;
    let revMaxStrLen = 57;

    let revEntityName = window.revGetMetadataValue(revEntityMetadataList, "rev_entity_name");
    revEntityName = window.revGetRawHTML(revEntityName);
    revEntityName = window.revTruncateString(revEntityName, revMaxStrLen);

    let revStoreChildsEntitiesArr = [];

    try {
        let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&remote_rev_entity_guid=${revVarArgs._remoteRevEntityGUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetListedStoreChildEntities`;

        let revData = await window.revGetServerData_JSON_Async(revURL);
        revStoreChildsEntitiesArr = revData.filter;
    } catch (error) {
        console.log("ERR -> revObjectViewStore_Widget.js -> !revData" + error);
    }

    let revStoreChildsViewsArr = [];

    for (let i = 0; i < revStoreChildsEntitiesArr.length; i++) {
        let revCurrEntity = revStoreChildsEntitiesArr[i];

        if (window.revIsEmptyJSONObject(revCurrEntity)) {
            continue;
        }

        let revStoreItemOverrideView = await window.revGetLoadedOverrideView("rev_store_item", { "revEntity": revCurrEntity });
        revStoreChildsViewsArr.push(`<div class="revFlexContainer revObjectViewStoreItemContainer">${revStoreItemOverrideView}</div>`);
    }

    let revResolutionEntity_Id = "revResolutionEntity_Id_" + window.revGenUniqueId();

    window.revSetInterval(revResolutionEntity_Id, () => {
        document.getElementById(revResolutionEntity_Id).addEventListener("click", async (event) => {
            revVarArgs.revResolutionCallBack();
        });
    });

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSelectStore" } });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader(revEntityName);
    /** REV END HEADER AREA */

    let revPageViewStoreBriefInfoArea_Id = "revPageViewStoreBriefInfoArea_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPageViewStoreBriefInfoArea_Id, async () => {
        try {
            let revPageViewStoreBriefInfo = await window.revGetLoadedPageView("revPageViewStoreBriefInfo", { "revStoreEntity": revVarArgs });
            document.getElementById(revPageViewStoreBriefInfoArea_Id).innerHTML = `
               <div class="revFlexWrapper revPageViewStoreBriefInfoWrapper">${revPageViewStoreBriefInfo}</div>
           `;
        } catch (error) {
            console.log("ERR -> revObjectViewStore_Widget.js -> !revData -> " + error);
        }
    });

    let revResView = `
    <div class="revFlexContainer revPageRightBorderedContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
            ${revPageHeader}
        </div>
        <div id="${revPageViewStoreBriefInfoArea_Id}" class="revFlexContainer"></div>
        <div class="revFlexContainer revStoreChildsViewsArrContainer">${revStoreChildsViewsArr.join("")}</div>
    </div>
    `;

    return revResView;
};

module.exports.revPageViewWidget = revPageViewWidget;
