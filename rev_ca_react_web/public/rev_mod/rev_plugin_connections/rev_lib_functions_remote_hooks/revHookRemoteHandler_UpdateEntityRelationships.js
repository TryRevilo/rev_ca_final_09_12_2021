var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revRelUpdateRes = await revRemoteHookMethods.revPluginHookRemoteEnvironment_UpdateConnectionRelationships(revVarArgs);

        return revRelUpdateRes;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
