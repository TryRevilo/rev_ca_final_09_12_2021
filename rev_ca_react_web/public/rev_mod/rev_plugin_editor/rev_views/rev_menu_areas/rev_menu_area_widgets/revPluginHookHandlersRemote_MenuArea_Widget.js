var revWidget = async (revVarArgs) => {
    let revLoadedPluginStartObject_Id = revVarArgs.revLoadedPluginStartObject_Id;
    let revLoadedPluginStartObject = revVarArgs.revLoadedPluginStartObject;
    let revEditorInputAreaTextingQuill = revVarArgs.revEditorInputAreaTextingQuill;
    let revPluginTreeTabPopUpView_Id = revVarArgs.revPluginTreeTabPopUpView_Id;

    let revPluginViewsGroupTab_Id = "revPluginViewsGroupTab_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPluginViewsGroupTab_Id, () => {
        document.getElementById(revPluginViewsGroupTab_Id).addEventListener("click", (event) => {
            let revPretty_Id = "revPretty_Id_" + window.revGenUniqueId();

            window.revSetInterval(revPretty_Id, () => {
                hljs.highlightElement(document.getElementById(revPretty_Id));
                hljs.initLineNumbersOnLoad();
            });

            revLoadedPluginStartObject = `<p><pre id="${revPretty_Id}"><code>${JSON.stringify(JSON.parse(JSON.stringify(revLoadedPluginStartObject)), null, 2)}</code></pre></p>`;

            revEditorInputAreaTextingQuill.root.innerHTML = revLoadedPluginStartObject;

            document.getElementById(revPluginTreeTabPopUpView_Id).remove();
        });
    });

    let revHookRemoteHandlerMenuItemsTabsArr = [];

    for (let i = 0; i < revLoadedPluginStartObject.length; i++) {
        let revHookRemoteHandler = revLoadedPluginStartObject[i];

        let revHandler = revHookRemoteHandler.revHandler;

        let revHookRemoteHandlerMenuItemTab_Id = i + "_revHookRemoteHandlerMenuItemTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revHookRemoteHandlerMenuItemTab_Id, () => {
            document.getElementById(revHookRemoteHandlerMenuItemTab_Id).addEventListener("click", (event) => {
                let revPretty_Id = "revPretty_Id_" + window.revGenUniqueId();

                window.revSetInterval(revPretty_Id, () => {
                    hljs.highlightElement(document.getElementById(revPretty_Id));
                });

                revHandler = `<pre id="${revPretty_Id}"><code>var revWidget = ${revHandler}};


module.exports.revWidget = revWidget;

</code></pre>`;

                revEditorInputAreaTextingQuill.root.innerHTML = revHandler;

                document.getElementById(revPluginTreeTabPopUpView_Id).remove();
            });
        });

        let revHookRemoteHandlerMenuItemTab = `
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revPluginViewsGroupTabItemWrapper">
                <div class="revSmall-H-Line"></div>
                <div class="revPluginViewsGroupTabItemIcon"><i class="fas fa-file-code fa-lg"></i></div>
                <div id="${revHookRemoteHandlerMenuItemTab_Id}" class="revPluginViewsGroupTabItemTxt">${revHookRemoteHandler.revNameID}</div>
                ${window.revSmallDividerWrapper_BorderRight()}
                <div class="revPluginViewsGroupItemAddNewFileTab"><i class="fas fa-file-signature"></i></div>
            </div>
        `;

        revHookRemoteHandlerMenuItemsTabsArr.push(revHookRemoteHandlerMenuItemTab);
    }

    let revPluginViewsGroupTab = `
        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revPluginViewsGroupTabItemWrapper">
            <div class="revSmall-H-Line"></div>
            <div class="revPluginViewsGroupTabItemIcon"><i class="fas fa-file-code fa-lg"></i></div>
            <div id="${revPluginViewsGroupTab_Id}" class="revPluginViewsGroupTabItemTxt">${revLoadedPluginStartObject_Id}</div>
            ${window.revSmallDividerWrapper_BorderRight()}
            <div class="revPluginViewsGroupItemAddNewFileTab"><i class="fas fa-plus"></i></div>
        </div>
        <div class="revFlexContainer revHookRemoteHandlerMenuItemsTabsContainer">${revHookRemoteHandlerMenuItemsTabsArr.join("")}</div>
    `;

    return revPluginViewsGroupTab;
};

module.exports.revWidget = revWidget;
