var revFormViewWidget = async (revVarArgs) => {
    let revEntity = revVarArgs.revEntity;

    if (!revEntity || !revEntity._remoteRevEntityGUID || revEntity._remoteRevEntityGUID < 1) {
        console.log(JSON.stringify(revVarArgs));
        return "ERR ---> revEntity ChatMessage Form";
    }

    let revTextingQuill;

    let revEntityGUID = revEntity._remoteRevEntityGUID;

    let revPublishItemTab_ChatMessageId = "revPublishItemTab_ChatMessage_" + "_" + window.revGenUniqueId();

    let revChatMessagePubArea_Id = "revFormChatMessageInputArea_" + "_" + window.revGenUniqueId();

    let revSendMsgJSON = () => {
        window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, filterRevRetArr, (revData) => {
            revPersEntity._remoteRevEntityGUID = revData.filter[0]._remoteRevEntityGUID;
            revVarArgs.revVarArgsCallback(revPersEntity);
        });
    };

    window.revSetInterval(revPublishItemTab_ChatMessageId, () => {
        document.getElementById(revPublishItemTab_ChatMessageId).addEventListener("click", async function (event) {
            if (!revTextingQuill) return;

            let revEditorPlainText = revTextingQuill.getText();
            let revEditorHTML = revTextingQuill.root.innerHTML;

            let filterRevRetArr = {
                filter: [],
            };

            let revPersEntity = window.REV_ENTITY_STRUCT();
            revPersEntity._revEntityResolveStatus = 0;
            revPersEntity._revEntityChildableStatus = 301;
            revPersEntity._revEntityType = "revObject";
            revPersEntity._revEntitySubType = "rev_chat_message";
            revPersEntity._remoteRevEntityGUID = -1;
            revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
            revPersEntity._revEntityContainerGUID = revEntityGUID;
            revPersEntity._revTimeCreated = new Date().getTime();
            revPersEntity._revTimePublished = new Date().getTime();

            let revChatMessageMetadata_ChatMessageVal = window.REV_ENTITY_METADATA_STRUCT();
            revChatMessageMetadata_ChatMessageVal._revMetadataName = "rev_chat_message_html_value";
            revChatMessageMetadata_ChatMessageVal._metadataValue = revEditorHTML;

            let revChatMessageMetadata_ChatMessagePlainTextVal = window.REV_ENTITY_METADATA_STRUCT();
            revChatMessageMetadata_ChatMessagePlainTextVal._revMetadataName = "rev_chat_message_plain_text_value";
            revChatMessageMetadata_ChatMessagePlainTextVal._metadataValue = revEditorPlainText;

            let revEntityMetadataList = [revChatMessageMetadata_ChatMessageVal, revChatMessageMetadata_ChatMessagePlainTextVal];

            revPersEntity._revEntityMetadataList = revEntityMetadataList;

            filterRevRetArr.filter.push(revPersEntity);

            let revChatMessageRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
            revChatMessageRel._revEntityRelationshipType = "rev_chat_message";
            revChatMessageRel._remoteRevEntityTargetGUID = revEntityGUID;
            revChatMessageRel._remoteRevEntitySubjectGUID = -1;

            revPersEntity._revSubjectEntityRelationships.push(revChatMessageRel);

            let revChuncks = JSON.stringify(revPersEntity).match(/.{1,12}/g);

            for (let i = 0; i < revChuncks.length; i++) {
                console.log(">>>> " + revChuncks[i]);
            }

            window.revInitiateDataMessanger({ "revMsg": revEditorPlainText }, revEntity);
        });
    });
    /** START REV ChatMessage INPUT PLACEHOLDER */

    let revGetChatMessagePlaceholder = async () => {
        let revChatMessageCancelTabId = "revChatMessageCancelTabId_" + window.revGenUniqueId();

        window.revSetInterval(revChatMessagePubArea_Id, () => {
            revTextingQuill = window.revNewQuill(revChatMessagePubArea_Id, "youR mEssagE");
            revTextingQuill.focus();

            revTextingQuill.on("text-change", (delta, source) => {
                // console.log('text changed');
                // console.log('delta : ' + JSON.stringify(delta));
                // console.log('source : ' + JSON.stringify(source));
            });
        });

        window.revSetInterval(revChatMessageCancelTabId, () => {
            document.getElementById(revChatMessageCancelTabId).addEventListener("click", () => {
                console.log("CLOSE CALL BACK >>>");
            });
        });

        let revFileExplorerMenuItem = await window.revGetMenuItem("revMenuItemFileExplorerTab", revEntity);

        let revChatMessageFormView = `
            <div class="revProfilePubArea_ChatMessage">
                <div id="${revChatMessagePubArea_Id}"></div>
            </div>
        
            <div class="revFlexWrapper revPublisherTabsMenuArea_ChatMessage_Wrapper">
                ${revFileExplorerMenuItem}
                <a class="revEmojiItemTab_ChatMessage"><i class="far fa-smile"></i></a>
                <div id="${revPublishItemTab_ChatMessageId}" class="revSmalllBoldBlue revPublishItemTab_ChatMessage revTabLink">
                    SEND 
                    <span><i class="fas fa-level-up-alt"></i></span>
                </div>
                <div id="${revChatMessageCancelTabId}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revChatMessageCancelTab">Cancel</div>
            </div>
        `;

        let revRetForm = `
            <div class="revFlexContainer revChatMessageFormContainer">
                ${revChatMessageFormView}
                <div class="revChatMessageInputFormBottomArea">
                    <div class="revChatMessage_vl_H_Thin"></div>
                </div>
            </div>
        `;

        return revRetForm;
    };

    /** END REV ChatMessage INPUT PLACEHOLDER */

    return revGetChatMessagePlaceholder();
};

module.exports.revFormViewWidget = revFormViewWidget;
