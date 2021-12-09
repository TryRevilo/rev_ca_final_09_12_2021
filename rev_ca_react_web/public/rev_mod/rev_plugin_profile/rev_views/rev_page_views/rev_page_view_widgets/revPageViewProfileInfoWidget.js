var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._revInfoEntity) {
        let revLogInForm = await window.revGetForm("revLogIn", null);
        window.revLoadContainerInnerHTMLContent("revEntityActivityContentArea", revLogInForm);
    }

    let revInfoEntity = revVarArgs._revInfoEntity;
    let revInfoPicsAlbum;

    let revFullNames = window.revGetMetadataValue(revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");
    let revInfoDescValue = window.revGetMetadataValue(revInfoEntity._revEntityMetadataList, "rev_info_desc_value");
    let revLocation = window.revGetMetadataValue(revInfoEntity._revEntityMetadataList, "rev_info_location_value");

    if (revInfoEntity) {
        let revPicsAlbumsArr = window.revGetEntityChildren_By_Subtype(revInfoEntity._revEntityChildrenList, "rev_pics_album");

        if (Array.isArray(revPicsAlbumsArr)) {
            revInfoPicsAlbum = revPicsAlbumsArr[0];
        }
    }

    window.revSetInterval("revProfileIconWrapper", () => {
        window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
            let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revInfoEntity);
            revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

            let revProfileIconView = `<img class="revEntityProfileIcon"  src="${revProfileIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;

            document.getElementById("revProfileIconWrapper").innerHTML = revProfileIconView;
        });
    });

    window.revSetInterval("revBannerIconWrapper", () => {
        let revBannerIconEntity = window.revGetRevEntityContainingMetadataValue(revInfoEntity, "rev_banner_icon");

        if (!revBannerIconEntity) return;

        let revBannerIconPath = window.revGetMetadataValue(revBannerIconEntity._revEntityMetadataList, "rev_remote_file_name");
        revBannerIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revBannerIconPath;

        if (!revBannerIconPath) return;

        document.getElementById("revBannerIconWrapper").innerHTML = `
            <img class="revEntityBannerIcon"  src="${revBannerIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
        `;
    });

    let revInfoConnectionList_Id = "revInfoConnectionList_Id_" + window.revGenUniqueId();

    window.revSetInterval(revInfoConnectionList_Id, async () => {
        let url = window.REV_SITE_BASE_PATH + "/rev_api/get_rev_entities_by_entity_guid_rel_type?relTypeValId=5&remoteRevEntityGUID=" + revVarArgs._remoteRevEntityGUID;
        let revData = await window.revGetServerData_JSON_Async(url);
        revData = revData.filter;

        let revCountText = "";

        if (revData.length > 1) revCountText = "over ";

        document.getElementById("revConnsCount").innerHTML = " : " + revCountText + " " + revData.length;

        let revInfoConnectionListDraw = () => {
            let revConnsArr = [];

            for (let i = 0; i < revData.length; i++) {
                let revConnEntity = revData[i];

                if (!revConnEntity) continue;

                let revConnection_Id = "revConnection_Id_" + window.revGenUniqueId();

                let revFullNames = window.revGetMetadataValue(revConnEntity._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

                if (revFullNames) revFullNames = revFullNames.slice(0, 3);
                else revFullNames = " . . . ";

                let revConnUserIconPath = window.revGetEntityIcon(revConnEntity);
                revConnUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revConnUserIconPath;

                let connectionIconContainer = `<div id="${revConnection_Id}" class="revTabLink revFlexContainer connectionIconContainer"></div>`;

                window.revSetInterval(revConnection_Id, () => {
                    document.getElementById(revConnection_Id).addEventListener("click", function () {
                        window.revUserIconClick(revConnEntity._remoteRevEntityGUID);
                    });

                    window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
                        let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revConnEntity._revInfoEntity);
                        revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

                        let revProfileIconView = `
                            <img class="connectionProfileIcon"  src="${revProfileIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
                            <div class="revConnectionItemName">${revFullNames}</div>
                        `;

                        document.getElementById(revConnection_Id).innerHTML = revProfileIconView;
                    });
                });

                revConnsArr.push(connectionIconContainer);
            }

            document.getElementById(revInfoConnectionList_Id).innerHTML = revConnsArr.join("");
        };

        revInfoConnectionListDraw();
    });

    await window.revLoadModules("revPluginModuleSessions", (revScriptModule) => {
        if (window.revPluginModuleSessions.isRevPageOwnerEntity(revVarArgs._remoteRevEntityGUID)) {
            window.revSetInterval("revIconMenuAreaId", () => {
                document.getElementById("revIconMenuAreaId").innerHTML = `
                <div id="revEditProfileTabId" class="revTabLink revSmalllBoldBlue revFlexWrapper revIconMenuAreaMenuItemWrapper">
                    <span><i class="fa fa-edit"></i></span><span> EDiT</span>
                </div>
                `;
            });
        }
    });

    window.revSetInterval("revEditProfileTabId", async () => {
        document.getElementById("revEditProfileTabId").addEventListener("click", async function () {
            let revSpaceForm = await window.revGetForm("revInfo", window.REV_LOGGED_IN_ENTITY);
            window.revLoadContainerInnerHTMLContent("revEntityActivityContentArea", revSpaceForm);
        });
    });

    /** REV START LOCATION INFO */
    let revLocationView = "";

    if (revLocation) {
        revLocationView = `
        <div class="revRegStatusItemWrapper">
            <span class="revRegStatusItemIcon"><i class="fa fa-street-view"></i></span>
            <span class="revRegStatusItemText"> ${revLocation} &nbsp;</span>
        </div>
        `;
    }
    /** REV END LOCATION INFO */

    /** REV START ABOUT INFO */
    let revInfoDescView = "";

    if (revInfoDescValue && !window.revIsEmptyHTML(revInfoDescValue)) {
        revInfoDescView = `
        <div class="revAbout">
            <span><i class="fas fa-quote-left"></i></span>
            &nbsp; ${revInfoDescValue} &nbsp;
            <span><i class="fas fa-quote-right"></i></span>
        </div>
        `;
    }
    /** REV END ABOUT INFO */

    let revPicsAlbumOverrideView = "";

    /** REV START PROFILE PICS ALBUM */
    if (revInfoPicsAlbum) {
        revPicsAlbumOverrideView = `<div class="revFlexWrapper revPicsAlbumOverrideViewWrapper">${await window.revGetLoadedOverrideView("rev_photo", revInfoPicsAlbum)}</div>`;
    }
    /** REV START PROFILE PICS ALBUM */

    return `
    <div class="revFlexContainer revInfoContentContainer">
        <div class="revIconArea">
            <div id="revBannerIconWrapper" class="revBannerIconWrapper"></div>
            <div id="revProfileIconWrapper" class="revProfileIconWrapper"></div>
            <div id="revIconMenuAreaId" class="revIconMenuArea"></div>
        </div>
        <div class="revFlexContainer revInfoAreaContainer">
            <div class="revRegStatusWrapper">
                ${revLocationView}
                <div class="revRegStatusItemWrapper">
                    <span class="revRegStatusItemIcon"><i class="far fa-clock"></i></span>
                    <span class="revRegStatusItemText"> Joined ${window.revFormatLongDate(revVarArgs._revTimePublished)}</span>
                </div>
            </div>
            
            ${revInfoDescView}

            ${revPicsAlbumOverrideView}
            
            <div class="revInfoConnectionsArea">
                <div class="revInfoConnectionsTitle">conNecTions <span id="revConnsCount"></span></div>
                <div id="${revInfoConnectionList_Id}" class="revFlexWrapper revFlexWrapperScroll revInfoConnectionListWrapper"></div>
            </div>
            
            <div class="revProfileAreas">
                <div class="revProfileTabsMenuArea">
                    <div class="revProfileTab"><span><i class="fas fa-arrow-right"></i></span> FAmiLy</div>
                    <div class="revProfileTab"><span><i class="fas fa-users"></i></span> sociAL</div>
                    <div class="revProfileTab"><span><i class="fab fa-studiovinari"></i></span> AcaDEmia</div>
                    <div class="revProfileTab"><span><i class="fab fa-phoenix-framework"></i></span> woRk</div>
                </div>
                <div class="revProfileDrawArea"></div>
            </div>
        </div>
    </div>
    `;
};

module.exports.revPageViewWidget = revPageViewWidget;
