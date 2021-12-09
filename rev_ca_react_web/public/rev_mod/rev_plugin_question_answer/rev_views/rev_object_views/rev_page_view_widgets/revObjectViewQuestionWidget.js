var revPageViewWidget = async (revVarArgs) => {
    let revQuestionPublisher = revVarArgs.revQuestionPublisher;
    let revQuestionPublisherNames = window.revGetMetadataValue(revQuestionPublisher._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");
    let revQuestionAnswerGUID = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_question_answer_guid");

    let revDelCount = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_question_delete_count");

    if (window.revIsEmptyVar(revDelCount)) {
        revDelCount = 0;
    }

    /** REV START TAGS */
    let revQuestionTagsArr = window.revGetMetadataValuesArr(revVarArgs._revEntityMetadataList, "rev_tag");

    let revPageViewListingTags = await window.revGetLoadedPageView("revPageViewListingTags", revQuestionTagsArr);

    let revTagsView = "";

    if (revPageViewListingTags) {
        revTagsView = `<div class="revFlexWrapper revQuestionTagsListWrapper">${revPageViewListingTags}</div>`;
    }
    /** REV END TAGS */

    /** REV START VIEWS STATS */
    let revQuestionViewsCount = Number(window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_entity_views_count_stats_wrapper"));

    if (!revQuestionViewsCount || revQuestionViewsCount < 1) {
        revQuestionViewsCount = 1;
    } else {
        revQuestionViewsCount = revQuestionViewsCount + 1;
    }

    let revViewsCountTxt = " viEws";

    if (revQuestionViewsCount == 1) {
        revViewsCountTxt = " viEw";
    }
    /** REV END VIEWS STATS */

    /** REV START ANSWERS STATS */
    let revQuestionAnswersCount = Number(window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_entity_answers_count_stats_wrapper"));

    if (!revQuestionViewsCount || revQuestionViewsCount < 1) {
        revQuestionViewsCount = 0;
    }

    let revAnswersCountTxt = " ANswERs";

    if (revQuestionAnswersCount == 1) {
        revAnswersCountTxt = " ANswER";
    }
    /** REV END ANSWERS STATS */

    try {
        let revUpdateStatsURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "&rev_logged_in_entity_guid=" + window.REV_LOGGED_IN_ENTITY_GUID + "&rev_question_guid=" + revVarArgs._remoteRevEntityGUID + "&revPluginHookContextsRemoteArr=revHookRemoteContext_UpdateQuestionViewsStats";

        window.revGetServerData_JSON_Async(revUpdateStatsURL);
    } catch (error) {
        console.log("ERR -> revObjectViewQuestionWidget.js -> !revData" + error);
    }

    /** REV START UPDATE QUESTION STATS */
    let revEntityInfo = revVarArgs._revInfoEntity;

    if (!revEntityInfo) {
        return "NULL INFO";
    }

    let revEntityName = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_name");
    let revEntityDesc = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_desc_html");

    let revPicsAlbum = window.revGetEntityChildren_By_Subtype(revEntityInfo._revEntityChildrenList, "rev_pics_album");
    let revVidsAlbum = window.revGetEntityChildren_By_Subtype(revEntityInfo._revEntityChildrenList, "rev_vids_album");

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
            <div class="revFlexContainer revQuestionObjectMediaContainer">
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

    let revQuestionAnswerForm = await window.revGetForm("revQuestionAnswer", revVarArgs);

    let revQuestionListingItemPublisherIcon_Id = "revQuestionListingItemPublisherIcon_Id_" + window.revGenUniqueId();
    window.revLoadUserIcon(revQuestionPublisher, revQuestionListingItemPublisherIcon_Id);

    let revEditQuestionTab_Id = "revEditQuestionTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revEditQuestionTab_Id, () => {
        document.getElementById(revEditQuestionTab_Id).addEventListener("click", async (event) => {
            let revQuestionForm = await window.revGetForm("revQuestion", revVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revQuestionForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revCloseQuestionTabWrapper_Id = "revCloseQuestionTabWrapper_Id_" + window.revGenUniqueId();

    let revGetCloseQuestionView = (revCloseCount) => {
        let revCloseQuestionTab_Id = "revCloseQuestionTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revCloseQuestionTab_Id, () => {
            document.getElementById(revCloseQuestionTab_Id).addEventListener("click", async () => {
                try {
                    let revURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "&rev_logged_in_entity_guid=" + window.REV_LOGGED_IN_ENTITY_GUID + "&rev_question_guid=" + revVarArgs._remoteRevEntityGUID + "&revPluginHookContextsRemoteArr=revHookRemoteHandler_DeleteQuestionAnnPers";

                    let revData = await window.revGetServerData_JSON_Async(revURL);

                    let revDelCount = 0;

                    if (revData.revDelCount) {
                        revDelCount = revData.revDelCount;
                    }

                    document.getElementById(revCloseQuestionTabWrapper_Id).innerHTML = revGetCloseQuestionView(revDelCount);
                } catch (error) {
                    console.log("ERR -> revObjectViewQuestionWidget.js -> !revData" + error);
                }
            });
        });

        if (revCloseCount == 0) {
            revCloseCount = "";
        }

        return `
            <div id="${revCloseQuestionTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revCloseQuestionTxt">cLosE</div>
            <div class="revTabLink revFontSiteRedTxtColor revFontSizeSmall revCloseQuestionCount">${revCloseCount}</div>
        `;
    };

    let revQuestionViewContainer = `
    <div class="revFlexContainer revObjectQuestionItemContainer">
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">${revEntityName}</div>
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexContainer revQuestionObjectEntityDescContainer">
            ${revEntityDesc}
        </div>
        ${await revGetEntityMediaView()}
        ${revTagsView}
        <div class="revFlexWrapper revObjectQuestionListingItemStatsWrapper">
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
                <div class="revTimeCreatedStyle revQuestionListingItemLastActiveTime">${window.revFormatLongDate(revVarArgs._revTimePublished)}</div>
            </div>
        </div>
        <div class="revFlexWrapper revQuestionObjectOptionsWrapper">
            <div id="${revEditQuestionTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revQuestionObjectOption">EDiT</div>
            <div id="${revCloseQuestionTabWrapper_Id}" class="revFlexWrapper_WidthAuto revQuestionObjectOption">${revGetCloseQuestionView(revDelCount)}</div>
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revQuestionObjectOption">sHARE</div>
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revQuestionObjectOption">FLAG</div>
        </div>
        <div class="revFlexWrapper revObjectQuestionListingItemPublisherInfoWrapper">
            <div class="revFlexWrapper revQuestionByWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revQuestionByPointerIcon"><i class="fas fa-level-up-alt revRotate90"></i></div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revQuestionByTxt">By</div>
            </div>
            <div class="revSmall-H-Line revQuestionListingItemPublisherInfoDivider"></div>
            <div id="${revQuestionListingItemPublisherIcon_Id}" class="revTabLink revObjectQuestionListingItemPublisherIcon"></div>
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revQuestionListingItemPublisherNames">${revQuestionPublisherNames}</div>
            <div class="revTimeCreatedStyle revQuestionListingItemPubTime">${window.revFormatLongDate(revVarArgs._revTimePublished)}</div>
        </div>
        <div class="revFlexWrapper revObjectQuestionAnswerFormWrapper">${revQuestionAnswerForm}</div>
    </div>
    `;

    let revAnswersArr = [];

    let revAcceptAnswerCallBacksArr = [];

    try {
        let revURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "&rev_logged_in_entity_guid=" + window.REV_LOGGED_IN_ENTITY_GUID + "&rev_question_guid=" + revVarArgs._remoteRevEntityGUID + "&revPluginHookContextsRemoteArr=revHookRemoteContext_GetSiteAnswers";

        let revData = await window.revGetServerData_JSON_Async(revURL);
        let revQuestionAnswersArr = revData.revQuestionAnswersArr;

        for (let i = 0; i < revQuestionAnswersArr.length; i++) {
            let revCurrQuestionAnswer = revQuestionAnswersArr[i];

            let revPassVarArgs = window.revCloneJsObject(revCurrQuestionAnswer);
            revPassVarArgs["revAnswerEntityPublishersArr"] = revData.revEntityPublishersArr;
            revPassVarArgs["revAccptedAnswerEntityGUID"] = revQuestionAnswerGUID;
            revPassVarArgs["revAcceptAnswerCallBacksArr"] = revAcceptAnswerCallBacksArr;

            let revObjectViewAnswerItemListing = await window.revGetLoadedPageView("revObjectViewAnswerItemListing", revPassVarArgs);

            revAnswersArr.push(revObjectViewAnswerItemListing);
        }
    } catch (error) {
        console.log("ERR -> revObjectViewQuestionWidget.js -> !revData" + error);
    }

    let revAddNewQuestionHeaderTab_Id = "revAddNewQuestionHeaderTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAddNewQuestionHeaderTab_Id, () => {
        document.getElementById(revAddNewQuestionHeaderTab_Id).addEventListener("click", async (event) => {
            let revQuestionForm = await window.revGetForm("revQuestion", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revQuestionForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revAdView = `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">
                ${revPageViewPageNavHeader}
            </div>
            <div class="revFlexWrapper revPageHeaderQuestionWrapper">
                <div class="revFlexWrapper revAddNewQuestionHeaderWrapper">
                    <div class="revSmall-V-Line-1em"></div>
                    <div class="revSmall-H-Line"></div>
                    <div id="${revAddNewQuestionHeaderTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revAddNewQuestionTabWrapper">
                        <div class="revAddNewQuestionHeaderTabIcon"><i class="fa fa-plus"></i></div>
                        <div class="revAddNewQuestionHeaderTabTxt">Ask A QuEsTioN</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="revFlexContainer revFlexContainerScroll revObjectQuestionsAskedContainer">
            ${revQuestionViewContainer}
            <div class="revFlexContainer revFlexContainerScroll revObjectQuestionAnswersContainer">${revAnswersArr.join("")}</div>
        </div>
    </div>
    `;

    return revAdView;
};

module.exports.revPageViewWidget = revPageViewWidget;
