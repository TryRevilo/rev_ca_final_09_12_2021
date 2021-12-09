const revPageViewMembesReccomendRightWidget = require('./rev_page_view_widgets/revPageViewMembesReccomendRightWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_members',
        'revNameId': 'revPageViewMembesReccomendRightWidget',
        'revPageViewContainerName': 'revPageViewMembesReccomendRightWidget',
        'revBefore': [],
        'revPageViewName': 'revPageViewMembesReccomendRightWidget',
        'revPageView': revPageViewMembesReccomendRightWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        'revCSSFiles': [
            // '/rev_plugin_members/rev_views/rev_page_views/rev_page_view_widgets/revPageViewMembesReccomendRightWidget.css'
        ]
    }
};

module.exports.revPluginPageView = revPluginPageView;