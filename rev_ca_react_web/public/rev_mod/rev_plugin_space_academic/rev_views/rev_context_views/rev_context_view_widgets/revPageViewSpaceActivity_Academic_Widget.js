var revPageViewWidget = async (revVarArgs) => {
    let revPageViewSpaceHeaderArea_Academic = await window.revGetLoadedPageView("revPageViewSpaceHeaderArea_Academic", revVarArgs);

    let revAcademicSpaceKiwiArea_Id = "revAcademicSpaceKiwiArea_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAcademicSpaceKiwiArea_Id, async () => {
        let revKiwiFormPassVarArgs = window.revCloneJsObject(revVarArgs);
        revKiwiFormPassVarArgs["revKiwiPromptText"] = "sAy somEthiNG oN tHis spAcE !";

        let revKiwiForm = await window.revGetForm("rev_kiwi", revKiwiFormPassVarArgs);
        document.getElementById(revAcademicSpaceKiwiArea_Id).innerHTML = revKiwiForm;
    });

    /** START REV NOTICIAS CAL AREA */

    /** START REV EVENTS */
    let revInlineEventsContext_Id = "revInlineEventsContext_Id_" + window.revGenUniqueId();

    let revGetGenericFormTabId = "revGetGenericFormTabId_" + window.revGenUniqueId();

    window.revSetInterval(revGetGenericFormTabId, async () => {
        let revVarArgsCalId = "revVarArgsCalId_" + window.revGenUniqueId();

        let revPassVarArgs = window.revCloneJsObject(revVarArgs);
        revPassVarArgs["revId"] = revVarArgsCalId;
        revPassVarArgs.revEntityFormSubType = "rev_calendar_event";

        let revMenuItem = await window.revGetMenuItem("revMenuItemGenericAddEntitySubTypeTab", revPassVarArgs);
        document.getElementById(revGetGenericFormTabId).innerHTML = revMenuItem;
    });

    window.revSetInterval(revInlineEventsContext_Id, async () => {
        let revEventsViewsArr = [];

        let url = window.REV_SITE_BASE_PATH + "/rev_api/rev_get_container_children_by_guids?" + "&rev_container_guids=" + revVarArgs._remoteRevEntityGUID + "&rev_entity_subtypes=rev_calendar_event";

        try {
            let revDataEvents = await window.revGetServerData_JSON_Async(url);
            let revRetFilterArr = revDataEvents.filter;

            for (let i = 0; i < revRetFilterArr.length; i++) {
                let revEventItemView = await window.revDownloadContextView("revInlineNoticiasContext", "revInlineEventItem", revRetFilterArr[i]);

                if (revEventItemView) revEventsViewsArr.push(revEventItemView);

                if (i >= 1) {
                    break;
                }
            }

            if (revEventsViewsArr.length > 0) {
                document.getElementById(revInlineEventsContext_Id).innerHTML = `<div class="revFlexContainer revInlineNoticiasListContainer">${revEventsViewsArr.join("")}</div>`;
            } else {
                document.getElementById(revInlineEventsContext_Id).innerHTML = `<div class="revFontSiteGreyTxtColor revFontSizeNormal revEmptyNoticias">No events added . . .</div>`;
            }
        } catch (error) {
            console.log("ERR revComments Detail -> !revData" + error);
        }
    });
    /** END REV EVENTS */

    /** START REV NOTICIAS CAL AREA */
    let revNoticiasCalArea = `
        <div class="revFlexContainer revInlineNoticiasContainer">
            <div class="revFlexWrapper revInlineNoticiaHeaderWrapper">
                ${window.revSmallDividerWrapper_BorderRight()}
                <div class="revFontSiteBlueTxtColor revFontSizeMedium revNoticiaIcon"><i class="far fa-calendar-alt"></i></div>
                <div class="revMidSeparater"></div>
                <div id="${revGetGenericFormTabId}" class="revGetFormTab"></div>
                ${window.revSmallDividerWrapper_BorderRight()}
            </div>
            <div id="${revInlineEventsContext_Id}"></div>
        </div>
        `;
    /** END REV NOTICIAS CAL AREA */

    /** START REV NOTICIAS ANNOUNCEMENTS AREA */
    let revGetGenericFormTabId_Ann = "revGetGenericFormTabId_" + window.revGenUniqueId();

    window.revSetInterval(revGetGenericFormTabId_Ann, async () => {
        let revVarArgsAnn_Id = "revVarArgsAnn_Id_" + window.revGenUniqueId();

        let revPassVarArgs = JSON.parse(JSON.stringify(revVarArgs));
        revPassVarArgs["revId"] = revVarArgsAnn_Id;
        revPassVarArgs._revEntitySubType = "rev_announcement";

        let revMenuItem = await window.revGetMenuItem("revMenuItemGenericAddEntitySubTypeTab", revPassVarArgs);
        document.getElementById(revGetGenericFormTabId_Ann).innerHTML = revMenuItem;
    });

    let revInlineAnnouncementsContext_Id = "revInlineAnnouncementsContext_Id_" + window.revGenUniqueId();

    window.revSetInterval(revInlineAnnouncementsContext_Id, async () => {
        let revAnnouncementViewsArr = [];

        let url = window.REV_SITE_BASE_PATH + "/rev_api/rev_get_container_children_by_guids?" + "&rev_container_guids=" + revVarArgs._remoteRevEntityGUID + "&rev_entity_subtypes=rev_announcement";

        try {
            let revDataAnnouncements = await window.revGetServerData_JSON_Async(url);
            let revRetFilterArr = revDataAnnouncements.filter;

            for (let i = 0; i < revRetFilterArr.length; i++) {
                let revAnnouncementtItemView = await window.revDownloadContextView("revInlineNoticiasContext", "revInlineAnnouncementItem", revRetFilterArr[i]);

                if (revAnnouncementtItemView) revAnnouncementViewsArr.push(revAnnouncementtItemView);

                if (i >= 3) break;
            }

            if (revAnnouncementViewsArr.length > 0) {
                document.getElementById(revInlineAnnouncementsContext_Id).innerHTML = `<div class="revFlexContainer revInlineNoticiasListAnnouncementsContainer">${revAnnouncementViewsArr.join("")}</div>`;
            } else {
                document.getElementById(revInlineAnnouncementsContext_Id).innerHTML = `<div class="revFontSiteGreyTxtColor revFontSizeNormal revEmptyNoticias">No Announcements . . .</div>`;
            }
        } catch (error) {
            console.log("ERR ANNOUNCEMENT -> !revData" + error);
        }
    });

    let revNoticiasAnnArea = `
        <div class="revFlexContainer revInlineNoticiasContainer">
            <div class="revFlexWrapper revInlineNoticiaHeaderWrapper">
                ${window.revSmallDividerWrapper_BorderRight()}
                <div class="revFontSiteBlueTxtColor revFontSizeMedium revNoticiaIcon"><i class="fas fa-bullhorn"></i></div>
                <div class="revMidSeparater"></div>
                <div id="${revGetGenericFormTabId_Ann}" class="revGetFormTab"></div>
                ${window.revSmallDividerWrapper_BorderRight()}
            </div>
            <div id="${revInlineAnnouncementsContext_Id}"></div>
            </div>
        </div>
        `;
    /** END REV NOTICIAS ANNOUNCEMENTS AREA */

    let revEntityActivityContentArea_Id = "revEntityActivityContentAreaId_" + window.revGenUniqueId();

    window.revSetInterval(revEntityActivityContentArea_Id, async () => {
        try {
            let revPageViewTimeline = await window.revGetLoadedPageViewAreaContainer("revPageViewTimeline", revVarArgs);

            if (revPageViewTimeline) document.getElementById(revEntityActivityContentArea_Id).innerHTML = revPageViewTimeline;
        } catch (error) {
            console.log("ERR -> revPageViewSpaceActivity_Academic_Widget.js -> !revPageViewTimeline -> " + error);
        }
    });

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

                    if (!revRemotePath) continue;

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

    /** START REV CALL PLUGINS */
    let revTimelinePreTimelineHookViews = "";

    if (revVarArgs.revEntityPlugins && revVarArgs.revEntityPlugins.length > 0) {
        let revRetVal = await window.revInitPluginHookHandlers("revTimelinePreTimelineHook", revVarArgs.revEntityPlugins, revVarArgs);
        revTimelinePreTimelineHookViews = revRetVal;
    }
    /** END REV CALL PLUGINS */

    return `
        <div class="revFlexContainer">
            <div class="revFlexWrapper revPageViewSpaceHeaderArea_Academic_ActivityWrapper">${revPageViewSpaceHeaderArea_Academic}</div>
            <div class="revFlexContainer revSpaceNoticiasContainer">
                ${revNoticiasCalArea}
                <div class="revFlexWrapper revLong_H_Rule"></div>
                ${revNoticiasAnnArea}
            </div>
            <div id="${revAcademicSpaceKiwiArea_Id}" class="revFamilyKiwiAreaWrapper"></div>

            ${revAccordionView}

            ${revTimelinePreTimelineHookViews}

            <div id="${revEntityActivityContentArea_Id}" class="revFlexContainer revEntityActivityContentArea"></div>
        </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
