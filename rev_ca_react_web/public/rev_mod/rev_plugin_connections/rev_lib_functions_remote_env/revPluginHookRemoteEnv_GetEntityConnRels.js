var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;
        let revProfileEntityGUID = revVarArgs.revProfileEntityGUID;

        let revRelsArr = await revRemoteHookMethods.revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds([revLoggedInEntityGUID, revProfileEntityGUID], [5, 28]);

        return revRelsArr;
    }

    return null;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
