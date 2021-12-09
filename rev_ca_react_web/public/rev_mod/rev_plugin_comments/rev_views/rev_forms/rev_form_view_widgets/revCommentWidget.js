var revFormViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revEntity) return "ERR ---> revVarArgs Comment Form";

    let revEntity = revVarArgs.revEntity;

    if (!revEntity._remoteRevEntityGUID || revEntity._remoteRevEntityGUID < 1) return "ERR ---> revEntity Comment Form";

    let revTextingQuill;

    let revEntityGUID = revEntity._remoteRevEntityGUID;

    let revPublishItemTab_CommentId = "revPublishItemTab_Comment_" + window.revGenUniqueId();
    let revProfilePubAreaId = "revFormCommentInputArea_" + window.revGenUniqueId();

    let revSelectedPicsFiles = [];
    let revSelectedVideoFiles = [];

    let revUploadEntiyPicsAlbum = (revEntityContainerGUID) => {
        let revIsNewEntity = true;

        // if (revInfoPicsAlbumEntityGUID > 0) revIsNewEntity = false;

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

    window.revSetInterval(revPublishItemTab_CommentId, () => {
        document.getElementById(revPublishItemTab_CommentId).addEventListener("click", async function (event) {
            if (!revTextingQuill) return;

            let revEditorPlainText = revTextingQuill.getText();
            let revEditorHTML = revTextingQuill.root.innerHTML;

            let filterRevRetArr = {
                filter: [],
            };

            let revCommentEntity = window.REV_ENTITY_STRUCT();
            revCommentEntity._revEntityResolveStatus = 0;
            revCommentEntity._revEntityChildableStatus = 301;
            revCommentEntity._revEntityType = "revObject";
            revCommentEntity._revEntitySubType = "rev_comment";
            revCommentEntity._remoteRevEntityGUID = -1;
            revCommentEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
            revCommentEntity._revEntityContainerGUID = revEntityGUID;
            revCommentEntity._revTimeCreated = new Date().getTime();
            revCommentEntity._revTimePublished = new Date().getTime();

            let revCommentMetadata_CommentVal = window.REV_ENTITY_METADATA_STRUCT();
            revCommentMetadata_CommentVal._revMetadataName = "rev_comment_value";
            revCommentMetadata_CommentVal._metadataValue = revEditorHTML;

            let revCommentMetadata_CommentPlainTextVal = window.REV_ENTITY_METADATA_STRUCT();
            revCommentMetadata_CommentPlainTextVal._revMetadataName = "rev_comment_plain_text_value";
            revCommentMetadata_CommentPlainTextVal._metadataValue = revEditorPlainText;

            let revEntityMetadataList = [revCommentMetadata_CommentVal, revCommentMetadata_CommentPlainTextVal];

            revCommentEntity._revEntityMetadataList = revEntityMetadataList;

            filterRevRetArr.filter.push(revCommentEntity);

            let revCommentRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
            revCommentRel._revEntityRelationshipType = "rev_comment";
            revCommentRel._remoteRevEntityTargetGUID = revEntityGUID;
            revCommentRel._remoteRevEntitySubjectGUID = -1;

            revCommentEntity._revSubjectEntityRelationships.push(revCommentRel);

            await window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, filterRevRetArr, async (revData) => {
                let revRemoteEntityGUIDComment = revData.filter[0]._remoteRevEntityGUID;

                revCommentEntity._remoteRevEntityGUID = revRemoteEntityGUIDComment;

                if (revSelectedPicsFiles.length > 0) await revUploadEntiyPicsAlbum(revRemoteEntityGUIDComment);

                revVarArgs.revVarArgsCallback(revCommentEntity);
            });
        });
    });

    /** START REV COMMENT INPUT PLACEHOLDER */

    let revGetCommentPlaceholder = () => {
        let revCommentInputAreaId = "revCommentInputArea_" + window.revGenUniqueId();
        let revCommentCancelTabId = "revCommentCancelTabId_" + window.revGenUniqueId();

        window.revSetInterval(revCommentInputAreaId, () => {
            let revSelectedMediaWrapper_Id = "revSelectedMediaWrapper_Id" + window.revGenUniqueId();

            document.getElementById(revCommentInputAreaId).addEventListener("click", async function (event) {
                window.revSetInterval(revProfilePubAreaId, () => {
                    revTextingQuill = window.revNewQuill(revProfilePubAreaId, "youR commENT");
                    revTextingQuill.focus();
                });

                window.revSetInterval(revCommentCancelTabId, () => {
                    document.getElementById(revCommentCancelTabId).addEventListener("click", () => {
                        document.getElementById(revCommentViewId).innerHTML = revGetCommentPlaceholder();
                    });
                });

                revVarArgs.revFilesSelectedCallback = (revFiles) => {
                    revSelectedPicsFiles = [];
                    revSelectedVideoFiles = [];

                    for (let i = 0; i < revFiles.length; i++) {
                        let revCurrFile = revFiles[i];

                        let revNewFileNameConst = window.REV_LOGGED_IN_ENTITY_GUID + "_" + window.revGenUniqueId();
                        let revFileType = window.revGetFileType(revCurrFile);
                        let revNewFileName = revNewFileNameConst + "." + revFileType;

                        let revNewFile = new File([revCurrFile], revNewFileName, { type: revCurrFile.type });

                        switch (revFileType) {
                            case "jpg":
                            case "png":
                            case "jpeg":
                                revSelectedPicsFiles.push(revNewFile);
                                break;

                            case "mp4":
                                revSelectedVideoFiles.push(revNewFile);
                                break;
                        }
                    }

                    window.imagesPreview(revSelectedPicsFiles, revSelectedMediaWrapper_Id);

                    if (revSelectedPicsFiles.length > 0) {
                        document.getElementById(revSelectedMediaWrapper_Id).classList.add("revSelectedMediaWrapper_Comments");
                    } else {
                        document.getElementById(revSelectedMediaWrapper_Id).classList.remove("revSelectedMediaWrapper_Comments");
                    }
                };

                let revFileExplorerMenuItem = await window.revGetMenuItem("revMenuItemFileExplorerTab", revVarArgs);

                let revCommentFormView = `
                    <div class="revProfilePubArea_Comment">
                        <div id="${revProfilePubAreaId}"></div>
                    </div>
                
                    <div class="revFlexWrapper revPublisherTabsMenuAreaWrapper_Comment">
                        ${revFileExplorerMenuItem}
                        &nbsp;
                        <a class="revEmojiItemTab_Comment"><i class="far fa-smile"></i></a>
                        <div id="${revPublishItemTab_CommentId}" class="revSmalllBoldBlue revPublishItemTab_Comment revTabLink">
                            puBLisH 
                            <span><i class="fas fa-level-up-alt"></i></span>
                        </div>
                        <div id="${revCommentCancelTabId}" class="revTabLink revCommentCancelTab">Cancel</div>
                    </div>

                    <div id="${revSelectedMediaWrapper_Id}" class="revFlexWrapper"></div>
                `;

                document.getElementById(revCommentViewId).innerHTML = `
                    <div class="revFlexContainer revCommentInputFormContainer">${revCommentFormView}</div>
                `;
            });
        });

        return `<div id="${revCommentInputAreaId}" class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revCommetInput ${revCommentInputStyle}">my commENT</div>`;
    };

    let revEntityCommentsChildrenSubtypesArr = window.revGetEntityChildren_By_Subtype(revEntity._revEntityChildrenList, "rev_comment");

    let revCommentInputStyle = "";

    if (revEntityCommentsChildrenSubtypesArr) revCommentInputStyle = revEntityCommentsChildrenSubtypesArr.length === 0 ? "revCommentInputStyle_No_Border" : "revCommentInputStyle";

    /** END REV COMMENT INPUT PLACEHOLDER */

    let revCommentViewId = "revCommentViewId_" + window.revGenUniqueId();

    let revRetCommentView = `
            <div id="${revCommentViewId}" class="revFlexContainer">
                ${revGetCommentPlaceholder()}
            </div>
        `;

    return revRetCommentView;
};

module.exports.revFormViewWidget = revFormViewWidget;
