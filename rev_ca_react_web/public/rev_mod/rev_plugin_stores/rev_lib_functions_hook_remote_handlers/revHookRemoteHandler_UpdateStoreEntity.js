var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqBody = revVarArgs.revReqBody;

        if (!revReqBody || !revReqBody.revPersEntityUpdateData || !revReqBody.revPersEntityUpdateData.revEntityGUID) {
            return revVarArgs;
        }

        let revEntityGUID = revReqBody.revPersEntityUpdateData.revEntityGUID;
        let revPersEntityUpdateData = revReqBody.revPersEntityUpdateData;

        if (!revRemoteHookMethods.revIsEmptyJSONObject(revPersEntityUpdateData)) {
            let revRetVarArgs = {};

            /** REV START UPDATE ENTITY METADATA */
            let revUpdateMetadataData = {};

            if (revPersEntityUpdateData.revEntityUpdateMetaDataArr && revPersEntityUpdateData.revEntityUpdateMetaDataArr.length > 0) {
                revUpdateMetadataData["revEntityUpdateMetaDataArr"] = revPersEntityUpdateData.revEntityUpdateMetaDataArr;
            }

            revUpdateMetadataData["revAffecetedRows"] = await revRemoteHookMethods.revUpdateRevEntityData_Serv([revUpdateMetadataData]);
            /** REV START UPDATE ENTITY METADATA */

            /** REV START NEW MEMBERS REL */
            if (revPersEntityUpdateData.revNewRelsArr) {
                let revNewRelsArr = revPersEntityUpdateData.revNewRelsArr;

                let revNewRelsRetData = await revRemoteHookMethods.createNewRevEntitiesRelationshipsArrayService(revNewRelsArr);
                revRetVarArgs["revNewRelsRetDataArr"] = revNewRelsRetData.filter;
            }
            /** REV START NEW MEMBERS REL */

            /** REV START DEL ADMIN MEMBERS REL */
            if (revPersEntityUpdateData.revDelRelGUIDsArr) {
                let revDelRelGUIDsArr = revPersEntityUpdateData.revDelRelGUIDsArr;

                let revDelRelIdsArr = [];

                for (let i = 0; i < revDelRelGUIDsArr.length; i++) {
                    let revAdminMemberGUID = revDelRelGUIDsArr[i];

                    if (revAdminMemberGUID < 1) {
                        continue;
                    }

                    let revRelId = await revRemoteHookMethods.revRelExists_By_RevEntityGUIDs_RevRelValId({
                        "revSubjectGUID": revAdminMemberGUID,
                        "revTargetGUID": revEntityGUID,
                        "revRevValId": 11,
                    });

                    if (revRelId > 0) {
                        revDelRelIdsArr.push(revRelId);
                    }
                }

                console.log("revDelRelIdsArr : " + JSON.stringify(revDelRelIdsArr));

                let revDelRelsRetData = await revRemoteHookMethods.revPersDeleteRel_By_revRelIdaArr(revDelRelIdsArr);

                console.log("revDelRelsRetData : " + JSON.stringify(revDelRelsRetData));
            }
            /** REV END DEL ADMIN MEMBERS REL */

            return revRetVarArgs;
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
