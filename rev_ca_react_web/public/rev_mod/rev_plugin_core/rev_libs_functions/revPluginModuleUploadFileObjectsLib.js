(function (revPluginModuleUploadFileObjectsLib, $, undefined) {
    revPluginModuleUploadFileObjectsLib.revUploadFileObjects = async (revVarArgs, revCallback) => {
        if (!revVarArgs || !revVarArgs.revContainerEntityGUID || revVarArgs.revContainerEntityGUID < 1) {
            console.log("!revVarArgs || !revVarArgs.revContainerEntityGUID || revVarArgs.revContainerEntityGUID < 1");

            return;
        }

        let revIsNewEntity = true;

        if (revVarArgs.revIsNewEntity === false) {
            revIsNewEntity = revVarArgs.revIsNewEntity;
        }

        if (!revVarArgs.revFiles || !revVarArgs.revFiles.length || revVarArgs.revFiles.length < 1) {
            console.log("!Array.isArray(revVarArgs.revFiles) || revVarArgs.revFiles.length < 1");

            return;
        }

        let revFiles = revVarArgs.revFiles;

        let revFileType = "rev_file";

        if (revVarArgs.revFileType) {
            revFileType = revVarArgs.revFileType;
        }

        let revContainerEntityGUID = revVarArgs.revContainerEntityGUID;

        let revMainFileIndex = null;

        if (revVarArgs.revMainSelectedFileIndex) {
            revMainFileIndex = revVarArgs.revMainSelectedFileIndex;
        }

        let revFileObjectsArr = [];

        for (let i = 0; i < revFiles.length; i++) {
            let revFile = revFiles[i];

            if (revFile) {
                let revRemoteIconFile = window.revSetNewRemoteFile(revFile, i);
                // revRemoteIconFile["name"] = revRemoteIconFile.name + "_" + i;

                console.log("revRemoteIconFile.name : " + revRemoteIconFile.name);

                let revFileSubtype = window.revGetFileObjectSubType(revFile);
                let revEntityFileObject = window.revSetFileObject(revFileSubtype, revContainerEntityGUID, revRemoteIconFile.name);

                revEntityFileObject._revEntityMetadataList.push(window.revMetadataFiller(revFileType, revFileType));

                if (revMainFileIndex && revMainFileIndex == i) {
                    revEntityFileObject._revEntityMetadataList.push(window.revMetadataFiller("rev_main_file", revRemoteIconFile.name));
                }

                revEntityFileObject._revEntityGUID = 0;

                revFileObjectsArr.push({ "revFileObject": revEntityFileObject, "revFileItem": revRemoteIconFile });
            }
        }

        if (revFileObjectsArr.length < 1) {
            console.log("revFileObjectsArr.length < 1");

            return;
        }

        await window.revLoadModules("revPluginModulePicsAlbumPers", (revScriptModule) => {
            if (revIsNewEntity) {
                let revPassVarArgs = { "revEntityContainerGUID": revContainerEntityGUID, "revFileObjectsArr": revFileObjectsArr, "revIsNewEntity": revIsNewEntity };

                window.revPluginModulePicsAlbumPers.createPicsAlbum_FileObjects(revPassVarArgs, (revResStatus) => {
                    console.log("FIN : revIsNewEntity : revPluginModuleUploadFileObjectsLib");
                    revCallback(revResStatus);
                });
            } else {
                let revPassVarArgs = { "revContainerEntityGUID": revContainerEntityGUID, "revFileObjectsArr": revFileObjectsArr };
                window.revPluginModulePicsAlbumPers.revUploadPicsAlbumFiles(revPassVarArgs, (revResStatus) => {
                    console.log("FIN : UPDATE : revPluginModuleUploadFileObjectsLib");
                    revCallback(revResStatus);
                });
            }
        });
    };
})((window.revPluginModuleUploadFileObjectsLib = window.revPluginModuleUploadFileObjectsLib || {}), jQuery);
