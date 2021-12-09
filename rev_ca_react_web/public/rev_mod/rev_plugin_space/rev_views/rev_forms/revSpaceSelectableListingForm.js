const revSpaceSelectableListingFormWidget = require('./rev_form_view_widgets/revSpaceSelectableListingFormWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space',
        'revNameId': 'revSpaceSelectableListingForm',
        'revOverrideView': revSpaceSelectableListingFormWidget.revFormViewWidget.toString(),
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_space/rev_views/rev_forms/rev_form_view_widgets/revSpaceSelectableListingFormWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;