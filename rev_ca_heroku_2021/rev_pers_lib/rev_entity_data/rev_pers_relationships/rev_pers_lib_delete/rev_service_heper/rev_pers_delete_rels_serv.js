const rev_pers_delete_rels = require("../rev_accessor/rev_pers_delete_rels");

var revPersDeleteRel_By_revRelId_Serv = (revRelId) => {
    return new Promise((res, rej) => {
        rev_pers_delete_rels.revPersDeleteRel_By_revRelId(revRelId, (revRes) => {
            res(revRes);
        });
    });
};

var revPersDeleteRel_By_revRelIdaArr_Serv = (revRelIdsArr) => {
    return new Promise((res, rej) => {
        rev_pers_delete_rels.revPersDeleteRel_By_revRelIdaArr(revRelIdsArr, (revRes) => {
            res(revRes);
        });
    });
};

var revPersDeleteRel_By_revRelValId_EntityGUIDs_Serv = (relTypeValId, revEntityGUIDsArr) => {
    return new Promise((res, rej) => {
        rev_pers_delete_rels.revPersDeleteRel_By_revRelValId_EntityGUIDs(relTypeValId, revEntityGUIDsArr, (revRes) => {
            res(revRes);
        });
    });
};

var revPersDeleteRels_By_remoteRevEntityGUID_Serv = (revEntityGUIDsArr) => {
    return new Promise((res, rej) => {
        rev_pers_delete_rels.revPersDeleteRels_By_remoteRevEntityGUID(revEntityGUIDsArr, (revRes) => {
            res(revRes);
        });
    });
};

module.exports.revPersDeleteRel_By_revRelId_Serv = revPersDeleteRel_By_revRelId_Serv;
module.exports.revPersDeleteRel_By_revRelIdaArr_Serv = revPersDeleteRel_By_revRelIdaArr_Serv;
module.exports.revPersDeleteRel_By_revRelValId_EntityGUIDs_Serv = revPersDeleteRel_By_revRelValId_EntityGUIDs_Serv;
module.exports.revPersDeleteRels_By_remoteRevEntityGUID_Serv = revPersDeleteRels_By_remoteRevEntityGUID_Serv;
