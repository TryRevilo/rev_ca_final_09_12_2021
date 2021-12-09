var revPluginOverrideViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revNoticiaCount) {
        console.log("ERR -> revNoticiaItemOverrideViewWidget.js -> !revVarArgs || !revVarArgs.revNoticiaCount");

        return;
    }

    let revNoticiasItemParams = {};

    if (revVarArgs.revNoticiasItemParams) {
        revNoticiasItemParams = revVarArgs.revNoticiasItemParams;
    }

    /** REV START SET revNoticiaTtl */
    let revNoticiaTtl = "";

    if (revNoticiasItemParams.revNoticiaTtl) {
        revNoticiaTtl = revNoticiasItemParams.revNoticiaTtl;
    }
    /** REV END SET revNoticiaTtl */

    /** REV START SET revNoticiaCategoryIcon */
    let revNoticiaCategoryIcon = "";

    if (revNoticiasItemParams.revNoticiaCategoryIcon) {
        revNoticiaCategoryIcon = revNoticiasItemParams.revNoticiaCategoryIcon;
    }
    /** REV END SET revNoticiaCategoryIcon */

    /** REV START SET revNoticiasCategoryListingsCallback */
    let revNoticiasCategoryListingsCallback;

    if (revNoticiasItemParams.revNoticiasCategoryListingsCallback) {
        revNoticiasCategoryListingsCallback = revNoticiasItemParams.revNoticiasCategoryListingsCallback;
    }

    let revNoticiasCategory_Id = "revNoticiasCategory_Id_" + window.revGenUniqueId();

    if (revNoticiasCategoryListingsCallback) {
        window.revSetInterval(revNoticiasCategory_Id, () => {
            document.getElementById(revNoticiasCategory_Id).addEventListener("click", (event) => {
                revNoticiasCategoryListingsCallback(revVarArgs);
            });
        });
    }
    /** REV END SET revNoticiasCategoryListingsCallback */

    let revNoticiaCount = revVarArgs.revNoticiaCount;

    let revGetNoticiaView = () => {
        let revMarkNoticiaReadCB_Id = "revMarkNoticiaReadCB_Id_" + window.revGenUniqueId();
        let revCheckBoxCallback = (revCBVarArgs) => {};

        let revCBVarArgs = {
            "revCheckBoxCallback": revCheckBoxCallback,
            "revCheckBoxId": revMarkNoticiaReadCB_Id,
        };

        let revMarkNoticiaReadCB = window.revGetCheckBox(revCBVarArgs);

        let revNoticiaCountTxt = revNoticiaCount + " new notification";

        if (revNoticiasItemParams.revNoticiaCountTxt) {
            revNoticiaCountTxt = revNoticiasItemParams.revNoticiaCountTxt;
        } else if (revNoticiaCount > 1) {
            revNoticiaCountTxt = revNoticiaCount + " new notifications";
        }

        let revNoticiaSummuryWrapper = `
            <div class="revFlexWrapper revNoticiaContentWrapper">
                <div class="revFlexWrapper revNoticiaSummuryWrapper">
                    <div id="${revNoticiasCategory_Id}" class="revTabLink revSmalllBoldBlue revNoticiaNewTxtCount">${window.revTruncateString(revNoticiaCountTxt, 13)}</div>
                    <div class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revNoticiasPastTxtCount">${revVarArgs.revNoticiaCount} total</div>
                </div>
                <div class="revTabLink revFlexWrapper revNoticiaMarkReadWrapper">${revMarkNoticiaReadCB} <div class="revFontSiteGreyTxtColor revFontSizeNormal revNoticiaMarkReadCBTxt">mark as read</div></div>
            </div>
        `;

        return `
        <div class="revFlexContainer revNoticiasListingContainer">
            <div class="revFlexWrapper revNoticiaHeaderWrapper">
                <div class="revSmall-H-Line"></div>
                <div class="revSmall-V-Line-1em"></div>
                <div class="revFontSiteBlueTxtColor revFontSizeLarge revNoticiaIcon">${revNoticiaCategoryIcon}</div>
                <div class="revSmall-V-Line-1em revNoticiaMidSeparater"></div>
                <div class="revSmall-H-Line"></div>
                <div class="revSmalllBold revNoticiaTtlId">${revNoticiaTtl}</div>
                <div class="revSmall-V-Line-1em"></div>
                <div class="revSmall-H-Line"></div>
            </div>
            <div class="revFlexContainer">${revNoticiaSummuryWrapper}</div>
        </div>
        `;
    };

    return revGetNoticiaView();
};

module.exports.revPluginOverrideViewWidget = revPluginOverrideViewWidget;
