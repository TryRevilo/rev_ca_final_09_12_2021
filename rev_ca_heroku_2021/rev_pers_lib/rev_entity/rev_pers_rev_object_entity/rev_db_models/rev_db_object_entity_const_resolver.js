const rev_pers_read_rev_object_entity_service_helper = require("../../rev_pers_rev_object_entity/rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_object_entity_service_helper");

var revObjectEntityFillerResolver = revObjectEntityDBRes => {
  let revObjectEntityJSONConst = {};

  revObjectEntityJSONConst["_revObjectName"] =
    revObjectEntityDBRes.REV_OBJECT_NAME;
  revObjectEntityJSONConst["_revObjectDescription"] =
    revObjectEntityDBRes.REV_OBJECT_DESCRIPTION;

  return revObjectEntityJSONConst;
};

var revObjectEntityFiller_Serv = async remoteRevEntityGUID => {
  return await rev_pers_read_rev_object_entity_service_helper
    .revPersReadRevObjectEntity_By_RemoteRevEntityGUID_Serv(remoteRevEntityGUID)
    .then(result => {
      return revObjectEntityFillerResolver(result[0]);
    });
};

module.exports.revObjectEntityFiller_Serv = revObjectEntityFiller_Serv;
