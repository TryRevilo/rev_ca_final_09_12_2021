var revPageViewWidget = async (revVarArgs) => {
    if (window.revIsEmptyVar(revVarArgs) || !revVarArgs._revInfoEntity || window.revIsEmptyVar(revVarArgs._revInfoEntity)) {
        return;
    }

    let revAcceptAnswerCallBacksArr = revVarArgs.revAcceptAnswerCallBacksArr;

    let revAnswerEntityGUID = revVarArgs._remoteRevEntityGUID;
    let revQuestionEntityGUID = revVarArgs._revEntityRemoteContainerGUID;
    let revAccptedAnswerEntityGUID = revVarArgs.revAccptedAnswerEntityGUID;

    let revIsAnswer = revAnswerEntityGUID == revAccptedAnswerEntityGUID;

    let revEntityInfo = revVarArgs._revInfoEntity;

    if (!revEntityInfo) {
        return "NULL INFO";
    }

    let revAnswerEntityPublishersArr = [];

    if (revVarArgs.revAnswerEntityPublishersArr) {
        revAnswerEntityPublishersArr = revAnswerEntityPublishersArr.concat(revVarArgs.revAnswerEntityPublishersArr);
    }

    let revAnswerPublisher = window.revGetPublisherEntity(revAnswerEntityPublishersArr, revVarArgs._revEntityOwnerGUID);

    if (!revAnswerPublisher) {
        return;
    }

    let revAnswerPublisherNames = window.revGetMetadataValue(revAnswerPublisher._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

    let revEntityDesc = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_desc_html");

    let revPicsAlbum = window.revGetEntityChildren_By_Subtype(revEntityInfo._revEntityChildrenList, "rev_pics_album");
    let revVidsAlbum = window.revGetEntityChildren_By_Subtype(revEntityInfo._revEntityChildrenList, "rev_vids_album");

    let revGetRevEntityMediaView = async () => {
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
            revVidsCount = revAnswerEntityGUID + " : " + revVidsAlbum._revEntityChildrenList.length;
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

    /** REV START COMMENT FORM */
    let revCommentFormInputArea_Id = "revCommentFormInputArea_Id_" + window.revGenUniqueId();
    let revNewCommentsView_Id = "revNewCommentsView_Id_" + window.revGenUniqueId();

    let revGetAnswerViewContainer = async () => {
        let revEntityCommentsChildrenSubtypesArr = window.revGetEntityChildren_By_Subtype(revVarArgs._revEntityChildrenList, "rev_comment");

        let revTotCommentsCount = 0;

        let revCommentsOverrideView = "";

        if (revEntityCommentsChildrenSubtypesArr) {
            if (revEntityCommentsChildrenSubtypesArr !== null && revEntityCommentsChildrenSubtypesArr.length > 0) {
                revTotCommentsCount = revEntityCommentsChildrenSubtypesArr.length;

                let revCommentsVarArgs = {
                    "revPublisherEntitiesArr": [revAnswerEntityPublishersArr],
                    "revCommentsArr": revEntityCommentsChildrenSubtypesArr,
                };

                revCommentsOverrideView = await window.revGetLoadedOverrideView("rev_comment", revCommentsVarArgs);

                if (!revCommentsOverrideView) revCommentsOverrideView = "";
            }
        }

        let revGetCommentForm = async () => {
            let revVarArgsCallback = async (revNewCommentEntity) => {
                window.revSetInterval(revNewCommentsView_Id, async () => {
                    let revCommentItemVarArgs = {
                        "revCommentItem": revNewCommentEntity,
                        "revPublisher": window.REV_LOGGED_IN_ENTITY,
                    };

                    let revLoadedPageView = await window.revGetLoadedPageView("revCommentListingObjectView", revCommentItemVarArgs);
                    if (!revLoadedPageView) return;

                    let revCommentChild = `<div class="revContainer revCommentOwnerBlock revCommentListStyle_No_Border">${revLoadedPageView}`;

                    document.getElementById(revNewCommentsView_Id).classList.add("revEntityCommentsContainer");
                    window.revAppendChildNodeAtBeginning(revNewCommentsView_Id, window.revStringToHTMLNode(revCommentChild));

                    if (document.getElementById(revCommentFormInputArea_Id)) {
                        document.getElementById(revCommentFormInputArea_Id).innerHTML = await revGetCommentForm();
                    }

                    let revCommentsCountId = "revCommentsCountId_" + window.revGenUniqueId();
                    let revCommentsCount = document.getElementById(revCommentsCountId).innerHTML;
                    revCommentsCount = window.revRemoveAllWhiteSpaces(revCommentsCount);

                    document.getElementById(revCommentsCountId).innerHTML = Number(revCommentsCount) + 1;
                });
            };

            return await window.revGetForm("rev_comment", { "revEntity": revVarArgs, "revVarArgsCallback": revVarArgsCallback });
        };

        let revDividerWrapper = `
            <div class="revFlexWrapper revDividerWrapper">
                <div class="revSmall-H-Line"></div>
                <div class="revTiny-V-Line"></div>
                <div class="revSmall-H-Line"></div>
            </div>
        `;

        let revAnswerListingItemPublisherIcon_Id = "revAnswerListingItemPublisherIcon_Id_" + window.revGenUniqueId();
        window.revLoadUserIcon(revAnswerPublisher, revAnswerListingItemPublisherIcon_Id);

        let revAnswerInfoHeader_Id = "revAnswerInfoHeader_Id_" + window.revGenUniqueId();

        let revRewindAnswer = (revNewAnswerEntityGUID) => {
            revIsAnswer = revAnswerEntityGUID == revNewAnswerEntityGUID;

            document.getElementById(revAnswerInfoHeader_Id).innerHTML = revGetAnswerDetailsHeader();
        };

        revVarArgs.revAcceptAnswerCallBacksArr.push(revRewindAnswer);

        let revGetAnswerDetailsHeader = () => {
            let revAnswerCheckStyle = `revAcceptAnswerTab`;
            let revAcceptAnswerTxtView = "";

            if (revIsAnswer) {
                revAnswerCheckStyle = revAnswerCheckStyle + " revAcceptedAnswerTab";
                revAcceptAnswerTxtView = `<div class="revAcceptAnswerTxtView">AccEpted</div>`;
            }

            let revAcceptAnswerTab_Id = "revAcceptAnswerTab_Id_" + window.revGenUniqueId();

            window.revSetInterval(revAcceptAnswerTab_Id, () => [
                document.getElementById(revAcceptAnswerTab_Id).addEventListener("click", async (event) => {
                    try {
                        let revPath = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${window.REV_LOGGED_IN_ENTITY_GUID}&rev_question_guid=${revQuestionEntityGUID}&rev_answer_guid=${revAnswerEntityGUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_AcceptQuestionAnswer`;

                        let revData = await window.revGetServerData_JSON_Async(revPath);

                        if (!window.revIsEmptyVar(revData.revQuestionViewsStats)) {
                            let revQuestionViewsStats = revData.revQuestionViewsStats;
                            let revNewAcceptedAnswerGUID = revQuestionViewsStats._metadataValue;

                            if (revNewAcceptedAnswerGUID == 0) {
                                revIsAnswer = false;
                            } else {
                                revIsAnswer = true;
                            }

                            document.getElementById(revAnswerInfoHeader_Id).innerHTML = revGetAnswerDetailsHeader();

                            for (i = 0; i < revAcceptAnswerCallBacksArr.length; i++) {
                                revAcceptAnswerCallBacksArr[i](revNewAcceptedAnswerGUID);
                            }
                        }
                    } catch (error) {
                        console.log("ERR -> revFormView_FamilyConnectionRequestsListing_Widget -> " + error);
                    }
                }),
            ]);

            return `
                <div id="${revAcceptAnswerTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeLarge ${revAnswerCheckStyle}"><i class="fas fa-check"></i></div>
                <div class="revFlexContainer revAnswerInfoHeaderDetailsContainer">
                    ${revAcceptAnswerTxtView}
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexContainer revAnserEntityDescContainer">${revEntityDesc}</div>
                </div>
            `;
        };

        let revAnswerViewContainer = `
        <div class="revFlexContainer revObjectAnswerListingItemContainer">
            <div id="${revAnswerInfoHeader_Id}" class="revFlexWrapper revAnswerInfoHeaderWrapper">${revGetAnswerDetailsHeader()}</div>
            ${await revGetRevEntityMediaView()}
            <div class="revFlexWrapper revQuestionListingItemStatsWrapper">
                <div class="revFlexWrapper revQuestionListingItemAnswersCountWrapper">
                    <div class="revFontSiteGreyTxtColor revFontSizeMedium">${revTotCommentsCount}</div>
                    <div class="revFontSiteGreyTxtColor revFontSizeSmall revQuestionListingItemAnswersCountTxt">commenTs</div>
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
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revQuestionObjectOption">EDiT</div>
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revQuestionObjectOption">dELEte</div>
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revQuestionObjectOption">sHARE</div>
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revQuestionObjectOption">FLAG</div>
            </div>
            <div class="revFlexWrapper revQuestionListingItemPublisherInfoWrapper">
                <div class="revFlexWrapper revQuestionByWrapper">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revQuestionByPointerIcon"><i class="fas fa-level-up-alt revRotate90"></i></div>
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revQuestionByTxt">By</div>
                </div>
                <div class="revSmall-H-Line revQuestionListingItemPublisherInfoDivider"></div>
                <div id="${revAnswerListingItemPublisherIcon_Id}" class="revTabLink revQuestionListingItemPublisherIcon"></div>
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revQuestionListingItemPublisherNames">${revAnswerPublisherNames}</div>
                <div class="revTimeCreatedStyle revQuestionListingItemPubTime">${window.revFormatLongDate(revVarArgs._revTimePublished)}</div>
            </div>
            <div id="${revCommentFormInputArea_Id}" class="revFlexContainer revQuestionCommentsContainer">${await revGetCommentForm()}</div>
            <div id="${revNewCommentsView_Id}" class="revFlexContainer revQuestionCommentsContainer"></div>
            <div class="revFlexContainer revQuestionCommentsContainer">${revCommentsOverrideView}</div>
        </div>
        `;

        return revAnswerViewContainer;
    };

    return await revGetAnswerViewContainer();
};

module.exports.revPageViewWidget = revPageViewWidget;
