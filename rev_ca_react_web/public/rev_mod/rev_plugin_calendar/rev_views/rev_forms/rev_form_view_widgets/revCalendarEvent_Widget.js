var revFormViewWidget = async (revVarArgs) => {
    let revEntityGUID = -1;
    let revContainerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
    let revInfoEntity;
    let revPicsAlbumsArr;
    let revInfoPicsAlbum;
    let revInfoPicsAlbumEntityGUID = -1;

    /** START REV DELARE DATES VARS */
    let revEventStartDate;
    let revEventEndDate;
    /** END REV DELARE DATES VARS */

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
    if (revVarArgs && revVarArgs._revEntitySubType.localeCompare("rev_calendar_event") == 0 && revVarArgs._remoteRevEntityGUID) {
        revEntityGUID = revVarArgs._remoteRevEntityGUID;
        revContainerGUID = revVarArgs._revEntityContainerGUID;

        revInfoEntity = window.revGetEntityChildren_By_Subtype(revVarArgs._revEntityChildrenList, "rev_entity_info");
        revInfoEntity = revInfoEntity[0];

        if (revInfoEntity) {
            revPicsAlbumsArr = window.revGetEntityChildren_By_Subtype(revInfoEntity._revEntityChildrenList, "rev_pics_album");

            if (Array.isArray(revPicsAlbumsArr)) {
                revInfoPicsAlbum = revPicsAlbumsArr[0];

                if (revInfoPicsAlbum && revInfoPicsAlbum._remoteRevEntityGUID && revInfoPicsAlbum._remoteRevEntityGUID > 0) revInfoPicsAlbumEntityGUID = revInfoPicsAlbum._remoteRevEntityGUID;
            }
        }
    } else revContainerGUID = revVarArgs._remoteRevEntityGUID;
    /** REV END CURR ENTITY GUID */

    /** REV START PAGE NAV HEADER */
    let revHeaderTxt = "Create A CalendAR Event";

    let revPageRightBorderedContainer = "revPageRightBorderedContainer";

    if (revEntityGUID > 0) {
        revHeaderTxt = "Update CalendAR Event";
        revPageRightBorderedContainer += " revPageRightBorderedContainer_PullUpMargin";
    }

    let revNewEventItemPageHeader = window.revPageHeader(revHeaderTxt);

    let revPageViewPageNavHeaderArea = "";

    if (revEntityGUID < 1) {
        let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", null);
        revPageViewPageNavHeaderArea = `
            <div id="revPageViewPageNavHeaderId_NewEventItem" class="revFlexWrapper revPageViewPageNavHeader revNewEventItemNavHeaderArea">${revPageViewPageNavHeader}</div>
        `;
    }
    /** REV END PAGE NAV HEADER */

    /* START REV INFO PICS ALBUM SELECT */
    let revPicsAlbumOverrideView = "";
    let revEntityDelPicsArr = [];

    /** START edit update pics album  */
    if (revInfoPicsAlbum) {
        let revPassVarArgs = window.revCloneJsObject(revInfoPicsAlbum);

        let revPicsAlbumEditCallBack = (revEditVarArgs) => {
            if (revEditVarArgs && revEditVarArgs.hasOwnProperty("revEntityDelPicItem")) {
                revEntityDelPicsArr.push(revEditVarArgs.revEntityDelPicItem);
                revInfoPicsAlbum = window.revRemoveEntityChild_By_EntityGUID(revInfoPicsAlbum, [revEditVarArgs.revEntityDelPicItem._remoteRevEntityGUID]);
            }
        };

        revPassVarArgs["revPicsAlbumEditCallBack"] = revPicsAlbumEditCallBack;
        revPassVarArgs["revIsEditable"] = true;

        revPicsAlbumOverrideView = await window.revGetLoadedOverrideView("rev_photo", revPassVarArgs);
    }
    /** END edit update pics album */

    /** START On select callback varArgs */
    let revEventIconsVarArgs = {};
    revEventIconsVarArgs["revSelectFileText"] = "Pictures";

    let revEntityIconSelectDrawId = window.revGenUniqueId();
    revEventIconsVarArgs["revEntityIconSelectDrawId"] = revEntityIconSelectDrawId;

    let revSelectedFiles;
    let revMainSelectedFileIndex;

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
    /** END On select callback varArgs */

    let revEntityIconSelectionArea = await window.revEntityIconSelectionArea(revEventIconsVarArgs);

    /* END REV INFO PICS ALBUM SELECT */

    /** START REV ENTITY NAME */
    let revEntityNameInputId = "revEntityNameInputId_" + window.revGenUniqueId();
    let revEntityNameInput = window.revInputText({
        "revId": revEntityNameInputId,
        "revIcon": "",
        "revTitle": "",
        "revPlaceholderText": "Event nAmE | tiTLE ( required )",
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
        revEntityDescQuill = window.revNewQuill(revEntityDescInputId, "evENT Details (optional)");
    });

    let revEntityDescInputArea = `
    <div class="revFlexContainer">
        <div id="${revEntityDescInputId}" class="revQuillPubArea"></div>
    </div>
    `;
    /** END REV ENTITY DESC */

    /** START REV START DATE */
    let revEntityStartDateInput_Id = "revEntityStartDateInput_Id_" + window.revGenUniqueId();
    let revEntityStartDateInput = window.revInputText({
        "revId": revEntityStartDateInput_Id,
        "revIcon": '<i class="far fa-calendar-plus"></i>',
        "revTitle": "Start Date ( Required )",
        "revPlaceholderText": "",
        "revBorderStyle": "revInputTextNoBorder",
    });

    window.revSetInterval(revEntityStartDateInput_Id, () => {
        let revCalSelectCallback = (revCalInput) => {
            console.log("START DATE : " + revCalInput.value);
            revEventStartDate = revCalInput.value;
        };

        let revCalendar_From = new SalsaCalendar({
            inputId: revEntityStartDateInput_Id,
            lang: "en",
            range: {
                min: false,
                max: false,
                weekdays: false,
                closing_dates: false,
            },
            minDate: false,
            fixed: false,
            connectCalendar: false,
            calendarPosition: "bottom",
            fixed: false,
            dateFormats: {},
            onSelect: revCalSelectCallback,
        });

        document.getElementById(revEntityStartDateInput_Id).value = ". . .";
    });

    let revEntityStartDateInputArea = `
    <div class="revFlexContainer revEntitySelectDateAreaContainer">
        ${revEntityStartDateInput}
    </div>
    `;
    /** END REV START DATE */

    /** START REV END DATE */
    let revEntityEndDateInput_Id = "revEntityEndDateInput_Id" + window.revGenUniqueId();

    window.revSetInterval(revEntityEndDateInput_Id, () => {
        let revCalSelectCallback = (revCalInput) => {
            console.log("END DATE : " + revCalInput.value);
            revEventEndDate = revCalInput.value;
        };

        let revCalendar_To = new SalsaCalendar({
            inputId: revEntityEndDateInput_Id,
            lang: "en",
            range: {
                min: false,
                max: false,
                weekdays: false,
                closing_dates: false,
            },
            minDate: false,
            fixed: false,
            connectCalendar: false,
            calendarPosition: "bottom",
            fixed: false,
            dateFormats: {},
            onSelect: revCalSelectCallback,
        });

        document.getElementById(revEntityEndDateInput_Id).value = ". . .";
    });

    let revEntityEndDateInput = window.revInputText({
        "revId": revEntityEndDateInput_Id,
        "revIcon": '<i class="far fa-calendar-plus"></i>',
        "revTitle": "End Date ( Required )",
        "revPlaceholderText": "",
        "revBorderStyle": "revInputTextNoBorder",
    });

    let revEntityEndDateInputArea = `
    <div class="revFlexContainer revEntitySelectDateAreaContainer">
        ${revEntityEndDateInput}
    </div>
    `;
    /** END REV END DATE */

    /** START REV EVENT DETAILS */
    let revEntityEventDetailsInputArea = `
    <div class="revFlexContainer revEntityDescDetailsArea">
        ${revEntityDescInputArea}
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revDateSelectTell">Event dates are required below</div>
        <div class="revFlexWrapper">${revEntityStartDateInputArea} ${revEntityEndDateInputArea}</div>
    </div>
    `;
    /** END REV EVENT DETAILS */

    /** START REV ITEM SUBMIT FORM FOOTER */
    let revSavePersEntity = async () => {
        let revPersEntity = window.REV_ENTITY_STRUCT();
        revPersEntity._revEntityResolveStatus = 0;
        revPersEntity._revEntityChildableStatus = 301;
        revPersEntity._revEntityType = "rev_object";
        revPersEntity._revEntitySubType = "rev_calendar_event";
        revPersEntity._remoteRevEntityGUID = revEntityGUID;
        revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
        revPersEntity._revEntityContainerGUID = revContainerGUID;
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

        /** REV START EVENT START DATE */
        if (revEventStartDate) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_start_date", revEventStartDate));
        }
        /** REV END EVENT START DATE */

        /** REV START EVENT END DATE */
        if (revEventEndDate) {
            revPersInfoEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_end_date", revEventEndDate));
        }
        /** REV END EVENT END DATE */

        /** REV START ATTACH INFO */
        revPersEntity._revInfoEntity = revPersInfoEntity;
        /** REV END ATTACH INFO */

        let revUploadInfoEntiyPicsAlbum = (revEntityContainerGUID) => {
            let revIsNewEntity = true;

            if (revInfoPicsAlbumEntityGUID > 0) revIsNewEntity = false;

            let revUploadVarArgs = {
                "revFiles": revSelectedFiles,
                "revFileType": "rev_file",
                "revMainSelectedFileIndex": revMainSelectedFileIndex,
                "revContainerEntityGUID": revEntityContainerGUID,
                "revIsNewEntity": revIsNewEntity,
            };

            window.revLoadModules("revPluginModuleUploadFileObjectsLib", (revScriptModule) => {
                window.revPluginModuleUploadFileObjectsLib.revUploadFileObjects(revUploadVarArgs, async (revResStatus) => {
                    console.log("FIN : revIcons\n");

                    let revLoadedPageView = await window.revGetLoadedPageView("revObjectViewCalendarEvent", revVarArgs);
                    window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": null });

                    window.revToggleSwitchArea(null);
                });
            });
        };

        if (!revEntityGUID || revEntityGUID < 1) {
            window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, { filter: [revPersEntity] }, async (revRetData) => {
                let revRetRemoteEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;
                let revRetRemoteInfoEntityGUID = revRetData.filter[0].revInfoEntityGUID;
                revPersInfoEntity._remoteRevEntityGUID = revRetRemoteInfoEntityGUID;

                revPersEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;

                revUploadInfoEntiyPicsAlbum(revRetRemoteInfoEntityGUID);

                let revPageViewSpaceProfilePage = await window.revGetLoadedPageView("revPageViewSpaceProfilePage", revVarArgs);
                window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewSpaceProfilePage, "revFloatingOptionsMenuName": "123" });
            });
        } else {
            let revEntityDelPicsGUIDsArr = [];

            for (let i = 0; i < revEntityDelPicsArr.length; i++) revEntityDelPicsGUIDsArr.push(revEntityDelPicsArr[i]._remoteRevEntityGUID);

            window.revPostServerData(window.REV_DELETE_REV_ENTITY_WITH_CHILDS_URL, { filter: revEntityDelPicsGUIDsArr }, (revRetData) => {
                console.log("DEL revRetData :" + JSON.stringify(revRetData));
            });

            // Add more pics to existing Info pics album
            revUploadInfoEntiyPicsAlbum(revInfoPicsAlbum._remoteRevEntityGUID);

            let revUpdateData = window.revEntityUdateData(revVarArgs, revPersEntity);
            console.log(JSON.stringify(revUpdateData));
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

    let revCancelTab = "";

    if (revEntityGUID > 0) {
        let revCancelTabId = "revCancelTabId_" + window.revGenUniqueId();
        revCancelTab = `<div id="${revCancelTabId}" class="revTabLink revSmalllBoldBlue revCancel">cANcEL</div>`;

        window.revSetInterval(revCancelTabId, () => {
            document.getElementById(revCancelTabId).addEventListener("click", (event) => {
                window.revToggleSwitchArea(null);
            });
        });
    }

    return `
    <div class="revFlexContainer ${revPageRightBorderedContainer}">
        ${revNewEventItemPageHeader}
        ${revPageViewPageNavHeaderArea}
        
        <div class="revFlexContainer revFormEntryEventContainer">
            ${revEntityNameNameInputArea}
            ${revEntityEventDetailsInputArea}
            ${revPicsAlbumOverrideView}
            <div class="revFlexWrapper revSelectItemMainEventIconsWrapper">${revEntityIconSelectionArea}</div>
        </div>

        <div class="revFlexWrapper revNewEventItemFormFooter">
            ${revFormSubmitTab}
            ${revCancelTab}
        </div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
