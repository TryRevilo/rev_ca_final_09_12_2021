var revFormViewWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        console.log("ERR -> revKiwiWidget -> !revVarArgs");
        return;
    }

    let revRemoteEntityGUID = -1;
    let revEntityContainerGUID = -1;
    let revInfoPicsAlbumEntityGUID = -1;

    let revProfilePubAreaId = "revProfilePubArea_" + window.revGenUniqueId();

    if (revVarArgs && revVarArgs._revEntitySubType && revVarArgs._revEntitySubType.localeCompare("rev_kiwi") == 0) {
        revRemoteEntityGUID = revVarArgs._remoteRevEntityGUID;
        revEntityContainerGUID = revVarArgs._revEntityContainerGUID;
    } else {
        revEntityContainerGUID = revVarArgs._remoteRevEntityGUID;
    }

    let revSelectedPicsFiles = [];
    let revSelectedVideoFiles = [];

    let revAddedTagsArr = [];

    let revSelectedMediaWrapper_Id = "revSelectedMediaWrapper_Id" + window.revGenUniqueId();

    let revPassSelectFilesVarArgs = window.revCloneJsObject(revVarArgs);

    revPassSelectFilesVarArgs.revFilesSelectedCallback = (revFiles) => {
        revSelectedPicsFiles = [];
        revSelectedVideoFiles = [];

        for (let i = 0; i < revFiles.length; i++) {
            let revCurrFile = revFiles[i];

            setTimeout(
                (function (revFile) {
                    let revCurrTime = new Date().getTime();

                    let revNewFileNameConst = window.REV_LOGGED_IN_ENTITY_GUID + "_" + revCurrTime;
                    let revFileType = window.revGetFileType(revFile);
                    let revNewFileName = revNewFileNameConst + "." + revFileType;

                    let revNewFile = new File([revFile], revNewFileName, { type: revFile.type });

                    switch (revFileType) {
                        case "jpg":
                        case "png":
                        case "jpeg":
                            revSelectedPicsFiles.push(revNewFile);
                            break;

                        case "mp4":
                        case "MOV":
                        case "WMV":
                        case "AVI":
                        case "AVCHD":
                        case "FLV":
                        case "F4V":
                        case "SWF":
                        case "MKV":
                        case "mkv":
                        case "WEBM":
                        case "HTML5":
                        case "MPEG-2":
                            revSelectedVideoFiles.push(revNewFile);
                            break;
                    }
                })(revCurrFile),
                0
            );
        }

        window.imagesPreview(revSelectedPicsFiles, revSelectedMediaWrapper_Id);
    };

    let revFileExplorerMenuItem = await window.revGetMenuItem("revMenuItemFileExplorerTab", revPassSelectFilesVarArgs);

    let revTextingQuill;

    window.revSetInterval(revProfilePubAreaId, () => {
        let revKiwiPromptText = "sAy somEthiNG oN my pRofiLe !";

        if (revVarArgs.revKiwiPromptText) {
            revKiwiPromptText = revVarArgs.revKiwiPromptText;
        } else {
            if (revEntityContainerGUID == window.REV_LOGGED_IN_ENTITY_GUID) {
                revKiwiPromptText = "sAy somEthiNG oN youR pRofiLe !";
            }
        }

        revTextingQuill = window.revNewQuill(revProfilePubAreaId, revKiwiPromptText);

        if (revRemoteEntityGUID && revRemoteEntityGUID > 0) {
            revTextingQuill.root.innerHTML = revVarArgs._revEntityMetadataList[0]._metadataValue;
        }
    });

    let revPublishItemTabId = "revPublishItemTab_";

    if (revRemoteEntityGUID > 0) {
        revPublishItemTabId + revRemoteEntityGUID;
    }

    let revUploadEntiyPicsAlbum = (revEntityContainerGUID) => {
        let revIsNewEntity = true;

        let revUploadVarArgs = {
            "revFiles": revSelectedPicsFiles,
            "revFileType": "rev_file",
            "revContainerEntityGUID": revEntityContainerGUID,
            "revIsNewEntity": revIsNewEntity,
        };

        window.revLoadModules("revPluginModuleUploadFileObjectsLib", (revScriptModule) => {
            window.revPluginModuleUploadFileObjectsLib.revUploadFileObjects(revUploadVarArgs, async (revResStatus) => {
                console.log("FIN : revIcons\n");
            });
        });
    };

    window.revSetInterval(revPublishItemTabId, async () => {
        document.getElementById(revPublishItemTabId).addEventListener("click", async function () {
            window.revToggleSwitchArea("");

            let revEntitySubType = "rev_kiwi";

            if (revVarArgs.revEntitySubType) {
                revEntitySubType = revVarArgs.revEntitySubType;
            }

            let revPersEntity = window.REV_ENTITY_STRUCT();
            revPersEntity._revEntityResolveStatus = 0;
            revPersEntity._revEntityChildableStatus = 301;
            revPersEntity._revEntityType = "revObject";
            revPersEntity._revEntitySubType = revEntitySubType;
            revPersEntity._remoteRevEntityGUID = revRemoteEntityGUID;
            revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
            revPersEntity._revEntityContainerGUID = revEntityContainerGUID;
            revPersEntity._revTimeCreated = new Date().getTime();

            let revKiwiMetadata_KiwiVal = window.REV_ENTITY_METADATA_STRUCT();

            revKiwiMetadata_KiwiVal._revMetadataName = "rev_kiwi_value";
            revKiwiMetadata_KiwiVal._metadataValue = revTextingQuill.root.innerHTML;

            if (revRemoteEntityGUID > 0) {
                revKiwiMetadata_KiwiVal.remoteRevMetadataId = revVarArgs._revEntityMetadataList[0].remoteRevMetadataId;
            }

            let revEntityMetadataList = [revKiwiMetadata_KiwiVal];

            revPersEntity._revEntityMetadataList = revEntityMetadataList;

            /** START REV INFO */
            let revPersEntityInfo = window.REV_ENTITY_STRUCT();
            revPersEntityInfo._remoteRevEntityGUID = -1;
            revPersEntityInfo._revEntityResolveStatus = 0;
            revPersEntityInfo._revEntityChildableStatus = 3;
            revPersEntityInfo._revEntityType = "revObject";
            revPersEntityInfo._revEntitySubType = "rev_entity_info";
            revPersEntityInfo._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
            revPersEntityInfo._revEntityContainerGUID = revPersEntity._remoteRevEntityGUID;
            revPersEntityInfo._revEntityChildableStatus = 3;
            revPersEntityInfo._revTimeCreated = new Date().getTime();
            /** END REV INFO */

            /** REV START MINT MESSAGE VAL */
            let revFamilyKiwiVal = revTextingQuill.getText();

            if (window.revStringEmpty(revFamilyKiwiVal)) {
                console.log("posT canNot be empTy.");
                return;
            }

            revPersEntityInfo._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc", revFamilyKiwiVal));
            /** REV END MINT MESSAGE VAL */

            /** REV START MINT MESSAGE VAL HTML */
            let revFamilyKiwiVal_HTML = revTextingQuill.root.innerHTML;

            if (!window.revIsEmptyHTML(revFamilyKiwiVal_HTML)) {
                revPersEntityInfo._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_html", revFamilyKiwiVal_HTML));
            }
            /** REV END MINT MESSAGE VAL HTML */

            /** REV START ATTACH TAGS */
            if (revAddedTagsArr.length > 0) {
                for (let i = 0; i < revAddedTagsArr.length; i++) {
                    revPersEntityInfo._revEntityMetadataList.push(window.revMetadataFiller("rev_tag", revAddedTagsArr[i]));
                }
            }
            /** REV START ATTACH TAGS */

            /** REV START ATTACH INFO */
            revPersEntity._revInfoEntity = revPersEntityInfo;
            /** REV END ATTACH INFO */

            let revKiwiPersArr = { filter: [revPersEntity] };

            if (revRemoteEntityGUID < 1) {
                await window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, revKiwiPersArr, async (revRetData) => {
                    console.log("revRetData : " + JSON.stringify(revRetData));

                    let revRetEntity = revRetData.filter[0];

                    console.log("revRetEntity : " + JSON.stringify(revRetEntity));

                    let revRetRemoteEntityGUID = revRetEntity._remoteRevEntityGUID;
                    revPersEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;
                    revPersEntity._revTimePublished = revRetEntity._revTimePublished;

                    let revInfoEntityGUID = revRetEntity.revInfoEntityGUID;

                    revPersEntityInfo._revEntityContainerGUID = revRetRemoteEntityGUID;
                    revPersEntityInfo._revEntityRemoteContainerGUID = revRetRemoteEntityGUID;
                    revPersEntityInfo._remoteRevEntityGUID = revInfoEntityGUID;

                    revPersEntity._revInfoEntity = revPersEntityInfo;

                    if (revSelectedPicsFiles.length > 0) {
                        await revUploadEntiyPicsAlbum(revRetRemoteEntityGUID);
                    }

                    if (revSelectedVideoFiles.length > 0) {
                        await window.revLoadModules("revPluginModuleVideoAlbumPers", (revScriptModule) => {
                            window.revPluginModuleVideoAlbumPers.createVideoAlbum(revRetRemoteEntityGUID, revSelectedVideoFiles, (revResStatus) => {
                                console.log("FIN : createVideoAlbum");
                            });
                        });
                    }

                    let revMenuAreaCommsServices = await window.revGetMenuAreaView("revListingItemOptionsMenuArea", revPersEntity);
                    let revOverrideView = await window.revGetLoadedOverrideView("rev_kiwi", { revVarArgs: revPersEntity, revEntityPublishersArr: [window.REV_LOGGED_IN_ENTITY] });

                    let revActivityViewListItemWrapper = document.createElement("div");
                    revActivityViewListItemWrapper.className = "revActivityViewListItemWrapperStyle";
                    revActivityViewListItemWrapper.innerHTML = `
                    <div class="revActivityViewListItemWrapperStyle_Body">${revOverrideView}</div>
                    <div class="revActivityViewListItemWrapperStyle_Control">${revMenuAreaCommsServices}</div>
                `;

                    document.getElementById("revEntityActivityContentArea").insertBefore(revActivityViewListItemWrapper, document.getElementById("revEntityActivityContentArea").childNodes[1]);
                });
            } else {
                let revUpdateData = window.revEntityUdateData(revVarArgs, revPersEntity);

                console.log("revUpdateData : " + JSON.stringify(revUpdateData));

                window.revPostServerData(window.REV_UPDATE_METADATA_ARR_URL, { "filter": revUpdateData.revEntityUpdateMetaDataArr }, (revRetData) => {
                    console.log(JSON.stringify(revRetData));
                });
            }
        });
    });

    let revKiwiInputFormContainerStyle = "revKiwiInputFormContainer";

    if (revRemoteEntityGUID > 0) {
        revKiwiInputFormContainerStyle = "revKiwiInputFormContainer_Edit";
    }

    /** REV START CHAT SETTINGS */
    let revPublisherFormOptionalFooterAreaContainer_Id = "revPublisherFormOptionalFooterAreaContainer_Id_" + window.revGenUniqueId();

    let revChatSettingsForm = () => {
        let revCB_Public_Id = "revSelectedIconId_" + window.revGenUniqueId();
        let revCheckBoxPubliCallback = (revCBVarArgs) => {};

        let revCBVarArgsPublic = {
            "revCheckBoxCallback": revCheckBoxPubliCallback,
            "revCheckBoxId": revCB_Public_Id,
        };

        let revCheckBoxPublic = window.revGetCheckBox(revCBVarArgsPublic);

        let revPublisherFormOptionalFooterAreaContainerHideTab_Id = "revPublisherFormOptionalFooterAreaContainerHideTab_Id_" + window.revGenUniqueId();
        window.revSetInterval(revPublisherFormOptionalFooterAreaContainerHideTab_Id, () => {
            document.getElementById(revPublisherFormOptionalFooterAreaContainerHideTab_Id).addEventListener("click", (event) => {
                document.getElementById(revPublisherFormOptionalFooterAreaContainer_Id).innerHTML = "";
            });
        });

        return `
            <div class="revFlexContainer revPublisherFormOptionalFooterAreaContainer">
                <div class="revFontSizeNormalHeader revPublisherSettingsHeader">sEtTiNGs</div>
                <div class="revFlexWrapper revPublisherSettingsFormViewWrapper">
                    <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                        ${revCheckBoxPublic}
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">puBLic</div>
                    </div>
                    <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                        ${revCheckBoxPublic}
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">commENTs</div>
                    </div>
                    <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                        ${revCheckBoxPublic}
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">sHaREs</div>
                    </div>

                    <div id="${revPublisherFormOptionalFooterAreaContainerHideTab_Id}" class="revTabLink revFontSiteBlueTxtColor revHidePublisherSettingsTab">HiDE</div>
                </div>
            </div>
        `;
    };

    let revChatSettingsTab_Id = "revChatSettingsTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revChatSettingsTab_Id, () => {
        document.getElementById(revChatSettingsTab_Id).addEventListener("click", (event) => {
            window.revSetInterval(revPublisherFormOptionalFooterAreaContainer_Id, () => {
                document.getElementById(revPublisherFormOptionalFooterAreaContainer_Id).innerHTML = revChatSettingsForm();
            });
        });
    });
    /** REV END CHAT SETTINGS */

    /** REV START TAGS */
    let revKiwiTagsTab_Id = "revKiwiTagsTab_Id_" + window.revGenUniqueId();

    let revGetKiwiTagsForm = async () => {
        let revAddedTagsInput_Id = "revAddedTagsInput_Id_" + window.revGenUniqueId();

        window.revSetInterval(revAddedTagsInput_Id, () => {
            document.getElementById(revAddedTagsInput_Id).innerHTML = revAddedTagsArr.join("");
        });

        let revPublisherFormOptionalFooterAreaContainerHideTab_Id = "revPublisherFormOptionalFooterAreaContainerHideTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revPublisherFormOptionalFooterAreaContainerHideTab_Id, () => {
            document.getElementById(revPublisherFormOptionalFooterAreaContainerHideTab_Id).addEventListener("click", (event) => {
                document.getElementById(revPublisherFormOptionalFooterAreaContainer_Id).innerHTML = "";
            });
        });

        let revTagsInputForm = await revGetForm("revTagsInputForm", revAddedTagsArr);

        let revKiwiTagsForm = `
            <div class="revFlexContainer revPublisherFormOptionalFooterAreaContainer">
                <div id="${revAddedTagsInput_Id}" class="revFlexWrapper revAddedKiwiTagsWrapper"></div>
                <div class="revFlexWrapper revKiwiTagsPublisherFormFooterAreaWrapper">
                    <div class="revFlexContainer revKiwiTagsInputFormContainer">${revTagsInputForm}</div>
                    <div id="${revPublisherFormOptionalFooterAreaContainerHideTab_Id}" class="revTabLink revFontSiteBlueTxtColor revHideKiwiTagsPublisherTab">HiDE</div>
                </div>
            </div>
        `;

        return revKiwiTagsForm;
    };

    window.revSetInterval(revKiwiTagsTab_Id, () => {
        document.getElementById(revKiwiTagsTab_Id).addEventListener("click", async (event) => {
            document.getElementById(revPublisherFormOptionalFooterAreaContainer_Id).innerHTML = await revGetKiwiTagsForm();
        });
    });
    /** REV END TAGS */

    /** REV START HIDE EDIT SWITCH AREA */
    let revHideSwitchAreaTab = "";

    if (revRemoteEntityGUID > 0) {
        let revHideSwitchAreaTab_Id = "revHideSwitchAreaTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revHideSwitchAreaTab_Id, () => {
            document.getElementById(revHideSwitchAreaTab_Id).addEventListener("click", (event) => {
                window.revToggleSwitchArea(null);
            });
        });

        revHideSwitchAreaTab = `<div id="${revHideSwitchAreaTab_Id}" class="revTabLink revFontSiteBlueTxtColor revHideSwitchAreaTab">cancEL</div>`;
    }
    /** REV END HIDE EDIT SWITCH AREA */

    /* START REV INFO PICS ALBUM SELECT */
    let revPicsAlbumOverrideView = "";

    /** START edit update pics album  */
    let revPicsAlbumsArr = window.revGetEntityChildren_By_Subtype(revVarArgs._revEntityChildrenList, "rev_pics_album");

    if (Array.isArray(revPicsAlbumsArr)) {
        revInfoPicsAlbum = revPicsAlbumsArr[0];

        if (revInfoPicsAlbum && revInfoPicsAlbum._remoteRevEntityGUID && revInfoPicsAlbum._remoteRevEntityGUID > 0) {
            let revInfoPicsAlbumEntityGUID = revInfoPicsAlbum._remoteRevEntityGUID;

            let revPassVarArgs = window.revCloneJsObject(revInfoPicsAlbum);

            let revPicsAlbumEditCallBack = (revEditVarArgs) => {
                if (revEditVarArgs && revEditVarArgs.hasOwnProperty("revEntityDelPicItem")) {
                    revEntityDelPicsArr.push(revEditVarArgs.revEntityDelPicItem);
                    revInfoPicsAlbum = window.revRemoveEntityChild_By_EntityGUID(revInfoPicsAlbum, [revEditVarArgs.revEntityDelPicItem._remoteRevEntityGUID]);
                }
            };

            revPassVarArgs["revPicsAlbumEditCallBack"] = revPicsAlbumEditCallBack;
            revPassVarArgs["revIsEditable"] = true;
            revPassVarArgs["revAlbumPicsSize"] = "revListingUserIconBlock revImageItemStyle_Small";

            revPicsAlbumOverrideView = `<div class="revFlexWrapper revEditKiwiPicsAlbumWrapper">${await window.revGetLoadedOverrideView("rev_photo", revPassVarArgs)}</div>`;
        }
    }
    /** END edit update pics album */

    let revEmojiItemTab_Id = "revEmojiItemTab_Id_" + window.revGenUniqueId();
    let revEmojisPickerContainer_Id = "revEmojisPickerContainer_Id_" + window.revGenUniqueId();

    window.revSetInterval(revEmojiItemTab_Id, () => {
        document.getElementById(revEmojiItemTab_Id).addEventListener("click", (event) => {
            document.getElementById(revEmojisPickerContainer_Id).innerHTML = `<div class="revFlexContainer revEmojisPickerContainer"><emoji-picker></emoji-picker></div>`;
        });
    });

    return `
    <div class="revFlexContainer ${revKiwiInputFormContainerStyle}">
        <div class="revProfilePubArea">
            <div id="${revProfilePubAreaId}"></div>
        </div>

        <div id="${revPublisherFormOptionalFooterAreaContainer_Id}" class="revFlexContainer"></div>

        <div id="${revSelectedMediaWrapper_Id}" class="revSelectedMediaWrapper"></div>

        ${revPicsAlbumOverrideView}

        <div id="${revEmojisPickerContainer_Id}" class="revFlexContainer"></div>

        <div class="revFlexWrapper revPublisherTabsMenuWrapper">
            ${revFileExplorerMenuItem}
            <div id="${revEmojiItemTab_Id}" class="revTabLink revFontSizeLarge revEmojiItemTab"><i class="far fa-smile"></i></div>
            <div id="${revKiwiTagsTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeLarge revKiwiPostTags"><i class="fas fa-hashtag"></i></div>
            <div id="${revChatSettingsTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeLarge revKiwiPostSettingsTab"><i class="fas fa-cog"></i></div>
            <div id="${revPublishItemTabId}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPublishItemTab">puBLisH <span><i class="fas fa-level-up-alt"></i></span></div>
            ${revHideSwitchAreaTab}
        </div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
