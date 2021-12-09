const revInlineAnnouncementItem = require('./rev_views/rev_context_views/revInlineAnnouncementItem');
const revAnnouncementForm = require('./rev_views/rev_forms/revAnnouncementForm');

var revStart = () => {

    return {
        'revPluginName': 'rev_plugin_announcements',
        'revPageViews': [
        ],
        'revContextViews': [
            revInlineAnnouncementItem.revContextView,
        ],
        'revForms': [
            revAnnouncementForm.revPluginOverrideView,
        ],
        'revMenuItems': [
        ],
    }
};

module.exports.revStart = revStart;