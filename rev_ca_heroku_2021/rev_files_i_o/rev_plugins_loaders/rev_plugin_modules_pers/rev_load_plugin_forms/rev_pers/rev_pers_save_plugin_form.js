const rev_plugin_loaders_helper_funcs = require("../../rev_plugin_loaders_helper_funcs");

const rev_plugins_objects = require("../../../rev_plugins_objects");

const rev_load_plugin_forms_const_resolver = require("../rev_read/rev_load_plugin_forms_const_resolver");

const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

const rev_pers_create_rev_entity_service_helper = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");

const rev_db_entity_const_resolver = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");

const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
const rev_pers_read_rev_entity_metadata_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");

const rev_db_rels_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");

/** REV START SAVE LANGS */
const rev_load_plugin_langs_pers = require("../../rev_load_plugin_langs/rev_pers/rev_load_plugin_langs_pers");
/** REV END SAVE LANGS */

var revSavePluginForm = async (revVarArgs) => {
    let revPluginName = revVarArgs.rev_plugin_name;
    let revNameId = revVarArgs.revNameId;
    let revOverrideView = revVarArgs.revOverrideView;
    let revMenuAreasArr = revVarArgs.revMenuAreas;
    let revMenuItemsArr = revVarArgs.revMenuItems;
    let revCSSFilesArr = revVarArgs.revCSSFiles;

    let revResStatus = -1;

    if (revVarArgs.revResStatus || revVarArgs.revResStatus == 0) {
        revResStatus = revVarArgs.revResStatus;
    }

    let revPersPluginFormEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPersPluginFormEntity._revEntityResolveStatus = revResStatus;
    revPersPluginFormEntity._revEntityChildableStatus = 1;
    revPersPluginFormEntity._revEntityType = "rev_object";
    revPersPluginFormEntity._revEntitySubType = "rev_plugin_form";
    revPersPluginFormEntity._remoteRevEntityGUID = -1;
    revPersPluginFormEntity._revEntityOwnerGUID = revVarArgs.revLoggedInEntityGUID;
    revPersPluginFormEntity._revEntityContainerGUID = -1;
    revPersPluginFormEntity._revTimeCreated = new Date().getTime();

    let revPersPluginFormInfoEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPersPluginFormInfoEntity._revEntityResolveStatus = -1;
    revPersPluginFormInfoEntity._revEntityChildableStatus = 1;
    revPersPluginFormInfoEntity._revEntityType = "rev_object";
    revPersPluginFormInfoEntity._revEntitySubType = "rev_entity_info";

    revPersPluginFormInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_name_id", revPluginName));
    revPersPluginFormInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_form_name", revNameId));
    revPersPluginFormInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_override_view", revOverrideView));

    if (Array.isArray(revMenuAreasArr)) {
        for (let i = 0; i < revMenuAreasArr.length; i++) {
            revPersPluginFormInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_menu_areas", revMenuAreasArr[i]));
        }
    }

    if (Array.isArray(revMenuItemsArr)) {
        for (let i = 0; i < revMenuItemsArr.length; i++) {
            revPersPluginFormInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_menu_items", revMenuItemsArr[i]));
        }
    }

    if (Array.isArray(revCSSFilesArr)) {
        for (let i = 0; i < revCSSFilesArr.length; i++) {
            revPersPluginFormInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_css_files", revCSSFilesArr[i]));
        }
    }

    revPersPluginFormEntity._revInfoEntity = revPersPluginFormInfoEntity;

    let revPersPluginFormEntityRel = rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT();
    revPersPluginFormEntityRel._revResolveStatus = 0;
    revPersPluginFormEntityRel._revEntityRelationshipType = "rev_plugin_form_of";
    revPersPluginFormEntityRel._remoteRevEntityTargetGUID = revVarArgs.revPluginContainerEntityGUID;
    revPersPluginFormEntityRel._remoteRevEntitySubjectGUID = revPersPluginFormEntity._remoteRevEntityGUID;

    revPersPluginFormEntity._revSubjectEntityRelationships.push(revPersPluginFormEntityRel);

    let revPersPluginFormEntityRetArr = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPersPluginFormEntity]);

    revPersPluginFormEntity._remoteRevEntityGUID = revPersPluginFormEntityRetArr.filter[0]._remoteRevEntityGUID;

    return revPersPluginFormEntity;
};

module.exports.revSavePluginForm = revSavePluginForm;
