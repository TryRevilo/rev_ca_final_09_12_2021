const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

const rev_pers_create_rev_entity_service_helper = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");

/** REV START READ METADATA */
const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
/** REV END READ METADATA */

const rev_db_rels_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");

/** REV START READ ENTITIES */
const rev_db_entity_const_resolver = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");
/** REV END READ ENTITIES */

const rev_load_plugin_lang_const_resolver = require("../../rev_load_plugin_langs/rev_read/rev_load_plugin_lang_const_resolver");

var revSavePluginViewLang = async (revVarArgs) => {
    let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;
    let revLangJSON = revVarArgs.revLangJSON;
    let revPluginGUID = revVarArgs.revPluginGUID;

    let revPluginNameId = revLangJSON.rev_plugin_name_id;
    let revLangViewType = revLangJSON.revLangViewType;
    let revViewNameId = revLangJSON.revViewNameId;
    let revIsDefaultTrans = revLangJSON.rev_is_default_lang_trans;

    let revLangDetails = revLangJSON.revLangDetails;

    let revLangCode = revLangDetails.revLangCode;

    let revResStatus = 0;

    if (revIsDefaultTrans) {
        revResStatus = 1;
    }

    let revPersPluginViewEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPersPluginViewEntity._revEntityResolveStatus = revResStatus;
    revPersPluginViewEntity._revEntityChildableStatus = 1;
    revPersPluginViewEntity._revEntityType = "rev_object";
    revPersPluginViewEntity._revEntitySubType = "rev_plugin_view_lang";
    revPersPluginViewEntity._remoteRevEntityGUID = -1;
    revPersPluginViewEntity._revEntityOwnerGUID = revLoggedInEntityGUID;
    revPersPluginViewEntity._revEntityContainerGUID = -1;
    revPersPluginViewEntity._revTimeCreated = new Date().getTime();

    let revPersPluginViewInfoEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPersPluginViewInfoEntity._revEntityResolveStatus = -1;
    revPersPluginViewInfoEntity._revEntityChildableStatus = 1;
    revPersPluginViewInfoEntity._revEntityType = "rev_object";
    revPersPluginViewInfoEntity._revEntitySubType = "rev_entity_info";

    revPersPluginViewInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_lang_name_id", revPluginNameId));
    revPersPluginViewInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_lang_view_code", revLangCode));
    revPersPluginViewInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_lang_view_type", revLangViewType));
    revPersPluginViewInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_lang_view_name_id", revViewNameId));

    revPersPluginViewEntity._revInfoEntity = revPersPluginViewInfoEntity;

    /** REV START RELATE TO PLUGIN */
    let revPersPluginLangTransEntityRel = rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT();
    revPersPluginLangTransEntityRel._revResolveStatus = 0;
    revPersPluginLangTransEntityRel._revEntityRelationshipType = "rev_lang_view_of_plugin";
    revPersPluginLangTransEntityRel._remoteRevEntityTargetGUID = revPluginGUID;
    revPersPluginLangTransEntityRel._remoteRevEntitySubjectGUID = revPersPluginViewEntity._remoteRevEntityGUID;

    revPersPluginViewEntity._revSubjectEntityRelationships.push(revPersPluginLangTransEntityRel);
    /** REV END RELATE TO PLUGIN */

    /** REV START RELATE TO LANG CODE */
    let revLangCodeEntity = await rev_load_plugin_lang_const_resolver.revGetLangCodeEntity(revLangCode);

    if (rev_json_functions.revIsEmptyJSONObject(revLangCodeEntity)) {
        return;
    }

    let revPersPluginLangCodeEntityRel = rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT();
    revPersPluginLangCodeEntityRel._revResolveStatus = 0;
    revPersPluginLangCodeEntityRel._revEntityRelationshipType = "rev_lang_code_of";
    revPersPluginLangCodeEntityRel._remoteRevEntityTargetGUID = revPersPluginViewEntity._remoteRevEntityGUID;
    revPersPluginLangCodeEntityRel._remoteRevEntitySubjectGUID = revLangCodeEntity._remoteRevEntityGUID;

    revPersPluginViewEntity._revTargetEntityRelationships.push(revPersPluginLangCodeEntityRel);
    /** REV END RELATE TO LANG CODE */

    let revPersPluginViewEntityRetArr = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPersPluginViewEntity]);
    revPersPluginViewEntity._remoteRevEntityGUID = revPersPluginViewEntityRetArr.filter[0]._remoteRevEntityGUID;

    return revPersPluginViewEntity;
};

module.exports.revSavePluginViewLang = revSavePluginViewLang;
