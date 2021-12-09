var revWidget = async (revVarArgs) => {
    let revPluginsStripMenuItemId = "revPluginsStripMenuItemId";
    let revMembersAllTabId = "revMembersAllTabId";
    let revHistoryTabId = "revHistoryTabId";
    let revAllSiteActivityTab_Id = "revAllSiteActivityTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revHistoryTabId, () => {
        document.getElementById(revHistoryTabId).addEventListener("click", async (event) => {
            let revPageViewListingAllHistory = await window.revGetLoadedPageViewAreaContainer("revPageViewListingAllHistory", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewListingAllHistory, "revFloatingOptionsMenuName": "123" });
        });
    });

    window.revSetInterval(revAllSiteActivityTab_Id, () => {
        document.getElementById(revAllSiteActivityTab_Id).addEventListener("click", async (event) => {
            let revPageViewAllPublicActivity = await window.revGetLoadedPageViewAreaContainer("revPageViewAllPublicActivity", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewAllPublicActivity, "revFloatingOptionsMenuName": "123" });
        });
    });

    window.revSetInterval(revMembersAllTabId, () => {
        document.getElementById(revMembersAllTabId).addEventListener("click", (event) => {
            window.revGetLoadedPageViewAreaContainer("revPageViewMembersListingAll", window.REV_LOGGED_IN_ENTITY, (_revView) => {
                document.getElementById("revPageHome").innerHTML = _revView;
            });
        });
    });

    window.revSetInterval(revPluginsStripMenuItemId, () => {
        document.getElementById(revPluginsStripMenuItemId).addEventListener("click", async (event) => {
            let revPageViewListingPlugins = await window.revGetLoadedPageViewAreaContainer("revPageViewListingPlugins", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewListingPlugins, "revFloatingOptionsMenuName": "rev_floating_menu_area_plugins" });
        });
    });

    let revChatSettingsTab_Id = "revChatSettingsTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revChatSettingsTab_Id, () => {
        document.getElementById(revChatSettingsTab_Id).addEventListener("click", async (event) => {
            let revChatMessagingSetingsForm = await window.revGetForm("revChatMessagingSetingsForm", revVarArgs);
            revChatMessagingSetingsForm = `<div id="revBubble" class="revPosRelative revFlexContainer revChatSettingsFormContainer">${revChatMessagingSetingsForm}</div>`;

            window.revAddRemoveToggleView("beforeend", "revPageRightSectionContainerId", "revBubble", revChatMessagingSetingsForm);
        });
    });

    let revStripTranslateTab_Id = "revStripTranslateTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revStripTranslateTab_Id, () => {
        document.getElementById(revStripTranslateTab_Id).addEventListener("click", async (event) => {
            let revPageViewTranslate = await window.revGetLoadedPageView("revPageViewTranslate", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": window.REV_LOGGED_IN_ENTITY, "revLoadedPageView": revPageViewTranslate, "revFloatingOptionsMenuName": "123" });
        });
    });

    let revTranslateMenuItem = `
        <div id="${revStripTranslateTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeLarge revFlexContainer revStripTranslateTabContainer">
            <div class="revStripTranslateTab_TopBorder"></div>
            <div>T</div>
            <div class="revFontSizeSmall"><i class="fas fa-language fa-2x"></i></div>
            <div class="revStripTranslateTab_BottomBorder"></div>
        </div>
    `;

    /** REV START QUESTION ANSWER */
    let revStripQuestionAnswerTab_Id = "revStripQuestionAnswerTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revStripQuestionAnswerTab_Id, () => {
        document.getElementById(revStripQuestionAnswerTab_Id).addEventListener("click", async (event) => {
            let revPageViewListingQuestions = await window.revGetLoadedPageView("revPageViewListingQuestions", window.REV_LOGGED_IN_ENTITY);

            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewListingQuestions, "revFloatingOptionsMenuName": "123" });
        });
    });
    /** REV END QUESTION ANSWER */

    /** REV START LIVE STREAM */
    let revStripLiveStreamTab_Id = "revStripLiveStreamTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revStripLiveStreamTab_Id, () => {
        document.getElementById(revStripLiveStreamTab_Id).addEventListener("click", async (event) => {
            let revNewAdForm = await window.revGetForm("revAd", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revNewAdForm, "revFloatingOptionsMenuName": "123" });
        });
    });
    /** REV END LIVE STREAM */

    /** REV START ADS */
    let revStripAdsTab_Id = "revStripAdsTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revStripAdsTab_Id, () => {
        document.getElementById(revStripAdsTab_Id).addEventListener("click", async (event) => {
            let revNewAdForm = await window.revGetForm("revAd", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revNewAdForm, "revFloatingOptionsMenuName": "123" });
        });
    });
    /** REV END ADS */

    /** REV START CHAT ALERTS STRIP TAB */
    let revChatMessagesAlertTab_Id = "revChatMessagesAlertTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revChatMessagesAlertTab_Id, () => {
        document.getElementById(revChatMessagesAlertTab_Id).addEventListener("click", async (event) => {
            let revPageViewNewChatAlertsListingArea = await window.revGetLoadedPageView("revPageViewNewChatAlertsListingArea", window.REV_LOGGED_IN_ENTITY);
            revPageViewNewChatAlertsListingArea = `<div id="revBubble" class="revPosAbsolute revFlexContainer revPageViewNewChatAlertsListingAreaContainer">${revPageViewNewChatAlertsListingArea}</div>`;

            window.revAddRemoveToggleView("beforeend", "revPageRightSectionContainerId", "revBubble", revPageViewNewChatAlertsListingArea);
        });
    });

    let revChatAlertsArea = `
        <div id="${revChatMessagesAlertTab_Id}" class="revTabLink revFontSiteBlueTxtColor  revFlexContainer revChatMessagesAlertTabContainer">
            <div class="revStripTranslateTab_TopBorder"></div>
            <div class="revFlexContainer revChatMessagesAlertTxtContainer">
                <div class="revFontSizeLarge"><i class="fas fa-exclamation"></i></div>
                <div class="revFontSizeSmall revStripChatAlertCount"></div>
            </div>
            <div class="revStripTranslateTab_BottomBorder"></div>
        </div>
    `;
    /** REV STOP CHAT ALERTS STRIP TAB */

    let revMenuAreaContainer = `
    <div class="revFlexContainer revPosRelative revStripTabsContainer">
        <div class="revPosAbsolute revLeftStripBackLine"></div>
        <div class="revPosRelative revFlexContainer revStripTopMenuesContainer">
            <div class="revPosAbsolute vl"></div>
            <div id="${revHistoryTabId}" class="revTabLink revFontSiteBlueTxtColor revFontSizeMedium revFlexWrapper revStripTab"><i class="fas fa-history"></i></div>
            <div id="${revAllSiteActivityTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeMedium revFlexWrapper revStripTab"><i class="fas fa-chart-line"></i></div>
            <div id="${revMembersAllTabId}" class="revTabLink revFontSiteBlueTxtColor revFontSizeMedium revFlexWrapper revStripTab"><i class="fas fa-users"></i></div>
            
            <div id="${revPluginsStripMenuItemId}" class="revTabLink revFontSiteBlueTxtColor revFontSizeMedium revStripTab revPluginsStripMenuItem"><i class="fas fa-expand-arrows-alt"></i></div>
        </div>

        <div class="revFlexContainer revStripMidMenuesContainer">
            ${revTranslateMenuItem}
            <div id="${revStripQuestionAnswerTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeLarge revStripMidQATab">Q</div>
            
            <div id="${revStripLiveStreamTab_Id}" class="revTabLink revFlexContainer revStripMidLiveSreamTabContainer">
                <div class="revSmall-H-Line"></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revStripMidLiveSreamTab"><i class="fas fa-video"></i></div>
            </div>

            <div id="${revStripAdsTab_Id}" class="revTabLink revFlexContainer revStripMidQATabContainer">
                <div class="revSmall-H-Line"></div>
                <div class="revFontSiteBlueTxtColor revFontSizeNormal revStripMidAdTab">Ad</div>
            </div>
        </div>

        <div class="revPosAbsolute revFlexContainer revChatMenuAreaContainer">
            ${revChatAlertsArea}
            <div id=${revChatSettingsTab_Id} class="revTabLink revFontSiteWhitextColor revFontSizeLarge revOnlineSettings"><i class="fas fa-cog"></i></div>
            <div class="revFontSizeLarge revSettingsCarretPointer"><i class="fas fa-long-arrow-alt-down"></i></div>
            <div class="revTabLink revFontSizeLarge revChatSettingsUserIcon"><i class="fas fa-user"></i></div>
        </div>
    </div>
    `;

    return revMenuAreaContainer;
};

module.exports.revWidget = revWidget;
