const revVideosListingOverrideViewWidget = require('./rev_override_view_widgets/revVideosListingOverrideViewWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_videos',
        'revNameId': 'revVideosListingOverrideView',
        'revOverrideView': revVideosListingOverrideViewWidget.revPluginOverrideViewWidget.toString(),
        // 'revCSSFiles': ['/rev_plugin_videos/rev_views/rev_override_views/rev_override_view_widgets/revVideosListingOverrideViewWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;