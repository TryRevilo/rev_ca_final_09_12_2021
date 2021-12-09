var revPluginOverrideViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revEntity || !revVarArgs.revEntity._remoteRevEntityGUID) {
        console.log("ERR -> revActivityKiwiOverrideViewWidget -> (!revVarArgs || !revVarArgs.revEntity || !revVarArgs.revEntity._remoteRevEntityGUID");
        return;
    }

    let revTimelineEntity = revVarArgs.revEntity;

    if (!revTimelineEntity || revTimelineEntity._remoteRevEntityGUID < 1 || !revTimelineEntity._revEntityMetadataList || !revTimelineEntity._revEntityMetadataList.length) {
        return "KIWI ERR";
    }

    let revViewArea = "";

    if (revVarArgs.revViewArea) {
        revViewArea = revVarArgs.revViewArea;
    }

    let revIsMinView = revViewArea.localeCompare("rev_min") == 0;

    /** REV START PUBLISHER */
    if (!revVarArgs.revEntityPublishersArr) {
        let url = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revVarArgs.revEntity._revEntityOwnerGUID;

        let revData = await window.revGetServerData_JSON_Async(url);
        revData = revData.filter;
        revVarArgs["revEntityPublishersArr"] = revData;
    }

    let revEntityPublishersArr = revVarArgs.revEntityPublishersArr;

    let revPublisher = window.revGetPublisherEntity(revEntityPublishersArr, revTimelineEntity._revEntityOwnerGUID);

    if (!revPublisher || !revPublisher._remoteRevEntityGUID || !revPublisher._revInfoEntity || revPublisher._remoteRevEntityGUID < 1) {
        if (!revPublisher) {
            let revURLPublisher = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revTimelineEntity._revEntityOwnerGUID;

            try {
                let revDataPublisher = await window.revGetServerData_JSON_Async(revURLPublisher);
                revPublisher = revDataPublisher.filter;
                revPublisher = revPublisher[0];
            } catch (error) {
                console.log("ERR -> revPageViewTimelineWidget.js -> revPublisher -> " + error);
            }
        }

        if (!revPublisher || !revPublisher._remoteRevEntityGUID || !revPublisher._revInfoEntity || revPublisher._remoteRevEntityGUID < 1) {
            console.log("!revPublisher || !revPublisher._remoteRevEntityGUID || !revPublisher._revInfoEntity || revPublisher._remoteRevEntityGUID < 1");
            return;
        }
    }

    let revPublisherInfo = revPublisher._revInfoEntity;

    let revOwnerName = window.revGetMetadataValue(revPublisherInfo._revEntityMetadataList, "rev_entity_full_names_value");
    let revOwnerNameTrim = revOwnerName.replace(/\s+/g, "");

    if (!revOwnerNameTrim) {
        return;
    }
    /** REV END PUBLISHER */

    let revPretty_Id = "revPretty_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPretty_Id, () => {
        prettyPrint();
    });

    let revKiwiVal = revTimelineEntity._revEntityMetadataList[0]._metadataValue;
    revKiwiVal = revKiwiVal.replaceAll(`<pre class="ql-syntax" spellcheck="false">`, `<pre id="${revPretty_Id}" class="ql-syntax prettyprint" spellcheck="false">`);

    if (!revKiwiVal) {
        return;
    }

    let revKiwiValTrim = revKiwiVal.replace(/\s+/g, "");

    if (revKiwiValTrim.length <= 3) {
        return;
    }

    let revTagsArr = window.revGetMetadataValuesArr(revTimelineEntity._revInfoEntity._revEntityMetadataList, "rev_tag");

    let revPageViewListingTags = "";

    if (revTagsArr.length > 0) {
        revPageViewListingTags = await window.revGetLoadedPageView("revPageViewListingTags", revTagsArr);
        revPageViewListingTags = `<div class="revFlexWrapper revKiwiItemTagsListWrapper">${revPageViewListingTags}</div>`;
    }

    let revTimelineEntityChilds = revTimelineEntity._revEntityChildrenList;

    let relPicsAlbum = window.revGetEntityChildren_By_Subtype(revTimelineEntityChilds, "rev_pics_album", 1);

    if (window.revIsEmptyVar(relPicsAlbum)) {
        relPicsAlbum = window.revGetEntityChildren_By_Subtype(revTimelineEntity._revInfoEntity._revEntityChildrenList, "rev_pics_album", 1);
    }

    let revVidsAlbum = window.revGetEntityChildren_By_Subtype(revTimelineEntityChilds, "rev_vids_album", 1);

    if (window.revIsEmptyVar(revVidsAlbum)) {
        revVidsAlbum = window.revGetEntityChildren_By_Subtype(revTimelineEntity._revInfoEntity._revEntityChildrenList, "rev_vids_album", 1);
    }

    let revGetMediaKiwiView = async () => {
        let revKiwiPicsAlbumOverrideView = "";
        let revKiwiVidsAlbumOverrideView = "";

        let revMediaKiwiView = "";

        let revImagesRemainder = "";

        if (relPicsAlbum) {
            revKiwiPicsAlbumOverrideView = await window.revGetLoadedOverrideView("rev_photo", relPicsAlbum);

            let revImagesCount = relPicsAlbum._revEntityChildrenList.length;

            if (revImagesCount > 13) {
                revImagesRemainder = `<div class="revImagesCount">+${revImagesCount - 13} moRE pics</div>`;
            }
        }

        if (revVidsAlbum) {
            revKiwiVidsAlbumOverrideView = await window.revGetLoadedOverrideView("revVideosListingOverrideView", revVidsAlbum);
        }

        if (revKiwiPicsAlbumOverrideView || revKiwiVidsAlbumOverrideView) {
            revMediaKiwiView = `
            <div class="revFlexContainer revMediaKiwi">
                ${revKiwiPicsAlbumOverrideView}
                ${revKiwiVidsAlbumOverrideView}
                ${revImagesRemainder}
            </div>
            `;
        }

        return revMediaKiwiView;
    };

    /** START REV LOAD MENU AREA ITEMS */
    let revMenuAreaKiwiItemListing = await window.revGetMenuAreaView("revMenuAreaKiwiItemListing", revTimelineEntity);
    /** END REV LOAD MENU AREA ITEMS */

    /** REV START PUBLISHER ICON */
    let revPublisherIcon_Id = "revPublisherIcon_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPublisherIcon_Id, () => {
        document.getElementById(revPublisherIcon_Id).addEventListener("click", function () {
            window.revUserIconClick(revPublisher._remoteRevEntityGUID);
        });

        window.revLoadUserIcon(revPublisher, revPublisherIcon_Id);
    });
    /** REV END PUBLISHER ICON */

    let revPublisherFullNamesTab_Id = "revPublisherFullNamesTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPublisherFullNamesTab_Id, () => {
        document.getElementById(revPublisherFullNamesTab_Id).addEventListener("click", (event) => {
            window.revUserIconClick(revPublisher._remoteRevEntityGUID);
        });
    });

    /** START REV LIKERS */
    let revLikersContainer_Id = "revLikersContainer_Id_" + window.revGenUniqueId();

    window.revSetInterval(revLikersContainer_Id, async () => {
        if (!revTimelineEntity._revEntityAnnotations || !revTimelineEntity._revEntityAnnotations.length || revTimelineEntity._revEntityAnnotations.length < 1) return;

        let revAnnsArr = revTimelineEntity._revEntityAnnotations;

        let revLikersGUIDs = [];

        for (let i = 0; i < revAnnsArr.length; i++) {
            let revLike = revAnnsArr[i];

            revLikersGUIDs.push(revLike._revRemoteOwnerEntityGUID);
        }

        let url = window.REV_SITE_BASE_PATH + "/rev_api/rev_get_flat_entity_info_wrapper?rev_items=" + revLikersGUIDs.join();

        let revData;

        try {
            revData = await window.revGetServerData_JSON_Async(url);
        } catch (error) {
            console.log("revActivityKiwiOverrideViewWidget -> revData.filter " + error);
        }

        if (!revData || !revData.filter || revData.filter.length < 1) {
            return;
        }

        revData = revData.filter;

        let revCountText = "Liked by ";

        if (revData.length > 1) {
            revCountText += "over " + revData.length;
        } else {
            let revLikerName = window.revGetMetadataValue(revData[0].revRetEntity._revEntityMetadataList, "rev_entity_full_names_value");

            if (revLikerName) {
                revCountText += `<span class="revLikerFullNames">${revLikerName.split(" ")[0]}</span>`;
            }
        }

        let revLikersItemsListDraw = () => {
            let revLikersViewsArr = [];

            for (let i = 0; i < revData.length; i++) {
                if (!revData[i] || !revData[i].revRetEntity || revData[i].revRetEntity._remoteRevEntityGUID < 1) {
                    continue;
                }

                let revConnEntity = revData[i].revRetEntity;

                let revLikerIconWrapper_Id = "revLikerIconWrapper_Id_" + window.revGenUniqueId();

                let revConnUserIconPath = window.revGetEntityIcon(revConnEntity);
                revConnUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revConnUserIconPath;

                if (revConnUserIconPath) {
                    revLikersViewsArr.push(
                        `
                        <div id="${revLikerIconWrapper_Id}" class="revTabLink connectionIcon">
                            <img class="revListingUserIconBlock" src="${revConnUserIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
                        </div>
                    `
                    );

                    window.revSetInterval(revLikerIconWrapper_Id, () => {
                        document.getElementById(revLikerIconWrapper_Id).addEventListener("click", function () {
                            window.revUserIconClick(revConnEntity._remoteRevEntityGUID);
                        });
                    });
                }
            }

            return revLikersViewsArr;
        };

        try {
            let revLikersWrapperViewsArr = revLikersItemsListDraw();

            if (revLikersWrapperViewsArr && revLikersWrapperViewsArr.length > 0) {
                document.getElementById(revLikersContainer_Id).innerHTML = `
                <div class="revFlexContainer">
                    <div class="revLikersCount">${revCountText}</div>
                    <div class="revFlexWrapper">${revLikersWrapperViewsArr.join("")}</div>
                </div>
                `;
            }
        } catch (error) {
            console.log("ERR -> revActivityKiwiOverrideViewWidget : " + error);
        }
    });

    /** END REV LIKERS */

    /** START REV COMMENTS */
    let revGetCommentsView = async () => {
        let revCommentsView = "";
        let revNewCommentsViewId = "revNewCommentsView_" + window.revGenUniqueId();

        if (!revIsMinView) {
            let revVarArgsCallback = async (revNewCommentEntity) => {
                window.revSetInterval(revNewCommentsViewId, async () => {
                    let revCommentItemVarArgs = {
                        "revCommentItem": revNewCommentEntity,
                        "revPublisher": window.REV_LOGGED_IN_ENTITY,
                    };

                    let revLoadedPageView = await window.revGetLoadedPageView("revCommentListingObjectView", revCommentItemVarArgs);

                    if (!revLoadedPageView) {
                        return;
                    }

                    let revCommentChild = `<div class="revContainer revCommentOwnerBlock revCommentListStyle_No_Border">${revLoadedPageView}`;

                    document.getElementById(revNewCommentsViewId).classList.add("revEntityCommentsContainer");
                    window.revAppendChildNodeAtBeginning(revNewCommentsViewId, window.revStringToHTMLNode(revCommentChild));

                    if (document.getElementById(revCommentFormInputAreaId)) document.getElementById(revCommentFormInputAreaId).innerHTML = "";

                    let revCommentsCountId = "revCommentsCountId_" + window.revGenUniqueId();
                    let revCommentsCount = document.getElementById(revCommentsCountId).innerHTML;
                    revCommentsCount = window.revRemoveAllWhiteSpaces(revCommentsCount);
                    document.getElementById(revCommentsCountId).innerHTML = Number(revCommentsCount) + 1;
                });
            };

            let revCommentForm = await window.revGetForm("rev_comment", { "revEntity": revTimelineEntity, "revVarArgsCallback": revVarArgsCallback });

            let revCommentsOverrideView = "";

            let revCommentFormInputAreaId = "revTimelineCommentInputArea_" + window.revGenUniqueId();

            window.revSetInterval(revCommentFormInputAreaId, () => {
                document.getElementById(revCommentFormInputAreaId).innerHTML = revCommentForm;
            });

            let revEntityCommentsChildrenSubtypesArr = window.revGetEntityChildren_By_Subtype(revTimelineEntity._revEntityChildrenList, "rev_comment");

            if (revEntityCommentsChildrenSubtypesArr !== null && revEntityCommentsChildrenSubtypesArr.length > 0) {
                let revCommentsVarArgs = {
                    "revPublisherEntitiesArr": revEntityPublishersArr,
                    "revCommentsArr": revEntityCommentsChildrenSubtypesArr,
                };

                revCommentsOverrideView = await window.revGetLoadedOverrideView("rev_comment", revCommentsVarArgs);

                if (!revCommentsOverrideView) revCommentsOverrideView = "";
            }

            let revMenuItemLikeMenuItem = await window.revGetMenuItem("revMenuItemLike", revTimelineEntity);

            let revShareTab_Id = "revShareTab_Id_" + window.revGenUniqueId();

            let revSelecetedEntitiesArr = [];

            let revImportedPhoneccts;

            if (revVarArgs.revImportedPhoneccts) {
                revImportedPhoneccts = revVarArgs.revImportedPhoneccts;

                console.log("revActivityKiwiOverrideViewWidget.js -> revVarArgs.revImportedPhoneccts : " + JSON.stringify(revImportedPhoneccts));
            }

            let revGetSelectableContactsFormView = async (revImportedPhoneccts) => {
                let revSelectableContactsCallback = (revSelectedArr) => {
                    revSelecetedEntitiesArr = revSelectedArr;
                };

                let revCommitShareTab_Id = "revCommitShareTab_Id_" + window.revGenUniqueId();

                window.revSetInterval(revCommitShareTab_Id, () => {
                    document.getElementById(revCommitShareTab_Id).addEventListener("click", (event) => {
                        window.revToggleSwitchArea(null);

                        let revRelFilter_Recommendations = { filter: [] };

                        for (let i = 0; i < revSelecetedEntitiesArr.length; i++) {
                            let revRel_Recommendation = window.REV_ENTITY_RELATIONSHIP_STRUCT();
                            revRel_Recommendation._revEntityRelationshipType = "rev_recommendation";
                            revRel_Recommendation._remoteRevEntityTargetGUID = revSelecetedEntitiesArr[i];
                            revRel_Recommendation._remoteRevEntitySubjectGUID = revVarArgs.revEntity._remoteRevEntityGUID;

                            revRelFilter_Recommendations.filter.push(revRel_Recommendation);
                        }

                        window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_RELATIONSHIP_URL, revRelFilter_Recommendations, (revData) => {
                            console.log(revSelecetedEntitiesArr.length + " : revData :\n\t\t" + JSON.stringify(revData));

                            let revNoticiasPopUpContainer = window.revGetNoticiasPopUpContainer(`
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revSentSuccessWrapper"><i class="fas fa-check"></i> Sent succEssFuLLy . . .</div>
                        `);

                            window.revTempShowElement(revNoticiasPopUpContainer, "revPageRightSectionContainerId", 4000);
                        });
                    });
                });

                let revSelectableContacts = await window.revGetForm("revSelectableContacts", { "revSelectableContactsCallback": revSelectableContactsCallback });

                let revSelectableContacts_Id = "revSelectableContacts_Id_" + window.revGenUniqueId();

                /** REV START IMPORT CONTACTS */
                let revPassVarArgs_ImporPhoneBooktCcts = window.revCloneJsObject(revVarArgs);

                let revImportPhoneBookContactsCallback = async (revImportedPhoneccts) => {
                    window.revToggleSwitchArea(null);

                    console.log("revImportedPhoneccts :\n" + JSON.stringify(revImportedPhoneccts));
                    window.revToggleSwitchArea(await revGetSelectableContactsFormView(revImportedPhoneccts));
                };

                let revPageContentAreaRendererCallback = (revCallbackHTML) => {
                    window.revSetInterval(revSelectableContacts_Id, () => {
                        document.getElementById(revSelectableCctsContainer_Id).innerHTML = revCallbackHTML;
                    });
                };

                revPassVarArgs_ImporPhoneBooktCcts["revImportPhoneBookContactsCallback"] = revImportPhoneBookContactsCallback;
                revPassVarArgs_ImporPhoneBooktCcts["revPageContentAreaRendererCallback"] = revPageContentAreaRendererCallback;
                revPassVarArgs_ImporPhoneBooktCcts["revImportedPhoneccts"] = revImportedPhoneccts;

                let revMenuAreaImportContacts = await window.revGetMenuAreaView("revMenuAreaImportContacts", revPassVarArgs_ImporPhoneBooktCcts);
                /** REV END IMPORT CONTACTS */

                let revSelectableCctsContainer_Id = "revSelectableCctsContainer_Id_" + window.revGenUniqueId();
                let revShareCancelTab_Id = "revShareCancelTab_Id_" + window.revGenUniqueId();

                window.revSetInterval(revShareCancelTab_Id, () => {
                    document.getElementById(revShareCancelTab_Id).addEventListener("click", (event) => {
                        window.revToggleSwitchArea();
                    });
                });

                let revSelectableContactsFormView = `
                <div id="${revSelectableCctsContainer_Id}" class="revFlexContainer revSelectableCctsContainer">
                    <div class="revFlexWrapper revShareHeaderAreaWrapper">
                        <div id="${revCommitShareTab_Id}" class="revTabLink revFlexWrapper revShareTabWrapper">
                            <div class="revSmalllBoldWhite revShareTabTxt">Share</div>
                            <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fa fa-arrow-right"></i></div>
                        </div>
                        <div id="${revShareCancelTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revShareCancelTab">cANcEL</div>
                        <div class="revImportccts">${revMenuAreaImportContacts}</div>
                    </div>
                    <div id="${revSelectableContacts_Id}" class="revFlexContainer revKiwiContactsContainer">
                        ${revSelectableContacts}
                    </div>
                </div>
            `;

                return revSelectableContactsFormView;
            };

            window.revSetInterval(revShareTab_Id, () => {
                document.getElementById(revShareTab_Id).addEventListener("click", async (event) => {
                    window.revToggleSwitchArea(await revGetSelectableContactsFormView());
                });
            });

            revCommentsView = `
            <div id="RevListingItemOptionsMenuArea" class="revItemOptionsMenuArea">
                ${revMenuAreaKiwiItemListing}
                ${revMenuItemLikeMenuItem}
                <span id="${revShareTab_Id}" class="revTabLink revItemOptionsIcon"><i class="fas fa-share-alt"></i></span>
                <span class="revItemOptionsIcon"><i class="far fa-bookmark"></i></span>
            </div>

            <div id="${revCommentFormInputAreaId}" class="revFlexContainer"></div>
            <div id="${revNewCommentsViewId}" class="revFlexContainer"></div>
            ${revCommentsOverrideView}
        `;
        }

        return revCommentsView;
    };
    /** END REV COMMENTS */

    let revListStyleMinView = "";

    if (revIsMinView) {
        revListStyleMinView = 'style="border-bottom: none;"';
    }

    let revKiwiDetailsContentView = async () => {
        return `
        <div class="revFlexWrapper revKiwiEntityDescriptionWrapper">
            <div class="revFontSizeMedium revQuoteIconStyle"><i class="fas fa-quote-left"></i></div>
            <div class="revKiwiEntityDescription">${window.revRemoveLineBreaks(revKiwiVal)}</div>
        </div>

        ${revPageViewListingTags}

        ${await revGetMediaKiwiView()}
        <div id="${revLikersContainer_Id}" class="revFlexContainer"></div>

        ${await revGetCommentsView()}
        `;
    };

    let revKiwiContentView = "";

    if (revVarArgs.revEntity && revVarArgs.revEntity.revVarArgsData && revVarArgs.revEntity.revVarArgsData.revFlagsArr) {
        let revFlagsArr = revVarArgs.revEntity.revVarArgsData.revFlagsArr;

        let revFlagsTagsString = "";

        for (let i = 0; i < revFlagsArr.length; i++) {
            let revFlag = revFlagsArr[i];
            revFlagsTagsString = revFlagsTagsString + window.revGetMetadataValue(revFlag._revEntityMetadataList, "rev_flags_arr");
        }

        let revTagsArr = revFlagsTagsString.split(",");

        let revPageViewListingTags = "";

        if (revFlagsArr.length > 0) {
            revPageViewListingTags = await window.revGetLoadedPageView("revPageViewListingTags", revTagsArr);
            revPageViewListingTags = `<div class="revFlexWrapper revKiwiItemTagsListWrapper">${revPageViewListingTags}</div>`;
        }

        let revRefferencesArr = ["https://mail.yahoo.com/d/folders/1", "http://localhost/phpmyadmin/sql.php?server=1&db=rev_c_a&table=REV_ENTITY_METADATA_TABLE&pos=0"];

        let revRefferencesTagsArr = [];

        for (let i = 0; i < revRefferencesArr.length; i++) {
            let revRefference = revRefferencesArr[i];

            if (!revRefference) {
                continue;
            }

            revRefference = window.revTruncateString(revRefference, 55);

            revRefferencesTagsArr.push(`
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revFlexWrapper revRefferenceTagItemWrapper">${revRefference}</div>
            `);
        }

        let revTagPublishersIconsArr = [];

        for (let i = 0; i < 4; i++) {
            revTagPublishersIconsArr.push(`
                <div class="revTagPublisherIcon"></div>
            `);
        }

        let revRemarksTxt = "On Linux or Mac OS X you can unzip ngrok from a terminal with the following command. On Windows, just double click ngrok.zip to extract it.";

        let revFalggedToggableContentTab_Id = "revFalggedToggableContentTab_Id_" + window.revGenUniqueId();
        let revFlaggedToggableContentContainer_Id = "revFlaggedToggableContentContainer_Id_" + window.revGenUniqueId();

        let revGetHideFlaggedToggableContentContainerTab = () => {
            let revHideFlaggedToggableContentContainerTab_Id = "revHideFlaggedToggableContentContainerTab_Id_" + window.revGenUniqueId();

            window.revSetInterval(revHideFlaggedToggableContentContainerTab_Id, () => {
                document.getElementById(revHideFlaggedToggableContentContainerTab_Id).addEventListener("click", (event) => {
                    document.getElementById(revFlaggedToggableContentContainer_Id).innerHTML = "";
                    document.getElementById(revFalggedToggableContentTab_Id).innerHTML = revGetContinueReadingFlaggedPostTab();
                });
            });

            return `
            <div id="${revHideFlaggedToggableContentContainerTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revContinueReadingFlaggedPostWrapper">
                <div class="revFontSizeNormal">HiDE</div>
                <div class="revContinueReadingFlaggedPostIcon"><i class="fas fa-long-arrow-alt-up revFontSizeLarge"></i></div>
            </div>
            `;
        };

        let revGetContinueReadingFlaggedPostTab = () => {
            let revContinueReadingFlaggedPostTab_Id = "revContinueReadingFlaggedPostTab_Id_" + window.revGenUniqueId();

            window.revSetInterval(revContinueReadingFlaggedPostTab_Id, () => {
                document.getElementById(revContinueReadingFlaggedPostTab_Id).addEventListener("click", async (event) => {
                    document.getElementById(revFlaggedToggableContentContainer_Id).innerHTML = await revKiwiDetailsContentView();
                    document.getElementById(revFalggedToggableContentTab_Id).innerHTML = revGetHideFlaggedToggableContentContainerTab();
                });
            });

            return `
            <div id="${revContinueReadingFlaggedPostTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revContinueReadingFlaggedPostWrapper">
                <div class="revFontSizeNormal">conNTiNuE READinG</div>
                <div class="revContinueReadingFlaggedPostIcon"><i class="fas fa-long-arrow-alt-down revFontSizeLarge"></i></div>
            </div>
            `;
        };

        revKiwiContentView = `
        <div class="revFlexContainer revFlaggedKiwiContainer">
            <div class="revFlexWrapper revFlaggedKiwiHeaderWrapper">
                <div class="revFontSiteGreyTxtColor revFontSizeNormal"><i class="far fa-flag"></i> This posT HAs BeEN FlagGed</div>
                <div class="revFlexWrapper revTagPublisherWrapper"><i class="fas fa-long-arrow-alt-right revFontSiteLightGreyTxtColor revFontSizeNormal"></i> ${revTagPublishersIconsArr.join("")}</div>
            </div>
            <div class="revFontSiteBlueTxtColor revFontSizeSmall revFlexWrapper revKiwiFlagTagsWrapper">
                <i class="fas fa-tags fa-2x revFontSizeNormal revRotate90"></i>
                &nbsp;&nbsp;${revPageViewListingTags}
            </div>
            <div class="revFontSiteGreyTxtColor revFontSizeSmall revFlexWrapper revRemarksWrapper">${revRemarksTxt}</div>
            <div class="revFlexContainer revRefferencesContainer">
                <div class="revFontSizeNormalHeader revRefferencesTtl">ReFFereNcEs</div>
                <div class="revFlexContainer revRefferencesLinksContainer">${revRefferencesTagsArr.join("")}</div>
            </div>
            <div id="${revFalggedToggableContentTab_Id}" class="revFlexWrapper">${revGetContinueReadingFlaggedPostTab()}</div>
            <div id="${revFlaggedToggableContentContainer_Id}" class="revFlexContainer revFlaggedToggableContentContainer"><div>
        </div>

        `;
    } else {
        revKiwiContentView = await revKiwiDetailsContentView();
    }

    let revPublisherIconWrapperStyle = "revKiwiPublisherIconWrapper";
    let revListCenterStyle = "revListCenterStyle";

    if (revIsMinView) {
        revPublisherIconWrapperStyle = "revKiwiPublisherIconWrapper_Min";
        revListCenterStyle = "revListCenterStyle_Min";
    }

    let revView = `
    <div class="revFlexWrapper revListStyleWrapper" ${revListStyleMinView}>
        <div id="${revPublisherIcon_Id}" class="revTabLink revFlexWrapper ${revPublisherIconWrapperStyle}"></div>
        <div class="revFlexContainer ${revListCenterStyle}">
            <div class="revFlexWrapper revPublicationOwner_Time">
                <span id="${revPublisherFullNamesTab_Id}" class="revTabLink revSmalllBoldBlue">${revOwnerName}</span>
                <span class="revTimeCreatedStyle">&nbsp;${window.revFormatLongDate(revTimelineEntity._revTimePublished)}</span>
            </div>
            <div class="revFlexContainer">${revKiwiContentView}</div>
        </div>
    </div>
    `;

    return revView;
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
