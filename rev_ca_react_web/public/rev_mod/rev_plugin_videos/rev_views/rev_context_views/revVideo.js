const revVideoWidget = require('./rev_context_view_widgets/revVideoWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_videos',
        'revNameId': 'revVid',
        'revContexts': ['revSidebarTrending'],
        'revContextView': revVideoWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revVideoWidget.css']
    }
};

module.exports.revContextView = revPluginPageView;