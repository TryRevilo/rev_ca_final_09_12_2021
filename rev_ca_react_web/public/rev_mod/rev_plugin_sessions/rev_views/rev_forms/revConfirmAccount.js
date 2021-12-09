const revConfirmAccountWidget = require('./rev_form_view_widgets/revConfirmAccountWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_sessions',
        'revNameId': 'revConfirmAccount',
        'revOverrideView': revConfirmAccountWidget.revFormViewWidget.toString(),
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_sessions/rev_views/rev_forms/rev_form_view_widgets/revConfirmAccountWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;