const revObjectViewIMWidget = require('./rev_object_view_widgets/revObjectViewIMWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_comms',
        'revNameId': 'revObjectViewIM',
        'revPageViewContainerName': 'revObjectViewIM',
        'revBefore': [],
        'revPageViewName': 'revObjectViewIM',
        'revPageView': revObjectViewIMWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_i_m/rev_views/rev_object_views/rev_object_view_widgets/revObjectViewIMWidget.css']
    }
};

module.exports.revPluginPageView = revPluginPageView;