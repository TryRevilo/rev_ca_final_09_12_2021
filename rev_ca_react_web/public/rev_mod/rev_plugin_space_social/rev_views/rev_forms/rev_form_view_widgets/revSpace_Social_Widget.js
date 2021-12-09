var revFormViewWidget = async (revVarArgs) => {
    let revEntity = window.REV_LOGGED_IN_ENTITY;

    let revNewStoreItemPageHeader = window.revPageHeader('Create A New Family Space');

    window.revSetInterval('revPageViewPageNavHeaderId_NewStoreItem', async () => {
        await window.revGetLoadedPageView('revPageViewPageNavHeader', null, async (revLoadedPageView) => {
            document.getElementById('revPageViewPageNavHeaderId_NewStoreItem').innerHTML = revLoadedPageView;
        });
    });

    /* START REV ICON SELECT */
    let revStoreIconsVarArgs = {};
    revStoreIconsVarArgs['revSelectFileText'] = 'Pictures';

    let revEntityIconSelectDrawId = window.revGenUniqueId();
    revStoreIconsVarArgs['revEntityIconSelectDrawId'] = revEntityIconSelectDrawId;

    let revSelectedFiles;
    let revMainSelectedFileIndex;

    let revUploadEntityFiles = async (revUploadVarArgs) => {
        if (!revUploadVarArgs || !revUploadVarArgs.revContainerEntityGUID || (revUploadVarArgs.revContainerEntityGUID < 1)) return;

        let revFiles = revUploadVarArgs.revFiles;
        let revFileType = revUploadVarArgs.revFileType;
        let revContainerEntityGUID = revUploadVarArgs.revContainerEntityGUID;
        let revMainFileIndex = revUploadVarArgs.revMainSelectedFileIndex;

        let revFileObjectsArr = [];

        for (let i = 0; i < revFiles.length; i++) {
            let revFile = revFiles[i];

            if (revFile) {
                let revRemoteIconFile = window.revSetNewRemoteFile(revFile);

                let revFileSubtype = window.revGetFileObjectSubType(revFile);
                let revEntityFileObject = window.revSetFileObject(revFileSubtype, -1, revRemoteIconFile.name);

                let revFileTypeMetadataVal = window.REV_ENTITY_METADATA_STRUCT();
                revFileTypeMetadataVal._revMetadataName = revFileType;
                revFileTypeMetadataVal._metadataValue = revFileType;

                revEntityFileObject._revEntityMetadataList.push(revFileTypeMetadataVal);

                if (revMainFileIndex && (revMainFileIndex == i)) {
                    revEntityFileObject._revEntityMetadataList.push(window.revMetadataFiller('rev_main_file', revRemoteIconFile.name));
                }

                revEntityFileObject._revEntityGUID = 0;

                revFileObjectsArr.push({ 'revFileObject': revEntityFileObject, 'revFileItem': revRemoteIconFile });
            }
        }

        if (revFileObjectsArr.length == 0) return;

        await window.revLoadModules('revPluginModulePicsAlbumPers', (revScriptModule) => {
            window.revPluginModulePicsAlbumPers.createPicsAlbum_FileObjects({ 'revEntityContainerGUID': revContainerEntityGUID, 'revFileObjectsArr': revFileObjectsArr }, (revResStatus) => {
                console.log('FIN : revIcons');
            });
        });
    };

    revStoreIconsVarArgs['revFilesSelectedCallback'] = revSelectedFilesVarArgs => {
        revSelectedFiles = revSelectedFilesVarArgs.revSelectedFiles;
        revMainSelectedFileIndex = revSelectedFilesVarArgs.revMainSelectedFileIndex;

        if (revSelectedFilesVarArgs.revMainSelectedFileIndex == null) {
            document.getElementById(revEntityIconSelectDrawId).innerHTML = '';
            return;
        }

        let revSelectedFile = revSelectedFiles[(revSelectedFilesVarArgs.revMainSelectedFileIndex)];

        if (!revSelectedFile) {
            document.getElementById(revEntityIconSelectDrawId).innerHTML = '';
            return;
        }

        document.getElementById(revEntityIconSelectDrawId).innerHTML = window.revReadFileToImageFromPath(revSelectedFile, 'revListingUserIconBlock');
    };

    revStoreIconsVarArgs['revSelectFileId'] = 'revSelectFileId';

    let revEntityIconSelectionArea = await window.revEntityIconSelectionArea(revStoreIconsVarArgs);

    /* END REV ICON SELECT */

    /** START REV ENTITY NAME */
    let revEntityNameInputId = 'revEntityNameInputId_' + window.revGenUniqueId();
    let revEntityNameInput = window.revInputText({
        'revId': revEntityNameInputId,
        'revIcon': '<i class="far fa-user"></i>',
        'revTitle': '',
        'revPlaceholderText': 'Name Of Space ( required )',
        'revBorderStyle': 'revInputTextNoBorder'
    });

    let revEntityNameNameInputArea = `
    <div class="revFlexContainer revEntityDescDetailsArea">
        ${revEntityNameInput}
    </div>
    `;
    /** END REV ENTITY NAME */

    /** START REV FAMILY NAME */
    let revFamilyNameInputId = 'revFamilyNameInputId_' + window.revGenUniqueId();
    let revFamilyNameInput = window.revInputText({
        'revId': revFamilyNameInputId,
        'revIcon': '<i class="far fa-user"></i>',
        'revTitle': '',
        'revPlaceholderText': 'Family Name ( required )',
        'revBorderStyle': 'revInputTextNoBorder'
    });

    let revEntityFamilyNameInputArea = `
    <div class="revFlexContainer revEntityDescDetailsArea">
        ${revFamilyNameInput}
        <div class="revFontSiteGreyTxtColor revFontSizeNormalItalic revFamilyNameTell">
            A Family Name will usually be a second or last name most common with your relatives
        </div>
    </div>
    `;
    /** END REV FAMILY NAME */

    /** START REV ENTITY DESC */
    let revEntityDescInputId = 'revEntityDescInputId_' + window.revGenUniqueId();

    let revEntityDescQuill;

    window.revSetInterval(revEntityDescInputId, () => {
        revEntityDescQuill = window.revNewQuill(revEntityDescInputId, 'More Details (optional)');
    });

    let revEntityDescInputArea = `
    <div class="revFlexContainer">
        <div class="revFlexContainer revEntityDescDetailsArea">
            <div id="${revEntityDescInputId}" class="revQuillPubArea"></div>
        </div>
    </div>
    `;

    /** END REV ENTITY DESC */

    /** START REV ITEM SUBMIT FORM FOOTER */

    let revSavePersEntity = async () => {
        let revPersEntity = window.REV_ENTITY_STRUCT();
        revPersEntity._revEntityResolveStatus = 0;
        revPersEntity._revEntityChildableStatus = 301;
        revPersEntity._revEntityType = 'revObject';
        revPersEntity._revEntitySubType = 'rev_store_item';
        revPersEntity._remoteRevEntityGUID = -1;
        revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntity._revEntityContainerGUID = revEntity._remoteRevEntityGUID;
        revPersEntity._revTimeCreated = new Date().getTime();

        /** REV START REV ENTITY NAME */
        let revPersEntityName = window.revGetTextInputVal(revEntityNameInputId);

        if (revPersEntityName) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller('rev_entity_name', revPersEntityName));
        }
        /** REV END REV ENTITY NAME */

        /** REV START REV ENTITY DESC */
        let revPersEntityDesc = revEntityDescQuill.getText();

        if (revPersEntityDesc) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller('rev_entity_desc', revPersEntityDesc));
        }
        /** REV END REV ENTITY DESC */

        /** REV START STORE HTML DESC */
        let revPersEntityDescHTML = revEntityDescQuill.root.innerHTML;

        if (revPersEntityDescHTML) {
            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller('rev_entity_desc_html', revPersEntityDescHTML));
        }
        /** REV END STORE HTML DESC */

        console.log('revPersEntity : ' + JSON.stringify(revPersEntity));

        await window.revPostServerData(window.REV_CREATE_NEW_AD_REV_ENTITY_URL, { filter: [revPersEntity] }, async (revRetData) => {
            let revRetRemoteEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;
            revPersEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;

            await revUploadEntityFiles(
                {
                    'revFiles': revSelectedFiles,
                    'revFileType': 'rev_store_icon',
                    'revMainSelectedFileIndex': revMainSelectedFileIndex,
                    'revContainerEntityGUID': revRetRemoteEntityGUID
                });


            let revOnPaymentCallbackMethod = async (revCalbackVarArgs) => {
                await window.revGetLoadedPageViewAreaContainer('revObjectStoreItem', revPersEntity, (_revView) => {
                    document.getElementById('revPageHome').innerHTML = _revView;
                });
            };

            let revSelectPaymentOptionForm = await window.revGetForm('revSelectPaymentOption', { 'revEntity': revPersEntity, 'revOnPaymentCallbackMethod': revOnPaymentCallbackMethod });
            document.getElementById('revPageHome').innerHTML = revSelectPaymentOptionForm;
        });

    };

    let revSubmitPersEntityTabId = 'revSubmitPersEntityTabId_' + window.revGenUniqueId();

    let revFormSubmitTab = window.revFormSubmitTab({
        'revId': revSubmitPersEntityTabId,
        'revIcon': '<i class="fa fa-arrow-right"></i>',
        'revTitle': 'NEXT',
        'revSubmitCallback': revSavePersEntity,
    });

    /** END REV ITEM SUBMIT FORM FOOTER */

    return `
    <div class="revFlexContainer revPageRightBorderedContainer">
        ${revNewStoreItemPageHeader}
        
        <div id="revPageViewPageNavHeaderId_NewStoreItem" class="revFlexWrapper revPageViewPageNavHeader revNewStoreItemNavHeaderArea"></div>
        
        <div class="revFlexContainer revFormEntryGrpContainer">
            ${revEntityNameNameInputArea}
            ${revEntityFamilyNameInputArea}
        <div class="revFlexWrapper revSelectItemMainFamilyIconWrapper">${revEntityIconSelectionArea}</div>
            ${revEntityDescInputArea}
        </div>

        <div class="revNewStoreItemFormFooter">
            ${revFormSubmitTab}
        </div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;