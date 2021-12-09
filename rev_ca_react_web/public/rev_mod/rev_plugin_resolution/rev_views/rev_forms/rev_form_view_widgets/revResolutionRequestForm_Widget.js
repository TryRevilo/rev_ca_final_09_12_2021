var revFormViewWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        console.log("ERR -> revRequestStoreSaleResolutionForm_Widget -> !revVarArgs");
        return;
    }

    let revAddedTagsArr = [];

    if (revVarArgs.revAddedTagsArr) {
        revAddedTagsArr = revAddedTagsArr.concat(revVarArgs.revAddedTagsArr);
    } else {
        revAddedTagsArr = window.revGetMetadataValuesArr(revVarArgs._revEntityMetadataList, "rev_tag");
    }

    let revServiceDescription = "";

    if (revVarArgs.revServiceDescription) {
        revServiceDescription = " abouT " + revVarArgs.revServiceDescription;
    }

    let revInfoEntity;
    let revInfoEntityGUID = -1;

    let revSelectedPicsAlbumFiles = [];
    let revMainSelectedFileIndex = 0;

    let revRemoteEntityGUID = -1;
    let revEntityContainerGUID = -1;
    let revInfoPicsAlbumEntityGUID = -1;

    let revEntityName = "";
    let revEntityDesc = "";

    if (revVarArgs && revVarArgs._revEntitySubType && revVarArgs._revEntitySubType.localeCompare("rev_StoreSaleResolution") == 0) {
        revRemoteEntityGUID = revVarArgs._remoteRevEntityGUID;
        revEntityContainerGUID = revVarArgs._revEntityContainerGUID;

        if (revVarArgs._revInfoEntity) {
            revInfoEntity = revVarArgs._revInfoEntity;

            revEntityName = window.revGetMetadataValue(revInfoEntity._revEntityMetadataList, "rev_entity_name");
            revEntityDesc = window.revGetMetadataValue(revInfoEntity._revEntityMetadataList, "rev_entity_desc_html");

            revInfoEntityGUID = revInfoEntity._remoteRevEntityGUID;

            let revPicsAlbumsArr = window.revGetEntityChildren_By_Subtype(revInfoEntity._revEntityChildrenList, "rev_pics_album");

            if (Array.isArray(revPicsAlbumsArr)) {
                revInfoPicsAlbum = revPicsAlbumsArr[0];

                if (revInfoPicsAlbum && revInfoPicsAlbum._remoteRevEntityGUID && revInfoPicsAlbum._remoteRevEntityGUID > 0) {
                    revInfoPicsAlbumEntityGUID = revInfoPicsAlbum._remoteRevEntityGUID;
                }
            }
        }
    } else {
        revEntityContainerGUID = revVarArgs._remoteRevEntityGUID;
    }

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);

    let revPageHeaderTxt = "rEQuEsT foR commuNiTy ResoLuTioN" + revServiceDescription;

    if (revRemoteEntityGUID > 0) {
        revPageHeaderTxt = "updAte rEQuEsT foR commuNiTy ResoLuTioN" + revServiceDescription;
    }

    let revPageHeader = window.revPageHeader(revPageHeaderTxt);
    /** REV END HEADER AREA */

    let revStoreSaleResolutionTitleInput_Id = "revStoreSaleResolutionTitleInput_Id_" + window.revGenUniqueId();

    let revStoreSaleResolutionTitleInput = window.revInputText({
        "revId": revStoreSaleResolutionTitleInput_Id,
        "revIcon": '<div class="revStoreSaleResolutionFormTitleIcon"><i class="fas fa-exclamation revFontSizeNormal"></i></div>',
        "revTitle": "",
        "revPlaceholderText": "suBJEcT issuE . . .",
    });

    window.revSetInterval(revStoreSaleResolutionTitleInput_Id, () => {
        document.getElementById(revStoreSaleResolutionTitleInput_Id).value = revEntityName;
    });

    let revSubmitStoreSaleResolution_Id = "revSubmitStoreSaleResolution_Id_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revFormSubmitTab({
        "revId": revSubmitStoreSaleResolution_Id,
        "revIcon": '<i class="fa fa-arrow-right"></i>',
        "revTitle": "puBLisH",
        "revSubmitCallback": async () => {
            revSavePersEntity();

            // let revObjectViewStoreSaleResolution = await window.revGetLoadedPageView("revObjectViewStoreSaleResolution", revVarArgs);
            // window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revObjectViewStoreSaleResolution, "revFloatingOptionsMenuName": "123" });
        },
    });

    let revStoreSaleResolutionDetailsArea_Id = "revStoreSaleResolutionDetailsArea_Id";

    let revEntityDescQuill;

    window.revSetInterval(revStoreSaleResolutionDetailsArea_Id, () => {
        revEntityDescQuill = window.revNewQuill(revStoreSaleResolutionDetailsArea_Id, "issuE DeTAiLs . . .");
        revEntityDescQuill.root.innerHTML = revEntityDesc;
    });

    /** REV START PROFILE PICS ALBUM */
    let revEntityDelPicsArr = [];

    let revGetEditablePicsAlbum = async (revParamsVarArgs) => {
        let revPicsAlbumOverrideView = "";

        if (!revParamsVarArgs) {
            return revPicsAlbumOverrideView;
        }

        /** START edit update pics album  */
        let revPicsAlbumsArr = window.revGetEntityChildren_By_Subtype(revParamsVarArgs._revEntityChildrenList, "rev_pics_album");

        if (Array.isArray(revPicsAlbumsArr)) {
            revInfoPicsAlbum = revPicsAlbumsArr[0];

            if (revInfoPicsAlbum && revInfoPicsAlbum._remoteRevEntityGUID && revInfoPicsAlbum._remoteRevEntityGUID > 0) {
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

        return revPicsAlbumOverrideView;
    };

    /** END edit update pics album */
    let revEntityIconSelectionAreaVarArgs = {};
    revEntityIconSelectionAreaVarArgs["revSelectFileText"] = "picTuREs / FiLEs";

    let revEntityIconSelectDraw_Id = "revEntityIconSelectDraw_Id_" + window.revGenUniqueId();
    revEntityIconSelectionAreaVarArgs["revEntityIconSelectDrawId"] = revEntityIconSelectDraw_Id;

    revEntityIconSelectionAreaVarArgs["revFilesSelectedCallback"] = (revSelectedPicsAlbumFilesVarArgs) => {
        revSelectedPicsAlbumFiles = revSelectedPicsAlbumFilesVarArgs.revSelectedFiles;
        revMainSelectedFileIndex = revSelectedPicsAlbumFilesVarArgs.revMainSelectedFileIndex;

        if (revSelectedPicsAlbumFilesVarArgs.revMainSelectedFileIndex == null) {
            document.getElementById(revEntityIconSelectDraw_Id).innerHTML = "";
            return;
        }

        let revSelectedFile = revSelectedPicsAlbumFiles[revSelectedPicsAlbumFilesVarArgs.revMainSelectedFileIndex];

        if (!revSelectedFile) {
            document.getElementById(revEntityIconSelectDraw_Id).innerHTML = "";
            return;
        }

        document.getElementById(revEntityIconSelectDraw_Id).innerHTML = window.revReadFileToImageFromPath(revSelectedFile, "revListingUserIconBlock");
    };

    revEntityIconSelectionAreaVarArgs["revSelectFileId"] = "revSelectFileId";

    let revEntityIconSelectionArea = await window.revEntityIconSelectionArea(revEntityIconSelectionAreaVarArgs);
    /** REV END PROFILE PICS ALBUM */

    let revUploadInfoPicsAlbum = async (revContainerEntityGUID) => {
        let revFileObjectsArr = [];

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

    let revSavePersEntity = async () => {
        revVarArgs._revEntityMetadataList = window.revRemoveMetadata_By_NameId(revVarArgs._revEntityMetadataList, ["rev_entity_views_count_stats_wrapper", "rev_entity_answers_count_stats_wrapper", "rev_entity_views_count_stats_wrapper"]);

        let revPersEntity = window.REV_ENTITY_STRUCT();
        revPersEntity._remoteRevEntityGUID = revRemoteEntityGUID;
        revPersEntity._revEntityResolveStatus = 0;
        revPersEntity._revEntityType = "revObject";
        revPersEntity._revEntitySubType = "rev_store_sale_resolution";
        revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntity._revEntityContainerGUID = revEntityContainerGUID;
        revPersEntity._revEntityChildableStatus = 3;
        revPersEntity._revTimeCreated = new Date().getTime();

        if (revAddedTagsArr.length > 0) {
            for (let i = 0; i < revAddedTagsArr.length; i++) {
                let revCurrTag = revAddedTagsArr[i];

                if (!window.revStringEmpty(revCurrTag)) {
                    let revTagMetadata = window.revMetadataFiller("rev_tag", revCurrTag);
                    revTagMetadata._revIsUnique = false;

                    revPersEntity._revEntityMetadataList.push(revTagMetadata);
                }
            }
        } else {
            console.log("You need to add at least one TAG");
            return;
        }

        /** START REV INFO */
        let revPersInfoEntity = window.REV_ENTITY_STRUCT();
        revPersInfoEntity._remoteRevEntityGUID = revInfoEntityGUID;
        revPersInfoEntity._revEntityResolveStatus = 0;
        revPersInfoEntity._revEntityChildableStatus = 3;
        revPersInfoEntity._revEntityType = "revObject";
        revPersInfoEntity._revEntitySubType = "rev_entity_info";
        revPersInfoEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersInfoEntity._revEntityContainerGUID = revPersEntity._remoteRevEntityGUID;
        revPersInfoEntity._revEntityChildableStatus = 3;
        revPersInfoEntity._revTimeCreated = new Date().getTime();
        /** END REV INFO */

        /** REV START REV ENTITY NAME */
        let revPersEntityName = window.revGetTextInputVal(revStoreSaleResolutionTitleInput_Id);

        if (revPersEntityName) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_name", revPersEntityName));
        }
        /** REV END REV ENTITY NAME */

        /** REV START REV ENTITY DESC */
        let revPersEntityDesc = revEntityDescQuill.getText();

        if (revPersEntityDesc) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc", revPersEntityDesc));
        }
        /** REV END REV ENTITY DESC */

        /** REV START ENTITY HTML DESC */
        let revPersEntityDescHTML = revEntityDescQuill.root.innerHTML;

        if (revPersEntityDescHTML) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_html", revPersEntityDescHTML));
        }
        /** REV END ENTITY HTML DESC */

        /** REV START ATTACH INFO */
        revPersEntity._revInfoEntity = revPersInfoEntity;
        /** REV END ATTACH INFO */

        if (revRemoteEntityGUID < 1) {
            await window.revPostServerData(window.REV_CREATE_NEW_AD_REV_ENTITY_URL, { filter: [revPersEntity] }, async (revRetData) => {
                let revRetEntity = revRetData.filter[0];

                let revRetRemoteEntityGUID = revRetEntity._remoteRevEntityGUID;
                revPersEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;

                let revInfoEntityGUID = revRetEntity.revInfoEntityGUID;

                revPersInfoEntity._revEntityContainerGUID = revRetRemoteEntityGUID;
                revPersInfoEntity._revEntityRemoteContainerGUID = revRetRemoteEntityGUID;
                revPersInfoEntity._remoteRevEntityGUID = revInfoEntityGUID;

                revPersEntity._revEntityChildrenList.push(revPersInfoEntity);
            });
        } else {
            revPersEntity._revEntityMetadataList = window.revRemoveMetadata_By_NameId(revPersEntity._revEntityMetadataList, ["rev_entity_views_count_stats_wrapper", "rev_entity_answers_count_stats_wrapper", "rev_entity_views_count_stats_wrapper"]);

            let revPersEntityUpdateData = window.revEntityUdateData(revVarArgs, revPersEntity);
            let revPersInfoUpdateData = window.revEntityUdateData(revInfoEntity, revPersInfoEntity);

            let revEntityUpdateDataArr = [];

            revEntityUpdateDataArr.push(revPersEntityUpdateData);
            revEntityUpdateDataArr.push(revPersInfoUpdateData);

            window.revPostServerData(window.REV_UPDATE_REV_ENTITIES_DATA_URL, { filter: revEntityUpdateDataArr }, (revData) => {
                console.log(JSON.stringify(revData));
            });
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
            if (revInfoEntityGUID > 0) {
                revUploadInfoPicsAlbum(revInfoEntity._remoteRevEntityGUID);
            }
        }
    };

    let revTagsInputForm = await revGetForm("revTagsInputForm", revAddedTagsArr);

    let revAdView = `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
            ${revPageHeader}
        </div>
        <div class="revFlexContainer revNewStoreSaleResolutionWidgetContainer">
            ${revStoreSaleResolutionTitleInput}
            <div class="revStoreSaleResolutionDetailsArea">
                <div id="${revStoreSaleResolutionDetailsArea_Id}" class="revQuillPubArea"></div>
                <div class="revFlexWrapper revStoreSaleResolutionTagsFormWrapper">
                    <div class="revSmall-H-Line"></div>
                    <div class="revFlexContainer revStoreSaleResolutionTagsFormContainer">${revTagsInputForm}</div>
                </div>
            </div>
            ${await revGetEditablePicsAlbum(revInfoEntity)}
            <div class="revFlexWrapper revSelectStoreSaleResolutionPicsWrapper">${revEntityIconSelectionArea}</div>
            <div class="revFlexContainer revRequestStoreSaleRes_MsgsContainer">
                <div class="revTabLink revFontSiteBlueTxtColor revRequestStoreSaleRes_MsgsCount">17 mEssAGEs</div>
                <div class="revFlexWrapper revFontSiteRedTxtColor revRequestStoreSaleRes_MsgsTellTxtWrapper">Please note that ALL correspondences for this sale will be made public. This is to help for a fair and informed resolution</div>
            </div>
            <div class="revFlexWrapper revRequestStoreSaleResFormFooterWrapper">
                ${revFormSubmitTab}
            </div>
        </div>
    </div>
    `;

    return revAdView;
};

module.exports.revFormViewWidget = revFormViewWidget;
