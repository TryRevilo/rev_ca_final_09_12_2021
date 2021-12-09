const revSpaceDeleteWidget = require('./rev_delete_override_views_widgets/revSpaceDeleteWidget');

var revDeleteOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space',
        'revNameId': 'rev_group_entity',
        'revDeleteOverrideView': revSpaceDeleteWidget.revDeleteOverrideViewWidget.toString(),
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_delete_override_views/rev_delete_override_views_widgets/revSpaceDeleteWidget.css']
    }
};

module.exports.revDeleteOverrideView = revDeleteOverrideView;