const revPageViewPageNavHeaderWidget = require('./rev_page_view_widgets/revPageViewPageNavHeaderWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_core',
        'revNameId': 'revPageViewPageNavHeader',
        'revPageViewContainerName': 'revPageViewPageNavHeader',
        'revPageViewName': 'revPageViewPageNavHeader',
        'revPageView': revPageViewPageNavHeaderWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_core/rev_views/rev_page_views/rev_page_view_widgets/revPageViewPageNavHeaderWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;