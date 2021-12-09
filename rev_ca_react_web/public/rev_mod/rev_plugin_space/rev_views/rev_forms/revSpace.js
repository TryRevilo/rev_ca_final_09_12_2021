const revSpaceWidget = require('./rev_form_view_widgets/revSpaceWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space',
        'revNameId': 'rev_space',
        'revOverrideView': revSpaceWidget.revFormViewWidget.toString(),
        'revStyleSheetFile': '',
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_space/rev_views/rev_forms/rev_form_view_widgets/revSpaceWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;