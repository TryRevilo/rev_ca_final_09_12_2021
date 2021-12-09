const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revPersDeleteAnn_By_AnnId_Multi(revAnnIdsArr, callback) {
    let revINOptions = "";

    for (let i = 0; i < revAnnIdsArr.length; i++) {
        if (i === 0) {
            revINOptions += "IN (?";
        } else {
            revINOptions += ", ?";
        }

        if (i == revAnnIdsArr.length - 1) revINOptions += ")";
    }

    if (revINOptions.localeCompare("") == 0) {
        callback([]);
        return;
    }

    var stmt = "DELETE FROM REV_ENTITY_ANNOTATIONS_TABLE WHERE ANNOTATION_ID " + revINOptions;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revAnnIdsArr, function (err, result, fields) {
            if (err) {
                console.log("ERR -> revPersDeleteAnn_By_AnnId_Multi -> " + err.message);
                callback(-1);
            } else {
                callback(result.affectedRows);
            }
        });

        connection.release();
    });
}

module.exports.revPersDeleteAnn_By_AnnId_Multi = revPersDeleteAnn_By_AnnId_Multi;
