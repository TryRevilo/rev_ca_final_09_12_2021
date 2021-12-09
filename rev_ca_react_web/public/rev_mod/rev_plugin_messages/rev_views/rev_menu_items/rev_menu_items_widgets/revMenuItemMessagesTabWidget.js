var revMenuItemWidget = async (revVarArgs) => {

    window.revSetInterval('revMessagesTab', async () => {
        document.getElementById('revMessagesTab').addEventListener('click', async function () {
            await window.revGetLoadedPageView('revListPageViewImMessages', revVarArgs, (revLoadedPageView) => {
                window.revGetElementById('revCommsContentArea').innerHTML = revLoadedPageView;
            });
        });
    });

    return `
            <div id="revMessagesTab" class="revIMHeaderTab">
                <i class="fas fa-envelope revIMHeaderTabIcon"></i>
            </div>
        `;
}

module.exports.revMenuItemWidget = revMenuItemWidget;