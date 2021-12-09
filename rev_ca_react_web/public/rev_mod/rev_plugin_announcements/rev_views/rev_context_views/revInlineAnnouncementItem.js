const revInlineAnnouncementItemWidget = require('./rev_context_view_widgets/revInlineAnnouncementItemWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_calendar',
        'revNameId': 'revInlineAnnouncementItem',
        'revContexts': ['revInlineNoticiasContext'],
        'revContextView': revInlineAnnouncementItemWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revInlineAnnouncementItemWidget.css']
    }
};

module.exports.revContextView = revPluginPageView;