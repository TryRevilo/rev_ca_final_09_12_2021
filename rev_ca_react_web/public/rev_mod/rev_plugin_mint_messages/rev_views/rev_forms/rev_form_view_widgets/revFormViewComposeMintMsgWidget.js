var revFormViewWidget = async (revVarArgs) => {
    let revMintFormAreaView_Id = "revMintFormAreaView_Id_" + window.revGenUniqueId();

    let revPersEntitymintMessageVal = "";
    let revPersEntitymintMessageVal_HTML = "";

    let revMintConversationMembersGUIDsArr = [];
    let revMintConversationTargetMembersGUIDsArr = [];

    if (revVarArgs.revImportedPhoneccts) {
        revMintConversationMembersGUIDsArr = revVarArgs.revImportedPhoneccts;
    }

    if (revVarArgs.revMintConversationTargetMembersGUIDsArr) {
        revMintConversationTargetMembersGUIDsArr = revVarArgs.revMintConversationTargetMembersGUIDsArr;
    }

    let revAddSelectedMintConvMemberGUID = (revGUIDsArr, revEntityGUID) => {
        window.revRemoveArrElement(revMintConversationMembersGUIDsArr, revEntityGUID);

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
        revTotSelectedMembers = revTotSelectedMembers.concat(revMintConversationMembersGUIDsArr);
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
                            window.revRemoveArrElement(revMintConversationMembersGUIDsArr, revEntityImport._remoteRevEntityGUID);
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
    let revSavePersEntity = async () => {
        let revPersEntity = window.REV_ENTITY_STRUCT();
        revPersEntity._revEntityResolveStatus = 0;
        revPersEntity._revEntityChildableStatus = 301;
        revPersEntity._revEntityType = "rev_object";
        revPersEntity._revEntitySubType = "rev_mint_conversation";
        revPersEntity._remoteRevEntityGUID = -1;
        revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntity._revEntityContainerGUID = revVarArgs._remoteRevEntityGUID;
        revPersEntity._revTimeCreated = new Date().getTime();

        /** REV START MINT CONVERSATION MEMBERS REL */
        if (revMintConversationMembersGUIDsArr.length < 1) {
            console.log("You need to add at least 1 person to this mint conversation!");
            return;
        }

        if (!window.revArrIncludesElement(revMintConversationMembersGUIDsArr, window.REV_LOGGED_IN_ENTITY_GUID)) {
            revMintConversationMembersGUIDsArr.push(window.REV_LOGGED_IN_ENTITY_GUID);
        }

        for (let i = 0; i < revMintConversationMembersGUIDsArr.length; i++) {
            let revMintConversationMemberGUID = revMintConversationMembersGUIDsArr[i];

            if (revMintConversationMemberGUID < 1) continue;

            let revMintMessageMemberRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
            revMintMessageMemberRel._revEntityRelationshipType = "rev_mint_conversation_member_of";
            revMintMessageMemberRel._remoteRevEntityTargetGUID = revPersEntity._remoteRevEntityGUID;
            revMintMessageMemberRel._remoteRevEntitySubjectGUID = revMintConversationMemberGUID;

            revPersEntity._revTargetEntityRelationships.push(revMintMessageMemberRel);
        }

        if (revMintConversationTargetMembersGUIDsArr.length > 0) {
            for (let i = 0; i < revMintConversationTargetMembersGUIDsArr.length; i++) {
                let revMintMessageTargetRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
                revMintMessageTargetRel._revEntityRelationshipType = "rev_mint_conversation_target_of";
                revMintMessageTargetRel._remoteRevEntityTargetGUID = revPersEntity._remoteRevEntityGUID;
                revMintMessageTargetRel._remoteRevEntitySubjectGUID = revMintConversationTargetMembersGUIDsArr[i];

                revPersEntity._revTargetEntityRelationships.push(revMintMessageTargetRel);
            }
        }
        /** REV END MINT CONVERSATION MEMBERS REL */

        let revPersEntityMintMessage = window.REV_ENTITY_STRUCT();
        revPersEntityMintMessage._revEntityResolveStatus = 0;
        revPersEntityMintMessage._revEntityChildableStatus = 301;
        revPersEntityMintMessage._revEntityType = "rev_object";
        revPersEntityMintMessage._revEntitySubType = "rev_mint_message";
        revPersEntity._remoteRevEntityGUID = -1;
        revPersEntityMintMessage._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntityMintMessage._revEntityContainerGUID = revPersEntity._remoteRevEntityGUID;
        revPersEntityMintMessage._revTimeCreated = new Date().getTime();

        /** REV START MINT MESSAGE VAL */
        if (window.revStringEmpty(revPersEntitymintMessageVal)) {
            console.log("Mint message cannot be empty.");
            return;
        }

        revPersEntityMintMessage._revEntityMetadataList.push(window.revMetadataFiller("rev_mint_message_val", revPersEntitymintMessageVal));
        /** REV END MINT MESSAGE VAL */

        /** REV START MINT MESSAGE VAL HTML */
        if (!window.revIsEmptyHTML(revPersEntitymintMessageVal_HTML)) {
            revPersEntityMintMessage._revEntityMetadataList.push(window.revMetadataFiller("rev_mint_message_html_val", revPersEntitymintMessageVal_HTML));
        }
        /** REV END MINT MESSAGE VAL HTML */

        /** REV START REV_ENTITY_PERS_CONTAINER_CHILDS */
        revPersEntity._revPersContainerChildren.push(revPersEntityMintMessage);
        /** REV END REV_ENTITY_PERS_CONTAINER_CHILDS */

        window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, { filter: [revPersEntity] }, async (revRetData) => {
            let revRetRemoteEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;
            revPersEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;

            // revUploadEntityFiles({
            //     "revFiles": revSelectedFiles,
            //     "revFileType": "rev_file",
            //     "revMainSelectedFileIndex": revMainSelectedFileIndex,
            //     "revContainerEntityGUID": revRetRemoteInfoEntityGUID,
            // });
        });
    };
    /** REV END ITEM SUBMIT FORM FOOTER */

    /** REV START INPUT AREA ADDITIONAL INPUTS AREA */

    let revNewMintConversations = () => {
        let revMintMessageMembersTab_Id = "revMintMessageMembersTab_Id_" + window.revGenUniqueId();
        let revMintMessageTargetMembersTab_Id = "revMintMessageMembersTab_Id_" + window.revGenUniqueId();

        let revSelectedMintConvMembersListingWrapper_Id = "revSelectedMintConvMembersListingWrapper_Id" + window.revGenUniqueId();

        window.revSetInterval(revMintMessageMembersTab_Id, () => {
            document.getElementById(revMintMessageMembersTab_Id).addEventListener("click", async (event) => {
                window.revToggleSwitchArea(await revInitMintMessageMembers(revMintConversationMembersGUIDsArr, revSelectedMintConvMembersListingWrapper_Id));
            });
        });

        window.revSetInterval(revMintMessageTargetMembersTab_Id, () => {
            document.getElementById(revMintMessageTargetMembersTab_Id).addEventListener("click", async (event) => {
                window.revToggleSwitchArea(await revInitMintMessageMembers(revMintConversationTargetMembersGUIDsArr, revSelectedMintConvMembersListingWrapper_Id));
            });
        });

        return `
        <div id="${revSelectedMintConvMembersListingWrapper_Id}" class="revFlexWrapper"></div>
        <div class="revFlexWrapper revComposeNewMintPublisherItemWrapper">
            <div id="${revMintMessageMembersTab_Id}" class="revTabLink revFlexWrapper revAddMintTagsEntityIconsWrapper">
                <div class="revFontSiteBlueTxtColor revFontSizeMedium"><i class="fa fa-plus"></i></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revAddMintTags">tags</div>
            </div>
            <div class="revFlexWrapper revSuggestedMintPublishOptionsTabsWrapper revSuggestedMintEntityInitiator">
                <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fas fa-arrows-alt-h"></i></div>
            </div>
            <div id="${revMintMessageTargetMembersTab_Id}" class="revTabLink revFlexWrapper revAddMintTagsEntityIconsWrapper">
                <div class="revFontSiteBlueTxtColor revFontSizeMedium"><i class="fa fa-plus"></i></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revAddMintTags">to</div>
            </div>
        </div>
        `;
    };
    /** REV START INPUT AREA ADDITIONAL INPUTS AREA */

    let revGetMintPublisherPlaceholder = () => {
        let revCommentInputAreaId = "revCommentInputArea_" + window.revGenUniqueId();

        window.revSetInterval(revCommentInputAreaId, () => {
            document.getElementById(revCommentInputAreaId).addEventListener("click", async function (event) {
                let revPassVarArgs = window.revCloneJsObject(revVarArgs);

                revPassVarArgs["revPublisherFormHintText"] = "sTART nEw miNT coNvERsATioN";
                revPassVarArgs["revPublisherFormAdditionalInputsFooterArea"] = revNewMintConversations();

                revPassVarArgs["revCancelPublisherFormCallback"] = () => {
                    revMintConversationMembersGUIDsArr.length = 0;
                    document.getElementById(revMintFormAreaView_Id).innerHTML = revGetMintPublisherPlaceholder();
                };

                revPassVarArgs["revFilesSelectedCallback"] = (revFiles) => {
                    console.log("revFiles : " + JSON.stringify(revFiles));
                };

                revPassVarArgs["revPublisherPublishCallback"] = (revPassParams) => {
                    revPersEntitymintMessageVal = revPassParams.revEditorPlainText;
                    revPersEntitymintMessageVal_HTML = revPassParams.revEditorHTML;

                    revSavePersEntity();
                };

                let revCommentFormView = await window.revGetForm("revPublisherForm", revPassVarArgs);
                document.getElementById(revMintFormAreaView_Id).innerHTML = `<div class="revFlexContainer">${revCommentFormView}</div>`;
            });
        });

        return `<div id="${revCommentInputAreaId}" class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">&nbsp;&nbsp;&nbsp;&nbsp;sTART nEw miNT coNvERsATioN</div>`;
    };

    return `<div id="${revMintFormAreaView_Id}" class="revMintPublisherInput">${revGetMintPublisherPlaceholder()}</div>`;
};

module.exports.revFormViewWidget = revFormViewWidget;
