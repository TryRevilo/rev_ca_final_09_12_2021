var revHookRemoteHandlerCallback = async (revVarArgs) => {
    let revEntityStatsWrapper = {};

    if (revVarArgs && revVarArgs.revRemoteHookMethods && revVarArgs._remoteRevEntityGUID) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revEntityGUID = revVarArgs._remoteRevEntityGUID;

        /** REV START ENTITY TOT QUESTIONS ASKED STATS */
        let revEntityStatsWrapper_NameId_TotQuestionsAskedCount = "rev_entity_tot_question_asked_count_stats_wrapper";
        let revEntityStatsWrapperDefVal_TotQuestionsAsked = await revRemoteHookMethods.revCountRevEntities_By_OwnerGuid_SubType({ "revEntityGUID": revEntityGUID, "revEntitySubType": "rev_question" });

        let revPassVarArgs = {
            "revEntityGUID": revEntityGUID,
            "revEntityStatsWrapperNameId": revEntityStatsWrapper_NameId_TotQuestionsAskedCount,
            "revEntityStatsWrapperDefVal": revEntityStatsWrapperDefVal_TotQuestionsAsked,
        };

        let revEntityTotQuestionsCountWrapper = await revRemoteHookMethods.revGetEntityStatsWrapper(revPassVarArgs);
        revEntityStatsWrapper[revEntityStatsWrapper_NameId_TotQuestionsAskedCount] = revEntityTotQuestionsCountWrapper._metadataValue;
        /** REV START ENTITY TOT QUESTIONS ASKED STATS */

        /** REV START ENTITY ANSWERS STATS */
        let revEntityStatsWrapper_NameId_TotAnswersCount = "rev_entity_tot_answers_published_count_stats_wrapper";
        let revEntityStatsWrapperDefVal_TotAnswersCount = await revRemoteHookMethods.revCountRevEntities_By_OwnerGuid_SubType({ "revEntityGUID": revEntityGUID, "revEntitySubType": "rev_question_answer" });

        let revEntityStatsAnswersCountWrapperPassVarArgs = {
            "revEntityGUID": revEntityGUID,
            "revEntityStatsWrapperNameId": revEntityStatsWrapper_NameId_TotAnswersCount,
            "revEntityStatsWrapperDefVal": revEntityStatsWrapperDefVal_TotAnswersCount,
        };

        let revEntityStats_TotAnswersCount_Wrapper = await revRemoteHookMethods.revGetEntityStatsWrapper(revEntityStatsAnswersCountWrapperPassVarArgs);
        revEntityStatsWrapper[revEntityStatsWrapper_NameId_TotAnswersCount] = revEntityStats_TotAnswersCount_Wrapper._metadataValue;
        /** REV START ENTITY ANSWERS STATS */
    }

    return revEntityStatsWrapper;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
