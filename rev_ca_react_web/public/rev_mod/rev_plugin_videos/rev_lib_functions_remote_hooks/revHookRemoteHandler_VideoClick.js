var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revReqParams = revVarArgs.revReqParams;

        let revEntityPluginVids = await revRemoteHookMethods.revGetPluginEntity_By_Plugin_Name("rev_plugin_videos");

        let revEntityPluginVidsOwnerGUID = Number(revEntityPluginVids._revEntityOwnerGUID);
        let revEntityPluginVidsGUID = Number(revEntityPluginVids._remoteRevEntityGUID);

        let revRetVarArgs = {};

        let revLoggedInEntityGUID = Number(revReqParams.rev_logged_in_entity_guid);
        let revContainerEntityGUID = Number(revReqParams.rev_container_entity_guid);
        let revVidEntityGUID = Number(revReqParams.rev_vid_entity_guid);

        let revDataObjectId = "revVidTrendingData_" + revVidEntityGUID;

        let revVidTrendingAverage = 222;
        let revVidsClicksStatsCount = 222;
        let revVidViews = 333;

        /** REV START VID CLICKS STATS */
        let revEntityStatsWrapperNameId = "rev_vid_trending_average";

        let revPassVarArgs = {
            "revEntityGUID": revVidEntityGUID,
            "revEntityStatsWrapperNameId": revEntityStatsWrapperNameId,
            "revEntityStatsWrapperDefVal": revVidTrendingAverage,
        };

        let revEntityMetadataStatsWrapper = await revRemoteHookMethods.revGetEntityStatsWrapper(revPassVarArgs);

        let remoteRevMetadataId = revEntityMetadataStatsWrapper.remoteRevMetadataId;
        revVidTrendingAverage = Number(revEntityMetadataStatsWrapper._metadataValue) + 1;
        /** REV END VID CLICKS STATS */

        let revSetDataObjectValsVarArgs = {
            "revSessionId": "2727g5gm",
            "revDataObjectId": revDataObjectId,
            "revLoggedInEntityGUID": revLoggedInEntityGUID,
            "revEntityGUID": revVidEntityGUID,
            "revDataObjectUpdateVals": {
                "rev_vid_trending_average": revVidTrendingAverage,
                "rev_clicks": revVidsClicksStatsCount,
                "rev_views": revVidViews,
            },
            "revDataObjectValIdsArr": ["rev_vid_trending_average", "rev_clicks", "rev_views"],
        };

        let revGetCachedPluginsObjectVals = revRemoteHookMethods.revGetCachedPluginsObjectVals(revSetDataObjectValsVarArgs);

        if (revRemoteHookMethods.revIsEmptyVar(revGetCachedPluginsObjectVals)) {
            let revRetSetDataObjects = revRemoteHookMethods.revSetCaheDataObjectVals(revSetDataObjectValsVarArgs);
        } else {
            revVidTrendingAverage = revGetCachedPluginsObjectVals.rev_vid_trending_average;
            revVidsClicksStatsCount = revGetCachedPluginsObjectVals.rev_clicks;
            revVidViews = revGetCachedPluginsObjectVals.rev_views;

            let revUpdateDataObjectValsVarArgs = {
                "revSessionId": "2727g5gm",
                "revDataObjectId": revDataObjectId,
                "revLoggedInEntityGUID": revLoggedInEntityGUID,
                "revEntityGUID": revVidEntityGUID,
                "revDataObjectUpdateVals": {
                    "rev_vid_trending_average": ++revVidTrendingAverage,
                    "rev_clicks": ++revVidsClicksStatsCount,
                    "rev_views": ++revVidViews,
                },
            };

            let revRetUpdateDataObjects = revRemoteHookMethods.revSetCaheDataObjectVals(revUpdateDataObjectValsVarArgs);

            /** REV START UPDATE VID TRENDING AVE */
            let revUpdateMetadataVarArgs = {
                "remoteRevMetadataId": remoteRevMetadataId,
                "_metadataValue": revVidTrendingAverage,
            };

            let revMetadataUpdateData = await revRemoteHookMethods.revPersUpdaterevEntityMetadataValue_By_MetadataId(revUpdateMetadataVarArgs);

            revEntityMetadataStatsWrapper._metadataValue = revVidTrendingAverage;
            /** REV END UPDATE VID TRENDING AVE */
        }

        /** REV START INIT CACHE DATA ARRAYS */
        let revArrayId = "revTrendingVidsGUIDsArr_" + revEntityPluginVidsGUID;

        let revSetDataObjectArrayValsVarArgs = {
            "revSessionId": "2727g5gm",
            "revDataArrayId": revArrayId,
            "revLoggedInEntityGUID": revLoggedInEntityGUID,
            "revEntityGUID": revEntityPluginVidsGUID,
            "revDataObjectUpdateVals": [revVidEntityGUID],
            "revDataObjectVal": revVidEntityGUID,
        };

        let revPluginDataArray = revRemoteHookMethods.revGetPluginDataArray(revSetDataObjectArrayValsVarArgs);

        let revCaheArrayDataValIndices = revRemoteHookMethods.revCaheArrayDataValIndices(revSetDataObjectArrayValsVarArgs);

        if (revCaheArrayDataValIndices.length) {
            for (let i = 0; i < revCaheArrayDataValIndices.length; i++) {
                let revDelDataObjectArrayValVarArgs = {
                    "revSessionId": "2727g5gm",
                    "revDataArrayId": revArrayId,
                    "revLoggedInEntityGUID": revLoggedInEntityGUID,
                };

                revDelDataObjectArrayValVarArgs["revSpliceStartIndex"] = revCaheArrayDataValIndices[i];
                revDelDataObjectArrayValVarArgs["revDeleteCount"] = 1;

                let revSpliceStartIndex = revRemoteHookMethods.revSpliceCaheArrayDataVals(revDelDataObjectArrayValVarArgs);
            }

            let revSplicedPluginDataArray = revRemoteHookMethods.revGetPluginDataArray(revSetDataObjectArrayValsVarArgs).revDataArrayVals;

            let revSpliceIndex = revSplicedPluginDataArray.length;

            for (let i = 0; i < revSplicedPluginDataArray.length; i++) {
                let revPluginDataItem = revSplicedPluginDataArray[i];

                let revCurrDataObjectValsVarArgs = {
                    "revSessionId": "2727g5gm",
                    "revDataObjectId": "revVidTrendingData_" + revPluginDataItem,
                    "revLoggedInEntityGUID": revLoggedInEntityGUID,
                    "revEntityGUID": revPluginDataItem,
                    "revDataObjectValIdsArr": ["rev_vid_trending_average", "rev_clicks", "rev_views"],
                };

                let revCurrCachedPluginsObjectVals = revRemoteHookMethods.revGetCachedPluginsObjectVals(revCurrDataObjectValsVarArgs);

                if (!revCurrCachedPluginsObjectVals || !revCurrCachedPluginsObjectVals.rev_vid_trending_average) {
                    continue;
                }

                let revCurrVidTrendingAverage = revCurrCachedPluginsObjectVals.rev_vid_trending_average;

                if (Number(revCurrVidTrendingAverage) <= Number(revVidTrendingAverage)) {
                    revSpliceIndex = i;

                    break;
                }
            }

            revSetDataObjectArrayValsVarArgs["revSpliceStartIndex"] = revSpliceIndex;
            revSetDataObjectArrayValsVarArgs["revDeleteCount"] = 0;
            revSetDataObjectArrayValsVarArgs["revDataObjectUpdateVal"] = revVidEntityGUID;

            let revSpliceStartIndex = revRemoteHookMethods.revSpliceCaheArrayDataVals(revSetDataObjectArrayValsVarArgs);
        } else {
            let revSetCaheArrayDataVals = revRemoteHookMethods.revSetCaheArrayDataVals(revSetDataObjectArrayValsVarArgs);
        }
        /** REV END INIT CACHE DATA ARRAYS */

        console.log("revCaheArrayDataValIndices : " + JSON.stringify(revRemoteHookMethods.revGetPluginDataArray(revSetDataObjectArrayValsVarArgs)));

        return revRetVarArgs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
