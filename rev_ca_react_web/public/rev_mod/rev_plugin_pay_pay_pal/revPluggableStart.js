/** REV START FORMS */
const revPaypalCardInputForm = require("./rev_views/rev_forms/revPaypalCardInputForm");
/** REV END FORMS */

/** REV START PAGE VIEWS */
const revPageViewPayPalPayReceipt = require("./rev_views/rev_page_views/revPageViewPayPalPayReceipt");
/** REV END PAGE VIEWS */

/** REV START REMOTE HANDLERS */
const revHookRemoteHandler_PayPalOrdeData = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_PayPalOrdeData");
const revHookRemoteHandler_PayPalOrderPayExec = require("./rev_lib_functions_remote_hooks/revHookRemoteHandler_PayPalOrderPayExec");
/** REV END REMOTE HANDLERS */

/** REV START REMOTE ENV HOOK HANDLERS */
const revPluginHookRemoteEnvironment_PayPalOrderData = require("./rev_lib_functions_remote_env/revPluginHookRemoteEnvironment_PayPalOrderData");
const revPluginHookRemoteEnvironment_PayPalOrderDataPayExec = require("./rev_lib_functions_remote_env/revPluginHookRemoteEnvironment_PayPalOrderDataPayExec");
/** REV END REMOTE ENV HOOK HANDLERS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_pay_pay_pal",
        "revPageViews": [revPageViewPayPalPayReceipt.revPluginPageView],
        "revContextViews": [],
        "revForms": [revPaypalCardInputForm.revPluginOverrideView],
        "revMenuItems": [],
        "revPluginHookHandlersRemote": [
            { "revNameID": "revHookRemoteHandler_PayPalOrdeData", "revPluginHookContextRemote": "revHookRemoteHandler_PayPalOrdeData", "revHandler": revHookRemoteHandler_PayPalOrdeData.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revHookRemoteHandler_PayPalOrderPayExec", "revPluginHookContextRemote": "revHookRemoteHandler_PayPalOrderPayExec", "revHandler": revHookRemoteHandler_PayPalOrderPayExec.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
        "revPluginHookHandlersRemoteEnvironment": [
            { "revNameID": "revPluginHookRemoteEnvironment_PayPalOrderData", "revHandler": revPluginHookRemoteEnvironment_PayPalOrderData.revHookRemoteHandlerCallback.toString() },
            { "revNameID": "revPluginHookRemoteEnvironment_PayPalOrderDataPayExec", "revHandler": revPluginHookRemoteEnvironment_PayPalOrderDataPayExec.revHookRemoteHandlerCallback.toString() },
            /** */
        ],
    };
};

module.exports.revStart = revStart;
