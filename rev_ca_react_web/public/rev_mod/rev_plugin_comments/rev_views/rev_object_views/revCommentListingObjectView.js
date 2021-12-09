const revCommentListingObjectViewWidget = require('./rev_object_view_widgets/revCommentListingObjectViewWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_comments',
        'revNameId': 'revCommentListingObjectView',
        'revPageViewContainerName': 'revCommentListingObjectView',
        'revBefore': [],
        'revPageViewName': 'revCommentListingObjectView',
        'revPageView': revCommentListingObjectViewWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;