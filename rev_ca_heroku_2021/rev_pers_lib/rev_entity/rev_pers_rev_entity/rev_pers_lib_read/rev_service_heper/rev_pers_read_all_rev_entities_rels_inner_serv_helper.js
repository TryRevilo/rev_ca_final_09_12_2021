const rev_pers_read_rev_entity_service_helper = require("./rev_pers_read_rev_entity_service_helper");
const rev_db_entity_const_resolver = require("../../rev_db_models/rev_db_entity_const_resolver");
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../../rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");

var filterRevRetArr = {
  filter: []
};

var revPersRead_All_Entities_Rels_Inner_serv = async (
  reqParamsRevEntityGUID,
  relValIdsArr
) => {
  let relRevEntityGUIDs = [];

  let revRels = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadAllRevEntityRelsGUIDs_By_RevEntityGUID_RevRelIds_Serv(
    reqParamsRevEntityGUID,
    relValIdsArr
  );

  await revRels.reduce((previousPromise, nextId) => {
    return previousPromise.then(() => {
      return new Promise((resolve, reject) => {
        if (
          !relRevEntityGUIDs.includes(nextId.SUBJECT_GUID) &&
          !relRevEntityGUIDs.includes(nextId.TARGET_GUID)
        ) {
          reqParamsRevEntityGUID == nextId
            ? relRevEntityGUIDs.push(nextId.TARGET_GUID)
            : relRevEntityGUIDs.push(nextId.SUBJECT_GUID);
        }

        resolve();
      });
    });
  }, Promise.resolve());

  filterRevRetArr[
    "revRelatedEntities"
  ] = await rev_db_entity_const_resolver.revPersReadRevEntityFiller_BY_RemoteRevEntityGUIDsServ(
    relRevEntityGUIDs
  );

  let revEntityRels = [];

  for (var i = 0; i < revRels.length; i++) {
    let revRel = revRels[i];
    let filledRevRel = rev_db_rels_const_resolver.revRelFiller(revRel);
    revEntityRels.push(filledRevRel);
  }

  filterRevRetArr["filledRevRel"] = revEntityRels;

  let filledRelEntities = await rev_db_entity_const_resolver.revPersReadRevEntityFiller_BY_RemoteRevEntityGUIDsServ(
    relRevEntityGUIDs
  );

  filterRevRetArr["filledRelEntities"] = filledRelEntities;

  return filterRevRetArr;
};

module.exports.revPersRead_All_Entities_Rels_Inner_serv = revPersRead_All_Entities_Rels_Inner_serv;
