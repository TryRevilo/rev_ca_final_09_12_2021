const revSpaceTypeWidget = require('./rev_form_view_widgets/revSpaceTypeWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space',
        'revNameId': 'revSpaceType',
        'revOverrideView': revSpaceTypeWidget.revFormViewWidget.toString(),
        'revStyleSheetFile': '',
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_space/rev_views/rev_forms/rev_form_view_widgets/revSpaceTypeWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;