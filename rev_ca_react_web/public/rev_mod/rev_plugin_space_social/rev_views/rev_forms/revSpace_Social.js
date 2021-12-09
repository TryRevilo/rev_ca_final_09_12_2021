const revSpace_Social_Widget = require('./rev_form_view_widgets/revSpace_Social_Widget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space_social',
        'revNameId': 'revSpace_Social',
        'revOverrideView': revSpace_Social_Widget.revFormViewWidget.toString(),
        'revStyleSheetFile': '',
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_space/rev_views/rev_forms/rev_form_view_widgets/revSpace_Social_Widget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;