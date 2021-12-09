var revFormViewWidget = async (revVarArgs) => {
    let revFormValuesVarArgs;

    if (revVarArgs.revFormValuesVarArgs) {
        revFormValuesVarArgs = revVarArgs.revFormValuesVarArgs;
    }

    let revAddedContactsArr = [];

    let revNamesTellErr_Id = "revNamesTellErr_Id_" + window.revGenUniqueId();
    let revSexSelectedTellErr_Id = "revSexSelectedTellErr_Id_" + window.revGenUniqueId();

    let revMenuItemMale_Id = "revMenuItemMale_Id_" + window.revGenUniqueId();

    window.revSetInterval(revMenuItemMale_Id, () => {
        document.getElementById(revMenuItemMale_Id).addEventListener("click", (event) => {
            document.getElementById(revUserAccountSettingsSexInputText_Id).value = "mALE";
        });
    });

    let revMenuItemFemale_Id = "revMenuItemFemale_Id_" + window.revGenUniqueId();

    window.revSetInterval(revMenuItemFemale_Id, () => {
        document.getElementById(revMenuItemFemale_Id).addEventListener("click", (event) => {
            document.getElementById(revUserAccountSettingsSexInputText_Id).value = "FEmALE";
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

    let revUserAccountSettingsRelType = "";

    let revRelTypesMap = {
        "rev_siblings": "siBLiNG",
        "rev_parent": "pARENT",
        "rev_grand_parent": "gRand parent",
        "rev_cousin": "cousiN",
        "rev_uncle": "uNcLE",
        "rev_aunt": "aunT",
    };

    if (revFormValuesVarArgs && revFormValuesVarArgs.revUserAccountSettingsRelType) {
        revUserAccountSettingsRelType = revFormValuesVarArgs.revUserAccountSettingsRelType;

        window.revSetInterval(revSelectedFamRelType_Id, () => {
            document.getElementById(revSelectedFamRelType_Id).innerHTML = revRelTypesMap[revUserAccountSettingsRelType];
        });
    }
    /** REV END REL TYPE DROP MENU AREA */

    let revUserAccountSettingsRelationFullNamesInput_Id = "revUserAccountSettingsRelationFullNamesInput_Id_" + window.revGenUniqueId();

    let revUserAccountSettingsFullNamesInputText = window.revInputText_Flat({
        "revId": revUserAccountSettingsRelationFullNamesInput_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revBottomBorderOnlyBorderInput",
        "revPlaceholderText": "FiRsT - sEcoND - LAsT NAmEs",
    });

    let revUserAccountSettingsSexInputText_Id = "revUserAccountSettingsSexInputText_Id_" + window.revGenUniqueId();

    let revUserAccountSettingsSexInputText = window.revInputText_Flat({
        "revId": revUserAccountSettingsSexInputText_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "mALE / FEmALE",
    });

    let revUserAccountSettingsCountryCodeInputText = window.revInputText_Flat({
        "revId": "revUserAccountSettingsCountryCodeInputText_Id",
        "revInputTextHeader": false,
        "revBorderStyle": "revNoLeftBorderBordersInput",
        "revPlaceholderText": "+254",
    });

    let revUserAccountSettingsPhoneNumberInputText_Id = "revUserAccountSettingsPhoneNumberInputText_Id_" + window.revGenUniqueId();

    let revUserAccountSettingsPhoneNumberInputText = window.revInputText_Flat({
        "revId": revUserAccountSettingsPhoneNumberInputText_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revNoLeftBorderBordersInput",
        "revPlaceholderText": "",
    });

    let revAddedContactsInputView_Id = "revAddedContactsInputView_Id_" + window.revGenUniqueId();

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
                <div id="${revContactInputItem_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revFlexWrapper revAddedContactInputWrapper">
                    <div>#${revContactsArr[i]}</div>
                    <div id="${revContactInputItemClear_Id}" class="revFlexWrapper revDelContactWrapper"><i class="fas fa-times"></i></div>
                </div>
                `);
        }

        let revDefAddedContactsView = ``;

        if (revSelectedContactsTabsArr.length > 0) {
            revDefAddedContactsView = revSelectedContactsTabsArr.join("");
        }

        window.revSetInterval(revAddedContactsInputView_Id, () => {
            document.getElementById(revAddedContactsInputView_Id).innerHTML = revDefAddedContactsView;
        });

        return revContactsArr;
    };

    window.revSetInterval(revUserAccountSettingsPhoneNumberInputText_Id, () => {
        // capture keyboard input
        document.onkeypress = function (e) {
            // check for spacebar press
            if (e.keyCode == 32) {
                // check if an input is currently in focus
                if (document.activeElement.id.toLowerCase().localeCompare(revUserAccountSettingsPhoneNumberInputText_Id.toLowerCase()) == 0) {
                    // prevent default spacebar event (scrolling to bottom)
                    e.preventDefault();

                    // do stuff you want ...

                    let revInputVal = window.revGetTextInputVal(revUserAccountSettingsPhoneNumberInputText_Id);

                    if (!window.revStringEmpty(revInputVal) && !window.revArrIncludesElement(revAddedContactsArr, revInputVal)) {
                        let revInputValArr = revInputVal.split(" ");

                        let revArr = [];

                        for (let i = 0; i < revInputValArr.length; i++) {
                            revArr = revArr.concat(revInputValArr[i].split(","));
                        }

                        for (let i = 0; i < revArr.length; i++) {
                            if (window.revStringEmpty(revArr[i]) || revArr[i].split("").length < 2) {
                                continue;
                            }

                            revAddedContactsArr.push(revArr[i]);
                        }

                        revLoadContactInputIntoViews(revAddedContactsArr);
                    }

                    document.getElementById(revUserAccountSettingsPhoneNumberInputText_Id).value = "";
                }
            }
        };
    });

    let revUserAccountSettingsPhoneNumberCountryCodeInputTextWrapper_Id = "revUserAccountSettingsPhoneNumberCountryCodeInputTextWrapper_Id_" + window.revGenUniqueId();

    let revGetAddNewPhoneNumberArea = () => {
        let revUserAccountSettingsPhoneNumberCountryCodeCancelTab = "revUserAccountSettingsPhoneNumberCountryCodeCancelTab_" + window.revGenUniqueId();

        window.revSetInterval(revUserAccountSettingsPhoneNumberCountryCodeCancelTab, () => {
            document.getElementById(revUserAccountSettingsPhoneNumberCountryCodeCancelTab).addEventListener("click", (event) => {
                document.getElementById(revUserAccountSettingsPhoneNumberCountryCodeInputTextWrapper_Id).innerHTML = "";
            });
        });

        return `
        <div class="revFlexWrapper revUserAccountSettingsPhoneNumberCountryCodeInputTextWrapper">
            <div class="revUserAccountSettingsCountryCodeInputTextWrapper">${revUserAccountSettingsCountryCodeInputText}</div>
            <div class="revUserAccountSettingsPhoneNumberInputTextWrapper">${revUserAccountSettingsPhoneNumberInputText}</div>
            <div class="revSmall-H-Line"></div>
            <div id="${revUserAccountSettingsPhoneNumberCountryCodeCancelTab}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revUserAccountSettingsPhoneNumberCountryCodeCancelTab">cANcEL</div>
        </div>
        `;
    };

    let revUserAccountSettingsPhoneContactsTab_Id = "revUserAccountSettingsPhoneContactsTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revUserAccountSettingsPhoneContactsTab_Id, () => {
        document.getElementById(revUserAccountSettingsPhoneContactsTab_Id).addEventListener("click", (event) => {
            document.getElementById(revUserAccountSettingsPhoneNumberCountryCodeInputTextWrapper_Id).innerHTML = revGetAddNewPhoneNumberArea();
        });
    });

    let revContactEntity = (revContact) => {
        let revUserAccountSettingsRelType = revContact.revUserAccountSettingsRelType;
        let revUserAccountSettingsSex = revContact.revUserAccountSettingsSex;

        if (window.revIsEmptyVar(revUserAccountSettingsRelType)) {
            document.getElementById(revSelectedFamRelType_Id).innerHTML = `<div class="revFontSiteRedTxtColor revFontSizeNormal revFlexWrapper revSexSelectedTellErrTellWrapper">pLEAsE sELEcT the type of FAmiLy reLAtionship</div>`;

            return;
        } else {
            document.getElementById(revSelectedFamRelType_Id).innerHTML = revUserAccountSettingsRelType;
        }

        if (revUserAccountSettingsSex.localeCompare("male") !== 0 && revUserAccountSettingsSex.localeCompare("female") !== 0) {
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
                "revUserAccountSettingsRelType": revUserAccountSettingsRelType,
                "revUserAccountSettingsSex": revUserAccountSettingsSex,
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

    let revConnectUserSaveTab_Id = "revConnectUserSaveTab_Id_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revSubmitTabCurvedPointerRight({
        "revId": revConnectUserSaveTab_Id,
        "revTitle": "sAvE",
        "revSubmitCallback": () => {
            let revContactName = window.revGetTextInputVal(revUserAccountSettingsRelationFullNamesInput_Id);
            let revUserAccountSettingsPhoneNumber = "";

            if (document.getElementById(revUserAccountSettingsPhoneNumberInputText_Id)) {
                revUserAccountSettingsPhoneNumber = window.revGetTextInputVal(revUserAccountSettingsPhoneNumberInputText_Id);
            }

            revContactEntity({
                "revContactName": revContactName,
                "revUserAccountSettingsRelType": revUserAccountSettingsRelType,
                "revUserAccountSettingsSex": window.revGetTextInputVal(revUserAccountSettingsSexInputText_Id),
                "phoneNumbers": revAddedContactsArr,
                "photos": [],
            });
        },
    });

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", {
        "revDafaultPagePagination": false,
        revEntity: { "_revEntitySubType": "revInfo" },
    });

    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader("my sEtTiNGs");
    /** REV END HEADER AREA */

    return `
    <div class="revFlexContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
            ${revPageHeader}
        </div>
        <div class="revFlexContainer revUserAccountSettingsPhoneNumbersContactsContainer">
            <div class="revFlexWrapper revUserAccountSettingsFullNamesInputTextInputTextWrapper">${revUserAccountSettingsFullNamesInputText}</div>
            <div id="${revNamesTellErr_Id}" class="revFlexContainer"></div>
            <div class="revFlexWrapper revUserAccountSettingsSexSelectionWrapper">
                <div class="revFlexWrapper revUserAccountSettingsPreSetSexSelectionWrapper">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revUserAccountSettingsSexSelectionTxt">sEx : </div>
                    <div class="revUserAccountSettingsSexSelectionMenuArea">${revDropDownMenuArea_Sex}</div>
                </div>
                <div class="revFlexWrapper revUserAccountSettingsFullNamesInputTextInputTextWrapper revUserAccountSettingsFullNamesInputTextInputTextWrapperSex">
                    <div class="revSmall-H-Line"></div>
                    ${revUserAccountSettingsSexInputText}
                    <div class="revSmall-H-Line"></div>
                </div>
            </div>
            <div id="${revSexSelectedTellErr_Id}" class="revFlexContainer"></div>
            <div class="revFontSizeNormal revFontSiteGreyTxtColor revFlexWrapper revFullNamesTellWrapper">You have to set up your REAL FULL NAMES! NO ALIASES!</div>
            <div class="revFlexContainer revUserAccountSettingsContainer">
                <div class="revFontSizeNormalHeader revUserAccountSettingsAddContactTell">coNTAcT DETAiLs &nbsp;&nbsp; <span class="revFontSizeNormal">(REQuiRED)</span></div>
                <div id="${revAddedContactsInputView_Id}" class="revFlexWrapper revFlexWrapperScroll revAddedContactsWrapper"></div>
                <div id="${revUserAccountSettingsPhoneNumberCountryCodeInputTextWrapper_Id}" class="revFlexContainer"></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revUserAccountSettingsContactsWrapper">
                    <div id="${revUserAccountSettingsPhoneContactsTab_Id}" class="revTabLink revFontSizeSmall revFlexWrapper revUserAccountSettingsPhoneContactsWrapper">
                        <div class="revUserAccountSettingsAddContatctIcon"><i class="fas fa-plus"></i></div>
                        <div class="revUserAccountSettingsAddContatctTxt">PHoNE</div>
                    </div>
                    <div class="revFlexWrapper revUserAccountSettingsAddContactDivider">
                        <div class="revSmall-H-Line"></div>
                        <div class="revTiny-V-Line"></div>
                        <div class="revSmall-H-Line"></div>
                    </div>
                    <div class="revTabLink revFontSizeSmall revFlexWrapper revUserAccountSettingsEMailContactsWrapper">
                        <div class="revUserAccountSettingsAddContatctIcon"><i class="fas fa-plus"></i></div>
                        <div class="revUserAccountSettingsAddContatctTxt">EmAiL</div>
                    </div>
                </div>
            </div>
            <div class="revFlexWrapper revUserAccountSettingsFormFooterWrapper">
                ${revFormSubmitTab}
                <div id="${revPublisherFormOptionalFooterAreaContainerHideTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revHideSwitchAreaTab">cANcEL</div>
            </div>
        </div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
