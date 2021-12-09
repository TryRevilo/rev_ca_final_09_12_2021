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
            document.getElementById(revNewFamilyMemberSexInputText_Id).value = "mALE";
        });
    });

    let revMenuItemFemale_Id = "revMenuItemFemale_Id_" + window.revGenUniqueId();

    window.revSetInterval(revMenuItemFemale_Id, () => {
        document.getElementById(revMenuItemFemale_Id).addEventListener("click", (event) => {
            document.getElementById(revNewFamilyMemberSexInputText_Id).value = "FEmALE";
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
        "revPlaceholderText": "FiRsT - sEcoND - LAsT NAmEs",
    });

    let revNewFamilyMemberSexInputText_Id = "revNewFamilyMemberSexInputText_Id_" + window.revGenUniqueId();

    let revNewFamilyMemberSexInputText = window.revInputText_Flat({
        "revId": revNewFamilyMemberSexInputText_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "mALE / FEmALE",
    });

    let revNewFamilyMemberCountryCodeInputText = window.revInputText_Flat({
        "revId": "revNewFamilyMemberCountryCodeInputText_Id",
        "revInputTextHeader": false,
        "revBorderStyle": "revNoLeftBorderBordersInput",
        "revPlaceholderText": "+254",
    });

    let revNewFamilyMemberPhoneNumberInputText_Id = "revNewFamilyMemberPhoneNumberInputText_Id_" + window.revGenUniqueId();

    let revNewFamilyMemberPhoneNumberInputText = window.revInputText_Flat({
        "revId": revNewFamilyMemberPhoneNumberInputText_Id,
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

    window.revSetInterval(revNewFamilyMemberPhoneNumberInputText_Id, () => {
        // capture keyboard input
        document.onkeypress = function (e) {
            // check for spacebar press
            if (e.keyCode == 32) {
                // check if an input is currently in focus
                if (document.activeElement.id.toLowerCase().localeCompare(revNewFamilyMemberPhoneNumberInputText_Id.toLowerCase()) == 0) {
                    // prevent default spacebar event (scrolling to bottom)
                    e.preventDefault();

                    // do stuff you want ...

                    let revInputVal = window.revGetTextInputVal(revNewFamilyMemberPhoneNumberInputText_Id);

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

                    document.getElementById(revNewFamilyMemberPhoneNumberInputText_Id).value = "";
                }
            }
        };
    });

    let revNewFamilyMemberPhoneNumberCountryCodeInputTextWrapper_Id = "revNewFamilyMemberPhoneNumberCountryCodeInputTextWrapper_Id_" + window.revGenUniqueId();

    let revGetAddNewPhoneNumberArea = () => {
        let revNewFamilyMemberPhoneNumberCountryCodeCancelTab = "revNewFamilyMemberPhoneNumberCountryCodeCancelTab_" + window.revGenUniqueId();

        window.revSetInterval(revNewFamilyMemberPhoneNumberCountryCodeCancelTab, () => {
            document.getElementById(revNewFamilyMemberPhoneNumberCountryCodeCancelTab).addEventListener("click", (event) => {
                document.getElementById(revNewFamilyMemberPhoneNumberCountryCodeInputTextWrapper_Id).innerHTML = "";
            });
        });

        return `
        <div class="revFlexWrapper revNewFamilyMemberPhoneNumberCountryCodeInputTextWrapper">
            <div class="revNewFamilyMemberCountryCodeInputTextWrapper">${revNewFamilyMemberCountryCodeInputText}</div>
            <div class="revNewFamilyMemberPhoneNumberInputTextWrapper">${revNewFamilyMemberPhoneNumberInputText}</div>
            <div class="revSmall-H-Line"></div>
            <div id="${revNewFamilyMemberPhoneNumberCountryCodeCancelTab}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revNewFamilyMemberPhoneNumberCountryCodeCancelTab">cANcEL</div>
        </div>
        `;
    };

    let revNewFamilyMemberPhoneContactsTab_Id = "revNewFamilyMemberPhoneContactsTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revNewFamilyMemberPhoneContactsTab_Id, () => {
        document.getElementById(revNewFamilyMemberPhoneContactsTab_Id).addEventListener("click", (event) => {
            document.getElementById(revNewFamilyMemberPhoneNumberCountryCodeInputTextWrapper_Id).innerHTML = revGetAddNewPhoneNumberArea();
        });
    });

    let revContactEntity = (revContact) => {
        let revNewFamilyMemberRelType = revContact.revNewFamilyMemberRelType;
        let revNewFamilyMemberSex = revContact.revNewFamilyMemberSex;

        if (window.revIsEmptyVar(revNewFamilyMemberRelType)) {
            document.getElementById(revSelectedFamRelType_Id).innerHTML = `<div class="revFontSiteRedTxtColor revFontSizeNormal revFlexWrapper revSexSelectedTellErrTellWrapper">pLEAsE sELEcT the type of FAmiLy reLAtionship</div>`;

            return;
        } else {
            document.getElementById(revSelectedFamRelType_Id).innerHTML = revNewFamilyMemberRelType;
        }

        if (revNewFamilyMemberSex.localeCompare("male") !== 0 && revNewFamilyMemberSex.localeCompare("female") !== 0) {
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
                "revNewFamilyMemberRelType": revNewFamilyMemberRelType,
                "revNewFamilyMemberSex": revNewFamilyMemberSex,
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
            let revContactName = window.revGetTextInputVal(revFamilyRelationFullNamesInput_Id);
            let revNewFamilyMemberPhoneNumber = "";

            if (document.getElementById(revNewFamilyMemberPhoneNumberInputText_Id)) {
                revNewFamilyMemberPhoneNumber = window.revGetTextInputVal(revNewFamilyMemberPhoneNumberInputText_Id);
            }

            revContactEntity({
                "revContactName": revContactName,
                "revNewFamilyMemberRelType": revFamilyRelType,
                "revNewFamilyMemberSex": window.revGetTextInputVal(revNewFamilyMemberSexInputText_Id),
                "phoneNumbers": revAddedContactsArr,
                "photos": [],
            });
        },
    });

    return `
        <div class="revFlexContainer revNewFamilyMemberFormContainer">
            <div class="revFlexWrapper revNewFamilyMemberInputTextWrapper">${revFamilyMemberFullNamesInputText}</div>
            <div id="${revNamesTellErr_Id}" class="revFlexContainer"></div>
            <div class="revFlexWrapper revNewFamilyMemberSexSelectionWrapper">
                <div class="revFlexWrapper revNewFamilyMemberPreSetSexSelectionWrapper">
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revNewFamilyMemberSexSelectionTxt">sEx : </div>
                    <div class="revNewFamilyMemberSexSelectionMenuArea">${revDropDownMenuArea_Sex}</div>
                </div>
                <div class="revFlexWrapper revNewFamilyMemberInputTextWrapper revNewFamilyMemberInputTextWrapperSex">
                    <div class="revSmall-H-Line"></div>
                    ${revNewFamilyMemberSexInputText}
                    <div class="revSmall-H-Line"></div>
                </div>
            </div>
            <div id="${revSexSelectedTellErr_Id}" class="revFlexContainer"></div>
            <div class="revFlexWrapper revNewFamilyMemberFormRelationTypeWrapper">
                <div class="revFontSiteLightGreyTxtColor revFontSizeNormal revNewFamilyMemberRelationTypeTxt">sELEcT FamiLy RELATioNsHip TypE : </div>
                <div class="revNewFamilyMemberRelationTypeSelectMenuArea">${revDropDownMenuAreaFamRelType}</div>
                <div id="${revSelectedFamRelType_Id}" class="revFontSiteGreyTxtColor revFontSizeMedium revSelectedFamRelType"></div>
            </div>
            <div class="revFlexContainer revNewFamilyMemberContainer">
                <div class="revFontSizeNormalHeader revNewFamilyMemberAddContactTell">coNTAcT DETAiLs &nbsp;&nbsp; <span class="revFontSizeNormal">(opTioNal)</span></div>
                <div id="${revAddedContactsInputView_Id}" class="revFlexWrapper revFlexWrapperScroll revAddedContactsWrapper"></div>
                <div id="${revNewFamilyMemberPhoneNumberCountryCodeInputTextWrapper_Id}" class="revFlexContainer"></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revNewFamilyMemberContactsWrapper">
                    <div id="${revNewFamilyMemberPhoneContactsTab_Id}" class="revTabLink revFontSizeSmall revFlexWrapper revNewFamilyMemberPhoneContactsWrapper">
                        <div class="revNewFamilyMemberAddContatctIcon"><i class="fas fa-plus"></i></div>
                        <div class="revNewFamilyMemberAddContatctTxt">PHoNE</div>
                    </div>
                    <div class="revFlexWrapper revNewFamilyMemberAddContactDivider">
                        <div class="revSmall-H-Line"></div>
                        <div class="revTiny-V-Line"></div>
                        <div class="revSmall-H-Line"></div>
                    </div>
                    <div class="revTabLink revFontSizeSmall revFlexWrapper revNewFamilyMemberEMailContactsWrapper">
                        <div class="revNewFamilyMemberAddContatctIcon"><i class="fas fa-plus"></i></div>
                        <div class="revNewFamilyMemberAddContatctTxt">EmAiL</div>
                    </div>
                </div>
            </div>
            <div class="revFlexWrapper revNewFamilyMemberFormFooterWrapper">
                ${revFormSubmitTab}
                <div id="${revPublisherFormOptionalFooterAreaContainerHideTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revHideSwitchAreaTab">HiDE</div>
            </div>
        </div>
        `;
};

module.exports.revFormViewWidget = revFormViewWidget;
