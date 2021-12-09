var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        if (revRemoteHookMethods.revJSONArrContains_NameId(revVarArgs, "revConnRels")) {
            return revVarArgs;
        }

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;
        let revProfileEntityGUID = revReqParams.remote_rev_entity_guid;

        let revPassVarArgs = {
            "revRemoteHookMethods": revRemoteHookMethods,
            "revLoggedInEntityGUID": revLoggedInEntityGUID,
            "revProfileEntityGUID": revProfileEntityGUID,
        };

        let revRelsArr = await revRemoteHookMethods.revPluginHookRemoteEnv_GetEntityConnRels(revPassVarArgs);

        if (revRelsArr.length > 0) {
            revVarArgs.filter[0]["revConnRels"] = revRelsArr;
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
