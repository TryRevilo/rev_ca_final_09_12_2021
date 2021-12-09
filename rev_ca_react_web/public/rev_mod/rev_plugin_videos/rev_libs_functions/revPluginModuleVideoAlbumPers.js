(function (revPluginModuleVideoAlbumPers, $, undefined) {
    revPluginModuleVideoAlbumPers.createVideoAlbum = async (revContainerEntityGUID, revSelectedVidFiles, callback) => {
        if (revSelectedVidFiles.length > 0) {
            let revVidAlbumObject = window.REV_ENTITY_STRUCT();
            revVidAlbumObject._revEntityResolveStatus = 0;
            revVidAlbumObject._revEntityChildableStatus = 301;
            revVidAlbumObject._revEntityType = "rev_object";
            revVidAlbumObject._revEntitySubType = "rev_vids_album";
            revVidAlbumObject._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
            revVidAlbumObject.revEntityContainerGUID = revContainerEntityGUID;
            revVidAlbumObject._revTimeCreated = new Date().getTime();

            let revPersVidsAlbumArr = { filter: [revVidAlbumObject] };

            await window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, revPersVidsAlbumArr, async (revVidsAlbumData) => {
                let revVidsAlbumRemoteEntityGUID = revVidsAlbumData.filter[0]._remoteRevEntityGUID;

                let revKiwiVidAlbumRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
                revKiwiVidAlbumRel._revEntityRelationshipType = "rev_vids_album_of";
                revKiwiVidAlbumRel._remoteRevEntityTargetGUID = revContainerEntityGUID;
                revKiwiVidAlbumRel._remoteRevEntitySubjectGUID = revVidsAlbumRemoteEntityGUID;

                let revReLKiwiVidssFilter = { filter: [revKiwiVidAlbumRel] };

                await window.revPostServerData(window.REV_CREATE_NEW_REL_URL, revReLKiwiVidssFilter, async (revRetRelData) => {
                    let revVidsFileObjectsArr = [];
                    let revEntityGUIDs = [];

                    for (let i = 0; i < revSelectedVidFiles.length; i++) {
                        let revFile = revSelectedVidFiles[i];
                        let revFileSubtype = window.revGetFileObjectSubType(revFile);
                        let revFileObject = window.revSetFileObject(revFileSubtype, -1, revFile.name);

                        revFileObject._revEntityGUID = i;
                        revEntityGUIDs.push(i);

                        revVidsFileObjectsArr.push(revFileObject);
                    }

                    let revVidsFilesPersArr = { filter: revVidsFileObjectsArr };

                    await window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, revVidsFilesPersArr, async (revVidsRetPersData) => {
                        let revPersRetVidFiles = revVidsRetPersData.filter;

                        let revVidFilesRelArr = [];

                        for (let i = 0; i < revPersRetVidFiles.length; i++) {
                            if (!revEntityGUIDs.includes(revPersRetVidFiles[i]._revEntityGUID)) continue;

                            let revVidFileRemoteRevEntityGUID = revPersRetVidFiles[i]._remoteRevEntityGUID;

                            let revVidsAlbumFileRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
                            revVidsAlbumFileRel._revEntityRelationshipType = "rev_video_of";
                            revVidsAlbumFileRel._remoteRevEntityTargetGUID = revVidsAlbumRemoteEntityGUID;
                            revVidsAlbumFileRel._remoteRevEntitySubjectGUID = revVidFileRemoteRevEntityGUID;

                            revVidFilesRelArr.push(revVidsAlbumFileRel);
                        }

                        let revReLVidsFilesFilter = { filter: revVidFilesRelArr };

                        await window.revPostServerData(window.REV_CREATE_NEW_REL_URL, revReLVidsFilesFilter, async (revRetRelData) => {
                            await window.revUploadFiles(window.REV_SITE_BASE_PATH + "/file_upload", revSelectedVidFiles, (revRes) => {
                                callback(revRes);
                            });
                        });
                    });
                });
            });
        }
    };
})((window.revPluginModuleVideoAlbumPers = window.revPluginModuleVideoAlbumPers || {}), jQuery);
