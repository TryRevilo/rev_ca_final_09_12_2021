var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;

        let revEntityContainerGUID = revReqParams.rev_question_guid;
        let revLastCheckDate;

        if (revVarArgs.revLastCheckDate) {
            revLastCheckDate = revReqParams.revLastCheckDate;
        }

        let revGetTotLikesCount = async (revEntityGUID, revAnnVal) => {
            let revCurrTotLikesCount = await revRemoteHookMethods.revCountRevEntyAnn_By_Entity_GUID_Ann_Val({
                "revAnnotationRemoteEntityGUID": revEntityGUID,
                "revAnnotationValue": revAnnVal,
                "revAnnotationNameId": 0,
            });

            return revCurrTotLikesCount;
        };

        /** REV START LOAD COMMENTS */
        let revLoadComments = async (revEntityContainerGUID) => {
            let revCommentsArr = [];

            let revPassVarArgs = {
                "revCollectionLimit": 10,
                "revEntityContainerGUID": revEntityContainerGUID,
                "revEntitySubtype": "rev_comment",
                "revLastCheckDate": null,
            };

            let revEntityCommentsArr = await revRemoteHookMethods.revPersReadFilledRevEntities_OF_ContainerGUID_SubType(revPassVarArgs);

            if (revEntityCommentsArr && revEntityCommentsArr.length > 0) {
                for (let i = 0; i < revEntityCommentsArr.length; i++) {
                    let revCurrComment = revEntityCommentsArr[i];

                    if (!revCurrComment) continue;

                    let revCurrCommentGUID = revCurrComment._remoteRevEntityGUID;

                    if (revCurrCommentGUID < 1) continue;

                    if (!revCurrComment.hasOwnProperty("revVarArgsData")) {
                        revCurrComment["revVarArgsData"] = {};
                    }

                    revCurrComment.revVarArgsData["revTotCommentsCount"] = await revRemoteHookMethods.revCountRevEntities_By_ContainerGuid_SubType({
                        "revContainerGUID": revCurrCommentGUID,
                        "revEntitySubType": "rev_comment",
                        "revStartColumnId": revCurrCommentGUID,
                    });

                    /** REV START ANN LIKES COUNT */
                    revCurrComment.revVarArgsData["revEntityTotLikes"] = await revGetTotLikesCount(revCurrCommentGUID, 1);
                    /** REV END ANN LIKES COUNT */

                    /** REV START ANN UN LIKES COUNT */
                    revCurrComment.revVarArgsData["revEntityTotUnLikes"] = await revGetTotLikesCount(revCurrCommentGUID, -1);
                    /** REV END ANN UN LIKES COUNT */

                    /** REV START COMMENT PICS ALBUM */
                    let revCommentPicsAlbumCountVarArgs = {
                        "rev_entity_target_guid": revCurrCommentGUID,
                        "rev_rel_type_val_id_arr": "3",
                        "rev_res_status": -1,
                    };

                    let revCommentPicsAlbumCount = await revRemoteHookMethods.revCountRels_By_TargetGUID_RelValId(revCommentPicsAlbumCountVarArgs);

                    if (revCommentPicsAlbumCount > 0) {
                        let revCommentTimelinePicsAlbum = await revRemoteHookMethods.revFillEntityPicsAlbum(revCurrCommentGUID);

                        if (revCommentTimelinePicsAlbum) {
                            revCurrComment._revEntityChildrenList.push(revCommentTimelinePicsAlbum);
                        }
                    }
                    /** REV END COMMENT PICS ALBUM */

                    revCommentsArr.push(revCurrComment);
                }
            }

            return revCommentsArr;
        };
        /** REV END LOAD COMMENTS */

        let revPassVarArgs = {
            "revCollectionLimit": 10,
            "revEntityContainerGUID": revEntityContainerGUID,
            "revEntitySubtype": "rev_question_answer",
            "revLastCheckDate": revLastCheckDate,
        };

        if (revLoggedInEntityGUID > 0) {
            let revEntitySubTypesArr = await revRemoteHookMethods.revPersReadFilledRevEntities_OF_ContainerGUID_SubType(revPassVarArgs);

            let revPublishedEntitiesArr = [];
            revPublishedEntitiesArr = revPublishedEntitiesArr.concat(revEntitySubTypesArr);

            for (let i = 0; i < revEntitySubTypesArr.length; i++) {
                let revEntityCommentsArr = await revLoadComments(revEntitySubTypesArr[i]._remoteRevEntityGUID);

                revPublishedEntitiesArr = revPublishedEntitiesArr.concat(revEntityCommentsArr);

                revEntitySubTypesArr[i]._revEntityChildrenList = revEntitySubTypesArr[i]._revEntityChildrenList.concat(revEntityCommentsArr);
            }

            let revPublishersGUIDsArr = [];

            for (let i = 0; i < revPublishedEntitiesArr.length; i++) {
                let revCurrGUID = revPublishedEntitiesArr[i]._revEntityOwnerGUID;

                if (revCurrGUID && revCurrGUID > 0 && !revRemoteHookMethods.revEntitiesArrIncludesEntityGUID(revPublishersGUIDsArr, revCurrGUID)) {
                    revPublishersGUIDsArr.push(revCurrGUID);
                }
            }

            let revEntityPublishersArr = await revRemoteHookMethods.revPluginHookRemoteEnvironment_GetUserEntitiesArr({ "revRemoteHookMethods": revRemoteHookMethods, "revUserEntitiesGUIDsArr": revPublishersGUIDsArr });

            return Object.assign(revVarArgs, { "revQuestionAnswersArr": revEntitySubTypesArr, "revEntityPublishersArr": revEntityPublishersArr });
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
