const revSpaceOverrideViewWidget = require('./rev_override_view_widgets/revSpaceOverrideViewWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space',
        'revNameId': 'rev_space',
        'revOverrideView': revSpaceOverrideViewWidget.revPluginOverrideViewWidget.toString(),
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_override_views/rev_override_view_widgets/revActivityKiwiOverrideViewWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;