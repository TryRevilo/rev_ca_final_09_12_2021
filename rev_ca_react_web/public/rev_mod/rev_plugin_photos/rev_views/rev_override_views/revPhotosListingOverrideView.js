const revPhotosListingOverrideViewWidget = require('./rev_override_view_widgets/revPhotosListingOverrideViewWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_pics_album',
        'revNameId': 'rev_photo',
        'revOverrideView': revPhotosListingOverrideViewWidget.revPluginOverrideViewWidget.toString(),
        'revStyleSheetFile': 'localhost/rev_wip/rev_ca_web/rev_ca_react_web/public/rev_mod/rev_plugin_photos/rev_views/rev_override_views/rev_override_view_widgets/revPhotosListingOverrideView.css',
        // 'revCSSFiles': ['/rev_plugin_photos/rev_views/rev_override_views/rev_override_view_widgets/revPhotosListingOverrideView.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;