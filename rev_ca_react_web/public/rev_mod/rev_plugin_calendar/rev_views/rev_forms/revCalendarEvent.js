const revCalendarEvent_Widget = require('./rev_form_view_widgets/revCalendarEvent_Widget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_calendar',
        'revNameId': 'rev_calendar_event',
        'revOverrideView': revCalendarEvent_Widget.revFormViewWidget.toString(),
        'revStyleSheetFile': '',
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_space/rev_views/rev_forms/rev_form_view_widgets/revCalendarEvent_Widget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;