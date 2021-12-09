const revMenuItemTopBarCalendarWidget = require('./rev_menu_items_widgets/revMenuItemTopBarCalendarWidget');

var revPluginMenuItem = () => {
    return {
        'rev_plugin_name': 'rev_plugin_calendar',
        'revNameId': 'revMenuItemTopBarCalendar',
        'revOverrideView': revMenuItemTopBarCalendarWidget.revMenuItemWidget.toString(),
        'revContainerMenuAreas': ['revMenuAreaTopBarMoreOptions'],
        'revMenuItems': [],
    }
};

module.exports.revPluginMenuItem = revPluginMenuItem;