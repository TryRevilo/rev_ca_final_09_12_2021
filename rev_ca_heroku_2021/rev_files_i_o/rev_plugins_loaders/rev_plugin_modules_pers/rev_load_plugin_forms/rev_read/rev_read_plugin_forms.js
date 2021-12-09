const rev_strings_helper_funcs = require("../../../../../rev_helper_functions/rev_strings_helper_funcs");
const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

/** REV START REV ENTITY */
const rev_db_entity_const_resolver = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");
/** REV END REV ENTITY */

/** REV START READ METADATA */
const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
const rev_pers_read_rev_entity_metadata_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");
/** REV END READ METADATA */

/** REV START RELS */
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");
/** REV END RELS */

const rev_plugins_objects = require("../../../rev_plugins_objects");

var revGetPluginFormEntity_By_Plugin_Name = async (revPluginEntityGUID, revFormNameId) => {
    let revPluginFormInfosMetadataArr = await rev_pers_read_rev_entity_metadata_service_helper.revPersReadMetadataValuesArr_By_MetadataName_MetadataValue_Serv("rev_plugin_form_name", revFormNameId);

    let revPluginFormEntity;

    let revRelTypeValId = rev_pers_read_rev_entity_relationship_service_helper.revGetRelationshipTypeValId("rev_plugin_form_of");

    for (let i = 0; i < revPluginFormInfosMetadataArr.length; i++) {
        let revPluginInfoMetadata = revPluginFormInfosMetadataArr[i];
        let revPluginFormInfoEntityGUID = revPluginInfoMetadata.REV_ENTITY_GUID;

        let revPluginFormEntityGUID = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId_Serv(revPluginFormInfoEntityGUID, 0);

        let revCurrPluginFormEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revPluginFormEntityGUID);

        let revPlugin_Form_Entity_Rel = await rev_pers_read_rev_entity_relationship_service_helper.revPersRelExists_By_RevEntityGUIDs_RevRelValId_Serv({
            "revSubjectGUID": revPluginFormEntityGUID,
            "revTargetGUID": revPluginEntityGUID,
            "revRevValId": revRelTypeValId,
        });

        if (revPlugin_Form_Entity_Rel > 0) {
            revPluginFormEntity = revCurrPluginFormEntity;
            break;
        }
    }

    return revPluginFormEntity;
};

module.exports.revGetPluginFormEntity_By_Plugin_Name = revGetPluginFormEntity_By_Plugin_Name;
