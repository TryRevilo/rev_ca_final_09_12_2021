/** REV START FORMS */
const revSelectPaymentOptionForm = require("./rev_views/rev_forms/revSelectPaymentOption");
/** REV END FORMS */

/** REV START PAGE VIEWS */
/** REV END PAGE VIEWS */

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_pay",
        "revPageViews": [],
        "revContextViews": [],
        "revForms": [
            revSelectPaymentOptionForm.revPluginOverrideView,
            /** */
        ],
        "revMenuItems": [],
    };
};

module.exports.revStart = revStart;
