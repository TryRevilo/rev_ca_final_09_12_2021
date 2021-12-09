var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;
        let revSearchTextArr = [revReqParams.rev_search_txt];
        let revEntitySubtypesArr;

        let revEntityPublishersGUIDsArr = [];

        if (revReqParams.rev_entity_subtypes_arr && revReqParams.rev_entity_subtypes_arr.length > 0) {
            revEntitySubtypesArr = revReqParams.rev_entity_subtypes_arr.split(",");
        }

        let revEntityOwnerGUID = -1;

        if (revReqParams.rev_entity_owner_guid) {
            revEntityOwnerGUID = revReqParams.rev_entity_owner_guid;
        }

        let revContainerGUID = -1;

        if (revReqParams.rev_container_guid) {
            revContainerGUID = revReqParams.rev_container_guid;
        }

        let revEntityGUIDsArr = [];

        let revPassVarArgs_FullTxtxSearch = {
            "revEntitySubtypesArr": revEntitySubtypesArr,
            "revEntityOwnerGUID": revEntityOwnerGUID,
            "revContainerGUID": revContainerGUID,
        };

        let revFilledSearchEntitiesArr = [];

        if (revEntitySubtypesArr) {
            let revFilledMetadataEntitiesArr = await revRemoteHookMethods.revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr(revPassVarArgs_FullTxtxSearch);
            revFilledSearchEntitiesArr = revFilledSearchEntitiesArr.concat(revFilledMetadataEntitiesArr);

            for (let i = 0; i < revFilledMetadataEntitiesArr.length; i++) {
                revEntityPublishersGUIDsArr.push(revFilledMetadataEntitiesArr[i]._revEntityOwnerGUID);
            }
        }

        if (revSearchTextArr) {
            let revMetadataSearchArr = await revRemoteHookMethods.revMetadataValsArrFullTextSearch(revSearchTextArr);

            for (let i = 0; i < revMetadataSearchArr.length; i++) {
                if (!revRemoteHookMethods.revEntitiesArrIncludesEntityGUID(revFilledSearchEntitiesArr, revMetadataSearchArr[i]._revMetadataEntityGUID)) {
                    revEntityGUIDsArr.push(revMetadataSearchArr[i]._revMetadataEntityGUID);
                }
            }

            let revFilledMetadataEntitiesArr = await revRemoteHookMethods.revGetFilledEntities(revEntityGUIDsArr, revPassVarArgs_FullTxtxSearch);
            revFilledSearchEntitiesArr = revFilledSearchEntitiesArr.concat(revFilledMetadataEntitiesArr);

            for (let i = 0; i < revFilledSearchEntitiesArr.length; i++) {
                let revFilledMetadataEntity = revFilledMetadataEntitiesArr[i];

                if (!revFilledMetadataEntity) {
                    continue;
                }

                let revSubtype = revFilledMetadataEntity._revEntitySubType;

                if (revSubtype.localeCompare("rev_entity_info") == 0) {
                    revFilledMetadataEntity = await revRemoteHookMethods.revGetFlatEntity(revFilledMetadataEntity._revEntityContainerGUID);
                }

                revVarArgs.filter.push(revFilledMetadataEntity);

                if (revFilledMetadataEntity) {
                    revEntityPublishersGUIDsArr.push(revFilledMetadataEntity._revEntityOwnerGUID);
                }
            }
        }

        let revGetPublishersArr = await revRemoteHookMethods.revGetFilledEntities(revEntityPublishersGUIDsArr);

        if (!revVarArgs.hasOwnProperty("revEntityPublishersArr")) {
            revVarArgs["revEntityPublishersArr"] = revGetPublishersArr;
        }

        revVarArgs.revEntityPublishersArr = revVarArgs.revEntityPublishersArr.concat(revGetPublishersArr);
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
