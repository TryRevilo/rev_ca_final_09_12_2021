var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revEntityPluginVids = await revRemoteHookMethods.revGetPluginEntity_By_Plugin_Name("rev_plugin_videos");

        let revEntityPluginVidsOwnerGUID = Number(revEntityPluginVids._revEntityOwnerGUID);
        let revEntityPluginVidsGUID = Number(revEntityPluginVids._remoteRevEntityGUID);

        /** REV START INIT CACHE DATA ARRAYS */
        let revArrayId = "revTrendingVidsGUIDsArr_" + revEntityPluginVidsGUID;

        let revDataObjectArrayVarArgs = {
            "revSessionId": "2727g5gm",
            "revDataArrayId": revArrayId,
            "revPluginDataArrayOwnerGUID": revEntityPluginVidsOwnerGUID,
            "revLoggedInEntityGUID": revEntityPluginVidsOwnerGUID,
            "revEntityGUID": revEntityPluginVidsGUID,
            "revIsWritable": true,
        };

        let revVidsAlbumsGUIDsArr = revRemoteHookMethods.revGetPluginDataArray(revDataObjectArrayVarArgs).revDataArrayVals;

        let revVidsAlbumEntitiesArray = [];

        for (let i = 0; i < revVidsAlbumsGUIDsArr.length; i++) {
            let revCurrVidAlbumGUID = revVidsAlbumsGUIDsArr[i];

            let revTargetVidsAlbumContainerGUID = await revRemoteHookMethods.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId(revCurrVidAlbumGUID, 9);

            let revEntity = await revRemoteHookMethods.revGetFlatEntity(revCurrVidAlbumGUID);

            revEntity["_revContainerEntity"] = await revRemoteHookMethods.revGetFlatEntity(revTargetVidsAlbumContainerGUID);

            revVidsAlbumEntitiesArray.push(revEntity);
        }

        let revPublishersGUIDsArr = [];

        for (let i = 0; i < revVidsAlbumEntitiesArray.length; i++) {
            if (!revPublishersGUIDsArr.includes(revVidsAlbumEntitiesArray[i]._revEntityOwnerGUID)) {
                revPublishersGUIDsArr.push(revVidsAlbumEntitiesArray[i]._revEntityOwnerGUID);
            }
        }

        let revPublishersEntitiesArr = await revRemoteHookMethods.revGetFilledEntities(revPublishersGUIDsArr);

        let revRetVarArgs = {
            "revVidsAlbumEntitiesArray": revVidsAlbumEntitiesArray,
            "revPublishersArr": revPublishersEntitiesArr,
        };

        return revRetVarArgs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
