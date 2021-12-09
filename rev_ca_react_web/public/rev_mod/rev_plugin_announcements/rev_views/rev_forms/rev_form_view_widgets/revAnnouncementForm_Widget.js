var revFormViewWidget = async (revVarArgs) => {
    let revNewEventItemPageHeader = window.revPageHeader("Publish A New Announcement");

    window.revSetInterval("revPageViewPageNavHeaderId_NewEventItem", async () => {
        let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", null);
        document.getElementById("revPageViewPageNavHeaderId_NewEventItem").innerHTML = revPageViewPageNavHeader;
    });

    /* START REV ICON SELECT */
    let revEventIconsVarArgs = {};
    revEventIconsVarArgs["revSelectFileText"] = "Pictures";

    let revEntityIconSelectDrawId = window.revGenUniqueId();
    revEventIconsVarArgs["revEntityIconSelectDrawId"] = revEntityIconSelectDrawId;

    let revSelectedFiles;
    let revMainSelectedFileIndex;

    let revUploadEntityFiles = (revUploadVarArgs) => {
        window.revLoadModules("revPluginModuleUploadFileObjectsLib", (revScriptModule) => {
            window.revPluginModuleUploadFileObjectsLib.revUploadFileObjects(revUploadVarArgs, (revResStatus) => {
                console.log("FIN : revIcons\n");
            });
        });
    };

    revEventIconsVarArgs["revFilesSelectedCallback"] = (revSelectedFilesVarArgs) => {
        revSelectedFiles = revSelectedFilesVarArgs.revSelectedFiles;
        revMainSelectedFileIndex = revSelectedFilesVarArgs.revMainSelectedFileIndex;

        if (revSelectedFilesVarArgs.revMainSelectedFileIndex == null) {
            document.getElementById(revEntityIconSelectDrawId).innerHTML = "";
            return;
        }

        let revSelectedFile = revSelectedFiles[revSelectedFilesVarArgs.revMainSelectedFileIndex];

        if (!revSelectedFile) {
            document.getElementById(revEntityIconSelectDrawId).innerHTML = "";
            return;
        }

        document.getElementById(revEntityIconSelectDrawId).innerHTML = window.revReadFileToImageFromPath(revSelectedFile, "revListingUserIconBlock");
    };

    revEventIconsVarArgs["revSelectFileId"] = "revSelectFileId";

    let revEntityIconSelectionArea = await window.revEntityIconSelectionArea(revEventIconsVarArgs);

    /* END REV ICON SELECT */

    /** START REV ENTITY NAME */
    let revEntityNameInputId = "revEntityNameInputId_" + window.revGenUniqueId();
    let revEntityNameInput = window.revInputText({
        "revId": revEntityNameInputId,
        "revIcon": "",
        "revTitle": "",
        "revPlaceholderText": "Announcement Title ( required )",
        "revBorderStyle": "revInputTextNoBorder",
    });

    let revEntityNameNameInputArea = `
    <div class="revFlexContainer revEntityDescDetailsArea">
        ${revEntityNameInput}
    </div>
    `;
    /** END REV ENTITY NAME */

    /** START REV ENTITY DESC */
    let revEntityDescInputId = "revEntityDescInputId_" + window.revGenUniqueId();

    let revEntityDescQuill;

    window.revSetInterval(revEntityDescInputId, () => {
        revEntityDescQuill = window.revNewQuill(revEntityDescInputId, "More Details (optional)");
    });

    let revEntityDescInputArea = `
    <div class="revFlexContainer">
        <div id="${revEntityDescInputId}" class="revQuillPubArea"></div>
    </div>
    `;
    /** END REV ENTITY DESC */

    /** START REV EVENT DETAILS */
    let revEntityEventDetailsInputArea = `
    <div class="revFlexContainer revEntityDescDetailsArea">
        ${revEntityDescInputArea}
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revDateSelectTell">Announcement Details are Optional</div>
    </div>
    `;
    /** END REV EVENT DETAILS */

    /** START REV ITEM SUBMIT FORM FOOTER */
    let revSavePersEntity = async () => {
        let revPersEntity = window.REV_ENTITY_STRUCT();
        revPersEntity._revEntityResolveStatus = 0;
        revPersEntity._revEntityChildableStatus = 301;
        revPersEntity._revEntityType = "rev_object";
        revPersEntity._revEntitySubType = "rev_announcement";
        revPersEntity._remoteRevEntityGUID = -1;
        revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntity._revEntityContainerGUID = revVarArgs._remoteRevEntityGUID;
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

        /** REV START REV ENTITY NAME */
        let revPersEntityName = window.revGetTextInputVal(revEntityNameInputId);

        if (revPersEntityName) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_name", revPersEntityName));
        }
        /** REV END REV ENTITY NAME */

        /** REV START REV ENTITY DESC */
        let revPersEntityDesc = revEntityDescQuill.getText();

        if (revPersEntityDesc) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc", revPersEntityDesc));
        }
        /** REV END REV ENTITY DESC */

        /** REV START EVENT HTML DESC */
        let revPersEntityDescHTML = revEntityDescQuill.root.innerHTML;

        if (revPersEntityDescHTML) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_html", revPersEntityDescHTML));
        }
        /** REV END EVENT HTML DESC */

        /** REV START ATTACH INFO */
        revPersEntity._revInfoEntity = revPersInfoEntity;
        /** REV END ATTACH INFO */

        window.revPostServerData(window.REV_CREATE_NEW_AD_REV_ENTITY_URL, { filter: [revPersEntity] }, async (revRetData) => {
            let revRetRemoteEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;
            let revRetRemoteInfoEntityGUID = revRetData.filter[0].revInfoEntityGUID;
            revPersInfoEntity._remoteRevEntityGUID = revRetRemoteInfoEntityGUID;

            revPersEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;

            revUploadEntityFiles({
                "revFiles": revSelectedFiles,
                "revFileType": "rev_file",
                "revMainSelectedFileIndex": revMainSelectedFileIndex,
                "revContainerEntityGUID": revRetRemoteInfoEntityGUID,
            });

            let revPageViewSpaceProfilePage = await window.revGetLoadedPageView("revPageViewSpaceProfilePage", revVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewSpaceProfilePage, "revFloatingOptionsMenuName": "123" });
        });
    };

    let revSubmitPersEntityTabId = "revSubmitPersEntityTabId_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revFormSubmitTab({
        "revId": revSubmitPersEntityTabId,
        "revIcon": '<i class="fa fa-arrow-right"></i>',
        "revTitle": "NEXT",
        "revSubmitCallback": revSavePersEntity,
    });
    /** END REV ITEM SUBMIT FORM FOOTER */

    return `
    <div class="revFlexContainer revPageRightBorderedContainer">
        ${revNewEventItemPageHeader}
        
        <div id="revPageViewPageNavHeaderId_NewEventItem" class="revFlexWrapper revPageViewPageNavHeader revNewEventItemNavHeaderArea"></div>
        
        <div class="revFlexContainer revFormEntryEventContainer">
            ${revEntityNameNameInputArea}
            ${revEntityEventDetailsInputArea}
        <div class="revFlexWrapper revSelectItemMainEventIconsWrapper">${revEntityIconSelectionArea}</div></div>

        <div class="revNewEventItemFormFooter">
            ${revFormSubmitTab}
        </div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
