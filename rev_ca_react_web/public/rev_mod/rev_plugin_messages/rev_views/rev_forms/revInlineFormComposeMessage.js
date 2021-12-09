const revInlineFormComposeMessageWidget = require('./rev_form_view_widgets/revInlineFormComposeMessageWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_messages',
        'revNameId': 'revInlineFormComposeMessage',
        'revOverrideView': revInlineFormComposeMessageWidget.revFormViewWidget.toString(),
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_messages/rev_views/rev_forms/rev_form_view_widgets/revInlineFormComposeMessageWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;