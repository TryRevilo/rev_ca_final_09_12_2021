var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let filterRevRetArr = {
            filter: [],
            revPublishersArr: [],
        };

        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;
        let revPublishersLimit = 10;

        let revPassVarArgs = {
            "rev_entity_target_guid": revLoggedInEntityGUID,
            "rev_publishers_limit": revPublishersLimit,
            "rev_rel_type_val_id_arr": [10],
            "rev_res_status": -1,
        };

        let relRevEntityGUIDs = await revRemoteHookMethods.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID(revPassVarArgs);

        if (relRevEntityGUIDs.length == 0) {
            return filterRevRetArr;
        }

        let revMsgsEntitiesArr = await revRemoteHookMethods.revGetFilledEntities(relRevEntityGUIDs);

        filterRevRetArr.filter = revMsgsEntitiesArr;

        let revPublisherGUIDsArr = [];

        for (let i = 0; i < revMsgsEntitiesArr.length; i++) {
            let revEntity = revMsgsEntitiesArr[i];

            if (!revEntity || !revEntity._revEntityOwnerGUID || revEntity._revEntityOwnerGUID < 1) {
                continue;
            }

            revPublisherGUIDsArr.push(revEntity._revEntityOwnerGUID);
        }

        filterRevRetArr["revPublishersArr"] = await revRemoteHookMethods.revGetFilledEntities(revPublisherGUIDsArr);

        return filterRevRetArr;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
