var revFormViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._remoteRevEntityGUID || revVarArgs._remoteRevEntityGUID < 1) {
        console.log("ERR -> !revVarArgs || !revVarArgs._remoteRevEntityGUID || revVarArgs._remoteRevEntityGUID < 1");

        return;
    }

    let revHideSwitchAreaTab = "revHideSwitchAreaTab_" + window.revGenUniqueId();

    window.revSetInterval(revHideSwitchAreaTab, () => {
        document.getElementById(revHideSwitchAreaTab).addEventListener("click", (event) => {
            window.revToggleSwitchArea(null);
        });
    });

    /** REV START REMARKS */
    let revRemarksFormAreaView_Id = "revRemarksFormAreaView_Id_" + window.revGenUniqueId();

    let revRemarksVal = "";

    let revGetFlagRemarksPublisherPlaceholder = () => {
        let revFlagRemarksInputArea_Id = "revFlagRemarksInputArea_Id_" + window.revGenUniqueId();

        window.revSetInterval(revFlagRemarksInputArea_Id, () => {
            document.getElementById(revFlagRemarksInputArea_Id).addEventListener("click", async function (event) {
                let revPassVarArgs = window.revCloneJsObject(revVarArgs);

                revPassVarArgs["revPublisherFormHintText"] = "REmARks";

                revPassVarArgs["revCancelPublisherFormCallback"] = () => {
                    document.getElementById(revRemarksFormAreaView_Id).innerHTML = revGetFlagRemarksPublisherPlaceholder();
                };

                revPassVarArgs["revFilesSelectedCallback"] = (revFiles) => {
                    console.log("revFiles : " + JSON.stringify(revFiles));
                };

                let revRemarksFormView = await window.revGetForm("revPublisherForm", revPassVarArgs);
                document.getElementById(revRemarksFormAreaView_Id).innerHTML = `<div class="revFlexContainer">${revRemarksFormView}</div>`;
            });
        });

        return `<div id="${revFlagRemarksInputArea_Id}" class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper">&nbsp;&nbsp;&nbsp;&nbsp;my REmARks</div>`;
    };
    /** REV END REMARKS */

    /** REV START CHECK BOXES OPTIONS */
    let revSelectedFlagsArr = [];

    let revGetFlagCBOption = (revParamVarArgs) => {
        let revCB_Public_Id = "revSelectedIconId_" + window.revGenUniqueId();

        let revCheckBoxPubliCallback = (revCBVarArgs) => {
            let revCheckBoxChecked = revCBVarArgs.revCheckBoxChecked;
            let revCheckBoxVal = revCBVarArgs.revCheckBoxVal;

            if (revCheckBoxChecked) {
                revSelectedFlagsArr.push(revParamVarArgs);
            } else {
                window.revRemoveArrElement(revSelectedFlagsArr, revCheckBoxVal);
            }
        };

        let revCBVarArgsPublic = {
            "revCheckBoxCallback": revCheckBoxPubliCallback,
            "revCheckBoxId": revCB_Public_Id,
            "revCheckBoxVal": revParamVarArgs,
        };

        return window.revGetCheckBox(revCBVarArgsPublic);
    };
    /** REV END CHECK BOXES OPTIONS */

    let revFlagOptionsWrapperArea = `
    <div class="revFlexContainer revPageEntityFlagChecksFormViewContainer">
        <div class="revFlexWrapper revFlagEntityWrapper">
            ${revGetFlagCBOption("inaccurate")}
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">iNAcuRATE</div>
        </div>
        <div class="revFlexWrapper revFlagEntityWrapper">
            ${revGetFlagCBOption("misleading")}
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">misLEADiNG</div>
        </div>
        <div class="revFlexWrapper revFlagEntityWrapper">
            ${revGetFlagCBOption("strong_lang")}
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">sTRoNG LANGuAGE</div>
        </div>
        <div class="revFlexWrapper revFlagEntityWrapper">
            ${revGetFlagCBOption("nudity")}
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">NuDiTy</div>
        </div>
        <div class="revFlexWrapper revFlagEntityWrapper">
            ${revGetFlagCBOption("sensitive")}
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">sENsiTivE</div>
        </div>
        <div class="revFlexWrapper revFlagEntityWrapper">
            ${revGetFlagCBOption("other")}
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revChatSettingsTxt">oTHER</div>
        </div>
    </div>
    `;
    /** REV END CHECK BOXES OPTIONS */

    /** REV START CITATION INPUT */
    let revCitationURLInput_Id = "revCitationURLInput_Id_" + window.revGenUniqueId();

    let revCitationsValsArr = [];

    window.revSetInterval(revCitationURLInput_Id, () => {
        // capture keyboard input
        document.onkeypress = function (e) {
            // check for spacebar press
            if (e.keyCode == 32) {
                // check if an input is currently in focus
                console.log("document.activeElement.id : " + document.activeElement.id);

                if (document.activeElement.id.toLowerCase().localeCompare(revCitationURLInput_Id.toLowerCase()) == 0) {
                    // prevent default spacebar event (scrolling to bottom)
                    e.preventDefault();

                    // do stuff you want ...

                    let revCitationURLInputVal = window.revGetTextInputVal(revCitationURLInput_Id);

                    if (revCitationURLInputVal) {
                        revCitationsValsArr.push(revCitationURLInputVal);

                        console.log("revCitationsValsArr : " + JSON.stringify(revCitationsValsArr));

                        document.getElementById(revCitationURLInput_Id).value = "";
                    }
                }
            }
        };
    });

    let revCitationURLInput = window.revInputText_Flat({
        "revId": revCitationURLInput_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "Enter URL",
    });
    /** REV END CITATION INPUT */

    /** REV START SUBMIT TAB */
    let revSubmitTagEntityTab_Id = "revContextSearchTab_Id_" + window.revGenUniqueId();

    let revSubmitTagEntityTab = window.revSubmitTabCurvedPointerRight({
        "revId": revSubmitTagEntityTab_Id,
        "revTitle": "FLAG",
        "revSubmitCallback": () => {
            if (!revSelectedFlagsArr || revSelectedFlagsArr.length < 1) return;

            let revPersEntity = window.REV_ENTITY_STRUCT();
            revPersEntity._remoteRevEntityGUID = -1;
            revPersEntity._revEntityResolveStatus = 0;
            revPersEntity._revEntityChildableStatus = 1;
            revPersEntity._revEntityType = "revObject";
            revPersEntity._revEntitySubType = "rev_flag_object";
            revPersEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
            revPersEntity._revEntityContainerGUID = revVarArgs._remoteRevEntityGUID;
            revPersEntity._revTimeCreated = new Date().getTime();

            revPersEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_flags_arr", revSelectedFlagsArr.join(",")));

            window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, { filter: [revPersEntity] }, async (revRetData) => {
                let revRetRemoteEntityGUID = revRetData.filter[0]._remoteRevEntityGUID;

                revPersEntity._remoteRevEntityGUID = revRetRemoteEntityGUID;

                window.revToggleSwitchArea(null);

                let revNoticiasPopUpContainer = window.revGetNoticiasPopUpContainer(`
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revSentSuccessWrapper"><i class="fas fa-check"></i> FlaGGED succEssFuLLy . . .</div>
                `);

                window.revTempShowElement(revNoticiasPopUpContainer, "revPageRightSectionContainerId", 4000);
            });
        },
    });
    /** REV END SUBMIT TAB */

    return `
    <div class="revFlexContainer revFlagOptionsForm_SwitchArea_Container">
        <div class="revFontSizeNormalHeader revPageEntityFlagHeader">FLAG posT</div>
        ${revFlagOptionsWrapperArea}
        <div class="revFlexContainer revRemarksContainer">
            <div id="${revRemarksFormAreaView_Id}" class="revFlagFormRemarksPublisherInput">${revGetFlagRemarksPublisherPlaceholder()}</div>
        </div>
        <div class="revFlexContainer revCitationsContainer">
            <div class="revSmalllBold revCitationsTxt">CiTations</div>
            <div class="revFlexWrapper">${revCitationURLInput}</div>
        </div>
        <div class="revFlexWrapper revFlagEntitysFooterWrapper">
            ${revSubmitTagEntityTab}
            <div id="${revHideSwitchAreaTab}" class="revTabLink revFontSiteBlueTxtColor revHideSwitchAreaTab">cancEL</div>
        </div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
