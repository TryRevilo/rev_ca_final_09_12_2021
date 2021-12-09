const revPageViewMainNoticiasViewArea = require('./rev_page_view_widgets/revPageViewMainNoticiasViewArea');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_noticias',
        'revNameId': 'revPageViewMainNoticiasViewArea',
        'revPageViewContainerName': 'revPageViewMainNoticiasViewArea',
        'revBefore': [],
        'revPageViewName': 'revPageViewMainNoticiasViewArea',
        'revPageView': revPageViewMainNoticiasViewArea.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewMainNoticiasViewArea.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;