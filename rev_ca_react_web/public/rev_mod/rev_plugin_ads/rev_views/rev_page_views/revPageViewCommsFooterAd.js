const revPageViewCommsFooterAdWidget = require('./rev_page_view_widgets/revPageViewCommsFooterAdWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_ads',
        'revNameId': 'revPageViewCommsFooterAd',
        'revPageViewContainerName': 'revPageViewCommsFooterAd',
        'revBefore': [],
        'revPageViewName': 'revPageViewCommsFooterAd',
        'revPageView': revPageViewCommsFooterAdWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewCommsFooterAdWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;