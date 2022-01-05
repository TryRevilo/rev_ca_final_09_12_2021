(function (revPluginModuleVideoPlayStatsLib, $, undefined) {
    revPluginModuleVideoPlayStatsLib.revUploadFileObjects = async (revVarArgs, revCallback) => {
        if (!revVarArgs || !revVarArgs.revContainerEntityGUID || revVarArgs.revContainerEntityGUID < 1) {
            console.log("!revVarArgs || !revVarArgs.revContainerEntityGUID || revVarArgs.revContainerEntityGUID < 1");

            return;
        }

        let revIsNewEntity = true;

        if (revVarArgs.revIsNewEntity === false) {
            revIsNewEntity = revVarArgs.revIsNewEntity;
        }

        await window.revLoadModules("revPluginModulePicsAlbumPers", (revScriptModule) => {
            if (revIsNewEntity) {
                let revPassVarArgs = { "revEntityContainerGUID": revContainerEntityGUID, "revFileObjectsArr": revFileObjectsArr, "revIsNewEntity": revIsNewEntity };

                window.revPluginModulePicsAlbumPers.createPicsAlbum_FileObjects(revPassVarArgs, (revResStatus) => {
                    console.log("FIN : revIsNewEntity : revPluginModuleVideoPlayStatsLib");
                    revCallback(revResStatus);
                });
            } else {
                let revPassVarArgs = { "revContainerEntityGUID": revContainerEntityGUID, "revFileObjectsArr": revFileObjectsArr };
                window.revPluginModulePicsAlbumPers.revUploadPicsAlbumFiles(revPassVarArgs, (revResStatus) => {
                    console.log("FIN : UPDATE : revPluginModuleVideoPlayStatsLib");
                    revCallback(revResStatus);
                });
            }
        });
    };
})((window.revPluginModuleVideoPlayStatsLib = window.revPluginModuleVideoPlayStatsLib || {}), jQuery);
