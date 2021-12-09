var revHookRemoteHandlerCallback = async (revVarArgs) => {
    let revUserEntitiesArr = [];

    if (revVarArgs && revVarArgs.revRemoteHookMethods && revVarArgs.revUserEntitiesGUIDsArr) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revUserEntitiesGUIDsArr = revVarArgs.revUserEntitiesGUIDsArr;

        return await revRemoteHookMethods.revGetFilledEntities(revUserEntitiesGUIDsArr);
    }

    return revUserEntitiesArr;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
