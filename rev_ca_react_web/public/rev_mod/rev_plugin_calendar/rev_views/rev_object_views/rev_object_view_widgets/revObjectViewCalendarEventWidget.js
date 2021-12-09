var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs) return;

    let revEventsListingPageHeader = window.revPageHeader("Calendar EveENT");

    let revPageViewPageNavHeaderId = "revPageViewPageNavHeaderId_" + window.revGenUniqueId();

    window.revSetInterval(revPageViewPageNavHeaderId, async () => {
        let revLoadedPageView = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSpaceType" } });
        document.getElementById(revPageViewPageNavHeaderId).innerHTML = revLoadedPageView;
    });

    let revEntityInfo = window.revGetEntityChildren_By_Subtype(revVarArgs._revEntityChildrenList, "rev_entity_info");
    revEntityInfo = revEntityInfo[0];

    let revEntityInfoPicsAlbum = window.revGetEntityChildren_By_Subtype(revEntityInfo._revEntityChildrenList, "rev_pics_album");

    if (Array.isArray(revEntityInfoPicsAlbum)) revEntityInfoPicsAlbum = revEntityInfoPicsAlbum[0];

    let revEventName = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_name");
    revEventName = window.revTruncateString(revEventName, 47);

    let revEntityDesc = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_desc");

    let revStartDate = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_start_date");

    let revStartDateObject = new Date(revStartDate);

    let MMM = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let ddd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let revStartDateDecorated = `${ddd[Number(revStartDateObject.getDay())]} <span class="revFontSizeLarge"> ${MMM[Number(revStartDateObject.getMonth())]}</span> <span class="revFontSizeNormal">${revStartDateObject.getDate()}</span> <span class="revFontSizeNormal">${revStartDateObject.getFullYear()}</span>`;

    let revManifest = revVarArgs.revManifest;

    let revInstallTabId = "revInstallersIconsId_" + window.revGenUniqueId();

    let revPicsAlbumView = "";

    if (revEntityInfoPicsAlbum) {
        revPicsAlbumView = await window.revGetLoadedOverrideView("rev_photo", revEntityInfoPicsAlbum);
    }

    window.revSetInterval(revInstallTabId, () => {
        document.getElementById(revInstallTabId).addEventListener("click", async (event) => {
            let revEventInstallForm = await window.revGetForm("revEventInstallForm", revManifest);
            document.getElementById("revEventsListingContainerId").innerHTML = revEventInstallForm;
        });
    });

    /** REV START PUBLISHER VIEW */
    let revPublisherEntity = revVarArgs.revPublisherEntity;

    if (!revPublisherEntity) {
        let revURLPublisher = window.REV_SITE_BASE_PATH + "/rev_api/get_entity_single?remote_rev_entity_guid=" + revVarArgs._revEntityOwnerGUID;

        let revDataPublisher = await window.revGetServerData_JSON_Async(revURLPublisher);
        revPublisherEntity = revDataPublisher.filter[0];
    }

    let revPublisherWrapperView = "";

    if (revPublisherEntity) {
        let revPublisherEntityName = window.revGetMetadataValue(revPublisherEntity._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

        let revrevPublisherEntityIconPath = window.revGetEntityIcon(revPublisherEntity);
        revrevPublisherEntityIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revrevPublisherEntityIconPath;

        let revPublisherEntityWrapper_Id = "revPublisherEntityWrapper_Id_" + window.revGenUniqueId();

        window.revSetInterval(revPublisherEntityWrapper_Id, () => {
            document.getElementById(revPublisherEntityWrapper_Id).addEventListener("click", function () {
                window.revUserIconClick(revPublisherEntity._remoteRevEntityGUID);
            });
        });

        revPublisherWrapperView = `
        <div id="${revPublisherEntityWrapper_Id}" class="revTabLink revFlexWrapper revPublisherEntityWrapper">
            <div class="revFontSiteGreyTxtColor revFontSizeLarge revByTxt">By</div>
            <div class="revEventPublisherUserIcon">
                <img class="revListingIconCurvedSmall" src="${revrevPublisherEntityIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
            </div>
            <div class="revFontSiteBlueTxtColor revFontSiteGreyTxtColor revFontSizeNormal revEventPublisherNames">${revPublisherEntityName}</div>
            <div class="revTimeCreatedStyle revEventTimeCreated">on ${window.revFormatLongDate(revVarArgs._revTimePublished)}</div>
        </div>
        `;
    }

    let revEntityOptionsMenuArea = await window.revGetMenuAreaView("revListingItemOptionsMenuArea", revVarArgs);

    let revView = `
        <div class="revFlexWrapper revEventObjectViewItemWrapper">
            <div class="revFlexWrapper revEventItemIconWrapper"><i class="fas fa-calendar-day revEventItemIcon"></i></div>
            <div class="revFlexContainer revEventItemRightContainer">
                <div class="revFlexWrapper revEventItemHeaderWrapper">
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revEventItemName">${revEventName}</div>
                    <div id="${revInstallTabId}" class="revTabLink revFontSiteBlueTxtColor revRSVPTab"><i class="far fa-bell"></i> RSVP</div>
                </div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revEventItemDesc">${revEntityDesc}</div>

                <div class="revFlexContainer revEventItemExtraDetailsContainer">
                    <div class="revFlexWrapper revInstallsWrapper">
                        <div class="revFontSiteBlueTxtColor revFontSizeNormal"><span class="revSmalllBold"></span> ${revStartDateDecorated}</div>
                    </div>

                    <div class="revFlexWrapper revFlexWrapperScroll revEventPicsWrapper">${revPicsAlbumView}</div>
                </div>

                <div class="revBorderBottom"></div>
                <div class="revFlexWrapper revObjectViewEventFooterWrapper">
                    ${revPublisherWrapperView}
                    <div class="revFlexWrapper revEventSettingsOptionsWrapper">${revEntityOptionsMenuArea}</div
                </div>
            </div>
        </div>
        `;

    return `
    <div class="revFlexContainer revEventsPageListingContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            ${revEventsListingPageHeader}
            <div id="${revPageViewPageNavHeaderId}" class="revFlexWrapper revPageViewTitledPageNavHeader"></div>
        </div>
        <div class="revFlexContainer revEventsListingContainer">${revView}</div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
