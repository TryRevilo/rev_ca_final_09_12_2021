var revFormViewWidget = async (revVarArgs) => {
    let revCountry = "ke";
    let revRegion = "";
    let revParentLang = "sw";

    let revAddNewLangArea = async () => {
        let revLangNameInputText_Id = "revLangNameInputText_Id_" + window.revGenUniqueId();

        let revLangNameInputText = window.revInputText_Flat({
            "revId": revLangNameInputText_Id,
            "revInputTextHeader": false,
            "revBorderStyle": "revAllBordersInput",
            "revPlaceholderText": "LaNGuagE nAme",
        });

        let revLangCodeInputText_Id = "revLangCodeInputText_Id_" + window.revGenUniqueId();

        let revLangCodeInputText = window.revInputText_Flat({
            "revId": revLangCodeInputText_Id,
            "revInputTextHeader": false,
            "revBorderStyle": "revNoLeftBorderBordersInput",
            "revPlaceholderText": "coDE",
        });

        let revSaveNewLangTab_Id = "revSaveNewLangTab_Id_" + window.revGenUniqueId();

        let revFormSubmitTab = window.revSubmitTabCurvedPointerRight({
            "revId": revSaveNewLangTab_Id,
            "revTitle": "sAvE nEw LAnGuaGE",
            "revSubmitCallback": async () => {
                let revLangCode = window.revGetTextInputVal(revLangCodeInputText_Id);

                if (window.revIsEmptyVar(revLangCode)) {
                    return;
                }

                let revLangName = window.revGetTextInputVal(revLangNameInputText_Id);

                if (window.revIsEmptyVar(revLangName)) {
                    return;
                }

                if (window.revIsEmptyVar(revCountry)) {
                    return;
                }

                if (window.revIsEmptyVar(revRegion)) {
                    revRegion = revCountry;
                }

                if (window.revIsEmptyVar(revParentLang)) {
                    revParentLang = revLangName;
                }

                let revURL = window.REV_SITE_BASE_PATH + "/rev_base_api_post?revPluginHookContextsRemoteArr=revPluginHookRemoteEnvironment_CreateNewLangCode";

                let revLangDetails = {
                    "revLangCode": revLangCode,
                    "revLangName": revLangName,
                    "revCountry": revCountry,
                    "revRegion": revRegion,
                    "revParentLang": revParentLang,
                };

                window.revPostServerData(
                    revURL,
                    {
                        "revLoggedInEntityGUID": window.REV_LOGGED_IN_ENTITY_GUID,
                        "revLangDetails": revLangDetails,
                    },
                    async (revRetData) => {
                        console.log("revRetData : " + JSON.stringify(revRetData));
                    }
                );
            },
        });

        let revContentCalcelTab_Id = "revContentCalcelTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revContentCalcelTab_Id, () => {
            document.getElementById(revContentCalcelTab_Id).addEventListener("click", (event) => {
                revVarArgs.revCancelCallBack();
            });
        });

        return `
        <div class="revFlexContainer">
            <div class="revSmalllBold revAddNewLangHeaderTxt">ADd nEw LAnGuage</div>
            <div class="revFlexWrapper revAddNewLangInputWrapper">
                <div class="revLangNameInputText">${revLangNameInputText}</div>
                <div class="revLangCodeInputText">${revLangCodeInputText}</div>
                <div class="revFlexWrapper revAddNewLangParentSelectorWrapper">
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">pArENT LaNguaGE</div>
                    <div class="revAddNewLangParentSelector">${await window.revDropdownMenu({})}</div>
                </div>
                <div class="revFlexWrapper revAddNewLangParentSelectorWrapper">
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal">couNtRy</div>
                    <div class="revAddNewLangParentSelector">${await window.revDropdownMenu({})}</div>
                </div>
            </div>
            <div class="revFlexWrapper revAddNewLangFooterWrapper">
                ${revFormSubmitTab}
                <div id="${revContentCalcelTab_Id}" class="revTabLink revSmalllBoldBlue revContentCalcelTab">cANcEL</div>
            </div>
        </div>
        `;
    };

    return await revAddNewLangArea();
};

module.exports.revFormViewWidget = revFormViewWidget;
