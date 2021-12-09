const rev_pers_read_rev_group_entity_service_helper = require("../rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_group_entity_service_helper");

var revGroupEntityFillerResolver = revGroupEntityDBRes => {
  let revGroupEntityJSONConst = {};

  revGroupEntityJSONConst.name = revGroupEntityDBRes.REV_GROUP_ENTITY_NAME;
  revGroupEntityJSONConst.description =
    revGroupEntityDBRes.REV_GROUP_ENTITY_DESCRIPTION;

  return revGroupEntityJSONConst;
};

var revGroupEntityFiller_Serv = async remoteRevEntityGUID => {
  return await rev_pers_read_rev_group_entity_service_helper
    .revPersReadRevGroupEntity_By_RemoteRevEntityGUID_Serv(remoteRevEntityGUID)
    .then(result => {
      return revGroupEntityFillerResolver(result[0]);
    });
};

module.exports.revGroupEntityFiller_Serv = revGroupEntityFiller_Serv;
