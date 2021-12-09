var revWidget = async (revVarArgs) => {
    let revMonacoCodeEditor = revVarArgs.revMonacoCodeEditor;

    let revContentResetterCallBack = revVarArgs.revContentResetterCallBack;

    let revLoadedPlugin_Id = revVarArgs.revLoadedPlugin_Id;
    let revLoadedPluginStartObject_Id = revVarArgs.revLoadedPluginStartObject_Id;
    let revLoadedPluginStartObject = revVarArgs.revLoadedPluginStartObject;

    let revPluginTreeTabPopUpView_Id = revVarArgs.revPluginTreeTabPopUpView_Id;

    let revPluginViewsGroupTab_Id = "revPluginViewsGroupTab_Id_" + window.revGenUniqueId();

    await window.revLoadModules("revPluginModule_MsMonacoEditor");

    let revRemovePluginTreePopUp = () => {
        window.revSetInterval(revPluginTreeTabPopUpView_Id, () => {
            document.getElementById(revPluginTreeTabPopUpView_Id).remove();
        });
    };

    window.revSetInterval(revPluginViewsGroupTab_Id, () => {
        document.getElementById(revPluginViewsGroupTab_Id).addEventListener("click", async (event) => {
            let revCurrClickForm = {
                "rev_plugin_name": revLoadedPlugin_Id,
                "revNameId": revLoadedPlugin_Id,
                "revOverrideView": JSON.stringify(JSON.parse(JSON.stringify(revLoadedPluginStartObject)), null, 2),
                "revCodeLang": "json",
            };

            await window.revPluginModule_MsMonacoEditor.revPluginEditorFormCodeTabClickAction({
                "revMonacoCodeEditor": revMonacoCodeEditor,
                "revContentResetterCallBack": revContentResetterCallBack,
                "revSetSaveTabCallBack": revVarArgs.revSetSaveTabCallBack,
                "revCurrClickForm": revCurrClickForm,
            });

            revRemovePluginTreePopUp();
        });
    });

    let revFormMenuItemsTabsArr = [];

    for (let i = 0; i < revLoadedPluginStartObject.length; i++) {
        let revCurrClickForm = revLoadedPluginStartObject[i];

        let revFormMenuItemTab_Id = i + "_revFormMenuItemTab_Id_" + window.revGenUniqueId();

        window.revSetInterval(revFormMenuItemTab_Id, () => {
            document.getElementById(revFormMenuItemTab_Id).addEventListener("click", async (event) => {
                await window.revPluginModule_MsMonacoEditor.revPluginEditorFormCodeTabClickAction({
                    "revMonacoCodeEditor": revMonacoCodeEditor,
                    "revContentResetterCallBack": revContentResetterCallBack,
                    "revSetSaveTabCallBack": revVarArgs.revSetSaveTabCallBack,
                    "revCurrClickForm": revCurrClickForm,
                });

                revRemovePluginTreePopUp();
            });
        });

        let revFormMenuItemTab = `
            <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revPluginViewsGroupTabItemWrapper">
                <div class="revSmall-H-Line"></div>
                <div class="revPluginViewsGroupTabItemIcon"><i class="fas fa-file-code fa-lg"></i></div>
                <div id="${revFormMenuItemTab_Id}" class="revPluginViewsGroupTabItemTxt">${revCurrClickForm.revNameId}</div>
                ${window.revSmallDividerWrapper_BorderRight()}
                <div class="revPluginViewsGroupItemAddNewFileTab"><i class="fas fa-file-signature"></i></div>
            </div>
        `;

        revFormMenuItemsTabsArr.push(revFormMenuItemTab);
    }

    if (window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.length) {
        for (let i = 0; i < window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr.length; i++) {
            let revCurrFormObject = window.REV_PLUGIN_EDITOR_OBJECTS.revLoadedPluginsArr[i];

            if (window.revIsEmptyVar(revCurrFormObject) || !revCurrFormObject.hasOwnProperty("revNameId")) {
                continue;
            }

            await window.revPluginModule_MsMonacoEditor.revPluginEditorFormCodeTabClickAction({
                "revMonacoCodeEditor": revMonacoCodeEditor,
                "revContentResetterCallBack": revContentResetterCallBack,
                "revSetSaveTabCallBack": revVarArgs.revSetSaveTabCallBack,
                "revCurrClickForm": revCurrFormObject,
            });
        }
    }

    let revPluginViewsGroupTab = `
        <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revPluginViewsGroupTabItemWrapper">
            <div class="revSmall-H-Line"></div>
            <div class="revPluginViewsGroupTabItemIcon"><i class="fas fa-file-code fa-lg"></i></div>
            <div id="${revPluginViewsGroupTab_Id}" class="revPluginViewsGroupTabItemTxt">${revLoadedPluginStartObject_Id}</div>
            ${window.revSmallDividerWrapper_BorderRight()}
            <div class="revPluginViewsGroupItemAddNewFileTab"><i class="fas fa-plus"></i></div>
        </div>
        <div class="revFlexContainer revHookRemoteHandlerMenuItemsTabsContainer">${revFormMenuItemsTabsArr.join("")}</div>
    `;

    return revPluginViewsGroupTab;
};

module.exports.revWidget = revWidget;
