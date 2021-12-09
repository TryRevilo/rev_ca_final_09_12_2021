var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revReqBody = revVarArgs.revReqBody;

        let revFamRelJSON = revReqBody.revFamRelJSON;

        if (revRemoteHookMethods.revIsEmptyVar(revFamRelJSON.revFamilyRelTypeKey)) {
            return;
        }

        let revLoggedInEntityGUID = revReqBody.revLoggedInEntityGUID;
        let revFamilyRelativeEntityGUID = revReqBody.revTargetEntityGUID;

        let revPersRelationshipType = revFamRelJSON.revFamilyRelTypeKey;
        let revFamilyRelTypeTxt = revFamRelJSON.revFamilyRelTypeTxt;

        /** REV START FAM CONN EXISTS */
        let revRelsArr = await revRemoteHookMethods.revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds([revLoggedInEntityGUID, revFamilyRelativeEntityGUID], [16, 27]);

        let revNewSavedFamilyConnRelsData;

        let revRetVarArgs = {};

        if (revRelsArr.length < 1) {
            let revNewRelStruct = revRemoteHookMethods.REV_ENTITY_RELATIONSHIP_STRUCT();
            revNewRelStruct._revOwnerGUID = revLoggedInEntityGUID;
            revNewRelStruct._revEntitySubjectGUID = revLoggedInEntityGUID;
            revNewRelStruct._remoteRevEntitySubjectGUID = revLoggedInEntityGUID;
            revNewRelStruct._revEntityTargetGUID = revFamilyRelativeEntityGUID;
            revNewRelStruct._remoteRevEntityTargetGUID = revFamilyRelativeEntityGUID;
            revNewRelStruct._revEntityRelationshipType = revPersRelationshipType;

            let revNewSavedFamilyConnRelsData = await revRemoteHookMethods.createNewRevEntitiesRelationshipsArrayService([revNewRelStruct]);

            if (revNewSavedFamilyConnRelsData.filter.length > 0) {
                revNewSavedFamilyConnRelsData = revNewSavedFamilyConnRelsData.filter;
            }
        } else {
            revNewSavedFamilyConnRelsData = revRelsArr[0];
        }

        revRetVarArgs["revNewSavedFamilyConnRelsData"] = revNewSavedFamilyConnRelsData;
        /** REV END FAM CONN EXISTS */

        return revRetVarArgs;
    }

    return null;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
