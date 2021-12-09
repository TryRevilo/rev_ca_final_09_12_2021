const rev_pers_delete_metadata_serv = require("../../../../rev_entity_data/rev_pers_metadata/rev_pers_lib_delete/rev_service_heper/rev_pers_delete_metadata_serv");
const rev_pers_delete_rels_serv = require("../../../../rev_entity_data/rev_pers_relationships/rev_pers_lib_delete/rev_service_heper/rev_pers_delete_rels_serv");
const rev_pers_delete_rev_entity = require("../rev_accessor/rev_pers_delete_rev_entity");

const rev_pers_read_rev_entity_service_helper = require("../../rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_entity_service_helper");
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../../rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");

const rev_strings_helper_funcs = require("../../../../../rev_helper_functions/rev_strings_helper_funcs");

var revDelRevEntity_By_remoteRevEntityGUID_Serv = async (remoteRevEntityGUIDs) => {
    if (!Array.isArray(remoteRevEntityGUIDs)) {
        return;
    }

    let revMetadataDelResStatus = await rev_pers_delete_metadata_serv.revPersDeleteMetadata_By_EntityGUID_Serv(remoteRevEntityGUIDs);
    let revDelRelsResStatus = await rev_pers_delete_rels_serv.revPersDeleteRels_By_remoteRevEntityGUID_Serv(remoteRevEntityGUIDs);

    return new Promise((res, rej) => {
        rev_pers_delete_rev_entity.revPersDeleteRevEntity_By_remoteRevEntityGUIDs_Multi(remoteRevEntityGUIDs, (revDelEntitiesResStatus) => {
            res({
                "revMetadataDelResStatus": revMetadataDelResStatus,
                "revDelRelsResStatus": revDelRelsResStatus,
                "revDelEntitiesResStatus": revDelEntitiesResStatus,
            });
        });
    });
};

var revGetEntityChildsDeleteGUIDs = async (revDeleteGUIDs) => {
    if (!Array.isArray(revDeleteGUIDs) || revDeleteGUIDs.length < 1) {
        return null;
    }

    let revGUIDsDeleteArray = [];
    let revDeleteFilesGUIDsArr = [];

    let revIsObject = async (revEntityGUID) => {
        let revEntityIsObject = true;

        let revEntityType = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntityType_Serv(revEntityGUID);

        if (!revEntityType || rev_strings_helper_funcs.revIsStringEqual(revEntityType, "rev_user_entity") || rev_strings_helper_funcs.revIsStringEqual(revEntityType, "rev_group_entity")) {
            revEntityIsObject = false;
        }

        return revEntityIsObject;
    };

    let revGetDeleteChildrenGUIDs = async (remoteRevEntityParentGUIDs) => {
        let revGUIDAdded = (revGUIDsArr, revGUID) => {
            return revGUID && revGUID > 0 && revGUIDsArr.includes(revGUID);
        };

        for (let i = 0; i < remoteRevEntityParentGUIDs.length; i++) {
            let remoteRevEntityParentGUID = remoteRevEntityParentGUIDs[i];

            let revCurrIsObject = await revIsObject(remoteRevEntityParentGUID);

            if (revCurrIsObject && !revGUIDAdded(revGUIDsDeleteArray, remoteRevEntityParentGUID)) {
                revGUIDsDeleteArray.push(remoteRevEntityParentGUID);
            }
        }

        let revEntityOwnerChildrenArr = await rev_pers_read_rev_entity_service_helper.revSelectRevEntityOwnerChildrenGUIDs_By_RevEntityGUID_Serv(remoteRevEntityParentGUIDs);
        let revEntityContainerChildrenArr = await rev_pers_read_rev_entity_service_helper.revSelectRevEntityContainerChildrenGUIDs_By_RevEntityGUID_Serv(remoteRevEntityParentGUIDs);

        let revGetChildrenArr = revEntityOwnerChildrenArr.concat(revEntityContainerChildrenArr);

        for (let i = 0; i < revGetChildrenArr.length; i++) {
            let revItem = revGetChildrenArr[i];

            if (!revItem) {
                continue;
            }

            let revEntityContainerType = revItem.REV_ENTITY_TYPE;
            let revRemoteChildEntityGUID = revItem.REMOTE_REV_ENTITY_GUID;

            if (!rev_strings_helper_funcs.revIsStringEqual(revEntityContainerType, "rev_user_entity") && !rev_strings_helper_funcs.revIsStringEqual(revEntityContainerType, "rev_group_entity") && !revGUIDAdded(revGUIDsDeleteArray, revRemoteChildEntityGUID)) {
                revGUIDsDeleteArray.push(revRemoteChildEntityGUID);
            }
        }

        for (let i = 0; i < revGUIDsDeleteArray.length; i++) {
            let revDelEntityGUID = revGUIDsDeleteArray[i];

            if (!revDelEntityGUID) {
                continue;
            }

            let revCurrIsObject = await revIsObject(revDelEntityGUID);

            if (revCurrIsObject && !revGUIDAdded(revGUIDsDeleteArray, revDelEntityGUID)) {
                revGUIDsDeleteArray.push(revDelEntityGUID);
            }

            let revEntityExists = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntityResolveStatus_Serv(revDelEntityGUID);

            if (!revEntityExists) {
                continue;
            }

            // LET REL_SUBJECT_GUIDS = GET REL CHILDREN
            let revEntityRels_Type_SUBJECT_TARGET_GUIDs = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_serv(revDelEntityGUID);

            if (Array.isArray(revEntityRels_Type_SUBJECT_TARGET_GUIDs.filter)) {
                let revCallFunc = (obj) => {
                    let revSubjectGUID = obj.SUBJECT_GUID;
                    let revTargetGUID = obj.TARGET_GUID;

                    if (obj.RELATIONSHIP_TYPE_VALUE_ID == 4) {
                        revDeleteFilesGUIDsArr.push(revSubjectGUID);
                    }

                    if (revIsObject(revSubjectGUID) && revIsObject(revTargetGUID)) {
                        if (!revGUIDAdded(revGUIDsDeleteArray, revSubjectGUID)) {
                            revGUIDsDeleteArray.push(revSubjectGUID);
                        }
                    }
                };

                try {
                    await revEntityRels_Type_SUBJECT_TARGET_GUIDs.filter.reduce((previousPromise, nextID) => {
                        return previousPromise.then(() => {
                            return new Promise((resolve, reject) => {
                                revCallFunc(nextID);
                                resolve();
                            });
                        });
                    }, Promise.resolve());
                } catch (error) {
                    console.log("ERR -> revEntityRels_Type_SUBJECT_TARGET_GUIDs");
                }
            }

            let revChildablesArr = [];

            for (let i = 0; i < revGUIDsDeleteArray.length; i++) {
                let revCurDelGUID = revGUIDsDeleteArray[i];
                let revEntityChildableStatus = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntityChildableStatus_Serv(revCurDelGUID);

                if (revEntityChildableStatus > 1 && !revGUIDAdded(revGUIDsDeleteArray, revCurDelGUID)) {
                    revChildablesArr.push(revCurDelGUID);
                }
            }

            if (revChildablesArr.length > 0) {
                revGetDeleteChildrenGUIDs(revChildablesArr);
            }
        }
    };

    await revGetDeleteChildrenGUIDs(revDeleteGUIDs);

    for (let i = 0; i < revGUIDsDeleteArray.length; i++) {
        let revEntityGUID = revGUIDsDeleteArray[i];
        let revEntitySubType = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntitySubType_Serv(revEntityGUID);

        if (revEntitySubType && revEntitySubType !== -1 && (revEntitySubType.localeCompare("rev_file") == 0 || revEntitySubType.localeCompare("rev_video") == 0)) {
            revDeleteFilesGUIDsArr.push(revEntityGUID);
        }
    }

    revDeleteFilesGUIDsArr.forEach(async (revDeleteFilesGUID) => {
        try {
            let revFilePath = await rev_pers_read_rev_entity_metadata_service_helper.revPersReadRevEntityMetadataValue_By_RemoteRevEntityGUID_MetadataName_Serv(revDeleteFilesGUID, "rev_remote_file_name");

            if (revFilePath) {
                revFilePath = revServerDocumentsDir + "/" + revFilePath;

                fs.stat(revFilePath, function (err, stats) {
                    console.log(stats); // Got all information of file in stats variable

                    if (err) {
                        return console.log("FERR: " + err);
                    } else {
                        try {
                            fs.unlinkSync(revFilePath);

                            console.log("DELETED " + revFilePath);
                        } catch (err) {
                            console.log("REV DEL ERR -> " + err);
                        }
                    }
                });
            }
        } catch (err) {
            console.log("REV ERR -> forEach FILES -> " + err);
        }
    });

    return revGUIDsDeleteArray;
};

module.exports.revDelRevEntity_By_remoteRevEntityGUID_Serv = revDelRevEntity_By_remoteRevEntityGUID_Serv;
module.exports.revGetEntityChildsDeleteGUIDs = revGetEntityChildsDeleteGUIDs;
