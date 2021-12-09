/** REV START REV ENTITY */
const rev_pers_update_rev_entity_accessor = require("../rev_accessor/rev_pers_update_rev_entity_accessor");
/** REV END REV ENTITY */

/** REV START METADATA */
const rev_pers_create_metadata_service_helper = require("../../../../rev_entity_data/rev_pers_metadata/rev_pers_lib_create/rev_pers_create/rev_service_heper/rev_pers_create_metadata_service_helper");
const rev_pers_update_rev_entity_metadata_value_serv = require("../../../../rev_entity_data/rev_pers_metadata/rev_pers_lib_update/rev_service_helper/rev_pers_update_rev_entity_metadata_value_serv");
const rev_pers_delete_metadata_serv = require("../../../../rev_entity_data/rev_pers_metadata/rev_pers_lib_delete/rev_service_heper/rev_pers_delete_metadata_serv");
/** REV END METADATA */

const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

var promiseToRevPersUpdateResolvedRevEntity_Serv = (remoteRevEntityGUID) => {
    new Promise((resolve, reject) => {
        rev_pers_update_rev_entity_accessor.revPersUpdateResolvedRevEntity(remoteRevEntityGUID, function (result) {});
        resolve();
    });
};

var revUpdateRevEntityData_Serv = async (revEntitiesUpdateDataArr) => {
    if (rev_json_functions.revIsEmptyJSONObject(revEntitiesUpdateDataArr)) {
        return {};
    }

    let revNewMetadatIdsArr = [];
    let revUpdateMetadataFilter = [];
    let revDelAffectedRowsResArr = [];

    for (let i = 0; i < revEntitiesUpdateDataArr.length; i++) {
        let revEntitiesUpdateData = revEntitiesUpdateDataArr[i];

        console.log("revEntitiesUpdateData : " + JSON.stringify(revEntitiesUpdateData));

        if (rev_json_functions.revIsEmptyJSONObject(revEntitiesUpdateData)) {
            continue;
        }

        /** START REV DELETES */
        if (revEntitiesUpdateData.revEntityDeleteMetadataArr) {
            let revEntityDeleteMetadataArr = revEntitiesUpdateData.revEntityDeleteMetadataArr;

            let revDeleteMetadatIdsArr = [];

            for (let m = 0; m < revEntityDeleteMetadataArr.length; m++) {
                let revDeleteMetadata = revEntityDeleteMetadataArr[m];

                if (revDeleteMetadata && revDeleteMetadata.remoteRevMetadataId && revDeleteMetadata.remoteRevMetadataId > 0 && !revDeleteMetadatIdsArr.includes(revDeleteMetadata.remoteRevMetadataId)) {
                    revDeleteMetadatIdsArr.push(revDeleteMetadata.remoteRevMetadataId);
                }
            }

            let revDelAffectedRowsRes = await rev_pers_delete_metadata_serv.revPersDeleteMetadataMulti_By_MetadataIds_Serv(revDeleteMetadatIdsArr);

            revDelAffectedRowsResArr.push(revDelAffectedRowsRes);
        }
        /** END REV DELETES */

        /** REV START NEW METADATA */
        if (revEntitiesUpdateData.revEntityNewMetaDataArr) {
            let revEntityNewMetaDataArr = revEntitiesUpdateData.revEntityNewMetaDataArr;

            for (let m = 0; m < revEntityNewMetaDataArr.length; m++) {
                let revNewMetadata = revEntityNewMetaDataArr[m];

                if (revNewMetadata) {
                    let revNewMetadataResData = await rev_pers_create_metadata_service_helper.promiseToSaveRevEntityMetadataItem(revNewMetadata, revNewMetadata.revEntityGUID);
                    revNewMetadatIdsArr.push(revNewMetadataResData.metadataId);
                }
            }
        }
        /** REV END NEW METADATA */

        /** START REV UPDATES */
        if (revEntitiesUpdateData.revEntityUpdateMetaDataArr) {
            let revCurrUpdateMetadataFilter = await rev_pers_update_rev_entity_metadata_value_serv.revPersUpdaterevEntityMetadataValueList_By_MetadataId_Serv(revEntitiesUpdateData.revEntityUpdateMetaDataArr);

            revUpdateMetadataFilter.push(revCurrUpdateMetadataFilter);
        }
        /** END REV UPDATES */
    }

    return {
        "revAffecetedRows": revUpdateMetadataFilter,
        "revNewMetadatIdsArr": revNewMetadatIdsArr,
        "revDelAffectedRowsResArr": revDelAffectedRowsResArr,
    };
};

module.exports.promiseToRevPersUpdateResolvedRevEntity_Serv = promiseToRevPersUpdateResolvedRevEntity_Serv;
module.exports.revUpdateRevEntityData_Serv = revUpdateRevEntityData_Serv;
