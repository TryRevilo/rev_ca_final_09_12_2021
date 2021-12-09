var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revReqParams = revVarArgs.revReqParams;

        if (!revReqParams.rev_question_guid || revReqParams.rev_question_guid < 1) {
            return revVarArgs;
        }

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;
        let revEntityGUID = Number(revReqParams.rev_question_guid);

        let revReqQuerry = {
            "rev_logged_in_entity_guid": revLoggedInEntityGUID,
            "rev_ann_name_id": 3,
            "rev_limit": 1,
        };

        let revLastAnn = await revRemoteHookMethods.revPersReadAnns_By_AnnId_OwnerEntityGUID(revReqQuerry);
        revLastAnn = revLastAnn[0];

        let revRetVarArgs = {};

        /** REV START QUESTION DEL STATS */
        let revEntityStatsWrapperNameId = "rev_question_delete_count";

        let revPassVarArgs = {
            "revEntityGUID": revEntityGUID,
            "revEntityStatsWrapperNameId": revEntityStatsWrapperNameId,
            "revEntityStatsWrapperDefVal": 0,
        };

        let revEntityMetadataStatsWrapper = await revRemoteHookMethods.revGetEntityStatsWrapper(revPassVarArgs);

        let remoteRevMetadataId = revEntityMetadataStatsWrapper.remoteRevMetadataId;
        let metadataValue = revEntityMetadataStatsWrapper._metadataValue;

        let revMetadataUpdateVal = Number(metadataValue);
        /** REV END QUESTION DEL STATS */

        if (revLastAnn && revLastAnn._revAnnotationRemoteEntityGUID == revEntityGUID) {
            let revAnnDelRes = await revRemoteHookMethods.revPersDeleteAnn_By_AnnId_Multi([revLastAnn._revAnnotationRemoteId]);

            if (revAnnDelRes == 1) {
                revRetVarArgs["revDelQuestion"] = revLastAnn;

                if (revMetadataUpdateVal > 0) {
                    revMetadataUpdateVal = revMetadataUpdateVal - 1;
                }
            }
        } else {
            let revAnn = revRemoteHookMethods.REV_ENTITY_ANNOTATION_STRUCT();
            revAnn._revAnnotationId = 0;
            revAnn._revAnnotationResStatus = -1;
            revAnn._revAnnotationNameId = 3;
            revAnn._revAnnotationValue = "rev_delete_question";
            revAnn._revAnnotationRemoteEntityGUID = revEntityGUID;
            revAnn._revAnnRemoteOwnerEntityGUID = revLoggedInEntityGUID;

            let revAnnData = await revRemoteHookMethods.revPersSaveRevEntityAnnotation([revAnn]);

            revMetadataUpdateVal = revMetadataUpdateVal + 1;

            if (revAnnData && revAnnData.revNewAnnPersRes) {
                revRetVarArgs["revNewAnnPersRes"] = revAnnData.revNewAnnPersRes;
            }
        }

        let revUpdateMetadataVarArgs = {
            "remoteRevMetadataId": remoteRevMetadataId,
            "_metadataValue": revMetadataUpdateVal,
        };

        let revMetadataUpdateData = await revRemoteHookMethods.revPersUpdaterevEntityMetadataValue_By_MetadataId(revUpdateMetadataVarArgs);

        revRetVarArgs["revDelCount"] = revMetadataUpdateVal;

        return revRetVarArgs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
