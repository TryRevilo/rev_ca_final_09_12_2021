const revObjectViewContactItemWidget = require('./rev_object_view_widgets/revObjectViewContactItemWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_contacts',
        'revNameId': 'revObjectViewContactItem',
        'revPageViewContainerName': 'revObjectViewContactItem',
        'revPageViewName': 'revObjectViewContactItem',
        'revPageView': revObjectViewContactItemWidget.revView.toString(),
        'revMenuAreas': [],
        // 'revCSSFiles': ['/rev_plugin_contacts/rev_views/rev_object_views/rev_object_view_widgets/revObjectViewContactItemWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;