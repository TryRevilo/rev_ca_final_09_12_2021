var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revSearchFilterArr = revVarArgs.filter;

        for (let i = 0; i < revSearchFilterArr.length; i++) {
            let revSearchEntity = revSearchFilterArr[i];

            if (revRemoteHookMethods.revIsEmptyJSONObject(revSearchEntity) || (revSearchEntity._revEntitySubType && revSearchEntity._revEntitySubType.localeCompare("rev_pics_album") !== 0)) {
                continue;
            }

            let revTargetPicsAlbumContainerGUID = -1;

            if (revSearchEntity._revEntityContainerGUID < 1) {
                revTargetPicsAlbumContainerGUID = await revRemoteHookMethods.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId(revSearchEntity._remoteRevEntityGUID, 3);
            } else if (revSearchEntity._revEntityContainerGUID > 0) {
                revTargetPicsAlbumContainerGUID = revSearchEntity._revEntityContainerGUID;
            }

            if (revTargetPicsAlbumContainerGUID > 0) {
                try {
                    let revParentEntity = await revRemoteHookMethods.revGetFilledEntity_By_EntityGUID(revTargetPicsAlbumContainerGUID);

                    if (!revRemoteHookMethods.revIsEmptyJSONObject(revParentEntity)) {
                        revVarArgs.filter.splice(i, 1, revParentEntity);
                    }
                } catch (error) {
                    console.log("ERR -> revHookRemoteHandler_SearchFilter_PhotoAlbums.js -> " + error);
                }
            }
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
