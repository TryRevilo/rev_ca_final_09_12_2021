var revFormViewWidget = async (revVarArgs) => {
    let revEntityGUID = -1;
    let revContainerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
    let revInfoEntity;
    let revPicsAlbumsArr;
    let revInfoPicsAlbum;
    let revInfoPicsAlbumEntityGUID = -1;

    /** REV START CURR ENTITY GUID */
    /**
     * If > 0
     * -> Update
     * -> EntityGUID == Passed revVarArgs EntityGUID
     * -> Get Info
     * -> Get Info Pics ALBUM Album
     *
     * Else
     * -> New Entity
     * -> EntityGUID == -1
     *
     */
    if (revVarArgs && revVarArgs._revEntitySubType && revVarArgs._revEntitySubType.localeCompare("rev_family_space") == 0 && revVarArgs._remoteRevEntityGUID) {
        revEntityGUID = revVarArgs._remoteRevEntityGUID;
        revContainerGUID = revVarArgs._revEntityContainerGUID;

        if (revVarArgs._revInfoEntity) {
            revInfoEntity = revVarArgs._revInfoEntity;

            revPicsAlbumsArr = window.revGetEntityChildren_By_Subtype(revInfoEntity._revEntityChildrenList, "rev_pics_album");

            if (Array.isArray(revPicsAlbumsArr)) {
                revInfoPicsAlbum = revPicsAlbumsArr[0];

                if (revInfoPicsAlbum && revInfoPicsAlbum._remoteRevEntityGUID && revInfoPicsAlbum._remoteRevEntityGUID > 0) {
                    revInfoPicsAlbumEntityGUID = revInfoPicsAlbum._remoteRevEntityGUID;
                }
            }
        }
    }
    /** REV END CURR ENTITY GUID */

    /* START REV ICON SELECT */
    let revStoreIconsVarArgs = {};
    revStoreIconsVarArgs["revSelectFileText"] = "Pictures";

    let revEntityIconSelectDrawId = window.revGenUniqueId();
    revStoreIconsVarArgs["revEntityIconSelectDrawId"] = revEntityIconSelectDrawId;

    let revSelectedFiles;
    let revMainSelectedFileIndex;

    revStoreIconsVarArgs["revFilesSelectedCallback"] = (revSelectedFilesVarArgs) => {
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

    revStoreIconsVarArgs["revSelectFileId"] = "revSelectFileId";

    let revEntityIconSelectionArea = await window.revEntityIconSelectionArea(revStoreIconsVarArgs);

    /* END REV ICON SELECT */

    /** START REV ENTITY NAME */
    let revEntityNameInputId = "revEntityNameInputId_" + window.revGenUniqueId();

    let revEntityNameInput = window.revInputText({
        "revId": revEntityNameInputId,
        "revIcon": '<div class="revQuestionFormTitleIcon"><i class="fas fa-exclamation revFontSizeNormal"></i></div>',
        "revTitle": "",
        "revPlaceholderText": "Name Of Space ( required )",
    });
    /** END REV ENTITY NAME */

    /** START REV FAMILY NAME */
    let revFamilyNameInputId = "revFamilyNameInputId_" + window.revGenUniqueId();
    let revFamilyNameInput = window.revInputText_Flat({
        "revId": revFamilyNameInputId,
        "revTitle": "",
        "revPlaceholderText": "Family Name ( required )",
        "revBorderStyle": "revInputTextNoBorder",
    });

    let revEntityFamilyNameInputArea = `
    <div class="revFlexContainer revEntityDescDetailsArea_BottomBorder revEntityDescDetailsArea_LeftBorder">
        ${revFamilyNameInput}
        <div class="revFontSiteGreyTxtColor revFontSizeNormalItalic revFamilyNameTell">
            A Family Name will usually be a second or last name most common with your relatives
        </div>
    </div>
    `;
    /** END REV FAMILY NAME */

    /** START REV ENTITY DESC */
    let revEntityDescInputId = "revEntityDescInputId_" + window.revGenUniqueId();

    let revEntityDescQuill;

    window.revSetInterval(revEntityDescInputId, () => {
        revEntityDescQuill = window.revNewQuill(revEntityDescInputId, "More Details (optional)");
    });

    let revEntityDescInputArea = `
    <div class="revFlexContainer revEntityDescDetailsArea_T_B_L_Border revEntityDescDetailsArea_Family">
        <div id="${revEntityDescInputId}" class="revQuillPubArea"></div>
    </div>
    `;

    /** END REV ENTITY DESC */

    /** START REV ITEM SUBMIT FORM FOOTER */

    let revSavePersEntity = async () => {
        let revPersEntity = window.REV_ENTITY_STRUCT();
        revPersEntity._revEntityResolveStatus = 0;
        revPersEntity._revEntityChildableStatus = 301;
        revPersEntity._revEntityType = "rev_group_entity";
        revPersEntity._revEntitySubType = "rev_family_space";
        revPersEntity._remoteRevEntityGUID = -1;
        revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntity._revEntityContainerGUID = -1;
        revPersEntity._revTimeCreated = new Date().getTime();

        /** START REV INFO */
        let revPersInfoEntity = window.REV_ENTITY_STRUCT();
        revPersInfoEntity._remoteRevEntityGUID = -1;
        revPersInfoEntity._revEntityResolveStatus = 0;
        revPersInfoEntity._revEntityChildableStatus = 3;
        revPersInfoEntity._revEntityType = "revObject";
        revPersInfoEntity._revEntitySubType = "rev_space_entity_info";
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

        /** REV START REV FAMILY NAME */
        let revFamilyName = window.revGetTextInputVal(revFamilyNameInputId);

        if (revFamilyName) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_family_name", revFamilyName));
        }
        /** REV END REV FAMILY NAME */

        /** REV START REV ENTITY DESC */
        let revPersEntityDesc = revEntityDescQuill.getText();

        if (revPersEntityDesc) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc", revPersEntityDesc));
        }
        /** REV END REV ENTITY DESC */

        /** REV START STORE HTML DESC */
        let revPersEntityDescHTML = revEntityDescQuill.root.innerHTML;

        if (revPersEntityDescHTML) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_entity_desc_html", revPersEntityDescHTML));
        }
        /** REV END STORE HTML DESC */

        /** REV START ATTACH INFO */
        revPersEntity._revInfoEntity = revPersInfoEntity;
        /** REV END ATTACH INFO */

        /** REV START SPACE ADMIN REL */
        let revSpaceAdminRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
        revSpaceAdminRel._revEntityRelationshipType = "rev_admin_of";
        revSpaceAdminRel._remoteRevEntityTargetGUID = -1;
        revSpaceAdminRel._remoteRevEntitySubjectGUID = window.REV_LOGGED_IN_ENTITY_GUID;

        revPersEntity._revTargetEntityRelationships.push(revSpaceAdminRel);
        /** REV END SPACE ADMIN REL */

        /** REV START UPLOAD ENTITY INFO PICS ALBUM */
        let revUploadInfoEntiyPicsAlbum = (revPassVarArgsPicsAlbum) => {
            window.revLoadModules("revPluginModuleUploadFileObjectsLib", (revScriptModule) => {
                window.revPluginModuleUploadFileObjectsLib.revUploadFileObjects(revPassVarArgsPicsAlbum, async (revResStatus) => {
                    let revLoadedPageView = await window.revGetLoadedPageView("revPageViewSpaceProfilePage", revPersEntity);
                    window.revDrawMainContentArea({ "revData": revPersEntity, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": "123" });
                });
            });
        };
        /** REV END UPLOAD ENTITY INFO PICS ALBUM */

        if (revEntityGUID && revEntityGUID > 0) {
            let revEntityUpdateDataArr = [];

            let revSpaceEntityUdateData = window.revEntityUdateData(revVarArgs, revPersEntity);
            revEntityUpdateDataArr.push(revSpaceEntityUdateData);

            if (revVarArgs._revInfoEntity) {
                let revSpaceInfoEntityUdateData = window.revEntityUdateData(revVarArgs._revInfoEntity, revPersInfoEntity);
                revEntityUpdateDataArr.push(revSpaceInfoEntityUdateData);
            }

            window.revPostServerData(window.REV_UPDATE_REV_ENTITIES_DATA_URL, { filter: revEntityUpdateDataArr }, (revRetData) => {
                let revIsNewEntity = true;

                if (revInfoPicsAlbumEntityGUID > 0) {
                    revIsNewEntity = false;
                }

                /** REV START UPLOAD FILES */
                revUploadInfoEntiyPicsAlbum({
                    "revFiles": revSelectedFiles,
                    "revFileType": "rev_file",
                    "revMainSelectedFileIndex": revMainSelectedFileIndex,
                    "revContainerEntityGUID": revInfoPicsAlbumEntityGUID,
                    "revIsNewEntity": revIsNewEntity,
                });
                /** REV END UPLOAD FILES */
            });

            /** REV START DEL PICS FILES */
            let revEntityDelPicsGUIDsArr = [];

            for (let i = 0; i < revEntityDelPicsArr.length; i++) {
                revEntityDelPicsGUIDsArr.push(revEntityDelPicsArr[i]._remoteRevEntityGUID);
            }

            if (revEntityDelPicsGUIDsArr.length > 0) {
                window.revPostServerData(window.REV_DELETE_REV_ENTITY_WITH_CHILDS_URL, { filter: revEntityDelPicsGUIDsArr }, (revRetData) => {
                    console.log("DEL revRetData :" + JSON.stringify(revRetData));
                });
            }
            /** REV END DEL PICS FILES */
        } else {
            window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, { filter: [revPersEntity] }, async (revRetData) => {
                let revRetRemoteEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;
                let revRetRemoteInfoEntityGUID = revRetData.filter[0].revInfoEntityGUID;
                revPersInfoEntity._remoteRevEntityGUID = revRetRemoteInfoEntityGUID;

                revPersEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;

                revUploadInfoEntiyPicsAlbum({
                    "revFiles": revSelectedFiles,
                    "revFileType": "rev_file",
                    "revMainSelectedFileIndex": revMainSelectedFileIndex,
                    "revContainerEntityGUID": revRetRemoteInfoEntityGUID,
                });
            });
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
    let revHeaderTx = `NEw FAmiLy spAcE`;

    let revPageAreaHeaderNewSubTypeCallback = async (revVarArgs) => {
        let revCreateNewFamilyRelationshipForm = await window.revGetForm("revCreateNewFamilyRelationshipForm", revVarArgs);

        window.revToggleSwitchArea(`
            <div class="revFlexContainer revCreateUserConnectionsFormContainer">
                <div class="revFontSizeNormalHeader revPublisherSettingsHeader">aDD NEw FAmiLy mEmBER</div>
                ${revCreateNewFamilyRelationshipForm}
            </div>
            `);
    };

    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revPageAreaHeaderNewSubTypeCallback": revPageAreaHeaderNewSubTypeCallback, "revDafaultPagePagination": true });

    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader(revHeaderTx);
    /** REV END HEADER AREA */

    return `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
            ${revPageHeader}
        </div>
        <div class="revFlexContainer revSpaceFamilyFormWidgetContainer">
            ${revEntityNameInput}
            ${revEntityFamilyNameInputArea}
            <div class="revFlexWrapper revSelectItemMainFamilyIconWrapper">${revEntityIconSelectionArea}</div>
            ${revEntityDescInputArea}
            <div class="revNewFamilySpaceFormFooter">
                ${revFormSubmitTab}
            </div>
        </div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
