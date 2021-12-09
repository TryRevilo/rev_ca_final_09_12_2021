var revFormViewWidget = async (revVarArgs) => {
    /** REV START CONFIRMATION CODE */
    let revConfirmationCodeInput_Id = "revConfirmationCodeInput_Id_" + window.revGenUniqueId();

    let revConfirmationCodeInput = window.revInputText_Flat({
        "revId": revConfirmationCodeInput_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revNoBorderInput",
        "revPlaceholderText": "coDE",
    });
    /** REV END CONFIRMATION CODE */

    let revConfirmCodeCallback = () => {
        let revConfirmationCode = window.revGetTextInputVal(revConfirmationCodeInput_Id);

        let revJSONData = { "revConfirmCode": revConfirmationCode, "revShadowUserEntityGUID": revVarArgs.revShadowUserEntityGUID };

        let revPath = window.REV_BASE_URL + "/rev_api/confirm_account";

        window.revPostServerData(revPath, { filter: revJSONData }, (revRetData) => {
            if (revRetData) {
                window.REV_LOGGED_IN_ENTITY = revRetData;
                window.REV_LOGGED_IN_ENTITY_GUID = revRetData._remoteRevEntityGUID;

                window.revLoadModules("revPluginModuleSessions", (revScriptModule) => {
                    window.revPluginModuleSessions.revAddExploredEntity(revRetData, async (revResStatus) => {
                        revGetLoadedPageViewAreaContainer("revPageViewCore", revRetData, (_revView) => {
                            document.getElementById("revRoot").innerHTML = _revView;
                        });
                    });
                });
            }
        });
    };

    let revLoginTabId = "revLoginTabId_" + window.revGenUniqueId();

    window.revSetInterval(revLoginTabId, () => {
        document.getElementById(revLoginTabId).addEventListener("click", async function (event) {
            let revNewAccount = await window.revGetForm("revLogIn", null);
            document.getElementById("revLoggedOutContainerId").innerHTML = revNewAccount;
        });
    });

    window.revSetInterval(revConfirmationCodeInput_Id, () => {
        document.getElementById(revConfirmationCodeInput_Id).addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                revConfirmCodeCallback();
            }
        });
    });

    /** START REV LOG IN TAB */
    let revSubmitItemTab_Id = "revSubmitItemTab_Id_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revSubmitTabCurvedPointerRight({
        "revId": revSubmitItemTab_Id,
        "revTitle": "coNFiRm AccouNT",
        "revSubmitCallback": () => {
            revConfirmCodeCallback();
        },
    });
    /** END REV LOG IN TAB */

    return `
        <div class="revFlexContainer">
            <div class="revConfirmAccountInputWrapper">${revConfirmationCodeInput}</div>
        </div>
        <div class="revFlexWrapper revLoginFooterWrapper">
            ${revFormSubmitTab}
            <div id="${revLoginTabId}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revCreateNewAccount">LoG iN</div>
        </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
