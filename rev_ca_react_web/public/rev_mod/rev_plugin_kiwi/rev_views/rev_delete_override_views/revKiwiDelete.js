const revKiwiDeleteWidget = require('./rev_delete_override_views_widgets/revKiwiDeleteWidget');

var revDeleteOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_kiwi',
        'revNameId': 'rev_kiwi',
        'revDeleteOverrideView': revKiwiDeleteWidget.revDeleteOverrideViewWidget.toString(),
        'revStyleSheetFile': '',
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_delete_override_views/rev_delete_override_views_widgets/revKiwiDeleteWidget.css']
    }
};

module.exports.revDeleteOverrideView = revDeleteOverrideView;