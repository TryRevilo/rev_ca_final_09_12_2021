const revSpaceType_Academic_Widget = require('./rev_form_view_widgets/revSpaceType_Academic_Widget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space_academic',
        'revNameId': 'revSpaceType_Academic',
        'revOverrideView': revSpaceType_Academic_Widget.revFormViewWidget.toString(),
        'revStyleSheetFile': '',
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_space/rev_views/rev_forms/rev_form_view_widgets/revSpaceType_Academic_Widget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;