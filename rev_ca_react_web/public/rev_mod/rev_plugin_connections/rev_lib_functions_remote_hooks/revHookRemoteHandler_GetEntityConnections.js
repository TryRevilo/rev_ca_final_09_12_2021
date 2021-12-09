var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;
        let revRelTypeValIdsArr = revReqParams.rev_rel_type_val_id_arr.split(",");

        /** REV START PROFILE CONNS */
        let revRelsPassVarArgs = {
            "revResStatusArr": [-1, -101],
            "revRelTypeValIdsArr": revRelTypeValIdsArr,
            "revEntityGUID": revLoggedInEntityGUID,
        };

        let revProfileConnEntitiesRelsArr = await revRemoteHookMethods.revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelIdsArr(revRelsPassVarArgs);

        let revProfRelGUIDsArr = [];

        for (let i = 0; i < revProfileConnEntitiesRelsArr.length; i++) {
            let revSubjGUID = revProfileConnEntitiesRelsArr[i]._remoteRevEntitySubjectGUID;
            let revTargGUID = revProfileConnEntitiesRelsArr[i]._remoteRevEntityTargetGUID;

            if (revSubjGUID == revLoggedInEntityGUID && revTargGUID == revLoggedInEntityGUID) {
                continue;
            }

            if (revSubjGUID == revLoggedInEntityGUID) {
                revProfRelGUIDsArr.push(revTargGUID);
            } else {
                revProfRelGUIDsArr.push(revSubjGUID);
            }
        }

        /** REV END PROFILE CONNS */

        if (!revVarArgs.filter) {
            revVarArgs["filter"] = [];
        }

        let revProfileConnEntitiesArr = await revRemoteHookMethods.revGetFilledEntities(revProfRelGUIDsArr);

        let revAddedAdminGUIDsArr = [];

        for (let i = 0; i < revProfileConnEntitiesArr.length; i++) {
            let revRelEntity = revProfileConnEntitiesArr[i];

            revProfileConnEntitiesArr[i]["revAdminGUIDsArr"] = [];

            let revPassVarArgs = { "rev_entity_target_guid": revRelEntity._remoteRevEntityGUID, "rev_rel_type_val_id_arr": 11 };

            let revSubjectGUIDsArr = await revRemoteHookMethods.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID(revPassVarArgs);

            if (revSubjectGUIDsArr) {
                for (let iAdmin = 0; iAdmin < revSubjectGUIDsArr.length; iAdmin++) {
                    let revSubjectGUID = revSubjectGUIDsArr[iAdmin];

                    revProfileConnEntitiesArr[i].revAdminGUIDsArr.push(revSubjectGUID);

                    if (revAddedAdminGUIDsArr.includes(revSubjectGUID)) {
                        continue;
                    }

                    revAddedAdminGUIDsArr.push(revSubjectGUID);
                }
            }
        }

        revVarArgs["revAdminsArr"] = await revRemoteHookMethods.revGetFilledEntities(revAddedAdminGUIDsArr);

        revVarArgs.filter = revVarArgs.filter.concat(revProfileConnEntitiesArr);
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
