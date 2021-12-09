var revFormViewWidget = async (revVarArgs) => {
    let revGetTagsForm = () => {
        let revAddedTagsInputsArr = revVarArgs;

        let revAddedTagsInput_Id = "revAddedTagsInput_Id_" + window.revGenUniqueId();

        let revLoadTagsInputIntoViews = (revTagsArr) => {
            let revTagsTabsArr = [];

            for (let i = 0; i < revTagsArr.length; i++) {
                let revTagInputItem_Id = i + "_revTagInputItem_Id_" + window.revGenUniqueId();
                let revTagInputItemClear_Id = i + "_revTagInputItemClear_Id_" + window.revGenUniqueId();

                window.revSetInterval(revTagInputItemClear_Id, () => {
                    document.getElementById(revTagInputItemClear_Id).addEventListener("click", (event) => {
                        window.revRemoveArrElement(revTagsArr, revTagsArr[i]);

                        document.getElementById(revTagInputItem_Id).remove();

                        revLoadTagsInputIntoViews(revTagsArr);
                    });
                });

                revTagsTabsArr.push(`
                    <div id="${revTagInputItem_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeSmall revFlexWrapper revAddedTagInputWrapper">
                        <div>#${revTagsArr[i]}</div>
                        <div id="${revTagInputItemClear_Id}" class="revFlexWrapper revDelTagWrapper"><i class="fas fa-times"></i></div>
                    </div>
                    `);
            }

            let revDefAddedTagsView = `<div class="revFontSiteGreyTxtColor revFontSizeNormal revDefAddedTagsViewNull"><span class="revFontSizeLarge">0</span> tAGs ADDED</div>`;

            if (revTagsTabsArr.length > 0) {
                revDefAddedTagsView = revTagsTabsArr.join("");
            }

            window.revSetInterval(revAddedTagsInput_Id, () => {
                document.getElementById(revAddedTagsInput_Id).innerHTML = revDefAddedTagsView;
            });

            return revTagsArr;
        };

        revLoadTagsInputIntoViews(revAddedTagsInputsArr);

        let revTagInput_Id = "revTagInput_Id_" + window.revGenUniqueId();

        window.revSetInterval(revTagInput_Id, () => {
            // capture keyboard input
            document.onkeypress = function (e) {
                // check for spacebar press
                if (e.keyCode == 32) {
                    // check if an input is currently in focus
                    if (document.activeElement.id.toLowerCase().localeCompare(revTagInput_Id.toLowerCase()) == 0) {
                        // prevent default spacebar event (scrolling to bottom)
                        e.preventDefault();

                        // do stuff you want ...

                        let revInputVal = window.revGetTextInputVal(revTagInput_Id);

                        if (!window.revStringEmpty(revInputVal) && !window.revArrIncludesElement(revAddedTagsInputsArr, revInputVal)) {
                            let revInputValArr = revInputVal.split(" ");

                            let revArr = [];

                            for (let i = 0; i < revInputValArr.length; i++) {
                                revArr = revArr.concat(revInputValArr[i].split(","));
                            }

                            for (let i = 0; i < revArr.length; i++) {
                                if (window.revStringEmpty(revArr[i]) || revArr[i].split("").length < 2) {
                                    continue;
                                }

                                revAddedTagsInputsArr.push(revArr[i]);
                            }

                            revLoadTagsInputIntoViews(revAddedTagsInputsArr);
                        }

                        document.getElementById(revTagInput_Id).value = "";
                    }
                }
            };
        });

        let revAddNewTagInputText = window.revInputText_Flat({
            "revId": revTagInput_Id,
            "revInputTextHeader": false,
            "revBorderStyle": "revAllBordersInput",
            "revPlaceholderText": "#",
        });

        let revPublisherFormOptionalFooterAreaContainerHideTab_Id = "revPublisherFormOptionalFooterAreaContainerHideTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revPublisherFormOptionalFooterAreaContainerHideTab_Id, () => {
            document.getElementById(revPublisherFormOptionalFooterAreaContainerHideTab_Id).addEventListener("click", (event) => {
                document.getElementById(revPublisherFormOptionalFooterAreaContainer_Id).innerHTML = "";
            });
        });

        let revClearTagsTab_Id = "revClearTagsTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revClearTagsTab_Id, () => {
            document.getElementById(revClearTagsTab_Id).addEventListener("click", (event) => {
                revAddedTagsInputsArr = [];
                revLoadTagsInputIntoViews(revAddedTagsInputsArr);
            });
        });

        let revTagsForm = `
        <div class="revFlexContainer">
            <div id="${revAddedTagsInput_Id}" class="revFlexWrapper revFlexWrapperScroll revAddedTagsWrapper"></div>
            <div class="revFlexWrapper revAddNewTagInputFormWrapper">
                <div class="revAddNewTagInputTextWrapper">${revAddNewTagInputText}</div>
                <div class="revSmall-H-Line"></div>
                <div id="${revClearTagsTab_Id}" class="revTabLink revFontSiteBlueTxtColor">CLEAR</div>
            </div>
        </div>
        `;

        return revTagsForm;
    };

    return revGetTagsForm();
};

module.exports.revFormViewWidget = revFormViewWidget;
