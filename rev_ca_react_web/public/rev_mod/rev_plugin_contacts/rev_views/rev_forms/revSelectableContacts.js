const revSelectableContactsWidget = require("./rev_form_view_widgets/revSelectableContactsWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_contacts",
        "revNameId": "revSelectableContacts",
        "revOverrideView": revSelectableContactsWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_forms/rev_form_view_widgets/revSelectableContactsWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
