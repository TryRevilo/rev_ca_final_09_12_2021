var revFormViewWidget = async (revVarArgs) => {
    if (!revVarArgs) {
        return "ERR -> revPublisherFormWidget.js -> revVarArgs";
    }

    let revCancelPublisherFormCallback = revVarArgs.revCancelPublisherFormCallback;
    let revPublisherFormHintText = revVarArgs.revPublisherFormHintText;

    let revTextingQuill;

    let revPublisherFormInputArea_Id = "revPublisherFormInputArea_Id_" + window.revGenUniqueId();

    let revGetpublisherForm = async () => {
        let revSelectedMediaWrapper_Id = "revSelectedMediaWrapper_Id" + window.revGenUniqueId();

        window.revSetInterval(revPublisherFormInputArea_Id, () => {
            revTextingQuill = window.revNewQuill(revPublisherFormInputArea_Id, revPublisherFormHintText);
            revTextingQuill.focus();
        });

        let revPassVarArgs = window.revCloneJsObject(revVarArgs);

        revPassVarArgs["revFilesSelectedCallback"] = (revFiles) => {
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
                document.getElementById(revSelectedMediaWrapper_Id).classList.add("revSelectedMediaWrapper_PublisherForms");
            } else {
                document.getElementById(revSelectedMediaWrapper_Id).classList.remove("revSelectedMediaWrapper_PublisherForms");
            }

            revVarArgs.revFilesSelectedCallback(revFiles);
        };

        let revFileExplorerMenuItem = "";

        if (revVarArgs.revFilesSelectedCallback) {
            revFileExplorerMenuItem = await window.revGetMenuItem("revMenuItemFileExplorerTab", revPassVarArgs);
        }

        let revPublishItemTabView = "";

        let revGetPublishItemTabView = () => {
            let revPublishItemTab_PublisherForm_Id = "revPublishItemTab_PublisherForm_" + window.revGenUniqueId();

            window.revSetInterval(revPublishItemTab_PublisherForm_Id, () => {
                document.getElementById(revPublishItemTab_PublisherForm_Id).addEventListener("click", (event) => {
                    let revEditorPlainText = revTextingQuill.getText();
                    let revEditorHTML = revTextingQuill.root.innerHTML;

                    revVarArgs.revPublisherPublishCallback({ "revEditorPlainText": revEditorPlainText, "revEditorHTML": revEditorHTML });
                });
            });

            return `
            &nbsp;
            <a class="revEmojiItemTab_PublisherForm"><i class="far fa-smile"></i></a>
            <div id="${revPublishItemTab_PublisherForm_Id}" class="revSmalllBoldBlue revPublishItemTab_PublisherForm revTabLink">
                puBLisH 
                <span><i class="fas fa-level-up-alt"></i></span>
            </div>
            `;
        };

        if (revVarArgs.revPublisherPublishCallback) {
            revPublishItemTabView = revGetPublishItemTabView();
        }

        let revPublisherFormAdditionalInputsFooterArea = "";

        if (revVarArgs.revPublisherFormAdditionalInputsFooterArea) {
            revPublisherFormAdditionalInputsFooterArea = revVarArgs.revPublisherFormAdditionalInputsFooterArea;
        }

        let revPublisherFormCancelTabView = "";

        let revGetPublisherFormCancelTabView = () => {
            let revPublisherFormCancelTabId = "revPublisherFormCancelTabId_" + window.revGenUniqueId();

            window.revSetInterval(revPublisherFormCancelTabId, () => {
                document.getElementById(revPublisherFormCancelTabId).addEventListener("click", () => {
                    revCancelPublisherFormCallback();
                });
            });

            return `<div id="${revPublisherFormCancelTabId}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPublisherFormCancelTab">Cancel</div>`;
        };

        if (revFileExplorerMenuItem || revPublishItemTabView) {
            revPublisherFormCancelTabView = revGetPublisherFormCancelTabView();
        }

        /** REV START SETTINGS */
        let revPublisherFormOptionalFooterAreaContainer_Id = "revPublisherFormOptionalFooterAreaContainer_Id_" + window.revGenUniqueId();

        let revChatSettingsForm = () => {
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
                    document.getElementById(revPublisherFormOptionalFooterAreaContainer_Id).innerHTML = "";
                });
            });

            return `
            <div class="revFlexContainer revPublisherFormOptionalFooterAreaContainer">
                <div class="revFontSizeNormalHeader revPublisherSettingsHeader">sEtTiNGs</div>
                <div class="revFlexWrapper revPublisherSettingsFormViewWrapper">
                    <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                        ${revCheckBoxPublic}
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">puBLic</div>
                    </div>
                    <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                        ${revCheckBoxPublic}
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">commENTs</div>
                    </div>
                    <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                        ${revCheckBoxPublic}
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">sHaREs</div>
                    </div>

                    <div id="${revPublisherFormOptionalFooterAreaContainerHideTab_Id}" class="revTabLink revFontSiteBlueTxtColor revHidePublisherSettingsTab">HiDE</div>
                </div>
            </div>
            `;
        };

        let revPublisherSettingsTab_Id = "revPublisherSettingsTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revPublisherSettingsTab_Id, () => {
            document.getElementById(revPublisherSettingsTab_Id).addEventListener("click", (event) => {
                window.revSetInterval(revPublisherFormOptionalFooterAreaContainer_Id, () => {
                    document.getElementById(revPublisherFormOptionalFooterAreaContainer_Id).innerHTML = revChatSettingsForm();
                });
            });
        });

        let revPublisherSettingsTab = "";

        if (revVarArgs.revPublisherSettingsTab) {
            revPublisherSettingsTab = `<div id="${revPublisherSettingsTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeLarge revKiwiPostSettingsTab"><i class="fas fa-cog"></i></div>`;
        }
        /** REV END SETTINGS */

        let revPublisherFormFormView = `
                <div class="revQuillPubArea">
                    <div id="${revPublisherFormInputArea_Id}"></div>
                </div>

                ${revPublisherFormAdditionalInputsFooterArea}

                <div id="${revPublisherFormOptionalFooterAreaContainer_Id}" class="revFlexContainer"></div>
            
                <div class="revFlexWrapper revPublisherTabsMenuAreaWrapper">
                    ${revFileExplorerMenuItem}
                    ${revPublisherSettingsTab}
                    ${revPublishItemTabView}
                    ${revPublisherFormCancelTabView}
                </div>

                <div id="${revSelectedMediaWrapper_Id}" class="revFlexWrapper"></div>
            `;

        return `<div class="revFlexContainer">${revPublisherFormFormView}</div>`;
    };

    return revGetpublisherForm();
};

module.exports.revFormViewWidget = revFormViewWidget;
