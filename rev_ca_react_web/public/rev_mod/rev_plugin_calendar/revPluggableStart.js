const revCalendarEvent = require('./rev_views/rev_forms/revCalendarEvent');
const revInlineEventItem = require('./rev_views/rev_context_views/revInlineEventItem');

const revMenuItemTopBarCalendar = require('./rev_views/rev_menu_items/revMenuItemTopBarCalendar');

const revObjectViewCalendarEvent = require('./rev_views/rev_object_views/revObjectViewCalendarEvent');

var revStart = () => {
    return {
        'revPluginName': 'rev_plugin_calendar',
        'revPageViews': [
            revObjectViewCalendarEvent.revPluginPageView,
        ],
        'revContextViews': [
            revInlineEventItem.revContextView,
        ],
        'revForms': [
            revCalendarEvent.revPluginOverrideView,
        ],
        'revMenuItems': [
            revMenuItemTopBarCalendar.revPluginMenuItem,
        ],
    }
};

module.exports.revStart = revStart;