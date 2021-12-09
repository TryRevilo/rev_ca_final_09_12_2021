const rev_pers_update_rel_resolve_status_accessor = require("../rev_accessor/rev_pers_update_rel_resolve_status_accessor");

var filterRevRetArr = {
    filter: [],
};

var revSetRelResStatusServ = (_revResStatus, revRelId) => {
    return new Promise((resolve, reject) => {
        rev_pers_update_rel_resolve_status_accessor.revPersUpdateRevEntityRelAcceptedAcce(_revResStatus, revRelId, (result) => {
            let revResStatus = -1;
            if (result["affectedRows"] == 1) {
                revResStatus = _revResStatus;
            }

            resolve({
                _revResolveStatus: revResStatus,
                _remoteRevEntityRelationshipId: revRelId,
            });
        });
    });
};

var syncNewRevRelCollection = async (arr) => {
    await arr.reduce((promise, item) => {
        return promise
            .then(async () => {
                return await revSetRelResStatusServ(item["_revResolveStatus"], item["_remoteRevEntityRelationshipId"]);
            })
            .catch(console.error);
    }, Promise.resolve());
};

var revPersUpdateRevEntityRelAcceptedServiceArrayService = (revEntitiesRelationships, callback) => {
    syncNewRevRelCollection(revEntitiesRelationships).then(() => {
        callback(filterRevRetArr);
    });
};

module.exports.revPersUpdateRevEntityRelAcceptedServiceArrayService = revPersUpdateRevEntityRelAcceptedServiceArrayService;
module.exports.revSetRelResStatusServ = revSetRelResStatusServ;
