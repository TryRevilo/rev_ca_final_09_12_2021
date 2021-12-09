var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._revEntityChildrenList) {
        return;
    }

    let revEntityInfo = window.revGetEntityChildren_By_Subtype(revVarArgs._revEntityChildrenList, "rev_entity_info");
    revEntityInfo = revEntityInfo[0];

    let revEntityInfoPicsAlbum = window.revGetEntityChildren_By_Subtype(revEntityInfo._revEntityChildrenList, "rev_pics_album");

    if (Array.isArray(revEntityInfoPicsAlbum)) revEntityInfoPicsAlbum = revEntityInfoPicsAlbum[0];

    let revEntityName = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_name");
    revEntityName = window.revTruncateString(revEntityName, 77);

    let revEntityDesc = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_desc");
    revEntityDesc = window.revTruncateString(revEntityDesc, 47);

    let revAnnouncementItemId = "revEventItemId_" + window.revGenUniqueId();

    let revEntityInfoPicsViewsArr = [];

    if (revEntityInfoPicsAlbum && Array.isArray(revEntityInfoPicsAlbum._revEntityChildrenList) && revEntityInfoPicsAlbum._revEntityChildrenList.length > 0) {
        let revEntityInfoPicsAlbumFiles = revEntityInfoPicsAlbum._revEntityChildrenList;

        for (let i = 0; i < revEntityInfoPicsAlbumFiles.length; i++) {
            if (!revEntityInfoPicsAlbumFiles[i] || !revEntityInfoPicsAlbumFiles[i]._revEntityMetadataList) continue;

            let revEventIconPath = window.revGetMetadataValue(revEntityInfoPicsAlbumFiles[i]._revEntityMetadataList, "rev_remote_file_name");

            if (revEventIconPath) {
                revEventIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revEventIconPath;

                let revPicView = `
                <div class="revAnnouncementPic">
                    <img class="revListingIconCurvedSmall revTabLink" src="${revEventIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
                </div>
            `;

                revEntityInfoPicsViewsArr.push(revPicView);
            }

            if (i >= 4) break;
        }
    }

    return `
            <div id="${revAnnouncementItemId}" class="revTabLink revFontSiteGreyTxtColor revFlexWrapper revAnnouncementItemWrapper">
                <div class="revFontSizeLarge revAnnouncementItemIcon"><span><i class="fas fa-caret-right"></i></span></div>
                <div class="revFlexContainer revAnnouncementTargetContainer">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal">${revEntityDesc}</div>
                    <div class="revFontSiteBlueTxtColor">${revEntityName}</div>
                    <div class="revFlexWrapper revAnnouncementPicsWrapper">${revEntityInfoPicsViewsArr.join("")}</div>
                </div>
            </div>
        `;
};

module.exports.revPageViewWidget = revPageViewWidget;
