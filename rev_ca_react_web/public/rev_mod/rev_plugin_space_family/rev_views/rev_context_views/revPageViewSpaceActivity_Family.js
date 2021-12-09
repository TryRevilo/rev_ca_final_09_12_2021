const revPageViewSpaceActivity_Family_Widget = require('./rev_context_view_widgets/revPageViewSpaceActivity_Family_Widget');

var revContextView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_space_family',
        'revNameId': 'rev_family_space',
        'revContexts': ['revPageContextViewSpaceActivity'],
        'revContextView': revPageViewSpaceActivity_Family_Widget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewSpaceActivity_Family_Widget.css']
    }
};

module.exports.revContextView = revContextView;