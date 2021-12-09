var revFormViewWidget = async (revVarArgs) => {
    let revEntityGUID = -1;
    let revContainerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
    let revInfoEntity;
    let revPicsAlbumsArr;
    let revInfoPicsAlbum;
    let revInfoPicsAlbumEntityGUID = -1;

    let revEntityDelPicsArr = [];

    /** REV START CURR ENTITY GUID */
    /**
     * If > 0
     * -> Update
     * -> EntityGUID == Passed revVarArgs EntityGUID
     * -> Get Info
     * -> Get Info Pics ALBUM Album
     *
     * Else
     * -> New Entity
     * -> EntityGUID == -1
     *
     */
    if (revVarArgs && revVarArgs._revEntitySubType.localeCompare("rev_user_entity") == 0 && revVarArgs._remoteRevEntityGUID) {
        revEntityGUID = revVarArgs._remoteRevEntityGUID;
        revContainerGUID = revVarArgs._revEntityContainerGUID;

        if (revVarArgs._revInfoEntity) {
            revInfoEntity = revVarArgs._revInfoEntity;

            revPicsAlbumsArr = window.revGetEntityChildren_By_Subtype(revInfoEntity._revEntityChildrenList, "rev_pics_album");

            if (Array.isArray(revPicsAlbumsArr)) {
                revInfoPicsAlbum = revPicsAlbumsArr[0];

                if (revInfoPicsAlbum && revInfoPicsAlbum._remoteRevEntityGUID && revInfoPicsAlbum._remoteRevEntityGUID > 0) {
                    revInfoPicsAlbumEntityGUID = revInfoPicsAlbum._remoteRevEntityGUID;
                }
            }
        }
    } else revContainerGUID = revVarArgs._remoteRevEntityGUID;
    /** REV END CURR ENTITY GUID */

    let revTextingQuill;

    let revProfileIcon, revBunnerIcon;

    let revSelectedPicsAlbumFiles = [];
    let revMainSelectedFileIndex;

    let revUploadInfoPicsAlbum = async (revContainerEntityGUID) => {
        let revFileObjectsArr = [];

        if (revProfileIcon) {
            let revRemoteIconFile = window.revSetNewRemoteFile(revProfileIcon);

            let revFileSubtype = window.revGetFileObjectSubType(revProfileIcon);
            let revEntityFileObject = window.revSetFileObject(revFileSubtype, revContainerEntityGUID, revRemoteIconFile.name);

            if (revEntityFileObject) {
                revEntityFileObject._revEntityMetadataList.push(window.revMetadataFiller("rev_file", "rev_profile_icon"));

                revFileObjectsArr.push(revFileObjectsArr.push({ "revFileObject": revEntityFileObject, "revFileItem": revRemoteIconFile }));
            }
        }

        if (revBunnerIcon) {
            let revRemoteIconFile = window.revSetNewRemoteFile(revBunnerIcon);

            let revFileSubtype = window.revGetFileObjectSubType(revBunnerIcon);
            let revEntityFileObject = window.revSetFileObject(revFileSubtype, revContainerEntityGUID, revRemoteIconFile.name);

            if (revEntityFileObject) {
                revEntityFileObject._revEntityMetadataList.push(window.revMetadataFiller("rev_file", "rev_banner_icon"));

                revFileObjectsArr.push(revFileObjectsArr.push({ "revFileObject": revEntityFileObject, "revFileItem": revRemoteIconFile }));
            }
        }

        /** REV START PROFILE PICS ALBUM */
        let revFileType = "rev_pics_album_file";

        for (let i = 0; i < revSelectedPicsAlbumFiles.length; i++) {
            let revFile = revSelectedPicsAlbumFiles[i];

            if (revFile) {
                let revRemoteIconFile = window.revSetNewRemoteFile(revFile, i);

                let revFileSubtype = window.revGetFileObjectSubType(revFile);
                let revEntityFileObject = window.revSetFileObject(revFileSubtype, -1, revRemoteIconFile.name);

                let revFileTypeMetadataVal = window.REV_ENTITY_METADATA_STRUCT();
                revFileTypeMetadataVal._revMetadataName = revFileType;
                revFileTypeMetadataVal._metadataValue = revFileType;

                revEntityFileObject._revEntityMetadataList.push(revFileTypeMetadataVal);

                if (revMainSelectedFileIndex && revMainSelectedFileIndex == i) {
                    revEntityFileObject._revEntityMetadataList.push(window.revMetadataFiller("rev_main_file", revRemoteIconFile.name));
                }

                revEntityFileObject._revEntityGUID = 0;

                revFileObjectsArr.push({ "revFileObject": revEntityFileObject, "revFileItem": revRemoteIconFile });
            }
        }
        /** REV END PROFILE PICS ALBUM */

        if (revFileObjectsArr.length > 0) {
            let revIsNewEntity = true;

            if (revInfoPicsAlbumEntityGUID > 0) revIsNewEntity = false;

            window.revLoadModules("revPluginModulePicsAlbumPers", (revScriptModule) => {
                if (revIsNewEntity) {
                    let revPassVarArgs = { "revEntityContainerGUID": revContainerEntityGUID, "revFileObjectsArr": revFileObjectsArr, "revIsNewEntity": revIsNewEntity };

                    window.revPluginModulePicsAlbumPers.createPicsAlbum_FileObjects(revPassVarArgs, (revResStatus) => {
                        console.log("FIN : revIsNewEntity : revResStatus" + JSON.stringify(revResStatus));
                    });
                } else {
                    let revPassVarArgs = { "revContainerEntityGUID": revContainerEntityGUID, "revFileObjectsArr": revFileObjectsArr };
                    window.revPluginModulePicsAlbumPers.revUploadPicsAlbumFiles(revPassVarArgs, (revResStatus) => {
                        console.log("FIN : UPDATE : revResStatus " + JSON.stringify(revResStatus));
                    });
                }
            });
        }
    };

    let revSaveProfileInfo = async () => {
        let revFullNames = document.getElementById("revFullNamesId").value;
        let revBriefDesc = revTextingQuill.root.innerHTML;
        let revLocation = document.getElementById("revLocationId").value;

        /** NEW REV INFO */
        let revPersInfoEntity = window.REV_ENTITY_STRUCT();
        revPersInfoEntity._remoteRevEntityGUID = -1;
        revPersInfoEntity._revEntityResolveStatus = 0;
        revPersInfoEntity._revEntityType = "revObject";
        revPersInfoEntity._revEntitySubType = "rev_entity_info";
        revPersInfoEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersInfoEntity._revEntityChildableStatus = 3;
        revPersInfoEntity._revTimeCreated = new Date().getTime();

        let revInfoRemoteEntityGUID = revInfoEntity._remoteRevEntityGUID;

        if (revFullNames) revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_full_names_value", revFullNames));

        if (revBriefDesc) revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_info_desc_value", revBriefDesc));

        if (revBriefDesc) revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_info_location_value", revLocation));

        if (!revInfoEntity || !revInfoEntity._remoteRevEntityGUID || revInfoEntity._remoteRevEntityGUID < 1) {
            // Save New Info
            window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, { filter: [revPersInfoEntity] }, async (revRetData) => {
                revInfoRemoteEntityGUID = revRetData._remoteRevEntityGUID;

                revUploadInfoPicsAlbum(revInfoRemoteEntityGUID);
            });
        } else {
            let revEntityUdateData = window.revEntityUdateData(revInfoEntity, revPersInfoEntity);
            let revEntityUpdateMetaDataArr = revEntityUdateData.revEntityUpdateMetaDataArr;
            let revEntityNewMetaDataArr = revEntityUdateData.revEntityNewMetaDataArr;
            let revEntityDeleteMetadataArr = revEntityUdateData.revEntityDeleteMetadataArr;

            if (revEntityUpdateMetaDataArr && Array.isArray(revEntityUpdateMetaDataArr.filter) && revEntityUpdateMetaDataArr.filter.length > 0) {
                await window.revPostServerData(window.REV_UPDATE_METADATA_ARR_URL, revEntityUpdateMetaDataArr, async (revData) => {
                    console.log("revData UPDATE : " + JSON.stringify(revData));
                });
            }

            if (revEntityNewMetaDataArr && Array.isArray(revEntityNewMetaDataArr.filter) && revEntityNewMetaDataArr.filter.length > 0) {
                await window.revPostServerData(window.REV_NEW_METADATA_ARR_URL, revEntityNewMetaDataArr, async (revData) => {
                    console.log("revData UPDATE : " + JSON.stringify(revData));
                });
            }

            if (revEntityDeleteMetadataArr && Array.isArray(revEntityDeleteMetadataArr.filter) && revEntityDeleteMetadataArr.filter.length > 0) {
                let revMetadataIdsArr = [];

                for (let i = 0; i < revEntityDeleteMetadataArr.filter.length; i++) {
                    if (revEntityDeleteMetadataArr.filter[i]) revMetadataIdsArr.push(revEntityDeleteMetadataArr.filter[i].remoteRevMetadataId);
                }

                if (revMetadataIdsArr.length > 0) {
                    await window.revPostServerData(window.REV_DELETE_METADATA_ID_ARR_URL, { filter: revMetadataIdsArr }, async (revData) => {
                        console.log("revData DELETE : " + JSON.stringify(revData));
                    });
                }
            }

            if (revInfoPicsAlbumEntityGUID > 0) {
                revUploadInfoPicsAlbum(revInfoPicsAlbumEntityGUID);

                /** REV START DEL PICS FILES */
                let revEntityDelPicsGUIDsArr = [];

                for (let i = 0; i < revEntityDelPicsArr.length; i++) {
                    revEntityDelPicsGUIDsArr.push(revEntityDelPicsArr[i]._remoteRevEntityGUID);
                }

                window.revPostServerData(window.REV_DELETE_REV_ENTITY_WITH_CHILDS_URL, { filter: revEntityDelPicsGUIDsArr }, (revRetData) => {
                    console.log("DEL revRetData :" + JSON.stringify(revRetData));
                });
                /** REV END DEL PICS FILES */
            } else {
                revUploadInfoPicsAlbum(revInfoEntity._remoteRevEntityGUID);
            }
        }
    };

    window.revSetInterval("revSubmitTab", () => {
        document.getElementById("revSubmitTab").addEventListener("click", function () {
            revSaveProfileInfo();
        });
    });

    window.revSetInterval("revAboutMeInputArea", () => {
        revTextingQuill = window.revNewQuill("revAboutMeInputArea", " About me ");
    });

    window.revSetInterval("revInfoContentWrapper_Edit", () => {
        if (revVarArgs && revVarArgs._revEntityMetadataList && revInfoEntity && revInfoEntity._revEntityMetadataList) {
            let revEntityInfoMetadataList = revInfoEntity._revEntityMetadataList;

            let revFullNames = window.revGetMetadataValue(revEntityInfoMetadataList, "rev_entity_full_names_value");
            let revDesc = window.revGetMetadataValue(revEntityInfoMetadataList, "rev_info_desc_value");
            let revInfoLocationValue = window.revGetMetadataValue(revEntityInfoMetadataList, "rev_info_location_value");

            if (revFullNames && revFullNames.localeCompare("") !== 0) {
                document.getElementById("revFullNamesId").value = revFullNames;
            }

            if (revInfoLocationValue && revInfoLocationValue.localeCompare("") !== 0) {
                document.getElementById("revLocationId").value = revInfoLocationValue;
            }

            if (revDesc && revDesc.localeCompare("") !== 0) {
                revTextingQuill.root.innerHTML = revDesc;
            }

            if (revDesc && revDesc.localeCompare("") !== 0) {
                revTextingQuill.root.innerHTML = revDesc;
            }
        }
    });

    let revReadFileToImage = (revFile, revIconClass, callback) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            let revBannerImage = `
            <img class=${revIconClass} src="${e.target.result}" />
            `;

            callback(revBannerImage);
        };

        reader.readAsDataURL(revFile); // convert to base64 string
    };

    let revBannerIcon_Edit_Id = "revBannerIcon_Edit_Id";

    let revFilesSelectedBannerCallback = (revSelectedFiles) => {
        revReadFileToImage(revSelectedFiles[0], "revBannerImage", (revImageFromFile) => {
            document.getElementById(revBannerIcon_Edit_Id).innerHTML = revImageFromFile;
            revBunnerIcon = revSelectedFiles[0];

            let revProfileIconEntity = window.revGetRevEntityContainingMetadataValue(revInfoEntity, "rev_banner_icon");

            if (revProfileIconEntity) revEntityDelPicsArr.push(revProfileIconEntity);
        });
    };

    let revSelectedBannerFilesVarArgs = {
        revId: "banner_" + window.revGenUniqueId(),
        revTab: '<span><i class="fa fa-camera fa-lg"></i></span>',
        revFilesSelectedCallback: revFilesSelectedBannerCallback,
        revFileMulti: false,
    };

    let revProfileBannerFileExplorerTab = await window.revGetMenuItem("revHiddenMenuItemFileExplorerTab", revSelectedBannerFilesVarArgs);

    /** REV START PROFILE ICON */
    let revProfileIconEdit_Id = "revProfileIconEdit_Id";

    let revFilesSelectedIconCallback = (revSelectedFiles) => {
        revReadFileToImage(revSelectedFiles[0], "revIconImage", (revImageFromFile) => {
            let revIconArea = `
                ${revImageFromFile}
                <div class="revIconChooserBtn">${revProfileIconEdit_FileExplorerTab}</div>
            `;

            document.getElementById(revProfileIconEdit_Id).innerHTML = revIconArea;

            revProfileIcon = revSelectedFiles[0];

            let revProfileIconEntity = window.revGetRevEntityContainingMetadataValue(revInfoEntity, "rev_profile_icon");

            if (revProfileIconEntity) revEntityDelPicsArr.push(revProfileIconEntity);
        });
    };

    let revSelectedIconFilesVarArgs = {
        revId: "icon_" + window.revGenUniqueId(),
        revTab: '<span><i class="fa fa-camera fa-lg"></i></span>',
        revFilesSelectedCallback: revFilesSelectedIconCallback,
        revFileMulti: false,
    };

    let revProfileIconEdit_FileExplorerTab = await window.revGetMenuItem("revHiddenMenuItemFileExplorerTab", revSelectedIconFilesVarArgs);

    window.revSetInterval(revProfileIconEdit_Id, () => {
        window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
            let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revInfoEntity);
            revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

            let revProfileIconView = `<img class="revTabLink revIconImage" src="${revProfileIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;

            document.getElementById(revProfileIconEdit_Id).innerHTML = `
                ${revProfileIconView}
                <div class="revFlexWrapper revIconChooserBtn">${revProfileIconEdit_FileExplorerTab}</div>
            `;
        });
    });
    /** REV END PROFILE ICON */

    /** REV BANNER ICON */
    window.revSetInterval(revBannerIcon_Edit_Id, () => {
        let revBannerIconPath = "";

        let revBannerIconEntity = window.revGetRevEntityContainingMetadataValue(revInfoEntity, "rev_banner_icon");

        if (revBannerIconEntity) {
            revBannerIconPath = window.revGetMetadataValue(revBannerIconEntity._revEntityMetadataList, "rev_remote_file_name");
            revBannerIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revBannerIconPath;
        }

        if (!revBannerIconPath) return;

        document.getElementById(revBannerIcon_Edit_Id).innerHTML = `
            <img class="revBannerImage"  src="${revBannerIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
        `;
    });
    /** REV END BANNER ICON */

    /* START REV INFO PICS ALBUM SELECT */
    let revPicsAlbumOverrideView = "";

    /** START edit update pics album  */
    if (revInfoPicsAlbum) {
        let revPassVarArgs = window.revCloneJsObject(revInfoPicsAlbum);

        let revPicsAlbumEditCallBack = (revEditVarArgs) => {
            if (revEditVarArgs && revEditVarArgs.hasOwnProperty("revEntityDelPicItem")) {
                revEntityDelPicsArr.push(revEditVarArgs.revEntityDelPicItem);
                revInfoPicsAlbum = window.revRemoveEntityChild_By_EntityGUID(revInfoPicsAlbum, [revEditVarArgs.revEntityDelPicItem._remoteRevEntityGUID]);
            }
        };

        revPassVarArgs["revPicsAlbumEditCallBack"] = revPicsAlbumEditCallBack;
        revPassVarArgs["revIsEditable"] = true;

        revPicsAlbumOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPassVarArgs);
    }
    /** END edit update pics album */

    /** REV START PROFILE PICS ALBUM */
    let revEntityIconSelectionAreaVarArgs = {};
    revEntityIconSelectionAreaVarArgs["revSelectFileText"] = "pRoFiLE ALBum";

    let revEntityIconSelectDrawId = window.revGenUniqueId();
    revEntityIconSelectionAreaVarArgs["revEntityIconSelectDrawId"] = revEntityIconSelectDrawId;

    revEntityIconSelectionAreaVarArgs["revFilesSelectedCallback"] = (revSelectedPicsAlbumFilesVarArgs) => {
        revSelectedPicsAlbumFiles = revSelectedPicsAlbumFilesVarArgs.revSelectedFiles;
        revMainSelectedFileIndex = revSelectedPicsAlbumFilesVarArgs.revMainSelectedFileIndex;

        if (revSelectedPicsAlbumFilesVarArgs.revMainSelectedFileIndex == null) {
            document.getElementById(revEntityIconSelectDrawId).innerHTML = "";
            return;
        }

        let revSelectedFile = revSelectedPicsAlbumFiles[revSelectedPicsAlbumFilesVarArgs.revMainSelectedFileIndex];

        if (!revSelectedFile) {
            document.getElementById(revEntityIconSelectDrawId).innerHTML = "";
            return;
        }

        document.getElementById(revEntityIconSelectDrawId).innerHTML = window.revReadFileToImageFromPath(revSelectedFile, "revListingUserIconBlock");
    };

    revEntityIconSelectionAreaVarArgs["revSelectFileId"] = "revSelectFileId";

    let revEntityIconSelectionArea = await window.revEntityIconSelectionArea(revEntityIconSelectionAreaVarArgs);
    /** REV END PROFILE PICS ALBUM */

    let revFullNames = window.revInputText({
        "revId": "revFullNamesId",
        "revIcon": '<i class="far fa-user"></i>',
        "revTitle": "Full names",
        "revPlaceholderText": ". . .",
    });

    let revLocation = window.revInputText({
        "revId": "revLocationId",
        "revIcon": '<i class="far fa-map"></i>',
        "revTitle": "Country / Location",
        "revPlaceholderText": ". . .",
    });

    return `
    <div id="revInfoContentWrapper_Edit" class="revFlexContainer revInfoContentContainer_Edit">
        <div class="revPosRelative revIconAreaWrapper_Edit">
            <div class="revTabLink revPosAbsolute revBannerIconChooserBtn">${revProfileBannerFileExplorerTab}</div>
            <div id="${revBannerIcon_Edit_Id}" class="revPosAbsolute revBannerIcon_Edit"></div>
            <div id="${revProfileIconEdit_Id}" class="revTabLink revPosAbsolute revFlexWrapper revProfileIconEditWrapper"></div>
        </div>
        
        <div class="revFlexContainer revInfoAreaContainer_Edit">
            ${revFullNames}

            <div class="revAboutMeInfoInputAreaWrapper">
                <div id="revAboutMeInputArea"></div>
            </div>
            <div class="revFlexContainer revSelectItemMainIconContainer">
                ${revPicsAlbumOverrideView}
                <div class="revFlexWrapper revSelectItemMainIconsWrapper">${revEntityIconSelectionArea}</div>
            </div>

            ${revLocation}
        </div>

        <div class="revProfileAreas_Edit">
            <div class="revProfileTabsMenuArea_Edit">
                <div class="revProfileTab_Edit"><span><i class="fab fa-studiovinari fa-lg"></i></span> AcaDEmia</div>
                <div class="revProfileTab_Edit"><span><i class="fab fa-phoenix-framework fa-lg"></i></span> woRk</div>
                <div class="revProfileTab_Edit"><span><i class="fas fa-users fa-lg"></i></span> sociAL</div>
                <div class="revProfileTab_Edit"><span><i class="fab fa-figma fa-lg"></i></span> FamiLy</div>
            </div>
            <div class="revProfileDrawArea"></div>
        </div>

        <div id="revSubmitTab" class="revSubmitTab">sAvE</div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
