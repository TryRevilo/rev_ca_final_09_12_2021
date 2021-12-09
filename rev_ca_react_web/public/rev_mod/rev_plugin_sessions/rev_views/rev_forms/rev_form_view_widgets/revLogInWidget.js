var revFormViewWidget = async (revVarArgs) => {
    window.REV_LOGGED_IN_ENTITY = null;
    window.REV_LOGGED_IN_ENTITY_GUID = -1;

    let revLangVarArgs = {
        "revLangCode": window.REV_LANG,
        "rev_plugin_name_id": "rev_plugin_sessions",
        "revLangViewType": "rev_form",
        "revViewNameId": "revLogIn",
        "rev_log_in": "LoG iN",
        "rev_register": "siGN up",
        "rev_recovery": "REcovERy",
    };

    let revLogInCallback = async () => {
        let revUserName = document.getElementById(revLogInUserNameInput_Id).value;

        try {
            let revPath = window.REV_SITE_BASE_PATH + "/rev_api?" + "rev_entity_unique_id=" + revUserName + "&revPluginHookContextsRemoteArr=revHookRemoteHandlerLogIn,revHookRemoteSendLoggedInPresenceToConnections,revHookRemoteHandlerProfile,revHookRemoteHandlerProfileStats";

            let revData = await window.revGetServerData_JSON_Async(revPath);

            if (revData) {
                window.REV_LOGGED_IN_ENTITY = revData;
                window.REV_LOGGED_IN_ENTITY_GUID = revData._remoteRevEntityGUID;

                await window.revLoadModules("revPluginModuleUserProfileFunctions");

                window.revLoadModules("revPluginModuleSessions", (revScriptModule) => {
                    window.revPluginModuleSessions.revAddExploredEntity(revData, async (revResStatus) => {
                        let revLoadedPageView = await revGetLoadedPageViewAreaContainer("revPageViewCore", revData);
                        window.revDrawMainContentArea({ "revData": revData, "revLoadedPageView": null, "revFloatingOptionsMenuName": "rev_floating_menu_area_user_profile_activity_page" });

                        document.getElementById("revRoot").innerHTML = revLoadedPageView;

                        // Init WebRTC
                        window.revWebRTCLogIn(revData);

                        window.revSetInterval("revPageRightSectionContainerId", () => {
                            let revNoticiasPopUpContainer = window.revGetNoticiasPopUpContainer(`
                            <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revLoggedInSuccessWrapper"><i class="fas fa-check"></i> LoGGED IN succEssFuLLy . . .</div>
                        `);
                            window.revTempShowElement(revNoticiasPopUpContainer, "revPageRightSectionContainerId", 7000);
                        });
                    });
                });
            }
        } catch (error) {
            console.log("LOG IN ERR -> " + error);
        }
    };

    /** REV START SIGN UP */
    let revCreateNewAccount_Id = "revCreateNewAccount_Id_" + window.revGenUniqueId();

    window.revSetInterval(revCreateNewAccount_Id, () => {
        document.getElementById(revCreateNewAccount_Id).addEventListener("click", async function (event) {
            let revNewAccount = await window.revGetForm("revNewAccount", null);
            document.getElementById("revLoggedOutContainerId").innerHTML = revNewAccount;
        });
    });
    /** REV END SIGN UP */

    /** REV START LOG IN TXT INPUT */
    let revLogInUserNameInput_Id = "revLogInUserNameInput_Id_" + window.revGenUniqueId();

    window.revSetInterval(revLogInUserNameInput_Id, () => {
        document.getElementById(revLogInUserNameInput_Id).focus();

        document.getElementById(revLogInUserNameInput_Id).addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                revLogInCallback();
            }
        });
    });
    /** REV END LOG IN TXT INPUT */

    /** START REV LOG IN TAB */
    let revSubmitItemTab_Id = "revSubmitItemTab_Id_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revSubmitTabCurvedPointerRight({
        "revId": revSubmitItemTab_Id,
        "revTitle": window.revGetLangPhraseTrans(revLangVarArgs, "rev_log_in", 7),
        "revSubmitCallback": () => {
            console.log("coNNEcT . . .");
            revLogInCallback();
        },
    });
    /** END REV LOG IN TAB */

    let revLostPassowrd_Id = "revLostPassowrd_Id_" + window.revGenUniqueId();

    return `
        <div class="revFlexWrapper revLogInInputAreaWrapper">
            <div class="revFlexWrapper revLogInFormInputDividerWrapper">
                <div class="revSmall-H-Line"></div>
            </div>
            <div class="revLogInInputWrapper">
                <input class="revFontSiteGreyTxtColor revFontSizeNormal revNoBorderInput" type="text" id="${revLogInUserNameInput_Id}" name="fname" placeholder="pHoNE / EmAiL">
            </div>
            <div class="revLogInInputWrapper">
                <input class="revFontSiteGreyTxtColor revFontSizeNormal revNoBorderInput" type="text" id="fname" name="fname" placeholder=" pAsswoRD">
            </div>
        </div>
        <div class="revFlexWrapper revLoginFooterWrapper">
            ${revFormSubmitTab}
            <div class="revFlexWrapper revLoggedOutFooterAreaWrapper">
                <div id="${revCreateNewAccount_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">${window.revGetLangPhraseTrans(revLangVarArgs, "rev_register", 7)}</div>
                <div class="revFlexWrapper revFooterTabsDividerWrapper">
                    <div class="revSmall-H-Line"></div>
                </div>
                <div id="${revLostPassowrd_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revLostPassowrd">${window.revGetLangPhraseTrans(revLangVarArgs, "rev_recovery", 7)}</div>
                <div class="revFlexWrapper revFooterTabsDividerWrapper">
                    <div class="revSmall-H-Line"></div>
                </div>
                <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">TERms</div>
            </div>
        </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
