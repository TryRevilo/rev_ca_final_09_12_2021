const rev_plugin_loaders_helper_funcs = require("../../rev_plugin_loaders_helper_funcs");

const rev_plugins_objects = require("../../../rev_plugins_objects");

const rev_load_plugin_lang_const_resolver = require("../rev_read/rev_load_plugin_lang_const_resolver");

const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

const rev_pers_create_rev_entity_service_helper = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");

/** REV START READ METADATA */
const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
const rev_pers_read_rev_entity_metadata_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");
/** REV END READ METADATA */

const rev_db_rels_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");

/** REV START READ ENTITIES */
const rev_db_entity_const_resolver = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");
const rev_pers_read_rev_entity_info_wrapper = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_entity_info_wrapper");
/** REV END READ ENTITIES */

/** REV START READ RELS */
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");
/** REV END READ RELS */

const rev_pers_lang_code = require("../../rev_load_plugin_langs/rev_pers/rev_pers_lang_code");

var revGetLangCodeEntityGUID = async (revVarArgs) => {
    let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;
    let revLangDetails = revVarArgs.revLangDetails;

    let revLangCode = revLangDetails.revLangCode;

    let revLangCodeInfoEntityGUID = await rev_pers_read_rev_entity_metadata_service_helper.revPersReadRevEntityMetadataOwnerGUID_By_UniqueId_Serv(revLangCode);

    let revLangCodeEntityGUID = -1;

    if (revLangCodeInfoEntityGUID < 1) {
        revLangCodeEntityGUID = await rev_pers_lang_code.revCreateLangCodeEntity({
            "revLoggedInEntityGUID": revLoggedInEntityGUID,
            "revLangDetails": revLangDetails,
        });
    } else {
        revLangCodeEntityGUID = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId_Serv(revLangCodeInfoEntityGUID, 0);
    }

    return revLangCodeEntityGUID;
};

var revGetPluginLangViewEntity = async (revPluginGUID, revLangViewType, revViewNameId, revLangCode) => {
    let revPluginViewEntity;

    let revPluginViewEntityGUIDsFilterArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelIdServ(revPluginGUID, 24);

    let revSavedPluginViewEntitiesArr = await rev_pers_read_rev_entity_info_wrapper.revGetFilledEntities_Serv(revPluginViewEntityGUIDsFilterArr.filter);

    for (let i = 0; i < revSavedPluginViewEntitiesArr.length; i++) {
        let revCurrPluginViewEntity = revSavedPluginViewEntitiesArr[i];
        let revCurrPluginViewEntityInfo = revCurrPluginViewEntity._revInfoEntity;

        let revCurrLangCode = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revCurrPluginViewEntityInfo._revEntityMetadataList, "rev_plugin_lang_view_code");
        let revCurrLangViewType = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revCurrPluginViewEntityInfo._revEntityMetadataList, "rev_plugin_lang_view_type");
        let revCurrLangViewNameId = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revCurrPluginViewEntityInfo._revEntityMetadataList, "rev_plugin_lang_view_name_id");

        if (!revCurrLangCode || !revCurrLangViewType || !revCurrLangViewNameId) {
            continue;
        }

        if (
            /** */
            revCurrLangCode.localeCompare(revLangCode) == 0 &&
            revCurrLangViewType.localeCompare(revLangViewType) == 0 &&
            revCurrLangViewNameId.localeCompare(revViewNameId) == 0
        ) {
            revPluginViewEntity = revCurrPluginViewEntity;
            break;
        }
    }

    return revPluginViewEntity;
};

module.exports.revGetLangCodeEntityGUID = revGetLangCodeEntityGUID;
module.exports.revGetPluginLangViewEntity = revGetPluginLangViewEntity;
