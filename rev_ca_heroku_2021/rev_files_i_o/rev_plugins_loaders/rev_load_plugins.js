const rev_strings_helper_funcs = require("../../rev_helper_functions/rev_strings_helper_funcs");
const rev_json_functions = require("../../rev_helper_functions/rev_json_functions");

const rev_db_entity_const_resolver = require("../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");

const rev_pers_plugins = require("./rev_plugin_modules_pers/rev_plugin_pers/rev_pers/rev_pers_plugins");
const rev_read_plugins = require("./rev_plugin_modules_pers/rev_plugin_pers/rev_read/rev_read_plugins");

const rev_plugin_init = require("./rev_plugin_modules_pers/rev_plugin_init");

const rev_plugins_objects = require("./rev_plugins_objects");
const rev_plugin_loaders_helper_funcs = require("./rev_plugin_modules_pers/rev_plugin_loaders_helper_funcs");

const rev_load_plugin_pers = require("./rev_plugin_modules_pers/rev_load_plugin_pers");
const rev_load_plugin_hooks_pers = require("./rev_plugin_modules_pers/rev_load_plugin_hooks/rev_pers/rev_load_plugin_hooks_pers");
const rev_load_remote_plugin_hooks_pers = require("./rev_plugin_modules_pers/rev_load_remote_plugin_hooks/rev_pers/rev_load_remote_plugin_hooks_pers");
const rev_load_plugin_hook_handlers_remote_env_pers = require("./rev_plugin_modules_pers/rev_load_plugin_hook_handlers_remote_env/rev_pers/rev_load_plugin_hook_handlers_remote_env_pers");

const rev_load_plugin_forms_pers = require("./rev_plugin_modules_pers/rev_load_plugin_forms/rev_pers/rev_load_plugin_forms_pers");

const fs = require("fs");
const path = require("path");
const { json } = require("body-parser");

var revPushModules = (revModule) => {
    module.exports.revModule = revModule;
};

var revGetPluginHookHandlers = (revPluginName) => {
    let revPluginsObjects = rev_plugins_objects.revPluginsObjects;

    let revRetPluginHookHandlers = [];

    for (let i = 0; i < revPluginsObjects.revPluginHookHandlers.length; i++) {
        let revPluginsObject = revPluginsObjects.revPluginHookHandlers[i];

        if (revPluginsObject && revPluginsObject.revPluginName.localeCompare(revPluginName) == 0) {
            revRetPluginHookHandlers.push(revPluginsObject);
        }
    }

    return revRetPluginHookHandlers;
};

var walk = function (dir, callback) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return callback(err);
        var pending = list.length;
        if (!pending) return callback(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) callback(null, results);
                    });
                } else {
                    let revFileName = path.basename(file);

                    if (revFileName === "revPluggableStart.js") {
                        results.push(file);
                    }

                    if (!--pending) callback(null, results);
                }
            });
        });
    });
};

var revArrayMove = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }

    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};

var revSortItem = (revItem, revArr) => {
    let revItemBefore = revItem.revBefore;
    let revBeforeArr = revItem.revBefore;

    for (let i = 0; i < revBeforeArr.length; i++) {
        let revBeforeName = revBeforeArr[i];

        if (revBeforeName) {
            if (revBeforeName.localeCompare("") == 0) continue;

            if (revBeforeName.localeCompare("--") == 0) {
                revArr = revArrayMove(revArr, revArr.indexOf(revItem), 0);
            }

            if (revBeforeName.localeCompare("**") == 0) {
                let revLastIndex = revArr.length;

                if (revLastIndex >= 1) {
                    revArr = revArrayMove(revArr, revArr.indexOf(revItem), revArr.length - 1);
                }
            }

            for (let p = 0; p < revArr.length; p++) {
                let revPrecedeItem = revArr[p];

                // if (revPrecedeItem && revPrecedeItem.revBefore && revPrecedeItem.revBefore.length) revSortItem(revPrecedeItem, revArr);

                if (revPrecedeItem.revNameId.localeCompare(revItemBefore) == 0) {
                    let revIndex = revArr.indexOf(revItem);
                    revArr = revArrayMove(revArr, revIndex, revArr.indexOf(revPrecedeItem) - 1);
                }
            }
        }
    }
};

var revArrangeItems = (revArr) => {
    for (let i = 0; i < revArr.length; i++) {
        let revItem = revArr[i];

        if (!revItem.revBefore) continue;

        revSortItem(revItem, revArr);
    }
};

var revLoadScriptModules = (revPlugin) => {
    if (revPlugin.revModules && revPlugin.revModules.length) {
        let revBaseModulesPath = path.resolve("../../rev_ca_web/rev_ca_react_web/public/rev_mod/");
        let revPluginName = revPlugin.revPluginName;
        let revPluginPath = revBaseModulesPath + "/" + revPluginName;

        for (let i = 0; i < revPlugin.revModules.length; i++) {
            let revModule = revPlugin.revModules[i];

            let revNameId = revModule.revNameId;
            let revPath = revModule.revPath;
            revPath = revPluginPath + "/rev_libs_functions" + revPath;

            let revData = fs.readFileSync(revPath, "utf8");

            if (revData) {
                let revModule = { "revNameId": revNameId, "revData": revData };
                rev_plugins_objects.revPluginsObjects.revScriptModules.push(revModule);
            }
        }
    }
};

var revLoadPluginModules = (revDir, revParamsVarArgs, revLoggedInEntityGUID) => {
    let revPluginsObjects = rev_plugins_objects.revPluginsObjects;

    let REV_REMOTE_HOOK_METHODS;

    if (revParamsVarArgs.REV_REMOTE_HOOK_METHODS) {
        REV_REMOTE_HOOK_METHODS = revParamsVarArgs.REV_REMOTE_HOOK_METHODS;
    }

    let revMenuItemAdded = (revNameId, revMenuAreaChildren) => {
        return revMenuAreaChildren.some((item) => {
            if (!item.revNameId) return false;
            return item.revNameId.localeCompare(revNameId) == 0;
        });
    };

    let revRemotePrePluginInitFuncsArr = [];

    return new Promise((resolve, reject) => {
        walk(revDir, async (revResStatus, results) => {
            if (!revResStatus) {
                for (let i = 0; i < results.length; i++) {
                    let revPath = results[i];

                    let revPluginLib = require(revPath);
                    let revPlugin = revPluginLib.revStart();

                    if (!revPlugin || !revPlugin.revPluginName) {
                        continue;
                    }

                    if (revPlugin.revRemotePrePluginInitArr) {
                        let revRemotePrePluginInitArr = revPlugin.revRemotePrePluginInitArr;

                        for (let i = 0; i < revRemotePrePluginInitArr.length; i++) {
                            let revPrePluginInitCallbackStr = revRemotePrePluginInitArr[i];

                            let revFuncBody = revPrePluginInitCallbackStr.slice(revPrePluginInitCallbackStr.indexOf("{") + 1, revPrePluginInitCallbackStr.lastIndexOf("}"));

                            let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

                            let revPrePluginInitCallbackStrFunc = new AsyncFunction("revVarArgs", revFuncBody);

                            revRemotePrePluginInitFuncsArr.push(revPrePluginInitCallbackStrFunc);
                        }
                    }

                    let revPluginNameId = revPlugin.revPluginName;

                    if (!revPluginsObjects.revLoadedPlugins.hasOwnProperty(revPluginNameId)) {
                        revPluginsObjects.revLoadedPlugins[revPluginNameId] = {};
                    }

                    if (!rev_plugins_objects.revPluginsObjects.revLoadedPluginsNamesArr.includes(revPluginNameId)) {
                        rev_plugins_objects.revPluginsObjects.revLoadedPluginsNamesArr.push(revPluginNameId);
                    }

                    if (!revPluginsObjects.revLoadedPlugins.hasOwnProperty(revPluginNameId)) {
                        revPluginsObjects.revLoadedPlugins[revPluginNameId] = {};
                    }

                    /** REV START SAVE PLUGIN */
                    let revPersPlugin = await rev_read_plugins.revGetPluginEntity_By_Plugin_Name(revPluginNameId);

                    let revPluginGUID = -1;

                    if (!rev_json_functions.revIsEmptyJSONObject(revPersPlugin)) {
                        revPluginGUID = revPersPlugin._remoteRevEntityGUID;
                    }

                    if (revPluginGUID < 1) {
                        revPluginGUID = await rev_pers_plugins.revCreatePlugin(revPluginNameId, revPluginNameId);
                    }

                    revPluginsObjects.revLoadedPlugins[revPluginNameId]["revPluginEntityGUID"] = revPluginGUID;

                    if (!rev_strings_helper_funcs.revIsEmptyVar(revPlugin) && !rev_json_functions.revIsEmptyJSONObject(revPlugin)) {
                        rev_plugins_objects.revPluginsObjects.revPluginsInstalledArr.push(revPlugin);
                    }
                    /** REV END SAVE PLUGIN */

                    /** START LOAD CUSTOM INSTALL MODULES */
                    if (revPlugin.revManifest) {
                        revPluginsObjects.revListedPlugins.push(revPlugin);
                    }
                    /** END LOAD CUSTOM INSTALL MODULES */

                    revLoadScriptModules(revPlugin);

                    let revPluginContainerEntity = await rev_load_plugin_pers.revSavePlugin(revPlugin);

                    if (!rev_json_functions.revIsEmptyJSONObject(revPluginContainerEntity)) {
                        /** START LOAD REV PLUGIN HOOKS */
                        let revPluginHookEntitiesArr = await rev_load_plugin_hooks_pers.revLoadPluginHooks(revPlugin, revPluginContainerEntity);
                        /** END LOAD REV PLUGIN HOOKS */

                        /** START REV REMOTE PLUGIN HOOKS */
                        let revRemotePluginHookEntitiesArr = await rev_load_remote_plugin_hooks_pers.revLoadRemotePluginHooks(revPlugin, revPluginContainerEntity);
                        /** END REV REMOTE PLUGIN HOOKS */

                        /** START REV REMOTE ENVIRONMENT PLUGIN HOOKS */
                        let revRemotePluginHookEnvEntitiesArr = await rev_load_plugin_hook_handlers_remote_env_pers.revLoadRemotePluginHooks(revPlugin, revPluginContainerEntity, REV_REMOTE_HOOK_METHODS);
                        /** END REV REMOTE ENVIRONMENT PLUGIN HOOKS */

                        /** START LOAD FORMS */
                        let revPluginFormsEntitiesArr = await rev_load_plugin_forms_pers.revLoadPluginForms({
                            "revLoggedInEntityGUID": revLoggedInEntityGUID,
                            "revPluginContainerEntity": revPluginContainerEntity,
                            "revPlugin": revPlugin,
                        });
                        /** END LOAD FORMS */
                    }

                    /** START LOAD DELETE OVERRIDE VIEWS */
                    if (revPlugin.revDeleteOverrideViews && revPlugin.revDeleteOverrideViews.length > 0) {
                        for (let i = 0; i < revPlugin.revDeleteOverrideViews.length; i++) {
                            let revDeleteOverrideView = revPlugin.revDeleteOverrideViews[i];

                            if (!revDeleteOverrideView || !revDeleteOverrideView()) {
                                continue;
                            }

                            revPluginsObjects.revDeleteOverrideViews.push(revDeleteOverrideView());
                        }
                    }
                    /** END LOAD DELETE OVERRIDE VIEWS */

                    /** START LOAD MENU ITEMS */
                    if (revPlugin.revMenuItems && revPlugin.revMenuItems.length > 0) {
                        for (let i = 0; i < revPlugin.revMenuItems.length; i++) {
                            let revMenuItem = revPlugin.revMenuItems[i];

                            rev_plugin_loaders_helper_funcs.revLoadCSS(revMenuItem);

                            if (!revMenuItem || !revMenuItem()) {
                                continue;
                            }

                            revPluginsObjects.revMenuItems.push(revMenuItem());
                        }
                    }

                    revArrangeItems(revPluginsObjects.revMenuItems);
                    /** END LOAD MENU ITEMS */

                    /** START FILL MENU AREAS */
                    let revFillMenuAreas = (revMenuItem) => {
                        if (revMenuItem.revMenuAreaViewName) {
                            for (let m = 0; m < revPluginsObjects.revMenuItems.length; m++) {
                                let revChildableItem = revPluginsObjects.revMenuItems[m];

                                rev_plugin_loaders_helper_funcs.revLoadCSS(revChildableItem);

                                if (revChildableItem && revChildableItem.revContainerMenuAreas.includes(revMenuItem.revMenuAreaViewName)) {
                                    if (revMenuItem.revMenuAreaViewName) {
                                        revFillMenuAreas(revChildableItem);
                                    }

                                    if (!revMenuItemAdded(revChildableItem.revNameId, revMenuItem.revMenuItems)) revMenuItem.revMenuItems.push(revChildableItem);
                                }
                            }

                            let revAedded = revMenuItemAdded(revMenuItem.revNameId, revPluginsObjects.revMenuAreas);

                            if (!revAedded) {
                                revPluginsObjects.revMenuAreas.push(revMenuItem);
                            }
                        }

                        rev_plugin_loaders_helper_funcs.revLoadCSS(revMenuItem);

                        return revMenuItem;
                    };
                    /** END FILL MENU AREAS */

                    /** START LOAD MENU AREAS */
                    if (revPluginsObjects.revMenuItems && revPluginsObjects.revMenuItems.length > 0) {
                        for (let i = 0; i < revPluginsObjects.revMenuItems.length; i++) {
                            revFillMenuAreas(revPluginsObjects.revMenuItems[i]);
                        }
                    }
                    /** END LOAD MENU AREAS */

                    /** START LOAD REV PAGE VIEWS */
                    if (revPlugin.revPageViews && revPlugin.revPageViews.length > 0) {
                        for (let i = 0; i < revPlugin.revPageViews.length; i++) {
                            let revPageView = revPlugin.revPageViews[i];

                            if (!revPageView || !revPageView()) {
                                continue;
                            }

                            revPageView = revPageView();

                            if (revPageView.revPageViewContainerName) {
                                let revPageViewContainerName = revPageView.revPageViewContainerName;

                                let revAdded = revPluginsObjects.revPageViews.some((item) => {
                                    return item.revPageViewContainerName == revPageViewContainerName;
                                });

                                if (!revAdded) {
                                    let revAddedIndex = revPluginsObjects.revPageViews.push({ revPageViewContainerName: revPageViewContainerName, revPageViewContainerData: [] });
                                    revPluginsObjects.revPageViews[revAddedIndex - 1].revPageViewContainerData.push(revPageView);
                                } else {
                                    for (let c = 0; c < revPluginsObjects.revPageViews.length; c++) {
                                        let revAddedPageViewContainer = revPluginsObjects.revPageViews[c];
                                        let revAddedPageViewContainerName = revAddedPageViewContainer.revPageViewContainerName;

                                        if (revAddedPageViewContainerName.localeCompare(revPageViewContainerName) == 0) {
                                            revPluginsObjects.revPageViews[c].revPageViewContainerData.push(revPageView);
                                            continue;
                                        }
                                    }
                                }

                                rev_plugin_loaders_helper_funcs.revLoadCSS(revPageView);
                            }
                        }
                    }
                    /** END LOAD REV PAGE VIEWS */

                    /** START LOAD REV CONTEXT VIEWS */
                    if (revPlugin.revContextViews && revPlugin.revContextViews.length > 0) {
                        for (let i = 0; i < revPlugin.revContextViews.length; i++) {
                            let revContextView = revPlugin.revContextViews[i];

                            if (!revContextView || !revContextView()) {
                                continue;
                            }

                            revContextView = revContextView();

                            if (revContextView.revNameId) {
                                let revNameId = revContextView.revNameId;

                                for (let c = 0; c < revContextView.revContexts.length; c++) {
                                    let revContext = revContextView.revContexts[c];

                                    let revAdded = revPluginsObjects.revContextViews.some((item) => {
                                        return item.revContextsContainer == revContext;
                                    });

                                    if (!revAdded) {
                                        let revAddedIndex = revPluginsObjects.revContextViews.push({ "revContext": revContext, "revContextViewsArr": [] });
                                        revPluginsObjects.revContextViews[revAddedIndex - 1].revContextViewsArr.push({ "revNameId": revNameId, "revContextView": revContextView });
                                    } else {
                                        for (let c = 0; c < revPluginsObjects.revContextViews.length; c++) {
                                            let revAddedContextsContainer = revPluginsObjects.revContextViews[c];
                                            let revAddedContext = revAddedContextsContainer.revContext;

                                            if (revAddedContext.localeCompare(revContext) == 0) {
                                                revPluginsObjects.revContextViews[c].revContextViewsArr.push(revContextView);
                                                continue;
                                            }
                                        }
                                    }
                                }

                                rev_plugin_loaders_helper_funcs.revLoadCSS(revContextView);
                            }
                        }
                    }
                    /** END LOAD REV CONTEXT VIEWS */

                    /** START LOAD REV CONTEXT FORMS */
                    if (revPlugin.revContextForms && revPlugin.revContextForms.length > 0) {
                        for (let i = 0; i < revPlugin.revContextForms.length; i++) {
                            let revContextForm = revPlugin.revContextForms[i];

                            if (!revContextForm || !revContextForm()) {
                                continue;
                            }

                            revContextForm = revContextForm();

                            if (revContextForm.revNameId) {
                                let revNameId = revContextForm.revNameId;

                                for (let c = 0; c < revContextForm.revContexts.length; c++) {
                                    let revContext = revContextForm.revContexts[c];

                                    let revAdded = revPluginsObjects.revContextForms.some((item) => {
                                        return item.revContextsContainer == revContext;
                                    });

                                    if (!revAdded) {
                                        let revAddedIndex = revPluginsObjects.revContextForms.push({ "revContext": revContext, "revContextFormsArr": [] });
                                        revPluginsObjects.revContextForms[revAddedIndex - 1].revContextFormsArr.push({ "revNameId": revNameId, "revContextForm": revContextForm });
                                    } else {
                                        for (let c = 0; c < revPluginsObjects.revContextForms.length; c++) {
                                            let revAddedContextsContainer = revPluginsObjects.revContextForms[c];
                                            let revAddedContext = revAddedContextsContainer.revContext;

                                            if (revAddedContext.localeCompare(revContext) == 0) {
                                                revPluginsObjects.revContextForms[c].revContextFormsArr.push(revContextForm);
                                                continue;
                                            }
                                        }
                                    }
                                }

                                rev_plugin_loaders_helper_funcs.revLoadCSS(revContextForm);
                            }
                        }
                    }
                    /** END LOAD REV CONTEXT FORMS */

                    /** START REV LOAD OVERRIDE VIEWS */
                    if (revPlugin.revOverrideViews && revPlugin.revOverrideViews.length > 0) {
                        for (let i = 0; i < revPlugin.revOverrideViews.length; i++) {
                            let revOverrideView = revPlugin.revOverrideViews[i];
                            revPluginsObjects.revOverrideViews.push(revOverrideView());
                        }
                    }
                    /** END REV LOAD OVERRIDE VIEWS */

                    /** START REV LOAD PAGE VIEW HOOKS */
                    if (i == results.length - 1) {
                        for (let pViewI = 0; pViewI < revPluginsObjects.revPageViews.length; pViewI++) {
                            let revPageView = revPluginsObjects.revPageViews[pViewI];

                            for (let c = 0; c < revPageView.revPageViewContainerData.length; c++) {
                                let revCurrPageView = revPageView.revPageViewContainerData[c];

                                if (revCurrPageView.revPluginHooks) {
                                    let revPluginHooks = revCurrPageView.revPluginHooks;

                                    let revPluginHookHandlers = revPluginsObjects.revPluginHookHandlers;

                                    for (let h = 0; h < revPluginHooks.length; h++) {
                                        let revPluginHookName = revPluginHooks[h];

                                        for (let p = 0; p < revPluginHookHandlers.length; p++) {
                                            let revAddedPluginHookHandlersContainer = revPluginHookHandlers[p];

                                            let revCurrPluginHookName = revAddedPluginHookHandlersContainer.revPluginHookName;

                                            if (revCurrPluginHookName && revCurrPluginHookName.localeCompare(revPluginHookName) == 0) {
                                                revCurrPageView.revPluginHookHandlers.push(revAddedPluginHookHandlersContainer);

                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    /** END REV LOAD PAGE VIEW HOOKS */
                }

                /** START REV LOAD PLUGIN HOOK CALLBACK METHODS */
                for (let key in revPluginsObjects.revPluginHookContextRemoteContainers) {
                    if (key) {
                        let revPluginHooksRemoteArr = revPluginsObjects.revPluginHookContextRemoteContainers[key];

                        for (let pK = 0; pK < revPluginHooksRemoteArr.length; pK++) {
                            let revFuncString = revPluginHooksRemoteArr[pK].revHandler;
                            let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));

                            let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
                            revPluginHooksRemoteArr[pK]["revHookFunc"] = new AsyncFunction("revVarArgs", revFuncBody);
                        }
                    }
                }
                /** END REV LOAD PLUGIN HOOK CALLBACK METHODS */

                /** START REV LOAD AFTER | PRE HOOKS */
                let revItRemoteHooks = (revParamNameId, revCallHookMethod, revPresinctArr) => {
                    for (let key in revPluginsObjects.revPluginHookContextRemoteContainers) {
                        if (key) {
                            let revPluginHooksRemoteArr = revPluginsObjects.revPluginHookContextRemoteContainers[key];

                            for (let pK = 0; pK < revPluginHooksRemoteArr.length; pK++) {
                                let revCurrHookNameID = revPluginHooksRemoteArr[pK].revNameID;
                                let revPluginHookContextRemote = revPluginHooksRemoteArr[pK].revPluginHookContextRemote;

                                if (revCurrHookNameID.localeCompare(revParamNameId) == 0 || revPluginHookContextRemote.localeCompare(revParamNameId) == 0 || revParamNameId.localeCompare("*") == 0) {
                                    if (!revPluginHooksRemoteArr[pK].hasOwnProperty(revPresinctArr)) {
                                        revPluginHooksRemoteArr[pK][revPresinctArr] = [];
                                    }

                                    revPluginHooksRemoteArr[pK].revPostHookCallsArr.push(revCallHookMethod);

                                    revCallHookMethod(null);
                                }
                            }
                        }
                    }
                };

                for (let key in revPluginsObjects.revPluginHookContextRemoteContainers) {
                    if (key) {
                        let revPluginHooksRemoteArr = revPluginsObjects.revPluginHookContextRemoteContainers[key];

                        for (let pK = 0; pK < revPluginHooksRemoteArr.length; pK++) {
                            let revRemoteBeforeArr = revPluginHooksRemoteArr[pK].revRemoteBefore;
                            let revRemoteAftersArr = revPluginHooksRemoteArr[pK].revRemoteAfter;

                            let revIsBefore = Array.isArray(revRemoteBeforeArr) && revRemoteBeforeArr.length;
                            let revIsAfter = Array.isArray(revRemoteAftersArr) && revRemoteAftersArr.length;

                            if (revIsBefore || revIsAfter) {
                                let revFuncString = revPluginHooksRemoteArr[pK].revHandler;
                                let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));

                                let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
                                revPluginHooksRemoteArr[pK]["revHookFunc"] = new AsyncFunction("revVarArgs", revFuncBody);

                                for (let afterI = 0; afterI < revRemoteAftersArr.length; afterI++) {
                                    let revHookNameId = revRemoteAftersArr[afterI];

                                    if (revIsBefore) {
                                        revItRemoteHooks(revHookNameId, revPluginHooksRemoteArr[pK].revHookFunc, "revPreHookCallsArr");
                                    }

                                    if (revIsAfter) {
                                        revItRemoteHooks(revHookNameId, revPluginHooksRemoteArr[pK].revHookFunc, "revPostHookCallsArr");
                                    }
                                }
                            }
                        }
                    }
                }
                /** END REV LOAD AFTER | PRE HOOKS */

                /** START REV OVERRIDE VIEWS MENU AREAS */
                for (let v = 0; v < revPluginsObjects.revOverrideViews.length; v++) {
                    let revOverrideView = revPluginsObjects.revOverrideViews[v];
                    let revOverrideViewName = revOverrideView.revOverrideViewName;

                    rev_plugin_loaders_helper_funcs.revLoadCSS(revOverrideView);

                    for (let mArea = 0; mArea < revPluginsObjects.revMenuAreas.length; mArea++) {
                        let revMenuArea = revPluginsObjects.revMenuAreas[mArea];

                        if (revMenuArea.revOverrideViewName && revMenuArea.revOverrideViewName.localeCompare(revOverrideViewName) == 0 && revPluginsObjects.revOverrideViews[v].revMenuAreas) {
                            revPluginsObjects.revOverrideViews[v].revMenuAreas.push(revMenuArea);
                        }
                    }
                }
                /** END REV OVERRIDE VIEWS MENU AREAS */

                /** START REV PAGE VIEW MENU AREAS */
                for (let pView = 0; pView < revPluginsObjects.revPageViews.length; pView++) {
                    let revPageViewContainer = revPluginsObjects.revPageViews[pView];
                    let revPageViewContainerData = revPageViewContainer.revPageViewContainerData;

                    for (let pVData = 0; pVData < revPageViewContainerData.length; pVData++) {
                        let revPageView = revPageViewContainerData[pVData];

                        if (!revPageView.revMenuAreas) {
                            continue;
                        }

                        let revPageViewName = revPageView.revPageViewName;

                        for (let mArea = 0; mArea < revPluginsObjects.revMenuAreas.length; mArea++) {
                            let revMenuArea = revPluginsObjects.revMenuAreas[mArea];

                            if (revPageViewName.localeCompare(revMenuArea.revPageViewName) == 0) {
                                revPageView.revMenuAreas.push(revMenuArea);
                            }
                        }
                    }
                }
                /** END REV PAGE VIEW MENU AREAS */

                resolve();

                // console.log("revLangs : " + JSON.stringify(rev_plugins_objects.revPluginsObjects.revLangs));
                // console.log("LANGS : " + JSON.stringify(rev_plugins_objects.revPluginsObjects.revLangsDefaults));

                // console.log(JSON.stringify(rev_plugins_objects.revPluginsObjects.revPluginLangs));

                // console.log(JSON.stringify(rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal));

                console.log(">>> DONE +++");

                // console.log(JSON.stringify(revPluginsObjects.revLoadedPlugins));

                for (let i = 0; i < revRemotePrePluginInitFuncsArr.length; i++) {
                    revRemotePrePluginInitFuncsArr[i]({ "revRemoteHookMethods": REV_REMOTE_HOOK_METHODS });
                }
            }
        });
    });
};

module.exports.revLoadPluginModules = revLoadPluginModules;
module.exports.revGetPluginHookHandlers = revGetPluginHookHandlers;
module.exports.revPushModules = revPushModules;
