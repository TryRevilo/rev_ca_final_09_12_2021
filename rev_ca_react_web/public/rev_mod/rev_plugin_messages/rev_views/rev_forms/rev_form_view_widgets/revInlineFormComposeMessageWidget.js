var revFormViewWidget = async (revVarArgs) => {
    let revEntity = revVarArgs.revEntity;
    let revMsgComposeCallback = revVarArgs.revMsgComposeCallback;

    let revMessageFormAreaView_Id = "revMessageFormAreaView_Id_" + window.revGenUniqueId();

    let revPersEntityName = "";

    let revPersEntityDescVal = "";
    let revPersEntityDescVal_HTML = "";

    let revMessageRecipientsGUIDsArr = [];

    if (revEntity._remoteRevEntityGUID !== window.REV_LOGGED_IN_ENTITY_GUID) {
        revMessageRecipientsGUIDsArr.push(revEntity._remoteRevEntityGUID);
    }

    let revAddSelectedMsgRecipientGUID = (revGUIDsArr, revEntityGUID) => {
        window.revRemoveArrElement(revMessageRecipientsGUIDsArr, revEntityGUID);

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

    let revDrawSelectedMessageRecipients = async (revSelectedMessageRecipientsListingWrapper) => {
        let revTotSelectedMembers = [];
        revTotSelectedMembers = revTotSelectedMembers.concat(revMessageRecipientsGUIDsArr);

        let url = window.REV_SITE_BASE_PATH + "/rev_api/rev_get_flat_entity_info_wrapper?rev_items=" + revTotSelectedMembers.join(",");

        try {
            let revData = await window.revGetServerData_JSON_Async(url);
            let revAddedMessageRecipientsArr = revData.filter;

            let revMessageRecipientsIconsArr = [];
            let revMsgRecipientsIconsArr = [];

            for (let i = 0; i < revAddedMessageRecipientsArr.length; i++) {
                if (!revAddedMessageRecipientsArr[i] || !revAddedMessageRecipientsArr[i].revRetEntity) {
                    continue;
                }

                let revEntityImport = revAddedMessageRecipientsArr[i].revRetEntity;

                if (revEntityImport) {
                    let revSelectMessageRecipientTabIconContainer_Id = "revSelectMessageRecipientTabIconContainer_Id_" + window.revGenUniqueId();
                    let revMessageRecipientDelTab_Id = "revMessageRecipientDelTab_Id_" + window.revGenUniqueId();

                    window.revSetInterval(revMessageRecipientDelTab_Id, () => {
                        document.getElementById(revMessageRecipientDelTab_Id).addEventListener("click", (event) => {
                            window.revRemoveArrElement(revMessageRecipientsGUIDsArr, revEntityImport._remoteRevEntityGUID);

                            document.getElementById(revSelectMessageRecipientTabIconContainer_Id).remove();
                        });
                    });

                    let revMsgRecipientDelTab = `
                    <div id="${revMessageRecipientDelTab_Id}" class="revTabLink revFlexWrapper revMsgRecipientDelTabWrapper">
                        <div class="revFontSiteRedTxtColor revFontSizeTiny revMsgRecipientDelTab"><i class="far fa-trash-alt"></i></div>
                    </div>`;

                    let revMsgRecipientIcon_Id = "revMsgRecipientIcon_Id_" + window.revGenUniqueId();

                    revGetUserIcon(revEntityImport, revMsgRecipientIcon_Id);

                    revMessageRecipientsIconsArr.push(`
                        <div id="${revSelectMessageRecipientTabIconContainer_Id}" class="revFlexContainer revSelectMsgConTabIconContainer">
                            ${revMsgRecipientDelTab}
                            <div id="${revMsgRecipientIcon_Id}" class="revComposeMsgRecipientEntityIcon"></div>
                        </div>`);
                }
            }

            let revMessageRecipientsView = "";

            if (revMessageRecipientsIconsArr.length > 0) {
                revMessageRecipientsView = `<div class="revFlexWrapper revFlexWrapperScroll revSelectedMsgRecipientsWrapper">${revMessageRecipientsIconsArr.join("")}</div>`;
            }

            let revMsgRecipientView = "";

            if (revMsgRecipientsIconsArr.length > 0) {
                revMsgRecipientView = `
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revSelectedMessageRecipientsDividerIcon"><i class="fas fa-arrows-alt-h"></i></div>
                <div class="revFlexWrapper revFlexWrapperScroll revSelectedMsgRecipientsIconsWrapper">${revMsgRecipientsIconsArr.join("")}</div>
                `;
            }

            let revLoggedInEntityMsgComposer_Id = "revLoggedInEntityMsgComposer_Id_" + window.revGenUniqueId();

            revGetUserIcon(window.REV_LOGGED_IN_ENTITY, revLoggedInEntityMsgComposer_Id);

            let revLoggedInEntityMsgComposerIconView = `
            <div class="revFlexWrapper revLoggedInEntityMsgComposerIconViewWrapper">
                <div id="${revLoggedInEntityMsgComposer_Id}" class="revListingIconCurvedTiny revComposeNewMsgEntityIcon"></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fas fa-arrow-right"></i></div>
            </div>`;

            document.getElementById(revSelectedMessageRecipientsListingWrapper).innerHTML = `
            <div class="revFlexWrapper revFlexWrapperScroll revSelectedMsgRecipientsIconsWrapper">
                ${revLoggedInEntityMsgComposerIconView + revMessageRecipientsView + revMsgRecipientView}
            </div>
            `;
        } catch (error) {
            console.log("revInlineFormComposeMessageWidget.js -> revDrawSelectedMessageRecipients " + error);
        }
    };

    let revInitMessageRecipients = async (revMessageRecipientGUIDsArr, revSelectedMessageRecipientsListingWrapper) => {
        /** REV START IMPORT CONTACTS */
        let revPassVarArgs_ImportPhoneBooktCcts = window.revCloneJsObject(revVarArgs);

        let revImportPhoneBookContactsCallback = async (revImportedPhoneccts) => {
            let url = window.REV_SITE_BASE_PATH + "/rev_api/get_metadata_entity_guids?rev_metadata_vals=" + revImportedPhoneccts.join() + "&revPluginHookContextsRemoteArr=revHookRemoteGetMetadaValPublishers";
            try {
                revData = await window.revGetServerData_JSON_Async(url);
                revData = revData.filter;

                for (let i = 0; i < revData.length; i++) {
                    if (!revData[i] || !revData[i].revEntity) continue;

                    let revEntityImport = revData[i].revEntity;

                    if (revEntityImport) {
                        revAddSelectedMsgRecipientGUID(revMessageRecipientGUIDsArr, revEntityImport._remoteRevEntityGUID);
                    }
                }
            } catch (error) {
                console.log("revInlineFormComposeMessageWidget.js -> revData.filter " + error);
            }

            window.revToggleSwitchArea(null);
            window.revToggleSwitchArea(await revInitMessageRecipients(revMessageRecipientGUIDsArr));
        };

        let revSelectableContacts_Id = "revSelectableContacts_Id_" + window.revGenUniqueId();

        let revPageContentAreaRendererCallback = (revCallbackHTML) => {
            window.revSetInterval(revSelectableContacts_Id, () => {
                document.getElementById(revSelectableContacts_Id).innerHTML = revCallbackHTML;
            });
        };

        revPassVarArgs_ImportPhoneBooktCcts["revImportPhoneBookContactsCallback"] = revImportPhoneBookContactsCallback;
        revPassVarArgs_ImportPhoneBooktCcts["revPageContentAreaRendererCallback"] = revPageContentAreaRendererCallback;
        revPassVarArgs_ImportPhoneBooktCcts["revImportedPhoneccts"] = revMessageRecipientGUIDsArr;

        let revMenuAreaImportContacts = await window.revGetMenuAreaView("revMenuAreaImportContacts", revPassVarArgs_ImportPhoneBooktCcts);
        /** REV END IMPORT CONTACTS */

        let revCommitMessageRecipientsTab_Id = "revCommitMessageRecipientsTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revCommitMessageRecipientsTab_Id, () => {
            document.getElementById(revCommitMessageRecipientsTab_Id).addEventListener("click", (event) => {
                revDrawSelectedMessageRecipients(revSelectedMessageRecipientsListingWrapper);
                window.revToggleSwitchArea(null);
            });
        });

        /** REV START SELECTABLE CONTACTS */
        let revSelectableContactsCallback = (revSelectedArr) => {
            for (let i = 0; i < revSelectedArr.length; i++) {
                revAddSelectedMsgRecipientGUID(revMessageRecipientGUIDsArr, revSelectedArr[i]);
            }
        };

        let revSelectableContacts = await window.revGetForm("revSelectableContacts", { "revSelectableContactsCallback": revSelectableContactsCallback });
        /** REV END SELECTABLE CONTACTS */

        let revShareCancelTab_Id = "revShareCancelTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revShareCancelTab_Id, () => {
            document.getElementById(revShareCancelTab_Id).addEventListener("click", (event) => {
                revMessageRecipientGUIDsArr.length = 0;
                window.revToggleSwitchArea();
            });
        });

        let revSelectableContactsFormView = `
        <div id="${revSelectableContacts_Id}" class="revFlexContainer revSelectableCctsContainer">
            <div class="revFlexWrapper revShareHeaderAreaWrapper">
                <div id="${revCommitMessageRecipientsTab_Id}" class="revTabLink revFlexWrapper revShareTabWrapper">
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
        revPersEntity._revEntitySubType = "rev_message";
        revPersEntity._remoteRevEntityGUID = -1;
        revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntity._revEntityContainerGUID = revEntity._remoteRevEntityGUID;
        revPersEntity._revTimeCreated = new Date().getTime();

        /** REV START MSG RECIPIENTS REL */
        if (revMessageRecipientsGUIDsArr.length < 1) {
            console.log("You need to add at least 1 recipient to this composition!");
            return;
        }

        for (let i = 0; i < revMessageRecipientsGUIDsArr.length; i++) {
            let revMsgRecipientGUID = revMessageRecipientsGUIDsArr[i];

            if (revMsgRecipientGUID < 1) {
                continue;
            }

            let revMessageMemberRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
            revMessageMemberRel._revEntityRelationshipType = "rev_msg_recipient_of";
            revMessageMemberRel._remoteRevEntityTargetGUID = revMsgRecipientGUID;
            revMessageMemberRel._remoteRevEntitySubjectGUID = revPersEntity._remoteRevEntityGUID;

            revPersEntity._revSubjectEntityRelationships.push(revMessageMemberRel);
        }
        /** REV END MSG RECIPIENTS REL */

        /** START REV INFO */
        let revPersInfoEntity = window.REV_ENTITY_STRUCT();
        revPersInfoEntity._remoteRevEntityGUID = -1;
        revPersInfoEntity._revEntityResolveStatus = 0;
        revPersInfoEntity._revEntityChildableStatus = 3;
        revPersInfoEntity._revEntityType = "rev_object";
        revPersInfoEntity._revEntitySubType = "rev_entity_info";
        revPersInfoEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersInfoEntity._revEntityContainerGUID = revPersEntity._remoteRevEntityGUID;
        revPersInfoEntity._revEntityChildableStatus = 3;
        revPersInfoEntity._revTimeCreated = new Date().getTime();
        /** END REV INFO */

        /** REV START MSG SUBJECT */
        if (revPersEntityName) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_name", revPersEntityName));
        }

        /** REV START MESSAGE BODY VAL */
        if (window.revStringEmpty(revPersEntityDescVal)) {
            console.log("mEssage BoDy cannot be empty.");
            return;
        }

        revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_val", revPersEntityDescVal));
        /** REV END MESSAGE BODY VAL */

        /** REV START MESSAGE BODY VAL HTML */
        if (!window.revIsEmptyHTML(revPersEntityDescVal_HTML)) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_val_html", revPersEntityDescVal_HTML));
        }
        /** REV END MESSAGE BODY VAL HTML */

        /** REV START REV_ENTITY_PERS_CONTAINER_CHILDS */
        revPersEntity._revInfoEntity = revPersInfoEntity;
        /** REV END REV_ENTITY_PERS_CONTAINER_CHILDS */

        window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, { filter: [revPersEntity] }, (revRetData) => {
            let revRetRemoteEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;
            revPersEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;

            let revRetRemoteInfoEntityGUID = revRetData.filter[0].revInfoEntityGUID;
            revPersInfoEntity._remoteRevEntityGUID = revRetRemoteInfoEntityGUID;

            revMsgComposeCallback(revPersEntity);
        });
    };
    /** REV END ITEM SUBMIT FORM FOOTER */

    /** REV START INPUT AREA ADDITIONAL INPUTS AREA */

    let revNewMessageComposer = () => {
        let revMessageRecipientTab_Id = "revMessageRecipientTab_Id_" + window.revGenUniqueId();

        let revSelectedrecipientListingWrapper_Id = "revSelectedrecipientListingWrapper_Id" + window.revGenUniqueId();

        window.revSetInterval(revSelectedrecipientListingWrapper_Id, () => {
            revDrawSelectedMessageRecipients(revSelectedrecipientListingWrapper_Id);
        });

        window.revSetInterval(revMessageRecipientTab_Id, () => {
            document.getElementById(revMessageRecipientTab_Id).addEventListener("click", async (event) => {
                window.revToggleSwitchArea(await revInitMessageRecipients(revMessageRecipientsGUIDsArr, revSelectedrecipientListingWrapper_Id));
            });
        });

        return `
        <div id="${revSelectedrecipientListingWrapper_Id}" class="revFlexWrapper"></div>
        <div class="revFlexWrapper revMessagePublisherItemWrapper">
            <div id="${revMessageRecipientTab_Id}" class="revTabLink revFlexWrapper revAddMessageRecipientsIconsWrapper">
                <div class="revFontSiteBlueTxtColor revFontSizeMedium"><i class="fa fa-plus"></i></div>
            </div>
        </div>
        `;
    };
    /** REV START INPUT AREA ADDITIONAL INPUTS AREA */

    let revGetMessagePublisherPlaceholder = () => {
        let revMsgPublisherInputAreaId = "revCommentInputArea_" + window.revGenUniqueId();

        window.revSetInterval(revMsgPublisherInputAreaId, () => {
            document.getElementById(revMsgPublisherInputAreaId).addEventListener("click", async function (event) {
                /** REV START MSG TITLE */
                let revMsgSubjectInput_Id = "revMsgSubjectInput_Id_" + window.revGenUniqueId();

                let revMsgSubjectInputText = window.revInputText_Flat({
                    "revId": revMsgSubjectInput_Id,
                    "revInputTextHeader": false,
                    "revBorderStyle": "revMsgSubjectInput",
                    "revPlaceholderText": "suBJEcT . . .",
                });
                /** REV START MSG TITLE */

                let revPassVarArgs = window.revCloneJsObject(revVarArgs);

                revPassVarArgs["revPublisherFormHintText"] = "composE mEssAGE";
                revPassVarArgs["revPublisherFormAdditionalInputsFooterArea"] = revNewMessageComposer();

                revPassVarArgs["revCancelPublisherFormCallback"] = () => {
                    revMessageRecipientsGUIDsArr.length = 0;
                    document.getElementById(revMessageFormAreaView_Id).innerHTML = revGetMessagePublisherPlaceholder();
                };

                revPassVarArgs["revFilesSelectedCallback"] = (revFiles) => {
                    console.log("revFiles : " + JSON.stringify(revFiles));
                };

                revPassVarArgs["revPublisherPublishCallback"] = (revPassParams) => {
                    revPersEntityName = window.revGetTextInputVal(revMsgSubjectInput_Id);

                    revPersEntityDescVal = revPassParams.revEditorPlainText;
                    revPersEntityDescVal_HTML = revPassParams.revEditorHTML;

                    revSavePersEntity();
                };

                let revPublisherForm = await window.revGetForm("revPublisherForm", revPassVarArgs);

                document.getElementById(revMessageFormAreaView_Id).innerHTML = `
                <div class="revFlexContainer">
                    <div class="revFlexWrapper revMsgSubjectInputTextWrapper">${revMsgSubjectInputText}</div>
                    <div class="revFlexContainer revMsgComposeBodyContainer">${revPublisherForm}</div>
                </div>
                `;
            });
        });

        return `<div id="${revMsgPublisherInputAreaId}" class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">&nbsp;&nbsp;&nbsp;&nbsp;composE mEssAGE</div>`;
    };

    return `<div id="${revMessageFormAreaView_Id}" class="revMessagePublisherInput">${revGetMessagePublisherPlaceholder()}</div>`;
};

module.exports.revFormViewWidget = revFormViewWidget;
