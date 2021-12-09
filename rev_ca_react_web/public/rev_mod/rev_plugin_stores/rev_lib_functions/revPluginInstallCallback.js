var revPluginInstallCallback = async (revVarArgs) => {
    let revRetData;

    let _remoteRevEntityGUIDsArr = revVarArgs._remoteRevEntityGUID;

    if (_remoteRevEntityGUIDsArr !== null && _remoteRevEntityGUIDsArr.length > 0) {
        let filterRevRetArr = {
            filter: [],
        };

        let revAddedGUIDsArr = [];

        for (let i = 0; i < _remoteRevEntityGUIDsArr.length; i++) {
            let revCurrEntityGUID = _remoteRevEntityGUIDsArr[i];

            if (!revCurrEntityGUID || revCurrEntityGUID < 1 || window.revArrIncludesElement(revAddedGUIDsArr, revCurrEntityGUID)) {
                continue;
            }

            revAddedGUIDsArr.push(revCurrEntityGUID);

            let revPluginEntity = window.REV_ENTITY_STRUCT();
            revPluginEntity._revEntityResolveStatus = 0;
            revPluginEntity._revEntityChildableStatus = 301;
            revPluginEntity._revEntityType = "revObject";
            revPluginEntity._revEntitySubType = "rev_plugin";
            revPluginEntity._remoteRevEntityGUID = -1;
            revPluginEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
            revPluginEntity._revEntityContainerGUID = revCurrEntityGUID;
            revPluginEntity._revTimeCreated = new Date().getTime();
            revPluginEntity._revTimePublished = new Date().getTime();

            revPluginEntity._revEntityMetadataList.push(window.revMetadataFiller("rev_plugin_name_value", "rev_plugin_stores"));

            filterRevRetArr.filter.push(revPluginEntity);
        }

        if (filterRevRetArr.filter.length > 0) {
            await window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, filterRevRetArr, (revRetData) => {
                if (revRetData !== null && revRetData.filter) {
                    revRetData = revRetData.filter[0];
                }
            });
        }
    }

    return revRetData;
};

module.exports.revPluginInstallCallback = revPluginInstallCallback;
