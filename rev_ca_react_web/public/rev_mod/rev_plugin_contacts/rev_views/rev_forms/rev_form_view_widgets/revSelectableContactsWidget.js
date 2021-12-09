var revFormViewWidget = async (revVarArgs) => {
    let revSelectableContactsCallback = revVarArgs.revSelectableContactsCallback;

    let revImportedContactsEntitiesArr = [];

    if (revVarArgs.revImportedEntityContactsArr && revVarArgs.revImportedEntityContactsArr.length > 0) {
        let revImportedEntityContactsArr = revVarArgs.revImportedEntityContactsArr;

        let url = window.REV_SITE_BASE_PATH + "/rev_api/get_metadata_entity_guids?rev_metadata_vals=" + revImportedEntityContactsArr.join() + "&revPluginHookContextsRemoteArr=revHookRemoteGetMetadaValPublishers";
        try {
            revData = await window.revGetServerData_JSON_Async(url);
            revData = revData.filter;

            for (let i = 0; i < revData.length; i++) {
                if (!revData[i] || !revData[i].revEntity) continue;

                let revEntityImport = revData[i].revEntity;

                if (revEntityImport) revImportedContactsEntitiesArr.push(revEntityImport);
            }
        } catch (error) {
            console.log("revSelectableContactsWidget -> revData.filter " + error);
        }
    }

    await window.revSetInterval("revSelectableContactsListingContainerId", async () => {
        await window.revLoadModules("revPluginModuleSessions", async (revScriptModule) => {
            await window.revPluginModuleSessions.revGetLoggedInEntity(async (revLoggedInEntity) => {
                let revEntityGUID = revLoggedInEntity._remoteRevEntityGUID;
                let revRelTypeId = 5;

                if (revVarArgs && revVarArgs.revEntity) {
                    revEntityGUID = revVarArgs.revEntity._remoteRevEntityGUID;

                    if (revVarArgs.revEntity._revEntityType.localeCompare("rev_group_entity") == 0) revRelTypeId = 7;
                }

                let url = window.REV_SITE_BASE_PATH + `/rev_api/get_rev_entities_by_entity_guid_rel_type?relTypeValId=${revRelTypeId}&remoteRevEntityGUID=${revEntityGUID}`;
                let revData = await window.revGetServerData_JSON_Async(url);
                revData = revData.filter;

                /** REV START ADD IMPORTED CONTACTS */
                revData = revData.concat(revImportedContactsEntitiesArr);
                /** REV END ADD IMPORTED CONTACTS */

                let revCountText = "";

                if (revData.length > 1) revCountText = "over ";

                let revContactsViewsArr = [];
                let revCheckBoxesArr = [];
                let revSelectedEntitiesJSON = {};

                for (let i = 0; i < revData.length; i++) {
                    let revEntity = revData[i];

                    if (!revEntity) continue;

                    let revCheckBoxCallback = (revCBVarArgs) => {
                        let revSelectedEntitiesArr = [];

                        let revCheckBoxChecked = revCBVarArgs.revCheckBoxChecked;
                        let revCurrCheckBoxId = revCBVarArgs.revCheckBoxId;

                        if (revCheckBoxChecked) {
                            revSelectedEntitiesJSON[revCurrCheckBoxId] = revEntity._remoteRevEntityGUID;
                        } else {
                            if (revSelectedEntitiesJSON.hasOwnProperty(revCurrCheckBoxId)) delete revSelectedEntitiesJSON[revCurrCheckBoxId];
                        }

                        for (let cB = 0; cB < revCheckBoxesArr.length; cB++) {
                            if (revCheckBoxesArr[cB].localeCompare(revCurrCheckBoxId) == 0) {
                                continue;
                            }

                            document.getElementById(revCheckBoxesArr[cB]).checked = false;
                        }

                        for (var key of Object.keys(revSelectedEntitiesJSON)) {
                            revSelectedEntitiesArr.push(revSelectedEntitiesJSON[key]);
                        }

                        revSelectableContactsCallback(revSelectedEntitiesArr);
                    };

                    let revSelectedIconCBId = i + "_revSelectedIconId_" + window.revGenUniqueId();

                    let revCBVarArgs = {
                        "revCheckBoxCallback": revCheckBoxCallback,
                        "revCheckBoxId": revSelectedIconCBId,
                    };

                    let revSelectMainIconCheckBox = window.revGetCheckBox(revCBVarArgs);

                    try {
                        let revLoadedPageView = await window.revGetLoadedPageView("revObjectViewContactItem", revEntity);

                        if (revLoadedPageView) {
                            revContactsViewsArr.push(`
                            <div class="revFlexWrapper">
                                <div class="revContactCheckBox">${revSelectMainIconCheckBox}</div>
                                <div class="revSelectableContactWrapper">${revLoadedPageView}</div>
                            </div>
                        `);
                        }
                    } catch (error) {
                        console.log("ERR -> revSelectableContactsWidget.js -> revObjectViewContactItem -> " + error);
                    }
                }

                if (!Array.isArray(revContactsViewsArr) || revContactsViewsArr.length < 1) {
                    document.getElementById("revSelectableContactsListingContainerId").innerHTML = '<div class="revSmalllBold revNullContactsTxt">No coNTacts added to dispLAy</div>';
                } else {
                    document.getElementById("revSelectableContactsListingContainerId").innerHTML = revContactsViewsArr.join("");
                }
            });
        });
    });

    let revView = `<div id="revSelectableContactsListingContainerId" class="revFlexContainer"></div>`;

    return revView;
};

module.exports.revFormViewWidget = revFormViewWidget;
