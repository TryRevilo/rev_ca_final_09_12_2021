/** REV START FORMS */
const revNewLanguageInlineForm = require("./rev_views/rev_forms/revNewLanguageInlineForm");
const revLangTranslationForm = require("./rev_views/rev_forms/revLangTranslationForm");
/** REV END FORMS */

/** REV START PAGE VIEWS */
const revPageViewTranslate = require("./rev_views/rev_page_views/revPageViewTranslate");
/** REV END PAGE VIEWS */

/** REV START OVERRIDE VIEWS */
const revOverrideViewTranslateSuggestion = require("./rev_views/rev_override_views/revOverrideViewTranslateSuggestion");
const revOverrideView_UserLangTransSuggestion = require("./rev_views/rev_override_views/revOverrideView_UserLangTransSuggestion");
/** REV END OVERRIDE VIEWS */

/** REV START REMOTE HOOK HANDLERS */
const revPluginHookRemoteEnvironment_CreateNewLangCode = require("./rev_lib_functions_remote_hooks/revPluginHookRemoteEnvironment_CreateNewLangCode");
const revPluginHookRemoteEnvironment_TranslatePhrase = require("./rev_lib_functions_remote_hooks/revPluginHookRemoteEnvironment_TranslatePhrase");
const revPluginHookRemoteEnvironment_GetLangKeys = require("./rev_lib_functions_remote_hooks/revPluginHookRemoteEnvironment_GetLangKeys");
const revPluginHookRemoteEnvironment_GetPluginLangs = require("./rev_lib_functions_remote_hooks/revPluginHookRemoteEnvironment_GetPluginLangs");
const revHookRemoteHandler_LockTranslationPers = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_LockTranslationPers");
const revPluginHookRemoteEnvironment_GetPluginViewLangs_By_OwnerGUID = require("./rev_lib_functions_remote_hooks/revPluginHookRemoteEnvironment_GetPluginViewLangs_By_OwnerGUID");
/** REV END REMOTE HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_translate",
        "revOverrideViews": [
            /** */
            revOverrideViewTranslateSuggestion.revPluginOverrideView,
            revOverrideView_UserLangTransSuggestion.revPluginOverrideView,
        ],
        "revPageViews": [revPageViewTranslate.revPluginPageView],
        "revContextViews": [],
        "revForms": [
            /** */
            revNewLanguageInlineForm.revPluginOverrideView,
            revLangTranslationForm.revPluginOverrideView,
        ],
        "revContextForms": [],
        "revMenuItems": [],
        "revPluginHookHandlers": [],
        "revPluginHookContextsRemoteArr": ["revPluginHookRemoteEnvironment_TranslatePhrase"],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revPluginHookRemoteEnvironment_CreateNewLangCode", "revPresinctCall": "revPre_PersistenceCalls", "revPluginHookContextRemote": "revPluginHookRemoteEnvironment_CreateNewLangCode", "revHandler": revPluginHookRemoteEnvironment_CreateNewLangCode.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revPluginHookRemoteEnvironment_TranslatePhrase", "revPluginHookContextRemote": "revPluginHookRemoteEnvironment_TranslatePhrase", "revHandler": revPluginHookRemoteEnvironment_TranslatePhrase.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revPluginHookRemoteEnvironment_GetLangKeys", "revPluginHookContextRemote": "revPluginHookRemoteEnvironment_GetLangKeys", "revHandler": revPluginHookRemoteEnvironment_GetLangKeys.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revPluginHookRemoteEnvironment_GetPluginLangs", "revPluginHookContextRemote": "revPluginHookRemoteEnvironment_GetPluginLangs", "revHandler": revPluginHookRemoteEnvironment_GetPluginLangs.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_LockTranslationPers", "revPluginHookContextRemote": "revHookRemoteHandler_LockTranslationPers", "revHandler": revHookRemoteHandler_LockTranslationPers.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revPluginHookRemoteEnvironment_GetPluginViewLangs_By_OwnerGUID", "revPluginHookContextRemote": "revPluginHookRemoteEnvironment_GetPluginViewLangs_By_OwnerGUID", "revHandler": revPluginHookRemoteEnvironment_GetPluginViewLangs_By_OwnerGUID.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
