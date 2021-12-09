var revPageViewWidget = async (revVarArgs) => {
    if (!window.REV_LOGGED_IN_ENTITY || window.REV_LOGGED_IN_ENTITY._remoteRevEntityGUID < 1) {
        return;
    }

    let revListingAllpopularSiteVideosPageHeader = window.revPageHeader("TrENDiNG viDEos");

    let revPageViewPageNavHeaderId = "revSpacePageViewPageNavHeaderId_" + window.revGenUniqueId();

    window.revSetInterval(revPageViewPageNavHeaderId, () => {
        window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSpaceType" } }, async (revLoadedPageView) => {
            document.getElementById(revPageViewPageNavHeaderId).innerHTML = revLoadedPageView;
        });
    });

    /** START REV DRAW */

    let revVidsAlbum = revVarArgs.revEntity;
    let revContainerEntity = revVarArgs._revContainerEntity;
    let revPublisher = revVarArgs.revPublisher;

    let revOwnerName = window.revGetMetadataValue(revPublisher._revEntityMetadataList, "rev_entity_full_names_value");

    let revKiwiVal = window.revGetMetadataValue(revContainerEntity._revEntityMetadataList, "rev_kiwi_value");

    if (!revKiwiVal) {
        return;
    }

    revKiwiVal = window.revGetQuillPlainText(revKiwiVal);

    let str = revKiwiVal;
    if (!str.replace(/\s/g, "").length) {
        revKiwiVal = "no description";
    }

    let revVideoDetailsText = window.revTruncateString(revKiwiVal, 455);

    let revUserIconPath = window.revGetEntityIcon(revPublisher);
    revUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revUserIconPath;

    let revVidPlayerId = "revVidPlayerId_" + window.revGenUniqueId();

    window.revSetInterval(revVidPlayerId, async () => {
        let revVidsOverrideView = await window.revGetLoadedOverrideView("revVideosListingOverrideView", revVidsAlbum);
        document.getElementById(revVidPlayerId).innerHTML = revVidsOverrideView;
    });

    let revPicsMediaWrapperId = "revContextSidebarTrendsPicsMediaWrapperId_" + window.revGenUniqueId() + "_" + window.revGenUniqueId();

    window.revSetInterval(revPicsMediaWrapperId, async () => {
        let revPicsAlbumsArr = window.revGetEntityChildren_By_Subtype(revContainerEntity._revEntityChildrenList, "rev_pics_album");

        if (Array.isArray(revPicsAlbumsArr)) {
            let revPicsOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPicsAlbumsArr[0]);

            if (revPicsOverrideView) document.getElementById(revPicsMediaWrapperId).innerHTML = `<div class="revFlexWrapper revPicsOverrideViewWrapper">${revPicsOverrideView}</div>`;
        }
    });

    /** REV START PUBLISHER USER ICON */
    let revUserIconID = "revPublisherIconStyle_" + window.revGenUniqueId();

    window.revSetInterval(revUserIconID, () => {
        let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

        if (!revLoggedInEntityGUID) {
            revLoggedInEntityGUID = -1;
        }

        document.getElementById(revUserIconID).addEventListener("click", () => {
            window.revLoadModules("revPluginModuleDownloadUserProfileData", (revScriptModule) => {
                window.revPluginModuleDownloadUserProfileData.revDownloadUserProfileData({ "revLoggedInEntityGUID": revLoggedInEntityGUID, "remoteRevEntityGUID": revPublisher._remoteRevEntityGUID }, async (revData) => {
                    if (!revData || !revData.revAds) return;

                    window.revAdsArr = revData.revAds;

                    let revLoadedPageView = "";

                    try {
                        revLoadedPageView = await window.revGetLoadedPageViewAreaContainer("revMainCenterScrollArea", revData, revLoadedPageView);
                        window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": "123" });
                    } catch (error) {
                        console.log("ERR revActivityKiwiOverrideViewWidget -> !revLoadedPageView" + error);
                    }
                });
            });
        });
    });
    /** REV START PUBLISHER USER ICON */

    let revVidDetailsContainerArea = `
            <div id="${revUserIconID}" class="revTabLink revFlexContainer revObjectTrendingItemDescIcon">
                <img class="revListingUserIconBlock" 
                src="${revUserIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
            </div>
            <div class="revFlexContainer revObjectTrendingItemDetailsContainer">
                <div class="revTrendingItemDesc">${revOwnerName}</div>
                <div class="revFontSiteGreyTxtColor revFontSizeSmall">1, 200 views</div>
            </div>
    `;
    let revInlineRightPoiterTxtFooterTxt = window.revInlineRightPoiterTxtSlim(revVidDetailsContainerArea);

    let revRetPageView = () => {
        return `
        <div class="revFlexContainer revTrendingVideoPostObjectContainer">
            <div id=${revVidPlayerId} class="revFlexContainer revVidObjectViewCaptionArea"></div>
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revWordWrap revFlexWrapper revVidObjectViewTtl">${revVideoDetailsText}</div>
            <div class="revFlexWrapper revTrendingItemDescWrapper">${revInlineRightPoiterTxtFooterTxt}</div>
            <div id="${revPicsMediaWrapperId}" class="revFlexContainer"></div>
        </div>
        `;
    };

    /** REV START COMMENTS */

    let revVarArgsCallback = async (revNewCommentEntity) => {
        // console.log('revNewCommentEntity :\n\t\t' + JSON.stringify(revNewCommentEntity));
    };

    let revCommentFormInputAreaId = "revTimelineCommentInputArea_" + window.revGenUniqueId();

    let revCommentForm = await window.revGetForm("rev_comment", { "revEntity": revContainerEntity, "revVarArgsCallback": revVarArgsCallback });

    window.revSetInterval(revCommentFormInputAreaId, () => {
        document.getElementById(revCommentFormInputAreaId).innerHTML = revCommentForm;
    });

    let revCommentChildrenContainerId = "revCommentChildrenContainerId_" + window.revGenUniqueId();

    let url = window.REV_SITE_BASE_PATH + "/rev_api/rev_get_container_children_by_guids?" + "&rev_container_guids=" + revContainerEntity._remoteRevEntityGUID + "&rev_entity_subtypes=rev_comment" + "&revPluginHookContextsRemoteArr=revHookRemoteReadContainerCommentsArr";

    let revDataComment;

    try {
        revDataComment = await window.revGetServerData_JSON_Async(url);

        let revCommentsVarArgs = {
            "revCommentsArr": revDataComment.filter,
            "revPublisherEntitiesArr": revDataComment.revPublisherEntitiesArr,
        };

        let revCommentsOverrideView = await window.revGetLoadedOverrideView("rev_comment", revCommentsVarArgs);

        window.revSetInterval(revCommentChildrenContainerId, async () => {
            if (!revCommentsOverrideView) revCommentsOverrideView = "";
            else document.getElementById(revCommentChildrenContainerId).innerHTML = revCommentsOverrideView;
        });
    } catch (error) {
        console.log("revObjectVideoViewWidget - ERR revComments Detail -> !revData" + error);
    }

    return `
        <div class="revFlexContainer revPluginsPageListingContainer">
            <div class="revFlexContainer revPageHeaderAreaContainer">
                ${revListingAllpopularSiteVideosPageHeader}
                <div id="${revPageViewPageNavHeaderId}" class="revFlexWrapper revPageViewTitledPageNavHeader"></div>
            </div>
            ${revRetPageView()}
            <div class="revFlexContainer revVidObjectCommentsContainer">
                <div id="${revCommentFormInputAreaId}" class="revFlexContainer revVidObjectCommentInputFormContainer"></div>
                <div id="${revCommentChildrenContainerId}" class="revFlexContainer revCommentChildrenContainer"></div>
            </div>
        </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
