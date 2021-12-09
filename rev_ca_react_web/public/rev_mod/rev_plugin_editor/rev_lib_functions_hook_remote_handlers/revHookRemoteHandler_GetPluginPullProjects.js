var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revReqParams = revVarArgs.revReqParams;

        if (revRemoteHookMethods.revIsEmptyVar(revReqParams)) {
            return;
        }

        if (!revReqParams.hasOwnProperty("rev_logged_in_entity_guid") || revReqParams.rev_logged_in_entity_guid < 1) {
            return revVarArgs;
        }

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;

        let revPassVarArgs = {
            "revEntityOwnerGUID": revLoggedInEntityGUID,
            "revEntitySubtype": "rev_plugin_edit",
        };

        let revPluginEditsArr = await revRemoteHookMethods.revPersReadFlatEnties_By_OwnerGUID_Subtype(revPassVarArgs);

        revVarArgs["revPluginEditsArr"] = revPluginEditsArr;
        /** REV END LOEDED PLUGINS */
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
