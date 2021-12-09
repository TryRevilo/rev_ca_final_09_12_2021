var revPluginsObjects = {
    "revPluginsInstalledArr": [],
    "revLangsDetailsArr": [],
    "revLangsDefaults": {},
    "revLangs": {},
    "revPluginLangs": {},
    "revPluginLangsTranslationsFinal": {},
    "revPluginViewTransGUIDsArr": [],
    "revLoadedPluginsNamesArr": [],
    "revLoadedPlugins": {},
    "revListedPlugins": [],
    "revScriptModules": [],
    "revForms": [],
    "revContextForms": [],
    "revDeleteOverrideViews": [],
    "revPageViews": [],
    "revOverrideViews": [],
    "revContextViews": [],
    "revMenuAreas": [],
    "revMenuItems": [],
    "revPluginHookHandlers": [],
    "revPluginHookContextRemoteContainers": {},
    "revPluginHookContextRemoteEnvironmentContainers": {},
    "revPluginDataObjects": {},
    "revPluginDataArrays": {},
    "REV_REMOTE_HOOK_METHODS": {},
};

var revGetLoadedPlugin = (revVarArgs) => {
    let revPluginId = revVarArgs.revPluginId;

    return revPluginsObjects.revLoadedPlugins[revPluginId];
};

var revGetLoadedPluginsNamesArr = (revVarArgs) => {
    let revPluginId = revVarArgs.revPluginId;

    return revPluginsObjects.revLoadedPluginsNamesArr;
};

module.exports.revPluginsObjects = revPluginsObjects;
module.exports.revGetLoadedPluginsNamesArr = revGetLoadedPluginsNamesArr;

module.exports.revGetLoadedPlugin = revGetLoadedPlugin;
