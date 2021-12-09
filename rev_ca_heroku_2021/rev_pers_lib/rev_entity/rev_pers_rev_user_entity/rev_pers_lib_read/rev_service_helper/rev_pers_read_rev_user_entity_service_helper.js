const rev_pers_read_rev_user_entity_accessor = require("../rev_accessor/rev_pers_read_rev_user_entity_accessor");
const rev_db_user_entity_const_resolver = require("../../rev_db_models/rev_db_user_entity_const_resolver");

var revPersReadRevUserEntity_By_RemoteRevEntityGUID_Serv = remoteRevEntityOwnerGUID => {
  return new Promise(function(resolve, reject) {
    rev_pers_read_rev_user_entity_accessor.revPersReadRevUserEntityByRevEntityGUID(
      remoteRevEntityOwnerGUID,
      result => {
        resolve(result[0]);
      }
    );
  });
};

var revPersReadRevUserEntityExistsByUserName_Serv = revUserEntityUniqueRep => {
  return new Promise(function(resolve, reject) {
    rev_pers_read_rev_user_entity_accessor.revPersUserRevEntityExists(
      revUserEntityUniqueRep,
      result => {
        resolve(result);
      }
    );
  });
};

var revPersReadRevUserEntityByRevUserEntityUserName_EMAIL_PHONENUMBER_Serv = revUserEntityUniqueRep => {
  return new Promise(function(resolve, reject) {
    rev_pers_read_rev_user_entity_accessor.revPersReadRevUserEntityByRevUserEntityUserName_EMAIL_PHONENUMBER(
      revUserEntityUniqueRep,
      result => {
        resolve(
          rev_db_user_entity_const_resolver.revUserEntityFillerResolver(result)
        );
      }
    );
  });
};

var revPersReadFullRevUserEntityByRevUserEntityBy_EMAIL_PHONENUMBER_Serv = revUserEntityUniqueRep => {
  return new Promise(function(resolve, reject) {
    rev_pers_read_rev_user_entity_accessor.revPersReadRevUserEntityGUID_By_EMAIL_PHONENUMBER(
      revUserEntityUniqueRep,
      result => {
        resolve(
          rev_db_user_entity_const_resolver.revUserEntityFullFiller_Serv(
            result.REV_ENTITY_GUID
          )
        );
      }
    );
  });
};

module.exports.revPersReadRevUserEntityExistsByUserName_Serv = revPersReadRevUserEntityExistsByUserName_Serv;
module.exports.revPersReadFullRevUserEntityByRevUserEntityBy_EMAIL_PHONENUMBER_Serv = revPersReadFullRevUserEntityByRevUserEntityBy_EMAIL_PHONENUMBER_Serv;
module.exports.revPersReadRevUserEntity_By_RemoteRevEntityGUID_Serv = revPersReadRevUserEntity_By_RemoteRevEntityGUID_Serv;
module.exports.revPersReadRevUserEntityByRevUserEntityUserName_EMAIL_PHONENUMBER_Serv = revPersReadRevUserEntityByRevUserEntityUserName_EMAIL_PHONENUMBER_Serv;
