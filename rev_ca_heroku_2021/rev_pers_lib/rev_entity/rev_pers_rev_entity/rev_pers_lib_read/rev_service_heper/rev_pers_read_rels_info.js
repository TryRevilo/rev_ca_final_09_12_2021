const rev_pers_read_rev_entity_relationship_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");
const rev_pers_read_rev_entity_service_helper = require("./rev_pers_read_rev_entity_service_helper");
const rev_db_entity_const_resolver = require("../../rev_db_models/rev_db_entity_const_resolver");
const rev_db_rels_const_resolver = require("../../../../rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");
const rev_pers_read_rev_entity_info_wrapper = require("./rev_pers_read_rev_entity_info_wrapper");

var revPersReadrelsInfo = async (revEntityGUID, revRelTypeValId) => {
    let filterRevRetArr = { filter: [] };

    let revRelVals = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId_Serv(revEntityGUID, revRelTypeValId, (revRetRelVals) => {
        revRelVals = revRetRelVals;
    });

    for (let i = 0; i < revRelVals.length; i++) {
        let revRelVal = revRelVals[i];

        let revSubjectGUID = revRelVal.SUBJECT_GUID;
        let revTargetGUID = revRelVal.TARGET_GUID;

        let _remoteRevEntityGUID = revSubjectGUID == revEntityGUID ? revTargetGUID : revSubjectGUID;

        let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(_remoteRevEntityGUID);

        let revEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);

        filterRevRetArr.filter.push({
            _remoteRevEntityGUID: _remoteRevEntityGUID,
            revEntity: revEntity,
            revEntityInfo: await rev_pers_read_rev_entity_info_wrapper.getRevEntityInfo_Serv(_remoteRevEntityGUID),
            revRel: rev_db_rels_const_resolver.revFillRevRel(revRelVal),
        });
    }
};

module.exports.revPersReadrelsInfo = revPersReadrelsInfo;
