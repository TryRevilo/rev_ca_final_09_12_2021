var revPluginOverrideViewWidget = (revVarArgs) => {
    let revSelectedIndex;

    let revTimelineImagesListingId = "RevTimelineImagesListing_" + window.revGenUniqueId();

    let revDrawImages = (revPicsAlbum) => {
        if (!revPicsAlbum || !revPicsAlbum._revEntityChildrenList) {
            return;
        }

        let revPicsAlbumFiles = revPicsAlbum._revEntityChildrenList;

        let revImagesCount = revPicsAlbumFiles.length;

        let revImagesArr = [];

        if (revVarArgs && revVarArgs.revSelectedIndex && revVarArgs.revSelectedIndex > 0) {
            revSelectedIndex = revVarArgs.revSelectedIndex;
        }

        let revGetPicOptions = (revEntity) => {
            let revCloseTabId = "revCloseTab_" + window.revGenUniqueId();
            let revEditPicsAlbumTabId = "revEditPicsAlbumTabId_" + window.revGenUniqueId();
            let revDeletePicTabId = "revEditPicsAlbumTabId_" + window.revGenUniqueId();

            window.revSetInterval(revCloseTabId, () => {
                document.getElementById(revCloseTabId).addEventListener("click", (event) => {
                    window.revToggleSwitchArea("");
                });
            });

            window.revSetInterval(revEditPicsAlbumTabId, () => {
                document.getElementById(revEditPicsAlbumTabId).addEventListener("click", (event) => {
                    console.log(revEntity._remoteRevEntityGUID + " : EDIT : ");
                });
            });

            window.revSetInterval(revDeletePicTabId, () => {
                document.getElementById(revDeletePicTabId).addEventListener("click", (event) => {
                    console.log(revEntity._remoteRevEntityGUID + " : DELETE : ");
                });
            });

            return `
            <div class="revPosAbsolute revFlexWrapper revImageDetailContainerOptionsWrapper">
                <div id="${revCloseTabId}" class="revSmalllBoldBlue revTabLink revFlexWrapper revOptionsTabWrapperDelete">
                    <div><i class="fas fa-times"></i></div>
                </div>
                <div id="${revEditPicsAlbumTabId}" class="revSmalllBoldBlue revTabLink revFlexWrapper revOptionsTabWrapper">
                    <div><i class="far fa-edit"></i></div>
                </div>
                <div id="${revDeletePicTabId}" class="revFontSiteRedTxtColor revTabLink revFlexWrapper revOptionsTabWrapper">
                    <div><i class="far fa-trash-alt"></i></div>
                </div>
            </div>
            `;
        };

        let revIsEditable = revVarArgs.revIsEditable;

        let revAlbumPicsSize = "revListingUserIconBlock revImageItemStyle";

        if (revVarArgs.revAlbumPicsSize) {
            revAlbumPicsSize = revVarArgs.revAlbumPicsSize;
        }

        for (let i = 0; i < revImagesCount; i++) {
            let revImageItem = revPicsAlbumFiles[i];
            let revImageItemId = "revImageItemId_" + window.revGenUniqueId();

            window.revSetInterval(revImageItemId, () => {
                document.getElementById(revImageItemId).addEventListener("click", async (event) => {
                    let revSelectImageFullViewId = "revSelectImageFullViewId";

                    if (!revSelectedIndex) {
                        let revPassVarArgs = window.revCloneJsObject(revVarArgs);
                        revPassVarArgs["revSelectedIndex"] = i + 1;

                        let revPicsOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPassVarArgs);

                        window.revToggleSwitchArea(`
                        <div class="revPosRelative revFlexContainer revImagesDetailContainer">
                            <div id="${revSelectImageFullViewId}" class="revFlexContainer">
                                <img class="revFullImageView"  src="${revRemotePath}" onerror="null;this.src='${window.REV_DEFAULT_PIC_ICON_PATH}';">
                            </div>
                            ${revPicsOverrideView}
                            ${revGetPicOptions(revPassVarArgs)}
                        </div>
                        `);
                    } else {
                        document.getElementById(revSelectImageFullViewId).innerHTML = `
                            <img class="revFullImageView" src="${revRemotePath}" onerror="null;this.src='${window.REV_DEFAULT_PIC_ICON_PATH}';">
                        `;
                    }
                });
            });

            let revRemotePath = revGetMetadataValue(revImageItem._revEntityMetadataList, "rev_remote_file_name");
            revRemotePath = REV_UPLOAD_FILES_DIR_PATH + "/" + revRemotePath;

            let revStyle = `class="revTabLink ${revAlbumPicsSize}"`;

            if (i == 12 || i == revImagesCount) {
                revStyle = revStyle.concat(' style="margin-right: 0 !important;"');
            }

            let revDelePicItemTab = "";

            let revImageItemContainer_Id = "revImageItemContainer_Id" + window.revGenUniqueId();

            if (revIsEditable) {
                let revDelePicItemTab_Id = "revDelePicItemTab_Id" + window.revGenUniqueId();

                window.revSetInterval(revDelePicItemTab_Id, () => {
                    document.getElementById(revDelePicItemTab_Id).addEventListener("click", (event) => {
                        document.getElementById(revImageItemContainer_Id).remove();
                        revVarArgs.revPicsAlbumEditCallBack({ "revEntityDelPicItem": window.revCloneJsObject(revImageItem) });
                    });
                });

                revDelePicItemTab = `<div id="${revDelePicItemTab_Id}" class="revTabLink revFontSiteRedTxtColor revFontSizeLarge revPosAbsolute revDeletePicItemTab"><i class="far fa-trash-alt"></i></div>`;
            }

            let revImg = `<img id="${revImageItemId}" ${revStyle} src="${revRemotePath}" onerror="null;this.src='${window.REV_DEFAULT_PIC_ICON_PATH}';">`;
            revImagesArr.push(`
                <div id="${revImageItemContainer_Id}" class="revPosRelative revFlexContainer revImageItemContainer">
                    ${revImg}
                    ${revDelePicItemTab}
                </div>
            `);

            if (i == 12) break;
        }

        return `
        <div id=${revTimelineImagesListingId} class="revFlexWrapper revFlexWrapperScroll revImagesWrapperStyle">
            ${revImagesArr.join("")}
        </div>
        `;
    };

    return revDrawImages(revVarArgs);
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
