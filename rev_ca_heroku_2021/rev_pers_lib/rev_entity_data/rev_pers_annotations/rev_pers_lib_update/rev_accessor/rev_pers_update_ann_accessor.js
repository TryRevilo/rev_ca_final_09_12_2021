const rev_db_init = require('../../../../rev_db_init/rev_db_init');

function revPersMultiUpdateAnnValue_By_AnnId(revAnnsArr, callback) {
    let revToDoDataArr = [];
    let revValsArr = [];

    for (let i = 0; i < revAnnsArr.length; i++) {
        let revAnnId = revAnnsArr[i]._revAnnotationRemoteId;
        let _revAnnotationValue = revAnnsArr[i]._revAnnotationValue;

        revToDoDataArr.push(revAnnId);
        revToDoDataArr.push(_revAnnotationValue);
        revToDoDataArr.push(new Date().getTime());

        revValsArr.push(['(?, ?)']);
    }

    let revSQL = `INSERT INTO REV_ENTITY_ANNOTATIONS_TABLE (ANNOTATION_ID, ANNOTATION_VALUE) VALUES ${revValsArr.join(',')}
    ON DUPLICATE KEY UPDATE ANNOTATION_ID=VALUES(ANNOTATION_ID), ANNOTATION_VALUE=VALUES(ANNOTATION_VALUE);`

    rev_db_init.getRevConnection(connection => {
        connection.query(revSQL, revToDoDataArr, function (err, result) {
            if (err) {
                console.log('ERR -> revPersMultiUpdateAnnValue_By_AnnId -> ' + err.message);
            } else {
                callback(result.affectedRows);
            }

            connection.release();
        });
    });
}


module.exports.revPersMultiUpdateAnnValue_By_AnnId = revPersMultiUpdateAnnValue_By_AnnId;
