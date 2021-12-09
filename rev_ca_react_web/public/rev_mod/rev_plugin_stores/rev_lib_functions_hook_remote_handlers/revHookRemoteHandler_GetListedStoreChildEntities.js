var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;
        let revStoreEntityGUID = revReqParams.remote_rev_entity_guid;

        let revPassVarArgs_StoreChilds = {
            "revEntitySubtypesArr": ["rev_store_item"],
            "revContainerGUID": revStoreEntityGUID,
        };

        let revStoreChildsEntitiesArr = await revRemoteHookMethods.revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr(revPassVarArgs_StoreChilds);

        revVarArgs.filter = revStoreChildsEntitiesArr;

        return revVarArgs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
