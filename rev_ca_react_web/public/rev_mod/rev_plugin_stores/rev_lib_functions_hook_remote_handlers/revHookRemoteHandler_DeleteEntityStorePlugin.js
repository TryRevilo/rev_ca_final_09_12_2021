var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;
        let revDeleGUIDsArr = revReqParams.rev_dele_guids_arr.split(",");

        if (revDeleGUIDsArr.length > 0) {
            let revEntityChildsDeleteGUIDs = await revRemoteHookMethods.revGetEntityChildsDeleteGUIDs(revDeleGUIDsArr);
            let revDelResData = await revRemoteHookMethods.revDelRevEntity_By_remoteRevEntityGUID(revEntityChildsDeleteGUIDs);

            if (!revVarArgs.hasOwnProperty("revDelStorePluginsRetData")) {
                revVarArgs["revDelStorePluginsRetData"] = revDelResData;
            }
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
