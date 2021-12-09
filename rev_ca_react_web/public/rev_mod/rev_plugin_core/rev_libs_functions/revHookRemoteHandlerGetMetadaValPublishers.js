var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revRemoteHookMethods) return revVarArgs;

    if (revVarArgs && Array.isArray(revVarArgs.filter)) {
        let revMetadataArr = revVarArgs.filter;

        var filterRevRetArr = {
            filter: [],
        };

        for (let i = 0; i < revMetadataArr.length; i++) {
            let revMetadata = revMetadataArr[i];

            let revMetadataUniqueId = revMetadata.revMetadataUniqueId;
            let revMetadataEntityGUID = revMetadata.revMetadataEntityGUID;

            let revMetadataOwnerEntityGUID = await revVarArgs.revRemoteHookMethods.revReadOwnerEntityGUID_By_RevEntityGUID(revMetadataEntityGUID);
            let revMetadataOwnerEntity = await revVarArgs.revRemoteHookMethods.revGetFlatEntity(revMetadataOwnerEntityGUID);

            filterRevRetArr.filter.push({ "revMetadataUniqueId": revMetadataUniqueId, "revEntity": revMetadataOwnerEntity });
        }

        return filterRevRetArr;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
