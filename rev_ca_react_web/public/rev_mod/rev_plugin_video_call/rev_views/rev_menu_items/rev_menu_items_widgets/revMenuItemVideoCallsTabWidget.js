var revMenuItemWidget = async (revVarArgs) => {
    window.revSetInterval("revVideoCallsHeaderTabId", async () => {
        document.getElementById("revVideoCallsHeaderTabId").addEventListener("click", async function () {
            let revPageViewVideoCall = await window.revGetLoadedPageView("revPageViewVideoCall", null);
            document.getElementById("revCommsContentArea").innerHTML = `<div class="revFlexContainer revOngoingCallsContainer">${revPageViewVideoCall}</div>`;
        });
    });

    return `
            <div id="revVideoCallsHeaderTabId" class="revIMHeaderTab">
                <i class="fas fa-video revIMHeaderTabIcon"></i>
            </div>
        `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
