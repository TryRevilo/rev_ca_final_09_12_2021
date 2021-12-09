const revCommentsListingsOverride = require('./rev_override_view_widgets/revCommentsListingsOverride');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_comments',
        'revNameId': 'rev_comment',
        'revOverrideView': revCommentsListingsOverride.revPluginOverrideView.toString(),
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comments/rev_views/rev_override_views/rev_override_view_widgets/revCommentListingItemOverrideViewWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;