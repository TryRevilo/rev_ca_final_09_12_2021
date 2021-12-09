var revFormViewWidget = async (revVarArgs) => {
    let revSearchInputCallBack = revVarArgs.revSearchInputCallBack;

    let revSearchInputStyle = "revInputTextNoBorder";

    if (revVarArgs.revSearchInputStyle) {
        revSearchInputStyle = revVarArgs.revSearchInputStyle;
    }

    /** REV START SEARCH INPUT */
    let revSearchInputText_Id = "revSearchInputText_Id_" + window.revGenUniqueId();

    let revClearSearchInputArea = () => {
        document.getElementById(revSearchInputText_Id).value = "";
    };

    window.revSetInterval(revSearchInputText_Id, () => {
        document.getElementById(revSearchInputText_Id).addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                revSearchInputCallBack(window.revGetTextInputVal(revSearchInputText_Id));

                revClearSearchInputArea();
            }
        });
    });

    if (revVarArgs.revSearchButtonTab_id) {
        let revSearchButtonTab_id = revVarArgs.revSearchButtonTab_id;

        window.revSetInterval(revSearchButtonTab_id, () => {
            document.getElementById(revSearchButtonTab_id).addEventListener("click", (event) => {
                revSearchInputCallBack(window.revGetTextInputVal(revSearchInputText_Id));
                revClearSearchInputArea();
            });
        });
    }

    let revSearchInputText = window.revInputText_Flat({
        "revId": revSearchInputText_Id,
        "revInputTextHeader": false,
        "revBorderStyle": revSearchInputStyle,
        "revPlaceholderText": "sEARcH",
    });
    /** REV END  SEARCH INPUT */

    return revSearchInputText;
};

module.exports.revFormViewWidget = revFormViewWidget;
