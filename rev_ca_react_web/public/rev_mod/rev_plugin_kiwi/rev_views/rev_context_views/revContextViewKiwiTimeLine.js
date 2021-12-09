const revContextViewKiwiTimeLine = require('./rev_context_view_widgets/revContextViewKiwiTimeLineWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_kiwi',
        'revNameId': 'revKiwi',
        'revContexts': ['revContextTimeline'],
        'revContextView': revContextViewKiwiTimeLine.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revContextViewKiwiTimeLineWidget.css']
    }
};

module.exports.revContextView = revPluginPageView;