var revFormViewWidget = async (revVarArgs) => {
    let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

    let revSavedEntityGUID = -1;

    let revSelectedPicsAlbumFiles = [];
    let revMainSelectedFileIndex = 0;

    let revEntityContainerGUID = -1;
    let revInfoPicsAlbumEntityGUID = -1;

    let revEntityName = "";
    let revEntityDesc = "";
    let revEntityDescHTML = "";

    let revItemCondition = "";
    let revItemConditionDesc = "";
    let revItemConditionDetailHTML = "";

    let revStoreShippingValue = "";
    let revStoreShippingValueDetails = "";
    let revStoreShippingValueDetailsHTML = "";

    let revStoreReturnPolicyValue = "";
    let revStoreReturnPolicyDetailsValue = "";
    let revStoreReturnPolicyDetailsValueHTML = "";

    if (revVarArgs && revVarArgs.revStoreEntity && revVarArgs.revStoreEntity._revEntitySubType && revVarArgs.revStoreEntity._revEntitySubType.localeCompare("rev_store") == 0) {
        let revStoreEntity = revVarArgs.revStoreEntity;

        revSavedEntityGUID = revStoreEntity._remoteRevEntityGUID;
        revEntityContainerGUID = revStoreEntity._revEntityContainerGUID;

        revEntityName = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_entity_name");

        revEntityDesc = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_entity_desc_val");
        revEntityDescHTML = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_entity_desc_val_html");

        revStoreShippingValue = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_store_shipping_value");

        revStoreShippingValueDetails = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_shipping_details");
        revStoreShippingValueDetailsHTML = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_store_shipping_details_value");

        revStoreReturnPolicyValue = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_store_return_policy_value");

        revStoreReturnPolicyDetailsValue = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_store_return_policy_details_value");
        revStoreReturnPolicyDetailsValueHTML = window.revGetMetadataValue(revStoreEntity._revEntityMetadataList, "rev_store_return_policy_details_html_value");

        let revInfoPicsAlbum = window.revGetEntityChildren_By_Subtype(revStoreEntity._revEntityChildrenList, "rev_pics_album", 1);

        if (revInfoPicsAlbum && revInfoPicsAlbum._remoteRevEntityGUID && revInfoPicsAlbum._remoteRevEntityGUID > 0) {
            revInfoPicsAlbumEntityGUID = revInfoPicsAlbum._remoteRevEntityGUID;
        }
    } else {
        revEntityContainerGUID = revVarArgs._remoteRevEntityGUID;
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

    /** REV START ADMINS */
    let revAdminMembersGUIDsArr = [];

    let revStoreAdminEntitiesArr = [];

    if (revVarArgs.revStoreAdminEntitiesArr) {
        revStoreAdminEntitiesArr = revStoreAdminEntitiesArr.concat(revVarArgs.revStoreAdminEntitiesArr);
    }

    for (let i = 0; i < revStoreAdminEntitiesArr.length; i++) {
        revAdminMembersGUIDsArr.push(revStoreAdminEntitiesArr[i]._remoteRevEntityGUID);
    }

    let revGetUserIcon = (revEntity, revIconArea_Id) => {
        window.revSetInterval(revIconArea_Id, () => {
            let revEntityInfo = revEntity._revInfoEntity;

            window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
                let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revEntityInfo);
                revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

                let revProfileIconView = `<img class="revListingIconCurvedTiny" src="${revProfileIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;

                document.getElementById(revIconArea_Id).innerHTML = revProfileIconView;
            });
        });
    };

    let revAddSelectedMintConvMemberGUID = (revGUIDsArr, revEntityGUID) => {
        window.revRemoveArrElement(revAdminMembersGUIDsArr, revEntityGUID);

        if (!window.revArrIncludesElement(revGUIDsArr, revEntityGUID) && revLoggedInEntityGUID !== revEntityGUID) {
            revGUIDsArr.push(revEntityGUID);
        }
    };

    let revDrawSelectedMintConvMembers = async (revSelectedAdminMembersListingWrapper) => {
        let revGetRemoteAdminGUIDsArr = [];

        for (let i = 0; i < revAdminMembersGUIDsArr.length; i++) {
            let revGetEntity = window.revGetRevEntity_FROM_ARR_BY_GUID(revStoreAdminEntitiesArr, revAdminMembersGUIDsArr[i]);

            if (!revGetEntity) {
                revGetRemoteAdminGUIDsArr.push(revAdminMembersGUIDsArr[i]);
            }
        }

        try {
            let url = window.REV_SITE_BASE_PATH + "/rev_api/rev_get_flat_entity_info_wrapper?rev_items=" + revGetRemoteAdminGUIDsArr.join(",");

            let revData = await window.revGetServerData_JSON_Async(url);
            let revAddedAdminMembersArr = revData.filter;

            revStoreAdminEntitiesArr = revStoreAdminEntitiesArr.concat(revAddedAdminMembersArr);

            let revMintConvMembersIconsArr = [];
            let revMintConvTargetMembersIconsArr = [];

            for (let i = 0; i < revStoreAdminEntitiesArr.length; i++) {
                if (!revStoreAdminEntitiesArr[i]) {
                    continue;
                }

                let revEntityImport = revStoreAdminEntitiesArr[i];

                if (revEntityImport) {
                    let revSelectMintConTabIconContainer_Id = "revSelectMintConTabIconContainer_Id_" + window.revGenUniqueId();
                    let revAdminMemberDelTab_Id = "revAdminMemberDelTab_Id_" + window.revGenUniqueId();

                    window.revSetInterval(revAdminMemberDelTab_Id, () => {
                        document.getElementById(revAdminMemberDelTab_Id).addEventListener("click", (event) => {
                            window.revRemoveArrElement(revAdminMembersGUIDsArr, revEntityImport._remoteRevEntityGUID);

                            document.getElementById(revSelectMintConTabIconContainer_Id).remove();
                        });
                    });

                    let revAdminMemberDelTab = `
                        <div id="${revAdminMemberDelTab_Id}" class="revTabLink revFlexWrapper revAdminMemberDelTabWrapper">
                            <div class="revFontSiteRedTxtColor revFontSizeTiny revAdminMemberDelTab"><i class="far fa-trash-alt"></i></div>
                        </div>
                    `;

                    let revAdminMemberIcon_Id = "revAdminMemberIcon_Id_" + window.revGenUniqueId();

                    revGetUserIcon(revEntityImport, revAdminMemberIcon_Id);

                    revMintConvMembersIconsArr.push(`
                        <div id="${revSelectMintConTabIconContainer_Id}" class="revFlexContainer revSelectMintConTabIconContainer">
                            ${revAdminMemberDelTab}
                            <div id="${revAdminMemberIcon_Id}" class="revComposeAdminMemberEntityIcon"></div>
                        </div>
                    `);
                }
            }

            let revAdminMembersView = "";

            if (revMintConvMembersIconsArr.length > 0) {
                revAdminMembersView = `<div class="revFlexWrapper revFlexWrapperScroll revSelectedAdminSubjectsMembersWrapper">${revMintConvMembersIconsArr.join("")}</div>`;
            }

            let revAdminTargetMembersView = "";

            if (revMintConvTargetMembersIconsArr.length > 0) {
                revAdminTargetMembersView = `
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revSelectedAdminTargetMembersDividerIcon"><i class="fas fa-arrows-alt-h"></i></div>
                <div class="revFlexWrapper revFlexWrapperScroll revSelectedAdminTargetMembersIconsWrapper">${revMintConvTargetMembersIconsArr.join("")}</div>
                `;
            }

            let revLoggedInEntityMintConvMember_Id = "revLoggedInEntityMintConvMember_Id_" + window.revGenUniqueId();

            revGetUserIcon(window.REV_LOGGED_IN_ENTITY, revLoggedInEntityMintConvMember_Id);

            let revLoggedInEntityMintConvMemberIconView = `
            <div class="revFlexWrapper revLoggedInEntityMintConvMemberIconViewWrapper">
                <div id="${revLoggedInEntityMintConvMember_Id}" class="revListingIconCurvedTiny revSelectedAdminEntityIcon"></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fas fa-arrow-right"></i></div>
            </div>`;

            window.revSetInterval(revSelectedAdminMembersListingWrapper, () => {
                document.getElementById(revSelectedAdminMembersListingWrapper).innerHTML = `
                    <div class="revFlexWrapper revFlexWrapperScroll revSelectedAdminMembersIconsWrapper">
                        ${revLoggedInEntityMintConvMemberIconView + revAdminMembersView + revAdminTargetMembersView}
                    </div>
                `;
            });
        } catch (error) {
            console.log("revFormViewComposeMintMsgWidget.js -> revStoreAdminEntitiesArr " + error);
        }
    };

    let revInitAdminMembers = async (revAdminGUIDsArr, revSelectedAdminMembersListingWrapper) => {
        /** REV START IMPORT CONTACTS */
        let revPassVarArgs_ImporPhoneBooktCcts = window.revCloneJsObject(revVarArgs.revStoreEntity);

        let revImportPhoneBookContactsCallback = async (revImportedPhoneccts) => {
            let url = window.REV_SITE_BASE_PATH + "/rev_api/get_metadata_entity_guids?rev_metadata_vals=" + revImportedPhoneccts.join() + "&revPluginHookContextsRemoteArr=revHookRemoteGetMetadaValPublishers";
            try {
                revData = await window.revGetServerData_JSON_Async(url);
                revData = revData.filter;

                for (let i = 0; i < revData.length; i++) {
                    if (!revData[i] || !revData[i].revEntity) continue;

                    let revEntityImport = revData[i].revEntity;

                    if (revEntityImport) {
                        revAddSelectedMintConvMemberGUID(revAdminGUIDsArr, revEntityImport._remoteRevEntityGUID);
                    }
                }
            } catch (error) {
                console.log("revFormViewComposeMintMsgWidget.js -> revData.filter " + error);
            }

            window.revToggleSwitchArea(null);
            window.revToggleSwitchArea(await revInitAdminMembers(revAdminGUIDsArr));
        };

        let revSelectableContacts_Id = "revSelectableContacts_Id_" + window.revGenUniqueId();

        let revPageContentAreaRendererCallback = (revCallbackHTML) => {
            window.revSetInterval(revSelectableContacts_Id, () => {
                document.getElementById(revSelectableContacts_Id).innerHTML = revCallbackHTML;
            });
        };

        revPassVarArgs_ImporPhoneBooktCcts["revImportPhoneBookContactsCallback"] = revImportPhoneBookContactsCallback;
        revPassVarArgs_ImporPhoneBooktCcts["revPageContentAreaRendererCallback"] = revPageContentAreaRendererCallback;
        revPassVarArgs_ImporPhoneBooktCcts["revImportedPhoneccts"] = revAdminGUIDsArr;

        let revMenuAreaImportContacts = await window.revGetMenuAreaView("revMenuAreaImportContacts", revPassVarArgs_ImporPhoneBooktCcts);
        /** REV END IMPORT CONTACTS */

        let revCommitMintMessageMembersTab_Id = "revCommitMintMessageMembersTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revCommitMintMessageMembersTab_Id, () => {
            document.getElementById(revCommitMintMessageMembersTab_Id).addEventListener("click", (event) => {
                revDrawSelectedMintConvMembers(revSelectedAdminMembersListingWrapper);
                window.revToggleSwitchArea(null);
            });
        });

        /** REV START SELECTABLE CONTACTS */
        let revSelectableContactsCallback = (revSelectedArr) => {
            for (let i = 0; i < revSelectedArr.length; i++) {
                revAddSelectedMintConvMemberGUID(revAdminGUIDsArr, revSelectedArr[i]);
            }
        };

        let revSelectableContacts = await window.revGetForm("revSelectableContacts", { "revSelectableContactsCallback": revSelectableContactsCallback });
        /** REV END SELECTABLE CONTACTS */

        /** REV START CANCEL */
        let revShareCancelTab_Id = "revShareCancelTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revShareCancelTab_Id, () => {
            document.getElementById(revShareCancelTab_Id).addEventListener("click", (event) => {
                revAdminGUIDsArr.length = 0;
                window.revToggleSwitchArea();
            });
        });
        /** REV END CANCEL */

        let revSelectableContactsFormView = `
        <div id="${revSelectableContacts_Id}" class="revFlexContainer revSelectableCctsContainer">
            <div class="revFlexWrapper revShareHeaderAreaWrapper">
                <div id="${revCommitMintMessageMembersTab_Id}" class="revTabLink revFlexWrapper revShareTabWrapper">
                    <div class="revSmalllBoldWhite revShareTabTxt">aDD</div>
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fa fa-arrow-right"></i></div>
                </div>
                <div id="${revShareCancelTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revShareCancelTab">cANcEL</div>
                <div class="revImportccts">${revMenuAreaImportContacts}</div>
            </div>

            <div class="revFlexContainer revKiwiContactsContainer">
                ${revSelectableContacts}
            </div>
        </div>
        `;

        return revSelectableContactsFormView;
    };

    let revNewAdmins = () => {
        let revMintMessageMembersTab_Id = "revMintMessageMembersTab_Id_" + window.revGenUniqueId();

        let revSelectedAdminMembersListingWrapper_Id = "revSelectedAdminMembersListingWrapper_Id" + window.revGenUniqueId();

        revDrawSelectedMintConvMembers(revSelectedAdminMembersListingWrapper_Id);

        window.revSetInterval(revMintMessageMembersTab_Id, () => {
            document.getElementById(revMintMessageMembersTab_Id).addEventListener("click", async (event) => {
                window.revToggleSwitchArea(await revInitAdminMembers(revAdminMembersGUIDsArr, revSelectedAdminMembersListingWrapper_Id));
            });
        });

        return `
        <div class="revFlexWrapper revAdminsSelectionAreaWrapper">
            <div id="${revSelectedAdminMembersListingWrapper_Id}" class="revFlexWrapper revSelectedAdminMembersListingWrapper"></div>
            <div id="${revMintMessageMembersTab_Id}" class="revTabLink revFlexWrapper revAddAdminEntityIconsWrapper">
                <div class="revFontSiteBlueTxtColor revFontSizeMedium"><i class="fa fa-plus"></i></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revAddMintTags">aDmiNs</div>
            </div>
        </div>
        `;
    };
    /** REV END ADMINS */

    /** REV START ITEM NAME */
    let revStoreNameInputId = "revStoreNameInputId_" + window.revGenUniqueId();

    let revStoreItemName = window.revInputText_Flat({
        "revId": revStoreNameInputId,
        "revInputTextHeader": false,
        "revBorderStyle": "revInputTextNoBorder",
        "revPlaceholderText": "Name Of Store ( required )",
        "revTextValue": revEntityName,
    });
    /** REV END ITEM NAME */

    /** REV ITEM START  DESC */
    let revNewStoreDescDetailsId = "revNewStoreDescDetailsId_" + window.revGenUniqueId();

    let revStoreItemDescDetailsQuill;

    window.revSetInterval(revNewStoreDescDetailsId, () => {
        revStoreItemDescDetailsQuill = window.revNewQuill(revNewStoreDescDetailsId, "Store Description (optional)");
        revStoreItemDescDetailsQuill.root.innerHTML = revEntityDescHTML;
    });

    let revPersEntityItemDesc = `
        <div class="revFlexContainer">
            <div class="revStoreItemDescArea">
                ${revStoreItemName}

                <div class="revNewStoreItemDescDetailsArea">
                    <div id="${revNewStoreDescDetailsId}" class="revQuillPubArea"></div>
                </div>
            </div>
            ${await revGetEditablePicsAlbum(revVarArgs)}
            <div class="revFlexWrapper revSelectItemMainIconWrapper">${revEntityIconSelectionArea}</div>
        </div>
    `;
    /** REV END ITEM DESC */

    /** REV START ITEM SHIPPING */
    let revStoreItemShippingId = "revStoreItemShippingId_" + window.revGenUniqueId();
    let revStoreItemShippingInputTxt = window.revInputText_Flat({
        "revId": revStoreItemShippingId,
        "revInputTextHeader": false,
        "revBorderStyle": "revInputTextNoBorder",
        "revPlaceholderText": "Where do you ship to by default ? ( required )",
        "revTextValue": revStoreShippingValue,
    });

    let revStoreItemShippingDetailsId = "revStoreItemShippingDetailsId_" + window.revGenUniqueId();

    let revTextingQuillItemShippingDetails;

    window.revSetInterval(revStoreItemShippingDetailsId, () => {
        revTextingQuillItemShippingDetails = window.revNewQuill(revStoreItemShippingDetailsId, "Default Shipping Deatails (optional)");
        revTextingQuillItemShippingDetails.root.innerHTML = revStoreShippingValueDetailsHTML;
    });

    let revPersEntityShippingDesc = `
        <div class="revFlexContainer">
            <div class="revStoreItemDescArea">
                ${revStoreItemShippingInputTxt}

                <div class="revNewStoreItemDescDetailsArea">
                    <div id="${revStoreItemShippingDetailsId}" class="revQuillPubArea"></div>
                </div>
            </div>
        </div>
    `;
    /** REV END ITEM SHIPPING */

    /** REV START ITEM RETURN POLICY */
    let revStoreItemReturnPolicyId = "revStoreItemReturnPolicyId_" + window.revGenUniqueId();

    let revStoreItemReturnPolicyInputTxt = window.revInputText_Flat({
        "revId": revStoreItemReturnPolicyId,
        "revInputTextHeader": false,
        "revBorderStyle": "revInputTextNoBorder",
        "revPlaceholderText": "Default Return Policy ( required )",
        "revTextValue": revStoreReturnPolicyValue,
    });

    let revStoreItemReturnPolicyDetailsId = "revStoreItemReturnPolicyDetailsId_" + window.revGenUniqueId();

    let revTextingQuillItemReturnPolicyDetails;

    window.revSetInterval(revStoreItemReturnPolicyDetailsId, () => {
        revTextingQuillItemReturnPolicyDetails = window.revNewQuill(revStoreItemReturnPolicyDetailsId, "Default Return Policy Deatails (optional)");
        revTextingQuillItemReturnPolicyDetails.root.innerHTML = revStoreReturnPolicyDetailsValueHTML;
    });

    let revPersEntityReturnPolicyDesc = `
        <div class="revFlexContainer">
            <div class="revStoreItemDescArea">
                ${revStoreItemReturnPolicyInputTxt}

                <div class="revNewStoreItemDescDetailsArea">
                    <div id="${revStoreItemReturnPolicyDetailsId}" class="revQuillPubArea"></div>
                </div>
            </div>
        </div>
    `;
    /** REV END ITEM RETURN POLICY */

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
            revAdminMemberRel._revEntityRelationshipType = "rev_admin_of";
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
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_val", revStoreItemDescDetails));
        }
        /** REV END STORE DESC */

        /** REV START STORE HTML DESC */
        let revStoreItemDescDetailsHTML = revStoreItemDescDetailsQuill.root.innerHTML;

        if (revStoreItemDescDetailsHTML) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_val_html", revStoreItemDescDetailsHTML));
        }
        /** REV END STORE HTML DESC */

        /** REV START STORE SHIPMENT */
        let revStoreItemShipping = window.revGetTextInputVal(revStoreItemShippingId);

        if (revStoreItemShipping) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_store_shipping_value", revStoreItemShipping));
        }
        /** REV END STORE SHIPMENT */

        /** REV START STORE SHIPMENT DESC */
        let revItemShippingDetails = revTextingQuillItemShippingDetails.getText();

        if (revItemShippingDetails) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_store_shipping_details_value", revItemShippingDetails));
        }
        /** REV END STORE SHIPMENT DESC */

        /** REV START STORE SHIPMENT DESC HTML */
        let revItemShippingDetailsHTML = revStoreItemDescDetailsQuill.root.innerHTML;

        if (revItemShippingDetailsHTML) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_store_shipping_details_html_value", revItemShippingDetailsHTML));
        }
        /** REV END STORE SHIPMENT DESC HTML */

        /** REV START STORE RETURN POLICY */
        let revStoreItemReturnPolicy = window.revGetTextInputVal(revStoreItemReturnPolicyId);

        if (revStoreItemReturnPolicy) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_store_return_policy_value", revStoreItemReturnPolicy));
        }
        /** REV END STORE RETURN POLICY */

        /** REV START STORE RETURN POLICY DESC */
        let revItemReturnPolicyDetails = revTextingQuillItemReturnPolicyDetails.getText();

        if (revItemReturnPolicyDetails) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_store_return_policy_details_value", revItemReturnPolicyDetails));
        }
        /** REV END STORE RETURN POLICY DESC */

        /** REV START STORE RETURN POLICY DESC HTML */
        let revItemReturnPolicyDetailsHTML = revTextingQuillItemReturnPolicyDetails.root.innerHTML;

        if (revItemReturnPolicyDetailsHTML) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_store_return_policy_details_html_value", revItemReturnPolicyDetailsHTML));
        }
        /** REV END STORE RETURN POLICY DESC HTML */

        if (revSavedEntityGUID < 1) {
            await window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, { filter: [revPersEntity] }, async (revRetData) => {
                revSavedEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;
                revPersEntity._remoteRevEntityGUID = revSavedEntityGUID;
                let revSelectStoreForm = await window.revGetForm("revSelectStore", { "revStoreEntitiesArr": [revPersEntity] });
                document.getElementById("revPageHome").innerHTML = revSelectStoreForm;
            });
        } else {
            revPersEntity._revEntityMetadataList = window.revRemoveMetadata_By_NameId(revPersEntity._revEntityMetadataList, ["rev_entity_views_count_stats_wrapper", "rev_entity_answers_count_stats_wrapper", "rev_entity_views_count_stats_wrapper"]);

            let revPersEntityUpdateData = window.revEntityUdateData(revVarArgs.revStoreEntity, revPersEntity);

            /** REV START UPDATE RELS */
            let revNewRelsArr = [];
            let revDelRelGUIDsArr = [];

            let revTargetEntityRelationshipsArr = revPersEntity._revTargetEntityRelationships;

            // end rev new admin rels
            let revCurrAdminsArrGUIDsArr = [];

            if (revVarArgs.revStoreAdminEntitiesArr) {
                for (let i = 0; i < revVarArgs.revStoreAdminEntitiesArr.length; i++) {
                    let revStoreAdmin = revVarArgs.revStoreAdminEntitiesArr[i];

                    revCurrAdminsArrGUIDsArr.push(revStoreAdmin._remoteRevEntityGUID);
                }
            }

            for (let i = 0; i < revTargetEntityRelationshipsArr.length; i++) {
                let revTargetEntityRelationship = revTargetEntityRelationshipsArr[i];

                if (!window.revArrIncludesElement(revCurrAdminsArrGUIDsArr, revTargetEntityRelationship._remoteRevEntitySubjectGUID)) {
                    revNewRelsArr.push(revTargetEntityRelationship);
                }
            }

            if (revNewRelsArr.length > 0) {
                revPersEntityUpdateData["revNewRelsArr"] = revNewRelsArr;
            }
            // end rev new admin rels

            // rev del admin rels
            if (revVarArgs.revStoreAdminEntitiesArr) {
                for (let i = 0; i < revVarArgs.revStoreAdminEntitiesArr.length; i++) {
                    let revAdminMembersGUID = revVarArgs.revStoreAdminEntitiesArr[i]._remoteRevEntityGUID;

                    if (!window.revArrIncludesElement(revAdminMembersGUIDsArr, revAdminMembersGUID)) {
                        revDelRelGUIDsArr.push(revAdminMembersGUID);
                    }
                }

                if (revDelRelGUIDsArr.length > 0) {
                    revPersEntityUpdateData["revDelRelGUIDsArr"] = revDelRelGUIDsArr;
                }
            }
            /** REV END UPDATE RELS */

            if (!window.revIsEmptyJSONObject(revPersEntityUpdateData)) {
                revPersEntityUpdateData["revEntityGUID"] = revSavedEntityGUID;

                let revURL = window.REV_SITE_BASE_PATH + "/rev_base_api_post?revPluginHookContextsRemoteArr=revHookRemoteHandler_UpdateStoreEntity";

                window.revPostServerData(revURL, { "revPersEntityUpdateData": revPersEntityUpdateData }, (revRetData) => {
                    console.log("revRetData : " + JSON.stringify(revRetData));
                });
            }
        }

        if (revInfoPicsAlbumEntityGUID > 0) {
            await revUploadInfoPicsAlbum({
                "revFiles": revSelectedFiles,
                "revFileType": "rev_store_icon",
                "revMainSelectedFileIndex": revMainSelectedFileIndex,
                "revContainerEntityGUID": revInfoPicsAlbumEntityGUID,
            });

            /** REV START DEL PICS FILES */
            let revEntityDelPicsGUIDsArr = [];

            for (let i = 0; i < revEntityDelPicsArr.length; i++) {
                revEntityDelPicsGUIDsArr.push(revEntityDelPicsArr[i]._remoteRevEntityGUID);
            }

            if (revEntityDelPicsGUIDsArr.length > 0) {
                window.revPostServerData(window.REV_DELETE_REV_ENTITY_WITH_CHILDS_URL, { filter: revEntityDelPicsGUIDsArr }, (revRetData) => {
                    console.log("DEL revRetData :" + JSON.stringify(revRetData));
                });
            }
            /** REV END DEL PICS FILES */
        } else {
            if (revSavedEntityGUID > 0) {
                await revUploadInfoPicsAlbum({
                    "revFiles": revSelectedFiles,
                    "revFileType": "rev_store_icon",
                    "revMainSelectedFileIndex": revMainSelectedFileIndex,
                    "revContainerEntityGUID": revSavedEntityGUID,
                });
            }
        }
    };

    /** REV START ITEM SUBMIT FORM FOOTER */
    let revSubmitNewStoreItemTab_Id = "revSubmitNewStoreItemTab_Id_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revFormSubmitTab({
        "revId": revSubmitNewStoreItemTab_Id,
        "revIcon": '<i class="fa fa-arrow-right"></i>',
        "revTitle": "NEXT",
        "revSubmitCallback": () => {
            revSaveStoreItemEntity();
        },
    });
    /** REV END ITEM SUBMIT FORM FOOTER */

    /** REV START HEADER AREA */
    let revHeaderTx = "Create New Store";

    if (revSavedEntityGUID > 0) {
        revHeaderTx = "upDatE stoRE";
    }

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSelectStore" } });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader(revHeaderTx);
    /** REV END HEADER AREA */

    let revRetView = `
        <div class="revFlexContainer">
            <div class="revFlexContainer revPageHeaderAreaContainer">
                <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
                <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
                ${revPageHeader}
            </div>
            <div class="revFlexContainer revContactSellerWidgetContainer">
                <div class="revFlexContainer revAdminsSelectionAreaContainer">
                    <div class="rev_HRule_5em"></div>
                    ${revNewAdmins()}
                    <div class="rev_HRule_5em"></div>
                </div>
                ${revPersEntityItemDesc}
                ${revPersEntityShippingDesc}
                ${revPersEntityReturnPolicyDesc}

                <div class="revNewStoreItemFormFooter">
                    ${revFormSubmitTab}
                </div>
            </div>
        </div>
    `;

    return revRetView;
};

module.exports.revFormViewWidget = revFormViewWidget;
