var revMenuItemWidget = async (revVarArgs) => {
    let revTopBarPluginMenuItemBookmarksId = 'revTopBarPluginMenuItemBookmarksId_';

    window.revSetInterval(revTopBarPluginMenuItemBookmarksId, async () => {
        document.getElementById(revTopBarPluginMenuItemBookmarksId).addEventListener('click', (event) => {
            console.log('Bookmarks : ' + revTopBarPluginMenuItemBookmarksId);
        });
    });

    let revMenuAreaContainer =
        `<a id="${revTopBarPluginMenuItemBookmarksId}" class="revTabLink dropdown-item">Bookmarks</a>`;

    return revMenuAreaContainer;
}

module.exports.revMenuItemWidget = revMenuItemWidget;