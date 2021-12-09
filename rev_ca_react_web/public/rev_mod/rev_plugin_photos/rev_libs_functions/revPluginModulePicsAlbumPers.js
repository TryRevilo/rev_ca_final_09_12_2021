(function (revPluginModulePicsAlbumPers, $, undefined) {
    revPluginModulePicsAlbumPers.createPicsAlbum = async (revEntityContainerGUID, revFileObjectsArr, callback) => {
        if (revFileObjectsArr.length > 0) {
            let revPicAlbumObject = window.REV_ENTITY_STRUCT();
            revPicAlbumObject._revEntityResolveStatus = 0;
            revPicAlbumObject._revEntityChildableStatus = 301;
            revPicAlbumObject._revEntityType = "rev_object";
            revPicAlbumObject._revEntitySubType = "rev_pics_album";
            revPicAlbumObject._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
            revPicAlbumObject.revEntityContainerGUID = revEntityContainerGUID;
            revPicAlbumObject._revTimeCreated = new Date().getTime();

            let revPersPicAlbumArr = { filter: [revPicAlbumObject] };

            await window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, revPersPicAlbumArr, async (revPicAlbumData) => {
                let revPicAlbumRemoteEntityGUID = revPicAlbumData.filter[0]._remoteRevEntityGUID;

                let revPicsAlbumRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
                revPicsAlbumRel._revEntityRelationshipType = "rev_pics_album_of";
                revPicsAlbumRel._remoteRevEntityTargetGUID = revEntityContainerGUID;
                revPicsAlbumRel._remoteRevEntitySubjectGUID = revPicAlbumRemoteEntityGUID;

                let revReLPicsFilter = { filter: [revPicsAlbumRel] };

                await window.revPostServerData(window.REV_CREATE_NEW_REL_URL, revReLPicsFilter, async (revRetRelData) => {
                    let revFileObjectsArr = [];
                    let revEntityGUIDs = [];

                    for (let i = 0; i < revFileObjectsArr.length; i++) {
                        let revFile = revFileObjectsArr[i];

                        let revFileSubtype = window.revGetFileObjectSubType(revFile);
                        let revFileObject = window.revSetFileObject(revFileSubtype, -1, revFile.name);

                        revFileObject._revEntityGUID = i;
                        revEntityGUIDs.push(i);

                        revFileObjectsArr.push(revFileObject);
                    }

                    let revFilesPersArr = { filter: revFileObjectsArr };

                    await window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, revFilesPersArr, async (revRetPersData) => {
                        let revPersRetFiles = revRetPersData.filter;

                        let revFilesRelArr = [];

                        for (let i = 0; i < revPersRetFiles.length; i++) {
                            if (!revEntityGUIDs.includes(revPersRetFiles[i]._revEntityGUID)) continue;

                            let revFileRemoteRevEntityGUID = revPersRetFiles[i]._remoteRevEntityGUID;

                            let revPicsAlbumFileRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
                            revPicsAlbumFileRel._revEntityRelationshipType = "rev_picture_of";
                            revPicsAlbumFileRel._remoteRevEntityTargetGUID = revPicAlbumRemoteEntityGUID;
                            revPicsAlbumFileRel._remoteRevEntitySubjectGUID = revFileRemoteRevEntityGUID;

                            revFilesRelArr.push(revPicsAlbumFileRel);
                        }

                        let revReLPicsFilesFilter = { filter: revFilesRelArr };

                        await window.revPostServerData(window.REV_CREATE_NEW_REL_URL, revReLPicsFilesFilter, async (revRetRelData) => {
                            await window.revUploadFiles(window.REV_SITE_BASE_PATH + "/file_upload", revFileObjectsArr, (revRes) => {
                                callback(revRes);
                            });
                        });
                    });
                });
            });
        }
    };

    revPluginModulePicsAlbumPers.revUploadPicsAlbumFiles = (revVarArgs, revCallback) => {
        let revPicAlbumRemoteEntityGUID = revVarArgs.revContainerEntityGUID;
        let revFileObjectsArr = revVarArgs.revFileObjectsArr;

        let revUploadFilesArr = [];

        for (let i = 0; i < revFileObjectsArr.length; i++) {
            revUploadFilesArr.push(revFileObjectsArr[i].revFileItem);
        }

        if (revUploadFilesArr.length < 1) {
            return;
        }

        let revEntityGUIDs = [];

        let revFilesPersArr = { "filter": [] };

        let i = 0;

        while (i < revFileObjectsArr.length) {
            if (!revFileObjectsArr[i] || !revFileObjectsArr[i].revFileObject) {
                revFileObjectsArr.splice(i, 1);
                continue;
            }

            let revFileObject = revFileObjectsArr[i].revFileObject;

            revFileObject._revEntityGUID = i;
            revFileObject._revEntityContainerGUID = revPicAlbumRemoteEntityGUID;

            revEntityGUIDs.push(i);

            revFilesPersArr.filter.push(revFileObject);

            ++i;
        }

        window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, revFilesPersArr, (revRetPersData) => {
            let revPersRetFiles = revRetPersData.filter;

            let revFilesRelArr = [];

            for (let i = 0; i < revPersRetFiles.length; i++) {
                if (!revEntityGUIDs.includes(revPersRetFiles[i]._revEntityGUID)) {
                    continue;
                }

                let revFileRemoteRevEntityGUID = revPersRetFiles[i]._remoteRevEntityGUID;

                let revPicsAlbumFileRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
                revPicsAlbumFileRel._revEntityRelationshipType = "rev_picture_of";
                revPicsAlbumFileRel._remoteRevEntityTargetGUID = revPicAlbumRemoteEntityGUID;
                revPicsAlbumFileRel._remoteRevEntitySubjectGUID = revFileRemoteRevEntityGUID;

                revFilesRelArr.push(revPicsAlbumFileRel);
            }

            let revReLPicsFilesFilter = { filter: revFilesRelArr };

            window.revPostServerData(window.REV_CREATE_NEW_REL_URL, revReLPicsFilesFilter, async (revRetRelData) => {
                window.revUploadFiles(window.REV_SITE_BASE_PATH + "/file_upload", revUploadFilesArr, (revRes) => {
                    console.log("revRes :\n\t\t" + JSON.stringify(revRes));
                    revCallback(revRes);
                });
            });
        });
    };

    /** START REV DETAIL PICS **/
    revPluginModulePicsAlbumPers.createPicsAlbum_FileObjects = (revVarArgs, callback) => {
        let revEntityContainerGUID = revVarArgs.revEntityContainerGUID;
        let revFileObjectsArr = revVarArgs.revFileObjectsArr;

        if (revFileObjectsArr.length > 0) {
            let revPicAlbumObject = window.REV_ENTITY_STRUCT();
            revPicAlbumObject._revEntityResolveStatus = 0;
            revPicAlbumObject._revEntityChildableStatus = 301;
            revPicAlbumObject._revEntityType = "rev_object";
            revPicAlbumObject._revEntitySubType = "rev_pics_album";
            revPicAlbumObject._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
            revPicAlbumObject._revEntityContainerGUID = revEntityContainerGUID;
            revPicAlbumObject._revTimeCreated = new Date().getTime();

            let revPersPicAlbumArr = { filter: [revPicAlbumObject] };

            window.revPostServerData(window.REV_CREATE_NEW_REV_ENTITY_URL, revPersPicAlbumArr, (revPicAlbumData) => {
                let revPicAlbumRemoteEntityGUID = revPicAlbumData.filter[0]._remoteRevEntityGUID;

                console.log("revPicAlbumRemoteEntityGUID : " + revPicAlbumRemoteEntityGUID + " " + JSON.stringify(revPicAlbumData));

                let revPicsAlbumRel = window.REV_ENTITY_RELATIONSHIP_STRUCT();
                revPicsAlbumRel._revEntityRelationshipType = "rev_pics_album_of";
                revPicsAlbumRel._remoteRevEntityTargetGUID = revEntityContainerGUID;
                revPicsAlbumRel._remoteRevEntitySubjectGUID = revPicAlbumRemoteEntityGUID;

                let revReLPicsFilter = { filter: [revPicsAlbumRel] };

                window.revPostServerData(window.REV_CREATE_NEW_REL_URL, revReLPicsFilter, (revRetRelData) => {
                    window.revPluginModulePicsAlbumPers.revUploadPicsAlbumFiles({ "revContainerEntityGUID": revPicAlbumRemoteEntityGUID, "revFileObjectsArr": revFileObjectsArr }, callback);
                });
            });
        }
    };
})((window.revPluginModulePicsAlbumPers = window.revPluginModulePicsAlbumPers || {}), jQuery);
