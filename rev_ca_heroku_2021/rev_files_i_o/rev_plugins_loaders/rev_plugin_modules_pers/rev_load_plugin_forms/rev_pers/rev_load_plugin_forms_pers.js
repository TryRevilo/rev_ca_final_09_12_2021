const rev_plugin_loaders_helper_funcs = require("../../rev_plugin_loaders_helper_funcs");

const rev_plugins_objects = require("../../../rev_plugins_objects");

const rev_load_plugin_forms_const_resolver = require("../rev_read/rev_load_plugin_forms_const_resolver");

const rev_strings_helper_funcs = require("../../../../../rev_helper_functions/rev_strings_helper_funcs");
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

const rev_pers_save_plugin_form = require("./rev_pers_save_plugin_form");

const rev_read_plugin_forms = require("../rev_read/rev_read_plugin_forms");

var revLoadPluginForms = async (revVarArgs) => {
    let revPluginsObjects = rev_plugins_objects.revPluginsObjects;

    let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;
    let revPlugin = revVarArgs.revPlugin;
    let revPluginContainerEntity = revVarArgs.revPluginContainerEntity;

    let revPluginName = revPlugin.revPluginName;

    if (!revPluginName) {
        return;
    }

    if (!revPluginsObjects.revLoadedPlugins[revPluginName].hasOwnProperty("revForms")) {
        revPluginsObjects.revLoadedPlugins[revPluginName]["revForms"] = [];
    }

    let revRemotePluginHookEntitiesArr = [];

    if (revPlugin.revForms && revPlugin.revForms.length > 0) {
        for (let i = 0; i < revPlugin.revForms.length; i++) {
            let revForm = revPlugin.revForms[i];

            if (!revForm()) {
                continue;
            }

            revForm = revForm();

            if (!revForm.revNameId) {
                continue;
            }

            let revPluginName = revForm.rev_plugin_name;
            let revNameId = revForm.revNameId;
            let revOverrideView = revForm.revOverrideView;
            let revMenuAreasArr = revForm.revMenuAreas;
            let revMenuItemsArr = revForm.revMenuItems;
            let revCSSFilesArr = revForm.revCSSFiles;

            let revCurrForm = {
                "rev_plugin_name": revPluginName,
                "revNameId": revNameId,
                "revOverrideView": revOverrideView,
                "revMenuAreas": revMenuAreasArr,
                "revMenuItems": revMenuItemsArr,
                "revCSSFiles": revCSSFilesArr,
                "revLoggedInEntityGUID": revLoggedInEntityGUID,
                "revPluginContainerEntityGUID": revPluginContainerEntity._remoteRevEntityGUID,
            };

            if (revPluginsObjects.revLoadedPlugins[revPluginName]) {
                revPluginsObjects.revLoadedPlugins[revPluginName].revForms.push(revCurrForm);
            } else {
                console.log(revNameId + " : " + JSON.stringify(revPluginsObjects.revLoadedPlugins[revPluginName]));
            }

            rev_plugin_loaders_helper_funcs.revLoadCSS(revForm);

            /** REV START CHECK IF ADDED */
            if (rev_plugin_loaders_helper_funcs.revIsNameIdAdded(revPluginsObjects.revForms, revNameId)) {
                continue;
            }
            /** REV END CHECK IF ADDED */

            let revPersPluginFormEntity = await rev_read_plugin_forms.revGetPluginFormEntity_By_Plugin_Name(revPluginContainerEntity._remoteRevEntityGUID, revNameId);

            if (rev_strings_helper_funcs.revIsEmptyVar(revPersPluginFormEntity)) {
                revPersPluginFormEntity = await rev_pers_save_plugin_form.revSavePluginForm(revCurrForm);
            }

            if (revForm.revLangs) {
                let revRemotePluginLangEntitiesArr = [];

                let revLangs = revForm.revLangs;

                for (let i = 0; i < revLangs.length; i++) {
                    let revLang = revLangs[i];

                    if (!revLang) {
                        continue;
                    }

                    let revLangJSONFunc = rev_plugin_loaders_helper_funcs.revFunctionInit(revLang);

                    if (!revLangJSONFunc()) {
                        continue;
                    }

                    let revLangJSON = revLangJSONFunc();

                    let revPluginViewEntity = await rev_load_plugin_langs_pers.revLoadPluginLangs({
                        "revLoggedInEntityGUID": revLoggedInEntityGUID,
                        "revLangJSON": revLangJSON,
                    });

                    revRemotePluginLangEntitiesArr.push(revPluginViewEntity);
                }
            }

            let revSavedPluginForm = rev_load_plugin_forms_const_resolver.revPluginFormConstructor(revPersPluginFormEntity);

            if (!rev_json_functions.revIsEmptyJSONObject(revSavedPluginForm)) {
                rev_plugin_loaders_helper_funcs.revLoadCSS(revSavedPluginForm);

                revPluginsObjects.revForms.push(revSavedPluginForm);
            }

            revRemotePluginHookEntitiesArr.push(revPersPluginFormEntity);
        }
    }

    return revRemotePluginHookEntitiesArr;
};

module.exports.revLoadPluginForms = revLoadPluginForms;
