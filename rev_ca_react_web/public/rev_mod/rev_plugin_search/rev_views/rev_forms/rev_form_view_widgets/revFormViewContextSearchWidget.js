var revFormViewWidget = async (revVarArgs) => {
    let revContextSearchInput_Id = "revContextSearchInput_Id_" + window.revGenUniqueId();

    let revAddNewEMailInputText = window.revInputText_Flat({
        "revId": revContextSearchInput_Id,
        "revInputTextHeader": false,
        "revBorderStyle": "revAllBordersInput",
        "revPlaceholderText": "sEARcH @Oliver . . .",
    });

    let revContextSearchTab_Id = "revContextSearchTab_Id_" + window.revGenUniqueId();

    let revFormSubmitTab = window.revSubmitTabCurvedPointerRight({
        "revId": revContextSearchTab_Id,
        "revTitle": "FiND",
        "revSubmitCallback": () => {
            console.log("SEARCH . . .");
        },
    });

    let revHideSwitchAreaTab = "revHideSwitchAreaTab_" + window.revGenUniqueId();

    window.revSetInterval(revHideSwitchAreaTab, () => {
        document.getElementById(revHideSwitchAreaTab).addEventListener("click", (event) => {
            window.revToggleSwitchArea(null);
        });
    });

    return `
        <div class="revFlexContainer revContextSearchContainer">
            ${revAddNewEMailInputText}
            <div class="revFlexWrapper revContextSearchFooterWrapper">
                ${revFormSubmitTab}
                <div id="${revHideSwitchAreaTab}" class="revTabLink revFontSiteBlueTxtColor revHideSwitchAreaTab">cancEL</div>
            </div>
        </div>
    `;
};

module.exports.revFormViewWidget = revFormViewWidget;
