var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        if (!revVarArgs.filter) {
            revVarArgs["filter"] = [];
        }

        if (revRemoteHookMethods.revJSONArrContains_NameId(revVarArgs.filter, "revFamilyConnectionRequestsNoticiasContextView")) {
            return revVarArgs;
        }

        let revEntityTargetGUID = revVarArgs.revReqParams.rev_logged_in_entity_guid;

        let revPassVarArgs = {
            "rev_entity_target_guid": revEntityTargetGUID,
            "rev_rel_type_val_id_arr": [27],
            "rev_res_status": -1,
        };

        let revNoticiasTotCount = await revRemoteHookMethods.revCountRels_By_TargetGUID_RelValId(revPassVarArgs);

        if (revNoticiasTotCount > 0 == true) {
            revVarArgs.filter.push({ "revNameId": "revFamilyConnectionRequestsNoticiasContextView", "revNoticiaCount": revNoticiasTotCount });
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
