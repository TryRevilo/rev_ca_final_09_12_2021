var revFormViewWidget = async (revVarArgs) => {
    let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;
    let revProfileEntityGUID = revVarArgs._remoteRevEntityGUID;

    let revVarArgsCurrRelsArr = [];
    let revVarArgsCurrRelsValsArr = [];

    let revMoreOptionsContainer_Id = "revMoreOptionsContainer_Id_" + window.revGenUniqueId();

    if (revVarArgs.revConnRels) {
        revVarArgsCurrRelsArr = revVarArgs.revConnRels;

        for (let i = 0; i < revVarArgs.revConnRels.length; i++) {
            revVarArgsCurrRelsValsArr.push(revVarArgs.revConnRels[i]._revEntityRelationshipType);
        }
    } else {
        revVarArgs["revConnRels"] = [];
    }

    let revRelsValsArr = [];
    let revFamRelJSON = {};

    if (revVarArgsCurrRelsValsArr.length > 0) {
        revRelsValsArr = revRelsValsArr.concat(revVarArgsCurrRelsValsArr);
    }

    let revGetRelIdByRelVal = (revRelVal) => {
        let revRelId = -1;

        for (let i = 0; i < revVarArgsCurrRelsArr.length; i++) {
            if (revVarArgsCurrRelsArr[i]._revEntityRelationshipType.localeCompare(revRelVal) == 0) {
                revRelId = revVarArgsCurrRelsArr[i]._remoteRevEntityRelationshipId;

                break;
            }
        }

        return revRelId;
    };

    /** REV START CONNECT */
    let revSaveRel = () => {
        let revNewConnsArr = [];
        let revDelConnsRelsIdsArr = [];
        let revDelConnsValsArr = [];

        let revPersRelsData = {};

        /** REV START NEW RELS */
        for (let i = 0; i < revRelsValsArr.length; i++) {
            let revRelVal = revRelsValsArr[i];

            if (window.revArrIncludesElement(revRelsValsArr, revRelVal)) {
                revNewConnsArr.push(revRelVal);
            }
        }

        if (revNewConnsArr.length > 0) {
            revPersRelsData["revNewConnsArr"] = revNewConnsArr;
        }
        /** REV END NEW RELS */

        /** REV START DEL RELS */
        for (let i = 0; i < revVarArgsCurrRelsValsArr.length; i++) {
            let revRelVal = revVarArgsCurrRelsValsArr[i];
            if (!window.revArrIncludesElement(revRelsValsArr, revRelVal) && window.revArrIncludesElement(revVarArgsCurrRelsValsArr, revRelVal)) {
                revDelConnsRelsIdsArr.push(revGetRelIdByRelVal(revRelVal));
                revDelConnsValsArr.push(revRelVal);
            }
        }

        if (revDelConnsRelsIdsArr.length > 0) {
            revPersRelsData["revDelConnsRelsIdsArr"] = revDelConnsRelsIdsArr;
        }

        if (!window.revIsEmptyJSONObject(revFamRelJSON)) {
            revPersRelsData["revFamRelJSON"] = revFamRelJSON;
        }

        /** REV START DEL RELS */
        if (!window.revIsEmptyJSONObject(revPersRelsData)) {
            revPersRelsData["revLoggedInEntityGUID"] = revLoggedInEntityGUID;
            revPersRelsData["revTargetEntityGUID"] = revProfileEntityGUID;

            let revURL = window.REV_SITE_BASE_PATH + "/rev_base_api_post?revPluginHookContextsRemoteArr=revHookRemoteHandler_UpdateEntityRelationships";

            console.log("revPersRelsData : " + JSON.stringify(revPersRelsData));

            window.revPostServerData(revURL, revPersRelsData, (revRetRelData) => {
                /** REV START ADD NEW RELS TO PROFILE */
                if (revRetRelData.revNewSavedRelsData && revRetRelData.revNewSavedRelsData.length > 0) {
                    revVarArgs.revConnRels = revVarArgs.revConnRels.concat(revRetRelData.revNewSavedRelsData);
                }
                /** REV END ADD NEW RELS TO PROFILE */

                if (revVarArgs.revRelUpdateCallBackFunc) {
                    /** REV START REMOVE NEW RELS FROM PROFILE */
                    for (let i = 0; i < revDelConnsValsArr.length; i++) {
                        let revDelConRelVal = revDelConnsValsArr[i];

                        let relI = 0;

                        while (relI < revVarArgs.revConnRels.length) {
                            if (revVarArgs.revConnRels[i]._revEntityRelationshipType.localeCompare(revDelConRelVal) == 0) {
                                revVarArgs.revConnRels.splice(relI, 1);
                                continue;
                            }

                            ++i;
                        }
                    }
                    /** REV END REMOVE NEW RELS FROM PROFILE */

                    revVarArgs.revRelUpdateCallBackFunc(revVarArgs);
                }
            });
        }
    };
    /** REV END CONNECT */

    /** REV START GEN RELATION FORM **/
    let revGetRelCB = (revRelVal) => {
        let revCB_Public_Id = "revSelectedIconId_" + window.revGenUniqueId();

        let revCheckBoxRelCallback = (revCBVarArgs) => {
            if (revCBVarArgs.revCheckBoxChecked) {
                revRelsValsArr.push(revCBVarArgs.revCheckBoxVal);
            } else {
                window.revRemoveArrElement(revRelsValsArr, revCBVarArgs.revCheckBoxVal);
            }
        };

        let revIsChecked = window.revArrIncludesElement(revVarArgsCurrRelsValsArr, revRelVal);

        let revCBVarArgsPublic = {
            "revCheckBoxCallback": revCheckBoxRelCallback,
            "revCheckBoxId": revCB_Public_Id,
            "revCheckBoxVal": revRelVal,
            "revIsChecked": revIsChecked,
        };

        let revCheckBoxRel = window.revGetCheckBox(revCBVarArgsPublic);

        return revCheckBoxRel;
    };
    /** REV END GEN RELATION FORM **/

    let revGetConnectUserForm = async () => {
        let revPublisherFormOptionalFooterAreaContainerHideTab_Id = "revPublisherFormOptionalFooterAreaContainerHideTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revPublisherFormOptionalFooterAreaContainerHideTab_Id, () => {
            document.getElementById(revPublisherFormOptionalFooterAreaContainerHideTab_Id).addEventListener("click", (event) => {
                window.revToggleSwitchArea(null);
            });
        });

        let revConnectUserSaveTab_Id = "revConnectUserSaveTab_Id_" + window.revGenUniqueId();

        let revFormSubmitTab = window.revSubmitTabCurvedPointerRight({
            "revId": revConnectUserSaveTab_Id,
            "revTitle": "coNNEcT",
            "revSubmitCallback": () => {
                revSaveRel();
                window.revToggleSwitchArea(null);
            },
        });

        /** REV START CONN FAMILY CONN TYPES MENU AREA */
        let revPassVarArgs = {
            "revMoreOptionsContainer_Id": revMoreOptionsContainer_Id,
            "revFamilyRelTypeSelectionCallBack": (_revFamRelJSON) => {
                revFamRelJSON = _revFamRelJSON;
            },
            "revConnRels": revVarArgsCurrRelsArr,
        };

        let revMenuAreaFamilyConnectionType = await window.revGetMenuAreaView("revMenuAreaFamilyConnectionType", revPassVarArgs);
        /** REV END CONN FAMILY CONN TYPES MENU AREA */

        return `
        <div class="revFlexContainer revCreateUserConnectionFormContainer">
            <div class="revFlexWrapper revPublisherSettingsFormViewWrapper">
                <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                    ${revGetRelCB("rev_entity_connect_members")}
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">FRiEND</div>
                </div>
                <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                    ${revGetRelCB("rev_colleague")}
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">coLlEAGuE</div>
                </div>
                <div class="revFlexWrapper revPublisherSettingsOptionWrapper">
                    ${revGetRelCB("rev_fan")}
                    <div class="revFontSiteGreyTxtColor revFontSizeNormal revPublisherOptionSettingsTxt">FAN</div>
                </div>
                ${revMenuAreaFamilyConnectionType}
            </div>
            <div id="${revMoreOptionsContainer_Id}" class="revFlexContainer"></div>
            <div class="revFlexWrapper revConnectUserFormFooterWrapper">
                ${revFormSubmitTab}
                <div id="${revPublisherFormOptionalFooterAreaContainerHideTab_Id}" class="revTabLink revFontSiteBlueTxtColor revHidePublisherSettingsTab">HiDE</div>
            </div>
        </div>
        `;
    };

    return await revGetConnectUserForm();
};

module.exports.revFormViewWidget = revFormViewWidget;
