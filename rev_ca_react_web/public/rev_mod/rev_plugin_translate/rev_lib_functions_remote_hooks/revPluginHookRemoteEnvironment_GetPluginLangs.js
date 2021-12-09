var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;

        let revLoggedInEntityGUID = revVarArgs.revReqParams.rev_entity_guid;
        let revPluginNameId = "rev_plugin_sessions";

        let revLangCodes = revVarArgs.revReqParams.rev_lang_codes;
        let revLangCodesArr = revLangCodes.split(",");

        let revPluginLangs = revRemoteHookMethods.revPluginLangs;
        let revLangsDefaults = revRemoteHookMethods.revLangsDefaults;

        revVarArgs["revDefLang"] = revLangsDefaults[revPluginNameId];

        for (let i = 0; i < revLangCodesArr.length; i++) {
            let revCurrLangCode = revLangCodesArr[i];

            revVarArgs[revCurrLangCode] = {};
            revVarArgs[revCurrLangCode]["revPluginNameId"] = revPluginNameId;

            if (revRemoteHookMethods.revIsEmptyJSONObject(revPluginLangs[revCurrLangCode]) || revRemoteHookMethods.revIsEmptyJSONObject(revPluginLangs[revCurrLangCode][revPluginNameId])) {
                revVarArgs[revCurrLangCode]["revIsDefault"] = true;
                revVarArgs[revCurrLangCode]["revPluginTransViews"] = revLangsDefaults[revPluginNameId];
            } else {
                revVarArgs[revCurrLangCode]["revPluginTransViews"] = revPluginLangs[revCurrLangCode][revPluginNameId];
            }
        }
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
