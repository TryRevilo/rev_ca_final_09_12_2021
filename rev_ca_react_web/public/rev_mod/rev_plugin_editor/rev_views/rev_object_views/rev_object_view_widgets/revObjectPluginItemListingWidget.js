var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revManifest) {
        return;
    }

    let revPluginContainersArr = revVarArgs.revPluginContainersArr;

    let revManifest = revVarArgs.revManifest;

    let revName = revManifest.revName;
    let revDescription = revManifest.revDescription;
    let revPrice = revManifest.revPrice;

    revDescription = window.revTruncateString(revDescription, 112);

    let revInstallersIconsId = "revInstallersIconsId_" + window.revGenUniqueId();
    let revInstallTabId = "revInstallersIconsId_" + window.revGenUniqueId();

    window.revSetInterval(revInstallersIconsId, () => {
        let revInstallersArr = [];

        for (let i = 0; i < 7; i++) {
            revInstallersArr.push(`<div class="revPluginItemListingInstallerIcon"></div>`);
        }

        document.getElementById(revInstallersIconsId).innerHTML = revInstallersArr.join("");
    });

    window.revSetInterval(revInstallTabId, () => {
        document.getElementById(revInstallTabId).addEventListener("click", async (event) => {
            let revPluginInstallForm = await window.revGetForm("revPluginInstallForm", {
                "revManifest": revManifest,
                "revPluginContainersArr": revPluginContainersArr,
            });

            document.getElementById("revPluginsListingContainerId").innerHTML = revPluginInstallForm;
        });
    });

    let revInstallTabTxt = "Install";

    if (revPluginContainersArr.length > 0) {
        revInstallTabTxt = "removE";
    }

    return `
        <div class="revFlexWrapper revPluginItemWrapper">
            <div class="revFlexWrapper revPluginItemIconWrapper"><i class="fas fa-charging-station revPluginItemIcon"></i></div>
            <div class="revFlexContainer revPluginItemRightContainer">
                <div class="revFlexWrapper">
                    <div class="revFontSiteBlueTxtColor revFontSizeNormal revPluginItemName">${revName}</div>
                    <div id="${revInstallTabId}" class="revTabLink revFontSiteBlueTxtColor revPluginListingInstallTab">${revInstallTabTxt}</div>
                </div>
                <div class="revFontSiteGreyTxtColor revFontSizeNormal revPluginListingDetails">${revDescription}</div>
                <div class="revFlexContainer revPluginItemInstallersContainer">
                    <div class="revFlexWrapper revInstallsWrapper">
                        <div class="revFontSiteBlueTxtColor revFontSizeNormal"><span class="revSmalllBold">Price : </span> ${revPrice}</div>
                        <div class="revFontSiteGreyTxtColor revFontSizeNormal revInstallsCount">1, 232 Installs</div>
                    </div>

                    <div id=${revInstallersIconsId} class="revFlexWrapper revInstallersIconsWrapper"></div>
                </div>

                <div class="revBorderBottom"></div>
            </div>
        </div>
     `;
};

module.exports.revPageViewWidget = revPageViewWidget;
