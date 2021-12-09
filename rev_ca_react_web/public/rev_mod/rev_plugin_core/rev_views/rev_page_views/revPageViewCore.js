const revPageViewCoreWidget = require('./rev_page_view_widgets/revPageViewCoreWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_core',
        'revNameId': 'revPageViewCore',
        'revPageViewContainerName': 'revPageViewCore',
        'revPageViewName': 'revPageViewCore',
        'revPageView': revPageViewCoreWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_core/rev_views/rev_page_views/rev_page_view_widgets/revPageViewCoreWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;