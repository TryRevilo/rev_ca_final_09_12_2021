var revPageViewWidget = async (revVarArgs) => {
    let revLoggedInEntityGUID = window.REV_LOGGED_IN_ENTITY_GUID;

    if (revVarArgs) {
        await window.revLoadModules("revPluginModuleSessions", (revScriptModule) => {
            window.revPluginModuleSessions.revAddExploredEntity(revVarArgs, (revResStatus) => {});
        });

        await window.revDownloadDefaultViews("rev_kiwi,rev_photo,rev_comment".split(","));

        /** PAGE OWNER MENU AREA OPTIONS */
        let revUserOptionsMenuArea = await window.revGetMenuArea("revActivityItemsListingView", revVarArgs);

        /** REV KIWI FORM */
        let revKiwiForm = await window.revGetForm("rev_kiwi", revVarArgs);

        let revEntityActivityContentArea_Id = "revEntityActivityContentArea";

        let revAccordionView = "";

        let revEntityInfoAlbum = window.revGetEntityChildren_By_Subtype(revVarArgs._revInfoEntity._revEntityChildrenList, "rev_pics_album");

        if (Array.isArray(revEntityInfoAlbum)) {
            revEntityInfoAlbum = revEntityInfoAlbum[0];

            if (revEntityInfoAlbum) {
                let revImagesListArr = [];

                for (let i = 0; i < revEntityInfoAlbum._revEntityChildrenList.length; i++) {
                    let revEntityPicFile = revEntityInfoAlbum._revEntityChildrenList[i];

                    let revRemotePath = window.revGetMetadataValue(revEntityPicFile._revEntityMetadataList, "rev_remote_file_name");
                    revRemotePath = REV_UPLOAD_FILES_DIR_PATH + "/" + revRemotePath;

                    let revImageItemId = "revImageItemId_" + window.revGenUniqueId();

                    let revImg = `<img id="${revImageItemId}" class="revAccordionImage" src="${revRemotePath}" onerror="null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;
                    let revAccordListItem = `<li>${revImg}</li>`;

                    revImagesListArr.push(revAccordListItem);
                }

                let revAccordionView_Id = "revAccordionView_Id_" + window.revGenUniqueId();

                window.revSetInterval(revAccordionView_Id, () => {
                    $(".accordion").accordion(revEntityInfoAlbum._revEntityChildrenList.length);
                });

                revAccordionView = `<div id="${revAccordionView_Id}" class="accordion revFlexWrapper revAccordionWrapper">${revImagesListArr.join("")}</div>`;
            }
        }

        window.revSetInterval(revEntityActivityContentArea_Id, async () => {
            /** REV START PROFILE RELATIONS */
            let revProfileRelationsView = "";

            try {
                let revPageViewProfileConnections = await window.revGetLoadedPageView("revPageViewProfileConnections", revVarArgs);

                if (revPageViewProfileConnections) {
                    revProfileRelationsView = `<div class="revFlexContainer revProfileRelationsViewContainer">${revPageViewProfileConnections}</div>`;
                }
            } catch (error) {
                console.log("ERR -> revPageViewActivityWidget.js -> revPageViewProfileConnections -> " + error);
            }
            /** REV END PROFILE RELATIONS */

            /** REV START PROFILE MINT MESSAGES ALLERTS */
            let revMintMessagesNoticiasView = "";

            try {
                let revPageViewMintMessagesInlineMessages = await window.revGetLoadedPageView("revPageViewMintMessagesInlineMessages", revVarArgs);

                if (revPageViewMintMessagesInlineMessages) {
                    revMintMessagesNoticiasView = `<div class="revFlexContainer revPageViewMintMessagesInlineMessagesContainer">${revPageViewMintMessagesInlineMessages}</div>`;
                }
            } catch (error) {
                console.log("ERR -> revPageViewActivityWidget.js -> revPageViewMintMessagesInlineMessages -> " + error);
            }
            /** REV START PROFILE MINT MESSAGES ALLERTS */

            let revTranslateTab_Id = "revTranslateTab_Id_" + window.revGenUniqueId();
            let revTranslateInput_Id = "revTranslateInput_Id_" + window.revGenUniqueId();

            window.revSetInterval(revTranslateTab_Id, () => {
                document.getElementById(revTranslateTab_Id).addEventListener("click", async (event) => {
                    let revPassVarArgs = window.revCloneJsObject(revVarArgs);

                    revPassVarArgs["revPublisherFormHintText"] = "youR TRAnslATioN suGgesTioN";

                    revPassVarArgs["revCancelPublisherFormCallback"] = () => {
                        document.getElementById(revTranslateInput_Id).innerHTML = "";
                    };

                    revPassVarArgs["revFilesSelectedCallback"] = (revFiles) => {
                        console.log("revFiles : " + JSON.stringify(revFiles));
                    };

                    revPassVarArgs["revPublisherPublishCallback"] = (revPassParams) => {
                        console.log(">>> " + JSON.stringify(revPassParams));
                    };

                    let revCommentFormView = await window.revGetForm("revPublisherForm", revPassVarArgs);
                    document.getElementById(revTranslateInput_Id).innerHTML = revCommentFormView;
                });
            });

            /** REV START FAMILY POSTS */
            let revRecentFamilyPostsViewContainer = "";

            if (revLoggedInEntityGUID == revVarArgs._remoteRevEntityGUID) {
                let revFamilyKiwiData;

                try {
                    let revURL = `${window.REV_SITE_BASE_PATH}/rev_api?rev_logged_in_entity_guid=${revLoggedInEntityGUID}&revPluginHookContextsRemoteArr=revHookRemoteHandler_readFamilyKiwi`;

                    revFamilyKiwiData = await window.revGetServerData_JSON_Async(revURL);
                } catch (error) {
                    console.log("ERR -> revPageViewTimelineWidget.js -> !revData" + error);
                }

                let revFamilyKiwiArr = revFamilyKiwiData.revFamilyKiwiArr;
                let revEntityPublishersArr = revFamilyKiwiData.revEntityPublishersArr;

                let revTranslationsPublishedListingArr = [];

                for (let i = 0; i < revFamilyKiwiArr.length; i++) {
                    let revCurrFamilyKiwi = revFamilyKiwiArr[i];

                    let revCurrFamilyKiwiOverrideView = await window.revGetLoadedOverrideView("rev_family_kiwi", {
                        "revEntity": revCurrFamilyKiwi,
                        "revEntityPublishersArr": [window.revGetRevEntity_FROM_ARR_BY_GUID(revEntityPublishersArr, revCurrFamilyKiwi._revEntityOwnerGUID)],
                    });

                    revTranslationsPublishedListingArr.push(revCurrFamilyKiwiOverrideView);
                }

                let revAllMintMessagesTab_Id = "revAllMintMessagesTab_Id_" + window.revGenUniqueId();

                /** REV START ABOUT MINTS HELP TAB */
                let revAboutMintsTaggedHelpTab_Id = "revAboutMintsTaggedHelpTab_Id_" + window.revGenUniqueId();

                window.revSetInterval(revAboutMintsTaggedHelpTab_Id, () => {
                    document.getElementById(revAboutMintsTaggedHelpTab_Id).addEventListener("click", async (event) => {
                        let revListingViewHelpTagTopics = await window.revGetLoadedPageView("revListingViewHelpTagTopics", { "revTagsArr": ["mint_conversations"], "revEntitySubTypesArr": ["rev_question"], "revServiceDescription": "miNT coNvERsATioNs" });
                        window.revDrawMainContentArea({ "revData": revVarArgs, "revLoadedPageView": revListingViewHelpTagTopics, "revFloatingOptionsMenuName": "123" });
                    });
                });
                /** REV END ABOUT MINTS HELP TAB */

                let revFormViewComposeFamilyKiwi = await revGetForm("revFormViewComposeFamilyKiwi", revVarArgs);

                revRecentFamilyPostsViewContainer = `
                    <div class="revFlexContainer revRecentFamilyPostsContainer">
                        <div class="revFlexWrapper revRecentFamilyPostsPublishersWrapper">
                            <div id="${revAllMintMessagesTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revRecentFamilyPostsPublisherFormHeaderTabWrapper">+22 rEcENTly shAred with FAmiLy</div>
                            <div id="${revAboutMintsTaggedHelpTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revAbtFamilyFormTab">FAmiLy<i class="fas fa-question"></i></div>
                            <div class="revSmall-H-Line"></div>
                        </div>
                        ${revFormViewComposeFamilyKiwi}
                        <div class="revFlexContainer revRecentFamilyPostsProfileActivityContainer">${revTranslationsPublishedListingArr.join("")}</div>
                    </div>
                `;
                /** REV END FAMILY POSTS */
            }

            try {
                let revTimelineView = "";

                let revPageViewTimeline_Ret = await window.revGetLoadedPageViewAreaContainer("revPageViewTimeline", revVarArgs);

                if (revPageViewTimeline_Ret) {
                    revTimelineView = revPageViewTimeline_Ret;
                }

                document.getElementById(revEntityActivityContentArea_Id).innerHTML = `
                <div class="revFlexContainer">
                    <div class="revFlexContainer revActivityViewKiwiForm">${revKiwiForm}</div>
                    ${revProfileRelationsView}
                    ${revMintMessagesNoticiasView}
                    ${revRecentFamilyPostsViewContainer}
                    ${revAccordionView}
                    ${revTimelineView}
                </div>`;
            } catch (error) {
                console.log("ERR -> revPageViewActivityWidget.js -> revPageViewTimeline_Ret -> " + error);
            }
        });

        let revPageAreaHeaderNewSubTypeCallback = async (revVarArgs) => {
            let revSpaceTypeForm = await window.revGetForm("revSpaceType", null);
            document.getElementById("revPageHome").innerHTML = revSpaceTypeForm;
        };

        let revPageViewPageNavHeader = await window.revGetLoadedPageView("revPageViewPageNavHeader", { "revDafaultPagePagination": true, "revDataEntityGUID": revVarArgs._remoteRevEntityGUID, "revVarArgsData": revVarArgs, "revPageAreaHeaderNewSubTypeCallback": revPageAreaHeaderNewSubTypeCallback });

        return `
        <div class="revFlexContainer">
            <div class="revFlexContainer revPageViewPageNavHeader">
                ${revPageViewPageNavHeader}
            </div>
            <div class="revFlexWrapper">${revUserOptionsMenuArea}</div>
            <div id="${revEntityActivityContentArea_Id}" class="revFlexContainer"></div>
        </div>
        `;
    }

    let revLogInForm = await window.revGetForm("revLogIn", null);

    return revLogInForm;
};

module.exports.revPageViewWidget = revPageViewWidget;
