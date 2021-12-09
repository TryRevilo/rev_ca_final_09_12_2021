var revPageViewWidget = async (revVarArgs) => {
    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader("my conNEcTions");
    /** REV END HEADER AREA */

    let revPageViewPageNavHeaderId = "revPageViewPageNavHeaderId_" + window.revGenUniqueId();

    window.revSetInterval(revPageViewPageNavHeaderId, async () => {
        let revLoadedPageView = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSpaceType" } });
        document.getElementById(revPageViewPageNavHeaderId).innerHTML = revLoadedPageView;
    });

    let revPageViewSpacesListingId = window.revGenUniqueId();

    let revGetEntityAdmin = (revAdminGUIDsArr, revAdminsArr) => {
        let revRetAdminsArr = [];

        for (let i = 0; i < revAdminsArr.length; i++) {
            let revAdminEntity = revAdminsArr[i];

            if (revAdminGUIDsArr.includes(revAdminEntity._remoteRevEntityGUID)) revRetAdminsArr.push(revAdminEntity);
        }

        return revRetAdminsArr;
    };

    window.revSetInterval(revPageViewSpacesListingId, async () => {
        let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&rev_rel_type_val_id_arr=11,5&rev_query_limit=40&revPluginHookContextsRemoteArr=revHookRemoteHandler_GetEntityConnections`;

        let revData = await window.revGetServerData_JSON_Async(revURL);
        let revConnEntitiesArr = revData.filter;

        let revAdminsArr = revData.revAdminsArr;

        let revSpacesArr = [];

        for (let i = 0; i < revConnEntitiesArr.length; i++) {
            let revConnEntity = revConnEntitiesArr[i];

            if (window.revIsEmptyJSONObject(revConnEntity) || !revConnEntity._revEntitySubType) {
                continue;
            }

            let revConnEntityBriefContextView;

            if (revConnEntity._revEntityType.localeCompare("rev_user_entity") == 0) {
                revConnEntityBriefContextView = await window.revGetLoadedPageView("revObjectViewContactItem", revConnEntity);
            } else if (revConnEntity._revEntityType.localeCompare("rev_group_entity") == 0) {
                if (revConnEntity.revAdminGUIDsArr) {
                    let revAdminGUIDsArr = revConnEntity.revAdminGUIDsArr;

                    revConnEntity["revAdminsArr"] = revGetEntityAdmin(revAdminGUIDsArr, revAdminsArr);
                }

                revConnEntityBriefContextView = await revDownloadContextView("revSpaceBriefInfo", revConnEntity._revEntitySubType, revConnEntity);

                if (revConnEntityBriefContextView) {
                    revConnEntityBriefContextView = `<div class="revFlexWrapper revSpaceListingItemWrapper">${revConnEntityBriefContextView}</div>`;
                }
            }

            if (revConnEntityBriefContextView) {
                revSpacesArr.push(revConnEntityBriefContextView);
            }
        }

        let revConnsListingsView = `<div class="revFontSiteGreyTxtColor revFontSizeNormal">you do not have any connections</div>`;

        if (revSpacesArr.length > 0) {
            revConnsListingsView = revSpacesArr.join("");
        }

        document.getElementById(revPageViewSpacesListingId).innerHTML = revConnsListingsView;
    });

    return `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
            ${revPageHeader}
        </div>
        <div id="${revPageViewSpacesListingId}" class="revFlexContainer revConnectionsListingWidgetContainer"></div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
