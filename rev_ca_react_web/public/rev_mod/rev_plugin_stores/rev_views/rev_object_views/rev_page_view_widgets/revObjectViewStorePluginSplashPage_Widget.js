var revPageViewWidget = async (revVarArgs) => {
    let revEntityMetadataList = revVarArgs._revEntityMetadataList;
    let revMaxStrLen = 57;

    let revEntityName = window.revGetMetadataValue(revEntityMetadataList, "rev_entity_name");
    revEntityName = window.revGetRawHTML(revEntityName);
    revEntityName = window.revTruncateString(revEntityName, revMaxStrLen);

    /** REV START HEADER AREA */
    let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { revEntity: { "_revEntitySubType": "revSelectStore" } });
    let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", window.REV_LOGGED_IN_ENTITY);
    let revPageHeader = window.revPageHeader("sToREs");
    /** REV END HEADER AREA */

    let revNewStoreItemListingTab_Id = "revNewStoreItemListingTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revNewStoreItemListingTab_Id, async () => {
        document.getElementById(revNewStoreItemListingTab_Id).addEventListener("click", async (event) => {
            let revNewAdForm = await window.revGetForm("revSelectStore", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revNewAdForm, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revMyStoresTab_Id = "revMyStoresTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revMyStoresTab_Id, async () => {
        document.getElementById(revMyStoresTab_Id).addEventListener("click", async (event) => {
            let revPageViewListingStores = await window.revGetLoadedPageView("revPageViewListingStores", revVarArgs);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewListingStores, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revPluginSplashPageHeader = `
    <div class="revFlexWrapper revPluginSplashPageHeaderWrapper">
        <div id="${revNewStoreItemListingTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeLarge revPluginSplashPageHeaderMenuItemTab"><i class="fa fa-plus"></i></div>
        <div class="revTiny-H-Line"></div>
        <div class="revTiny-V-Line"></div>
        <div class="revTiny-H-Line"></div>
        <div id="${revMyStoresTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginSplashPageHeaderMenuItemTab">my sToREs</div>
        <div class="revTiny-H-Line"></div>
        <div class="revTiny-V-Line"></div>
        <div class="revTiny-H-Line"></div>
        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginSplashPageHeaderMenuItemTab">LisTiNGs</div>
        <div class="revTiny-H-Line"></div>
        <div class="revTiny-V-Line"></div>
        <div class="revTiny-H-Line"></div>
        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginSplashPageHeaderMenuItemTab">sALEs</div>
        <div class="revTiny-H-Line"></div>
        <div class="revTiny-V-Line"></div>
        <div class="revTiny-H-Line"></div>
        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revPluginSplashPageHeaderMenuItemTab">puRcHAsEs</div>
    </div>
    `;

    let revUserIconPath = window.revGetEntityIcon(revVarArgs);
    revUserIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revUserIconPath;

    let revUserIcon_Id = "revUserIcon_Id_" + window.revGenUniqueId();

    let revOwnerName = window.revGetMetadataValue(revVarArgs._revInfoEntity._revEntityMetadataList, "rev_entity_full_names_value");

    let revPluginSplashPageStatsWrapper = `
        <div class="revFlexWrapper revPluginSplashPageStatsWrapper">
            <div id="${revUserIcon_Id}" class="revTabLink revFlexContainer revPluginSplashPageStatsIcon">
                <img class="revListingUserIconBlock" 
                src="${revUserIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
            </div>
            <div class="revFlexWrapper revPluginSplashPageStatsCountWrapper">
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">${revOwnerName}</div>
                <div class="revFontSiteBlueTxtColor revFontSizeSmall revFlexWrapper revDividerBorderWrapper">:</div>
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall">1, 200 sALEs</div>
                <div class="revFlexWrapper revDividerBorderWrapper">
                    <div class="revTiny-H-Line"></div>
                    <div class="revTiny-V-Line"></div>
                    <div class="revTiny-H-Line"></div>
                </div>
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall">7 REsoLuTioN rEQuEsTs</div>
            </div>
        </div>
    `;

    let revResView = `
    <div class="revFlexContainer revPageRightBorderedContainer">
        <div class="revFlexContainer revPageHeaderAreaContainer">
            <div class="revFlexWrapper revPageViewTitledPageNavHeaderWrapper_AdForm">${revPageViewPageNavHeader}</div>
            <div class="revFlexWrapper revUserOptionsMenuAreaWrapper_AdForm">${revUserOptionsMenuArea}</div>
            ${revPageHeader}
        </div>
        <div class="revFlexContainer">
            ${revPluginSplashPageHeader}
            ${revPluginSplashPageStatsWrapper}
        </div>
    </div>
    `;

    return revResView;
};

module.exports.revPageViewWidget = revPageViewWidget;
