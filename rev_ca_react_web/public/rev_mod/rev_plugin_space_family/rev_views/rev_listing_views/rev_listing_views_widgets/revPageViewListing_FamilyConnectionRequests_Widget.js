var revPageViewWidget = async (revVarArgs) => {
    let revFormView_FamilyConnectionRequestsListing = "";

    try {
        let revPassVarArgs = window.revCloneJsObject(revVarArgs);
        revPassVarArgs["revActionCallbackAction"] = async (revParamsVarArgs) => {
            let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;
            let revNoticiaEntityGUID = revParamsVarArgs.revNoticiaEntityGUID;

            let revPersRelsData = {};
            revPersRelsData["revLoggedInEntityGUID"] = revLoggedInEntityGUID;
            revPersRelsData["revFamilyRelativeEntityGUID"] = revNoticiaEntityGUID;

            if (revLoggedInEntityGUID !== revNoticiaEntityGUID && revLoggedInEntityGUID > 0 && revNoticiaEntityGUID > 0) {
                let revURL = window.REV_SITE_BASE_PATH + "/rev_base_api_post?revPluginHookContextsRemoteArr=revHookRemoteHandler_Create_Update_Del_FamilyRel";

                window.revPostServerData(revURL, revPersRelsData, (revRetRelData) => {
                    let revResolveStatus = revRetRelData.revResolveStatus;

                    if (revResolveStatus > 0) {
                        let revFamilyReqConnListing_Id = revParamsVarArgs.revFamilyReqConnListing_Id;

                        window.revSetInterval(revFamilyReqConnListing_Id, () => {
                            document.getElementById(revFamilyReqConnListing_Id).remove();
                        });
                    }
                });
            }
        };

        revFormView_FamilyConnectionRequestsListing = await window.revGetForm("revFormView_FamilyConnectionRequestsListing", revPassVarArgs);
    } catch (error) {
        console.log("error -> revPageViewListingSpaceInvitationsWidget.js -> revFormView_FamilyConnectionRequestsListing -> " + error);
    }

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader("FamiLy connEcTion rEQuEsTs");
    /** REV END HEADER AREA */

    return `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
            ${revPageHeader}
        </div>
        <div class="revFlexContainer revEntitiesNoticiasDetailListingsContainer">${revFormView_FamilyConnectionRequestsListing}</div>
    </div>
`;
};

module.exports.revPageViewWidget = revPageViewWidget;
