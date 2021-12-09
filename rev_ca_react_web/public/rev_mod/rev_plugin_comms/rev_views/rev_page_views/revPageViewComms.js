const revPageViewCommsWidget = require('./rev_page_view_widgets/revPageViewCommsWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_comms',
        'revNameId': 'revPageViewComms',
        'revPageViewContainerName': 'revPageViewComms',
        'revBefore': [],
        'revPageViewName': 'revPageViewComms',
        'revPageView': revPageViewCommsWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewCommsWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;