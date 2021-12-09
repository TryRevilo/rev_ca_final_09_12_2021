const revObjectViewCalendarEventWidget = require('./rev_object_view_widgets/revObjectViewCalendarEventWidget');

var revPluginPageView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_calendar',
        'revNameId': 'revObjectViewCalendarEvent',
        'revPageViewContainerName': 'revObjectViewCalendarEvent',
        'revBefore': [],
        'revPageViewName': 'revObjectViewCalendarEvent',
        'revPageView': revObjectViewCalendarEventWidget.revPageViewWidget.toString(),
        'revContainerMenuAreas': [
        ],
        'revMenuAreas': [],
        'revMenuItems': [],
    }
};

module.exports.revPluginPageView = revPluginPageView;