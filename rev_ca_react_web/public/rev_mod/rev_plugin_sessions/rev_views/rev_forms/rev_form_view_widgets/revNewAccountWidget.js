var revFormViewWidget = async (revVarArgs) => {
    /** REV START UNIQUE ID */
    let revUserUniqueInput_Id = "revUserUniqueInput_Id_" + window.revGenUniqueId();

    window.revSetInterval(revUserUniqueInput_Id, () => {
        document.getElementById(revUserUniqueInput_Id).focus();
    });

    let revUserUniqueInput = window.revInputText_Flat({
        "revId": revUserUniqueInput_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "pHoNE #",
    });
    /** REV END UNIQUE ID */

    /** REV START FULL NAMES */
    let revEntityFullNamesInput_Id = "revEntityFullNamesInput_Id_" + window.revGenUniqueId();

    let revRealFullNamesInput = window.revInputText_Flat({
        "revId": revEntityFullNamesInput_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "REAL Full NAmEs",
    });
    /** REV END FULL NAMES */

    /** REV START PASSWORD */
    let revPasswordInputId = "revPasswordInputId_" + window.revGenUniqueId();

    let revPasswordInput = window.revInputText_Flat({
        "revId": revPasswordInputId,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "Password ***",
    });
    /** REV END PASSWORD */

    /** REV START CONFIRM PASSWORD */
    let revConfirmPasswordInput_Id = "revConfirmPasswordInput_Id_" + window.revGenUniqueId();

    let revConfirmPasswordInput = window.revInputText_Flat({
        "revId": revConfirmPasswordInput_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "coNFiRm pAsswoRD",
    });
    /** REV END CONFIRM PASSWORD */

    /** START REV LOG IN TAB */
    let revSignUpCallback = () => {
        let revUserUniqueInputVal = window.revGetTextInputVal(revUserUniqueInput_Id);
        let revEntityFullNamesInputVal = window.revGetTextInputVal(revEntityFullNamesInput_Id);

        let revJSONDataArr = [
            { "_revMetadataName": "rev_entity_full_names_value", "_metadataValue": revEntityFullNamesInputVal },
            { "_revMetadataName": "rev_phone_number", "_metadataValue": revUserUniqueInputVal },
        ];

        let revPath = window.REV_BASE_URL + "/rev_api/sync_new_users";

        window.revPostServerData(revPath, { filter: revJSONDataArr }, async (revRetData) => {
            let revLogIn = await window.revGetForm("revConfirmAccount", revRetData.filter);
            document.getElementById("revLoggedOutContainerId").innerHTML = revLogIn;
        });
    };

    let revSubmitItemTab_Id = "revSubmitItemTab_Id_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revSubmitTabCurvedPointerRight({
        "revId": revSubmitItemTab_Id,
        "revTitle": "siGN up",
        "revSubmitCallback": () => {
            console.log("coNNEcT . . .");
            revSignUpCallback();
        },
    });
    /** END REV REG TAB */

    /** REV START LOG IN TAB */
    let revLoginTab_Id = "revLoginTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revLoginTab_Id, () => {
        document.getElementById(revLoginTab_Id).addEventListener("click", async function (event) {
            let revLogIn = await window.revGetForm("revLogIn", null);
            document.getElementById("revLoggedOutContainerId").innerHTML = revLogIn;
        });
    });
    /** REV END LOG IN TAB */

    return `
    <div class="revFlexContainer revRegNewUserContainer">
        <div class="revFlexContainer">
            <div class="revFlexWrapper revSignUpInputAreaWrapper">
                <div class="revSmall-H-Line"></div>
                <div class="revFlexWrapper revSignUpInputWrapper">${revUserUniqueInput}</div>
                <div class="revSmall-H-Line"></div>
            </div>

            <div class="revFlexWrapper revSignUpInputAreaWrapper">
                <div class="revSmall-H-Line"></div>
                <div class="revFlexWrapper revSignUpInputWrapper">${revRealFullNamesInput}</div>
                <div class="revSmall-H-Line"></div>
            </div>

            <div class="revFlexWrapper revSignUpInputAreaWrapper">
                <div class="revSmall-H-Line"></div>
                <div class="revFlexWrapper revSignUpInputWrapper">${revPasswordInput}</div>
                <div class="revSmall-H-Line"></div>
            </div>

            <div class="revFlexWrapper revSignUpInputAreaWrapper">
                <div class="revSmall-H-Line"></div>
                <div class="revFlexWrapper revSignUpInputWrapper">${revConfirmPasswordInput}</div>
                <div class="revSmall-H-Line"></div>
            </div>
        </div>
        <div class="revFlexWrapper revLoginFooterWrapper">
            ${revFormSubmitTab}
            <div id="${revLoginTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revCreateNewAccount">LoG iN</div>
        </div>
    </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
