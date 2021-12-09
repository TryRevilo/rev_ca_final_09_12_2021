const rev_pers_rev_entity_relationship_accessor = require("../rev_accessor/rev_pers_rev_entity_relationship_accessor");
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");

var revPersSaveRevRelItem_serv = (revData) => {
    if (!revData || !revData._remoteRevEntitySubjectGUID || !revData._remoteRevEntityTargetGUID) {
        console.log("!revData || !revData._remoteRevEntitySubjectGUID || !revData._remoteRevEntityTargetGUID");
        console.log("revData : " + JSON.stringify(revData));

        resolve(null);
        return null;
    }

    return new Promise(function (resolve, reject) {
        rev_pers_rev_entity_relationship_accessor.revPersSaveRevEntityRelationship(revData, function (result) {
            resolve(result);
        });
    });
};

var createNewRevEntitiesRelationshipsArrayService = async (arr, callback) => {
    let filterRevRetArr = {
        filter: [],
    };

    if (!Array.isArray(arr) || arr.length < 1) {
        if (callback) {
            callback(filterRevRetArr);
        }

        return filterRevRetArr;
    }

    let revNewRelsPromise = arr.reduce((accumulatorPromise, item) => {
        return accumulatorPromise.then(() => {
            return new Promise(async (resolve, reject) => {
                if (!item || !item._remoteRevEntitySubjectGUID || !item._remoteRevEntityTargetGUID || !item._revEntityRelationshipType) {
                    console.log("ERR -> item : " + JSON.stringify(item));

                    resolve();
                    return;
                }

                let revSubjectEntityGUID = item._remoteRevEntitySubjectGUID;
                let revTargetEntityGUID = item._remoteRevEntityTargetGUID;
                let revRelType = item._revEntityRelationshipType;

                let revRelTypeId = rev_pers_read_rev_entity_relationship_service_helper.revGetRelationshipTypeValId(revRelType);

                let revEntityRelExista = await rev_pers_read_rev_entity_relationship_service_helper.revPersRelExists_By_RevEntityGUIDs_RevRelValId_Serv({
                    "revSubjectGUID": revSubjectEntityGUID,
                    "revTargetGUID": revTargetEntityGUID,
                    "revRevValId": revRelTypeId,
                });

                if (!revEntityRelExista || revEntityRelExista < 1) {
                    let result = await revPersSaveRevRelItem_serv(item);
                    filterRevRetArr.filter.push(result);
                } else {
                    let revResolveStatus = item._revResolveStatus;

                    let revEntitySubjectGUID = item._revEntitySubjectGUID;
                    let remoteRevEntitySubjectGUID = item._remoteRevEntitySubjectGUID;
                    let revEntityTargetGUID = item._remoteRevEntityTargetGUID;
                    let remoteRevEntityTargetGUID = item._remoteRevEntityTargetGUID;

                    let result = await rev_pers_read_rev_entity_relationship_service_helper.promiseToGetUnresolvedRevEntityRel_ID_Serv(remoteRevEntitySubjectGUID, remoteRevEntityTargetGUID);
                    filterRevRetArr.filter.push({
                        _revResolveStatus: revResolveStatus,
                        _revEntitySubjectGUID: revEntitySubjectGUID,
                        _remoteRevEntitySubjectGUID: remoteRevEntitySubjectGUID,
                        _revEntityTargetGUID: revEntityTargetGUID,
                        _remoteRevEntityTargetGUID: remoteRevEntityTargetGUID,
                        _revEntityRelationshipType: item._revEntityRelationshipType,
                        _revEntityRelationshipId: item._revEntityRelationshipId,
                        _revEntityRelationshipRemoteId: result,
                    });
                }

                resolve();
            });
        });
    }, Promise.resolve());

    await revNewRelsPromise;

    if (callback) {
        callback(filterRevRetArr);
    } else {
        return filterRevRetArr;
    }
};

module.exports.revPersSaveRevRelItem_serv = revPersSaveRevRelItem_serv;
module.exports.createNewRevEntitiesRelationshipsArrayService = createNewRevEntitiesRelationshipsArrayService;
