const rev_strings_helper_funcs = require("../../../../../../rev_helper_functions/rev_strings_helper_funcs");

const rev_db_init = require("../../../../../rev_db_init/rev_db_init");

function revPersSaveRevEntityMetadata(revEntityGUID, revData, callback) {
    if (!revEntityGUID || revEntityGUID < 1) {
        revEntityGUID = revData.revEntityGUID;

        if (!revEntityGUID || revEntityGUID < 1) {
            callback(-1);
            return;
        }
    }

    if (revData == null || revData._revMetadataName == null || !revData._revMetadataName.trim() || (rev_strings_helper_funcs.revIsEmptyVar(revData._metadataValue) && revData._metadataValue !== 0)) {
        callback({ "metadataId": -1 });
        return;
    }

    let stmt = "INSERT INTO REV_ENTITY_METADATA_TABLE (REV_ENTITY_GUID, METADATA_NAME, METADATA_VALUE, REV_CREATED_DATE, REV_PUBLISHED_DATE) VALUES(?, ?, ?, ?, ?)";

    let revTimeCreated = new Date().getTime();

    if (revData["_revTimeCreated"] && revData["_revTimeCreated"] > 0) {
        revTimeCreated = revData["_revTimeCreated"];
    }

    let revTimePublished = new Date().getTime();

    let todo = [revEntityGUID, revData._revMetadataName, revData._metadataValue, revTimeCreated, revTimePublished];

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, res) {
            if (err) {
                console.log("revData : " + JSON.stringify(revData));
                console.log("ERR -> revPersSaveRevEntityMetadata -> " + err.message);
                callback(-1);
            } else {
                callback({ "metadataId": res.insertId, "_revTimePublished": revTimePublished });
            }

            connection.release();
        });
    });
}

module.exports.revPersSaveRevEntityMetadata = revPersSaveRevEntityMetadata;
