var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;

        let revListedPlugins = revRemoteHookMethods.revGetAllListedPlugins;

        if (!revVarArgs.hasOwnProperty("filter")) {
            revVarArgs["filter"] = [];
        }

        revVarArgs.filter = revVarArgs.filter.concat(revListedPlugins);

        /** REV START INSTALLED PLUGINS */

        let revPassVarArgs = {
            "revEntityOwnerGUID": revLoggedInEntityGUID,
            "revEntitySubtype": "rev_plugin",
        };

        let revInstalledPluginsArr = await revRemoteHookMethods.revPersReadFlatEnties_By_OwnerGUID_Subtype(revPassVarArgs);
        revVarArgs["revInstalledPluginsArr"] = revInstalledPluginsArr;

        let revContainerGUIDsArr = [];

        for (let i = 0; i < revInstalledPluginsArr.length; i++) {
            let revContainerGUID = revInstalledPluginsArr[i]._revEntityContainerGUID;

            if (revLoggedInEntityGUID == revContainerGUID) {
                continue;
            }

            revContainerGUIDsArr.push(revContainerGUID);
        }

        revVarArgs["revPluginsContainersArr"] = await revRemoteHookMethods.revGetFilledEntities(revContainerGUIDsArr);

        return revVarArgs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
