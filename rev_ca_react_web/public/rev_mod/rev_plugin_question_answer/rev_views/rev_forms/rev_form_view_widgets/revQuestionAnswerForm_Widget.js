var revFormViewWidget = async (revVarArgs) => {
    let revEntity = revVarArgs;

    let revInfoPicsAlbumEntityGUID = -1;

    let revSelectedPicsAlbumFiles = [];
    let revMainSelectedFileIndex = 0;

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

    let revSavePersEntity = async (revPassParams) => {
        let revPersEntitymintMessageVal = revPassParams.revEditorPlainText;
        let revPersEntitymintMessageVal_HTML = revPassParams.revEditorHTML;

        let revPersEntity = window.REV_ENTITY_STRUCT();
        revPersEntity._remoteRevEntityGUID = -1;
        revPersEntity._revEntityResolveStatus = 0;
        revPersEntity._revEntityType = "revObject";
        revPersEntity._revEntitySubType = "rev_question_answer";
        revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntity._revEntityContainerGUID = revVarArgs._remoteRevEntityGUID;
        revPersEntity._revEntityChildableStatus = 3;
        revPersEntity._revTimeCreated = new Date().getTime();

        /** START REV INFO */
        let revPersInfoEntity = window.REV_ENTITY_STRUCT();
        revPersInfoEntity._remoteRevEntityGUID = -1;
        revPersInfoEntity._revEntityResolveStatus = 0;
        revPersInfoEntity._revEntityChildableStatus = 3;
        revPersInfoEntity._revEntityType = "revObject";
        revPersInfoEntity._revEntitySubType = "rev_entity_info";
        revPersInfoEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersInfoEntity._revEntityContainerGUID = revPersEntity._remoteRevEntityGUID;
        revPersInfoEntity._revEntityChildableStatus = 3;
        revPersInfoEntity._revTimeCreated = new Date().getTime();
        /** END REV INFO */

        /** REV START REV ENTITY DESC */
        if (revPersEntitymintMessageVal) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc", revPersEntitymintMessageVal));
        }
        /** REV END REV ENTITY DESC */

        /** REV START ENTITY HTML DESC */
        if (revPersEntitymintMessageVal_HTML) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_html", revPersEntitymintMessageVal_HTML));
        }
        /** REV END ENTITY HTML DESC */

        /** REV START ATTACH INFO */
        revPersEntity._revInfoEntity = revPersInfoEntity;
        /** REV END ATTACH INFO */

        await window.revPostServerData(window.REV_CREATE_NEW_AD_REV_ENTITY_URL, { filter: [revPersEntity] }, async (revRetData) => {
            let revRetEntity = revRetData.filter[0];

            let revRetRemoteEntityGUID = revRetEntity._remoteRevEntityGUID;
            revPersEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;

            let revInfoEntityGUID = revRetEntity.revInfoEntityGUID;

            revPersInfoEntity._revEntityContainerGUID = revRetRemoteEntityGUID;
            revPersInfoEntity._revEntityRemoteContainerGUID = revRetRemoteEntityGUID;
            revPersInfoEntity._remoteRevEntityGUID = revInfoEntityGUID;

            revPersEntity._revEntityChildrenList.push(revPersInfoEntity);

            if (revInfoEntityGUID > 0) {
                revUploadInfoPicsAlbum(revInfoEntityGUID);
            }
        });
    };

    let revGetAnswerPublisherPlaceholder = () => {
        let revGetAnswerPublisherInputArea_Id = "revGetAnswerPublisherInputArea_Id_" + window.revGenUniqueId();

        window.revSetInterval(revGetAnswerPublisherInputArea_Id, () => {
            document.getElementById(revGetAnswerPublisherInputArea_Id).addEventListener("click", async function (event) {
                let revNewMintConversations = () => {
                    let revSelectedQuestionAnswerPicsArea_Id = "revSelectedQuestionAnswerPicsArea_Id_" + window.revGenUniqueId();

                    return `<div id="${revSelectedQuestionAnswerPicsArea_Id}" class="revFlexContainer"></div>`;
                };

                let revPassVarArgs = window.revCloneJsObject(revVarArgs);

                revPassVarArgs["revPublisherFormHintText"] = "PosT ANswER";
                revPassVarArgs["revPublisherFormAdditionalInputsFooterArea"] = revNewMintConversations();

                revPassVarArgs["revCancelPublisherFormCallback"] = () => {
                    document.getElementById(revMintFormAreaView_Id).innerHTML = revGetAnswerPublisherPlaceholder();
                };

                revPassVarArgs["revFilesSelectedCallback"] = (revFiles) => {
                    revSelectedPicsAlbumFiles = revFiles;
                    console.log("revSelectedPicsAlbumFiles : " + JSON.stringify(revSelectedPicsAlbumFiles));
                };

                revPassVarArgs["revPublisherPublishCallback"] = (revPassParams) => {
                    revSavePersEntity(revPassParams);
                };

                let revCommentFormView = await window.revGetForm("revPublisherForm", revPassVarArgs);
                document.getElementById(revMintFormAreaView_Id).innerHTML = `<div class="revFlexContainer">${revCommentFormView}</div>`;
            });
        });

        return `<div id="${revGetAnswerPublisherInputArea_Id}" class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">&nbsp;&nbsp;PosT ANswER</div>`;
    };

    let revMintFormAreaView_Id = "revMintFormAreaView_Id_" + window.revGenUniqueId();

    return `<div id="${revMintFormAreaView_Id}" class="revQuestionAnswerPublisherInput">${revGetAnswerPublisherPlaceholder()}</div>`;
};

module.exports.revFormViewWidget = revFormViewWidget;
