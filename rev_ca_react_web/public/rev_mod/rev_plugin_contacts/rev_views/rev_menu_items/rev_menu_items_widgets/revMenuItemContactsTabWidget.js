var revMenuItemWidget = async (revVarArgs) => {

    window.revSetInterval('revAddressBookTab', async () => {
        document.getElementById('revAddressBookTab').addEventListener('click', async function () {
            await window.revGetLoadedPageView('revListingViewContacts', null, (revMainCenterScrollArea) => {
                window.revGetElementById('revCommsContentArea').innerHTML = revMainCenterScrollArea;
            });
        });
    });

    return `
            <div id="revAddressBookTab" class="revIMHeaderTab">
                <i class="fas fa-address-book revIMHeaderTabIcon"></i>
            </div>
        `;
}

module.exports.revMenuItemWidget = revMenuItemWidget;