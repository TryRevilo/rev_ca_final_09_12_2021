const revListPageViewImMessagesWidget = require('./rev_page_view_widgets/revListPageViewImMessagesWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_i_m',
        'revNameId': 'revListPageViewImMessages',
        'revPageViewContainerName': 'revListPageViewImMessages',
        'revBefore': [],
        'revPageViewName': 'revListPageViewImMessages',
        'revPageView': revListPageViewImMessagesWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;