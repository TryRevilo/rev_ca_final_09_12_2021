var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;

        let revPassVarArgs = {
            "rev_entity_target_guid": revLoggedInEntityGUID,
            "rev_rel_type_val_id_arr": [27],
            "rev_res_status": -1,
        };

        let revEntitiesArr = await revRemoteHookMethods.revReadEntities_By_TargetGUID_RelId(revPassVarArgs);

        if (!revVarArgs.filter) {
            revVarArgs["filter"] = [];
        }

        revVarArgs.filter = revVarArgs.filter.concat(revEntitiesArr);
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
