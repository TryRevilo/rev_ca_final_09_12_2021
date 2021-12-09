var revHookRemoteHandlerCallback = async (revVarArgs) => {
    revVarArgs["revAdsArr"] = [];

    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revEntityGUID = revVarArgs.revReqParams.rev_entity_guid;

        revVarArgs.revAdsArr = revRemoteHookMethods.revGetAdsBatch();

        let revGetTotLikesCount = async (revEntityGUID, revAnnVal) => {
            let revCurrTotLikesCount = await revRemoteHookMethods.revCountRevEntyAnn_By_Entity_GUID_Ann_Val({
                "revAnnotationRemoteEntityGUID": revEntityGUID,
                "revAnnotationValue": revAnnVal,
                "revAnnotationNameId": 0,
            });

            return revCurrTotLikesCount;
        };

        revVarArgs["revTimelineEntities"] = [];

        let revTimelineEntitiesArr;

        if (!revEntityGUID || revEntityGUID < 1) {
            revTimelineEntitiesArr = await revRemoteHookMethods.revPersReadRevEntityFiller_Exempt_Subtypes([
                "rev_timeline",
                "rev_noticias",
                "rev_file",
                "rev_entity_info",
                "rev_entity_social_info",
                "rev_comment",
                "rev_entity_language",
                "rev_mint_conversation",
                "rev_ad",
                "rev_pics_album",
                "rev_academic_space",
                "rev_store",
                "rev_mint_message",
                "rev_video",
                "rev_sentiment",
                "rev_question_answer",
                "rev_plugin",
                "rev_resolution_answer",
                "rev_store_sale_resolution",
                "rev_family_kiwi",
                /** */
            ]);
        } else {
            revTimelineEntitiesArr = await revRemoteHookMethods.revPersReadEntityFiller_BY_ContainerGUID_Exempt_Subtypes_Serv(revEntityGUID, [
                "rev_timeline",
                "rev_noticias",
                "rev_file",
                "rev_entity_info",
                "rev_entity_social_info",
                "rev_comment",
                "rev_entity_language",
                "rev_mint_conversation",
                "rev_ad",
                "rev_pics_album",
                "rev_academic_space",
                "rev_store",
                "rev_mint_message",
                "rev_video",
                "rev_ad",
                "rev_sentiment",
                "rev_question_answer",
                "rev_plugin",
                "rev_resolution_answer",
                "rev_store_sale_resolution",
                "rev_family_kiwi",
                /** */
            ]);
        }

        let revPublishersGUIDsArr = [];

        let revAddedTransArr = [];

        for (let i = 0; i < revTimelineEntitiesArr.length; i++) {
            let revTimelineEntity = revTimelineEntitiesArr[i];

            if (!revTimelineEntity || !revTimelineEntity._revEntityOwnerGUID || revTimelineEntity._revEntityOwnerGUID < 1) {
                {
                    continue;
                }
            }

            revPublishersGUIDsArr.push(revTimelineEntity._revEntityOwnerGUID);
        }

        /** REV START SENTIMENTS */
        if (revEntityGUID && revEntityGUID > 0 && revTimelineEntitiesArr.length > 0) {
            let revSentimentsPassVarArgs = {
                "revCollectionLimit": 10,
                "revEntityContainerGUID": revEntityGUID,
                "revEntitySubtype": "rev_sentiment",
                "revLastCheckDate": null,
            };

            let revSentimentsArr = await revRemoteHookMethods.revPersReadFilledRevEntities_OF_ContainerGUID_SubType(revSentimentsPassVarArgs);

            revVarArgs["revSentimentsArr"] = revSentimentsArr;

            for (let i = 0; i < revSentimentsArr.length; i++) {
                let revSentimentEntity = revSentimentsArr[i];

                if (!revSentimentEntity || !revSentimentEntity._revEntityOwnerGUID || revSentimentEntity._revEntityOwnerGUID < 1) {
                    {
                        continue;
                    }
                }

                revPublishersGUIDsArr.push(revSentimentEntity._revEntityOwnerGUID);
            }
        }
        /** REV END SENTIMENTS */

        /** REV START PUBLISHERS */
        let revGetPublishersArr = await revRemoteHookMethods.revGetFilledEntities(revPublishersGUIDsArr);

        if (!revVarArgs.hasOwnProperty("revEntityPublishersArr")) {
            revVarArgs["revEntityPublishersArr"] = revGetPublishersArr;
        } else {
            revVarArgs.revEntityPublishersArr = revVarArgs.revEntityPublishersArr.concat(revGetPublishersArr);
        }
        /** REV END PUBLISHERS */

        for (let i = 0; i < revTimelineEntitiesArr.length; i++) {
            let revTimelineEntity = revTimelineEntitiesArr[i];

            if (revTimelineEntity._revEntitySubType.localeCompare("rev_lang_phrase") == 0) {
                if (!revAddedTransArr.includes(revTimelineEntity._revEntityOwnerGUID)) {
                    revAddedTransArr.push(revTimelineEntity._revEntityOwnerGUID);

                    let revUserTranlationsArr = await revRemoteHookMethods.revGetPluginViewLangs_By_OwnerGUID({ "revOwnerGUID": revTimelineEntity._revEntityOwnerGUID });

                    revVarArgs.revTimelineEntities.push(
                        {
                            "_revEntitySubType": "rev_lang_phrase",
                            "revEntityTranslations": revUserTranlationsArr,
                            "_revEntityOwnerGUID": revTimelineEntity._revEntityOwnerGUID,
                        }
                        /** */
                    );
                } else {
                    continue;
                }
            }

            let revTimelineEntityGUID = revTimelineEntity._remoteRevEntityGUID;

            /** REV START PICS ALBUM */
            let revPicsAlbumCountVarArgs = {
                "rev_entity_target_guid": revTimelineEntityGUID,
                "rev_rel_type_val_id_arr": "3",
                "rev_res_status": -1,
            };

            let revPicsAlbumCount = await revRemoteHookMethods.revCountRels_By_TargetGUID_RelValId(revPicsAlbumCountVarArgs);

            if (revPicsAlbumCount > 0) {
                let revTimelinePicsAlbum = await revRemoteHookMethods.revFillEntityPicsAlbum(revTimelineEntityGUID);

                if (revTimelinePicsAlbum) {
                    revTimelineEntity._revEntityChildrenList.push(revTimelinePicsAlbum);
                }
            }
            /** REV END PICS ALBUM */

            /** REV START VIDS ALBUM */
            let revVidsAlbumCountVarArgs = {
                "rev_entity_target_guid": revTimelineEntityGUID,
                "rev_rel_type_val_id_arr": "9",
                "rev_res_status": -1,
            };

            let revVidsAlbumCount = await revRemoteHookMethods.revCountRels_By_TargetGUID_RelValId(revVidsAlbumCountVarArgs);

            if (revVidsAlbumCount > 0) {
                let revTimelineVidsAlbum = await revRemoteHookMethods.revFillEntityVidsAlbum(revTimelineEntityGUID);

                if (revTimelineVidsAlbum) {
                    revTimelineEntity._revEntityChildrenList.push(revTimelineVidsAlbum);
                }
            }
            /** REV END VIDS ALBUM */

            if (!revTimelineEntity.hasOwnProperty("revVarArgsData")) {
                revTimelineEntity["revVarArgsData"] = {};
            }

            /** REV START COUNT FLAGS */
            revTimelineEntity.revVarArgsData["revTotFlagsCount"] = await revRemoteHookMethods.revCountRevEntities_By_ContainerGuid_SubType({
                "revContainerGUID": revTimelineEntity._remoteRevEntityGUID,
                "revEntitySubType": "rev_flag_object",
                "revStartColumnId": revTimelineEntity._remoteRevEntityGUID,
            });

            if (revTimelineEntity.revVarArgsData.revTotFlagsCount > 0) {
                let revFlagsPassVarArgs = {
                    "revCollectionLimit": 10,
                    "revEntityContainerGUID": revTimelineEntity._remoteRevEntityGUID,
                    "revEntitySubtype": "rev_flag_object",
                    "revLastCheckDate": null,
                };

                revTimelineEntity.revVarArgsData["revFlagsArr"] = await revRemoteHookMethods.revPersReadFilledRevEntities_OF_ContainerGUID_SubType(revFlagsPassVarArgs);
            }
            /** REV END COUNT FLAGS */

            /** REV START COUNT COMMENTS */
            revTimelineEntity.revVarArgsData["revTotCommentsCount"] = await revRemoteHookMethods.revCountRevEntities_By_ContainerGuid_SubType({
                "revContainerGUID": revTimelineEntity._remoteRevEntityGUID,
                "revEntitySubType": "rev_comment",
                "revStartColumnId": revTimelineEntity._remoteRevEntityGUID,
            });
            /** REV END COUNT COMMENTS */

            /** REV START LOAD COMMENTS */
            let revEntityCommentsArr = await revRemoteHookMethods.revPersReadFlatEntities_OF_ContainerGUID_SubTypesArr(revTimelineEntityGUID, ["rev_comment"]);

            for (let c = 0; c < revEntityCommentsArr.length; c++) {
                let revCurrComment = revEntityCommentsArr[c];

                if (!revCurrComment) {
                    continue;
                }

                let revCurrCommentGUID = revCurrComment._remoteRevEntityGUID;

                if (revCurrCommentGUID < 1) {
                    continue;
                }

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

                revTimelineEntity._revEntityChildrenList.push(revCurrComment);
            }
            /** REV END LOAD COMMENTS */

            /** REV START ANN LIKES COUNT */
            revTimelineEntity.revVarArgsData["revEntityTotLikes"] = await revRemoteHookMethods.revCountRevEntyAnn_By_Entity_GUID_Ann_Val({
                "revAnnotationRemoteEntityGUID": revTimelineEntity._remoteRevEntityGUID,
                "revAnnotationValue": 1,
                "revAnnotationNameId": 0,
            });
            /** REV END ANN LIKES COUNT */

            /** REV START ANN UN LIKES COUNT */
            revTimelineEntity.revVarArgsData["revEntityTotUnLikes"] = await revRemoteHookMethods.revCountRevEntyAnn_By_Entity_GUID_Ann_Val({
                "revAnnotationRemoteEntityGUID": revTimelineEntity._remoteRevEntityGUID,
                "revAnnotationValue": -1,
                "revAnnotationNameId": 0,
            });
            /** REV END ANN UN LIKES COUNT */

            revVarArgs.revTimelineEntities.push(revTimelineEntity);
        }

        /** REV START LOAD ENTITY PLUGINS */
        let revEntityPlugins = await revRemoteHookMethods.revGetEntityPlugins(revEntityGUID);
        revVarArgs["revEntityPlugins"] = revEntityPlugins;
        /** REV END LOAD ENTITY PLUGINS */
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
