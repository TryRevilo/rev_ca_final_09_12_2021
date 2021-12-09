const rev_db_init = require("../../../../../rev_db_init/rev_db_init");
const rev_pers_update_rev_entity_serv = require("../../../rev_pers_lib_update/rev_service_heper/rev_pers_update_rev_entity_serv");

var revPersSaveRevEntity = async (revData, callback) => {
    if (!revData) {
        callback(-1);
        return;
    }

    let revEntityOwnerGUID = revData._revEntityOwnerGUID;
    let revEntityContainerGUID = revData._revEntityContainerGUID;
    let revEntityType = revData._revEntityType;
    let revEntitySubType = revData._revEntitySubType;

    if (!revEntityOwnerGUID || revEntityOwnerGUID < 1 || !revEntityType || !revEntitySubType) {
        if (revEntityType.localeCompare("rev_user_entity") !== 0) {
            callback(-1);
            return;
        }
    }

    let promiseToSaveRevEntity = (revData) => {
        return new Promise((resolve, reject) => {
            let stmt = "INSERT INTO REV_ENTITY_TABLE (\n" + "REV_CHILDABLE_STATUS, \n" + "REV_ENTITY_OWNER_GUID, \n" + "REV_ENTITY_CONTAINER_GUID, \n" + "REV_ENTITY_SITE_GUID, \n" + "REV_ENTITY_ACCESS_PERMISSION, \n" + "REV_ENTITY_TYPE, \n" + "REV_ENTITY_SUB_TYPE, \n" + "COLUMN_NAME_CREATED_DATE, \n" + "COLUMN_NAME_UPDATED_DATE, \n" + "REV_CREATED_DATE, \n" + "REV_PUBLISHED_DATE, \n" + "REV_UPDATED_DATE\n" + " ) \n" + `VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            let todo = [revData["_revEntityChildableStatus"], revEntityOwnerGUID, revEntityContainerGUID, revData["_revEntitySiteGUID"], revData["_revEntityAccessPermission"], revEntityType, revEntitySubType, revData["_timeCreated"], revData["_timeUpdated"], revData["_revTimeCreated"], +new Date(), revData["_revTimePublishedUpdated"]];

            rev_db_init.getRevConnection((connection) => {
                connection.query(stmt, todo, function (err, res) {
                    if (err) {
                        console.log("ERR -> revPersSaveRevEntity -> " + err.message);
                        resolve(-1);
                    }
                    resolve(res.insertId);
                });

                connection.release();
            });
        });
    };

    if (revData["_remoteRevEntityGUID"] == -1) {
        try {
            revData["_remoteRevEntityGUID"] = await promiseToSaveRevEntity(revData);
        } catch (error) {
            console.log("ERR -> revPersSaveRevEntity -> " + err);
        }
    } else {
        await rev_pers_update_rev_entity_serv.promiseToRevPersUpdateResolvedRevEntity_Serv(revData["_remoteRevEntityGUID"]);
    }

    callback(revData["_remoteRevEntityGUID"]);
};

module.exports.revPersSaveRevEntity = revPersSaveRevEntity;
