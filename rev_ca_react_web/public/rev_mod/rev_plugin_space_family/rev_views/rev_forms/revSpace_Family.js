const revSpace_Family_Widget = require('./rev_form_view_widgets/revSpace_Family_Widget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space_family',
        'revNameId': 'rev_space_family',
        'revOverrideView': revSpace_Family_Widget.revFormViewWidget.toString(),
        'revStyleSheetFile': '',
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_space/rev_views/rev_forms/rev_form_view_widgets/revSpace_Family_Widget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;