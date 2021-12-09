const revCreateNewFamilyRelationshipFormWidget = require("./rev_form_view_widgets/revCreateNewFamilyRelationshipFormWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_space_family",
        "revNameId": "revCreateNewFamilyRelationshipForm",
        "revOverrideView": revCreateNewFamilyRelationshipFormWidget.revFormViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_space_familys/rev_views/rev_forms/rev_form_view_widgets/revCreateNewFamilyRelationshipFormWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
