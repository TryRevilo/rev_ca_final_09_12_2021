const revImportGooglePhoneBookFormWidget = require('./rev_form_view_widgets/revImportGooglePhoneBookFormWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_contacts',
        'revNameId': 'revImportGooglePhoneBookForm',
        'revOverrideView': revImportGooglePhoneBookFormWidget.revFormViewWidget.toString(),
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_forms/rev_form_view_widgets/revImportGooglePhoneBookFormWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;