var revPageViewWidget = async (revVarArgs) => {
    if (!revVarArgs || !revVarArgs._revInfoEntity || !revVarArgs._revInfoEntity._revEntityMetadataList || revVarArgs._revInfoEntity._revEntityMetadataList.length < 1) {
        return;
    }

    let revEntityInfo = revVarArgs._revInfoEntity;

    let revIMBatch = () => {
        let revMsgSrc = `<i class="fas fa-download"></i>`;

        let revMsgSubject = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_name");
        revMsgSubject = window.revGetRawHTML(revMsgSubject);

        let revMsgBody = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_desc_val");
        revMsgBody = window.revGetRawHTML(revMsgBody);
        let revMsgBodyFragment = window.revTruncateString(revMsgBody, 105);

        let revMsgBody_HTML = window.revGetMetadataValue(revEntityInfo._revEntityMetadataList, "rev_entity_desc_val_html");

        if (!revMsgSubject && !revMsgBody) {
            return;
        }

        revMsgBody_HTML = `<div class="revFlexContainer revMsgObjectBodyHTMLContainer">${revMsgBody_HTML}</div>`;

        let revMessageDetailsStyle = "revMessageDetailsStyle";

        if (Number(revVarArgs._revEntityOwnerGUID) == Number(window.REV_LOGGED_IN_ENTITY._remoteRevEntityGUID)) {
            revMsgSrc = `<i class="fas fa-upload"></i>`;
            revMessageDetailsStyle = "revMessageDetailsOutStyle";
        }

        let revMsg_Id = "revMsg_Id_" + window.revGenUniqueId();
        let revMsgBody_Id = "revMsgBody_Id_" + window.revGenUniqueId();
        let revMsgReadMoreOptions_Id = "revMsgReadMoreOptions_Id_" + window.revGenUniqueId();

        let revMsgDisplay = ``;
        let revMsgReadMoreOptionsView = `<div id="${revMsgReadMoreOptions_Id}"></div>`;

        let revGetReadMoreMsgTab = () => {
            let revMsgReadMoreTab_Id = "revMsgReadMoreTab_Id_" + window.revGenUniqueId();

            let revMsgReadMoreOptions = `<div id="${revMsgReadMoreTab_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revMoreMsgObjectOptionsTab">read more</div>`;

            document.getElementById(revMsgReadMoreOptions_Id).innerHTML = revMsgReadMoreOptions;

            window.revSetInterval(revMsgReadMoreTab_Id, () => {
                document.getElementById(revMsgReadMoreTab_Id).addEventListener("click", (event) => {
                    document.getElementById(revMsgReadMoreOptions_Id).innerHTML = revGetHideMsgTab();

                    let revPretty_Id = "revPretty_Id_" + window.revGenUniqueId();

                    window.revSetInterval(revPretty_Id, () => {
                        prettyPrint();
                    });

                    let revFormattedMsgBody_HTML = revMsgBody_HTML.replaceAll(`<pre class="ql-syntax" spellcheck="false">`, `<pre id="${revPretty_Id}" class="ql-syntax prettyprint" spellcheck="false">`);

                    if (!revFormattedMsgBody_HTML) {
                        return;
                    }

                    document.getElementById(revMsgBody_Id).innerHTML = revFormattedMsgBody_HTML;
                });
            });

            return revMsgReadMoreOptions;
        };

        let revGetHideMsgTab = () => {
            let revMsgHide_Id = "revMsgHide_Id_" + window.revGenUniqueId();

            window.revSetInterval(revMsgHide_Id, () => {
                document.getElementById(revMsgHide_Id).addEventListener("click", (click) => {
                    document.getElementById(revMsgReadMoreOptions_Id).innerHTML = revGetReadMoreMsgTab();
                    document.getElementById(revMsgBody_Id).innerHTML = revMsgBodyFragment;
                });
            });

            return `<div id="${revMsgHide_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revMoreMsgObjectOptionsTab">HiDE</div>`;
        };

        window.revSetInterval(revMsgReadMoreOptions_Id, () => {
            if (revMsgBody.length > 105) {
                document.getElementById(revMsgReadMoreOptions_Id).innerHTML = revGetReadMoreMsgTab();
            } else {
                document.getElementById(revMsgBody_Id).innerHTML = revMsgBodyFragment;
            }
        });

        if (!revMsgSubject) {
            revMsgDisplay = `
            <div id="${revMsg_Id}" class="revFlexWrapper ${revMessageDetailsStyle}">
                <div class="revMsgSourceStyle">${revMsgSrc}</div>
                <div class="revFlexContainer revIMMsgContentContainer">
                    <div id="${revMsgBody_Id}" class="revFontSiteDarkTxtColor revFontSizeNormal revFlexContainer revMsgObjectBodyContainer">${revMsgBodyFragment}</div>
                    ${revMsgReadMoreOptionsView}
                    <div class="revFlexWrapper revTimeCreatedStyle">${window.revFormatLongDate(revVarArgs._revTimePublished)}</div>
                </div>
            </div>`;
        } else {
            revMsgDisplay = `
            <div id="${revMsg_Id}" class="revFlexWrapper ${revMessageDetailsStyle}">
                <div class="revMsgSourceStyle">${revMsgSrc}</div>
                <div class="revFlexContainer revIMMsgContentContainer">
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper">${revMsgSubject}</div>
                    <div id="${revMsgBody_Id}" class="revFontSiteDarkTxtColor revFontSizeNormal revFlexContainer revMsgObjectBodyContainer">${revMsgBodyFragment}</div>
                    ${revMsgReadMoreOptionsView}
                    <div class="revFlexWrapper revTimeCreatedStyle">${window.revFormatLongDate(revVarArgs._revTimePublished)}</div>
                </div>
            </div>
            `;
        }

        return revMsgDisplay;
    };

    return revIMBatch();
};

module.exports.revPageViewWidget = revPageViewWidget;
