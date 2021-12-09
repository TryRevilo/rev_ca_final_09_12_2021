var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._revEntityChildrenList) {
        return;
    }

    let revEntityInfo = window.revGetEntityChildren_By_Subtype(revVarArgs._revEntityChildrenList, "rev_entity_info");
    revEntityInfo = revEntityInfo[0];

    let revEntityInfoPicsAlbum = window.revGetEntityChildren_By_Subtype(revEntityInfo._revEntityChildrenList, "rev_pics_album");

    if (Array.isArray(revEntityInfoPicsAlbum)) revEntityInfoPicsAlbum = revEntityInfoPicsAlbum[0];

    let revEventName = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_name");
    revEventName = window.revTruncateString(revEventName, 77);

    let revEntityDesc = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_desc");
    revEntityDesc = window.revTruncateString(revEntityDesc, 77);

    let revStartDate = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_start_date");

    let revStartDateObject = new Date(revStartDate);

    let MMM = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let ddd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let revStartDateDecorated = `${ddd[Number(revStartDateObject.getDay())]} <span class="revFontSizeLarge"> ${MMM[Number(revStartDateObject.getMonth())]}</span> <span class="revFontSizeNormal">${revStartDateObject.getDate()}</span> <span class="revFontSizeNormal">${revStartDateObject.getFullYear()}</span>`;

    let revEventItemId = "revEventItemId_" + window.revGenUniqueId();

    window.revSetInterval(revEventItemId, () => {
        document.getElementById(revEventItemId).addEventListener("click", async (event) => {
            let revLoadedPageView = await window.revGetLoadedPageView("revObjectViewCalendarEvent", revVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": null });
        });
    });

    let revEventPicsArr = [];

    if (revEntityInfoPicsAlbum && Array.isArray(revEntityInfoPicsAlbum._revEntityChildrenList) && revEntityInfoPicsAlbum._revEntityChildrenList.length > 0) {
        let revEntityInfoPicsAlbumFiles = revEntityInfoPicsAlbum._revEntityChildrenList;

        for (let i = 0; i < revEntityInfoPicsAlbumFiles.length; i++) {
            if (!revEntityInfoPicsAlbumFiles[i] || !revEntityInfoPicsAlbumFiles[i]._revEntityMetadataList) continue;

            let revEventIconPath = window.revGetMetadataValue(revEntityInfoPicsAlbumFiles[i]._revEntityMetadataList, "rev_remote_file_name");

            if (revEventIconPath) {
                revEventIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revEventIconPath;

                let revPicView = `
                <div class="revEventPic">
                    <img class="revListingIconCurvedSmall revTabLink" src="${revEventIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
                </div>
            `;

                revEventPicsArr.push(revPicView);
            }

            if (i >= 4) break;
        }
    }

    return `
        <div id="${revEventItemId}" class="revTabLink revFlexWrapper revEventItemWrapper">
            <div class="revFontSizeLarge revEventInlineItemIcon"><span><i class="fas fa-calendar-day"></i></span></div>
            <div class="revFlexContainer revPicsDetailsContainer">
                <div class="revFontSiteGreyTxtColor"><span class="revFontSizeLarge">${revStartDateDecorated}</div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal">${revEventName}</div>
                <div class="revFlexWrapper revEventPicsWrapper">${revEventPicsArr.join("")}</div>
            </div>
        </div>
        `;
};

module.exports.revPageViewWidget = revPageViewWidget;
