const rev_db_init = require("../../../../rev_db_init/rev_db_init");
const rev_pers_read_rev_object_entity_service_helper = require("../../rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_object_entity_service_helper");

function revPersSaveRevObjectEntity(revData, callback) {
  let stmt =
    "INSERT INTO REV_OBJECT_ENTITY_TABLE (\n" +
    "REV_ENTITY_GUID, \n" +
    "OWNER_ENTITY_GUID, \n" +
    "ENTITY_CONTAINER_GUID, \n" +
    "REV_OBJECT_NAME, \n" +
    "REV_OBJECT_DESCRIPTION, \n" +
    "CREATED_DATE, \n" +
    "UPDATED_DATE\n" +
    " ) \n" +
    `VALUES(?, ?, ?, ?, ?, ?, ?)`;

  let todo = [
    revData["_remoteRevEntityGUID"],
    revData["_revEntityOwnerGUID"],
    revData["_revEntityContainerGUID"],
    revData["revObjectEntity"]._revObjectName,
    revData["revObjectEntity"]._revObjectDescription,
    revData["_timeCreated"],
    revData["_timeUpdated"]
  ];

  rev_db_init.getRevConnection(connection => {
    return new Promise((resolve, reject) => {
      connection.query(stmt, todo, function(err, res) {
        if (err) {
          return "insertData " + err.message;
        }
        resolve(res.insertId);
      });

      connection.release();
    }).then(insertIdResult => {
      rev_pers_read_rev_object_entity_service_helper.revPersReadRevObjectEntity_By_RemoteRevEntityGUID_Serv(
        insertIdResult,
        function(result) {
          callback(result);
        }
      );
    });
  });
}

module.exports.revPersSaveRevObjectEntity = revPersSaveRevObjectEntity;
