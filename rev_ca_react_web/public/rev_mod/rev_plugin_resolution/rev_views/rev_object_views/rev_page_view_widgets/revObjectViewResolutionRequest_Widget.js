var revPageViewWidget = async (revVarArgs) => {
    let revResolutionContainerEntity = revVarArgs.revResolutionContainerEntity;
    let revResolutionEntity = revVarArgs.revResolutionEntity;

    let revResolutionRequestPublisher = revVarArgs.revResolutionRequestPublisher;
    let revResolutionRequestPublisherNames = window.revGetMetadataValue(revResolutionRequestPublisher._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

    /** REV START TAGS */
    let revResolutionRequestTagsArr = window.revGetMetadataValuesArr(revResolutionEntity._revEntityMetadataList, "rev_tag");

    let revPageViewListingTags = await window.revGetLoadedPageView("revPageViewListingTags", revResolutionRequestTagsArr);

    let revTagsView = "";

    if (revPageViewListingTags) {
        revTagsView = `<div class="revFlexWrapper revResolutionRequestTagsListWrapper">${revPageViewListingTags}</div>`;
    }
    /** REV END TAGS */

    /** REV START VIEWS STATS */
    let revResolutionRequestViewsCount = Number(window.revGetMetadataValue(revResolutionEntity._revEntityMetadataList, "rev_entity_views_count_stats_wrapper"));

    if (!revResolutionRequestViewsCount || revResolutionRequestViewsCount < 1) {
        revResolutionRequestViewsCount = 1;
    } else {
        revResolutionRequestViewsCount = revResolutionRequestViewsCount + 1;
    }

    let revViewsCountTxt = " viEws";

    if (revResolutionRequestViewsCount == 1) {
        revViewsCountTxt = " viEw";
    }
    /** REV END VIEWS STATS */

    /** REV START ANSWERS STATS */
    let revResolutionRequestAnswersCount = Number(window.revGetMetadataValue(revResolutionEntity._revEntityMetadataList, "rev_entity_answers_count_stats_wrapper"));

    if (!revResolutionRequestViewsCount || revResolutionRequestViewsCount < 1) {
        revResolutionRequestViewsCount = 0;
    }

    let revAnswersCountTxt = " ANswERs";

    if (revResolutionRequestAnswersCount == 1) {
        revAnswersCountTxt = " ANswER";
    }
    /** REV END ANSWERS STATS */

    try {
        let revUpdateStatsURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "&rev_logged_in_entity_guid=" + window.REV_LOGGED_IN_ENTITY_GUID + "&rev_resolution_request_guid=" + revResolutionEntity._remoteRevEntityGUID + "&revPluginHookContextsRemoteArr=revHookRemoteContext_UpdateResolutionRequestViewsStats";

        window.revGetServerData_JSON_Async(revUpdateStatsURL);
    } catch (error) {
        console.log("ERR -> revObjectViewResolutionRequestWidget.js -> !revData" + error);
    }

    /** REV START UPDATE ResolutionRequest STATS */
    if (window.revIsEmptyJSONObject(revResolutionContainerEntity._revInfoEntity)) {
        revResolutionContainerEntity["_revInfoEntity"] = window.revCloneJsObject(revResolutionContainerEntity);
    }

    if (!revResolutionContainerEntity._revInfoEntity) {
        return "ERR -> revObjectViewResolutionRequest_Widget.js -> !revResolutionContainerEntity._revInfoEntity";
    }

    let revContainerEntityInfo = revResolutionContainerEntity._revInfoEntity;

    let revContainerEntityName = window.revGetMetadataValue(revContainerEntityInfo._revEntityMetadataList, "rev_entity_name");
    let revContainerEntityDesc = window.revGetMetadataValue(revContainerEntityInfo._revEntityMetadataList, "rev_entity_desc_val_html");

    /** REV START RESOLUTION ENTITY VALS */
    if (window.revIsEmptyJSONObject(revResolutionEntity._revInfoEntity)) {
        revResolutionEntity["_revInfoEntity"] = revResolutionEntity;
    }

    if (!revResolutionEntity._revInfoEntity) {
        return "ERR -> revObjectViewResolutionRequest_Widget.js -> !revResolutionEntity._revInfoEntity";
    }

    let revResEntityInfo = revResolutionEntity._revInfoEntity;

    let revResEntityName = window.revGetMetadataValue(revResEntityInfo._revEntityMetadataList, "rev_entity_name");
    let revResEntityDesc = window.revGetMetadataValue(revResEntityInfo._revEntityMetadataList, "rev_entity_desc");
    /** REV END RESOLUTION ENTITY VALS */

    let revPicsAlbum = window.revGetEntityChildren_By_Subtype(revResEntityInfo._revEntityChildrenList, "rev_pics_album");
    let revVidsAlbum = window.revGetEntityChildren_By_Subtype(revResEntityInfo._revEntityChildrenList, "rev_vids_album");

    let revGetEntityMediaView = async () => {
        let revKiwiPicsAlbumOverrideView = "";
        let revKiwiVidsAlbumOverrideView = "";

        let revEntityMediaView = "";

        if (revPicsAlbum) {
            revPicsAlbum = revPicsAlbum[0];

            revKiwiPicsAlbumOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPicsAlbum);

            let revImagesCount = revPicsAlbum._revEntityChildrenList.length;

            if (revImagesCount > 13) {
                let revMoreTxt = "pics";

                if (revImagesCount < 14) revMoreTxt = l;

                let revImagesRemainder = `<div class="revImagesCount">+${revImagesCount - 13} moRE ${revMoreTxt}</div>`;
            }
        }

        if (revVidsAlbum) {
            revKiwiVidsAlbumOverrideView = await window.revGetLoadedOverrideView("revVideosListingOverrideView", revVidsAlbum);
            revVidsCount = revTimelineEntity._remoteRevEntityGUID + " : " + revVidsAlbum._revEntityChildrenList.length;
        }

        if (revKiwiPicsAlbumOverrideView || revKiwiPicsAlbumOverrideView) {
            revEntityMediaView = `
            <div class="revFlexContainer revResolutionRequestObjectMediaContainer">
                ${revKiwiPicsAlbumOverrideView}
                ${revKiwiVidsAlbumOverrideView}
            </div>
            `;
        }

        return revEntityMediaView;
    };

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    /** REV END HEADER AREA */

    let revNewMintConversations = () => {
        return `<div class="revFlexContainer"></div>`;
    };

    let revDividerWrapper = `
        <div class="revFlexWrapper revDividerWrapper">
            <div class="revSmall-H-Line"></div>
            <div class="revTiny-V-Line"></div>
            <div class="revSmall-H-Line"></div>
        </div>
    `;

    let revResolutionRequestAnswerForm = await window.revGetForm("revResolutionRequestAnswerForm", revResolutionEntity);

    let revResolutionRequestListingItemPublisherIcon_Id = "revResolutionRequestListingItemPublisherIcon_Id_" + window.revGenUniqueId();
    window.revLoadUserIcon(revResolutionRequestPublisher, revResolutionRequestListingItemPublisherIcon_Id);

    let revEditResolutionRequestTab_Id = "revEditResolutionRequestTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revEditResolutionRequestTab_Id, () => {
        document.getElementById(revEditResolutionRequestTab_Id).addEventListener("click", async (event) => {
            let revResolutionRequestForm = await window.revGetForm("revResolutionRequest", revResolutionEntity);
            window.revDrawMainContentArea({ "revData": revResolutionEntity, "revLoadedPageView": revResolutionRequestForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revResolutionRequestViewContainer = `
    <div class="revFlexContainer revObjectResolutionRequestItemContainer">
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">${revResEntityName}</div>
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexContainer revResolutionRequestObjectEntityDescContainer">
            ${revResEntityDesc}
        </div>
        ${await revGetEntityMediaView()}
        ${revTagsView}
        <div class="revFlexWrapper revObjectResolutionRequestListingItemStatsWrapper">
            <div class="revFlexWrapper revResolutionRequestListingItemAnswersCountWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeMedium">${revResolutionRequestAnswersCount}</div>
                <div class="revFontSiteGreyTxtColor revFontSizeSmall revResolutionRequestListingItemAnswersCountTxt">${revAnswersCountTxt}</div>
            </div>
            ${revDividerWrapper}
            <div class="revFlexWrapper revResolutionRequestListingItemViewsCountWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal">${revResolutionRequestViewsCount}</div>
                <div class="revFontSiteGreyTxtColor revFontSizeSmall revResolutionRequestListingItemViewsCountTxt">${revViewsCountTxt}</div>
            </div>
            ${revDividerWrapper}
            <div class="revFlexWrapper revResolutionRequestListingItemLikesCountWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeTiny"><i class="fas fa-arrow-up"></i></div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revResolutionRequestListingItemLikesCount">22</div>
            </div>
            ${revDividerWrapper}
            <div class="revFlexWrapper revResolutionRequestListingItemLastActiveWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revResolutionRequestListingItemLastActiveTimeTxt">LAsT active</div>
                <div class="revTimeCreatedStyle revResolutionRequestListingItemLastActiveTime">${window.revFormatLongDate(revResolutionEntity._revTimePublished)}</div>
            </div>
        </div>
        <div class="revFlexWrapper revResolutionRequestObjectOptionsWrapper">
            <div id="${revEditResolutionRequestTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revResolutionRequestObjectOption">EDiT</div>
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revResolutionRequestObjectOption">cLosE</div>
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revResolutionRequestObjectOption">sHARE</div>
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revResolutionRequestObjectOption">FLAG</div>
        </div>
        <div class="revFlexWrapper revObjectResolutionRequestListingItemPublisherInfoWrapper">
            <div class="revFlexWrapper revResolutionRequestByWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revResolutionRequestByPointerIcon"><i class="fas fa-level-up-alt revRotate90"></i></div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revResolutionRequestByTxt">By</div>
            </div>
            <div class="revSmall-H-Line revResolutionRequestListingItemPublisherInfoDivider"></div>
            <div id="${revResolutionRequestListingItemPublisherIcon_Id}" class="revTabLink revObjectResolutionRequestListingItemPublisherIcon"></div>
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revResolutionRequestListingItemPublisherNames">${revResolutionRequestPublisherNames}</div>
            <div class="revTimeCreatedStyle revResolutionRequestListingItemPubTime">${window.revFormatLongDate(revResolutionEntity._revTimePublished)}</div>
        </div>
        <div class="revFlexWrapper revObjectResolutionRequestAnswerFormWrapper">${revResolutionRequestAnswerForm}</div>
    </div>
    `;

    let revAnswersArr = [];

    try {
        let revURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "&rev_logged_in_entity_guid=" + window.REV_LOGGED_IN_ENTITY_GUID + "&rev_resolution_request_guid=" + revResolutionEntity._remoteRevEntityGUID + "&revPluginHookContextsRemoteArr=revHookRemoteContext_GetResolutionRequestAnswers";

        let revData = await window.revGetServerData_JSON_Async(revURL);
        let revResolutionRequestAnswersArr = revData.revResolutionRequestAnswersArr;

        for (let i = 0; i < revResolutionRequestAnswersArr.length; i++) {
            let revPassVarArgs = window.revCloneJsObject(revResolutionRequestAnswersArr[i]);
            revPassVarArgs["revAnswerEntityPublishersArr"] = revData.revEntityPublishersArr;

            let revObjectViewResolutionRequestAnswerItemListing = await window.revGetLoadedPageView("revObjectViewResolutionRequestAnswerItemListing", revPassVarArgs);

            revAnswersArr.push(revObjectViewResolutionRequestAnswerItemListing);
        }
    } catch (error) {
        console.log("ERR -> revObjectViewResolutionRequestWidget.js -> !revData" + error);
    }

    let revResolutionEntity_Id = "revResolutionEntity_Id_" + window.revGenUniqueId();

    window.revSetInterval(revResolutionEntity_Id, () => {
        document.getElementById(revResolutionEntity_Id).addEventListener("click", async (event) => {
            revVarArgs.revResolutionCallBack();
        });
    });

    let revResView = `
    <div class="revFlexContainer revPageRightBorderedContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">
                ${revPageViewPageNavHeader}
            </div>
            <div class="revFlexWrapper revPageHeaderResolutionRequestWrapper">
                <div class="revFlexWrapper revAddNewResolutionRequestHeaderWrapper">
                    <div class="revSmall-V-Line-1em"></div>
                    <div class="revSmall-H-Line"></div>
                    <div id="${revResolutionEntity_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revAddNewResolutionRequestTabWrapper">
                        <div class="revTiny-V-Line"></div>
                        <div class="revAddNewQuestionHeaderTabTxt">${window.revTruncateString(revContainerEntityName, 57)}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="revFlexContainer revFlexContainerScroll revObjectResolutionRequestsAskedContainer">
            ${revResolutionRequestViewContainer}
            <div class="revFlexContainer revFlexContainerScroll revObjectResolutionRequestAnswersContainer">${revAnswersArr.join("")}</div>
        </div>
    </div>
    `;

    return revResView;
};

module.exports.revPageViewWidget = revPageViewWidget;
