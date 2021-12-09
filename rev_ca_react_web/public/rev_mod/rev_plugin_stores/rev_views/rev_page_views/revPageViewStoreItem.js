const revObjectStoreItemWidget = require('./rev_page_view_widgets/revPageViewStoreItemWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_stores',
        'revNameId': 'revObjectStoreItem',
        'revPageViewContainerName': 'revObjectStoreItem',
        'revBefore': [],
        'revPageViewName': 'revObjectStoreItem',
        'revPageView': revObjectStoreItemWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;