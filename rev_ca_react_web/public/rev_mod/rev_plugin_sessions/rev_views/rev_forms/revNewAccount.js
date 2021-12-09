const revNewAccountWidget = require('./rev_form_view_widgets/revNewAccountWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_sessions',
        'revNameId': 'revNewAccount',
        'revOverrideView': revNewAccountWidget.revFormViewWidget.toString(),
        'revStyleSheetFile': '',
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_sessions/rev_views/rev_forms/rev_form_view_widgets/revNewAccountWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;