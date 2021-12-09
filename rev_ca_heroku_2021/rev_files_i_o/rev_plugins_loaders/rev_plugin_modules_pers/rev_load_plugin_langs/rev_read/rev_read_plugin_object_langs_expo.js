const rev_plugins_objects = require("../../../rev_plugins_objects");

var revGetPluginViewFinalTranslations = (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revLangCode || !revVarArgs.rev_plugin_name_id || !revVarArgs.revLangViewType || !revVarArgs.revViewNameId) {
        return;
    }

    let revLangCode = revVarArgs.revLangCode;
    let revPluginNameId = revVarArgs.rev_plugin_name_id;
    let revLangViewType = revVarArgs.revLangViewType;
    let revViewNameId = revVarArgs.revViewNameId;

    if (
        /** */
        !rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revLangCode] ||
        !rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revLangCode][revPluginNameId] ||
        !rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revLangCode][revPluginNameId][revLangViewType] ||
        !rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revLangCode][revPluginNameId][revLangViewType][revViewNameId]
    ) {
        return;
    }

    return rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revLangCode][revPluginNameId][revLangViewType][revViewNameId];
};

module.exports.revGetPluginViewFinalTranslations = revGetPluginViewFinalTranslations;
