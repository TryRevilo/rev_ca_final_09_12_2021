var revFormViewWidget = async (revVarArgs) => {
    if (!revVarArgs.revSelectedStore) {
        let revSelectStoreForm = await window.revGetForm("revSelectStore", null);
        return revSelectStoreForm;
    }

    let revSelectedStore = revVarArgs.revSelectedStore;

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

    let revShipping = "";
    let revShippingDetails = "";
    let revShippingDetailsHTML = "";

    let revReturnPolicy = "";
    let revReturnPolicyDetails = "";
    let revReturnPolicyDetailsHTML = "";

    if (revVarArgs && revVarArgs._revEntitySubType && revVarArgs._revEntitySubType.localeCompare("rev_store_item") == 0) {
        revSavedEntityGUID = revVarArgs._remoteRevEntityGUID;
        revEntityContainerGUID = revVarArgs._revEntityContainerGUID;

        revEntityName = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_entity_name");

        revEntityDesc = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_entity_desc");
        revEntityDescHTML = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_entity_desc_html");

        revItemCondition = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_item_condition");
        revItemConditionDesc = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_item_condition_desc");
        revItemConditionDetailHTML = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_item_condition_detail_html");

        revShipping = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_shipping");
        revShippingDetails = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_shipping_details");
        revShippingDetailsHTML = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_shipping_details_html");

        revReturnPolicy = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_return_policy");
        revReturnPolicyDetails = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_return_policy_details");
        revReturnPolicyDetailsHTML = window.revGetMetadataValue(revVarArgs._revEntityMetadataList, "rev_return_policy_details_html");

        let revInfoPicsAlbum = window.revGetEntityChildren_By_Subtype(revVarArgs._revEntityChildrenList, "rev_pics_album", 1);

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

    let revEntityNameInputId = "revEntityNameInputId_" + window.revGenUniqueId();

    let revEntityNameInput = window.revInputText_Flat({
        "revId": revEntityNameInputId,
        "revInputTextHeader": false,
        "revBorderStyle": "revInputTextNoBorder",
        "revPlaceholderText": "Name Of Item ( required )",
        "revTextValue": revEntityName,
    });

    /** START REV ITEM DESC */
    let revEntityDescInputId = "revEntityDescInputId_" + window.revGenUniqueId();

    let revEntityDescQuill;

    window.revSetInterval(revEntityDescInputId, () => {
        revEntityDescQuill = window.revNewQuill(revEntityDescInputId, "Item Description Details (optional)");
        revEntityDescQuill.root.innerHTML = revEntityDescHTML;
    });

    let revEntityDescInputArea = `
        <div class="revFlexContainer">
            <div class="revStoreItemDescArea">
                ${revEntityNameInput}

                <div class="revNewStoreItemDescDetailsArea">
                    <div id="${revEntityDescInputId}" class="revQuillPubArea"></div>
                </div>
            </div>
            ${await revGetEditablePicsAlbum(revVarArgs)}
            <div class="revFlexWrapper revSelectItemMainIconWrapper">${revEntityIconSelectionArea}</div>
        </div>
    `;

    /** END REV ITEM DESC */

    /** START REV ITEM CONDITION */
    let revStoreItemConditionInputId = "revStoreItemConditionId_" + window.revGenUniqueId();

    let revStoreItemCondition = window.revInputText_Flat({
        "revId": revStoreItemConditionInputId,
        "revInputTextHeader": false,
        "revBorderStyle": "revInputTextNoBorder",
        "revPlaceholderText": "Condition - used / new etc . . . ( required )",
        "revTextValue": revItemCondition,
    });

    let revStoreItemConditionDetailId = "revStoreItemConditionDetailId_" + window.revGenUniqueId();

    let revTextingQuillItemConditionDetail;

    window.revSetInterval(revStoreItemConditionDetailId, () => {
        revTextingQuillItemConditionDetail = window.revNewQuill(revStoreItemConditionDetailId, "Item Condition Deatails (optional)");
        revTextingQuillItemConditionDetail.root.innerHTML = revItemConditionDetailHTML;
    });

    let revStoreEntityConditionItemDesc = `
        <div class="revFlexContainer">
            <div class="revStoreItemDescArea">
                ${revStoreItemCondition}

                <div class="revNewStoreItemDescDetailsArea">
                    <div id="${revStoreItemConditionDetailId}" class="revQuillPubArea"></div>
                </div>
            </div>
        </div>
    `;
    /** END REV ITEM CONDITION */

    /** START REV ITEM SHIPPING */
    let revStoreItemShippingId = "revStoreItemShippingId_" + window.revGenUniqueId();

    let revStoreItemShippingInputTxt = window.revInputText_Flat({
        "revId": revStoreItemShippingId,
        "revInputTextHeader": false,
        "revBorderStyle": "revInputTextNoBorder",
        "revPlaceholderText": "Where do you ship to ? ( required )",
        "revTextValue": revShipping,
    });

    let revStoreItemShippingDetailsId = "revStoreItemShippingDetailsId_" + window.revGenUniqueId();

    let revTextingQuillItemShippingDetails;

    window.revSetInterval(revStoreItemShippingDetailsId, () => {
        revTextingQuillItemShippingDetails = window.revNewQuill(revStoreItemShippingDetailsId, "Shipping Deatails (optional)");
        revTextingQuillItemShippingDetails.root.innerHTML = revShippingDetailsHTML;
    });

    let revStoreEntityShippingDesc = `
        <div class="revFlexContainer">
            <div class="revStoreItemDescArea">
                ${revStoreItemShippingInputTxt}

                <div class="revNewStoreItemDescDetailsArea">
                    <div id="${revStoreItemShippingDetailsId}" class="revQuillPubArea"></div>
                </div>
            </div>
        </div>
    `;
    /** END REV ITEM SHIPPING */

    /** START REV ITEM RETURN POLICY */
    let revStoreItemReturnPolicyId = "revStoreItemReturnPolicyId_" + window.revGenUniqueId();

    let revStoreItemReturnPolicyInputTxt = window.revInputText_Flat({
        "revId": revStoreItemReturnPolicyId,
        "revInputTextHeader": false,
        "revBorderStyle": "revInputTextNoBorder",
        "revPlaceholderText": "Return Policy ( required )",
        "revTextValue": revReturnPolicy,
    });

    let revStoreItemReturnPolicyDetailsId = "revStoreItemReturnPolicyDetailsId_" + window.revGenUniqueId();

    let revTextingQuillItemReturnPolicyDetails;

    window.revSetInterval(revStoreItemShippingDetailsId, () => {
        revTextingQuillItemReturnPolicyDetails = window.revNewQuill(revStoreItemReturnPolicyDetailsId, "Return Policy Deatails (optional)");
        revTextingQuillItemReturnPolicyDetails.root.innerHTML = revReturnPolicyDetailsHTML;
    });

    let revStoreEntityReturnPolicyDesc = `
        <div class="revFlexContainer">
            <div class="revStoreItemDescArea">
                ${revStoreItemReturnPolicyInputTxt}

                <div class="revNewStoreItemDescDetailsArea">
                    <div id="${revStoreItemReturnPolicyDetailsId}" class="revQuillPubArea"></div>
                </div>
            </div>
        </div>
    `;
    /** END REV ITEM RETURN POLICY */

    /** START REV ITEM SUBMIT FORM FOOTER */

    let revSavePersEntity = async () => {
        let revPersEntity = window.REV_ENTITY_STRUCT();
        revPersEntity._revEntityResolveStatus = 0;
        revPersEntity._revEntityChildableStatus = 301;
        revPersEntity._revEntityType = "revObject";
        revPersEntity._revEntitySubType = "rev_store_item";
        revPersEntity._remoteRevEntityGUID = -1;
        revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntity._revEntityContainerGUID = revSelectedStore._remoteRevEntityGUID;
        revPersEntity._revTimeCreated = new Date().getTime();

        /** REV START REV ENTITY NAME */
        let revPersEntityName = window.revGetTextInputVal(revEntityNameInputId);

        if (revPersEntityName) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_name", revPersEntityName));
        }
        /** REV END REV ENTITY NAME */

        /** REV START REV ENTITY DESC */
        let revPersEntityDesc = revEntityDescQuill.getText();

        if (revPersEntityDesc) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc", revPersEntityDesc));
        }
        /** REV END REV ENTITY DESC */

        /** REV START STORE HTML DESC */
        let revPersEntityDescHTML = revEntityDescQuill.root.innerHTML;

        if (revPersEntityDescHTML) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_html", revPersEntityDescHTML));
        }
        /** REV END STORE HTML DESC */

        /** REV START ITEM CONDITION */
        let revStoreItemCondition = window.revGetTextInputVal(revStoreItemConditionInputId);

        if (revStoreItemCondition) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_item_condition", revStoreItemCondition));
        }
        /** REV END ITEM CONDITION */

        /** REV START ITEM CONDITION DESC */
        let revItemConditionDesc = revTextingQuillItemConditionDetail.getText();

        if (revItemConditionDesc) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_item_condition_desc", revItemConditionDesc));
        }
        /** REV END ITEM CONDITION DESC */

        /** REV START REV ITEM CONDITION HTML DESC */
        let revItemConditionDetailHTML = revTextingQuillItemConditionDetail.root.innerHTML;

        if (revItemConditionDetailHTML) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_item_condition_detail_html", revItemConditionDetailHTML));
        }
        /** REV END REV ITEM CONDITION HTML DESC */

        /** REV START STORE SHIPMENT */
        let revStoreItemShipping = window.revGetTextInputVal(revStoreItemShippingId);

        if (revStoreItemShipping) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_shipping", revStoreItemShipping));
        }
        /** REV END STORE SHIPMENT */

        /** REV START STORE SHIPMENT DESC */
        let revItemShippingDetails = revTextingQuillItemShippingDetails.getText();

        if (revItemShippingDetails) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_shipping_details", revItemShippingDetails));
        }
        /** REV END STORE SHIPMENT DESC */

        /** REV START STORE SHIPMENT DESC HTML */
        let revItemShippingDetailsHTML = revEntityDescQuill.root.innerHTML;

        if (revItemShippingDetailsHTML) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_shipping_details_html", revItemShippingDetailsHTML));
        }
        /** REV END STORE SHIPMENT DESC HTML */

        /** REV START STORE RETURN POLICY */
        let revStoreItemReturnPolicy = window.revGetTextInputVal(revStoreItemReturnPolicyId);

        if (revStoreItemReturnPolicy) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_return_policy", revStoreItemReturnPolicy));
        }
        /** REV END STORE RETURN POLICY */

        /** REV START STORE RETURN POLICY DESC */
        let revItemReturnPolicyDetails = revTextingQuillItemReturnPolicyDetails.getText();

        if (revItemReturnPolicyDetails) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_return_policy_details", revItemReturnPolicyDetails));
        }
        /** REV END STORE RETURN POLICY DESC */

        /** REV START STORE RETURN POLICY DESC HTML */
        let revItemReturnPolicyDetailsHTML = revTextingQuillItemReturnPolicyDetails.root.innerHTML;

        if (revItemReturnPolicyDetailsHTML) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_return_policy_details_html", revItemReturnPolicyDetailsHTML));
        }
        /** REV END STORE RETURN POLICY DESC HTML */

        if (revSavedEntityGUID < 1) {
            await window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, { filter: [revPersEntity] }, async (revRetData) => {
                revSavedEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;
                revPersEntity._remoteRevEntityGUID = revSavedEntityGUID;
                let revOnPaymentCallbackMethod = async (revCalbackVarArgs) => {
                    await window.revGetLoadedPageViewAreaContainer("revObjectStoreItem", revPersEntity, (_revView) => {
                        document.getElementById("revPageHome").innerHTML = _revView;
                    });
                };
                let revSelectPaymentOptionForm = await window.revGetForm("revSelectPaymentOption", { "revEntity": revPersEntity, "revOnPaymentCallbackMethod": revOnPaymentCallbackMethod });
                document.getElementById("revPageHome").innerHTML = revSelectPaymentOptionForm;
            });
        } else {
            revPersEntity._revEntityMetadataList = window.revRemoveMetadata_By_NameId(revPersEntity._revEntityMetadataList, ["rev_entity_views_count_stats_wrapper", "rev_entity_answers_count_stats_wrapper", "rev_entity_views_count_stats_wrapper"]);

            let revPersEntityUpdateData = window.revEntityUdateData(revVarArgs, revPersEntity);

            let revEntityUpdateDataArr = [];

            revEntityUpdateDataArr.push(revPersEntityUpdateData);

            window.revPostServerData(window.REV_UPDATE_REV_ENTITIES_DATA_URL, { filter: revEntityUpdateDataArr }, (revData) => {
                console.log(JSON.stringify(revData));
            });
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

            window.revPostServerData(window.REV_DELETE_REV_ENTITY_WITH_CHILDS_URL, { filter: revEntityDelPicsGUIDsArr }, (revRetData) => {
                console.log("DEL revRetData :" + JSON.stringify(revRetData));
            });
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

    let revSubmitPersEntityTabId = "revSubmitPersEntityTabId_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revFormSubmitTab({
        "revId": revSubmitPersEntityTabId,
        "revIcon": '<i class="fa fa-arrow-right"></i>',
        "revTitle": "NEXT",
        "revSubmitCallback": revSavePersEntity,
    });
    /** END REV ITEM SUBMIT FORM FOOTER */

    /** REV START HEADER AREA */
    let revHeaderTx = "LisT NEw sToRE iTEm";

    if (revSavedEntityGUID > 0) {
        revHeaderTx = "EDiT sToRE iTEm";
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
                ${revEntityDescInputArea}
                ${revStoreEntityConditionItemDesc}
                ${revStoreEntityShippingDesc}
                ${revStoreEntityReturnPolicyDesc}
        
                <div class="revNewStoreItemFormFooter">
                    ${revFormSubmitTab}
                </div>
            </div>
        </div>
    `;

    return revRetView;
};

module.exports.revFormViewWidget = revFormViewWidget;
