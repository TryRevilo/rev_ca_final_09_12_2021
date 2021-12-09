var revMenuItemWidget = async (revVarArgs) => {
    window.revSetInterval("revIMHeaderTabId", () => {
        document.getElementById("revIMHeaderTabId").addEventListener("click", async function () {
            window.revGetLoadedPageView("revListPageViewImMessages", window.REV_LOGGED_IN_ENTITY, (revLoadedPageView) => {
                document.getElementById("revCommsContentArea").innerHTML = revLoadedPageView;
            });
        });
    });

    return `
        <div id="revIMHeaderTabId" class="revIMHeaderTab">
            <span class="revIMHeaderTabText">
                <i class="fas fa-arrows-alt fa-lg"></i> I.M
            </span>
        </div>
        `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
