var revMenuItemWidget = async (revVarArgs) => {
    let revImportEmailAddressBookTabId = "revImportAddressBookTabId_" + window.revGenUniqueId();

    window.revSetInterval(revImportEmailAddressBookTabId, async () => {
        document.getElementById(revImportEmailAddressBookTabId).addEventListener("click", async function () {
            console.log("revImportEmailAddressBookTabId");
        });
    });

    return `
        <div id="${revImportEmailAddressBookTabId}">EmAiL</div>`;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
