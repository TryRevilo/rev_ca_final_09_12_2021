var revFormViewWidget = async (revVarArgs) => {
    let revStoreItem = revVarArgs.revStoreItem;
    let revStoreEntity = revVarArgs.revStoreEntity;

    let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

    let revSavedEntityGUID = -1;

    let revMainSelectedFileIndex = 0;

    let revEntityContainerGUID = -1;
    let revInfoPicsAlbumEntityGUID = -1;

    let revStoreEntityName = "";
    let revStoreEntityDesc = "";
    let revStoreEntityDescHTML = "";

    let revStoreItemEntityName = "";

    if (revVarArgs && revVarArgs.revStoreEntity && revVarArgs.revStoreEntity._revEntitySubType && revVarArgs.revStoreEntity._revEntitySubType.localeCompare("rev_store") == 0) {
        let revStoreEntity = revVarArgs.revStoreEntity;

        revSavedEntityGUID = revStoreEntity._remoteRevEntityGUID;
        revEntityContainerGUID = revStoreEntity._revEntityContainerGUID;

        revStoreEntityName = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_entity_name");

        revStoreEntityDesc = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_entity_desc_val");
        revStoreEntityDescHTML = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_entity_desc_html_value");

        /** REV START REV STORE ITEM DETAILS */
        let revMaxStrLen = 57;

        let revStoreItemEntityMetadataList = revStoreItem._revEntityMetadataList;

        revStoreItemEntityName = window.revGetMetadataValue(revStoreItemEntityMetadataList, "rev_entity_name");
        revStoreItemEntityName = window.revGetRawHTML(revStoreItemEntityName);
        revStoreItemEntityName = window.revTruncateString(revStoreItemEntityName, revMaxStrLen);
        /** REV END REV STORE ITEM DETAILS */
    } else {
        return "REV NULL";
    }

    /** REV START PROFILE PICS ALBUM */
    let revEntityDelPicsArr = [];

    let revGetEditablePicsAlbum = async (revParamsVarArgs) => {
        let revPicsAlbumOverrideView = "";

        if (!revParamsVarArgs) {
            return revPicsAlbumOverrideView;
        }

        /** START edit update pics album  */
        let revInfoPicsAlbum = window.revGetEntityChildren_By_Subtype(revParamsVarArgs._revEntityChildrenList, "rev_pics_album", 1);

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

            revPicsAlbumOverrideView = `<div class="revFlexWrapper revEditStoreItemPicsAlbumWrapper">${await window.revGetLoadedOverrideView("rev_photo", revPassVarArgs)}</div>`;
        }

        return revPicsAlbumOverrideView;
    };
    /** END edit update pics album */
    /** REV END PROFILE PICS ALBUM */

    /** REV START ITEM NAME */
    let revStoreNameInputId = "revStoreNameInputId_" + window.revGenUniqueId();

    let revMsgTitle = window.revInputText_Flat({
        "revId": revStoreNameInputId,
        "revInputTextHeader": false,
        "revBorderStyle": "revInputTextNoBorder",
        "revPlaceholderText": "mEssAGE TiTLE",
    });
    /** REV END ITEM NAME */

    /** REV START CONTACT SELLER PUBLISHER */
    let revMintFormAreaView_Id = "revMintFormAreaView_Id_" + window.revGenUniqueId();

    let revGetNewContactSellerPlaceholder = () => {
        let revContactSellerMsgInputAreaId = "revContactSellerMsgInputArea_" + window.revGenUniqueId();

        window.revSetInterval(revContactSellerMsgInputAreaId, () => {
            document.getElementById(revContactSellerMsgInputAreaId).addEventListener("click", async function (event) {
                let revPassVarArgs = window.revCloneJsObject(revVarArgs);

                revPassVarArgs["revPublisherFormHintText"] = "mEssAGE DETAiLs";

                revPassVarArgs["revCancelPublisherFormCallback"] = () => {
                    document.getElementById(revMintFormAreaView_Id).innerHTML = revGetNewContactSellerPlaceholder();
                };

                revPassVarArgs["revFilesSelectedCallback"] = (revFiles) => {
                    console.log("revFiles : " + JSON.stringify(revFiles));
                };

                revPassVarArgs["revPublisherPublishCallback"] = (revPassParams) => {
                    revPersEntitymintMessageVal = revPassParams.revEditorPlainText;
                    revPersEntitymintMessageVal_HTML = revPassParams.revEditorHTML;

                    revSavePersEntity();
                };

                let revContactSellerMsgFormView = await window.revGetForm("revPublisherForm", revPassVarArgs);
                document.getElementById(revMintFormAreaView_Id).innerHTML = `<div class="revFlexContainer">${revContactSellerMsgFormView}</div>`;
            });
        });

        return `<div id="${revContactSellerMsgInputAreaId}" class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">&nbsp;&nbsp;&nbsp;&nbsp;mEssAGE DETAiLs</div>`;
    };

    /** REV END CONTACT SELLER PUBLISHER */

    /* START REV ICON SELECT */
    let revSelectedFiles = [];

    let revUploadInfoPicsAlbum = async (revUploadVarArgs) => {
        if (!revUploadVarArgs || !revUploadVarArgs.revContainerEntityGUID || revUploadVarArgs.revContainerEntityGUID < 1) {
            return;
        }

        /** REV START PROFILE PICS ALBUM */
        let revFiles = revUploadVarArgs.revFiles;
        let revFileType = revUploadVarArgs.revFileType;
        let revContainerEntityGUID = revUploadVarArgs.revContainerEntityGUID;
        let revMainSelectedFileIndex = revUploadVarArgs.revMainSelectedFileIndex;

        let revFileObjectsArr = [];

        for (let i = 0; i < revFiles.length; i++) {
            let revFile = revFiles[i];

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

        if (revFileObjectsArr.length == 0) {
            return;
        }

        let revIsNewEntity = true;

        if (revInfoPicsAlbumEntityGUID > 0) {
            revIsNewEntity = false;
        }

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
    };

    let revEntityIconSelectDraw_Id = "revEntityIconSelectDraw_Id_" + window.revGenUniqueId();

    let revStoreIconsVarArgs = {};
    revStoreIconsVarArgs["revSelectFileText"] = "Pictures";
    revStoreIconsVarArgs["revEntityIconSelectDrawId"] = revEntityIconSelectDraw_Id;
    revStoreIconsVarArgs["revSelectFileId"] = "revSelectFileId";

    revStoreIconsVarArgs["revFilesSelectedCallback"] = (revSelectedFilesVarArgs) => {
        revSelectedFiles = revSelectedFilesVarArgs.revSelectedFiles;
        revMainSelectedFileIndex = revSelectedFilesVarArgs.revMainSelectedFileIndex;

        if (revSelectedFilesVarArgs.revMainSelectedFileIndex == null) {
            document.getElementById(revEntityIconSelectDraw_Id).innerHTML = "";
            return;
        }

        let revSelectedFile = revSelectedFiles[revSelectedFilesVarArgs.revMainSelectedFileIndex];

        if (!revSelectedFile) {
            document.getElementById(revEntityIconSelectDraw_Id).innerHTML = "";
            return;
        }

        document.getElementById(revEntityIconSelectDraw_Id).innerHTML = window.revReadFileToImageFromPath(revSelectedFile, "revListingUserIconBlock");
    };

    let revEntityIconSelectionArea = await window.revEntityIconSelectionArea(revStoreIconsVarArgs);
    /* END REV ICON SELECT */

    /** REV ITEM START  DESC */
    let revNewStoreDescDetailsId = "revNewStoreDescDetailsId_" + window.revGenUniqueId();

    let revStoreItemDescDetailsQuill;

    window.revSetInterval(revNewStoreDescDetailsId, () => {
        revStoreItemDescDetailsQuill = window.revNewQuill(revNewStoreDescDetailsId, "Store Description (optional)");
        revStoreItemDescDetailsQuill.root.innerHTML = revStoreEntityDescHTML;
    });

    let revPersEntityItemDesc = `
        <div class="revFlexContainer">
            <div class="revFlexContainer revContactSellerDescAreaContainer">
                <div class="revFlexWrapper revContactSellerMsgTtle">${revMsgTitle}</div>

                <div class="revContactSellerMsgDescDetailsArea">
                    <div id="${revMintFormAreaView_Id}">${revGetNewContactSellerPlaceholder()}</div>
                </div>
            </div>
            <div class="revFlexWrapper revContactSellerSelectItemMainIconWrapper">${revEntityIconSelectionArea}</div>
        </div>
    `;
    /** REV END ITEM DESC */

    /** REV START STORE ITEM MEDIA */
    let revStoreEntityChilds = revStoreItem._revEntityChildrenList;

    let revPicsAlbum = window.revGetEntityChildren_By_Subtype(revStoreEntityChilds, "rev_pics_album", 1);
    let revVidsAlbum = window.revGetEntityChildren_By_Subtype(revStoreEntityChilds, "rev_vids_album", 1);

    let revGetEntityMediaView = async () => {
        let revEntityPicsAlbumOverrideView = "";
        let revEntityVidsAlbumOverrideView = "";

        let revMediaKiwiView = "";

        let revImagesRemainder = "";

        if (revPicsAlbum) {
            let revPassVarArgsPicsAlbum = window.revCloneJsObject(revPicsAlbum);
            revPassVarArgsPicsAlbum["revAlbumPicsSize"] = "revListingUserIconBlock revImageItemStyle_Small";

            revEntityPicsAlbumOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPassVarArgsPicsAlbum);

            let revImagesCount = revPicsAlbum._revEntityChildrenList.length;

            if (revImagesCount > 13) {
                revImagesRemainder = `<div class="revImagesCount">+${revImagesCount - 13} moRE pics</div>`;
            }
        }

        if (revVidsAlbum) {
            revEntityVidsAlbumOverrideView = await window.revGetLoadedOverrideView("revVideosListingOverrideView", revVidsAlbum);
        }

        if (revEntityPicsAlbumOverrideView || revEntityVidsAlbumOverrideView) {
            revMediaKiwiView = `
            <div class="revFlexContainer revContactSellerItemMediaContainer">
                ${revEntityPicsAlbumOverrideView}
                ${revEntityVidsAlbumOverrideView}
                ${revImagesRemainder}
            </div>
            `;
        }

        return revMediaKiwiView;
    };
    /** REV END STORE ITEM MEDIA */

    let revSaveStoreItemEntity = async () => {
        let revPersEntity = window.REV_ENTITY_STRUCT();
        revPersEntity._revEntityResolveStatus = 0;
        revPersEntity._revEntityChildableStatus = 301;
        revPersEntity._revEntityType = "revObject";
        revPersEntity._revEntitySubType = "rev_store";
        revPersEntity._remoteRevEntityGUID = revSavedEntityGUID;
        revPersEntity._revEntityOwnerGUID = revLoggedInEntityGUID;
        revPersEntity._revEntityContainerGUID = -1;
        revPersEntity._revTimeCreated = new Date().getTime();

        /** REV START ADMIN MEMBERS REL */
        if (!window.revArrIncludesElement(revAdminMembersGUIDsArr, revLoggedInEntityGUID)) {
            revAdminMembersGUIDsArr.push(revLoggedInEntityGUID);
        }

        for (let i = 0; i < revAdminMembersGUIDsArr.length; i++) {
            let revAdminMemberGUID = revAdminMembersGUIDsArr[i];

            if (revAdminMemberGUID < 1) {
                continue;
            }

            let revAdminMemberRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
            revAdminMemberRel._revEntityRelationshipType = "rev_store_msg_to";
            revAdminMemberRel._revOwnerGUID = revLoggedInEntityGUID;
            revAdminMemberRel._revEntityTargetGUID = revPersEntity._remoteRevEntityGUID;
            revAdminMemberRel._remoteRevEntityTargetGUID = revPersEntity._remoteRevEntityGUID;
            revAdminMemberRel._revEntitySubjectGUID = revAdminMemberGUID;
            revAdminMemberRel._remoteRevEntitySubjectGUID = revAdminMemberGUID;

            revPersEntity._revTargetEntityRelationships.push(revAdminMemberRel);
        }
        /** REV END ADMIN MEMBERS REL */

        /** REV START STORE NAME */
        let revStoreName = window.revGetTextInputVal(revStoreNameInputId);

        if (revStoreName) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_name", revStoreName));
        }
        /** REV END STORE NAME */

        /** REV START STORE DESC */
        let revStoreItemDescDetails = revStoreItemDescDetailsQuill.getText();

        if (revStoreItemDescDetails) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc", revStoreItemDescDetails));
        }
        /** REV END STORE DESC */

        /** REV START STORE HTML DESC */
        let revStoreItemDescDetailsHTML = revStoreItemDescDetailsQuill.root.innerHTML;

        if (revStoreItemDescDetailsHTML) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_html", revStoreItemDescDetailsHTML));
        }
        /** REV END STORE HTML DESC */

        // await window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, { filter: [revPersEntity] }, async (revRetData) => {
        //     revSavedEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;
        //     revPersEntity._remoteRevEntityGUID = revSavedEntityGUID;

        //     console.log("revRetData : " + JSON.stringify(revRetData));

        //     if (revSavedEntityGUID > 0) {
        //         revUploadInfoPicsAlbum({
        //             "revFiles": revSelectedFiles,
        //             "revFileType": "rev_store_icon",
        //             "revMainSelectedFileIndex": revMainSelectedFileIndex,
        //             "revContainerEntityGUID": revSavedEntityGUID,
        //         });
        //     }
        // });
    };

    /** REV START ITEM SUBMIT FORM FOOTER */
    let revSubmitNewStoreItemTab_Id = "revSubmitNewStoreItemTab_Id_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revFormSubmitTab({
        "revId": revSubmitNewStoreItemTab_Id,
        "revIcon": '<i class="fa fa-arrow-right"></i>',
        "revTitle": "sEND mEssAGE",
        "revSubmitCallback": () => {
            revSaveStoreItemEntity();
        },
    });
    /** REV END ITEM SUBMIT FORM FOOTER */

    /** REV START HEADER AREA */
    let revHeaderTx = "coNTAcT sELlER";

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSelectStore" } });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader(revHeaderTx);
    /** REV END HEADER AREA */

    let revStoreItemTab_Id = "revStoreItemTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revStoreItemTab_Id, () => {
        document.getElementById(revStoreItemTab_Id).addEventListener("click", async (event) => {
            let revObjectStoreItem = await window.revGetLoadedPageView("revObjectStoreItem", revStoreItem);
            window.revDrawMainContentArea({ "revData": revStoreItem, "revLoadedPageView": revObjectStoreItem, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revRetView = `
        <div class="revFlexContainer">
            <div class="revFlexContainer revPageHeaderAreaContainer">
                <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
                <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
                ${revPageHeader}
            </div>
            <div class="revFlexContainer revContactSellerWidgetContainer">
                <div class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revContactSellerBriefStoreNameWrapper">
                    <div class="revFlexWrapper revStoreItemObjectViewBuyOptionsDividerWrapper">
                        <div class="revSmall-H-Line"></div>
                        <div class="revTiny-V-Line"></div>
                    </div>
                    <div class="revFontSizeLarge"><i class="fas fa-store-alt"></i></div>
                    <div class="revFlexWrapper revStoreItemObjectViewBuyOptionsDividerWrapper">
                        <div class="revTiny-V-Line"></div>
                        <div class="revSmall-H-Line"></div>
                    </div>
                    <div class="revFontSizeNormal revContactSellerStoreEntityBriefStoreName">${revStoreEntityName}</div>
                    <div class="revFlexWrapper revStoreItemObjectViewBuyOptionsDividerWrapper">
                        <div class="revSmall-H-Line"></div>
                        <div class="revTiny-V-Line"></div>
                        <div class="revSmall-H-Line"></div>
                    </div>
                    <div class="revFontSiteGreyTxtColor revFlexWrapper revContactSellerStoreItemCostWrapper">
                        <div class="revFontSizeNormal">$</div>
                        <div class="revFontSizeLarge revContactSellerStoreItemCostTxt">122</div>
                    </div>
                </div>

                ${await revGetEntityMediaView()}

                <div id="${revStoreItemTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revStoreItemEntityNameWrapper">
                    <div class="revFontSizeNormalHeader"><i class="fas fa-level-up-alt revRotate90"></i></div>
                    <div class="revFlexWrapper revStoreItemEntityNameTxtWrapper">${revStoreItemEntityName}</div>
                </div>

                ${revPersEntityItemDesc}

                <div class="revFlexWrapper revContactSellerFormFooter">
                    ${revFormSubmitTab}
                </div>
            </div>
        </div>
    `;

    return revRetView;
};

module.exports.revFormViewWidget = revFormViewWidget;
