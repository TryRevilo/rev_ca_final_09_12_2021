const rev_db_init = require("../../../../../rev_db_init/rev_db_init");

function revRelationshipType(relType) {
    let relTypeValId;

    switch (relType) {
        case "rev_entity_info":
            relTypeValId = 0;
            break;
        case "rev_timeline_entry":
            relTypeValId = 1;
            break;
        case "kiwi_of":
            relTypeValId = 2;
            break;
        case "rev_pics_album_of":
            relTypeValId = 3;
            break;
        case "rev_picture_of":
            relTypeValId = 4;
            break;
        case "rev_entity_connect_members":
            relTypeValId = 5;
            break;
        case "rev_comment":
            relTypeValId = 6;
            break;
        case "rev_entity_space_member":
            relTypeValId = 7;
            break;
        case "rev_video_of":
            relTypeValId = 8;
            break;
        case "rev_vids_album_of":
            relTypeValId = 9;
            break;
        case "rev_msg_recipient_of":
            relTypeValId = 10;
            break;
        case "rev_admin_of":
            relTypeValId = 11;
            break;
        case "rev_contact_of":
            relTypeValId = 12;
            break;
        case "rev_recommendation":
            relTypeValId = 13;
            break;
        case "rev_mint_conversation_member_of":
            relTypeValId = 14;
            break;
        case "rev_mint_conversation_target_of":
            relTypeValId = 15;
            break;
        case "rev_siblings":
            relTypeValId = 16;
            break;
        case "rev_parent":
            relTypeValId = 17;
            break;
        case "rev_mother":
            relTypeValId = 18;
            break;
        case "rev_plugin_hook_of":
            relTypeValId = 19;
            break;
        case "rev_remote_plugin_hook_of":
            relTypeValId = 20;
            break;
        case "rev_plugin_hook_remote_env_of":
            relTypeValId = 21;
            break;
        case "rev_plugin_form_of":
            relTypeValId = 22;
            break;
        case "rev_lang_view_of_plugin":
            relTypeValId = 24;
            break;
        case "rev_lang_code_of":
            relTypeValId = 25;
            break;
        case "rev_lang_phrase_of":
            relTypeValId = 26;
            break;
        case "rev_grand_parent":
            relTypeValId = 27;
            break;
        case "rev_grand_mother":
            relTypeValId = 28;
            break;
        case "rev_plugin_edit_of":
            relTypeValId = 29;
            break;
        default:
            relTypeValId = -1;
    }

    return relTypeValId;
}

function revRelationshipTypeVal(relTypeValId) {
    let relTypeVal;

    switch (relTypeValId) {
        case 0:
            relTypeVal = "rev_entity_info";
            break;
        case 1:
            relTypeVal = "rev_timeline_entry";
            break;
        case 2:
            relTypeVal = "kiwi_of";
            break;
        case 3:
            relTypeVal = "rev_pics_album_of";
            break;
        case 4:
            relTypeVal = "rev_picture_of";
            break;
        case 5:
            relTypeVal = "rev_entity_connect_members";
            break;
        case 6:
            relTypeVal = "rev_comment";
            break;
        case 7:
            relTypeVal = "rev_entity_space_member";
            break;
        case 8:
            relTypeVal = "rev_video_of";
            break;
        case 9:
            relTypeVal = "rev_vids_album_of";
            break;
        case 10:
            relTypeVal = "rev_msg_recipient_of";
            break;
        case 11:
            relTypeVal = "rev_admin_of";
            break;
        case 12:
            relTypeVal = "rev_contact_of";
            break;
        case 13:
            relTypeVal = "rev_recommendation";
            break;
        case 14:
            relTypeVal = "rev_mint_conversation_member_of";
            break;
        case 15:
            relTypeVal = "rev_mint_conversation_target_of";
            break;
        case 16:
            relTypeVal = "rev_siblings";
            break;
        case 17:
            relTypeVal = "rev_parent_of";
            break;
        case 18:
            relTypeVal = "rev_mother";
            break;
        case 19:
            relTypeVal = "rev_plugin_hook_of";
            break;
        case 20:
            relTypeVal = "rev_remote_plugin_hook_of";
            break;
        case 21:
            relTypeVal = "rev_plugin_hook_remote_env_of";
            break;
        case 22:
            relTypeVal = "rev_plugin_form_of";
            break;
        case 24:
            relTypeVal = "rev_lang_view_of_plugin";
            break;
        case 25:
            relTypeVal = "rev_plugin_lang_code_of";
            break;
        case 26:
            relTypeVal = "rev_lang_phrase_of";
            break;
        case 27:
            relTypeVal = "rev_grand_parent";
            break;
        case 28:
            relTypeVal = "rev_grand_mother";
            break;
        case 29:
            relTypeVal = "rev_plugin_edit_of";
            break;
        default:
            relTypeVal = -1;
    }

    return relTypeVal;
}

let revPersRevRelExistsPromise = (revData) => {
    return new Promise(function (resolve, reject) {
        let stmt = "SELECT 1 FROM REV_ENTITY_RELATIONSHIPS_TABLE WHERE (SUBJECT_GUID = ? AND TARGET_GUID = ?) AND RELATIONSHIP_TYPE_VALUE_ID = ?";

        if (!revData || !revData._remoteRevEntitySubjectGUID || !revData._remoteRevEntityTargetGUID || !revData._revEntityRelationshipType) {
            console.log("!revData || !revData._remoteRevEntitySubjectGUID || !revData._remoteRevEntityTargetGUID || !revData._revEntityRelationshipType");
            resolve(false);
            return;
        }

        let todo = [revData._remoteRevEntitySubjectGUID, revData._remoteRevEntityTargetGUID, revRelationshipType(revData._revEntityRelationshipType)];

        rev_db_init.getRevConnection(function (connection) {
            connection.query(stmt, todo, function (err, row) {
                if (err) {
                    console.log("ERR -> revPersRevRelExistsPromise -> " + err.message);
                    resolve(true);
                } else {
                    if (row && row.length > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });

            connection.release();
        });
    });
};

function revPersSaveRevEntityRelationship(revData, callback) {
    let stmt = "INSERT INTO REV_ENTITY_RELATIONSHIPS_TABLE (REV_RESOLVE_STATUS, OWNER_GUID, SUBJECT_GUID, TARGET_GUID, RELATIONSHIP_TYPE_VALUE_ID, REV_PUBLISHED_DATE, REV_UPDATED_DATE) VALUES(?, ?, ?, ?, ?, ?, ?)";

    let todo = [revData._revResolveStatus, revData._revOwnerGUID, revData._remoteRevEntitySubjectGUID, revData._remoteRevEntityTargetGUID, revRelationshipType(revData._revEntityRelationshipType), new Date().getTime(), new Date().getTime()];

    rev_db_init.getRevConnection((connection) => {
        connection.query(stmt, todo, function (err, res) {
            if (err) {
                console.log("ERR -> revPersSaveRevEntityRelationship -> " + err.message);
                callback(-1);
            } else {
                let retRevEntityRetRel = {};

                retRevEntityRetRel["_revResolveStatus"] = revData._revResolveStatus;
                retRevEntityRetRel["_revOwnerGUID"] = revData._revOwnerGUID;
                retRevEntityRetRel["_revEntitySubjectGUID"] = revData._revEntitySubjectGUID;
                retRevEntityRetRel["_remoteRevEntitySubjectGUID"] = revData._remoteRevEntitySubjectGUID;
                retRevEntityRetRel["_revEntityTargetGUID"] = revData._revEntityTargetGUID;
                retRevEntityRetRel["_remoteRevEntityTargetGUID"] = revData._remoteRevEntityTargetGUID;
                retRevEntityRetRel["_revEntityRelationshipType"] = revData._revEntityRelationshipType;
                retRevEntityRetRel["_revEntityRelationshipId"] = res.insertId;
                retRevEntityRetRel["_revEntityRelationshipRemoteId"] = res.insertId;

                callback(retRevEntityRetRel);
            }
        });

        connection.release();
    });
}

module.exports.revRelationshipType = revRelationshipType;

module.exports.revPersRevRelExistsPromise = revPersRevRelExistsPromise;
module.exports.revPersSaveRevEntityRelationship = revPersSaveRevEntityRelationship;
module.exports.revRelationshipTypeVal = revRelationshipTypeVal;
