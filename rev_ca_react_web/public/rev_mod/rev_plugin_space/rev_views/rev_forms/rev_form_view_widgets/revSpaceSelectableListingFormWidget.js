var revFormViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revData) {
        return null;
    }

    let revCheckedGUIDsArr = revVarArgs.revCheckedGUIDsArr;

    let revData = revVarArgs.revData;
    let revSpaceEntitiesArr = revData.filter;
    let revAdminsArr = revData.revAdminsArr;

    let revSelectableContactsCallback = revVarArgs.revSelectableContactsCallback;

    let revSpacesArr = [];

    let revGetEntityAdmin = (revAdminGUIDsArr, revAdminsArr) => {
        let revRetAdminsArr = [];

        for (let i = 0; i < revAdminsArr.length; i++) {
            let revAdminEntity = revAdminsArr[i];

            if (revAdminGUIDsArr.includes(revAdminEntity._remoteRevEntityGUID)) {
                revRetAdminsArr.push(revAdminEntity);
            }
        }

        return revRetAdminsArr;
    };

    for (let i = 0; i < revSpaceEntitiesArr.length; i++) {
        let revSpaceEntity = revSpaceEntitiesArr[i];
        let revCurrEntityGUID = revSpaceEntity._remoteRevEntityGUID;

        let revCheckBoxCallback = (revCBVarArgs) => {
            let revCheckBoxChecked = revCBVarArgs.revCheckBoxChecked;
            let revCheckBoxVal = revCBVarArgs.revCheckBoxVal;

            if (revCheckBoxChecked && !revArrIncludesElement(revCheckedGUIDsArr, revCheckBoxVal)) {
                revCheckedGUIDsArr.push(revCheckBoxVal);
            } else {
                window.revRemoveArrElement(revCheckedGUIDsArr, revCheckBoxVal);
            }

            revSelectableContactsCallback(revCheckedGUIDsArr);
        };

        let revSelectedIconCB_Id = i + "_revSelectedIconId_" + window.revGenUniqueId();

        let revCBVarArgs = {
            "revCheckBoxCallback": revCheckBoxCallback,
            "revCheckBoxId": revSelectedIconCB_Id,
            "revCheckBoxVal": revSpaceEntity._remoteRevEntityGUID,
            "revIsChecked": window.revArrIncludesElement(revCheckedGUIDsArr, revCurrEntityGUID),
        };

        let revSelectMainIconCheckBox = window.revGetCheckBox(revCBVarArgs);

        if (revSpaceEntity.revAdminGUIDsArr) {
            let revAdminGUIDsArr = revSpaceEntity.revAdminGUIDsArr;
            revSpaceEntity["revAdminsArr"] = revGetEntityAdmin(revAdminGUIDsArr, revAdminsArr);
        }

        let revSpaceBriefContextView = await revDownloadContextView("revSpaceBriefInfo", revSpaceEntity._revEntitySubType, revSpaceEntity);

        if (revSpaceBriefContextView) {
            revSpacesArr.push(`
                <div class="revFlexWrapper revSpaceListingItemWrapper">
                    <div class="revSelectableSpaceCheckBox">${revSelectMainIconCheckBox}</div>
                    <div class="revFlexWrapper revSelectableSpaceBriefWrapper">${revSpaceBriefContextView}</div>
                </div>
            `);
        }
    }

    return revSpacesArr.join("");
};

module.exports.revFormViewWidget = revFormViewWidget;
