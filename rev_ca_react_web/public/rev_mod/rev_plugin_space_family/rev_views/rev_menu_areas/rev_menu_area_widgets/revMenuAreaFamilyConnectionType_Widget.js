var revWidget = async (revVarArgs) => {
    let revMoreOptionsContainer_Id = revVarArgs.revMoreOptionsContainer_Id;

    await window.revLoadModules("revPluginModuleFamilyRelationships", (revScriptModule) => {});
    let revRelTypesMap = window.revPluginModuleFamilyRelationships.REV_FAMILY_REL_TYPES_MAP;

    let revFamilyRelType = "";
    let revFamilyRelTypeTxt = "";
    let revIsFamilyRelTypeInLaw = false;

    let revFamRelJSON = {};

    let revConnRelsArr = revVarArgs.revConnRels;

    let revFamilyRelTypeSelectionCallBack;

    if (revVarArgs.revFamilyRelTypeSelectionCallBack) {
        revFamilyRelTypeSelectionCallBack = revVarArgs.revFamilyRelTypeSelectionCallBack;

        if (!window.revIsEmptyVar(revFamilyRelType)) {
            revFamilyRelTypeSelectionCallBack(revFamilyRelType);
        }
    }

    let revFamilyRelationTypeSelected_Id = "revFamilyRelationTypeSelected_Id_" + window.revGenUniqueId();

    let revMenuItemMale_Id = "revMenuItemMale_Id_" + window.revGenUniqueId();
    let revMenuItemFemale_Id = "revMenuItemFemale_Id_" + window.revGenUniqueId();

    /** REV START SEX DROP MENU AREA */
    let revDropDownMenuAreaSexVarArgs = {
        "revMenuItemsArr": [
            /** */
            `<div id="${revMenuItemMale_Id}" class="revTabLink dropdown-item revFlexWrapper">mALE</div>`,
            `<div id="${revMenuItemFemale_Id}" class="revTabLink dropdown-item revFlexWrapper">fEmALE</div>`,
        ],
    };

    let revDropDownMenuArea_Sex = await window.revDropdownMenu(revDropDownMenuAreaSexVarArgs);
    /** REV END SEX DROP MENU AREA */

    let revCallBackVals = () => {
        revFamRelJSON = { "revFamilyRelTypeKey": revFamilyRelType, "revFamilyRelTypeTxt": revFamilyRelTypeTxt };

        if (revIsFamilyRelTypeInLaw) {
            revFamRelJSON["rev_is_in_law"] = revIsFamilyRelTypeInLaw;
        }

        revFamilyRelTypeSelectionCallBack(revFamRelJSON);
    };

    /** REV START IN-LAW */
    let revFamilyInLaw = (revFamilyRelTypeTxt) => {
        if (window.revIsEmptyVar(revFamilyRelTypeTxt)) {
            delete revFamRelJSON.rev_is_in_law;
            return "";
        }

        let revInLawFamilyRelationTypeSelected_CB_Id = "revInLawFamilyRelationTypeSelected_CB_Id_" + window.revGenUniqueId();

        let revCBVarArgsFamilyRelInLaw = {
            "revCheckBoxCallback": (revCBVarArgs) => {
                revIsFamilyRelTypeInLaw = revCBVarArgs.revCheckBoxChecked;

                revCallBackVals();
            },
            "revCheckBoxId": revInLawFamilyRelationTypeSelected_CB_Id,
            "revCheckBoxVal": "rev_in_law",
            "revIsChecked": revIsFamilyRelTypeInLaw,
        };

        let revInLawFamilyRelationTypeSelected_CB = window.revGetCheckBox(revCBVarArgsFamilyRelInLaw);

        return `
            ${revFamilyRelTypeTxt}
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revInLawFamilyRelationTypeSelectedWrapper">
                ${window.revSmallDividerWrapper_BorderLeft_1em()} ${revInLawFamilyRelationTypeSelected_CB}<span class="revInLawTxt">in LAw</span>
            </div>
        `;
    };
    /** REV END IN-LAW */

    /** REV START REL TYPE DROP MENU AREA */
    let revGenMenuItem = (revMenuVal_Id) => {
        let revGenMenuItem_Id = revMenuVal_Id + "_revGenMenuItem_Id_" + window.revGenUniqueId();

        window.revSetInterval(revGenMenuItem_Id, () => {
            document.getElementById(revGenMenuItem_Id).addEventListener("click", (event) => {
                revFamilyRelType = revMenuVal_Id;
                revFamilyRelTypeTxt = revRelTypesMap[revMenuVal_Id];

                window.revSetInterval(revFamilyRelationTypeSelected_Id, () => {
                    document.getElementById(revFamilyRelationTypeSelected_Id).innerHTML = revFamilyInLaw(revFamilyRelTypeTxt);
                });

                revCallBackVals();
            });
        });

        return `<div id="${revGenMenuItem_Id}" class="revTabLink dropdown-item revFlexWrapper">${revRelTypesMap[revMenuVal_Id]}</div>`;
    };

    let revMenuItemsViewsArr = [];

    for (let revKey in revRelTypesMap) {
        let revMenuItemTab_Id = revKey + "_" + window.revGenUniqueId();
        revMenuItemsViewsArr.push(`<div id="${revMenuItemTab_Id}" class="revTabLink dropdown-item revFlexWrapper">${revGenMenuItem(revKey)}</div>`);
    }

    let revDropDownMenuAreaFamRelTypeVarArgs = {
        "revText": "FAmiLy RELATioNsHip TypEs",
        "revMenuItemsArr": revMenuItemsViewsArr,
    };

    let revDropDownMenuAreaFamRelType = await window.revDropdownMenu(revDropDownMenuAreaFamRelTypeVarArgs);

    /** REV START FAMILY RELATION FORM **/
    let revGetFamilyRelationshipComposerForm = async () => {
        return `
        <div class="revFlexWrapper revFamilyRelationInputWrapper">
            <div class="revFamilyRelationTypeSelectMenuArea">${revDropDownMenuAreaFamRelType}</div>
            <div id="${revFamilyRelationTypeSelected_Id}" class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revFamilyRelationTypeSelectedWrapper">${revFamilyInLaw(revFamilyRelTypeTxt)}</div>
        </div>
        `;
    };

    if (revConnRelsArr.length > 0) {
        for (let i = 0; i < revConnRelsArr.length; i++) {
            let revRelId = revConnRelsArr[i]._revEntityRelationshipType;

            if (window.revIsEmptyVar(revRelTypesMap[revRelId])) {
                continue;
            }

            if (revRelTypesMap.hasOwnProperty(revRelId)) {
                revFamilyRelTypeTxt = revRelTypesMap[revRelId];

                window.revSetInterval(revMoreOptionsContainer_Id, async () => {
                    document.getElementById(revMoreOptionsContainer_Id).innerHTML = `
                        <div class="revFlexContainer revFamilyRelationshipComposerFormContainer">
                            ${await revGetFamilyRelationshipComposerForm()}
                        </div>
                    `;
                });

                break;
            }
        }
    }
    /** REV END FAMILY RELATION FORM **/

    let revFamilyRelCB = (revRelVal) => {
        let revCB_Public_Id = "revSelectedIconId_" + window.revGenUniqueId();

        let revCheckBoxRelCallback = async (revCBVarArgs) => {
            if (revCBVarArgs.revCheckBoxChecked) {
                document.getElementById(revMoreOptionsContainer_Id).innerHTML = `
                    <div class="revFlexContainer revFamilyRelationshipComposerFormContainer">
                        ${await revGetFamilyRelationshipComposerForm()}
                    </div>
                `;
            } else {
                document.getElementById(revMoreOptionsContainer_Id).innerHTML = "";
            }
        };

        let revCBVarArgsPublic = {
            "revCheckBoxCallback": revCheckBoxRelCallback,
            "revCheckBoxId": revCB_Public_Id,
            "revCheckBoxVal": revRelVal,
            "revIsChecked": window.revIsEmptyVar(revFamilyRelType) == false || !window.revIsEmptyVar(revFamilyRelTypeTxt),
        };

        let revCheckBoxRel = window.revGetCheckBox(revCBVarArgsPublic);

        return `
            <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                ${revCheckBoxRel}
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">FAmiLy</div>
            </div>
        `;
    };
    /** REV END FAMILY RELATION FORM **/

    return revFamilyRelCB();
};

module.exports.revWidget = revWidget;
