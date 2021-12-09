var revHookRemoteHandlerCallback = async (revVarArgs) => {
    let revEntityMetadataStatsWrapper;

    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;
        let revEntityGUID = revReqParams.rev_question_guid;

        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        /** REV START ENTITY VIEWS STATS */
        let revEntityStatsWrapperNameId = "rev_entity_views_count_stats_wrapper";
        let revEntityStatsWrapperDefVal = "0";

        let revPassVarArgs = {
            "revEntityGUID": revEntityGUID,
            "revEntityStatsWrapperNameId": revEntityStatsWrapperNameId,
            "revEntityStatsWrapperDefVal": revEntityStatsWrapperDefVal,
        };

        revEntityMetadataStatsWrapper = await revRemoteHookMethods.revGetEntityStatsWrapper(revPassVarArgs);

        let remoteRevMetadataId = revEntityMetadataStatsWrapper.remoteRevMetadataId;
        let metadataValue = revEntityMetadataStatsWrapper._metadataValue;

        let revMetadataUpdateVal = Number(metadataValue) + 1;

        let revUpdateMetadataVarArgs = {
            "remoteRevMetadataId": remoteRevMetadataId,
            "_metadataValue": revMetadataUpdateVal,
        };

        let revMetadataUpdateData = await revRemoteHookMethods.revPersUpdaterevEntityMetadataValue_By_MetadataId(revUpdateMetadataVarArgs);

        revEntityMetadataStatsWrapper._metadataValue = revMetadataUpdateVal;
        /** REV END ENTITY VIEWS STATS */

        return Object.assign(revVarArgs, { "revResolutionRequestViewsStats": revEntityMetadataStatsWrapper });
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
