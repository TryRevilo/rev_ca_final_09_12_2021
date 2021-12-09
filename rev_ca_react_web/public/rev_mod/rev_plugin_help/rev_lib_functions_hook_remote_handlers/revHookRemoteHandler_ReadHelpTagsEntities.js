var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revLoggedInEntityGUID = revVarArgs.revReqParams.rev_logged_in_entity_guid;
        let revTagsArr = revVarArgs.revReqParams.rev_tags.split(",");
        let revEntitySubtypesArr = revVarArgs.revReqParams.rev_entity_subtypes_arr.split(",");

        let revMetadataTagsArr = await revRemoteHookMethods.revMetadataValsArrFullTextSearch(revTagsArr);

        let revEntityGUIDsArr = [];
        let revEntityPublishersGUIDsArr = [];

        for (let i = 0; i < revMetadataTagsArr.length; i++) {
            revEntityGUIDsArr.push(revMetadataTagsArr[i]._revMetadataEntityGUID);
        }

        let revFilledMetadataEntitiesArr = await revRemoteHookMethods.revGetFilledEntities(revEntityGUIDsArr, { "revEntitySubtypesArr": revEntitySubtypesArr });

        for (let i = 0; i < revFilledMetadataEntitiesArr.length; i++) {
            let revFilledMetadataEntity = revFilledMetadataEntitiesArr[i];

            revVarArgs.filter.push(revFilledMetadataEntity);

            if (revFilledMetadataEntity) {
                revEntityPublishersGUIDsArr.push(revFilledMetadataEntity._revEntityOwnerGUID);
            }
        }

        let revGetPublishersArr = await revRemoteHookMethods.revGetFilledEntities(revEntityPublishersGUIDsArr);

        if (!revVarArgs.hasOwnProperty("revEntityPublishersArr")) {
            revVarArgs["revEntityPublishersArr"] = revGetPublishersArr;
        } else {
            revVarArgs.revEntityPublishersArr = revVarArgs.revEntityPublishersArr.concat(revGetPublishersArr);
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
