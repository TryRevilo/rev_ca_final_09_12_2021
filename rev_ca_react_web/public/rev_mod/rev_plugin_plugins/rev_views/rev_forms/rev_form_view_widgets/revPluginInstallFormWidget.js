var revFormViewWidget = async (revVarArgs) => {
    let revManifest = revVarArgs.revManifest;
    let revPluginContainersArr = revVarArgs.revPluginContainersArr;

    let revSelectedGUIDsArr = [];
    let revSavedCheckedGUIDsArr = [];

    for (let i = 0; i < revPluginContainersArr.length; i++) {
        let revCurrContainerGUID = Number(revPluginContainersArr[i].revContainerGUID);

        revSavedCheckedGUIDsArr.push(revCurrContainerGUID);
        revSelectedGUIDsArr.push(revCurrContainerGUID);
    }

    let revGetPluginContainer = (revContainerGUID) => {
        let revPluginContainer;

        for (let i = 0; i < revPluginContainersArr.length; i++) {
            if (revPluginContainersArr[i].revContainerGUID == revContainerGUID) {
                revPluginContainer = revPluginContainersArr[i];
                break;
            }
        }

        return revPluginContainer;
    };

    let revName = revManifest.revName;

    let revSpaceSelectableListingForm = '<div class="revFontSiteGreyTxtColor revFontSizeNormal revPluginInstallFormNoSpaces">You do not have any Spaces</div>';

    let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

    try {
        let revURL = `${window.REV_SITE_BASE_PATH}/rev_api/get_entities_with_admins?rev_logged_in_entity_guid=${revLoggedInEntityGUID}&rev_subject_guid=${revLoggedInEntityGUID}&rev_rel_type_val_id_arr=11&rev_query_limit=40`;

        let revData = await window.revGetServerData_JSON_Async(revURL);

        let revSelectableContactsCallback = (revSelectedData) => {
            revSelectedGUIDsArr = revSelectedData;
        };

        if (revData) {
            revSpaceSelectableListingForm = await window.revGetForm("revSpaceSelectableListingForm", {
                "revSelectableContactsCallback": revSelectableContactsCallback,
                "revData": revData,
                "revCheckedGUIDsArr": revSelectedGUIDsArr,
            });
        }
    } catch (error) {
        console.log("revPluginInstallFormWidget error : " + error);
        return `<div class="revFontSiteGreyTxtColor revFontSizeNormal revPluginInstallFormNoSpaces">You do not have any Spaces to install this PlugIn on</div>`;
    }

    let revSavePluginTab_Id = "revSavePluginTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revSavePluginTab_Id, () => {
        document.getElementById(revSavePluginTab_Id).addEventListener("click", async (event) => {
            /** REV START INSTALL PLUGINS */
            if (revManifest.revPluginInstallCallback) {
                let revNewPluginContainerGUIDsArr = [];

                for (let i = 0; i < revSelectedGUIDsArr.length; i++) {
                    if (!window.revArrIncludesElement(revSavedCheckedGUIDsArr, revSelectedGUIDsArr[i])) {
                        revNewPluginContainerGUIDsArr.push(revSelectedGUIDsArr[i]);
                    }
                }

                let revPluginInstallCallback = window.revAsyncFunctionInit(revManifest.revPluginInstallCallback);

                let revCurrRetData = await revPluginInstallCallback({ "_remoteRevEntityGUID": revSelectedGUIDsArr });

                console.log("revCurrRetData : " + JSON.stringify(revCurrRetData));
            } else {
                console.log("revVarArgs.revPluginInstallCallback : " + (revManifest.revPluginInstallCallback !== null));
            }
            /** REV END INSTALL PLUGINS */

            /** REV START REMOVE PLUGINS */
            if (revManifest.revPluginRemoveCallback) {
                let revPluginUnInstallContainersArr = [];

                for (let i = 0; i < revSavedCheckedGUIDsArr.length; i++) {
                    let revCheckedGUID = revSavedCheckedGUIDsArr[i];

                    if (!window.revArrIncludesElement(revSelectedGUIDsArr, revCheckedGUID)) {
                        revPluginUnInstallContainersArr.push(revGetPluginContainer(revCheckedGUID));
                    }
                }

                let revPluginRemoveCallback = window.revAsyncFunctionInit(revManifest.revPluginRemoveCallback);
                await revPluginRemoveCallback(revPluginUnInstallContainersArr);
            } else {
                console.log("revVarArgs.revPluginRemoveCallback : " + (revManifest.revPluginRemoveCallback !== null));
            }
            /** REV END REMOVE PLUGINS */
        });
    });

    /** REV START USER PROFILE */
    let revCheckBoxCallback = (revCBVarArgs) => {
        let revCheckBoxChecked = revCBVarArgs.revCheckBoxChecked;
        let revCheckBoxVal = revCBVarArgs.revCheckBoxVal;

        if (revCheckBoxChecked) {
            revSelectedGUIDsArr.push(revCheckBoxVal);
        } else {
            window.revRemoveArrElement(revSelectedGUIDsArr, revCheckBoxVal);
        }
    };

    let revSelectedUserProfileCB_Id = "revSelectedUserProfileCB_Id_" + window.revGenUniqueId();

    let revCBVarArgs = {
        "revCheckBoxCallback": revCheckBoxCallback,
        "revCheckBoxId": revSelectedUserProfileCB_Id,
        "revCheckBoxVal": revLoggedInEntityGUID,
        "revIsChecked": window.revArrIncludesElement(revSavedCheckedGUIDsArr, revLoggedInEntityGUID),
    };

    let revSelectMainIconCheckBox = window.revGetCheckBox(revCBVarArgs);

    let revSelectableLoggedInUser = `
        <div class="revFlexWrapper revSelectableLoggedInUserWrapper">
            ${revSelectMainIconCheckBox}
            <div class="revFontSiteBlueTxtColor revFontSizeNormal revSelectableLoggedInUserTell">Make available on my profile</div>
        </div>
    `;
    /** REV END USER PROFILE */

    return `
    <div class="revFlexContainer">
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revSelectableProfilesTell">Select places you would like to use the plugin</div>
        <div class="revFlexWrapper revPluginDetailsWrapper">
            <div class="revFlexWrapper revInstallPluginItemIconWrapper"><i class="fas fa-charging-station revInstallPluginItemIcon"></i></div>
            <div class="revSmalllBoldBlue revPluginItemName">${revName}</div>
        </div>
        <div id="${revSavePluginTab_Id}" class="revTabLink revFlexWrapper revNextTabWrapper">
            <div class="revSmalllBoldWhite revNextTabTxt">sAvE</div>
            <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fa fa-arrow-right"></i></div>
        </div>
        ${revSelectableLoggedInUser}
        <div class="revFlexContainer revSelectableProfilesContainer">${revSpaceSelectableListingForm}</div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
