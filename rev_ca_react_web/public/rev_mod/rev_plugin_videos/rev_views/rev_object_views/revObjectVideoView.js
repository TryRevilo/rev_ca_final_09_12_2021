const revObjectVideoViewWidget = require('./rev_object_view_widgets/revObjectVideoViewWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_videos',
        'revNameId': 'revObjectVideoView',
        'revPageViewContainerName': 'revObjectVideoView',
        'revBefore': [],
        'revPageViewName': 'revObjectVideoView',
        'revPageView': revObjectVideoViewWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;