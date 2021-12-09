const revAnnouncementForm_Widget = require('./rev_form_view_widgets/revAnnouncementForm_Widget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_announcements',
        'revNameId': 'rev_announcement',
        'revOverrideView': revAnnouncementForm_Widget.revFormViewWidget.toString(),
        'revStyleSheetFile': '',
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_space/rev_views/rev_forms/rev_form_view_widgets/revAnnouncementForm_Widget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;