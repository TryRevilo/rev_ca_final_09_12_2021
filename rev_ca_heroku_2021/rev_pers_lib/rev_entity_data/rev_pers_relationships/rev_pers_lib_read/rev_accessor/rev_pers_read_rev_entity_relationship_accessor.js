const rev_db_init = require("../../../../rev_db_init/rev_db_init");

function revCountRels_By_TargetGUID_RelValId(revVarArgs, callback) {
    let revEntityTargetGUID = revVarArgs.rev_entity_target_guid;
    let revValIdsArr = revVarArgs.rev_rel_type_val_id_arr.toString().split(",");
    let revResStatus = revVarArgs.rev_res_status;

    if (revVarArgs.revStartColumnId) {
        revStartColumnId = revVarArgs.revStartColumnId;
    }

    let revINOptionsArr = [];

    for (let i = 0; i < revValIdsArr.length; i++) {
        revINOptionsArr.push("?");
    }

    let revINOptions = `IN (${revINOptionsArr.join(", ")})`;

    revValIdsArr.push(revEntityTargetGUID);
    revValIdsArr.push(revResStatus);

    let stmt = `SELECT COUNT (SUBJECT_GUID) AS revTotCount FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE RELATIONSHIP_TYPE_VALUE_ID ${revINOptions} AND TARGET_GUID = ? AND REV_RESOLVE_STATUS = ?`;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revValIdsArr, function (err, row) {
            if (err) {
                console.log("ERR -> revCountRels_By_TargetGUID_RelValId -> " + err.message);
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

function revCountRels_By_SubjectGUID_RelValId(revVarArgs, callback) {
    let revEntityTargetGUID = revVarArgs.rev_entity_target_guid;
    let revValIdsArr = revVarArgs.rev_rel_type_val_id_arr.toString().split(",");
    let revResStatus = revVarArgs.rev_res_status;

    if (revVarArgs.revStartColumnId) revStartColumnId = revVarArgs.revStartColumnId;

    let revINOptionsArr = "";

    for (let i = 0; i < revValIdsArr.length; i++) {
        if (i === 0) {
            revINOptionsArr += " IN (?";
        } else {
            revINOptionsArr += ", ?";
        }

        if (i == revValIdsArr.length - 1) revINOptionsArr += ")";
    }

    revValIdsArr.push(revEntityTargetGUID);
    revValIdsArr.push(revResStatus);

    let stmt = "SELECT COUNT (SUBJECT_GUID) AS revTotCount FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE RELATIONSHIP_TYPE_VALUE_ID" + revINOptionsArr + " AND SUBJECT_GUID = ? AND REV_RESOLVE_STATUS = ?";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revValIdsArr, function (err, row) {
            if (err) {
                console.log("ERR -> revCountRels_By_SubjectGUID_RelValId -> " + err.message);
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

function revPersReadRelId_RelSubjectGUID_RelTargetGUID_CreationDate(revEntitySubjectGUID, revEntityTargetGUID, _revTimeCreated, callback) {
    let todo = [revEntitySubjectGUID, revEntityTargetGUID, _revTimeCreated];

    let stmt = "SELECT RELATIONSHIP_ID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE SUBJECT_GUID = ? AND TARGET_GUID = ? ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRelId_RelSubjectGUID_RelTargetGUID_CreationDate -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].RELATIONSHIP_ID);
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

function revPersRelExists_By_RevEntityGUIDs_RevRelValId(revVarArgs, callback) {
    let revSubjectGUID = revVarArgs.revSubjectGUID;
    let revTargetGUID = revVarArgs.revTargetGUID;
    let revRevValId = revVarArgs.revRevValId;

    let todo = [revSubjectGUID, revTargetGUID, revSubjectGUID, revTargetGUID, revRevValId];

    let revExista = -1;

    for (let i = 0; i < todo.length; i++) {
        let revNumToDo = Number(todo[i]);

        if (revNumToDo < 1) {
            revExista = 0;
            break;
        }
    }

    if (revExista == 0) {
        callback(-1);
        return;
    }

    let stmt = "SELECT RELATIONSHIP_ID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE ((SUBJECT_GUID = ? AND TARGET_GUID = ?) OR (TARGET_GUID = ? AND SUBJECT_GUID = ?)) AND RELATIONSHIP_TYPE_VALUE_ID = ? LIMIT 1";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersRelExists_By_RevEntityGUIDs_RevRelValId -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].RELATIONSHIP_ID);
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

function revPersReadRevEntityRelId_By_SubjectGUID_TargetGUID_RevRelValId(revSubjectGUID, revTargetGUID, revRevValId, callback) {
    let todo = [revSubjectGUID, revTargetGUID, revRevValId];

    let stmt = "SELECT RELATIONSHIP_ID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE SUBJECT_GUID = ? AND TARGET_GUID = ? AND RELATIONSHIP_TYPE_VALUE_ID = ? ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityRelId_By_SubjectGUID_TargetGUID_RevRelValId -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].RELATIONSHIP_ID);
                } else {
                    callback(-1);
                }
            }
        });

        connection.release();
    });
}

var revPersReadRevEntityRelIds_By_ResStatus_SubjectGUID = (revResStatus, revSubjectGUID, callback) => {
    let todo = [revResStatus, revSubjectGUID];

    let stmt = "SELECT RELATIONSHIP_ID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE REV_RESOLVE_STATUS = ? AND SUBJECT_GUID = ? ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityRelIds_By_ResStatus_SubjectGUID -> " + err.message);
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

function revPersReadRevEntityRelationshipsByRemoteRevEntityGUID(remoteRevEntityGUID, callback) {
    let todo = [remoteRevEntityGUID, remoteRevEntityGUID];

    let stmt = "SELECT * FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE SUBJECT_GUID = ? OR TARGET_GUID = ? ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityRelationshipsByRemoteRevEntityGUID -> " + err.message);
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

function revPersRead_ID_SUBJET_GUID_TARGET_GUID_By_RemoteRevEntityGUID(remoteRevEntityGUIDsArr, callback) {
    let revINOptionsArr = "";

    for (let i = 0; i < remoteRevEntityGUIDsArr.length; i++) {
        if (i === 0) {
            revINOptionsArr += " IN (?";
        } else {
            revINOptionsArr += ", ?";
        }

        if (i == remoteRevEntityGUIDsArr.length - 1) revINOptionsArr += ")";
    }

    if (revINOptionsArr.localeCompare("") == 0) {
        callback([]);
        return;
    }

    let stmt = "SELECT RELATIONSHIP_ID, SUBJECT_GUID, TARGET_GUID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE SUBJECT_GUID ORDER BY RELATIONSHIP_ID DESC";

    stmt += revINOptionsArr;
    stmt += " OR TARGET_GUID" + revINOptionsArr;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, [remoteRevEntityGUIDsArr, remoteRevEntityGUIDsArr], function (err, row) {
            if (err) {
                console.log("ERR -> revPersRead_ID_SUBJET_GUID_TARGET_GUID_By_RemoteRevEntityGUID -> " + err.message);
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

function revPersReadRevRelsSubjects_By_RelID(revVarArgs, callback) {
    let todo = [revVarArgs.revRelId];

    let stmt = "SELECT SUBJECT_GUID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE RELATIONSHIP_ID DESC LIMIT 34";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevRelsSubjects_By_RelID -> " + err.message);
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

function revPersReadRevRelsSubjects_By_RemoteRevEntityGUID(remoteRevEntityGUID, callback) {
    let todo = [remoteRevEntityGUID, remoteRevEntityGUID];

    let stmt = "SELECT SUBJECT_GUID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE TARGET_GUID = ? ORDER BY RELATIONSHIP_ID DESC LIMIT 34";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevRelsSubjects_By_RemoteRevEntityGUID -> " + err.message);
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

function revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID(revVarArgs, callback) {
    let revValIdsArr = revVarArgs.rev_rel_type_val_id_arr.toString().split(",");

    let revEntityTargetGUID = revVarArgs.rev_entity_target_guid;

    let revResStatus = -1;

    if (revVarArgs.rev_res_status || revVarArgs.rev_res_status == 0) {
        revResStatus = revVarArgs.rev_res_status;
    }

    let revINOptionsArr = "";

    for (let i = 0; i < revValIdsArr.length; i++) {
        if (i === 0) {
            revINOptionsArr += " IN (?";
        } else {
            revINOptionsArr += ", ?";
        }

        if (i == revValIdsArr.length - 1) revINOptionsArr += ")";
    }

    revValIdsArr.push(revEntityTargetGUID);
    revValIdsArr.push(revResStatus);

    let stmt = "SELECT SUBJECT_GUID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE RELATIONSHIP_TYPE_VALUE_ID" + revINOptionsArr + " AND TARGET_GUID = ? AND REV_RESOLVE_STATUS = ? ORDER BY RELATIONSHIP_ID DESC LIMIT 34";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revValIdsArr, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID -> " + err.message);
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

function revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID(remoteRevEntityGUID, revRevValId, callback) {
    let todo = [remoteRevEntityGUID, revRevValId];

    let stmt = "SELECT TARGET_GUID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE SUBJECT_GUID = ? AND RELATIONSHIP_TYPE_VALUE_ID = ? ORDER BY RELATIONSHIP_ID DESC LIMIT 34";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID -> " + err.message);
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

var revPersReadRevRels_Subjects_TypeId_By_RemoteRevEntityGUID = (remoteRevEntityGUID, callback) => {
    let todo = [remoteRevEntityGUID, remoteRevEntityGUID];

    let stmt = "SELECT RELATIONSHIP_TYPE_VALUE_ID, SUBJECT_GUID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE TARGET_GUID = ? ORDER BY RELATIONSHIP_ID DESC LIMIT 200";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevRels_Subjects_TypeId_By_RemoteRevEntityGUID -> " + err.message);
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

function revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId(remoteRevEntityGUID, revRevValId, callback) {
    let todo = [remoteRevEntityGUID, remoteRevEntityGUID, revRevValId];

    let stmt = "SELECT REV_RESOLVE_STATUS, RELATIONSHIP_ID, RELATIONSHIP_TYPE_VALUE_ID, SUBJECT_GUID, TARGET_GUID, REV_PUBLISHED_DATE, REV_PUBLISHED_DATE FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE (SUBJECT_GUID = ? OR TARGET_GUID = ?) AND RELATIONSHIP_TYPE_VALUE_ID = ? ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId -> " + err.message);
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

function revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId(remoteRevEntityGUID, revRevValId, callback) {
    let todo = [remoteRevEntityGUID, remoteRevEntityGUID, revRevValId];

    let stmt = "SELECT SUBJECT_GUID, TARGET_GUID, RELATIONSHIP_TYPE_VALUE_ID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE (SUBJECT_GUID = ? OR TARGET_GUID = ?) AND RELATIONSHIP_TYPE_VALUE_ID = ? ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId -> " + err.message);
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

function revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID(remoteRevEntityGUID, callback) {
    if (!remoteRevEntityGUID || remoteRevEntityGUID == undefined) {
        callback(null);
        return;
    }

    let todo = [remoteRevEntityGUID, remoteRevEntityGUID];

    let stmt = "SELECT SUBJECT_GUID, TARGET_GUID, RELATIONSHIP_TYPE_VALUE_ID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE (SUBJECT_GUID = ? OR TARGET_GUID = ?) ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID -> " + err.message);
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

function revPersReadNewRevEntityRelsTargetsByRemoteRevEntityGUID(remoteRevEntityGUID, callback) {
    let todo = [remoteRevEntityGUID, 5];

    let stmt = "SELECT * FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE TARGET_GUID = ? AND RELATIONSHIP_TYPE_VALUE_ID = ? ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadNewRevEntityRelsTargetsByRemoteRevEntityGUID -> " + err.message);
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

function revPersReadRevEntityRels_By_TargetRevEntityGUID(revVarArgs, callback) {
    let remoteRevEntityTargetGUID = revVarArgs.remoteRevEntityTargetGUID;
    let revResStatus = revVarArgs.revResStatus;
    let revRelTypeValIdsArr = revVarArgs.revRelTypeValIdsArr;

    let revQueryLimit = 10;

    if (revVarArgs.revQueryLimit) revQueryLimit = revVarArgs.revQueryLimit;

    var stmt = "SELECT * FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE TARGET_GUID = ? AND REV_RESOLVE_STATUS = ? AND RELATIONSHIP_TYPE_VALUE_ID IN (";

    for (let i = 0; i < revRelTypeValIdsArr.length; i++) {
        if (i == 0) {
            stmt += "?";
        } else {
            stmt += ", ?";
        }
    }

    if (revVarArgs.revCollectionLimit && revVarArgs.revCollectionLimit > 1) {
        stmt += " LIMIT " + revVarArgs.revCollectionLimit;
    }

    stmt += ") ORDER BY RELATIONSHIP_ID DESC";

    let todo = [];

    todo.push(remoteRevEntityTargetGUID);
    todo.push(revResStatus);
    todo = todo.concat(revRelTypeValIdsArr);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("revPersReadRevEntityRels_By_TargetRevEntityGUID : " + err.message);
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

function revPersReadAllRevEntityRelsGUIDs_By_RevEntityGUID_RevRelId(remoteRevEntityGUID, todo, callback) {
    let stmt = `SELECT * FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE (SUBJECT_GUID = ` + remoteRevEntityGUID + ` OR TARGET_GUID = ` + remoteRevEntityGUID + `) AND RELATIONSHIP_TYPE_VALUE_ID IN (${todo.join(",")}) ORDER BY RELATIONSHIP_ID DESC`;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadAllRevEntityRelsGUIDs_By_RevEntityGUID_RevRelId -> " + err.message);
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

function revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds(revRelGUIDs, revRelIdsArr, callback) {
    let revINOptionsArr = "";

    for (let i = 0; i < revRelIdsArr.length; i++) {
        if (i === 0) {
            revINOptionsArr += " AND RELATIONSHIP_TYPE_VALUE_ID IN (?";
        } else {
            revINOptionsArr += ", ?";
        }

        if (i == revRelIdsArr.length - 1) {
            revINOptionsArr += ")";
        }
    }

    let stmt = "SELECT * FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE ((SUBJECT_GUID = ? AND TARGET_GUID = ?) OR (TARGET_GUID = ? AND SUBJECT_GUID = ?))" + revINOptionsArr + " ORDER BY RELATIONSHIP_ID DESC";

    let revTodo = [revRelGUIDs[0], revRelGUIDs[1], revRelGUIDs[0], revRelGUIDs[1]];
    revTodo = revTodo.concat(revRelIdsArr);

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, revTodo, function (err, row) {
            if (err) {
                console.log(stmt);
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

var revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelId = (revVarArgs, callback) => {
    let revEntityGUID = revVarArgs.revEntityGUID;
    let revRelTypeValIdsArr = revVarArgs.revRelTypeValIdsArr;
    let revResStatusArr = revVarArgs.revResStatusArr;

    let stmt = `SELECT * FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE REV_RESOLVE_STATUS IN(${revResStatusArr.join(",")}) AND (SUBJECT_GUID = ` + revEntityGUID + ` OR TARGET_GUID = ` + revEntityGUID + `) AND RELATIONSHIP_TYPE_VALUE_ID IN (${revRelTypeValIdsArr.join(",")}) ORDER BY RELATIONSHIP_ID DESC`;

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelId -> " + err.message);
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

var revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelId = (remoteRevEntityGUID, revRelId, callback) => {
    let todo = [remoteRevEntityGUID, revRelId];

    let stmt = "SELECT SUBJECT_GUID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE TARGET_GUID = ? AND RELATIONSHIP_TYPE_VALUE_ID = ? ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelId -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    callback([]);
                }
            }

            connection.release();
        });
    });
};

var revPersReadRevEntityRelsSubjectGUIDs_By_OwnerGUID_RevTargetGUID_RevRelId = (revRelOwnerGUID, remoteRevEntityGUID, revRelId, callback) => {
    let todo = [revRelOwnerGUID, remoteRevEntityGUID, revRelId];

    let stmt = "SELECT SUBJECT_GUID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE OWNER_GUID = ? AND TARGET_GUID = ? AND RELATIONSHIP_TYPE_VALUE_ID = ? ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityRelsSubjectGUIDs_By_OwnerGUID_RevTargetGUID_RevRelId -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row);
                } else {
                    callback([]);
                }
            }

            connection.release();
        });
    });
};

var revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId = (revSubjectGUID, revRelId, callback) => {
    let todo = [revSubjectGUID, revRelId];

    let stmt = "SELECT TARGET_GUID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE SUBJECT_GUID = ? AND RELATIONSHIP_TYPE_VALUE_ID = ? ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].TARGET_GUID);
                } else {
                    callback(-1);
                }
            }

            connection.release();
        });
    });
};

var revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId = (remoteRevEntityGUID, revRelId, callback) => {
    let todo = [remoteRevEntityGUID, revRelId];

    let stmt = "SELECT SUBJECT_GUID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE TARGET_GUID = ? AND RELATIONSHIP_TYPE_VALUE_ID = ? ORDER BY RELATIONSHIP_ID DESC LIMIT 1";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId -> " + err.message);
                callback(-1);
            } else {
                if (row && row.length > 0) {
                    callback(row[0].SUBJECT_GUID);
                } else {
                    callback(-1);
                }
            }

            connection.release();
        });
    });
};

function revPersReadRevEntityRel_Id_By_revEntitySubjectGUID_TargetGUID(revEntitySubjectGUID, revEntityTargetGUID, callback) {
    let todo = [revEntitySubjectGUID, revEntityTargetGUID];

    let stmt = "SELECT RELATIONSHIP_ID FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE SUBJECT_GUID = ? AND TARGET_GUID = ? ORDER BY RELATIONSHIP_ID DESC";

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, row) {
            if (err) {
                console.log("ERR -> revPersReadRevEntityRel_Id_By_revEntitySubjectGUID_TargetGUID -> " + err.message);
                callback(-1);
            } else {
                if (!row || !row.length || row.length < 0) {
                    callback(-1);
                } else callback(row[0].RELATIONSHIP_ID);
            }
        });

        connection.release();
    });
}

module.exports.revCountRels_By_TargetGUID_RelValId = revCountRels_By_TargetGUID_RelValId;
module.exports.revCountRels_By_SubjectGUID_RelValId = revCountRels_By_SubjectGUID_RelValId;

module.exports.revPersReadRelId_RelSubjectGUID_RelTargetGUID_CreationDate = revPersReadRelId_RelSubjectGUID_RelTargetGUID_CreationDate;
module.exports.revPersRelExists_By_RevEntityGUIDs_RevRelValId = revPersRelExists_By_RevEntityGUIDs_RevRelValId;
module.exports.revPersReadRevEntityRelId_By_SubjectGUID_TargetGUID_RevRelValId = revPersReadRevEntityRelId_By_SubjectGUID_TargetGUID_RevRelValId;

module.exports.revPersReadRevRelsSubjects_By_RelID = revPersReadRevRelsSubjects_By_RelID;
module.exports.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID = revPersReadRevRelsSubjects_By_RemoteRevEntityGUID;
module.exports.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID = revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID;
module.exports.revPersReadRevRels_Subjects_TypeId_By_RemoteRevEntityGUID = revPersReadRevRels_Subjects_TypeId_By_RemoteRevEntityGUID;

module.exports.revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID = revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID;

module.exports.revPersReadRevEntityRelationshipsByRemoteRevEntityGUID = revPersReadRevEntityRelationshipsByRemoteRevEntityGUID;
module.exports.revPersRead_ID_SUBJET_GUID_TARGET_GUID_By_RemoteRevEntityGUID = revPersRead_ID_SUBJET_GUID_TARGET_GUID_By_RemoteRevEntityGUID;
module.exports.revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId = revPersReadRevEntityRels_By_RemoteRevEntityGUID_RevRelValId;
module.exports.revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId = revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId;
module.exports.revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID = revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID;

module.exports.revPersReadRevEntityRel_Id_By_revEntitySubjectGUID_TargetGUID = revPersReadRevEntityRel_Id_By_revEntitySubjectGUID_TargetGUID;
module.exports.revPersReadNewRevEntityRelsTargetsByRemoteRevEntityGUID = revPersReadNewRevEntityRelsTargetsByRemoteRevEntityGUID;
module.exports.revPersReadRevEntityRels_By_TargetRevEntityGUID = revPersReadRevEntityRels_By_TargetRevEntityGUID;

module.exports.revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelId = revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelId;
module.exports.revPersReadRevEntityRelsSubjectGUIDs_By_OwnerGUID_RevTargetGUID_RevRelId = revPersReadRevEntityRelsSubjectGUIDs_By_OwnerGUID_RevTargetGUID_RevRelId;
module.exports.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId = revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId;
module.exports.revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId = revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId;
module.exports.revPersReadAllRevEntityRelsGUIDs_By_RevEntityGUID_RevRelId = revPersReadAllRevEntityRelsGUIDs_By_RevEntityGUID_RevRelId;
module.exports.revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds = revPersReadAllRevEntityRels_By_RelGUIDs_RevRelIds;
module.exports.revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelId = revPersReadAllRevEntityRels_By_ResStatus_RevEntityGUID_RevRelId;
module.exports.revPersReadRevEntityRelIds_By_ResStatus_SubjectGUID = revPersReadRevEntityRelIds_By_ResStatus_SubjectGUID;
