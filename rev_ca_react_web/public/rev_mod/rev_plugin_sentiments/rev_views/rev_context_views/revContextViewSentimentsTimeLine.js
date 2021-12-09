const revContextViewSentimentsTimeLineWidget = require('./rev_context_view_widgets/revContextViewSentimentsTimeLineWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_kiwi',
        'revNameId': 'revSentiments',
        'revContexts': ['revContextTimeline'],
        'revContextView': revContextViewSentimentsTimeLineWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revContextViewSentimentsTimeLineWidget.css']
    }
};

module.exports.revContextView = revPluginPageView;