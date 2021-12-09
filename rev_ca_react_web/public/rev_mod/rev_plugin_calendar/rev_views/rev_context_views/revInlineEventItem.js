const revInlineEventItemWidget = require('./rev_context_view_widgets/revInlineEventItemWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_calendar',
        'revNameId': 'revInlineEventItem',
        'revContexts': ['revInlineNoticiasContext'],
        'revContextView': revInlineEventItemWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revInlineEventItemWidget.css']
    }
};

module.exports.revContextView = revPluginPageView;