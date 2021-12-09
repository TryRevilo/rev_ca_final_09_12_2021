const rev_pers_rev_entity_relationship_accessor = require("../../rev_pers_lib_create/rev_pers_create/rev_accessor/rev_pers_rev_entity_relationship_accessor");

const rev_pers_read_rev_entity_relationship_accessor = require("../rev_accessor/rev_pers_read_rev_entity_relationship_accessor");
const rev_db_entity_const_resolver = require("../../../../rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");
const rev_pers_read_rev_entity_service_helper = require("../../../../rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_entity_service_helper");
const rev_db_rels_const_resolver = require("../../rev_db_models/rev_db_rels_const_resolver");

var revGetRelationshipTypeValId = (relType) => {
    return rev_pers_rev_entity_relationship_accessor.revRelationshipType(relType);
};

var revGetRelationshipTypeVal = (relTypeValId) => {
    return rev_pers_rev_entity_relationship_accessor.revRelationshipTypeVal(relTypeValId);
};

var revCountRels_By_TargetGUID_RelValId_Serv = (revVarArgs) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revCountRels_By_TargetGUID_RelValId(revVarArgs, (revRetCount) => {
            resolve(revRetCount);
        });
    });
};

var revCountRels_By_SubjectGUID_RelValId_Serv = (revVarArgs) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revCountRels_By_SubjectGUID_RelValId(revVarArgs, (revRetCount) => {
            resolve(revRetCount);
        });
    });
};

var revPersReadRelId_RelSubjectGUID_RelTargetGUID_CreationDate_Serv = async (revLocalRelsArrayData, callback) => {
    let filterRevRetArr = {
        filter: [],
    };

    await revLocalRelsArrayData.reduce((accumulatorPromise, nextID) => {
        let _remoteRevEntitySubjectGUID = nextID._remoteRevEntitySubjectGUID;
        let _remoteRevEntityTargetGUID = nextID._remoteRevEntityTargetGUID;
        let _revEntityRelationshipId = nextID._revEntityRelationshipId;
        let _revTimeCreated = nextID._revTimeCreated;

        return accumulatorPromise.then(() => {
            return new Promise((resolve, reject) => {
                rev_pers_read_rev_entity_relationship_accessor.revPersReadRelId_RelSubjectGUID_RelTargetGUID_CreationDate(_remoteRevEntitySubjectGUID, _remoteRevEntityTargetGUID, _revTimeCreated, (resRevRelId) => {
                    filterRevRetArr.filter.push({ _revEntityRelationshipId: _revEntityRelationshipId, _remoteRevEntityRelationshipId: resRevRelId });

                    resolve();
                });
            });
        });
    }, Promise.resolve());

    callback(filterRevRetArr);
};

var revPersRelExists_By_RevEntityGUIDs_RevRelValId_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_relationship_accessor.revPersRelExists_By_RevEntityGUIDs_RevRelValId(revVarArgs, (revRelRemoteId) => {
            resolve(revRelRemoteId);
        });
    });
};

var revPersReadRevEntityRelId_By_SubjectGUID_TargetGUID_RevRelValId_Serv = (revSubjectGUID, revTargetGUID, revRevValId) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRelId_By_SubjectGUID_TargetGUID_RevRelValId(revSubjectGUID, revTargetGUID, revRevValId, (revRelRemoteId) => {
            resolve(revRelRemoteId);
        });
    });
};

var revPersReadRevEntityRels_By_RemoteRevEntityGUIDServ = (remoteRevEntityGUID) => {
    let filterRevRetArr = {
        filter: [],
    };

    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRelationshipsByRemoteRevEntityGUID(remoteRevEntityGUID, (result) => {
            filterRevRetArr.filter = result;
            resolve(filterRevRetArr);
        });
    });
};

var revPersRead_ID_SUBJET_GUID_TARGET_GUID_By_RemoteRevEntityGUID_Serv = (remoteRevEntityGUIDsArr) => {
    let filterRevRetArr = {
        filter: [],
    };

    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersRead_ID_SUBJET_GUID_TARGET_GUID_By_RemoteRevEntityGUID(remoteRevEntityGUIDsArr, (result) => {
            filterRevRetArr.filter = result;
            resolve(filterRevRetArr);
        });
    });
};

var revPersReadRevRelsSubjects_By_RelID_Serv = (revVarArgs) => {
    let filterRevRetArr = {
        filter: [],
    };

    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevRelsSubjects_By_RelID(revVarArgs, (result) => {
            filterRevRetArr.filter = result;
            resolve(filterRevRetArr);
        });
    });
};

var revPersReadRevRelsSubjects_By_RelID_Serv_EXPO = async (revVarArgs) => {
    let revRelsSubjectsFilterArr = await revPersReadRevRelsSubjects_By_RelID_Serv(revVarArgs);

    return revRelsSubjectsFilterArr;
};

var revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_Serv = (revTargetEntityGUID) => {
    let filterRevRetArr = {
        filter: [],
    };

    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID(revTargetEntityGUID, (result) => {
            filterRevRetArr.filter = result;
            resolve(filterRevRetArr);
        });
    });
};

var revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Serv = (revVarArgs) => {
    let filterRevRetArr = {
        filter: [],
    };

    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID(revVarArgs, (result) => {
            filterRevRetArr.filter = result;
            resolve(filterRevRetArr);
        });
    });
};

var revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Expo_Serv = async (revVarArgs) => {
    let revSubjectGUIDsArr = [];

    let revRelsSubjectsFilterArr = await revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Serv(revVarArgs);

    revRelsSubjectsFilterArr = revRelsSubjectsFilterArr.filter;

    for (let i = 0; i < revRelsSubjectsFilterArr.length; i++) {
        revSubjectGUIDsArr.push(revRelsSubjectsFilterArr[i].SUBJECT_GUID);
    }

    return revSubjectGUIDsArr;
};

var revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID_Serv = (revSubjectEntityGUID, revRevValId) => {
    let filterRevRetArr = {
        filter: [],
    };

    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID(revSubjectEntityGUID, revRevValId, (result) => {
            filterRevRetArr.filter = result;

            resolve(filterRevRetArr);
        });
    });
};

var revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID_Expo_Serv = async (revSubjectEntityGUID, revRevValId) => {
    let filterRevRetArr = {
        filter: [],
    };

    let revRelsGUIDsArr_DBRes = await revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID_Serv(revSubjectEntityGUID, revRevValId);
    revRelsGUIDsArr_DBRes = revRelsGUIDsArr_DBRes.filter;

    for (let i = 0; i < revRelsGUIDsArr_DBRes.length; i++) {
        let revTargetGUID = revRelsGUIDsArr_DBRes[i].TARGET_GUID;
        filterRevRetArr.filter.push(revTargetGUID);
    }

    return filterRevRetArr;
};

var revPersReadRevRels_Subjects_TypeId_By_RemoteRevEntityGUID_Serv = (revTargetEntityGUID) => {
    let filterRevRetArr = {
        filter: [],
    };

    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevRels_Subjects_TypeId_By_RemoteRevEntityGUID(revTargetEntityGUID, (result) => {
            filterRevRetArr.filter = result;
            resolve(filterRevRetArr);
        });
    });
};

var revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId_Serv = (revEntityGUID, revRelTypeValId) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId(revEntityGUID, revRelTypeValId, (revRetRelVals) => {
            resolve(revRetRelVals);
        });
    });
};

var revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId_EXPO_Serv = async (revEntityGUID, revRelTypeValId) => {
    let revRels = await revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId_Serv(revEntityGUID, revRelTypeValId);

    let revRelGUIDsArr = [];

    for (let i = 0; i < revRels.length; i++) {
        let revCurrRel = revRels[i];

        let revSubjectGUID = revCurrRel.SUBJECT_GUID;
        let revTargetGUID = revCurrRel.TARGET_GUID;

        let revGUID = revSubjectGUID == revEntityGUID ? revTargetGUID : revSubjectGUID;

        revRelGUIDsArr.push(revGUID);
    }

    return revRelGUIDsArr;
};

var revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId_serv = (remoteRevEntityGUID, revRelValId) => {
    let filterRevRetArr = {
        filter: [],
    };

    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId(remoteRevEntityGUID, revRelValId, (result) => {
            filterRevRetArr.filter = result;
            resolve(filterRevRetArr);
        });
    });
};

var revPersReadRels_Subjects_Targets_GUIDs_By_RemoteRevEntityGUID_RevRelValId_EXPO_serv = async (remoteRevEntityGUID, revRelValId) => {
    let filterRevRetArr = {
        filter: [],
    };

    let revRelsArr = await revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId_serv(remoteRevEntityGUID, revRelValId);
    revRelsArr = revRelsArr.filter;

    for (let i = 0; i < revRelsArr.length; i++) {
        let revCurrRel = revRelsArr[i];

        filterRevRetArr.filter.push({ "revRelTypeValueId": revCurrRel.RELATIONSHIP_TYPE_VALUE_ID, "revSubjectGUID": revCurrRel.SUBJECT_GUID, "revTargetGUID": revCurrRel.TARGET_GUID });
    }

    return filterRevRetArr;
};

var revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_serv = (remoteRevEntityGUID) => {
    let filterRevRetArr = {
        filter: [],
    };

    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID(remoteRevEntityGUID, (result) => {
            filterRevRetArr.filter = result;
            resolve(filterRevRetArr);
        });
    });
};

var revPersReadRevEntityRelIds_By_ResStatus_SubjectGUID_Serv = (revResStatus, revSubjectGUID) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRelIds_By_ResStatus_SubjectGUID(revResStatus, revSubjectGUID, (revRelIds) => {
            resolve(revRelIds);
        });
    });
};

var revPersReadNewRevEntityRelsTargetsByRemoteRevEntityGUIDServ = (remoteRevEntityGUID) => {
    return new Promise(function (resolve, reject) {
        let filterRevRetArr = {
            filter: [],
        };

        rev_pers_read_rev_entity_relationship_accessor.revPersReadNewRevEntityRelsTargetsByRemoteRevEntityGUID(remoteRevEntityGUID, (result) => {
            filterRevRetArr.filter = result;
            resolve(filterRevRetArr);
        });
    });
};

var revPersReadRevEntityRels_By_TargetRevEntityGUID_Serv = (revVarArgs) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRels_By_TargetRevEntityGUID(revVarArgs, (result) => {
            let filterRevRetArr = {
                filter: [],
            };

            for (let i = 0; i < result.length; i++) {
                let revResolveRel = rev_db_rels_const_resolver.revFillRevRel(result[i]);
                filterRevRetArr.filter.push(revResolveRel);
            }

            resolve(filterRevRetArr);
        });
    });
};

var revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelIdServ = async (remoteRevEntityGUID, revRelId) => {
    let revPersReadAccessorPromiseCallArr = await new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelId(remoteRevEntityGUID, revRelId, (revDbRelGUIDsRes) => {
            resolve(revDbRelGUIDsRes);
        });
    });

    var revRetRelGUIDsArrDef = {
        filter: [],
    };

    for (let i = 0; i < revPersReadAccessorPromiseCallArr.length; i++) {
        revRetRelGUIDsArrDef.filter.push(revPersReadAccessorPromiseCallArr[i].SUBJECT_GUID);
    }

    return revRetRelGUIDsArrDef;
};

var revPersReadRevEntityRelsSubjectGUIDs_By_OwnerGUID_RevTargetGUID_RevRelId_Serv = async (revRelOwnerGUID, remoteRevEntityGUID, revRelId) => {
    let revPersReadAccessorPromiseCallArr = await new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRelsSubjectGUIDs_By_OwnerGUID_RevTargetGUID_RevRelId(revRelOwnerGUID, remoteRevEntityGUID, revRelId, (revDbRelGUIDsRes) => {
            resolve(revDbRelGUIDsRes);
        });
    });

    var revRetRelGUIDsArrDef = {
        filter: [],
    };

    for (let i = 0; i < revPersReadAccessorPromiseCallArr.length; i++) {
        revRetRelGUIDsArrDef.filter.push(revPersReadAccessorPromiseCallArr[i].SUBJECT_GUID);
    }

    return revRetRelGUIDsArrDef;
};

var revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId_Serv = async (revSubjectGUID, revRelId) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId(revSubjectGUID, revRelId, (revDbRelTargetGUID) => {
            resolve(revDbRelTargetGUID);
        });
    });
};

var revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId_Serv = (revEntityTargetGUID, revRelId) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId(revEntityTargetGUID, revRelId, (revSubjectGUID) => {
            resolve(revSubjectGUID);
        });
    });
};

var promiseToGetUnresolvedRevEntityRel_ID_Serv = (revEntitySubjectGUID, revEntityTargetGUID) => {
    return new Promise(function (resolve, reject) {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadRevEntityRel_Id_By_revEntitySubjectGUID_TargetGUID(revEntitySubjectGUID, revEntityTargetGUID, (revRelId) => {
            resolve(revRelId);
        });
    });
};

var revPersReadAllRevEntityRelsGUIDs_By_RevEntityGUID_RevRelIds_Serv = (remoteRevEntityGUID, relValueIds) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadAllRevEntityRelsGUIDs_By_RevEntityGUID_RevRelId(remoteRevEntityGUID, relValueIds, (revRes) => {
            resolve(revRes);
        });
    });
};

var revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds_Serv = (revRelGUIDs, revRelIdsArr) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds(revRelGUIDs, revRelIdsArr, (revRes) => {
            resolve(revRes);
        });
    });
};

var revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds_Serv_EXPO = async (revRelGUIDs, revRelIdsArr) => {
    let revDBResRelsArr = await revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds_Serv(revRelGUIDs, revRelIdsArr);

    let revRelsArr = [];

    for (let i = 0; i < revDBResRelsArr.length; i++) {
        revRelsArr.push(rev_db_rels_const_resolver.revFillRevRel(revDBResRelsArr[i]));
    }

    return revRelsArr;
};

var revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelId_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_relationship_accessor.revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelId(revVarArgs, (revRes) => {
            resolve(revRes);
        });
    });
};

var revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelIdsArr_EXPO_Serv = async (revVarArgs) => {
    let revDBResRelsArr = await revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelId_Serv(revVarArgs);

    let revRelsArr = [];

    for (let i = 0; i < revDBResRelsArr.length; i++) {
        revRelsArr.push(rev_db_rels_const_resolver.revFillRevRel(revDBResRelsArr[i]));
    }

    return revRelsArr;
};

module.exports.revGetRelationshipTypeValId = revGetRelationshipTypeValId;
module.exports.revGetRelationshipTypeVal = revGetRelationshipTypeVal;

module.exports.revCountRels_By_TargetGUID_RelValId_Serv = revCountRels_By_TargetGUID_RelValId_Serv;
module.exports.revCountRels_By_SubjectGUID_RelValId_Serv = revCountRels_By_SubjectGUID_RelValId_Serv;

module.exports.revPersReadRelId_RelSubjectGUID_RelTargetGUID_CreationDate_Serv = revPersReadRelId_RelSubjectGUID_RelTargetGUID_CreationDate_Serv;

module.exports.revPersReadRevRelsSubjects_By_RelID_Serv = revPersReadRevRelsSubjects_By_RelID_Serv;
module.exports.revPersReadRevRelsSubjects_By_RelID_Serv_EXPO = revPersReadRevRelsSubjects_By_RelID_Serv_EXPO;
module.exports.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_Serv = revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_Serv;
module.exports.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Serv = revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Serv;
module.exports.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Expo_Serv = revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Expo_Serv;

module.exports.revPersReadRevRels_Subjects_TypeId_By_RemoteRevEntityGUID_Serv = revPersReadRevRels_Subjects_TypeId_By_RemoteRevEntityGUID_Serv;

module.exports.revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID_Serv = revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID_Serv;
module.exports.revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID_Expo_Serv = revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID_Expo_Serv;

module.exports.revPersRelExists_By_RevEntityGUIDs_RevRelValId_Serv = revPersRelExists_By_RevEntityGUIDs_RevRelValId_Serv;
module.exports.revPersReadRevEntityRelId_By_SubjectGUID_TargetGUID_RevRelValId_Serv = revPersReadRevEntityRelId_By_SubjectGUID_TargetGUID_RevRelValId_Serv;
module.exports.revPersReadRevEntityRels_By_RemoteRevEntityGUIDServ = revPersReadRevEntityRels_By_RemoteRevEntityGUIDServ;
module.exports.revPersRead_ID_SUBJET_GUID_TARGET_GUID_By_RemoteRevEntityGUID_Serv = revPersRead_ID_SUBJET_GUID_TARGET_GUID_By_RemoteRevEntityGUID_Serv;
module.exports.revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId_Serv = revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId_Serv;
module.exports.revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId_EXPO_Serv = revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId_EXPO_Serv;

module.exports.revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId_serv = revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId_serv;
module.exports.revPersReadRels_Subjects_Targets_GUIDs_By_RemoteRevEntityGUID_RevRelValId_EXPO_serv = revPersReadRels_Subjects_Targets_GUIDs_By_RemoteRevEntityGUID_RevRelValId_EXPO_serv;
module.exports.revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_serv = revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_serv;

module.exports.promiseToGetUnresolvedRevEntityRel_ID_Serv = promiseToGetUnresolvedRevEntityRel_ID_Serv;
module.exports.revPersReadNewRevEntityRelsTargetsByRemoteRevEntityGUIDServ = revPersReadNewRevEntityRelsTargetsByRemoteRevEntityGUIDServ;
module.exports.revPersReadRevEntityRels_By_TargetRevEntityGUID_Serv = revPersReadRevEntityRels_By_TargetRevEntityGUID_Serv;

module.exports.revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId_Serv = revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId_Serv;
module.exports.revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelIdServ = revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelIdServ;
module.exports.revPersReadRevEntityRelsSubjectGUIDs_By_OwnerGUID_RevTargetGUID_RevRelId_Serv = revPersReadRevEntityRelsSubjectGUIDs_By_OwnerGUID_RevTargetGUID_RevRelId_Serv;
module.exports.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId_Serv = revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId_Serv;
module.exports.revPersReadAllRevEntityRelsGUIDs_By_RevEntityGUID_RevRelIds_Serv = revPersReadAllRevEntityRelsGUIDs_By_RevEntityGUID_RevRelIds_Serv;

module.exports.revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds_Serv = revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds_Serv;
module.exports.revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds_Serv_EXPO = revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds_Serv_EXPO;

module.exports.revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelId_Serv = revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelId_Serv;
module.exports.revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelIdsArr_EXPO_Serv = revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelIdsArr_EXPO_Serv;

module.exports.revPersReadRevEntityRelIds_By_ResStatus_SubjectGUID_Serv = revPersReadRevEntityRelIds_By_ResStatus_SubjectGUID_Serv;
