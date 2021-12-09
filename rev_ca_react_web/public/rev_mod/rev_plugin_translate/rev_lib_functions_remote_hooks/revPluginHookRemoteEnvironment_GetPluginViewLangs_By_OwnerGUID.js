var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revEntityGUID = revVarArgs.revReqParams.rev_entity_guid;

        let revPluginLangs = await revRemoteHookMethods.revGetPluginViewLangs_By_OwnerGUID({ "revOwnerGUID": revEntityGUID });

        return revPluginLangs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
