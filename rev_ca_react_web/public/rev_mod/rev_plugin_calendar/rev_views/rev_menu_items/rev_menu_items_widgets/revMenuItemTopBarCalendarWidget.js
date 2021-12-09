var revMenuItemWidget = async (revVarArgs) => {
    let revTopBarPluginMenuItemCalendar_Id = 'revTopBarPluginMenuItemCalendar_Id_';

    window.revSetInterval(revTopBarPluginMenuItemCalendar_Id, async () => {
        document.getElementById(revTopBarPluginMenuItemCalendar_Id).addEventListener('click', async (event) => {
            let revForm = await window.revGetForm('rev_calendar_event', revVarArgs);
            window.revDrawMainContentArea({ 'revData': revVarArgs, 'revLoadedPageView': revForm, 'revFloatingOptionsMenuName': null });
        });
    });

    let revMenuAreaContainer = `<a id="${revTopBarPluginMenuItemCalendar_Id}" class="revTabLink dropdown-item">Calendar</a>`;

    return revMenuAreaContainer;
}

module.exports.revMenuItemWidget = revMenuItemWidget;