const rev_plugin_loaders_helper_funcs = require("../../rev_plugin_loaders_helper_funcs");

const rev_plugins_objects = require("../../../rev_plugins_objects");

const rev_load_plugin_lang_const_resolver = require("../rev_read/rev_load_plugin_lang_const_resolver");

const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");
const rev_strings_helper_funcs = require("../../../../../rev_helper_functions/rev_strings_helper_funcs");

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

const rev_pers_create_rev_entity_rel_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_create/rev_pers_create/rev_service_heper/rev_pers_create_rev_entity_rel_service_helper");

const rev_pers_plugins = require("../../rev_plugin_pers/rev_pers/rev_pers_plugins");
const rev_read_plugins = require("../../rev_plugin_pers/rev_read/rev_read_plugins");

const rev_pers_lang_view = require("./rev_pers_lang_view");
const rev_pers_lang_phrase = require("./rev_pers_lang_phrase");

const rev_pers_lang_code = require("../rev_pers/rev_pers_lang_code");
const rev_lib_read_langs = require("../rev_read/rev_lib_read_langs");

/** REV LANG CODE */
// lang code -> lang details
// plugin -> {entity -> rev_plugin} {rel -> rev_lang_view_of_plugin -> lang code}
// view type -> view-type - name-id
// lang phrases entitities
/** REV LANG CODE */

var revLoadPluginLangs = async (revVarArgs) => {
    let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;

    let revLangJSON = revVarArgs.revLangJSON;

    let revLangDetails = revLangJSON.revLangDetails;

    let revLangCodeGUID = await rev_lib_read_langs.revGetLangCodeEntityGUID({
        "revLoggedInEntityGUID": revLoggedInEntityGUID,
        "revLangDetails": revLangDetails,
    });

    if (rev_strings_helper_funcs.revIsEmptyVar(revLangCodeGUID) || revLangCodeGUID < 1) {
        return;
    }

    let revLangCode = revLangDetails.revLangCode;

    let revPluginNameId = revLangJSON.rev_plugin_name_id;
    let revLangViewType = revLangJSON.revLangViewType;
    let revViewNameId = revLangJSON.revViewNameId;

    /** REV START READ PLUGIN */
    let revPlugin = await rev_read_plugins.revGetPluginEntity_By_Plugin_Name(revPluginNameId);

    let revPluginGUID = -1;

    if (!rev_json_functions.revIsEmptyJSONObject(revPlugin)) {
        revPluginGUID = revPlugin._remoteRevEntityGUID;
    }

    if (revPluginGUID < 1) {
        return;
    }
    /** REV END READ PLUGIN */

    /** REV START LANG VIEW */
    let revPluginViewEntity = await rev_lib_read_langs.revGetPluginLangViewEntity(revPluginGUID, revLangViewType, revViewNameId, revLangCode);

    if (rev_json_functions.revIsEmptyJSONObject(revPluginViewEntity) || (revPluginGUID > 0 && revPluginViewEntity._remoteRevEntityGUID < 1)) {
        revPluginViewEntity = await rev_pers_lang_view.revSavePluginViewLang({
            "revLoggedInEntityGUID": revLoggedInEntityGUID,
            "revLangJSON": revLangJSON,
            "revPluginGUID": revPluginGUID,
        });
    }

    if (rev_json_functions.revIsEmptyJSONObject(revPluginViewEntity)) {
        return;
    }
    /** REV END LANG VIEW */

    /** REV START SAVE LANG PHRASES */
    let revTransLang = revLangJSON.rev_lang;

    revPluginViewEntity["revPersLangPhraseEntitiesArr"] = [];

    for (let revLangKey in revTransLang) {
        let revLangPhraseKey = revTransLang[revLangKey];
        let revPersLangPhraseEntity = await rev_pers_lang_phrase.revCreateLangPhraseEntity({
            "revLoggedInEntityGUID": revLoggedInEntityGUID,
            "revLangPhraseKey": revLangKey,
            "revLangPhraseVal": revLangPhraseKey,
            "revPluginViewGUID": revPluginViewEntity._remoteRevEntityGUID,
        });

        revPluginViewEntity.revPersLangPhraseEntitiesArr.push(revPersLangPhraseEntity);
    }
    /** REV END SAVE LANG PHRASES */

    if (revLangJSON.rev_is_default_lang_trans) {
        let revSavedPluginLangDefaults = await rev_load_plugin_lang_const_resolver.revPluginLangDefaultsConstructor(revPluginViewEntity, revPluginNameId, revLangCode);
    }

    let revSavedPluginLang = await rev_load_plugin_lang_const_resolver.revPluginLangConstructor(revPluginViewEntity);

    await rev_load_plugin_lang_const_resolver.revLoadSavedLangs();

    return revPluginViewEntity;
};

module.exports.revLoadPluginLangs = revLoadPluginLangs;
