const revPageViewSpaceBriefInfo_Academic_Widget = require('./rev_context_view_widgets/revPageViewSpaceBriefInfo_Academic_Widget');

var revContextView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_academic_space',
        'revNameId': 'rev_academic_space',
        'revContexts': ['revSpaceBriefInfo'],
        'revContextView': revPageViewSpaceBriefInfo_Academic_Widget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewSpaceBriefInfo_Academic_Widget.css']
    }
};

module.exports.revContextView = revContextView;