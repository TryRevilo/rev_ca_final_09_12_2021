const revPageViewListingPluginsWidget = require('./rev_page_view_widgets/revPageViewListingPluginsWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_ads',
        'revNameId': 'revPageViewListingPlugins',
        'revPageViewContainerName': 'revPageViewListingPlugins',
        'revBefore': [],
        'revPageViewName': 'revPageViewListingPlugins',
        'revPageView': revPageViewListingPluginsWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewListingPluginsWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;