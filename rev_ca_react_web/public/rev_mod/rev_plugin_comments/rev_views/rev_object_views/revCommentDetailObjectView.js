const revCommentDetailObjectViewWidget = require('./rev_object_view_widgets/revCommentDetailObjectViewWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_comments',
        'revNameId': 'revCommentDetailObjectView',
        'revPageViewContainerName': 'revCommentDetailObjectView',
        'revBefore': [],
        'revPageViewName': 'revCommentDetailObjectView',
        'revPageView': revCommentDetailObjectViewWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;