var revPluginRemoveCallback = async (revVarArgs) => {
    let revRetData;

    if (revVarArgs && revVarArgs.length > 0) {
        let revDelEntityGUIDsArr = [];

        for (let i = 0; i < revVarArgs.length; i++) {
            let revCurrDelInstalledPluginObject = revVarArgs[i].revInstalledPlugin;

            if (window.revIsEmptyJSONObject(revCurrDelInstalledPluginObject)) {
                continue;
            }

            revDelEntityGUIDsArr.push(revCurrDelInstalledPluginObject._remoteRevEntityGUID);
        }

        if (revDelEntityGUIDsArr.length > 0) {
            try {
                let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

                let revPath = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${revLoggedInEntityGUID}&rev_dele_guids_arr=${revDelEntityGUIDsArr.join(",")}&revPluginHookContextsRemoteArr=revHookRemoteHandler_DeleteEntityStorePlugin`;

                revRetData = await window.revGetServerData_JSON_Async(revPath);

                if (revRetData) {
                    console.log("revRetData : " + JSON.stringify(revRetData));
                }
            } catch (error) {
                console.log("ERR -> revPluginRemoveCallback.js -> " + error);
            }
        }
    }

    return revRetData;
};

module.exports.revPluginRemoveCallback = revPluginRemoveCallback;
