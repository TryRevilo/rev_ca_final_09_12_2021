const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revCountRevEntities_By_OwnerGuid_SubType(revVarArgs, callback) {
    let revEntityGUID = revVarArgs.revEntityGUID;
    let revEntitySubType = revVarArgs.revEntitySubType;
    let revStartColumnId = revEntityGUID;

    if (revVarArgs.revStartColumnId) {
        revStartColumnId = revVarArgs.revStartColumnId;
    }

    let todo = [revEntityGUID, revEntitySubType, revStartColumnId];

    var stmt = "SELECT COUNT (REMOTE_REV_ENTITY_GUID) AS revTotCount FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID = ? AND REV_ENTITY_SUB_TYPE = ? AND REMOTE_REV_ENTITY_GUID >= ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revCountRevEntities_By_OwnerGuid_SubType -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].revTotCount);
                } else {
                    callback(0);
                }
            }
        });

        connection.release();
    });
}

function revCountRevEntities_By_ContainerGuid_SubType(revVarArgs, callback) {
    let revContainerGUID = revVarArgs.revContainerGUID;
    let revEntitySubType = revVarArgs.revEntitySubType;
    let revStartColumnId = 0;

    if (revVarArgs.revStartColumnId) {
        revStartColumnId = revVarArgs.revStartColumnId;
    }

    let todo = [revContainerGUID, revEntitySubType, revStartColumnId];

    var stmt = "SELECT COUNT (REMOTE_REV_ENTITY_GUID) AS revTotCount FROM REV_ENTITY_TABLE WHERE REV_ENTITY_CONTAINER_GUID = ? AND REV_ENTITY_SUB_TYPE = ? AND REMOTE_REV_ENTITY_GUID >= ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revCountRevEntities_By_ContainerGuid_SubType -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].revTotCount);
                } else {
                    callback(0);
                }
            }
        });

        connection.release();
    });
}

function revGetEntityGUID_By_ContainerGuid_SubType(revVarArgs, callback) {
    let revContainerGUID = revVarArgs.revContainerGUID;
    let revEntitySubType = revVarArgs.revEntitySubType;

    let todo = [revContainerGUID, revEntitySubType];

    var stmt = "SELECT REMOTE_REV_ENTITY_GUID FROM REV_ENTITY_TABLE WHERE REV_ENTITY_CONTAINER_GUID = ? AND REV_ENTITY_SUB_TYPE = ? LIMIT 1";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revGetEntityGUID_By_ContainerGuid_SubType -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].REMOTE_REV_ENTITY_GUID);
                } else {
                    callback(0);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntity(callback) {
    rev_db_init.getRevConnection((connection) => {
        connection.query("SELECT * FROM REV_ENTITY_TABLE", function (err, row, fields) {
            if (err) {
                console.log("ERR -> revPersReadRevEntity -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].revTotCount);
                } else {
                    callback(0);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityResolveStatus(remoteRevEntityGUID, callback) {
    let todo = [remoteRevEntityGUID];
    var stmt = "SELECT REV_RESOLVE_STATUS FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityResolveStatus :-> " + err.message);
                callback(null);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].REV_RESOLVE_STATUS);
                } else {
                    callback(null);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntitySubType(remoteRevEntityGUID, callback) {
    let todo = [remoteRevEntityGUID];
    var stmt = "SELECT REV_ENTITY_SUB_TYPE FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntitySubType :-> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].REV_ENTITY_SUB_TYPE);
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityType(remoteRevEntityGUID, callback) {
    let todo = [remoteRevEntityGUID];
    var stmt = "SELECT REV_ENTITY_TYPE FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityType :-> " + err.message);
                callback("");
            } else {
                if (row && row.length > 0) {
                    callback(row[0].REV_ENTITY_TYPE);
                } else {
                    callback("");
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityChildableStatus(remoteRevEntityGUID, callback) {
    let todo = [remoteRevEntityGUID];
    var stmt = "SELECT REV_CHILDABLE_STATUS FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityChildableStatus :-> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].REV_CHILDABLE_STATUS);
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityGUID_By_CreationDate(_revTimeCreated, callback) {
    let todo = [_revTimeCreated];
    var stmt = "SELECT REMOTE_REV_ENTITY_GUID FROM REV_ENTITY_TABLE WHERE REV_CREATED_DATE = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityGUID_By_CreationDate -> " + err.message);
                callback(-1);
            } else {
                if (row.length > 0) {
                    if (row) {
                        callback(row[0]["REMOTE_REV_ENTITY_GUID"]);
                    }
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

function revPersReadOwnerEntityGUID_By_RevEntityGUID(revEntityGUID, callback) {
    if (!revEntityGUID || revEntityGUID < 1) {
        callback(null);
        return;
    }

    let todo = [revEntityGUID];
    var stmt = "SELECT REV_ENTITY_OWNER_GUID FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID = ? ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadOwnerEntityGUID_By_RevEntityGUID -> " + err.message);
                callback(null);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].REV_ENTITY_OWNER_GUID);
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevPublishedDate_By_RevEntityGUID(revEntityGUID, callback) {
    let todo = [revEntityGUID];
    var stmt = "SELECT REV_PUBLISHED_DATE FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevPublishedDate_By_RevEntityGUID -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].REV_PUBLISHED_DATE);
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityGUID_By_OwnerGUID_ContainerGUID_Subtype(revEntityOwnerGUID, revEntityContainerGUID, revEntitySubtype, callback) {
    let todo = [revEntityOwnerGUID, revEntityContainerGUID, revEntitySubtype];
    var stmt = "SELECT REMOTE_REV_ENTITY_GUID FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID = ? AND REV_ENTITY_CONTAINER_GUID = ? AND REV_ENTITY_SUB_TYPE = ? ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityGUID_By_OwnerGUID_ContainerGUID_Subtype -> " + err.message);
                callback(-2);
            } else {
                if (row.length > 0) {
                    if (row) {
                        callback(row[0]["REMOTE_REV_ENTITY_GUID"]);
                    }
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntities_By_Subtype(revEntitySubType, revQueryLimit, callback) {
    if (!revQueryLimit) {
        revQueryLimit = 100;
    }

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_SUB_TYPE = ? ORDER BY REV_PUBLISHED_DATE DESC LIMIT ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, [revEntitySubType, revQueryLimit], function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_By_Subtype -> " + err.message);
                callback([-1]);
            } else {
                if (row.length > 0) {
                    if (row) {
                        callback(row);
                    }
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntities_By_SubtypesArr(todo, revQueryLimit, callback) {
    if (!revQueryLimit) {
        revQueryLimit = 22;
    }

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_SUB_TYPE IN (";

    for (let i = 0; i < todo.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }
    stmt += ") ORDER BY REV_PUBLISHED_DATE DESC LIMIT " + revQueryLimit;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_By_SubtypesArr -> " + err.message);
                callback(-1);
            } else {
                if (row.length > 0) {
                    if (row) {
                        callback(row);
                    }
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntity_By_OwnerGUID_ContainerGUID_Subtype(revEntityOwnerGUID, revEntityContainerGUID, revEntitySubtype, callback) {
    let todo = [revEntityOwnerGUID, revEntityContainerGUID, revEntitySubtype];
    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID = ? AND REV_ENTITY_CONTAINER_GUID = ? AND REV_ENTITY_SUB_TYPE = ? ORDER BY REV_PUBLISHED_DATE DESC LIMIT 1";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntity_By_OwnerGUID_ContainerGUID_Subtype -> " + err.message);
                callback(-2);
            } else {
                if (row.length > 0) {
                    if (row) {
                        callback(row[0]);
                    }
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadEnties_By_OwnerGUID_ContainerGUID_Subtype(revVarArgs, callback) {
    let revEntityOwnerGUID = revVarArgs.revEntityOwnerGUID;
    let revEntityContainerGUID = revVarArgs.revEntityContainerGUID;
    let revEntitySubtype = revVarArgs.revEntitySubtype;

    let todo = [revEntityOwnerGUID, revEntityContainerGUID, revEntitySubtype];
    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID = ? AND REV_ENTITY_CONTAINER_GUID = ? AND REV_ENTITY_SUB_TYPE = ? ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadEnties_By_OwnerGUID_ContainerGUID_Subtype -> " + err.message);
                callback(-2);
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

function revPersReadRevEntities_BY_RemoteRevEntityGUIDs(revEntityGUIDsArr, callback) {
    if (revEntityGUIDsArr.length < 1) {
        callback([]);
        return;
    }

    let stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID IN (";

    let revInsArr = [];

    for (let i = revEntityGUIDsArr.length - 1; i >= 0; --i) {
        let revEntityGUID = Number(revEntityGUIDsArr[i]);

        if (!revEntityGUID || revEntityGUID < 1) {
            revEntityGUIDsArr.splice(i, 1);
            continue;
        }

        revInsArr.push("?");
    }

    let revIns = revInsArr.join(", ");

    if (!revIns) {
        callback([]);
        return;
    }

    stmt += revIns + ")";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revEntityGUIDsArr, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_BY_RemoteRevEntityGUIDs -> " + err.message);
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

function revPersReadRevEntities_BY_RemoteRevEntityGUIDs_SubTypesArr(remoteRevEntityGUIDs, revVarArgs, callback) {
    let iGUID = 0;
    while (iGUID < remoteRevEntityGUIDs.length) {
        let revEntityGUID = Number(remoteRevEntityGUIDs[iGUID]);

        if (!revEntityGUID || revEntityGUID < 1) {
            remoteRevEntityGUIDs.splice(iGUID, 1);
        } else {
            ++iGUID;
        }
    }

    let revTodoParamsArr = [];

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE ";

    /** REV START ENTITY GUIDS IN */
    let revEntityGUIDsInStatement = "";
    let revEntityGUIDsArrayPlaceholders = "";

    for (let i = 0; i < remoteRevEntityGUIDs.length; i++) {
        if (i == 0) {
            revEntityGUIDsArrayPlaceholders += "?";
        } else {
            revEntityGUIDsArrayPlaceholders += ", ?";
        }
    }

    if (revEntityGUIDsArrayPlaceholders) {
        revEntityGUIDsInStatement = " REMOTE_REV_ENTITY_GUID IN (" + revEntityGUIDsArrayPlaceholders + ")";
        stmt += revEntityGUIDsInStatement;

        revTodoParamsArr = revTodoParamsArr.concat(remoteRevEntityGUIDs);
    }

    if (revVarArgs.revEntityOwnerGUID || revVarArgs.revContainerGUID) {
        let revContainerGUIDsQuery = "";
        let revOr = "";

        /** REV START ENTITY OWNER GUIDS IN */
        if (revVarArgs.revEntityOwnerGUID && revVarArgs.revEntityOwnerGUID > 0) {
            revContainerGUIDsQuery += `(REV_ENTITY_OWNER_GUID = ?)`;

            revTodoParamsArr.push(revVarArgs.revEntityOwnerGUID);

            revOr = " OR";
        }
        /** REV END ENTITY OWNER GUIDS IN */

        /** REV START ENTITY CONTAINER GUIDS IN */
        if (revVarArgs.revContainerGUID && revVarArgs.revContainerGUID > 0) {
            revContainerGUIDsQuery += revOr + ` (REV_ENTITY_CONTAINER_GUID = ?)`;
            revTodoParamsArr.push(revVarArgs.revContainerGUID);
        }
        /** REV END ENTITY CONTAINER GUIDS IN */

        if (revContainerGUIDsQuery) {
            stmt += " AND (" + revContainerGUIDsQuery + ")";
        }
    }

    /** REV START ENTITY SUB-TYPES IN */
    let revEntitySubTypesInStatement = "";
    let revEntitySubTypesArrayPlaceholders = "";

    if (Array.isArray(revVarArgs.revEntitySubtypesArr)) {
        let revEntitySubtypesArr = revVarArgs.revEntitySubtypesArr;

        for (let i = 0; i < revEntitySubtypesArr.length; i++) {
            if (i == 0) {
                revEntitySubTypesArrayPlaceholders += "?";
            } else {
                revEntitySubTypesArrayPlaceholders += ", ?";
            }
        }

        if (revEntitySubTypesArrayPlaceholders) {
            revEntitySubTypesInStatement = " AND REV_ENTITY_SUB_TYPE IN (" + revEntitySubTypesArrayPlaceholders + ")";
            stmt += revEntitySubTypesInStatement;

            revTodoParamsArr = revTodoParamsArr.concat(revEntitySubtypesArr);
        }
    }
    /** REV END ENTITY SUB-TYPES IN */

    if (revVarArgs.revLastCheckDate) {
        stmt += " AND REV_PUBLISHED_DATE < ?";
        revTodoParamsArr.push(revVarArgs.revLastCheckDate);
    }

    stmt += " ORDER BY REV_PUBLISHED_DATE DESC";

    let revCollectionLimit = 20;

    if (revVarArgs.revCollectionLimit) {
        revCollectionLimit = revVarArgs.revCollectionLimit;
    }

    stmt += " LIMIT ?";
    revTodoParamsArr.push(revCollectionLimit);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revTodoParamsArr, (err, row) => {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_BY_RemoteRevEntityGUIDs_SubTypesArr -> " + err);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    console.log("row : " + JSON.stringify(row));
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr(revVarArgs, callback) {
    let revTodoParamsArr = [];

    let stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE";

    if (revVarArgs.revEntityOwnerGUID || revVarArgs.revContainerGUID) {
        stmt += " (";
        let revOr = "";

        /** REV START ENTITY OWNER GUIDS IN */
        if (revVarArgs.revEntityOwnerGUID && revVarArgs.revEntityOwnerGUID > 0) {
            stmt += `(REV_ENTITY_OWNER_GUID = ?)`;

            revTodoParamsArr.push(revVarArgs.revEntityOwnerGUID);

            revOr = " OR";
        }
        /** REV END ENTITY OWNER GUIDS IN */

        /** REV START ENTITY CONTAINER GUIDS IN */
        if (revVarArgs.revContainerGUID && revVarArgs.revContainerGUID > 0) {
            stmt += revOr + ` (REV_ENTITY_CONTAINER_GUID = ?)`;
            revTodoParamsArr.push(revVarArgs.revContainerGUID);
        }
        /** REV END ENTITY CONTAINER GUIDS IN */

        stmt += ")";
    }

    /** REV START ENTITY SUB-TYPES IN */
    let revEntitySubTypesInStatement = "";
    let revEntitySubTypesArrayPlaceholders = "";

    if (!Array.isArray(revVarArgs.revEntitySubtypesArr)) {
        if ((!revVarArgs.revEntityOwnerGUID || revVarArgs.revEntityOwnerGUID < 1) && (revVarArgs.revContainerGUID || revVarArgs.revContainerGUID < 1)) {
            stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID > 0";
        }

        let revEntitySubtypesArr = revVarArgs.revEntitySubtypesArr;

        for (let i = 0; i < revEntitySubtypesArr.length; i++) {
            if (i == 0) {
                revEntitySubTypesArrayPlaceholders += "?";
            } else {
                revEntitySubTypesArrayPlaceholders += ", ?";
            }
        }

        if (revEntitySubTypesArrayPlaceholders) {
            revEntitySubTypesInStatement = " AND REV_ENTITY_SUB_TYPE IN (" + revEntitySubTypesArrayPlaceholders + ")";
            stmt += revEntitySubTypesInStatement;

            revTodoParamsArr = revTodoParamsArr.concat(revEntitySubtypesArr);
        }
    }
    /** REV END ENTITY SUB-TYPES IN */

    if (revVarArgs.revLastCheckDate) {
        stmt += " AND REV_PUBLISHED_DATE < ?";
        revTodoParamsArr.push(revVarArgs.revLastCheckDate);
    }

    stmt += " ORDER BY REV_PUBLISHED_DATE DESC";

    let revCollectionLimit = 20;

    if (revVarArgs.revCollectionLimit) {
        revCollectionLimit = revVarArgs.revCollectionLimit;
    }

    stmt += " LIMIT ?";
    revTodoParamsArr.push(revCollectionLimit);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revTodoParamsArr, (err, row) => {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr -> " + err);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    console.log("row : " + JSON.stringify(row));
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntities_OF_RemoteRevEntityGUIDs(todo, callback) {
    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID IN (";

    for (let i = 0; i < todo.length; i++) {
        if (i === 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ") ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_OF_RemoteRevEntityGUIDs -> " + err.message);
                callback(-1);
            } else {
                if (row.length > 0) {
                    if (row) {
                        callback(row);
                    }
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

var revPersReadRevEntities_OF_OwnerGUIDArr_SubTypeArr = (revVarArgs, callback) => {
    let revEntityOwnerGUIDsArray = revVarArgs.revEntityOwnerGUIDsArray;
    let revEntitySubtypesArray = revVarArgs.revEntitySubtypesArray;

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID IN (";

    for (let i = 0; i < revEntityOwnerGUIDsArray.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ") AND REV_ENTITY_SUB_TYPE IN (";

    for (let i = 0; i < revEntitySubtypesArray.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ")";

    if (revVarArgs.revLastCheckDate && revVarArgs.revLastCheckDate > 0) {
        stmt += " AND REV_PUBLISHED_DATE < " + revVarArgs.revLastCheckDate;
    }

    stmt += " ORDER BY REV_PUBLISHED_DATE DESC";

    if (revVarArgs.revCollectionLimit && revVarArgs.revCollectionLimit > 1) {
        stmt += " LIMIT " + revVarArgs.revCollectionLimit;
    }

    revEntityOwnerGUIDsArray = revEntityOwnerGUIDsArray.concat(revEntitySubtypesArray);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revEntityOwnerGUIDsArray, (err, row) => {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_OF_OwnerGUIDArr_SubTypeArr err -> " + err);
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
};

function revPersEntities_By_ContainerGUIDsArr_SubTypesArr(revCollectionLimit, revEntityContainerGUIDsArray, revEntitySubtypesArray, revLastCheckDate, callback) {
    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_CONTAINER_GUID IN (";

    for (let i = 0; i < revEntityContainerGUIDsArray.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ") AND REV_ENTITY_SUB_TYPE IN (";

    for (let i = 0; i < revEntitySubtypesArray.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ")";

    if (revLastCheckDate > 0) {
        stmt += " AND REV_PUBLISHED_DATE < " + revLastCheckDate;
    }

    stmt += " ORDER BY REV_PUBLISHED_DATE DESC";
    stmt += " LIMIT " + revCollectionLimit;

    revEntityContainerGUIDsArray = revEntityContainerGUIDsArray.concat(revEntitySubtypesArray);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revEntityContainerGUIDsArray, (err, row) => {
            if (err) {
                console.log("ERR -> revPersEntities_By_ContainerGUIDsArr_SubTypesArr -> " + err);
                callback(-1);
            } else {
                if (row.length > 0) {
                    if (row) {
                        callback(row);
                    }
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadContainerChilds(revReqQuery, callback) {
    let revEntityContainerGUIDsArray = revReqQuery.rev_container_guids.split(",");
    let revEntitySubtypesArray = revReqQuery.rev_entity_subtypes.split(",");

    let revLastCheckDate = 0;
    let revCollectionLimit = 22;

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_CONTAINER_GUID IN (";

    for (let i = 0; i < revEntityContainerGUIDsArray.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ") AND REV_ENTITY_SUB_TYPE IN (";

    for (let i = 0; i < revEntitySubtypesArray.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ")";

    if (revLastCheckDate > 0) {
        stmt += " AND REV_PUBLISHED_DATE < " + revLastCheckDate;
    }

    stmt += " ORDER BY REV_PUBLISHED_DATE DESC";
    stmt += " LIMIT " + revCollectionLimit;

    revEntityContainerGUIDsArray = revEntityContainerGUIDsArray.concat(revEntitySubtypesArray);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revEntityContainerGUIDsArray, (err, row) => {
            if (err) {
                console.log("ERR -> revPersReadContainerChilds -> " + err);
                callback(-1);
            } else {
                if (row.length > 0) {
                    if (row) {
                        callback(row);
                    }
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntities_OF_RemoteRevEntityGUIDs_EXEMPT_SubType(revContainerGUID, todo, exemptSubtypesArray, callback) {
    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE (REV_ENTITY_OWNER_GUID IN (";

    for (let i = 0; i < todo.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ") OR REV_ENTITY_CONTAINER_GUID = ?) AND (REV_ENTITY_SUB_TYPE <> ";

    for (let i = 0; i < exemptSubtypesArray.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += " AND REV_ENTITY_SUB_TYPE <> ?";
        }
    }

    stmt += ") ORDER BY REV_PUBLISHED_DATE DESC";

    todo = todo.concat(revContainerGUID);
    todo = todo.concat(exemptSubtypesArray);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, (err, row) => {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_OF_RemoteRevEntityGUIDs_EXEMPT_SubType -> " + err);
                callback(-1);
            } else {
                if (row.length > 0) {
                    if (row) {
                        callback(row);
                    }
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersEntities_By_ContainerGUID_SubType(revVarArgs, callback) {
    let revCollectionLimit = revVarArgs.revCollectionLimit;
    let revEntityContainerGUID = revVarArgs.revEntityContainerGUID;
    let revEntitySubtype = revVarArgs.revEntitySubtype;
    let revLastCheckDate = revVarArgs.revLastCheckDate;

    if (!revCollectionLimit) {
        revCollectionLimit = 10;
    }

    if (!revLastCheckDate) {
        revLastCheckDate = new Date().getTime();
    }

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_CONTAINER_GUID = ? AND REV_ENTITY_SUB_TYPE = ?";

    if (revLastCheckDate > 0) {
        stmt += " AND REV_PUBLISHED_DATE < " + revLastCheckDate;
    }

    stmt += " ORDER BY REV_PUBLISHED_DATE DESC";
    stmt += " LIMIT " + revCollectionLimit;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, [revEntityContainerGUID, revEntitySubtype], (err, row) => {
            if (err) {
                console.log("ERR -> revPersEntities_By_ContainerGUID_SubType -> " + err);
                callback(-1);
            } else {
                if (row.length > 0) {
                    if (row) {
                        callback(row);
                    }
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntities_OF_ContainerGUID_SubTypesArr(revContainerGUID, revSubtypesArray, callback) {
    let revEntityContainerGUIDsArray = [revContainerGUID];

    let revLastCheckDate = 0;
    let revCollectionLimit = 22;

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_CONTAINER_GUID = ?";

    stmt += " AND REV_ENTITY_SUB_TYPE IN (";

    for (let i = 0; i < revSubtypesArray.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ")";

    if (revLastCheckDate > 0) {
        stmt += " AND REV_PUBLISHED_DATE < " + revLastCheckDate;
    }

    stmt += " ORDER BY REV_PUBLISHED_DATE DESC";
    stmt += " LIMIT " + revCollectionLimit;

    revEntityContainerGUIDsArray = revEntityContainerGUIDsArray.concat(revSubtypesArray);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revEntityContainerGUIDsArray, (err, row) => {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_OF_ContainerGUID_SubTypesArr -> " + err);
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

function revPersReadRevEntities_OF_ContainerGUID_EXEMPT_SubType(revContainerGUID, exemptSubtypesArray, callback) {
    let todo = [];

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE (REV_ENTITY_CONTAINER_GUID = ? OR REV_ENTITY_OWNER_GUID = ?)";

    stmt += " AND (REV_ENTITY_SUB_TYPE <> ";

    for (let i = 0; i < exemptSubtypesArray.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += " AND REV_ENTITY_SUB_TYPE <> ?";
        }
    }

    stmt += ") ORDER BY REV_PUBLISHED_DATE DESC";

    todo.push(revContainerGUID);
    todo.push(revContainerGUID);
    todo = todo.concat(exemptSubtypesArray);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, (err, row) => {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_OF_ContainerGUID_EXEMPT_SubType ->" + err);
                callback(-1);
            } else if (row && row.length > 0) {
                callback(row);
            } else {
                callback([]);
            }
        });

        connection.release();
    });
}

function revPersReadRevEntities_EXEMPT_SubType(exemptSubtypesArray, callback) {
    let todo = [];

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE";

    stmt += " (REV_ENTITY_SUB_TYPE <> ";

    for (let i = 0; i < exemptSubtypesArray.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += " AND REV_ENTITY_SUB_TYPE <> ?";
        }
    }

    stmt += ") ORDER BY REV_PUBLISHED_DATE DESC";

    todo = todo.concat(exemptSubtypesArray);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, (err, row) => {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_EXEMPT_SubType ->" + err);
                callback(-1);
            } else if (row && row.length > 0) {
                callback(row);
            } else {
                callback([]);
            }
        });

        connection.release();
    });
}

function revPersReadRevEntyGUIDs_OF_RevEntityContainerGUID(revEntityContainerGUID, callback) {
    let todo = [revEntityContainerGUID, revEntityContainerGUID];
    var stmt = "SELECT REMOTE_REV_ENTITY_GUID FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID = ? OR REV_ENTITY_CONTAINER_GUID = ? ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntyGUIDs_OF_RevEntityContainerGUID -> " + err.message);
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

function revPersReadRevEntities_OF_RevEntityContainerGUID(revEntityContainerGUID, callback) {
    let todo = [revEntityContainerGUID];
    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_CONTAINER_GUID = ? ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_OF_RevEntityContainerGUID -> " + err.message);
                callback(-1);
            } else {
                if (row.length > 0) {
                    if (row) {
                        callback(row);
                    }
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

function revPersReadAllRevEntities_OF_RevEntityContainerGUIDs(revEntityContainerGUIDsArr, callback) {
    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_CONTAINER_GUID IN (";

    for (let i = 0; i < revEntityContainerGUIDsArr.length; i++) {
        if (i === 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ") ORDER BY REV_PUBLISHED_DATE DESC LIMIT 10";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revEntityContainerGUIDsArr, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadAllRevEntities_OF_RevEntityContainerGUIDs -> " + err.message);
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

function revPersReadRevEntityByRemoteRevEntityGUID(remoteRevEntityGUID, callback) {
    let todo = [remoteRevEntityGUID];

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityByRemoteRevEntityGUID -> " + err);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0]);
                } else {
                    callback([]);
                }
            }
        });

        connection.release();
    });
}

var revPersReadAllRevEntity_By_RevEntityGUIDs = (revEntityGUIDsArr, callback) => {
    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID IN (";

    for (let i = 0; i < revEntityGUIDsArr.length; i++) {
        if (i === 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ") ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revEntityGUIDsArr, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadAllRevEntity_By_RevEntityGUIDs -> " + err.message);
                callback(-1);
            } else if (row && row.length > 0) {
                callback(row);
            } else {
                callback([]);
            }
        });

        connection.release();
    });
};

function revPersReadAllRevEntities_By_RemoteRevEntityOwnerGUID(remoteRevEntityOwnerGUID, callback) {
    let todo = [remoteRevEntityOwnerGUID];

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID = ? ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadAllRevEntities_By_RemoteRevEntityOwnerGUID -> " + err.message);
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

var revPersReadRevEntityGUID_By_RevEntityOwnerGUID_Subtype = (remoteRevEntityGUID, revEntitySubType, callback) => {
    if (remoteRevEntityGUID < 1 || !revEntitySubType) {
        callback[-1];
    }

    let todo = [remoteRevEntityGUID, revEntitySubType];

    var stmt = "SELECT REMOTE_REV_ENTITY_GUID FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID = ? AND REV_ENTITY_SUB_TYPE = ? ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityGUID_By_RevEntityOwnerGUID_Subtype -> " + err.message);
                callback(-1);
            } else if (row && row.length > 0) {
                callback(row[0].REMOTE_REV_ENTITY_GUID);
            } else {
                callback(-1);
            }
        });
        connection.release();
    });
};

var revPersReadRevEntityContainerGUID_By_RevEntityGUID = (todo, callback) => {
    let stmt = "SELECT REV_ENTITY_CONTAINER_GUID FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID IN (";

    for (let i = 0; i < todo.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ") ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityContainerGUID_By_RevEntityGUID  -> " + err.message);
                callback(-1);
            } else if (row && row.length > 0) {
                callback(row);
            } else {
                callback([]);
            }
        });
        connection.release();
    });
};

function revPersReadRevEntity_By_RevEntityOwnerGUID_Subtype(remoteRevEntityGUID, revEntitySubType, callback) {
    let todo = [remoteRevEntityGUID, revEntitySubType];

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID = ? AND REV_ENTITY_SUB_TYPE = ? ORDER BY REV_PUBLISHED_DATE DESC LIMIT 1";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntity_By_RevEntityOwnerGUID_Subtype -> " + err.message);
                callback(-1);
            } else if (row && row.length > 0) {
                callback(row[0]);
            } else {
                callback({});
            }
        });
        connection.release();
    });
}

function revPersReadRevEntities_By_RevEntityOwnerGUID_Subtype(revVarArgs, callback) {
    let todo = [revVarArgs.revEntityOwnerGUID, revVarArgs.revEntitySubtype];

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID = ? AND REV_ENTITY_SUB_TYPE = ? ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntities_By_RevEntityOwnerGUID_Subtype -> " + err.message);
                callback([-1]);
            } else if (row && row.length > 0) {
                callback(row);
            } else {
                callback([]);
            }
        });
        connection.release();
    });
}

function revPersReadAllRevEntityType(revEntityType, callback) {
    let todo = [revEntityType];

    var stmt = "SELECT * FROM REV_ENTITY_TABLE WHERE REV_ENTITY_TYPE = ? ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadAllRevEntityType  -> " + err.message);
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

function revPersReadUnresolvedRevEntity(callback) {
    rev_db_init.getRevConnection((connection) => {
        connection.query("SELECT * FROM REV_ENTITY_TABLE WHERE REV_RESOLVE_STATUS = -1 ORDER BY REV_PUBLISHED_DATE DESC", function (err, row, fields) {
            if (err) {
                console.log("ERR -> revPersReadAllRevEntityType  -> " + err.message);
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

let promiseToRevPersReadLastPersRevEntity = function () {
    return new Promise(function (resolve, reject) {
        rev_db_init.getRevConnection((connection) => {
            connection.query("SELECT * FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID = (SELECT MAX(REMOTE_REV_ENTITY_GUID) FROM REV_ENTITY_TABLE)", function (err, row, fields) {
                if (err) {
                    console.log("ERR -> promiseToRevPersReadLastPersRevEntity  -> " + err.message);
                    callback([-1]);
                } else {
                    if (row && row.length > 0) {
                        callback(row);
                    } else {
                        callback([]);
                    }
                }
            });
        });
        connection.release();
    });
};

function revPersReadRevEntity(callback) {
    rev_db_init.getRevConnection((connection) => {
        connection.query("SELECT * FROM REV_ENTITY_TABLE WHERE REMOTE_REV_ENTITY_GUID = (SELECT MAX(REMOTE_REV_ENTITY_GUID) FROM REV_ENTITY_TABLE)", function (err, row, fields) {
            if (err) {
                console.log("ERR -> revPersReadRevEntity  -> " + err.message);
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

var revSelectRevEntityOwnerChildrenGUIDs_By_RevEntityGUID = (revEntityGUIDs, callback) => {
    var stmt = "SELECT REV_CHILDABLE_STATUS, REMOTE_REV_ENTITY_GUID, REV_ENTITY_SUB_TYPE, REV_ENTITY_TYPE FROM REV_ENTITY_TABLE WHERE REV_ENTITY_OWNER_GUID IN (";

    for (let i = 0; i < revEntityGUIDs.length; i++) {
        if (i === 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ") ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revEntityGUIDs, function (err, row) {
            if (err) {
                console.log("ERR -> revSelectRevEntityOwnerChildrenGUIDs_By_RevEntityGUID  -> " + err.message);
                callback([-1]);
            } else if (row && row.length > 0) {
                callback(row);
            } else {
                callback([]);
            }
        });

        connection.release();
    });
};

var revSelectRevEntityContainerChildrenGUIDs_By_RevEntityGUID = (revEntityGUIDs, callback) => {
    var stmt = "SELECT REV_CHILDABLE_STATUS, REMOTE_REV_ENTITY_GUID, REV_ENTITY_SUB_TYPE, REV_ENTITY_TYPE FROM REV_ENTITY_TABLE WHERE REV_ENTITY_CONTAINER_GUID IN (";

    for (let i = 0; i < revEntityGUIDs.length; i++) {
        if (i === 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    stmt += ") ORDER BY REV_PUBLISHED_DATE DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revEntityGUIDs, function (err, row) {
            if (err) {
                console.log("ERR -> revSelectRevEntityContainerChildrenGUIDs_By_RevEntityGUID  -> " + err.message);
                callback([-1]);
            } else if (row && row.length > 0) {
                callback(row);
            } else {
                callback([]);
            }
        });

        connection.release();
    });
};

module.exports.revCountRevEntities_By_OwnerGuid_SubType = revCountRevEntities_By_OwnerGuid_SubType;
module.exports.revCountRevEntities_By_ContainerGuid_SubType = revCountRevEntities_By_ContainerGuid_SubType;
module.exports.revGetEntityGUID_By_ContainerGuid_SubType = revGetEntityGUID_By_ContainerGuid_SubType;

module.exports.revPersReadRevEntityResolveStatus = revPersReadRevEntityResolveStatus;
module.exports.revPersReadRevEntitySubType = revPersReadRevEntitySubType;
module.exports.revPersReadRevEntityType = revPersReadRevEntityType;
module.exports.revPersReadRevEntityChildableStatus = revPersReadRevEntityChildableStatus;

module.exports.revPersReadRevEntity = revPersReadRevEntity;
module.exports.revPersReadRevEntityGUID_By_CreationDate = revPersReadRevEntityGUID_By_CreationDate;
module.exports.revPersReadOwnerEntityGUID_By_RevEntityGUID = revPersReadOwnerEntityGUID_By_RevEntityGUID;
module.exports.revPersReadRevPublishedDate_By_RevEntityGUID = revPersReadRevPublishedDate_By_RevEntityGUID;

module.exports.revPersReadRevEntities_By_Subtype = revPersReadRevEntities_By_Subtype;
module.exports.revPersReadRevEntities_By_SubtypesArr = revPersReadRevEntities_By_SubtypesArr;

module.exports.revPersReadRevEntityGUID_By_OwnerGUID_ContainerGUID_Subtype = revPersReadRevEntityGUID_By_OwnerGUID_ContainerGUID_Subtype;
module.exports.revPersReadEnties_By_OwnerGUID_ContainerGUID_Subtype = revPersReadEnties_By_OwnerGUID_ContainerGUID_Subtype;
module.exports.revPersReadRevEntity_By_OwnerGUID_ContainerGUID_Subtype = revPersReadRevEntity_By_OwnerGUID_ContainerGUID_Subtype;

module.exports.revPersReadRevEntityByRemoteRevEntityGUID = revPersReadRevEntityByRemoteRevEntityGUID;
module.exports.revPersReadAllRevEntity_By_RevEntityGUIDs = revPersReadAllRevEntity_By_RevEntityGUIDs;
module.exports.revPersReadAllRevEntities_By_RemoteRevEntityOwnerGUID = revPersReadAllRevEntities_By_RemoteRevEntityOwnerGUID;
module.exports.revPersReadAllRevEntityType = revPersReadAllRevEntityType;
module.exports.revPersReadUnresolvedRevEntity = revPersReadUnresolvedRevEntity;
module.exports.promiseToRevPersReadLastPersRevEntity = promiseToRevPersReadLastPersRevEntity;
module.exports.revPersReadRevEntity = revPersReadRevEntity;
module.exports.revPersReadRevEntities_OF_RemoteRevEntityGUIDs = revPersReadRevEntities_OF_RemoteRevEntityGUIDs;
module.exports.revPersReadRevEntities_OF_OwnerGUIDArr_SubTypeArr = revPersReadRevEntities_OF_OwnerGUIDArr_SubTypeArr;
module.exports.revPersEntities_By_ContainerGUID_SubType = revPersEntities_By_ContainerGUID_SubType;

module.exports.revPersEntities_By_ContainerGUIDsArr_SubTypesArr = revPersEntities_By_ContainerGUIDsArr_SubTypesArr;
module.exports.revPersReadContainerChilds = revPersReadContainerChilds;

module.exports.revPersReadRevEntities_EXEMPT_SubType = revPersReadRevEntities_EXEMPT_SubType;
module.exports.revPersReadRevEntities_OF_ContainerGUID_SubTypesArr = revPersReadRevEntities_OF_ContainerGUID_SubTypesArr;
module.exports.revPersReadRevEntities_OF_ContainerGUID_EXEMPT_SubType = revPersReadRevEntities_OF_ContainerGUID_EXEMPT_SubType;
module.exports.revPersReadRevEntities_OF_RemoteRevEntityGUIDs_EXEMPT_SubType = revPersReadRevEntities_OF_RemoteRevEntityGUIDs_EXEMPT_SubType;

module.exports.revPersReadRevEntyGUIDs_OF_RevEntityContainerGUID = revPersReadRevEntyGUIDs_OF_RevEntityContainerGUID;
module.exports.revPersReadRevEntities_OF_RevEntityContainerGUID = revPersReadRevEntities_OF_RevEntityContainerGUID;
module.exports.revPersReadAllRevEntities_OF_RevEntityContainerGUIDs = revPersReadAllRevEntities_OF_RevEntityContainerGUIDs;

module.exports.revPersReadRevEntityContainerGUID_By_RevEntityGUID = revPersReadRevEntityContainerGUID_By_RevEntityGUID;
module.exports.revPersReadRevEntityGUID_By_RevEntityOwnerGUID_Subtype = revPersReadRevEntityGUID_By_RevEntityOwnerGUID_Subtype;

module.exports.revPersReadRevEntity_By_RevEntityOwnerGUID_Subtype = revPersReadRevEntity_By_RevEntityOwnerGUID_Subtype;
module.exports.revPersReadRevEntities_By_RevEntityOwnerGUID_Subtype = revPersReadRevEntities_By_RevEntityOwnerGUID_Subtype;

module.exports.revPersReadRevEntities_BY_RemoteRevEntityGUIDs = revPersReadRevEntities_BY_RemoteRevEntityGUIDs;
module.exports.revPersReadRevEntities_BY_RemoteRevEntityGUIDs_SubTypesArr = revPersReadRevEntities_BY_RemoteRevEntityGUIDs_SubTypesArr;
module.exports.revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr = revPersReadRevEntities_BY_OWNER_GUID_OR_CONTAINER_GUID_SubTypesArr;

module.exports.revSelectRevEntityOwnerChildrenGUIDs_By_RevEntityGUID = revSelectRevEntityOwnerChildrenGUIDs_By_RevEntityGUID;
module.exports.revSelectRevEntityContainerChildrenGUIDs_By_RevEntityGUID = revSelectRevEntityContainerChildrenGUIDs_By_RevEntityGUID;
