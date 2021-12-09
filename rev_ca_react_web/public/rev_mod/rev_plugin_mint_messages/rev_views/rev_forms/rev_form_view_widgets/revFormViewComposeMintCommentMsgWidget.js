var revFormViewWidget = async (revVarArgs) => {
    let revMintFormAreaView_Id = "revMintFormAreaView_Id_" + window.revGenUniqueId();
    let revMintCommentFormAreaView_Id = "revMintCommentFormAreaView_Id_" + window.revGenUniqueId();

    let revPersEntitymintMessageVal;
    let revPersEntitymintMessageVal_HTML;

    let revSavePersEntity = (revCallback) => {
        let revPersEntityMintMessage = window.REV_ENTITY_STRUCT();
        revPersEntityMintMessage._revEntityResolveStatus = 0;
        revPersEntityMintMessage._revEntityChildableStatus = 301;
        revPersEntityMintMessage._revEntityType = "rev_object";
        revPersEntityMintMessage._revEntitySubType = "rev_mint_message";
        revPersEntityMintMessage._remoteRevEntityGUID = -1;
        revPersEntityMintMessage._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntityMintMessage._revEntityContainerGUID = revVarArgs._remoteRevEntityGUID;
        revPersEntityMintMessage._revTimeCreated = new Date().getTime();

        if (window.revStringEmpty(revPersEntitymintMessageVal)) return;

        /** REV START MINT MESSAGE VAL */
        if (!window.revStringEmpty(revPersEntitymintMessageVal)) {
            revPersEntityMintMessage._revEntityMetadataList.push(window.revMetadataFiller("rev_mint_message_val", revPersEntitymintMessageVal));
        }
        /** REV END MINT MESSAGE VAL */

        /** REV START MINT MESSAGE VAL HTML */
        if (!window.revIsEmptyHTML(revPersEntitymintMessageVal_HTML)) {
            revPersEntityMintMessage._revEntityMetadataList.push(window.revMetadataFiller("rev_mint_message_html_val", revPersEntitymintMessageVal_HTML));
        }
        /** REV END MINT MESSAGE VAL HTML */

        window.revPostServerData(window.REV_CREATE_NEW_AD_REV_ENTITY_URL, { filter: [revPersEntityMintMessage] }, (revRetData) => {
            let revRetRemoteEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;
            revPersEntityMintMessage._remoteRevEntityGUID = revRetRemoteEntityGUID;

            revCallback(revPersEntityMintMessage);
        });
    };

    let revGetMintCommentsPublisherPlaceholder = () => {
        let revMintCommentInputArea_Id = "revMintCommentInputArea_Id_" + window.revGenUniqueId();

        window.revSetInterval(revMintCommentInputArea_Id, () => {
            document.getElementById(revMintCommentInputArea_Id).addEventListener("click", async function (event) {
                let revPassVarArgs = window.revCloneJsObject(revVarArgs);

                revPassVarArgs["revPublisherFormHintText"] = "my miNT commEnT";

                revPassVarArgs["revCancelPublisherFormCallback"] = () => {
                    document.getElementById(revMintCommentFormAreaView_Id).innerHTML = revGetMintCommentsPublisherPlaceholder();
                };

                revPassVarArgs["revFilesSelectedCallback"] = (revFiles) => {
                    console.log("revFiles : " + JSON.stringify(revFiles));
                };

                revPassVarArgs["revPublisherPublishCallback"] = (revPassParams) => {
                    revPersEntitymintMessageVal = revPassParams.revEditorPlainText;
                    revPersEntitymintMessageVal_HTML = revPassParams.revEditorHTML;

                    revSavePersEntity(async (revPersData) => {
                        revVarArgs.revMintConversationMessagesArr.push(revPersData);

                        let revMintConversationObjectView = await window.revGetLoadedPageView("revMintConversationObjectView", revVarArgs);

                        window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revMintConversationObjectView, "revFloatingOptionsMenuName": "123" });
                    });
                };

                let revMintCommentFormView = await window.revGetForm("revPublisherForm", revPassVarArgs);
                document.getElementById(revMintCommentFormAreaView_Id).innerHTML = `<div class="revFlexContainer">${revMintCommentFormView}</div>`;
            });
        });

        return `<div id="${revMintCommentInputArea_Id}" class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">&nbsp;&nbsp;my miNT commEnT</div>`;
    };

    return `<div id="${revMintCommentFormAreaView_Id}" class="revFontSiteGreyTxtColor revFontSizeNormal revMintCommentPublisherInput">${revGetMintCommentsPublisherPlaceholder()}</div>`;
};

module.exports.revFormViewWidget = revFormViewWidget;
