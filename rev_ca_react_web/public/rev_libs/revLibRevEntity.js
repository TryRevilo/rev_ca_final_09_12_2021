var revGetRevEntity_FROM_ARR_BY_GUID = (revEntitiesArr, revEntityGUID) => {
    let revEntity;

    for (let i = 0; i < revEntitiesArr.length; i++) {
        if (revEntitiesArr[i] && revEntitiesArr[i]._remoteRevEntityGUID == revEntityGUID) {
            revEntity = revEntitiesArr[i];
            break;
        }
    }

    return revEntity;
};

var revGetEntityChildren_By_Subtype = (revEntityChildrenArr, revEntitySubtype, limit) => {
    if (!Array.isArray(revEntityChildrenArr) || !revEntitySubtype) {
        return null;
    }

    let revEntityChildrenSubtypesArr = [];

    for (let i = 0; i < revEntityChildrenArr.length; i++) {
        let revEntityChild = revEntityChildrenArr[i];

        if (!revEntityChild || revEntityChild == undefined) {
            continue;
        }

        if (revEntityChild._revEntitySubType.localeCompare(revEntitySubtype) == 0) {
            if (limit && limit > 0) {
                if (limit == 1) {
                    revEntityChildrenSubtypesArr = revEntityChild;
                } else {
                    revEntityChildrenSubtypesArr.push(revEntityChild);

                    if (i + 1 == limit) {
                        break;
                    }
                }
            } else {
                revEntityChildrenSubtypesArr.push(revEntityChild);
            }
        }
    }

    if (revEntityChildrenSubtypesArr.length < 1) {
        return null;
    }

    return revEntityChildrenSubtypesArr;
};

var revReplaceEntityChild_By_Subtype = (revParentEntity, revReplacementChild, revEntitySubtype) => {
    if (!revParentEntity || !revParentEntity._revEntityChildrenList || !revEntitySubtype) return revParentEntity;

    for (let i = 0; i < revParentEntity._revEntityChildrenList.length; i++) {
        let revEntityChild = revParentEntity._revEntityChildrenList[i];

        if (revEntityChild._revEntitySubType.localeCompare(revEntitySubtype) == 0) {
            revParentEntity._revEntityChildrenList[i] = revReplacementChild;
            break;
        }
    }

    return revParentEntity;
};

var revRemoveEntityChild_By_EntityGUID = (revParentEntity, revEntityGUIDsArr) => {
    if (!revParentEntity || !revParentEntity._revEntityChildrenList || !revEntityGUIDsArr || !revEntityGUIDsArr.length) {
        return revParentEntity;
    }

    let i = 0;
    while (i < revParentEntity._revEntityChildrenList.length) {
        let revEntityChild = revParentEntity._revEntityChildrenList[i];

        if (revEntityGUIDsArr.includes(revEntityChild._remoteRevEntityGUID)) {
            revParentEntity._revEntityChildrenList.splice(i, 1);
        } else {
            ++i;
        }
    }

    return revParentEntity;
};

var revGetPublisherEntity = (revPublishersArr, revEntityGUID) => {
    if (!revPublishersArr) {
        console.log("ERR -> NULL PUBLISHERS!");
        return;
    }

    let revPublisherEntity;

    for (let i = 0; i < revPublishersArr.length; i++) {
        let revPublisher = revPublishersArr[i];

        if (revPublisher && revPublisher._remoteRevEntityGUID == revEntityGUID) {
            if (revPublisher.revEntity) {
                revPublisherEntity = revPublisher.revEntity;
            } else {
                revPublisherEntity = revPublisher;
            }

            break;
        }
    }

    return revPublisherEntity;
};

var revUserIconClick = (remoteRevEntityGUID) => {
    let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

    if (!revLoggedInEntityGUID) revLoggedInEntityGUID = -1;

    window.revLoadModules("revPluginModuleDownloadUserProfileData", (revScriptModule) => {
        window.revPluginModuleDownloadUserProfileData.revDownloadUserProfileData({ "revLoggedInEntityGUID": revLoggedInEntityGUID, "remoteRevEntityGUID": remoteRevEntityGUID }, async (revData) => {
            try {
                let revLoadedPageView = await window.revGetLoadedPageViewAreaContainer("revMainCenterScrollArea", revData);
                window.revDrawMainContentArea({ "revData": revData, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": "rev_floating_menu_area_user_profile_activity_page" });
            } catch (error) {
                console.log("ERR -> revLibRevEntity.js -> !revUserIconClick -> " + error);
            }
        });
    });
};

var revGetDefaultEntityIcon = (revEntity) => {
    let revMainIconMetadata = window.revGetRevEntityMetadataContainingMetadataName(revEntity, "rev_main_file");

    let revIconName = "";

    if (revMainIconMetadata) {
        revIconName = revMainIconMetadata._metadataValue;
    } else {
        let revPicsAlbum = window.revGetAnyRevEntityPicsAlbum(revEntity);

        if (!revPicsAlbum || !Array.isArray(revPicsAlbum._revEntityChildrenList) || !revPicsAlbum._revEntityChildrenList[0]) {
            return null;
        }

        revIconName = window.revGetMetadataValue(revPicsAlbum._revEntityChildrenList[0]._revEntityMetadataList, "rev_remote_file_name");
    }

    let revIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revIconName;

    return revIconPath;
};

var revGetRevEntityPicsAlbum = (revEntity) => {
    let revEntityPicsAlbum;

    if (!revEntity || !revEntity._revInfoEntity) return revEntityPicsAlbum;

    let revInfoEntityChildren = revEntity._revInfoEntity._revEntityChildrenList;

    if (!revInfoEntityChildren || !revInfoEntityChildren.length) return;

    for (let i = 0; i < revInfoEntityChildren.length; i++) {
        let revCurrent = revInfoEntityChildren[i];

        if (revCurrent._revEntitySubType.localeCompare("rev_pics_album") == 0) {
            revEntityPicsAlbum = revCurrent;
            break;
        }
    }

    return revEntityPicsAlbum;
};

var revGetAnyRevEntityPicsAlbum = (revEntity) => {
    let revEntityPicsAlbum;

    if (!revEntity) return null;

    let revEntityChildren = revEntity._revEntityChildrenList;

    if (!revEntityChildren || !revEntityChildren.length) return null;

    for (let i = 0; i < revEntityChildren.length; i++) {
        let revCurrent = revEntityChildren[i];

        if (revCurrent._revEntitySubType.localeCompare("rev_pics_album") == 0) {
            revEntityPicsAlbum = revCurrent;
            break;
        }
    }

    return revEntityPicsAlbum;
};

var revGetEntityIcon = (revEntity) => {
    let revRemotePath = "";

    if (!revEntity) return revRemotePath;

    let revEntityPicsAlbum = revGetRevEntityPicsAlbum(revEntity);

    if (!revEntityPicsAlbum) return revRemotePath;

    if (revEntityPicsAlbum !== null) {
        let revAlbumFiles = revEntityPicsAlbum._revEntityChildrenList;

        for (let i = 0; i < revAlbumFiles.length; i++) {
            let revImageFile = revAlbumFiles[i];
            revRemotePath = revGetMetadataValue(revImageFile._revEntityMetadataList, "rev_remote_file_name");
        }
    }

    return revRemotePath;
};
