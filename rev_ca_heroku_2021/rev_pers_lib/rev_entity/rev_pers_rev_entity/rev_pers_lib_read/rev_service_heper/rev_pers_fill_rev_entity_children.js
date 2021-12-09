const rev_db_entity_const_resolver = require("../../rev_db_models/rev_db_entity_const_resolver");
const rev_pers_read_rev_entity_service_helper = require("./rev_pers_read_rev_entity_service_helper");
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../../rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");

var revPersFillRevEntityRelsChildren_serv = async (revEntity) => {
    if (!revEntity) return;

    let remoteRevEntityGUID = revEntity._remoteRevEntityGUID;

    let revEntityChildrenDBRes = { filter: [] };

    let revIsAddedChildGUID = (revEntityGUID) => {
        let revIsAdded = false;
        let revEntityChilds = revEntity._revEntityChildrenList;

        for (let i = 0; i < revEntityChilds.length; i++) {
            if (revEntityGUID == revEntityChilds[i]._remoteRevEntityGUID) {
                revIsAdded = true;
                break;
            }
        }

        return revIsAdded;
    };

    if (revEntity._revEntityChildableStatus == 1) {
        revEntityChildrenDBRes.filter = await rev_pers_read_rev_entity_service_helper.revPersReadAllRevEntities_By_RemoteRevEntityOwnerGUID_Serv(remoteRevEntityGUID);
    } else if (revEntity._revEntityChildableStatus == 3 || revEntity._revEntityChildableStatus == 301) {
        let methodThatReturnsAPromise = async (nextId) => {
            let revChildItemGUID = nextId.SUBJECT_GUID;

            if (revIsAddedChildGUID(revChildItemGUID) == false) {
                let revChildEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revChildItemGUID);
                revEntityChildrenDBRes.filter.push(revChildEntityDBRes);
            }
        };

        let revEntityRelChildrenDBRes = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_Serv(remoteRevEntityGUID);

        await revEntityRelChildrenDBRes.filter.reduce((previousPromise, nextId) => {
            return previousPromise.then(async () => {
                return await methodThatReturnsAPromise(nextId);
            });
        }, Promise.resolve());
    }

    if (revEntityChildrenDBRes.filter.length > 0) {
        await revEntityChildrenDBRes.filter.reduce((previousPromise, nextId) => {
            return previousPromise.then(async () => {
                if (revIsAddedChildGUID(nextId.REMOTE_REV_ENTITY_GUID) == false) {
                    let revFilledChild = await rev_db_entity_const_resolver.revFillrevEntityType(nextId);

                    if (revFilledChild !== null) {
                        revEntity._revEntityChildrenList.push(revFilledChild);

                        await revPersFillRevEntityRelsChildren_serv(revFilledChild);
                    }
                }
            });
        }, Promise.resolve());
    }
};

/** START REV RELS */
var revPersReadRevRelsIdSubjectsContainer_By_TargetGUID_RelID_Serv = async (revVarArgs) => {
    let filterRevRetArr = {
        filter: [],
    };

    let revValIdsArr = revVarArgs.rev_rel_type_val_id_arr.toString().split(",");

    let revRelEntityGUIDsArr = [];
    let revRelValIdEntityGUIDsContainer = {};
    let revRelIdEntitiesContainer = {};

    for (let i = 0; i < revValIdsArr.length; i++) {
        if (!revRelValIdEntityGUIDsContainer.hasOwnProperty(revValIdsArr[i])) {
            revRelValIdEntityGUIDsContainer[revValIdsArr[i]] = [];
        }

        let revRelSubjectGUIDsArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Serv({
            "rev_rel_type_val_id_arr": revValIdsArr[i],
            "rev_entity_target_guid": revVarArgs.rev_entity_target_guid,
            "rev_res_status": revVarArgs.rev_res_status,
        });

        revRelSubjectGUIDsArr = revRelSubjectGUIDsArr.filter;

        for (let g = 0; g < revRelSubjectGUIDsArr.length; g++) {
            revRelEntityGUIDsArr.push(revRelSubjectGUIDsArr[g].SUBJECT_GUID);
            revRelValIdEntityGUIDsContainer[revValIdsArr[i]].push(revRelSubjectGUIDsArr[g].SUBJECT_GUID);
        }
    }

    let revSubjectEntitiesDBResArr = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_BY_RemoteRevEntityGUIDs_Serv(revRelEntityGUIDsArr);

    let revGetRevEntityItem = (revEntityGUID) => {
        for (let i = 0; i < revSubjectEntitiesDBResArr.length; i++) {
            if (revSubjectEntitiesDBResArr[i].REMOTE_REV_ENTITY_GUID == revEntityGUID) return revSubjectEntitiesDBResArr[i];
        }
    };

    for (let key in revRelValIdEntityGUIDsContainer) {
        if (revRelValIdEntityGUIDsContainer.hasOwnProperty(key)) {
            let revRelValEntityGUIDsArr = revRelValIdEntityGUIDsContainer[key];

            if (!revRelIdEntitiesContainer.hasOwnProperty(key)) {
                revRelIdEntitiesContainer[key] = [];
            }

            for (let g = 0; g < revRelValEntityGUIDsArr.length; g++) {
                let revEntitySubjectGUID = revRelValEntityGUIDsArr[g];

                let revEntityDBRes = revGetRevEntityItem(revEntitySubjectGUID);

                let revRetEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);

                revRelIdEntitiesContainer[key].push(revRetEntity);
            }
        }

        filterRevRetArr.filter.push(revRelIdEntitiesContainer);
    }

    return filterRevRetArr;
};

var revReadEntities_By_TargetGUID_RelValIdArr_Serv = async (revVarArgs) => {
    let revSubjectGUIDsArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Serv(revVarArgs);
    revSubjectGUIDsArr = revSubjectGUIDsArr.filter;

    let revEntityGUIDsArr = [];

    for (let i = 0; i < revSubjectGUIDsArr.length; i++) {
        revEntityGUIDsArr.push(revSubjectGUIDsArr[i].SUBJECT_GUID);
    }

    if (revEntityGUIDsArr.length < 1) {
        return null;
    }

    let revEntitiesDBResArr = await rev_pers_read_rev_entity_service_helper.revPersReadAllRevEntity_By_RevEntityGUIDs_Serv(revEntityGUIDsArr);

    let revEntitiesArr = [];

    for (let i = 0; i < revEntitiesDBResArr.length; i++) {
        let revEntity = await rev_db_entity_const_resolver.revEntityFiller(revEntitiesDBResArr[i]);

        if (revEntity) {
            revEntitiesArr.push(revEntity);
        }
    }

    return revEntitiesArr;
};

var revReadTargetEntity_WITH_SubjectEntities_By_TargetGUID_RelValIdArr_Serv = async (revVarArgs) => {
    let revEntityTargetGUID = revVarArgs.rev_entity_target_guid;

    let revTargetEntity = rev_db_entity_const_resolver.revGetFlatEntity_Serv(revEntityTargetGUID);

    let revSubjectGUIDsArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Serv(revVarArgs);
    revSubjectGUIDsArr = revSubjectGUIDsArr.filter;

    let revEntityGUIDsArr = [];

    for (let i = 0; i < revSubjectGUIDsArr.length; i++) {
        revEntityGUIDsArr.push(revSubjectGUIDsArr[i].SUBJECT_GUID);
    }

    if (revEntityGUIDsArr.length < 1) {
        return null;
    }

    let revEntitiesDBResArr = await rev_pers_read_rev_entity_service_helper.revPersReadAllRevEntity_By_RevEntityGUIDs_Serv(revEntityGUIDsArr);

    let revEntitiesArr = [];

    for (let i = 0; i < revEntitiesDBResArr.length; i++) {
        let revEntity = await rev_db_entity_const_resolver.revEntityFiller(revEntitiesDBResArr[i]);

        if (revEntity) {
            revEntitiesArr.push(revEntity);
        }
    }

    revTargetEntity._revEntityChildrenList = revEntitiesArr;

    return revTargetEntity;
};
/** END REV RELS */

module.exports.revPersFillRevEntityRelsChildren_serv = revPersFillRevEntityRelsChildren_serv;
module.exports.revPersReadRevRelsIdSubjectsContainer_By_TargetGUID_RelID_Serv = revPersReadRevRelsIdSubjectsContainer_By_TargetGUID_RelID_Serv;
module.exports.revReadEntities_By_TargetGUID_RelValIdArr_Serv = revReadEntities_By_TargetGUID_RelValIdArr_Serv;
module.exports.revReadTargetEntity_WITH_SubjectEntities_By_TargetGUID_RelValIdArr_Serv = revReadTargetEntity_WITH_SubjectEntities_By_TargetGUID_RelValIdArr_Serv;
