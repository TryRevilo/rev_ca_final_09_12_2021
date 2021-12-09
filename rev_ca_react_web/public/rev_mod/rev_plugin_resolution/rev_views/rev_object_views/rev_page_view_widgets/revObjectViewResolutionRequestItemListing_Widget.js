var revPageViewWidget = async (revVarArgs) => {
    let revResolutionContainerEntity = revVarArgs.revResolutionContainerEntity;
    let revResolutionEntity = revVarArgs.revResolutionEntity;

    let revResolutionRequestPublisher = revVarArgs.revResolutionRequestPublisher;
    let revResolutionRequestPublisherNames = window.revGetMetadataValue(revResolutionRequestPublisher._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

    if (!revResolutionEntity._revInfoEntity) {
        return "ERR -> revObjectViewResolutionRequestItemListing_Widget.js -> !revResolutionEntity._revInfoEntity";
    }

    let revEntityInfo = revResolutionEntity._revInfoEntity;

    /** REV START TAGS */
    let revQuestionTagsArr = window.revGetMetadataValuesArr(revResolutionEntity._revEntityMetadataList, "rev_tag");

    let revPageViewListingTags = await window.revGetLoadedPageView("revPageViewListingTags", revQuestionTagsArr);

    let revTagsView = "";

    if (revPageViewListingTags) {
        revTagsView = `<div class="revFlexWrapper revQuestionItemTagsListWrapper">${revPageViewListingTags}</div>`;
    }
    /** REV START TAGS */

    /** REV START VIEWS STATS */
    let revQuestionViewsCount = Number(window.revGetMetadataValue(revResolutionEntity._revEntityMetadataList, "rev_entity_views_count_stats_wrapper"));

    if (!revQuestionViewsCount || revQuestionViewsCount < 1) {
        revQuestionViewsCount = 0;
    }

    let revViewsCountTxt = " viEws";

    if (revQuestionViewsCount == 1) {
        revViewsCountTxt = " viEw";
    }
    /** REV END VIEWS STATS */

    /** REV START ANSWERS STATS */
    let revQuestionAnswersCount = Number(window.revGetMetadataValue(revResolutionEntity._revEntityMetadataList, "rev_entity_answers_count_stats_wrapper"));

    if (!revQuestionViewsCount || revQuestionViewsCount < 1) {
        revQuestionViewsCount = 0;
    }

    let revAnswersCountTxt = " ANswERs";

    if (revQuestionAnswersCount == 1) {
        revAnswersCountTxt = " ANswER";
    }
    /** REV END ANSWERS STATS */

    let revEntityName = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_name");
    revEntityName = window.revTruncateString(revEntityName, 77);

    let revPicsAlbum = window.revGetEntityChildren_By_Subtype(revEntityInfo._revEntityChildrenList, "rev_pics_album");
    let revVidsAlbum = window.revGetEntityChildren_By_Subtype(revEntityInfo._revEntityChildrenList, "rev_vids_album");

    let revGetEntityMediaView = async () => {
        let revKiwiPicsAlbumOverrideView = "";
        let revKiwiVidsAlbumOverrideView = "";

        let revEntityMediaView = "";

        if (revPicsAlbum) {
            revPicsAlbum = revPicsAlbum[0];

            let revPassVarArgsPicsAlbum = window.revCloneJsObject(revPicsAlbum);
            revPassVarArgsPicsAlbum["revAlbumPicsSize"] = "revListingUserIconBlock revImageItemStyle_Tiny";

            revKiwiPicsAlbumOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPassVarArgsPicsAlbum);

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
            <div class="revFlexContainer revQuestionObjectMediaContainer">
                ${revKiwiPicsAlbumOverrideView}
                ${revKiwiVidsAlbumOverrideView}
            </div>
            `;
        }

        return revEntityMediaView;
    };

    let revQuestionListingItem_Id = "revQuestionListingItem_Id_" + window.revGenUniqueId();

    window.revSetInterval(revQuestionListingItem_Id, () => {
        document.getElementById(revQuestionListingItem_Id).addEventListener("click", async (event) => {
            let revObjectViewResolutionRequest = await window.revGetLoadedPageView("revObjectViewResolutionRequest", revVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revObjectViewResolutionRequest, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revDividerWrapper = `
        <div class="revFlexWrapper revDividerWrapper">
            <div class="revSmall-H-Line"></div>
            <div class="revTiny-V-Line"></div>
            <div class="revSmall-H-Line"></div>
        </div>
    `;

    let revQuestionListingItemPublisherIcon_Id = "revQuestionListingItemPublisherIcon_Id_" + window.revGenUniqueId();
    window.revLoadUserIcon(revResolutionRequestPublisher, revQuestionListingItemPublisherIcon_Id);

    return `
    <div class="revFlexContainer revQuestionItemContainer">
        <div class="revFlexWrapper">
            <div class="revFontSiteGreyTxtColor revFontSizeLarge"><i class="fas fa-people-carry"></i></i></div>
            <div id="${revQuestionListingItem_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revQuestionListingItemNameHeaderWrapper">${revEntityName}</div>
        </div>
        ${revTagsView}
        ${await revGetEntityMediaView()}
        <div class="revFlexWrapper revQuestionListingItemStatsWrapper">
            <div class="revFlexWrapper revQuestionListingItemAnswersCountWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeMedium">${revQuestionAnswersCount}</div>
                <div class="revFontSiteGreyTxtColor revFontSizeSmall revQuestionListingItemAnswersCountTxt">${revAnswersCountTxt}</div>
            </div>
            ${revDividerWrapper}
            <div class="revFlexWrapper revQuestionListingItemViewsCountWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal">${revQuestionViewsCount}</div>
                <div class="revFontSiteGreyTxtColor revFontSizeSmall revQuestionListingItemViewsCountTxt">${revViewsCountTxt}</div>
            </div>
            ${revDividerWrapper}
            <div class="revFlexWrapper revQuestionListingItemLikesCountWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeTiny"><i class="fas fa-arrow-up"></i></div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revQuestionListingItemLikesCount">22</div>
            </div>
            ${revDividerWrapper}
            <div class="revFlexWrapper revQuestionListingItemLastActiveWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revQuestionListingItemLastActiveTimeTxt">LAsT active</div>
                <div class="revTimeCreatedStyle revQuestionListingItemLastActiveTime">${window.revFormatLongDate(revResolutionEntity._revTimePublished)}</div>
            </div>
        </div>
        <div class="revFlexWrapper revQuestionListingItemPublisherInfoWrapper">
            <div class="revFlexWrapper revQuestionByWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revQuestionByPointerIcon"><i class="fas fa-level-up-alt revRotate90"></i></div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revQuestionByTxt">By</div>
            </div>
            <div class="revSmall-H-Line revQuestionListingItemPublisherInfoDivider"></div>
            <div id="${revQuestionListingItemPublisherIcon_Id}" class="revTabLink revQuestionListingItemPublisherIcon"></div>
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revQuestionListingItemPublisherNames">${revResolutionRequestPublisherNames}</div>
            <div class="revTimeCreatedStyle revQuestionListingItemPubTime">${window.revFormatLongDate(revResolutionEntity._revTimePublished)}</div>
        </div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
