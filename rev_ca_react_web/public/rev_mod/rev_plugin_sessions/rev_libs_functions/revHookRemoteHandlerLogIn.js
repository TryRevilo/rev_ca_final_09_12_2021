var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revUniqueId = revVarArgs.revReqParams.rev_entity_unique_id;

        /** REV START GET UNIQUE ID METADATA */

        let revEntityMetadata = await revRemoteHookMethods.revReadUniqueMetadata_By_UniqueValue(revUniqueId);

        if (revEntityMetadata) {
            let revMetadataName = revEntityMetadata._revMetadataName;
            let revMetadataEntityGUID = revEntityMetadata._revMetadataEntityGUID;

            let revLoggedInData;

            if (revMetadataName.localeCompare("rev_entity_unique_id") == 0) {
                revLoggedInData = await revRemoteHookMethods.revGetFlatEntity(revMetadataEntityGUID);
            } else if (revMetadataName.localeCompare("rev_phone_number") == 0) {
                let revMetadataOwnerEntityGUID = await revRemoteHookMethods.revReadOwnerEntityGUID_By_RevEntityGUID(revMetadataEntityGUID);
                revLoggedInData = await revRemoteHookMethods.revGetFlatEntity(revMetadataOwnerEntityGUID);
            }
            /** REV END GET INIQUE ID METADATA */

            /** REV START LOAD CONNECTIONS */
            let revPassVarArgs_Conn = {
                "revLoggedInEntityGUID": revLoggedInData._remoteRevEntityGUID,
                "revRemoteHookMethods": revRemoteHookMethods,
            };

            let revProfileConnEntitiesArr = await revRemoteHookMethods.revPluginHookRemoteEnvironment_GetEntityConns(revPassVarArgs_Conn);
            revVarArgs["revProfileConnEntitiesArr"] = revProfileConnEntitiesArr;
            /** REV END LOAD CONNECTIONS */

            return Object.assign(revVarArgs, revLoggedInData);
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
