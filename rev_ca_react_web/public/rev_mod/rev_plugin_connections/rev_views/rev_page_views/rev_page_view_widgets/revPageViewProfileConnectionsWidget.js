var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs.revProfileConnEntitiesArr) {
        revVarArgs.revProfileConnEntitiesArr = [];
    }

    let revProfileConnEntitiesArr = revVarArgs.revProfileConnEntitiesArr;

    let revConnsIconsArr = [];

    for (let i = 0; i < revProfileConnEntitiesArr.length; i++) {
        let revProfConnEntity = revProfileConnEntitiesArr[i];

        if (!revProfConnEntity) continue;

        let revProfConnEntityIcon_Id = "revProfConnEntityIcon_Id_" + window.revGenUniqueId();

        window.revSetInterval(revProfConnEntityIcon_Id, () => {
            document.getElementById(revProfConnEntityIcon_Id).addEventListener("click", function () {
                window.revUserIconClick(revProfConnEntity._remoteRevEntityGUID);
            });

            window.revLoadUserIcon(revProfConnEntity, revProfConnEntityIcon_Id);
        });

        let revProfileConnIcon_LastChild = "";

        if (i == revProfileConnEntitiesArr.length - 1) {
            revProfileConnIcon_LastChild = "revProfileConnIcon_LastChild";
        }

        revConnsIconsArr.push(`<div id="${revProfConnEntityIcon_Id}" class="revTabLink revFontSiteGreyTxtColor revFontSizeNormal revProfileConnIcon ${revProfileConnIcon_LastChild}"></div>`);
    }

    let revProfileConnPageOwnerIcon_Id = "revProfileConnPageOwnerIcon_Id_" + window.revGenUniqueId();
    window.revLoadUserIcon(revVarArgs, revProfileConnPageOwnerIcon_Id);

    /** REV START CONNECT USER */
    let revConnectUserTab_Id = "revConnectUserTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revConnectUserTab_Id, () => {
        document.getElementById(revConnectUserTab_Id).addEventListener("click", async (event) => {
            let revCreateUserConnectionsForm = await window.revGetForm("revCreateUserConnectionsForm", revVarArgs);

            window.revToggleSwitchArea(`
            <div class="revFlexContainer revCreateUserConnectionsFormContainer">
                <div class="revFontSizeNormalHeader revPublisherSettingsHeader">coNNEcT</div>
                ${revCreateUserConnectionsForm}
            </div>
            `);
        });
    });
    /** REV START CONNECT USER */

    /** REV START ABOUT CONNECTIONS HELP TAB */
    let revAboutConnectionsTaggedHelpTab_Id = "revAboutConnectionsTaggedHelpTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revAboutConnectionsTaggedHelpTab_Id, () => {
        document.getElementById(revAboutConnectionsTaggedHelpTab_Id).addEventListener("click", async (event) => {
            let revListingViewHelpTagTopics = await window.revGetLoadedPageView("revListingViewHelpTagTopics", { "revTagsArr": ["connections"], "revEntitySubTypesArr": ["rev_connection"], "revServiceDescription": "connEcTioNs" });
            window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revListingViewHelpTagTopics, "revFloatingOptionsMenuName": "123" });
        });
    });
    /** REV END ABOUT CONNECTIONS HELP TAB */

    let revConnsIconsView = `<div class="revSmall-V-Line-1em"></div>`;

    if (revConnsIconsArr.length > 0) {
        revConnsIconsView = revConnsIconsArr.join("");
    }

    return `
    <div class="revFlexContainer">
        <div class="revFlexWrapper revProfileConnSelfWrapper">
            <div id="${revProfileConnPageOwnerIcon_Id}" class="revProfileConnRelsIcon"></div>
            <div id="${revConnectUserTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revProfileConnSetWrapper">
                <div class="revSmall-H-Line"></div>
                <div class="revTiny-V-Line"></div>
                <div class="revProfileConnDegreePointer"><i class="fas fa-arrows-alt-h revFontSizeMedium"></i></div>
                <div class="revTiny-V-Line"></div>
                <div class="revSmall-H-Line"></div>
                <div class="revProfileConnSetIcon"><i class="fas fa-user-plus revFontSizeLarge"></i></div>
                <div class="revSmall-H-Line"></div>
                <div class="revTiny-V-Line"></div>
            </div>
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revProfileConnSharedTab">4 shared connections</div>
            <div id="${revAboutConnectionsTaggedHelpTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revProfileConnHelpTab">connections HElp</div>
        </div>
        <div class="revFlexWrapper revProfileConnCurrentWrapper">
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revProfileConnCounterWrapper">
                <div class="revProfileConnCounterPointer"><i class="fas fa-level-up-alt revRotate90"></i></div>
                <div class="revProfileConnCounterTxt"> ${revProfileConnEntitiesArr.length} coNnecTioNs</div>
            </div>
            <div class="revSmall-H-Line"></div>
            <div class="revPosRelative revFlexWrapper revProfileConnCurrIconsWrapper">
                <div class="revPosAbsolute revFlexWrapper revProfileRelationsViewBackgroundLineWrapper"></div>
                <div class="revFlexWrapper revFlexWrapperScroll revConnIconsListScrollWrapper">${revConnsIconsView}</div>
            </div>
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revProfileConnExploreWrapper">
                <div class="revSmall-V-Line-1em"></div>
                <div class="revProfileConnExploreTxt">ExploRE</div>
                <div class="revProfileConnExplorePointerIcon"><i class="fas fa-long-arrow-alt-right"></i></div>
            </div>
        </div>
    </div>`;
};

module.exports.revPageViewWidget = revPageViewWidget;
