var revPageViewWidget = async (revVarArgs) => {
    let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

    let revPageViewSpaceBriefInfoId = "revPageViewSpaceBriefInfoId_" + window.revGenUniqueId();

    window.revSetInterval(revPageViewSpaceBriefInfoId, async () => {
        await window.revGetLoadedPageView("revPageViewSpaceHeaderArea_Family", revVarArgs, async (revLoadedPageView) => {
            document.getElementById(revPageViewSpaceBriefInfoId).innerHTML = revLoadedPageView;
        });
    });

    let revFamilyKiwiArea_Id = "revFamilyKiwiArea_Id_" + window.revGenUniqueId();

    window.revSetInterval(revFamilyKiwiArea_Id, async () => {
        let revKiwiFormPassVarArgs = window.revCloneJsObject(revVarArgs);
        revKiwiFormPassVarArgs["revEntitySubType"] = "rev_family_kiwi";
        revKiwiFormPassVarArgs["revKiwiPromptText"] = "sHARE wiTH FAmiLy !";

        let revKiwiForm = await window.revGetForm("revFormViewComposeFamilyKiwi", revKiwiFormPassVarArgs);
        document.getElementById(revFamilyKiwiArea_Id).innerHTML = revKiwiForm;
    });

    /** START REV NOTICIAS CAL AREA */
    /** REV EVENTS */
    let revInlineEventsContext_Id = "revInlineEventsContext_Id_" + window.revGenUniqueId();

    let revVarArgsCalId = "revVarArgsCalId_" + window.revGenUniqueId();
    let revGetGenericFormTabId = "revGetGenericFormTabId_" + window.revGenUniqueId();

    window.revSetInterval(revGetGenericFormTabId, async () => {
        let revMenuItem = await window.revGetMenuItem("revMenuItemGenericAddEntitySubTypeTab", { "_revEntitySubType": "rev_calendar_event", "revId": revVarArgsCalId });
        document.getElementById(revGetGenericFormTabId).innerHTML = revMenuItem;
    });

    window.revSetInterval(revInlineEventsContext_Id, async () => {
        let revEventsViewsArr = [];

        for (let i = 0; i < 3; i++) {
            let revInlineNoticiasContext = await window.revDownloadContextView("revInlineNoticiasContext", "revInlineEventItem", null);

            if (revInlineNoticiasContext) {
                revEventsViewsArr.push(revInlineNoticiasContext);
            }
        }

        if (revEventsViewsArr.length > 0 || !window.revIsEmptyVar(revEventsViewsArr.join(""))) {
            document.getElementById(revInlineEventsContext_Id).innerHTML = `<div class="revFlexContainer revInlineNoticiasListContainer">${revEventsViewsArr.join("")}</div>`;
        } else {
            document.getElementById(revInlineEventsContext_Id).innerHTML = `<div class="revFontSiteGreyTxtColor revFontSizeNormal revEmptyNoticias">No events added . . .</div>`;
        }
    });

    let revNoticiasCalArea = `
        <div class="revFlexContainer revInlineNoticiasContainer">
            <div class="revFlexWrapper revInlineNoticiaHeaderWrapper">
                ${window.revSmallDividerWrapper_BorderRight()}
                <div class="revFontSiteBlueTxtColor revFontSizeMedium revNoticiaIcon"><i class="far fa-calendar-alt"></i></div>
                <div class="revMidSeparater"></div>
                <div id="${revGetGenericFormTabId}" class="revGetFormTab"></div>
                ${window.revSmallDividerWrapper_BorderLeft()}
            </div>
            <div id="${revInlineEventsContext_Id}" class="revFlexContainer"></div>
        </div>
        `;
    /** END REV NOTICIAS CAL AREA */

    /** START REV NOTICIAS ANNOUNCEMENTS AREA */
    let revVarArgsAnnId = "revVarArgsAnnId_" + window.revGenUniqueId();
    let revGetGenericFormTabId_Ann = "revGetGenericFormTabId_" + window.revGenUniqueId();

    window.revSetInterval(revGetGenericFormTabId_Ann, async () => {
        let revMenuItem = await window.revGetMenuItem("revMenuItemGenericAddEntitySubTypeTab", { "_revEntitySubType": "rev_calendar_event", "revId": revVarArgsAnnId });
        document.getElementById(revGetGenericFormTabId_Ann).innerHTML = revMenuItem;
    });

    let revInlineAnnouncementsContext_Id = "revInlineAnnouncementsContext_Id_" + window.revGenUniqueId();

    window.revSetInterval(revInlineAnnouncementsContext_Id, async () => {
        let revAnnouncementViewsArr = [];

        for (let i = 0; i < 3; i++) {
            let revInlineNoticiasContext = await window.revDownloadContextView("revInlineNoticiasContext", "revInlineAnnouncementItem", null);

            if (revInlineNoticiasContext) {
                revAnnouncementViewsArr.push(revInlineNoticiasContext);
            }
        }

        if (revAnnouncementViewsArr.length > 0 || !window.revIsEmptyVar(revAnnouncementViewsArr.join(""))) {
            document.getElementById(revInlineAnnouncementsContext_Id).innerHTML = `<div class="revFlexContainer revInlineNoticiasListAnnouncementsContainer">${revAnnouncementViewsArr.join("")}</div>`;
        } else {
            document.getElementById(revInlineAnnouncementsContext_Id).innerHTML = `<div class="revFontSiteGreyTxtColor revFontSizeNormal revEmptyNoticias">No Announcements . . .</div>`;
        }
    });

    let revNoticiasAnnArea = `
        <div class="revFlexContainer revInlineNoticiasContainer">
            <div class="revFlexWrapper revInlineNoticiaHeaderWrapper">
                ${window.revSmallDividerWrapper_BorderRight()}
                <div class="revFontSiteBlueTxtColor revFontSizeMedium revNoticiaIcon"><i class="fas fa-bullhorn"></i></div>
                <div class="revMidSeparater"></div>
                <div id="${revGetGenericFormTabId_Ann}" class="revGetFormTab"></div>
                ${window.revSmallDividerWrapper_BorderLeft()}
            </div>
            <div id="${revInlineAnnouncementsContext_Id}" class="revFlexContainer"></div>
        </div>
        `;
    /** END REV NOTICIAS ANNOUNCEMENTS AREA */
    let revEntityActivityContentArea_Id = "revEntityActivityContentAreaId_" + window.revGenUniqueId();

    window.revLoadModules("revPluginModuleDownloadUserProfileData", (revScriptModule) => {
        window.revPluginModuleDownloadUserProfileData.revDownloadUserProfileData({ "revLoggedInEntityGUID": revLoggedInEntityGUID, "remoteRevEntityGUID": revVarArgs._remoteRevEntityGUID }, (revData) => {
            if (revData.revAds) window.revAdsArr = revData.revAds;

            window.revSetInterval(revEntityActivityContentArea_Id, () => {
                window.revGetLoadedPageViewAreaContainer("revPageViewTimeline", revData, (_revView) => {
                    document.getElementById(revEntityActivityContentArea_Id).innerHTML = _revView;
                });
            });
        });
    });

    /** REV START PROFILE PICS */
    let revAccordionView = "";

    if (revVarArgs && revVarArgs._revInfoEntity && revVarArgs._revInfoEntity._revEntityChildrenList) {
        let revEntityInfoAlbum = window.revGetEntityChildren_By_Subtype(revVarArgs._revInfoEntity._revEntityChildrenList, "rev_pics_album");

        if (Array.isArray(revEntityInfoAlbum)) {
            revEntityInfoAlbum = revEntityInfoAlbum[0];

            if (revEntityInfoAlbum) {
                let revImagesListArr = [];

                for (let i = 0; i < revEntityInfoAlbum._revEntityChildrenList.length; i++) {
                    let revEntityPicFile = revEntityInfoAlbum._revEntityChildrenList[i];

                    let revRemotePath = window.revGetMetadataValue(revEntityPicFile._revEntityMetadataList, "rev_remote_file_name");

                    if (!revRemotePath) {
                        continue;
                    }

                    revRemotePath = REV_UPLOAD_FILES_DIR_PATH + "/" + revRemotePath;

                    let revImageItemId = "revImageItemId_" + window.revGenUniqueId();

                    let revImg = `<img id="${revImageItemId}" class="revAccordionImage" src="${revRemotePath}" onerror="null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;
                    let revAccordListItem = `<li>${revImg}</li>`;

                    revImagesListArr.push(revAccordListItem);
                }

                let revAccordionView_Id = "revAccordionView_Id_" + window.revGenUniqueId();

                window.revSetInterval(revAccordionView_Id, () => {
                    $(".accordion").accordion(revEntityInfoAlbum._revEntityChildrenList.length);
                });

                revAccordionView = `<div id="${revAccordionView_Id}" class="accordion revFlexWrapper revAccordionWrapper">${revImagesListArr.join("")}</div>`;
            }
        }
    }
    /** REV END PROFILE PICS */

    /** REV START FAMILY POSTS */
    let revFamilyKiwiData;

    try {
        let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${revLoggedInEntityGUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_readFamilyKiwi`;

        revFamilyKiwiData = await window.revGetServerData_JSON_Async(revURL);
    } catch (error) {
        console.log("ERR -> revPageViewTimelineWidget.js -> !revData" + error);
    }

    let revFamilyKiwiArr = revFamilyKiwiData.revFamilyKiwiArr;
    let revEntityPublishersArr = revFamilyKiwiData.revEntityPublishersArr;

    let revTranslationsPublishedListingArr = [];

    for (let i = 0; i < revFamilyKiwiArr.length; i++) {
        let revCurrFamilyKiwi = revFamilyKiwiArr[i];

        let revCurrFamilyKiwiOverrideView = await window.revGetLoadedOverrideView("rev_family_kiwi", {
            "revEntity": revCurrFamilyKiwi,
            "revEntityPublishersArr": [window.revGetRevEntity_FROM_ARR_BY_GUID(revEntityPublishersArr, revCurrFamilyKiwi._revEntityOwnerGUID)],
        });

        revTranslationsPublishedListingArr.push(revCurrFamilyKiwiOverrideView);
    }

    let revAllMintMessagesTab_Id = "revAllMintMessagesTab_Id_" + window.revGenUniqueId();

    /** REV START ABOUT MINTS HELP TAB */
    let revAboutMintsTaggedHelpTab_Id = "revAboutMintsTaggedHelpTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAboutMintsTaggedHelpTab_Id, () => {
        document.getElementById(revAboutMintsTaggedHelpTab_Id).addEventListener("click", async (event) => {
            let revListingViewHelpTagTopics = await window.revGetLoadedPageView("revListingViewHelpTagTopics", { "revTagsArr": ["mint_conversations"], "revEntitySubTypesArr": ["rev_question"], "revServiceDescription": "miNT coNvERsATioNs" });
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revListingViewHelpTagTopics, "revFloatingOptionsMenuName": "123" });
        });
    });
    /** REV END ABOUT MINTS HELP TAB */

    let revRecentFamilyPostsViewContainer = `
            <div class="revFlexContainer revRecentFamilyPostsContainer">
                <div class="revFlexWrapper revRecentFamilyPostsPublishersWrapper">
                    <div id="${revAllMintMessagesTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revRecentFamilyPostsPublisherFormHeaderTabWrapper">+22 rEcENTly shAred with FAmiLy</div>
                    <div id="${revAboutMintsTaggedHelpTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revAbtFamilyFormTab">FAmiLy<i class="fas fa-question"></i></div>
                    <div class="revSmall-H-Line"></div>
                </div>
                <div class="revFlexContainer revRecentFamilyPostsSpaceActivityContainer">${revTranslationsPublishedListingArr.join("")}</div>
            </div>
        `;
    /** REV END FAMILY POSTS */

    return `
        <div class="revFlexContainer">
            <div id="${revPageViewSpaceBriefInfoId}" class="revFlexWrapper"></div>
            <div class="revFlexContainer revSpaceNoticiasContainer">
                ${revNoticiasCalArea}
                <div class="revFlexWrapper revLong_H_Rule"></div>
                ${revNoticiasAnnArea}
            </div>
            ${revAccordionView}
            <div id="${revFamilyKiwiArea_Id}" class="revFamilySpaceKiwiAreaWrapper"></div>
            <div class="revFlexContainer">${revRecentFamilyPostsViewContainer}</div>
        </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
