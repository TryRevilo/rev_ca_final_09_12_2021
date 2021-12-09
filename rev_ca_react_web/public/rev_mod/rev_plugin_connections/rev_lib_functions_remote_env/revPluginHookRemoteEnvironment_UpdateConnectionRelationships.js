var revHookRemoteHandlerCallback = async (revVarArgs) => {
    let revRetData = {};

    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revReqBody = revVarArgs.revReqBody;

        let revLoggedInEntityGUID = revReqBody.revLoggedInEntityGUID;
        let revTargetEntityGUID = revReqBody.revTargetEntityGUID;

        let revRelTypesValIds = { "rev_entity_connect_members": 5 };

        /** REV START NEW RELS */
        if (revReqBody.revNewConnsArr && revReqBody.revNewConnsArr.length > 0) {
            let revNewConnsArr = revReqBody.revNewConnsArr;

            let revNewPersRelsArr = [];

            for (let i = 0; i < revNewConnsArr.length; i++) {
                let revRelId = await revRemoteHookMethods.revRelExists_By_RevEntityGUIDs_RevRelValId({
                    "revSubjectGUID": revLoggedInEntityGUID,
                    "revTargetGUID": revTargetEntityGUID,
                    "revRevValId": revRelTypesValIds[revNewConnsArr],
                });

                if (revRelId < 1) {
                    let revNewRelStruct = revRemoteHookMethods.REV_ENTITY_RELATIONSHIP_STRUCT();
                    revNewRelStruct._revOwnerGUID = revLoggedInEntityGUID;
                    revNewRelStruct._revEntitySubjectGUID = revLoggedInEntityGUID;
                    revNewRelStruct._remoteRevEntitySubjectGUID = revLoggedInEntityGUID;
                    revNewRelStruct._revEntityTargetGUID = revTargetEntityGUID;
                    revNewRelStruct._remoteRevEntityTargetGUID = revTargetEntityGUID;
                    revNewRelStruct._revEntityRelationshipType = revNewConnsArr[i];

                    revNewPersRelsArr.push(revNewRelStruct);
                }
            }

            let revNewSavedRelsData = await revRemoteHookMethods.createNewRevEntitiesRelationshipsArrayService(revNewPersRelsArr);

            if (revNewSavedRelsData.filter.length > 0) {
                revRetData["revNewSavedRelsData"] = revNewSavedRelsData.filter;
            }
        }
        /** REV END NEW RELS */

        /** REV START FAM RELS */
        if (revReqBody.revFamRelJSON) {
            let revRelUpdateFamRelsRes = await revRemoteHookMethods.revPluginHookRemoteEnv_RequestFamilyConn(revVarArgs);
        }
        /** REV END FAM RELS */

        /** REV START DELETE RELS */
        if (revReqBody.revDelConnsRelsIdsArr) {
            let revDelConnsRelsIdsArr = revReqBody.revDelConnsRelsIdsArr;

            let revDelPersRelsArr = [];

            for (let i = 0; i < revDelConnsRelsIdsArr.length; i++) {
                let revRelDelRes = await revRemoteHookMethods.revPersDeleteRel_By_revRelId(revDelConnsRelsIdsArr[i]);

                if (revRelDelRes > 0) {
                    revDelPersRelsArr.push(revDelConnsRelsIdsArr[i]);
                }
            }

            if (revDelPersRelsArr.length > 0) {
                revRetData["revDelPersRelsArr"] = revDelPersRelsArr;
            }
        }
        /** REV END DELETE RELS */
    }

    return revRetData;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
