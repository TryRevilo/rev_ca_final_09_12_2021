var revMenuItemWidget = (revVarArgs) => {
    window.revSetInterval("revLogoutTab", () => {
        document.getElementById("revLogoutTab").addEventListener("click", async (event) => {
            window.REV_LOGGED_IN_ENTITY = null;
            window.REV_LOGGED_IN_ENTITY_GUID = -1;

            revGetLoadedPageViewAreaContainer("revPageViewCore", null, (_revView) => {
                document.getElementById("revRoot").innerHTML = _revView;
            });
        });
    });

    return `<div id="revLogoutTab" class="revLogoutTabStyle"><span><i class="fas fa-sign-out-alt"></i></span></div>`;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
