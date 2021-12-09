var revHookRemoteHandlerCallback = async (revVarArgs) => {
    let revEntityStatsWrapper = {};

    if (revVarArgs && revVarArgs.revQuestion && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revQuestion = revVarArgs.revQuestion;
        let revEntityGUID = revQuestion._remoteRevEntityGUID;

        /** REV START ENTITY VIEWS STATS */
        let revEntityViewsStatsWrapperNameId = "rev_entity_views_count_stats_wrapper";
        let revEntityStatsWrapperDefVal = "0";

        let revPassVarArgs = {
            "revEntityGUID": revEntityGUID,
            "revEntityStatsWrapperNameId": revEntityViewsStatsWrapperNameId,
            "revEntityStatsWrapperDefVal": revEntityStatsWrapperDefVal,
        };

        let revQuestionEntityViewsCountWrapper = await revRemoteHookMethods.revGetEntityStatsWrapper(revPassVarArgs);
        revEntityStatsWrapper[revEntityViewsStatsWrapperNameId] = revQuestionEntityViewsCountWrapper;
        /** REV START ENTITY VIEWS STATS */

        /** REV START ENTITY ANSWERS STATS */
        let revEntityStatsAnswersCountWrapperNameId = "rev_entity_answers_count_stats_wrapper";
        let revEntityStatsAnswersCountWrapperDefVal = await revRemoteHookMethods.revCountRevEntities_By_ContainerGuid_SubType({ "revContainerGUID": revEntityGUID, "revEntitySubType": "rev_question_answer" });

        let revEntityStatsAnswersCountWrapperPassVarArgs = {
            "revEntityGUID": revEntityGUID,
            "revEntityStatsWrapperNameId": revEntityStatsAnswersCountWrapperNameId,
            "revEntityStatsWrapperDefVal": revEntityStatsAnswersCountWrapperDefVal,
        };

        let revEntityStatsAnswersCountWrapper = await revRemoteHookMethods.revGetEntityStatsWrapper(revEntityStatsAnswersCountWrapperPassVarArgs);
        revEntityStatsWrapper[revEntityStatsAnswersCountWrapperNameId] = revEntityStatsAnswersCountWrapper;
        /** REV START ENTITY ANSWERS STATS */
    }

    return revEntityStatsWrapper;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
