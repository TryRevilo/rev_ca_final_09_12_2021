const revPageViewImportContactsWidget = require('./rev_page_view_widgets/revPageViewImportContactsWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_contacts',
        'revNameId': 'revPageViewImportContacts',
        'revPageViewContainerName': 'revPageViewImportContacts',
        'revBefore': [],
        'revPageViewName': 'revPageViewImportContacts',
        'revPageView': revPageViewImportContactsWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revPageViewImportContactsWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;