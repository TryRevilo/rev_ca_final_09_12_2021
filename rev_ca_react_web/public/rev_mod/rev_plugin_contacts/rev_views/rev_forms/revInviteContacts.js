const revInviteContactsWidget = require('./rev_form_view_widgets/revInviteContactsWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_contacts',
        'revNameId': 'revInviteContacts',
        'revOverrideView': revInviteContactsWidget.revFormViewWidget.toString(),
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_forms/rev_form_view_widgets/revInviteContactsWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;