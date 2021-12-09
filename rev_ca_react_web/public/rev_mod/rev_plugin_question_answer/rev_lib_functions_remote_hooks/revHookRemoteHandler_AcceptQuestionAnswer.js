var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revReqParams = revVarArgs.revReqParams;

        if (!revReqParams.rev_question_guid || revReqParams.rev_question_guid < 1 || !revReqParams.rev_answer_guid || revReqParams.rev_answer_guid < 1) {
            return revVarArgs;
        }

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;
        let revEntityGUID = Number(revReqParams.rev_question_guid);
        let revAnswerEntityGUID = Number(revReqParams.rev_answer_guid);

        if (revAnswerEntityGUID < 1) {
            return revVarArgs;
        }

        /** REV START ENTITY VIEWS STATS */
        let revEntityStatsWrapperNameId = "rev_question_answer_guid";

        let revPassVarArgs = {
            "revEntityGUID": revEntityGUID,
            "revEntityStatsWrapperNameId": revEntityStatsWrapperNameId,
            "revEntityStatsWrapperDefVal": revAnswerEntityGUID,
        };

        let revEntityMetadataStatsWrapper = await revRemoteHookMethods.revGetEntityStatsWrapper(revPassVarArgs);

        let remoteRevMetadataId = revEntityMetadataStatsWrapper.remoteRevMetadataId;
        let metadataValue = revEntityMetadataStatsWrapper._metadataValue;

        let revMetadataUpdateVal = Number(metadataValue);

        let revUpdateMetadataVarArgs = {
            "remoteRevMetadataId": remoteRevMetadataId,
            "_metadataValue": 0,
        };

        if (revMetadataUpdateVal !== revAnswerEntityGUID) {
            revUpdateMetadataVarArgs._metadataValue = revAnswerEntityGUID;
        }

        let revMetadataUpdateData = await revRemoteHookMethods.revPersUpdaterevEntityMetadataValue_By_MetadataId(revUpdateMetadataVarArgs);
        /** REV END ENTITY VIEWS STATS */

        return Object.assign(revVarArgs, { "revQuestionViewsStats": revUpdateMetadataVarArgs });
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
