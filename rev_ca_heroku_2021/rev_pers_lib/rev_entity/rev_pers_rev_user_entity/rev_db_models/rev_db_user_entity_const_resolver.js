const rev_pers_read_rev_user_entity_service_helper = require("../rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_user_entity_service_helper");

var revUserEntityFillerResolver = revUserEntityDBRes => {
  let revUserEntityJSONConst = {};

  revUserEntityJSONConst._email = revUserEntityDBRes.COLUMN_NAME_REV_USER_EMAIL;
  revUserEntityJSONConst._fullNames =
    revUserEntityDBRes.COLUMN_NAME_REV_USER_FULL_NAMES;

  return revUserEntityJSONConst;
};

var revUserEntityFullFillerResolver = revUserEntityDBRes => {
  let revUserEntityJSONConst = {};

  revUserEntityJSONConst._remoteRevEntityGUID =
    revUserEntityDBRes.REV_ENTITY_GUID;
  revUserEntityJSONConst._email = revUserEntityDBRes.COLUMN_NAME_REV_USER_EMAIL;
  revUserEntityJSONConst._fullNames =
    revUserEntityDBRes.COLUMN_NAME_REV_USER_FULL_NAMES;
  revUserEntityJSONConst._revCreatedDate = revUserEntityDBRes.CREATED_DATE;
  revUserEntityJSONConst._revUpdatedDate = revUserEntityDBRes.UPDATED_DATE;

  return revUserEntityJSONConst;
};

var revUserEntityFullFiller_Serv = async remoteRevEntityGUID => {
  return await rev_pers_read_rev_user_entity_service_helper
    .revPersReadRevUserEntity_By_RemoteRevEntityGUID_Serv(remoteRevEntityGUID)
    .then(result => {
      return revUserEntityFullFillerResolver(result);
    });
};

module.exports.revUserEntityFillerResolver = revUserEntityFillerResolver;
module.exports.revUserEntityFullFiller_Serv = revUserEntityFullFiller_Serv;
