const rev_db_init = require("../../../../rev_db_init/rev_db_init");

let revMetadataValsArrFullTextSearch = (revMetadataValsArr, callback) => {
    let revTexts = "";

    for (let i = 0; i < revMetadataValsArr.length; i++) {
        let revCurrTxt = revMetadataValsArr[i];

        if (revCurrTxt.length < 3) {
            revCurrTxt = revCurrTxt + "*";
        }

        revCurrTxt = revCurrTxt.toLowerCase();

        if (i == 0) {
            revTexts = revTexts + revCurrTxt;
        } else {
            revTexts = revTexts + " " + revCurrTxt;
        }
    }

    let stmt = `SELECT * FROM REV_ENTITY_METADATA_TABLE WHERE MATCH(METADATA_VALUE) AGAINST('${revTexts}' IN BOOLEAN MODE)`;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, function (err, row) {
            if (err) {
                console.log("ERR -> revMetadataValsArrFullTextSearch -> " + err);
                callback([]);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
};

let revPersMetadataValueExists_By_MetadataName_MetadataValue = (revMetadataName, revMetadataValue, callback) => {
    let stmt = "SELECT REV_ENTITY_GUID FROM REV_ENTITY_METADATA_TABLE WHERE METADATA_NAME = ? AND METADATA_VALUE = ?";

    if (!revMetadataName || typeof revMetadataName !== "string" || !revMetadataValue || typeof revMetadataValue !== "string") {
        callback(-1);
        return;
    }

    let todo = [revMetadataName, revMetadataValue];

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("revMetadataName : " + revMetadataName + " revMetadataValue : " + revMetadataValue);

                console.log("ERR -> revPersMetadataValueExists_By_MetadataName_MetadataValue -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].REV_ENTITY_GUID);
                } else {
                    callback(-1);
                }
            }
        });
        connection.release();
    });
};

let revPersReadMetadataValuesArr_By_MetadataName_MetadataValue = (revMetadataName, revMetadataValue, callback) => {
    let stmt = "SELECT * FROM REV_ENTITY_METADATA_TABLE WHERE METADATA_NAME = ? AND METADATA_VALUE = ?";

    if (!revMetadataName || typeof revMetadataName !== "string" || !revMetadataValue || typeof revMetadataValue !== "string") {
        callback([-1]);
        return;
    }

    let todo = [revMetadataName, revMetadataValue];

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadMetadataValuesArr_By_MetadataName_MetadataValue -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    callback([-1]);
                }
            }
        });
        connection.release();
    });
};

function revPersReadMetadataID_By_CreationDate_MetadataEntityGUID(revData, callback) {
    let _revTimeCreated = revData._revTimeCreated;
    let revMetadataOwnerGUID = revData.revMetadataOwnerGUID;

    let todo = [revMetadataOwnerGUID, _revTimeCreated];
    var stmt = "SELECT METADATA_ID FROM REV_ENTITY_METADATA_TABLE WHERE REV_ENTITY_GUID = ? AND REV_CREATED_DATE = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadMetadataID_By_CreationDate_MetadataEntityGUID -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0]["METADATA_ID"]);
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

let revPersGetMetadataId_By_MetadataName_EntityGUID = (revMetadataName, revEntityGUID, callback) => {
    let stmt = "SELECT METADATA_ID FROM REV_ENTITY_METADATA_TABLE WHERE METADATA_NAME = ? AND REV_ENTITY_GUID = ?";

    let todo = [revMetadataName, revEntityGUID];

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersGetMetadataId_By_MetadataName_EntityGUID -> " + err.message);
                callback(-3);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].METADATA_ID);
                } else {
                    callback(-1);
                }
            }
        });
        connection.release();
    });
};

function revPersReadRevEntityMetadataOwnerGUID_By_UniqueId(revEntityUniqueId, callback) {
    let todo = [revEntityUniqueId];

    var stmt = "SELECT REV_ENTITY_GUID FROM REV_ENTITY_METADATA_TABLE WHERE METADATA_VALUE = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityMetadataOwnerGUID_By_UniqueId -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].REV_ENTITY_GUID);
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueIdsArr(revEntityUniqueIdsArr, callback) {
    let todo = [];

    var stmt = "SELECT REV_ENTITY_GUID FROM REV_ENTITY_METADATA_TABLE WHERE ";

    stmt += " METADATA_VALUE IN (";

    for (let i = 0; i < revEntityUniqueIdsArr.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ")";

    todo = todo.concat(revEntityUniqueIdsArr);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueId -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityMetadata_By_UniqueId(revEntityUniqueId, callback) {
    let todo = [revEntityUniqueId];

    var stmt = "SELECT * FROM REV_ENTITY_METADATA_TABLE WHERE METADATA_VALUE = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityMetadata_By_UniqueId -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0]);
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityMetadataValue_By_RevEntityGUID_MetadataName(revEntityGUID, revMetadataName, callback) {
    let todo = [revEntityGUID, revMetadataName];

    var stmt = "SELECT METADATA_VALUE FROM REV_ENTITY_METADATA_TABLE WHERE REV_ENTITY_GUID = ? AND METADATA_NAME = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityMetadataValue_By_RevEntityGUID_MetadataName -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].METADATA_VALUE);
                } else {
                    callback("");
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityMetadataArr_By_MetadataName(revVarArgs, callback) {
    let todo = [revVarArgs.revMetadataName];

    var stmt = "SELECT * FROM REV_ENTITY_METADATA_TABLE WHERE METADATA_NAME = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityMetadataArr_By_MetadataName -> " + err.message);
                callback([-1]);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityMetadata_By_RevEntityGUID_MetadataName(revEntityGUID, revMetadataName, callback) {
    let todo = [revEntityGUID, revMetadataName];

    var stmt = "SELECT * FROM REV_ENTITY_METADATA_TABLE WHERE REV_ENTITY_GUID = ? AND METADATA_NAME = ? LIMIT 1";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityMetadata_By_RevEntityGUID_MetadataName -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0]);
                } else {
                    callback("");
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityMetadataByRemoteRevEntityGUID(revEntityGUID, callback) {
    let todo = [revEntityGUID];

    var stmt = "SELECT * FROM REV_ENTITY_METADATA_TABLE WHERE REV_ENTITY_GUID = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityMetadataByRemoteRevEntityGUID -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

module.exports.revMetadataValsArrFullTextSearch = revMetadataValsArrFullTextSearch;

module.exports.revPersReadRevEntityMetadataOwnerGUID_By_UniqueId = revPersReadRevEntityMetadataOwnerGUID_By_UniqueId;
module.exports.revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueIdsArr = revPersReadRevEntityMetadataOwnerGUIDsArr_By_UniqueIdsArr;
module.exports.revPersReadRevEntityMetadata_By_UniqueId = revPersReadRevEntityMetadata_By_UniqueId;

module.exports.revPersReadMetadataID_By_CreationDate_MetadataEntityGUID = revPersReadMetadataID_By_CreationDate_MetadataEntityGUID;
module.exports.revPersMetadataValueExists_By_MetadataName_MetadataValue = revPersMetadataValueExists_By_MetadataName_MetadataValue;
module.exports.revPersReadMetadataValuesArr_By_MetadataName_MetadataValue = revPersReadMetadataValuesArr_By_MetadataName_MetadataValue;

module.exports.revPersGetMetadataId_By_MetadataName_EntityGUID = revPersGetMetadataId_By_MetadataName_EntityGUID;
module.exports.revPersReadRevEntityMetadataValue_By_RevEntityGUID_MetadataName = revPersReadRevEntityMetadataValue_By_RevEntityGUID_MetadataName;
module.exports.revPersReadRevEntityMetadataArr_By_MetadataName = revPersReadRevEntityMetadataArr_By_MetadataName;
module.exports.revPersReadRevEntityMetadata_By_RevEntityGUID_MetadataName = revPersReadRevEntityMetadata_By_RevEntityGUID_MetadataName;

module.exports.revPersReadRevEntityMetadataByRemoteRevEntityGUID = revPersReadRevEntityMetadataByRemoteRevEntityGUID;
