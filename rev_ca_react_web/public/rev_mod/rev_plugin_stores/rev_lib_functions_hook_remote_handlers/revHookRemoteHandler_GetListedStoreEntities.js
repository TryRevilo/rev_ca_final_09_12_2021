var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;

        let revStoresGUIDsArr = await revRemoteHookMethods.revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID(revLoggedInEntityGUID, 11);

        let revStoresArr = await revRemoteHookMethods.revGetFilledEntities(revStoresGUIDsArr.filter);

        let revRetStoresArr = [];

        for (let i = 0; i < revStoresArr.length; i++) {
            let revStoreEntity = revStoresArr[i];

            if (revStoreEntity._revEntitySubType.localeCompare("rev_store") !== 0) {
                continue;
            }

            let revPassVarArgs = {
                "rev_entity_target_guid": revStoreEntity._remoteRevEntityGUID,
                "rev_rel_type_val_id_arr": 11,
            };

            let revStoreAdminEntitiesArr = await revRemoteHookMethods.revReadEntities_By_TargetGUID_RelId(revPassVarArgs);

            revRetStoresArr.push({
                "revStoreEntity": revStoreEntity,
                "revStoreAdminEntitiesArr": revStoreAdminEntitiesArr,
            });
        }

        revVarArgs.filter = revRetStoresArr;

        return revVarArgs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
