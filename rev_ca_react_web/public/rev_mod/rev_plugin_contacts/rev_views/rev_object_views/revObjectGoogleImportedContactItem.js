const revObjectGoogleImportedContactItemWidget = require('./rev_object_view_widgets/revObjectGoogleImportedContactItemWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_contacts',
        'revNameId': 'revObjectGoogleImportedContactItem',
        'revPageViewContainerName': 'revObjectGoogleImportedContactItem',
        'revPageViewName': 'revObjectGoogleImportedContactItem',
        'revPageView': revObjectGoogleImportedContactItemWidget.revView.toString(),
        'revMenuAreas': [],
        // 'revCSSFiles': ['/rev_plugin_contacts/rev_views/rev_object_views/rev_object_view_widgets/revObjectGoogleImportedContactItemWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;