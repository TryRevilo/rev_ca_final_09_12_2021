var revPageViewWidget = async (revVarArgs) => {
    let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

    let revSiblingsEntitiesArr;
    let revParentsEntitiesArr;

    try {
        let revURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "rev_logged_in_entity_guid=" + revLoggedInEntityGUID + "&revPluginHookContextsRemoteArr=revHookRemoteHandler_ReadFamilyEntityRels";

        let revData = await window.revGetServerData_JSON_Async(revURL);

        if (revData.hasOwnProperty("revSiblingsEntitiesArr")) {
            revSiblingsEntitiesArr = revData.revSiblingsEntitiesArr;
        }

        if (revData.hasOwnProperty("revParentsEntitiesArr")) {
            revParentsEntitiesArr = revData.revParentsEntitiesArr;
        }
    } catch (error) {
        console.log("ERR -> revPageViewFamilyConnections_Widget.js -> !revData" + error);
    }

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "rev_space_family" } });

    let revPageAreaHeaderPageNewFamilyRelTab_Id = "revPageAreaHeaderPageNewFamilyRelTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPageAreaHeaderPageNewFamilyRelTab_Id, () => {
        document.getElementById(revPageAreaHeaderPageNewFamilyRelTab_Id).addEventListener("click", async (event) => {
            let revCreateNewFamilyRelationshipForm = await window.revGetForm("revCreateNewFamilyRelationshipForm", revVarArgs);

            window.revToggleSwitchArea(`
            <div class="revFlexContainer revCreateUserConnectionsFormContainer">
                <div class="revFontSizeNormalHeader revPublisherSettingsHeader">aDD NEw FAmiLy mEmBER</div>
                ${revCreateNewFamilyRelationshipForm}
            </div>
            `);
        });
    });

    let revPageViewFamilyParentConnections = await window.revGetLoadedPageView("revPageViewFamilyParentConnections", revParentsEntitiesArr);
    let revPageViewFamilyParentConnectionsView = "";

    if (!window.revIsEmptyVar(revPageViewFamilyParentConnections)) {
        revPageViewFamilyParentConnectionsView = `<div class="revFlexContainer revFamilyConnectionsObjectConnectionsListingContainer">${revPageViewFamilyParentConnections}</div>`;
    }

    let revPageViewFamilySiblingConnections = await window.revGetLoadedPageView("revPageViewFamilySiblingConnections", revSiblingsEntitiesArr);
    let revPageViewFamilySiblingConnectionsView = "";

    if (!window.revIsEmptyVar(revPageViewFamilySiblingConnections)) {
        revPageViewFamilySiblingConnectionsView = `<div class="revFlexContainer revFamilyConnectionsObjectConnectionsListingContainer">${revPageViewFamilySiblingConnections}</div>`;
    }

    let revPageViewFamilyGrandParentsConnections = await window.revGetLoadedPageView("revPageViewFamilyGrandParentsConnections", revVarArgs);
    let revPageViewFamilyGrandParentsConnectionsView = "";

    if (!window.revIsEmptyVar(revPageViewFamilyGrandParentsConnections)) {
        revPageViewFamilyGrandParentsConnectionsView = `<div class="revFlexContainer revFamilyConnectionsObjectConnectionsListingContainer">${revPageViewFamilyGrandParentsConnections}</div>`;
    }

    let revPageViewFamilyCousinsConnections = await window.revGetLoadedPageView("revPageViewFamilyCousinsConnections", revVarArgs);
    let revPageViewFamilyCousinsConnectionsView = "";

    if (!window.revIsEmptyVar(revPageViewFamilyCousinsConnections)) {
        revPageViewFamilyCousinsConnectionsView = `<div class="revFlexContainer revFamilyConnectionsObjectConnectionsListingContainer">${revPageViewFamilyCousinsConnections}</div>`;
    }

    let revPageViewFamilyFriendsConnections = await window.revGetLoadedPageView("revPageViewFamilyFriendsConnections", revVarArgs);
    let revPageViewFamilyFriendsConnectionsView = "";

    if (!window.revIsEmptyVar(revPageViewFamilyFriendsConnections)) {
        revPageViewFamilyFriendsConnectionsView = `<div class="revFlexContainer revFamilyConnectionsObjectConnectionsListingContainer">${revPageViewFamilyFriendsConnections}</div>`;
    }

    let revFamilyConnectionsPageOwnerIcon_Id = "revFamilyConnectionsPageOwnerIcon_Id_" + window.revGenUniqueId();
    let revEntityFullNames_Id = "revEntityFullNames_Id_" + window.revGenUniqueId();

    window.revSetInterval(revFamilyConnectionsPageOwnerIcon_Id, () => {
        document.getElementById(revFamilyConnectionsPageOwnerIcon_Id).addEventListener("click", function () {
            window.revUserIconClick(revVarArgs._remoteRevEntityGUID);
        });

        window.revLoadUserIcon(revVarArgs, revFamilyConnectionsPageOwnerIcon_Id);
    });

    window.revSetInterval(revEntityFullNames_Id, () => {
        document.getElementById(revEntityFullNames_Id).addEventListener("click", function () {
            window.revUserIconClick(revVarArgs._remoteRevEntityGUID);
        });
    });

    let revFullNames = window.revGetMetadataValue(revVarArgs._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

    let revParentsViewContainer = `
    <div class="revFlexContainer revFamilyObjectPageOwnerParentsContainer">
        <div class="revFlexWrapper">
            <div id="${revFamilyConnectionsPageOwnerIcon_Id}" class="revTabLink revFamilyConnectionsObjectPageOwnerIcon"></div>
            <div class="revFlexContainer revFamilyConnectionsObjectPageOwnerDetailsContainer">
                <div class="revFontSiteGreyTxtColor revFontSizeExtraSmall">CousiN</div>
                <div id="${revEntityFullNames_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeMedium revFlexWrapper revFamilyConnectionsObjectPageOwnerNames">${revFullNames}</div>
            </div>
        </div>
        ${revPageViewFamilyParentConnectionsView}
        ${revPageViewFamilySiblingConnectionsView}
        ${revPageViewFamilyGrandParentsConnectionsView}
        ${revPageViewFamilyCousinsConnectionsView}
        ${revPageViewFamilyFriendsConnectionsView}
    </div>
    `;

    return `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageViewPageNavHeader">${revPageViewPageNavHeader}</div>
        ${revParentsViewContainer}
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
