const rev_db_init = require("../../../../../rev_db_init/rev_db_init");

function revPersSaveRevEntityAnnotation(revData, callback) {
  let filterRevRetArr = {
    filter: []
  };

  if (!revData || (revData.length < 1)) {
    callback(filterRevRetArr);
    return;
  }

  let stmt =
    "INSERT INTO REV_ENTITY_ANNOTATIONS_TABLE" +
    "(" +
    "REV_RESOLVE_STATUS," +
    "ANNOTATION_NAME_ID," +
    "ANNOTATION_VALUE," +
    "REV_ENTITY_GUID," +
    "REV_ENTITY_OWNER_GUID," +
    "CREATED_DATE," +
    "UPDATED_DATE) " +
    `VALUES ?`;

  let todo = [];

  revData.forEach(revAnnElement => {
    let revAnnRemoteOwnerEntityGUID = revAnnElement._revAnnRemoteOwnerEntityGUID;
    let revAnnotationResStatus = revAnnElement._revAnnotationResStatus;
    let revAnnotationNameId = revAnnElement._revAnnotationNameId;
    let revAnnotationValue = revAnnElement._revAnnotationValue;
    let revAnnotationRemoteEntityGUID = revAnnElement._revAnnotationRemoteEntityGUID;

    if (!revAnnRemoteOwnerEntityGUID || (revAnnotationNameId < 0) || !revAnnotationRemoteEntityGUID) {
      console.log(`RET ERR -> 
      revAnnRemoteOwnerEntityGUID : ${revAnnRemoteOwnerEntityGUID} 
      revAnnotationResStatus : ${revAnnotationResStatus} 
      revAnnotationNameId : ${revAnnotationNameId} 
      revAnnotationValue : ${revAnnotationValue}
      revAnnotationRemoteEntityGUID : ${revAnnotationRemoteEntityGUID}`);
      return;
    }

    todo.push([
      revAnnotationResStatus,
      revAnnotationNameId,
      revAnnotationValue,
      revAnnotationRemoteEntityGUID,
      revAnnRemoteOwnerEntityGUID,
      new Date().getTime(),
      0,
    ]);
  });

  rev_db_init.getRevConnection(connection => {
    connection.query(stmt, [todo], function (err, res) {
      if (err) {
        console.log('ERR -> revPersSaveRevEntityAnnotation -> ' + err.message);
        callback(-1);
      } else {
        for (let i = 0; i < revData.length; i++) {
          filterRevRetArr.filter.push({
            _revAnnotationId: revData[i]._revAnnotationId,
            _revAnnotationRemoteId: res.insertId + i
          });
        }

        callback(filterRevRetArr);
      }

      connection.release();
    });
  });
}

module.exports.revPersSaveRevEntityAnnotation = revPersSaveRevEntityAnnotation;
