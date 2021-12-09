var revFormViewWidget = async (revVarArgs) => {
    let revFormValuesVarArgs;

    if (revVarArgs.revFormValuesVarArgs) {
        revFormValuesVarArgs = revVarArgs.revFormValuesVarArgs;
    }

    let revAdSettingsContactsArr = [];

    let revNamesTellErr_Id = "revNamesTellErr_Id_" + window.revGenUniqueId();
    let revSexSelectedTellErr_Id = "revSexSelectedTellErr_Id_" + window.revGenUniqueId();

    let revAdSettingsSexInputText_Id = "revAdSettingsSexInputText_Id_" + window.revGenUniqueId();

    let revMenuItemMale_Id = "revMenuItemMale_Id_" + window.revGenUniqueId();

    window.revSetInterval(revMenuItemMale_Id, () => {
        document.getElementById(revMenuItemMale_Id).addEventListener("click", (event) => {
            document.getElementById(revAdSettingsSexInputText_Id).value = "mALE";
        });
    });

    let revMenuItemFemale_Id = "revMenuItemFemale_Id_" + window.revGenUniqueId();

    window.revSetInterval(revMenuItemFemale_Id, () => {
        document.getElementById(revMenuItemFemale_Id).addEventListener("click", (event) => {
            document.getElementById(revAdSettingsSexInputText_Id).value = "FEmALE";
        });
    });

    /** REV START SEX DROP MENU AREA */
    let revDropDownMenuAreaSexVarArgs = {
        "revMenuItemsArr": [`<div id="${revMenuItemMale_Id}" class="revTabLink dropdown-item revFlexWrapper">mALE</div>`, `<div id="${revMenuItemFemale_Id}" class="revTabLink dropdown-item revFlexWrapper">fEmALE</div>`],
    };

    let revDropDownMenuArea_Sex = await window.revDropdownMenu(revDropDownMenuAreaSexVarArgs);
    /** REV END SEX DROP MENU AREA */

    /** REV START REL TYPE DROP MENU AREA */
    let revSelectedFamRelType_Id = "revSelectedFamRelType_Id_" + window.revGenUniqueId();

    let revFamilyRelType = "";

    let revRelTypesMap = {
        "rev_siblings": "siBLiNG",
        "rev_parent": "pARENT",
        "rev_grand_parent": "gRand parent",
        "rev_cousin": "cousiN",
        "rev_uncle": "uNcLE",
        "rev_aunt": "aunT",
    };

    if (revFormValuesVarArgs && revFormValuesVarArgs.revFamilyRelType) {
        revFamilyRelType = revFormValuesVarArgs.revFamilyRelType;

        window.revSetInterval(revSelectedFamRelType_Id, () => {
            document.getElementById(revSelectedFamRelType_Id).innerHTML = revRelTypesMap[revFamilyRelType];
        });
    }

    let revGenMenuItem = (revMenuVal_Id) => {
        let revGenMenuItem_Id = revMenuVal_Id + "_revGenMenuItem_Id_" + window.revGenUniqueId();

        window.revSetInterval(revGenMenuItem_Id, () => {
            document.getElementById(revGenMenuItem_Id).addEventListener("click", (event) => {
                document.getElementById(revSelectedFamRelType_Id).innerHTML = revRelTypesMap[revMenuVal_Id];

                revFamilyRelType = revMenuVal_Id;
            });
        });

        return `<div id="${revGenMenuItem_Id}" class="revTabLink dropdown-item revFlexWrapper">${revRelTypesMap[revMenuVal_Id]}</div>`;
    };

    let revDropDownMenuAreaFamRelTypeVarArgs = {
        "revMenuItemsArr": [
            `<div id="${revMenuItemMale_Id}" class="revTabLink dropdown-item revFlexWrapper">${revGenMenuItem("rev_siblings")}</div>`,
            `<div id="${revMenuItemFemale_Id}" class="revTabLink dropdown-item revFlexWrapper">${revGenMenuItem("rev_parent")}</div>`,
            `<div id="${revMenuItemFemale_Id}" class="revTabLink dropdown-item revFlexWrapper">${revGenMenuItem("rev_grand_parent")}</div>`,
            `<div id="${revMenuItemFemale_Id}" class="revTabLink dropdown-item revFlexWrapper">${revGenMenuItem("rev_cousin")}</div>`,
            `<div id="${revMenuItemFemale_Id}" class="revTabLink dropdown-item revFlexWrapper">${revGenMenuItem("rev_uncle")}</div>`,
            `<div id="${revMenuItemFemale_Id}" class="revTabLink dropdown-item revFlexWrapper">${revGenMenuItem("rev_aunt")}</div>`,
            /** */
        ],
    };

    let revDropDownMenuAreaFamRelType = await window.revDropdownMenu(revDropDownMenuAreaFamRelTypeVarArgs);
    /** REV END REL TYPE DROP MENU AREA */

    let revFamilyRelationFullNamesInput_Id = "revFamilyRelationFullNamesInput_Id_" + window.revGenUniqueId();

    let revFamilyMemberFullNamesInputText = window.revInputText_Flat({
        "revId": revFamilyRelationFullNamesInput_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revBottomBorderOnlyBorderInput",
        "revPlaceholderText": "BuDGET ( total AmouNt to Be spENt in tHis campAiGN )",
    });

    let revAdSettingsSexInputText = window.revInputText_Flat({
        "revId": revAdSettingsSexInputText_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "mALE / FEmALE",
    });

    let revAdSettingsCountryCodeInputText_Id = "revAdSettingsCountryCodeInputText_" + window.revGenUniqueId();

    let revAdSettingsCountryCodeInputText = window.revInputText_Flat({
        "revId": revAdSettingsCountryCodeInputText_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revNoLeftBorderBordersInput",
        "revPlaceholderText": "+254",
    });

    let revAdSettingsPhoneNumberInputText_Id = "revAdSettingsPhoneNumberInputText_Id_" + window.revGenUniqueId();

    let revAdSettingsPhoneNumberInputText = window.revInputText_Flat({
        "revId": revAdSettingsPhoneNumberInputText_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revNoLeftBorderBordersInput",
        "revPlaceholderText": "",
    });

    let revAdSettingsContactsInputView_Id = "revAdSettingsContactsInputView_Id_" + window.revGenUniqueId();

    let revLoadContactInputIntoViews = (revContactsArr) => {
        let revSelectedContactsTabsArr = [];

        for (let i = 0; i < revContactsArr.length; i++) {
            let revContactInputItem_Id = i + "_revContactInputItem_Id_" + window.revGenUniqueId();
            let revContactInputItemClear_Id = i + "_revContactInputItemClear_Id_" + window.revGenUniqueId();

            window.revSetInterval(revContactInputItemClear_Id, () => {
                document.getElementById(revContactInputItemClear_Id).addEventListener("click", (event) => {
                    window.revRemoveArrElement(revContactsArr, revContactsArr[i]);

                    document.getElementById(revContactInputItem_Id).remove();

                    revLoadContactInputIntoViews(revContactsArr);
                });
            });

            revSelectedContactsTabsArr.push(`
                <div id="${revContactInputItem_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revFlexWrapper revAdSettingsContactInputWrapper">
                    <div>#${revContactsArr[i]}</div>
                    <div id="${revContactInputItemClear_Id}" class="revFlexWrapper revDelContactWrapper"><i class="fas fa-times"></i></div>
                </div>
                `);
        }

        let revDefAddedContactsView = ``;

        if (revSelectedContactsTabsArr.length > 0) {
            revDefAddedContactsView = revSelectedContactsTabsArr.join("");
        }

        window.revSetInterval(revAdSettingsContactsInputView_Id, () => {
            document.getElementById(revAdSettingsContactsInputView_Id).innerHTML = revDefAddedContactsView;
        });

        return revContactsArr;
    };

    window.revSetInterval(revAdSettingsPhoneNumberInputText_Id, () => {
        // capture keyboard input
        document.onkeypress = function (e) {
            // check for spacebar press
            if (e.keyCode == 32) {
                // check if an input is currently in focus
                if (document.activeElement.id.toLowerCase().localeCompare(revAdSettingsPhoneNumberInputText_Id.toLowerCase()) == 0) {
                    // prevent default spacebar event (scrolling to bottom)
                    e.preventDefault();

                    // do stuff you want ...

                    let revInputVal = window.revGetTextInputVal(revAdSettingsPhoneNumberInputText_Id);

                    if (!window.revStringEmpty(revInputVal) && !window.revArrIncludesElement(revAdSettingsContactsArr, revInputVal)) {
                        let revInputValArr = revInputVal.split(" ");

                        let revArr = [];

                        for (let i = 0; i < revInputValArr.length; i++) {
                            revArr = revArr.concat(revInputValArr[i].split(","));
                        }

                        for (let i = 0; i < revArr.length; i++) {
                            if (window.revStringEmpty(revArr[i]) || revArr[i].split("").length < 2) {
                                continue;
                            }

                            revAdSettingsContactsArr.push(revArr[i]);
                        }

                        revLoadContactInputIntoViews(revAdSettingsContactsArr);
                    }

                    document.getElementById(revAdSettingsPhoneNumberInputText_Id).value = "";
                }
            }
        };
    });

    let revAdSettingsPhoneNumberCountryCodeInputTextWrapper_Id = "revAdSettingsPhoneNumberCountryCodeInputTextWrapper_Id_" + window.revGenUniqueId();

    let revGetAddNewPhoneNumberArea = () => {
        let revAdSettingsPhoneNumberCountryCodeCancelTab = "revAdSettingsPhoneNumberCountryCodeCancelTab_" + window.revGenUniqueId();

        window.revSetInterval(revAdSettingsPhoneNumberCountryCodeCancelTab, () => {
            document.getElementById(revAdSettingsPhoneNumberCountryCodeCancelTab).addEventListener("click", (event) => {
                document.getElementById(revAdSettingsPhoneNumberCountryCodeInputTextWrapper_Id).innerHTML = "";
            });
        });

        return `
        <div class="revFlexWrapper revAdSettingsPhoneNumberCountryCodeInputTextWrapper">
            <div class="revAdSettingsCountryCodeInputTextWrapper">${revAdSettingsCountryCodeInputText}</div>
            <div class="revAdSettingsPhoneNumberInputTextWrapper">${revAdSettingsPhoneNumberInputText}</div>
            <div class="revSmall-H-Line"></div>
            <div id="${revAdSettingsPhoneNumberCountryCodeCancelTab}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revAdSettingsPhoneNumberCountryCodeCancelTab">cANcEL</div>
        </div>
        `;
    };

    let revAdSettingsPhoneContactsTab_Id = "revAdSettingsPhoneContactsTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAdSettingsPhoneContactsTab_Id, () => {
        document.getElementById(revAdSettingsPhoneContactsTab_Id).addEventListener("click", (event) => {
            document.getElementById(revAdSettingsPhoneNumberCountryCodeInputTextWrapper_Id).innerHTML = revGetAddNewPhoneNumberArea();
        });
    });

    let revContactEntity = (revContact) => {
        let revAdSettingsRelType = revContact.revAdSettingsRelType;
        let revAdSettingsSex = revContact.revAdSettingsSex;

        if (window.revIsEmptyVar(revAdSettingsRelType)) {
            document.getElementById(revSelectedFamRelType_Id).innerHTML = `<div class="revFontSiteRedTxtColor revFontSizeNormal revFlexWrapper revSexSelectedTellErrTellWrapper">pLEAsE sELEcT the type of FAmiLy reLAtionship</div>`;

            return;
        } else {
            document.getElementById(revSelectedFamRelType_Id).innerHTML = revAdSettingsRelType;
        }

        if (revAdSettingsSex.localeCompare("male") !== 0 && revAdSettingsSex.localeCompare("female") !== 0) {
            document.getElementById(revSexSelectedTellErr_Id).innerHTML = `
            <div class="revFlexContainer revSexSelectedTellErrContainer">
                <div class="revFontSiteRedTxtColor revFontSizeNormal revFlexWrapper revSexSelectedTellErrTellWrapper">pLEAsE sELEcT Male or Female. this will be used to express your relationship</div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revSexSelectedTellErrExamplesWrapper">
                    <div><i class="fas fa-level-up-alt revRotate90"></i></div>
                    <div class="revFlexContainer revSexSelectedTellErrExamplesTxtContainer">uncle / aunt / grandma/pa</div>
                </div>
            </div>
            `;

            return;
        } else {
            document.getElementById(revSexSelectedTellErr_Id).innerHTML = "";
        }

        /** START REV ENTITY NAME */
        let revContactName = revContact.revContactName;

        if (window.revIsEmptyVar(revContactName)) {
            document.getElementById(revNamesTellErr_Id).innerHTML = `
                <div class="revFlexContainer revSexSelectedTellErrContainer">
                    <div class="revFontSiteRedTxtColor revFontSizeNormal revFlexWrapper revSexSelectedTellErrTellWrapper">NAmEs caN'T BE EmpTy</div>
                </div>
                `;

            return;
        } else {
            document.getElementById(revNamesTellErr_Id).innerHTML = "";
        }
        /** END REV ENTITY NAME */

        /** START REV CONTACT PHONE NUMBERS */
        let revPhoneNumbers = revContact.phoneNumbers;
        let revPhoneNumbersMetadataArr = [];

        for (let i = 0; i < revPhoneNumbers.length; i++) {
            let revPhoneNumberJSON = {};

            if (revPhoneNumbers[i]) {
                revPhoneNumberJSON["revPhoneNumberMetadata"] = window.revMetadataFiller("rev_phone_number", revPhoneNumbers[i]);
            }

            if (revPhoneNumbers[i].type) {
                revPhoneNumberJSON["revPhoneNumberType"] = window.revMetadataFiller("rev_phone_number_type", revPhoneNumbers[i].type);
            }

            revPhoneNumbersMetadataArr.push(revPhoneNumberJSON);
        }
        /** END REV CONTACT PHONE NUMBERS */

        /** START REV CONTACT PHOTOS */
        let revContactPhotosArr = revContact.photos;
        let revContactPhotosURLsArr = [];

        for (let i = 0; i < revContactPhotosArr.length; i++) {
            revContactPhotosURLsArr.push(revContactPhotosArr[i].url);
        }
        /** END REV CONTACT PHOTOS */

        let revContactEntitiesArr = [
            {
                "revPhoneNumbersMetadataArr": revPhoneNumbersMetadataArr,
                "revContactName": revContactName,
                "revContactPhotosURLsArr": revContactPhotosURLsArr,
            },
        ];

        /** REV START CREATE SHADOW USERS */
        let revURL = window.REV_SITE_BASE_PATH + "/rev_base_api_post?revPluginHookContextsRemoteArr=revHookRemoteHandler_Create_Update_Del_FamilyRel";

        window.revPostServerData(
            revURL,
            {
                "revLoggedInEntityGUID": window.REV_LOGGED_IN_ENTITY_GUID,
                "revAdSettingsRelType": revAdSettingsRelType,
                "revAdSettingsSex": revAdSettingsSex,
                "filter": revContactEntitiesArr,
            },
            (revRetPersData) => {
                console.log("revRetPersData : " + JSON.stringify(revRetPersData));
            }
        );
        /** REV END CREATE SHADOW USERS */
    };

    let revPublisherFormOptionalFooterAreaContainerHideTab_Id = "revPublisherFormOptionalFooterAreaContainerHideTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPublisherFormOptionalFooterAreaContainerHideTab_Id, () => {
        document.getElementById(revPublisherFormOptionalFooterAreaContainerHideTab_Id).addEventListener("click", (event) => {
            window.revToggleSwitchArea(null);
        });
    });

    let revSaveAdSettingsTab_Id = "revSaveAdSettingsTab_Id_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revSubmitTabCurvedPointerRight({
        "revId": revSaveAdSettingsTab_Id,
        "revTitle": "cHEck ouT",
        "revSubmitCallback": () => {
            let revContactName = window.revGetTextInputVal(revFamilyRelationFullNamesInput_Id);
            let revAdSettingsPhoneNumber = "";

            if (document.getElementById(revAdSettingsPhoneNumberInputText_Id)) {
                revAdSettingsPhoneNumber = window.revGetTextInputVal(revAdSettingsPhoneNumberInputText_Id);
            }

            revContactEntity({
                "revContactName": revContactName,
                "revAdSettingsRelType": revFamilyRelType,
                "revAdSettingsSex": window.revGetTextInputVal(revAdSettingsSexInputText_Id),
                "phoneNumbers": revAdSettingsContactsArr,
                "photos": [],
            });
        },
    });

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", {
        "revDafaultPagePagination": true,
        revEntity: { "_revEntitySubType": "revAd" },
    });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader("AD sEtTiNGs");
    /** REV END HEADER AREA */

    return `
        <div class="revFlexContainer">
            <div class="revFlexContainer revPageHeaderAreaContainer">
                <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
                <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
                ${revPageHeader}
            </div>
            <div class="revFlexContainer revAdSettingsContainer">
                <div class="revFlexWrapper revAdSettingsInputTextWrapper">${revFamilyMemberFullNamesInputText}</div>
                <div id="${revNamesTellErr_Id}" class="revFlexContainer"></div>
                <div class="revFlexWrapper revAdSettingsSexSelectionWrapper">
                    <div class="revFlexWrapper revAdSettingsPreSetSexSelectionWrapper">
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revAdSettingsSexSelectionTxt">sEx : </div>
                        <div class="revAdSettingsSexSelectionMenuArea">${revDropDownMenuArea_Sex}</div>
                    </div>
                    <div class="revFlexWrapper revAdSettingsInputTextWrapper revAdSettingsInputTextWrapperSex">
                        <div class="revSmall-H-Line"></div>
                        ${revAdSettingsSexInputText}
                        <div class="revSmall-H-Line"></div>
                    </div>
                </div>
                <div id="${revSexSelectedTellErr_Id}" class="revFlexContainer"></div>
                <div class="revFlexWrapper revAdSettingsFormRelationTypeWrapper">
                    <div class="revFontSiteLightGreyTxtColor revFontSizeNormal revAdSettingsRelationTypeTxt">AGE RANGE : </div>
                    <div class="revAdSettingsRelationTypeSelectMenuArea">${revDropDownMenuAreaFamRelType}</div>
                    <div id="${revSelectedFamRelType_Id}" class="revFontSiteGreyTxtColor revFontSizeMedium revSelectedFamRelType"></div>
                </div>
                <div class="revFlexContainer revAdTimeSettingsContainer">
                    <div class="revFontSizeNormalHeader revAdSettingsAddContactTell">TimE DETAiLs &nbsp;&nbsp; <span class="revFontSizeNormal">(opTioNal)</span></div>
                    <div id="${revAdSettingsContactsInputView_Id}" class="revFlexWrapper revFlexWrapperScroll revAdSettingsContactsWrapper"></div>
                    <div id="${revAdSettingsPhoneNumberCountryCodeInputTextWrapper_Id}" class="revFlexContainer"></div>
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revAdSettingsContactsWrapper">
                        <div id="${revAdSettingsPhoneContactsTab_Id}" class="revTabLink revFontSizeSmall revFlexWrapper revAdSettingsPhoneContactsWrapper">
                            <div class="revAdSettingsAddContatctIcon"><i class="fas fa-plus"></i></div>
                            <div class="revAdSettingsAddContatctTxt">TimE</div>
                        </div>
                        <div class="revFlexWrapper revAdSettingsAddContactDivider">${window.revSmallDividerWrapper()}</div>
                        <div class="revTabLink revFontSizeSmall revFlexWrapper revAdSettingsEMailContactsWrapper">
                            <div class="revAdSettingsAddContatctIcon"><i class="fas fa-plus"></i></div>
                            <div class="revAdSettingsAddContatctTxt">DATE</div>
                        </div>
                    </div>
                </div>
                <div class="revFlexWrapper revAdSettingsFormFooterWrapper">
                    ${revFormSubmitTab}
                    <div id="${revPublisherFormOptionalFooterAreaContainerHideTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revHideSwitchAreaTab">BAck</div>
                </div>
            </div>
        </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
