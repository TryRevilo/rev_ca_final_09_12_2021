var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs.filter) {
        let revDataArr = revVarArgs.filter;

        let revOwnerGUIDsArr = [];

        if (!revVarArgs.hasOwnProperty("revPublisherEntitiesArr")) {
            revVarArgs["revPublisherEntitiesArr"] = {};
        }

        for (let i = 0; i < revDataArr.length; i++) {
            let revCurrData = revDataArr[i];

            if (!revCurrData.hasOwnProperty("revVarArgsData")) {
                revCurrData["revVarArgsData"] = {};
            }

            if (!revOwnerGUIDsArr.includes(revCurrData._revEntityOwnerGUID)) {
                revOwnerGUIDsArr.push(revCurrData._revEntityOwnerGUID);
            }

            let revTotCommentsCount = await revVarArgs.revRemoteHookMethods.revCountRevEntities_By_ContainerGuid_SubType({
                "revContainerGUID": revCurrData._remoteRevEntityGUID,
                "revEntitySubType": "rev_comment",
                "revStartColumnId": revCurrData._remoteRevEntityGUID,
            });

            revCurrData.revVarArgsData["revTotCommentsCount"] = revTotCommentsCount;

            /** REV START ANN LIKES COUNT */
            revCurrData.revVarArgsData["revEntityTotLikes"] = await revVarArgs.revRemoteHookMethods.revCountRevEntyAnn_By_Entity_GUID_Ann_Val({
                "revAnnotationRemoteEntityGUID": revCurrData._remoteRevEntityGUID,
                "revAnnotationValue": 1,
                "revAnnotationNameId": 0,
            });
            /** REV END ANN LIKES COUNT */

            /** REV START ANN UN LIKES COUNT */
            revCurrData.revVarArgsData["revEntityTotUnLikes"] = await revVarArgs.revRemoteHookMethods.revCountRevEntyAnn_By_Entity_GUID_Ann_Val({
                "revAnnotationRemoteEntityGUID": revCurrData._remoteRevEntityGUID,
                "revAnnotationValue": -1,
                "revAnnotationNameId": 0,
            });
            /** REV END ANN UN LIKES COUNT */

            /** REV START PICS ALBUM */
            // let revPicsAlbumCountVarArgs = {
            //     'rev_entity_target_guid': revCurrData._remoteRevEntityGUID,
            //     'rev_rel_type_val_id_arr': '3',
            //     'rev_res_status': -1,
            // };

            // let revPicsAlbumCount = await revVarArgs.revRemoteHookMethods.revCountRels_By_TargetGUID_RelValId(revPicsAlbumCountVarArgs);

            // if (revPicsAlbumCount > 0) {
            //     let revEntityPicsAlbum = await revVarArgs.revRemoteHookMethods.revPersReadRevRelsIdSubjectsContainer_By_TargetGUID_RelID(revPicsAlbumCountVarArgs);

            //     console.log(JSON.stringify(revCurrComment));

            //     revCurrData._revEntityChildrenList.push(revEntityPicsAlbum);
            // }
            /** REV END PICS ALBUM */

            revVarArgs.filter[i] = revCurrData;
        }

        revVarArgs["revPublisherEntitiesArr"] = await revVarArgs.revRemoteHookMethods.revGetFilledEntities(revOwnerGUIDsArr);
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
