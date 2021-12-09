var revMenuItemWidget = async (revVarArgs) => {
    let revTopBarPluginMenuItemStoreId = "revTopBarPluginMenuItemStore_" + window.revGenUniqueId();

    window.revSetInterval(revTopBarPluginMenuItemStoreId, async () => {
        document.getElementById(revTopBarPluginMenuItemStoreId).addEventListener("click", async (event) => {
            let revObjectViewStorePluginSplashPage = await window.revGetLoadedPageView("revObjectViewStorePluginSplashPage", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revObjectViewStorePluginSplashPage, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revMenuAreaContainer = `<a id="${revTopBarPluginMenuItemStoreId}" class="revTabLink dropdown-item">Stores</a>`;

    return revMenuAreaContainer;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
