var revPageViewWidget = async (revVarArgs) => {
    let revAppWrapperContainer_Id = "revAppWrapperContainer_Id";

    let revPageRightSectionContainerId = "revPageRightSectionContainerId";

    if (!window.REV_LOGGED_IN_ENTITY_GUID || window.REV_LOGGED_IN_ENTITY_GUID < 1 || !window.REV_LOGGED_IN_ENTITY || !window.REV_LOGGED_IN_ENTITY) {
        let revLoggedOutContainerId = "revLoggedOutContainerId";

        let revLoggedOutView = await window.revGetForm("revLogIn", null);
        let revLoggedOutViewContainer = `
            <div class="revPosRelative revFlexContainer revLoggedOutContainer">
                <div id="${revLoggedOutContainerId}" class="revPosRelative revFlexContainer">${revLoggedOutView}</div>
            </div>
        `;
        return revLoggedOutViewContainer;
    }

    let revPageHome_Id = "revPageHome";

    window.revLoadModules("revPluginModuleSessions", (revScriptModule) => {
        window.revPluginModuleSessions.revGetLoggedInEntity(async (revData) => {
            let revMainCenterScrollArea = await window.revGetLoadedPageViewAreaContainer("revMainCenterScrollArea", revData);
            window.revLoadContainerInnerHTMLContent(revPageHome_Id, revMainCenterScrollArea);
        });
    });

    window.revSetInterval("revSiteLeftSection", async () => {
        let revLeftStripSiteNavMenuArea = await window.revGetMenuAreaView("revLeftStripSiteNavMenuArea", revVarArgs);
        document.getElementById("revSiteLeftSection").innerHTML = revLeftStripSiteNavMenuArea;
    });

    let revHomeTab_Id = "revHomeTab_id";

    window.revSetInterval(revHomeTab_Id, () => {
        document.getElementById(revHomeTab_Id).addEventListener("click", async (event) => {
            let revLoadedPageView = await revGetLoadedPageViewAreaContainer("revMainCenterScrollArea", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": "rev_floating_menu_area_user_profile_activity_page" });
        });
    });

    let revMessagingViewsTab_Id = "revMessagingViewsTab_Id";

    window.revSetInterval(revMessagingViewsTab_Id, () => {
        document.getElementById(revMessagingViewsTab_Id).addEventListener("click", async function (event) {
            if (window.REV_LOGGED_IN_ENTITY) {
                let revPageViewListingPlugins = await window.revGetLoadedPageViewAreaContainer("revPageViewComms", window.REV_LOGGED_IN_ENTITY);
                window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewListingPlugins, "revFloatingOptionsMenuName": null });
            }
        });
    });

    window.revGetLoadedPageViewAreaContainer("revPageViewMembesReccomendRightWidget", revVarArgs, (_revView) => {
        window.revSetInterval("revPageViewMembesReccomendRightWidget", async () => {
            document.getElementById("revPageViewMembesReccomendRightWidget").innerHTML = _revView;
        });
    });

    window.revSetInterval("revSiteRightSidebarTopBar", async () => {
        let revSiteRightSidebarTopBar = await window.revGetMenuAreaView("revRightSideBarTopBarMenuArea", window.REV_LOGGED_IN_ENTITY);
        document.getElementById("revSiteRightSidebarTopBar").innerHTML = revSiteRightSidebarTopBar;
    });

    /** REV START REV SIDE BAR AREA */
    let revPageViewCommsRightSidebar_Id = "revPageViewCommsRightSidebar_" + window.revGenUniqueId();

    window.revSetInterval(revPageViewCommsRightSidebar_Id, async () => {
        let revURL = window.REV_SITE_BASE_PATH + "/rev_api/read_all_entity_subtypes_with_rel_container?rev_entity_subtypes_arr=rev_vids_album&rev_rel_remote_id=9&rev_query_limit=40";

        let revData = await window.revGetServerData_JSON_Async(revURL);

        if (revData.revAds) {
            window.revAdsArr = revData.revAds;
        }

        let revPageViewCommsViewAreaTrends = await window.revGetLoadedPageView("revPageViewCommsViewAreaTrends", revVarArgs);

        let revAd;
        let revAdPicsAlbum;

        for (let i = 0; i < window.revAdsArr.length; i++) {
            revAd = window.revAdsArr[i];

            if (revAd) {
                revAdPicsAlbum = revAd._revEntityChildrenList[0];

                if (revAdPicsAlbum) break;
            }
        }

        let revPageViewCommsFooterAd = "";

        let revHeight = window.revGetPageHeight() * 0.8489;

        if (revAdPicsAlbum) {
            let revPageViewCommsFooterAdPageView = await window.revGetLoadedPageViewAreaContainer("revPageViewCommsFooterAd", revAd);

            if (revPageViewCommsFooterAdPageView) {
                revPageViewCommsFooterAd = `<div class="revFlexContainer revPageViewCommsFooterAdPageViewContainer">${revPageViewCommsFooterAdPageView}</div>`;
            }
        }

        document.getElementById(revPageViewCommsRightSidebar_Id).innerHTML = `
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revTrendingVidTtlWrapper">
                    <div class="revTrendingVidTtl">TRENDiNG viDEos</div>
                    <div class="revTrendingVidTtlPointerIcon"><i class="fas fa-level-down-alt"></i></div>
                </div>
                <div class="revFlexContainer revFlexContainerScroll" style="width: 100%; height: ${revHeight}px;  margin-bottom:1em;">
                    ${revPageViewCommsViewAreaTrends}
                </div>
                ${revPageViewCommsFooterAd}
                <div class="revFlexWrapper revRightSideBarFooterMenuAreaWrapper">
                    <div class="revFlexWrapper revRightSideBarFooterMenuAreaDividerWrapper">
                        <div class="revSmall-H-Line"></div>
                        <div class="revTiny-V-Line"></div>
                    </div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revSiteGrayBottomBorder revSideBarFooterTabItem">Terms</div>
                    <div class="revFlexWrapper revRightSideBarFooterMenuAreaDividerWrapper">
                        <div class="revTiny-V-Line"></div>
                        <div class="revSmall-H-Line"></div>
                    </div>

                    <div class="revFlexWrapper revRightSideBarFooterMenuAreaDividerWrapper">
                        <div class="revSmall-H-Line"></div>
                        <div class="revTiny-V-Line"></div>
                    </div>
                    <div class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revSideBarFooterTabItem">copyright 2020</div>
                    <div class="revFlexWrapper revRightSideBarFooterMenuAreaDividerWrapper">
                        <div class="revTiny-V-Line"></div>
                        <div class="revSmall-H-Line"></div>
                    </div>
                </div>
            `;
    });
    /** REV END REV SIDE BAR AREA */

    /** REV START NOTICIAS COUNTER */
    let revTopBarMenuArea_NoticiaCounter_Id = "revTopBarMenuArea_NoticiaCounter_Id";
    let revTopBarMenuAreaTab_Id = "revTopBarMenuAreaTab_Id";

    window.revSetInterval(revTopBarMenuArea_NoticiaCounter_Id, async () => {
        if (!window.REV_LOGGED_IN_ENTITY_GUID) return;

        /** REV START GET REMOTE NOTICIAS */
        let revNoticiasrevURL = window.REV_SITE_BASE_PATH + "/rev_api?" + "rev_logged_in_entity_guid=" + window.REV_LOGGED_IN_ENTITY_GUID + "&revPluginHookContextsRemoteArr=revHookRemoteLoadNoticias";

        try {
            let revNoticiasData = await window.revGetServerData_JSON_Async(revNoticiasrevURL);

            revNoticiasDataFilter = revNoticiasData.filter;

            if (!Array.isArray(revNoticiasDataFilter)) return;

            let revTotNoticiaCount = 0;

            let revParsedNameIdsArr = [];

            for (let i = 0; i < revNoticiasDataFilter.length; i++) {
                let revNoticiDataItem = revNoticiasDataFilter[i];
                let revNameId = revNoticiDataItem.revNameId;

                if (revParsedNameIdsArr.includes(revNameId)) continue;

                revParsedNameIdsArr.push(revNameId);

                let revNoticiaCount = revNoticiDataItem.revNoticiaCount;

                if (revNoticiaCount && revNoticiaCount > 0 == true) {
                    revTotNoticiaCount = revTotNoticiaCount + revNoticiaCount;
                }
            }

            window.revSetInterval(revTopBarMenuArea_NoticiaCounter_Id, async () => {
                if (revTotNoticiaCount > 0) {
                    document.getElementById(revTopBarMenuArea_NoticiaCounter_Id).innerHTML = `&nbsp;&nbsp;&nbsp;${revTotNoticiaCount}&nbsp;&nbsp;&nbsp;`;

                    /** REV START GET REMOTE NOTICIAS */
                    window.revSetInterval(revTopBarMenuAreaTab_Id, () => {
                        document.getElementById(revTopBarMenuAreaTab_Id).addEventListener("click", async () => {
                            if (!window.revIsEmptyJSONObject(window.REV_LOGGED_IN_ENTITY)) {
                                let revPageViewMainNoticiasViewArea = await window.revGetLoadedPageView("revPageViewMainNoticiasViewArea", revNoticiasData);
                                window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revPageViewMainNoticiasViewArea, "revFloatingOptionsMenuName": null });
                            }
                        });
                    });
                    /** REV END GET REMOTE NOTICIAS */
                }
            });
        } catch (error) {
            console.log("ERR -> revPageViewCoreWidget.js -> revNoticiasData -> " + error);
        }
    });
    /** REV END NOTICIAS COUNTER */

    let revMenuAreaTopBarMoreOptions = await window.revGetMenuAreaView("revMenuAreaTopBarMoreOptions", window.REV_LOGGED_IN_ENTITY);

    if (!revMenuAreaTopBarMoreOptions) {
        revMenuAreaTopBarMoreOptions = "";
    }

    /** REV START HASH TAG */
    let revtopBarHashTagTabId = "revtopBarHashTagTabId_" + window.revGenUniqueId();

    window.revSetInterval(revtopBarHashTagTabId, () => {
        document.getElementById(revtopBarHashTagTabId).addEventListener("click", async (event) => {
            try {
                let revPageViewIncomingVideoCall = await window.revGetLoadedPageView("revPageViewIncomingVideoCall", null);

                let revNoticiasPopUpContainer = window.revGetNoticiasPopUpContainer(`
                <div class="revFlexContainer revPageViewIncomingVideoCallContainer">
                    ${revPageViewIncomingVideoCall}
                </div>`);

                window.revTempShowElement(revNoticiasPopUpContainer, "revPageRightSectionContainerId", 117000);
            } catch (error) {
                console.log("ERR -> revPageViewCoreWidget.js -> window.revSetInterval(revtopBarHashTagTabId, () => { -> " + error);
            }
        });
    });
    /** REV START HASH TAG */

    let revSiteTopBarTabConnections_Id = "revSiteTopBarTabConnections_Id";

    window.revSetInterval(revSiteTopBarTabConnections_Id, () => {
        document.getElementById(revSiteTopBarTabConnections_Id).addEventListener("click", async (event) => {
            let revLoadedPageView = await revGetLoadedPageViewAreaContainer("revPageViewListingSpace", window.REV_LOGGED_IN_ENTITY);
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revLoadedPageView, "revFloatingOptionsMenuName": "" });
        });
    });

    let chatsOnlineUsersArr = [];

    for (let i = 0; i < 10; i++) {
        let revOnlineUserIconTab_Id = "revOnlineUserIconTab_Id_" + window.revGenUniqueId();

        chatsOnlineUsersArr.push(`
            <div id="${revOnlineUserIconTab_Id}" class="revPosRelative revTabLink revFontSiteBlueTxtColor revFlexContainer revChatFooterUserIconContainer">
                <img class="revListingIconCurvedTiny revLiveChatFooterUserIcon" src="" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">
                <div class="revSmalllBoldRed revFontSizeLarge revPosAbsolute revNewMessageAllertBackground"></div>
            </div>
            `);

        window.revSetInterval(revOnlineUserIconTab_Id, () => {
            document.getElementById(revOnlineUserIconTab_Id).addEventListener("click", async (event) => {
                let revObjectChatMessagesListing = await window.revGetLoadedPageView("revObjectChatMessagesListing", null);

                window.revAddRemoveToggleView("beforeend", revPageRightSectionContainerId, "revBubble", revObjectChatMessagesListing);
            });
        });
    }

    /** REV START TOP BAR SEARCH */
    let revSearchInputCallBack = async (revSearchTxt) => {
        let revPassVarArgs = window.revCloneJsObject(revVarArgs);
        revPassVarArgs["revSearchTxt"] = revSearchTxt;

        let revPageViewListingSerachResults = await window.revGetLoadedPageView("revPageViewListingSerachResults", revPassVarArgs);
        window.revDrawMainContentArea({ "revData": revPassVarArgs, "revLoadedPageView": revPageViewListingSerachResults, "revFloatingOptionsMenuName": "123" });
    };

    let revFormViewSearchTxtInput = await window.revGetForm("revFormViewSearchTxtInput", { "revSearchInputStyle": "revCenterTopBarSearchInput", "revSearchInputCallBack": revSearchInputCallBack });
    /** REV END TOP BAR SEARCH */

    let revCodePluginsTab_Id = "revCodePluginsTab_Id_" + window.revGenUniqueId();

    let revFormPluginEditorContainer_Id = "revFormPluginEditorContainer_Id_" + window.revGenUniqueId();

    window.revSetInterval(revCodePluginsTab_Id, () => {
        document.getElementById(revCodePluginsTab_Id).addEventListener("click", async (event) => {
            let revCodePluginsEditorFormContainerWidth = window.revGetPageWidth() * 0.736;
            let revCodePluginsEditorFormContainerHeight = window.revGetPageHeight() * 0.82;

            if (!window.revIsDomElementIdExists(revFormPluginEditorContainer_Id)) {
                let revFormPluginEditor = await window.revGetForm("revFormPluginEditor", revVarArgs);
                let revFormPluginEditorView = `
                    <div id="${revFormPluginEditorContainer_Id}" class="revPosAbsolute revFlexContainer  revFlexContainerScroll revCodePluginsEditorFormContainer visible" style="width: ${revCodePluginsEditorFormContainerWidth}px; height: ${revCodePluginsEditorFormContainerHeight}px;">
                        ${revFormPluginEditor}
                    </div>
                `;

                document.getElementById("revMainCenterChatFooterAreaWrapper_Id").insertAdjacentHTML("beforeend", revFormPluginEditorView);
            } else {
                window.revToggleVisibility(revFormPluginEditorContainer_Id);
            }
        });
    });

    let revPage = `
    <div id="${revAppWrapperContainer_Id}" class="revPosRelative revFlexWrapper App">
        <div id="revSiteLeftSection" class="revPosRelative revFlexContainer revSiteLeftContainer">+</div>

        <div id="${revPageRightSectionContainerId}" class="revPosRelative revFlexContainer revRightSectionContainer">
            <div class="revFlexWrapper revSiteCenterTopbarWrapper">
                <div class="revFlexWrapper revCenterTopBarLeftWrapper">${revFormViewSearchTxtInput}</div>
                <div class="revMidTopBarMenuArea">
                    <span id="${revHomeTab_Id}" class="revTabLink revMidTopBarMenuAreaMenuItem"><i class="fas fa-home"></i></span>
                    <span id="${revtopBarHashTagTabId}" class="revTabLink revMidTopBarMenuAreaMenuItem"><i class="fab fa-hubspot fa-lg"></i></span>
                    <div id="${revMessagingViewsTab_Id}" class="revTabLink revMidTopBarMenuAreaMenuItem"><span><i class="far fa-comment-alt fa-lg"></i></span></div>
                    <span id="${revSiteTopBarTabConnections_Id}" class="revTabLink revMidTopBarMenuAreaMenuItem"><i class="fas fa-street-view fa-lg"></i></span>
                    <span class="revTabLink revMidTopBarMenuAreaMenuItem">${revMenuAreaTopBarMoreOptions}</span>
                    <div id="${revTopBarMenuAreaTab_Id}" class="revTabLink revMidTopBarMenuAreaMenuItem">
                        <div id="${revTopBarMenuArea_NoticiaCounter_Id}" class="revMidTopBarMenuAreaMenuItem_NoticiaCounter"></div>
                        <div class="revMidTopBarMenuAreaMenuItem_Noticia"><span><i class="far fa-circle"></i></span></div>
                    </div>
                </div>
            </div>
            <div id="revSwitchArea" class="revFlexContainer invisible revSwitchArea"></div>
            <div id="${revPageHome_Id}" class="revPosRelative revFlexContainer revFlexContainerScroll revPageScrollArea"></div>
            <div id="revMainCenterChatFooterAreaWrapper_Id" class="revPosAbsolute revFlexWrapper revMainCenterFooterAreaWrapper">
                <div class="revPosRelative revFlexWrapper_WidthAuto revDeveloperFloatingMenuAreaWrapper">
                    <div id="${revCodePluginsTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revCodeFloatingTab revCodePluginsTab"><i class="fas fa-code fa-lg"></i></div>
                    ${window.revSmallDividerWrapper_BorderRight()}
                    <div class="revTabLink revFontSizeNormal revCodeFloatingTab"><i class="fas fa-exclamation"></i></div>
                </div>
            </div>
        </div>

        <div class="revPosRelative revFlexContainer revSightRightSidebarContainer">
            <div id="revSiteRightSidebarTopBar" class="revFlexContainer revSiteRightSidebarTopBar"></div>
            <div id="${revPageViewCommsRightSidebar_Id}" class="revFlexContainer revServicesAreaContainer"></div>
        </div>
    </div>
    `;

    return revPage;
};

module.exports.revPageViewWidget = revPageViewWidget;
