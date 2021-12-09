var revMenuItemWidget = (revVarArgs) => {
    let revConnectionRelsArr = [];

    if (revVarArgs.revConnRels) {
        revConnectionRelsArr = revConnectionRelsArr.concat(revVarArgs.revConnRels);
    }

    let revRelConnectionTab_Id = "revRelConnectionTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revRelConnectionTab_Id, () => {
        document.getElementById(revRelConnectionTab_Id).addEventListener("click", async (event) => {
            let revRelUpdateCallBackFunc = (revParamsData) => {
                revVarArgs = revParamsData;

                if (revVarArgs.revConnRels && revVarArgs.revConnRels.length > 0) {
                    document.getElementById(revRelConnectionTab_Id).innerHTML = `<div class="revFontSizeMedium revFilterOptionIcon"><i class="fas fa-user-minus"></i></div>`;
                } else {
                    document.getElementById(revRelConnectionTab_Id).innerHTML = `<div class="revFontSizeMedium revFilterOptionIcon"><i class="fas fa-user-plus"></i></div>`;
                }
            };

            revVarArgs["revRelUpdateCallBackFunc"] = revRelUpdateCallBackFunc;

            let revCreateUserConnectionsForm = await window.revGetForm("revCreateUserConnectionsForm", revVarArgs);

            window.revToggleSwitchArea(`
            <div class="revFlexContainer revCreateUserConnectionsFormContainer">
                <div class="revFontSizeNormalHeader revPublisherSettingsHeader">coNNEcT</div>
                ${revCreateUserConnectionsForm}
            </div>
            `);
        });
    });

    let revConnTab = `<div class="revFontSizeMedium revFilterOptionIcon"><i class="fas fa-user-plus"></i></div>`;

    if (revConnectionRelsArr.length > 0) {
        revConnTab = `<div class="revFontSizeMedium revFilterOptionIcon"><i class="fas fa-user-minus"></i></div>`;
    }

    return `
        <div id="${revRelConnectionTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFlexWrapper revFilterOptionWrapper">
            ${revConnTab}
        </div>
    `;
};

module.exports.revMenuItemWidget = revMenuItemWidget;
