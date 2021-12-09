var revFormViewWidget = async (revVarArgs) => {
    let revMintFormAreaView_Id = "revMintFormAreaView_Id_" + window.revGenUniqueId();

    let revFamilyKiwiVal = "";
    let revFamilyKiwiVal_HTML = "";

    let revAccessFamilyMemberRelsArr = [];
    let revMintConversationTargetMembersGUIDsArr = [];

    if (revVarArgs.revImportedPhoneccts) {
        revAccessFamilyMemberRelsArr = revVarArgs.revImportedPhoneccts;
    }

    if (revVarArgs.revMintConversationTargetMembersGUIDsArr) {
        revMintConversationTargetMembersGUIDsArr = revVarArgs.revMintConversationTargetMembersGUIDsArr;
    }

    let revAddSelectedMintConvMemberGUID = (revGUIDsArr, revEntityGUID) => {
        window.revRemoveArrElement(revAccessFamilyMemberRelsArr, revEntityGUID);

        // If conv.target only add as conv.target
        if (window.revArrIncludesElement(revMintConversationTargetMembersGUIDsArr, revEntityGUID)) {
            return;
        }

        if (!window.revArrIncludesElement(revGUIDsArr, revEntityGUID) && window.REV_LOGGED_IN_ENTITY_GUID !== revEntityGUID) {
            revGUIDsArr.push(revEntityGUID);
        }
    };

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

    let revDrawSelectedMintConvMembers = async (revSelectedMintConvMembersListingWrapper) => {
        let revTotSelectedMembers = [];
        revTotSelectedMembers = revTotSelectedMembers.concat(revAccessFamilyMemberRelsArr);
        revTotSelectedMembers = revTotSelectedMembers.concat(revMintConversationTargetMembersGUIDsArr);

        let url = window.REV_SITE_BASE_PATH + "/rev_api/rev_get_flat_entity_info_wrapper?rev_items=" + revTotSelectedMembers.join(",");

        try {
            let revData = await window.revGetServerData_JSON_Async(url);
            let revAddedMintConversationMembersArr = revData.filter;

            let revMintConvMembersIconsArr = [];
            let revMintConvTargetMembersIconsArr = [];

            for (let i = 0; i < revAddedMintConversationMembersArr.length; i++) {
                if (!revAddedMintConversationMembersArr[i] || !revAddedMintConversationMembersArr[i].revRetEntity) continue;

                let revEntityImport = revAddedMintConversationMembersArr[i].revRetEntity;

                if (revEntityImport) {
                    let revSelectMintConTabIconContainer_Id = "revSelectMintConTabIconContainer_Id_" + window.revGenUniqueId();
                    let revMintConversationMemberDelTab_Id = "revMintConversationMemberDelTab_Id_" + window.revGenUniqueId();

                    window.revSetInterval(revMintConversationMemberDelTab_Id, () => {
                        document.getElementById(revMintConversationMemberDelTab_Id).addEventListener("click", (event) => {
                            window.revRemoveArrElement(revAccessFamilyMemberRelsArr, revEntityImport._remoteRevEntityGUID);
                            window.revRemoveArrElement(revMintConversationTargetMembersGUIDsArr, revEntityImport._remoteRevEntityGUID);

                            document.getElementById(revSelectMintConTabIconContainer_Id).remove();
                        });
                    });

                    let revMintConversationMemberDelTab = `
                    <div id="${revMintConversationMemberDelTab_Id}" class="revTabLink revFlexWrapper revMintConversationMemberDelTabWrapper">
                        <div class="revFontSiteRedTxtColor revFontSizeTiny revMintConversationMemberDelTab"><i class="far fa-trash-alt"></i></div>
                    </div>`;

                    let revEntityImportGUID = revEntityImport._remoteRevEntityGUID;

                    let revMintConversationMemberIcon_Id = "revMintConversationMemberIcon_Id_" + window.revGenUniqueId();

                    revGetUserIcon(revEntityImport, revMintConversationMemberIcon_Id);

                    if (window.revArrIncludesElement(revMintConversationTargetMembersGUIDsArr, revEntityImportGUID)) {
                        revMintConvTargetMembersIconsArr.push(`
                        <div id="${revSelectMintConTabIconContainer_Id}" class="revFlexContainer revSelectMintConTabIconContainer">
                            ${revMintConversationMemberDelTab}
                            <div id="${revMintConversationMemberIcon_Id}" class="revComposeMintConversationMemberEntityIcon"></div>
                        </div>`);
                    } else {
                        revMintConvMembersIconsArr.push(`
                        <div id="${revSelectMintConTabIconContainer_Id}" class="revFlexContainer revSelectMintConTabIconContainer">
                            ${revMintConversationMemberDelTab}
                            <div id="${revMintConversationMemberIcon_Id}" class="revComposeMintConversationMemberEntityIcon"></div>
                        </div>`);
                    }
                }
            }

            let revMintConversationMembersView = "";

            if (revMintConvMembersIconsArr.length > 0) {
                revMintConversationMembersView = `<div class="revFlexWrapper revFlexWrapperScroll revSelectedMintConversationSubjectsMembersWrapper">${revMintConvMembersIconsArr.join("")}</div>`;
            }

            let revMintConversationTargetMembersView = "";

            if (revMintConvTargetMembersIconsArr.length > 0) {
                revMintConversationTargetMembersView = `
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revSelectedMintConversationTargetMembersDividerIcon"><i class="fas fa-arrows-alt-h"></i></div>
                <div class="revFlexWrapper revFlexWrapperScroll revSelectedMintConversationTargetMembersIconsWrapper">${revMintConvTargetMembersIconsArr.join("")}</div>
                `;
            }

            let revLoggedInEntityMintConvMember_Id = "revLoggedInEntityMintConvMember_Id_" + window.revGenUniqueId();

            revGetUserIcon(window.REV_LOGGED_IN_ENTITY, revLoggedInEntityMintConvMember_Id);

            let revLoggedInEntityMintConvMemberIconView = `
            <div class="revFlexWrapper revLoggedInEntityMintConvMemberIconViewWrapper">
                <div id="${revLoggedInEntityMintConvMember_Id}" class="revListingIconCurvedTiny revComposeNewMintEntityIcon"></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fas fa-arrow-right"></i></div>
            </div>`;

            document.getElementById(revSelectedMintConvMembersListingWrapper).innerHTML = `
            <div class="revFlexWrapper revFlexWrapperScroll revSelectedMintConversationMembersIconsWrapper">
                ${revLoggedInEntityMintConvMemberIconView + revMintConversationMembersView + revMintConversationTargetMembersView}
            </div>
            `;
        } catch (error) {
            console.log("revFormViewComposeMintMsgWidget.js -> revAddedMintConversationMembersArr " + error);
        }
    };

    let revInitMintMessageMembers = async (revMintGUIDsArr, revSelectedMintConvMembersListingWrapper) => {
        /** REV START IMPORT CONTACTS */
        let revPassVarArgs_ImporPhoneBooktCcts = window.revCloneJsObject(revVarArgs);

        let revImportPhoneBookContactsCallback = async (revImportedPhoneccts) => {
            let url = window.REV_SITE_BASE_PATH + "/rev_api/get_metadata_entity_guids?rev_metadata_vals=" + revImportedPhoneccts.join() + "&revPluginHookContextsRemoteArr=revHookRemoteGetMetadaValPublishers";
            try {
                revData = await window.revGetServerData_JSON_Async(url);
                revData = revData.filter;

                for (let i = 0; i < revData.length; i++) {
                    if (!revData[i] || !revData[i].revEntity) continue;

                    let revEntityImport = revData[i].revEntity;

                    if (revEntityImport) {
                        revAddSelectedMintConvMemberGUID(revMintGUIDsArr, revEntityImport._remoteRevEntityGUID);
                    }
                }
            } catch (error) {
                console.log("revFormViewComposeMintMsgWidget.js -> revData.filter " + error);
            }

            window.revToggleSwitchArea(null);
            window.revToggleSwitchArea(await revInitMintMessageMembers(revMintGUIDsArr));
        };

        let revSelectableContacts_Id = "revSelectableContacts_Id_" + window.revGenUniqueId();

        let revPageContentAreaRendererCallback = (revCallbackHTML) => {
            window.revSetInterval(revSelectableContacts_Id, () => {
                document.getElementById(revSelectableContacts_Id).innerHTML = revCallbackHTML;
            });
        };

        revPassVarArgs_ImporPhoneBooktCcts["revImportPhoneBookContactsCallback"] = revImportPhoneBookContactsCallback;
        revPassVarArgs_ImporPhoneBooktCcts["revPageContentAreaRendererCallback"] = revPageContentAreaRendererCallback;
        revPassVarArgs_ImporPhoneBooktCcts["revImportedPhoneccts"] = revMintGUIDsArr;

        let revMenuAreaImportContacts = await window.revGetMenuAreaView("revMenuAreaImportContacts", revPassVarArgs_ImporPhoneBooktCcts);
        /** REV END IMPORT CONTACTS */

        let revCommitMintMessageMembersTab_Id = "revCommitMintMessageMembersTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revCommitMintMessageMembersTab_Id, () => {
            document.getElementById(revCommitMintMessageMembersTab_Id).addEventListener("click", (event) => {
                revDrawSelectedMintConvMembers(revSelectedMintConvMembersListingWrapper);
                window.revToggleSwitchArea(null);
            });
        });

        /** REV START SELECTABLE CONTACTS */
        let revSelectableContactsCallback = (revSelectedArr) => {
            for (let i = 0; i < revSelectedArr.length; i++) {
                revAddSelectedMintConvMemberGUID(revMintGUIDsArr, revSelectedArr[i]);
            }
        };

        let revSelectableContacts = await window.revGetForm("revSelectableContacts", { "revSelectableContactsCallback": revSelectableContactsCallback });
        /** REV END SELECTABLE CONTACTS */

        let revShareCancelTab_Id = "revShareCancelTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revShareCancelTab_Id, () => {
            document.getElementById(revShareCancelTab_Id).addEventListener("click", (event) => {
                revMintGUIDsArr.length = 0;
                window.revToggleSwitchArea();
            });
        });

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

    /** REV START ITEM SUBMIT FORM FOOTER */
    let revSelectedPicsAlbumFiles = [];
    let revMainSelectedFileIndex;

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
            window.revLoadModules("revPluginModulePicsAlbumPers", (revScriptModule) => {
                let revPassVarArgs = { "revEntityContainerGUID": revContainerEntityGUID, "revFileObjectsArr": revFileObjectsArr, "revIsNewEntity": true };

                window.revPluginModulePicsAlbumPers.createPicsAlbum_FileObjects(revPassVarArgs, (revResStatus) => {
                    console.log("FIN : revIsNewEntity : revResStatus" + JSON.stringify(revResStatus));
                });
            });
        }
    };
    let revSavePersEntity = async () => {
        let revPersEntity = window.REV_ENTITY_STRUCT();
        revPersEntity._revEntityResolveStatus = 0;
        revPersEntity._revEntityChildableStatus = 301;
        revPersEntity._revEntityType = "rev_object";
        revPersEntity._revEntitySubType = "rev_family_kiwi";
        revPersEntity._remoteRevEntityGUID = -1;
        revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntity._revEntityContainerGUID = revVarArgs._remoteRevEntityGUID;
        revPersEntity._revTimeCreated = new Date().getTime();

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
        if (window.revStringEmpty(revFamilyKiwiVal)) {
            console.log("posT canNot be empTy.");
            return;
        }

        revPersEntityInfo._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc", revFamilyKiwiVal));
        /** REV END MINT MESSAGE VAL */

        /** REV START MINT MESSAGE VAL HTML */
        if (!window.revIsEmptyHTML(revFamilyKiwiVal_HTML)) {
            revPersEntityInfo._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_html", revFamilyKiwiVal_HTML));
        }
        /** REV END MINT MESSAGE VAL HTML */

        /** REV START ATTACH INFO */
        revPersEntity._revInfoEntity = revPersEntityInfo;
        /** REV END ATTACH INFO */

        let revURL = window.REV_SITE_BASE_PATH + "/rev_base_api_post?revPluginHookContextsRemoteArr=revHookRemoteHandler_createNewFamilyKiwi";

        window.revPostServerData(revURL, { "revLoggedInEntityGUID": window.REV_LOGGED_IN_ENTITY_GUID, "revEntityFamilyKiwi": revPersEntity }, async (revRetData) => {
            let revRetEntity = revRetData.filter[0];

            let revRetRemoteEntityGUID = revRetEntity._remoteRevEntityGUID;
            revPersEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;

            let revInfoEntityGUID = revRetEntity.revInfoEntityGUID;

            revPersInfoEntity._revEntityContainerGUID = revRetRemoteEntityGUID;
            revPersInfoEntity._revEntityRemoteContainerGUID = revRetRemoteEntityGUID;
            revPersInfoEntity._remoteRevEntityGUID = revInfoEntityGUID;

            revPersEntity._revInfoEntity = revPersInfoEntity;

            if (revSelectedPicsFiles.length > 0) {
                await revUploadInfoPicsAlbum(revInfoEntityGUID);
            }
        });
    };
    /** REV END ITEM SUBMIT FORM FOOTER */

    let revRelsValsArr = [];

    let revGetRelCB = (revRelVal) => {
        let revCB_Public_Id = "revSelectedIconId_" + window.revGenUniqueId();

        let revCheckBoxRelCallback = (revCBVarArgs) => {
            if (revCBVarArgs.revCheckBoxChecked) {
                revRelsValsArr.push(revCBVarArgs.revCheckBoxVal);
            } else {
                window.revRemoveArrElement(revRelsValsArr, revCBVarArgs.revCheckBoxVal);
            }
        };

        let revCBVarArgsPublic = {
            "revCheckBoxCallback": revCheckBoxRelCallback,
            "revCheckBoxId": revCB_Public_Id,
            "revCheckBoxVal": revRelVal,
            "revIsChecked": true,
        };

        let revCheckBoxRel = window.revGetCheckBox(revCBVarArgsPublic);

        return revCheckBoxRel;
    };

    /** REV START AUDIENCE */
    let revChatSettingsForm = (revAudienceFooterAreaContainer_Id) => {
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
                document.getElementById(revAudienceFooterAreaContainer_Id).innerHTML = "";
            });
        });

        return `
            <div class="revFlexContainer revPublisherFormOptionalFooterAreaContainer">
                <div class="revFontSizeNormalHeader revPublisherSettingsHeader">FAmiLy accEss</div>
                <div class="revFlexWrapper revFlexWrapperScroll revPublisherSettingsFormViewWrapper">
                    <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                        ${revCheckBoxPublic}
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">ALL</div>
                    </div>
                    <div class="revFlexWrapper revFlexWrapperScroll revFamilyCheckBoxesWrapper">
                        <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                            ${revCheckBoxPublic}
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">siBLiNGs</div>
                        </div>
                        <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                            ${revCheckBoxPublic}
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">pARENTs</div>
                        </div>
                        <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                            ${revCheckBoxPublic}
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">cousiNs</div>
                        </div>
                        <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                            ${revCheckBoxPublic}
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">uNcLEs</div>
                        </div>
                        <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                            ${revCheckBoxPublic}
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">AuNTs</div>
                        </div>
                        <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                            ${revCheckBoxPublic}
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">graNdpas</div>
                        </div>
                        <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                            ${revCheckBoxPublic}
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">graNdmas</div>
                        </div>
                    </div>

                    <div id="${revPublisherFormOptionalFooterAreaContainerHideTab_Id}" class="revTabLink revFontSiteBlueTxtColor revHidePublisherSettingsTab">HiDE</div>
                </div>
            </div>
            `;
    };
    /** REV END AUDIENCE */

    /** REV START INPUT AREA ADDITIONAL INPUTS AREA */
    let revNewMintConversations = () => {
        let revMintMessageMembersTab_Id = "revMintMessageMembersTab_Id_" + window.revGenUniqueId();
        let revMintMessageTargetMembersTab_Id = "revMintMessageMembersTab_Id_" + window.revGenUniqueId();

        let revAudienceFooterAreaContainer_Id = "revAudienceFooterAreaContainer_Id" + window.revGenUniqueId();

        window.revSetInterval(revMintMessageMembersTab_Id, () => {
            document.getElementById(revMintMessageMembersTab_Id).addEventListener("click", async (event) => {
                window.revToggleSwitchArea(await revInitMintMessageMembers(revAccessFamilyMemberRelsArr, revAudienceFooterAreaContainer_Id));
            });
        });

        window.revSetInterval(revMintMessageTargetMembersTab_Id, () => {
            document.getElementById(revMintMessageTargetMembersTab_Id).addEventListener("click", async (event) => {
                window.revToggleSwitchArea(await revInitMintMessageMembers(revMintConversationTargetMembersGUIDsArr, revAudienceFooterAreaContainer_Id));
            });
        });

        let revAudienceTab_Id = "revAudienceTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revAudienceTab_Id, () => {
            document.getElementById(revAudienceTab_Id).addEventListener("click", (event) => {
                document.getElementById(revAudienceFooterAreaContainer_Id).innerHTML = revChatSettingsForm(revAudienceFooterAreaContainer_Id);
            });
        });

        let revAudienceTab = `<div id="${revAudienceTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeLarge"><i class="far fa-eye"></i></div>`;

        return `
        <div id="${revAudienceFooterAreaContainer_Id}" class="revFlexWrapper"></div>
        <div class="revFlexWrapper revComposeFamilyKiwiFamilyPrivacyWrapper">
            <div class="revTabLink revFlexWrapper revComposeFamilyKiwiFamilyPrivacySelectWrapper">
                ${revAudienceTab}
            </div>
            <div class="revFlexWrapper revSuggestedFamilyKiwiPublishOptionsTabsWrapper">
                ${window.revSmallDividerWrapper()}
            </div>
            <div id="${revMintMessageTargetMembersTab_Id}" class="revTabLink revFlexWrapper revComposeFamilyKiwiFamilyPrivacySelectWrapper">
                <div class="revFontSiteBlueTxtColor revFontSizeMedium"><i class="fa fa-plus"></i></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revComposeFamilyKiwiFamilyPrivacySelectTxt">spAcEs</div>
            </div>
        </div>
        `;
    };
    /** REV END INPUT AREA ADDITIONAL INPUTS AREA */

    let revGetMintPublisherPlaceholder = () => {
        let revCommentInputAreaId = "revCommentInputArea_" + window.revGenUniqueId();

        window.revSetInterval(revCommentInputAreaId, () => {
            document.getElementById(revCommentInputAreaId).addEventListener("click", async function (event) {
                let revPassVarArgs = window.revCloneJsObject(revVarArgs);

                revPassVarArgs["revPublisherSettingsTab"] = true;

                revPassVarArgs["revPublisherFormHintText"] = "sHARE wiTH FAmiLy";
                revPassVarArgs["revPublisherFormAdditionalInputsFooterArea"] = revNewMintConversations();

                revPassVarArgs["revCancelPublisherFormCallback"] = () => {
                    revAccessFamilyMemberRelsArr.length = 0;
                    document.getElementById(revMintFormAreaView_Id).innerHTML = revGetMintPublisherPlaceholder();
                };

                revPassVarArgs["revFilesSelectedCallback"] = (revSelectedPicsAlbumFilesVarArgs) => {
                    console.log("revSelectedPicsAlbumFilesVarArgs : " + JSON.stringify(revSelectedPicsAlbumFilesVarArgs));

                    revSelectedPicsAlbumFiles = revSelectedPicsAlbumFilesVarArgs;
                    revMainSelectedFileIndex = revSelectedPicsAlbumFilesVarArgs;
                };

                revPassVarArgs["revPublisherPublishCallback"] = (revPassParams) => {
                    revFamilyKiwiVal = revPassParams.revEditorPlainText;
                    revFamilyKiwiVal_HTML = revPassParams.revEditorHTML;

                    revSavePersEntity();
                };

                let revCommentFormView = await window.revGetForm("revPublisherForm", revPassVarArgs);
                document.getElementById(revMintFormAreaView_Id).innerHTML = `<div class="revFlexContainer">${revCommentFormView}</div>`;
            });
        });

        return `<div id="${revCommentInputAreaId}" class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">&nbsp;&nbsp;&nbsp;&nbsp;sHARE wiTH FAmiLy</div>`;
    };

    return `<div id="${revMintFormAreaView_Id}" class="revMintPublisherInput">${revGetMintPublisherPlaceholder()}</div>`;
};

module.exports.revFormViewWidget = revFormViewWidget;
