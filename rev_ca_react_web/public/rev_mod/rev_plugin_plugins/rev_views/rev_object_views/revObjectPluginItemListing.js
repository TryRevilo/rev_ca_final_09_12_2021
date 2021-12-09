const revObjectPluginItemListingWidget = require('./rev_object_view_widgets/revObjectPluginItemListingWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_i_m',
        'revNameId': 'revObjectPluginItemListing',
        'revPageViewContainerName': 'revObjectPluginItemListing',
        'revBefore': [],
        'revPageViewName': 'revObjectPluginItemListing',
        'revPageView': revObjectPluginItemListingWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;