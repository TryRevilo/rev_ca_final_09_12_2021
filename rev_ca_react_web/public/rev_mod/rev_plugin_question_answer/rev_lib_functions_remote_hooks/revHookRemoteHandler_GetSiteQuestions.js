var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;

        let revLastCheckDate;

        if (revVarArgs.revLastCheckDate) {
            revLastCheckDate = revReqParams.revLastCheckDate;
        }

        if (revLoggedInEntityGUID > 0) {
            let revEntitySubTypesArr = await revRemoteHookMethods.revPersReadRevEntities_By_Subtype("rev_question");

            let revPublishersGUIDsArr = [];

            for (let i = 0; i < revEntitySubTypesArr.length; i++) {
                let revCurrEntitySubtype = revEntitySubTypesArr[i];
                let revCurrGUID = revCurrEntitySubtype._revEntityOwnerGUID;

                if (revCurrGUID && revCurrGUID > 0 && !revRemoteHookMethods.revEntitiesArrIncludesEntityGUID(revPublishersGUIDsArr, revCurrGUID)) {
                    revPublishersGUIDsArr.push(revCurrGUID);
                }

                let revQuestionEntityStatsPassVarArgs = revRemoteHookMethods.revCloneJsObject(revCurrEntitySubtype);
                revQuestionEntityStatsPassVarArgs["revQuestion"] = revCurrEntitySubtype;
                revQuestionEntityStatsPassVarArgs["revRemoteHookMethods"] = revRemoteHookMethods;

                let revEntityQuestionStatData = await revRemoteHookMethods.revPluginHookRemoteEnvironment_QuestionStats(revQuestionEntityStatsPassVarArgs);

                if (revEntityQuestionStatData) {
                    /** REV START QUESTION VIEWS COUNT STATS */
                    if (revEntityQuestionStatData.rev_entity_views_count_stats_wrapper) {
                        revEntitySubTypesArr[i]._revEntityMetadataList.push(revEntityQuestionStatData.rev_entity_views_count_stats_wrapper);
                    }
                    /** REV END QUESTION VIEWS COUNT STATS */

                    /** REV START QUESTION ANSWERS COUNT STATS */
                    if (revEntityQuestionStatData.rev_entity_answers_count_stats_wrapper) {
                        revEntitySubTypesArr[i]._revEntityMetadataList.push(revEntityQuestionStatData.rev_entity_answers_count_stats_wrapper);
                    }
                    /** REV END QUESTION ANSWERS COUNT STATS */
                }
            }

            let revQuestionPublishersArr = await revRemoteHookMethods.revPluginHookRemoteEnvironment_GetUserEntitiesArr({ "revRemoteHookMethods": revRemoteHookMethods, "revUserEntitiesGUIDsArr": revPublishersGUIDsArr });

            return Object.assign(revVarArgs, { "filter": revEntitySubTypesArr, "revPublishers": revQuestionPublishersArr });
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
