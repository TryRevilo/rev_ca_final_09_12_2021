var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedIn = revReqParams.rev_logged_in_entity_guid;
        let revStoreEntityGUID = revReqParams.remote_rev_entity_guid;

        let revStoreEntity = await revRemoteHookMethods.revGetFilledEntity_By_EntityGUID(revStoreEntityGUID);

        let revPassVarArgs = {
            "rev_entity_target_guid": revStoreEntityGUID,
            "rev_rel_type_val_id_arr": 11,
        };

        let revStoreAdminEntitiesArr = await revRemoteHookMethods.revReadEntities_By_TargetGUID_RelId(revPassVarArgs);

        return {
            "revStoreEntity": revStoreEntity,
            "revStoreAdminEntitiesArr": revStoreAdminEntitiesArr,
        };
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
