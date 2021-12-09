var REV_SCRIPT_MODULES = [];
var REV_PAGE_VIEWS = [];
var REV_LOADED_PAGE_VIEWS_AREAS = [];
var REV_LOADED_CONTEXT_VIEWS = {};

var REV_LOADED_FORMS = {};
var REV_LOADED_CONTEXT_FORMS = [];

var REV_LOADED_DELETE_OVERRIDE_VIEWS = [];
var REV_LOADED_MENU_ITEMS = [];
var REV_LOADED_OVERRIDE_VIEWS = [];
var REV_LOADED_FORM_VIEWS = [];

var REV_LOADED_MENU_AREAS = [];

var REV_LOADED_PLUGIN_HOOKS = [];
var REV_LOADED_PAGE_VIEW_PLUGIN_HOOK_HANDLERS = [];

var REV_LOCKED_LANG_VIEWS_TRANS = {};

var REV_LANG = "rus";

var revNameIdAdded = (revNameId, revArr) => {
    if (!Array.isArray(revArr)) return false;

    return revArr.some((item) => {
        if (!revNameId || !item.revNameId) return false;

        return item.revNameId.localeCompare(revNameId) == 0;
    });
};

var revGetArrItemByNameId = (revNameId, revArr) => {
    if (!Array.isArray(revArr)) {
        return null;
    }

    let revItem;

    for (let i = 0; i < revArr.length; i++) {
        let revCurrItem = revArr[i];

        if (!revCurrItem || !revCurrItem.revNameId) {
            continue;
        }

        if (revCurrItem.revNameId.localeCompare(revNameId) == 0) {
            revItem = revCurrItem;
        }
    }

    return revItem;
};

var revAppendChildNodeAtBeginning = (revParentId, revChildId) => {
    document.getElementById(revParentId).insertBefore(revChildId, document.getElementById(revParentId).firstChild);
};

function revDoClasses(revDiv, revClasses) {
    for (let i = 0; i < revClasses.length; i++) {
        revDiv.className += " " + revClasses[i];
    }
}

var revLoadCSS = (revPluginView) => {
    if (revPluginView.revCSSModules && revPluginView.revCSSModules.length) {
        for (let i = 0; i < revPluginView.revCSSModules.length; i++) {
            window.revLoadPageCSS(revPluginView.revCSSModules[i]);
        }
    }
};

var revLoadLockedLanguageTranslation = (revVarArgs) => {
    if (!revVarArgs) {
        return;
    }

    let revLangCode = revVarArgs.revLangCode;
    let revPluginNameId = revVarArgs.rev_plugin_name_id;
    let revLangViewType = revVarArgs.revLangViewType;
    let revViewNameId = revVarArgs.revViewNameId;

    let revLangTrans = revVarArgs.revLangTrans;

    if (!REV_LOCKED_LANG_VIEWS_TRANS.hasOwnProperty(revLangCode)) {
        REV_LOCKED_LANG_VIEWS_TRANS[revLangCode] = {};
    }

    if (!REV_LOCKED_LANG_VIEWS_TRANS[revLangCode].hasOwnProperty(revPluginNameId)) {
        REV_LOCKED_LANG_VIEWS_TRANS[revLangCode][revPluginNameId] = {};
    }

    if (!REV_LOCKED_LANG_VIEWS_TRANS[revLangCode][revPluginNameId].hasOwnProperty(revLangViewType)) {
        REV_LOCKED_LANG_VIEWS_TRANS[revLangCode][revPluginNameId][revLangViewType] = {};
    }

    if (!REV_LOCKED_LANG_VIEWS_TRANS[revLangCode][revPluginNameId][revLangViewType].hasOwnProperty(revViewNameId)) {
        REV_LOCKED_LANG_VIEWS_TRANS[revLangCode][revPluginNameId][revLangViewType][revViewNameId] = revLangTrans;
    }
};

var revGetLangPhraseTrans = (revVarArgs, revLangKey, revLen) => {
    let revLangCode = revVarArgs.revLangCode;
    let revPluginNameId = revVarArgs.rev_plugin_name_id;
    let revLangViewType = revVarArgs.revLangViewType;
    let revViewNameId = revVarArgs.revViewNameId;

    if (!revVarArgs.hasOwnProperty(revLangKey)) {
        return "";
    }

    if (!REV_LOCKED_LANG_VIEWS_TRANS.hasOwnProperty(revLangCode)) {
        return revVarArgs[revLangKey];
    }

    let revTransPhrase = REV_LOCKED_LANG_VIEWS_TRANS[revLangCode][revPluginNameId][revLangViewType][revViewNameId];

    let revCurrentTranslation = "";

    if (window.revIsEmptyVar(revLangKey)) {
        return "";
    }

    if (
        window.revIsEmptyVar(revTransPhrase[revLangKey]) ||
        window.revIsEmptyVar(revTransPhrase[revLangKey].revCurrentTranslation) ||
        window.revIsEmptyVar(revTransPhrase[revLangKey].revCurrentTranslation[revLangKey])
        /** */
    ) {
        revCurrentTranslation = revVarArgs[revLangKey];

        return revCurrentTranslation;
    }

    revCurrentTranslation = revTransPhrase[revLangKey].revCurrentTranslation[revLangKey];

    if (!revCurrentTranslation) {
        if (window.revIsEmptyVar(revTransPhrase.revDefLangPhrase)) {
            return "";
        }

        revCurrentTranslation = revTransPhrase.revDefLangPhrase;
    }

    if (revLen) {
        revCurrentTranslation = window.revTruncateString(revCurrentTranslation, revLen);
    }

    return revCurrentTranslation;
};

var revAppendFloatingOptionsMenuArea = async (revVarArgs) => {
    let revMenuAreaPageFloatingOptionsWidget = document.getElementById("revMenuAreaPageFloatingOptionsWidgetId");

    if (revMenuAreaPageFloatingOptionsWidget) {
        document.getElementById("revMenuAreaPageFloatingOptionsWidgetId").remove();
    }

    if (revVarArgs) {
        let revMenuAreaTopBarMoreOptions = await window.revGetMenuAreaView("revMenuAreaPageFloatingOptions", revVarArgs);

        let revMenuAreaFloatingWrapper = `
            <div id="revMenuAreaPageFloatingOptionsWidgetId" class="revFlexWrapper revMenuAreaPageFloatingOptionsWrapper">
                <div class="revFloatingRightBorderWrapperView"></div>
                <div class="revFlexWrapper revMenuAreaPageFloatingOptionsMenuItemsWrapper">${revMenuAreaTopBarMoreOptions}</div>
            </div>
        `;

        let revParentContainerId = "revPageRightSectionContainerId";

        if (revVarArgs.revParentContainerId) {
            revParentContainer = revVarArgs.revParentContainerId;
        }

        window.revSetInterval(revParentContainerId, () => {
            document.getElementById(revParentContainerId).insertAdjacentHTML("beforeend", revMenuAreaFloatingWrapper);
        });
    }
};

var revDrawMainContentArea = async (revVarArgs) => {
    if (window.revIsEmptyJSONObject(revVarArgs.revData)) {
        return;
    }

    let revData = revVarArgs.revData;
    let revLoadedPageView;

    if (revVarArgs.revLoadedPageView) {
        revLoadedPageView = revVarArgs.revLoadedPageView;
    }

    if (document.getElementById("revMenuAreaPageFloatingOptionsWidgetId")) {
        document.getElementById("revMenuAreaPageFloatingOptionsWidgetId").remove();
    }

    if (!window.revIsEmptyVar(revVarArgs.revFloatingOptionsMenuName)) {
        let revFloatingOptionsMenuName = revVarArgs.revFloatingOptionsMenuName;

        try {
            let revFloatingOptionsMenuArea = await window.revGetMenuAreaView(revFloatingOptionsMenuName, revData);

            if (!window.revIsEmptyVar(revFloatingOptionsMenuArea)) {
                let revMenuAreaFloatingWrapper = `
                    <div id="revMenuAreaPageFloatingOptionsWidgetId" class="revFlexWrapper revMenuAreaPageFloatingOptionsWrapper">
                        <div class="revFloatingRightBorderWrapperView"></div>
                        <div class="revFlexWrapper revMenuAreaPageFloatingOptionsMenuItemsWrapper">${revFloatingOptionsMenuArea}</div>
                    </div>
                `;

                let revParentContainerId = "revPageRightSectionContainerId";

                if (revVarArgs.revParentContainerId) {
                    revParentContainer = revVarArgs.revParentContainerId;
                }

                window.revSetInterval(revParentContainerId, () => {
                    document.getElementById(revParentContainerId).appendChild(window.revStringToHTMLNode(revMenuAreaFloatingWrapper));
                });
            }
        } catch (error) {
            console.log("ERR -> revDrawMainContentArea -> " + error);
        }
    }

    if (revLoadedPageView) {
        document.getElementById("revPageHome").innerHTML = revLoadedPageView;
        document.getElementById("revPageHome").focus();

        window.revToggleSwitchArea(null);
    }
};

var revNewQuill = (revNameId, revPromptText, revVarArgs) => {
    class LineNumber {
        constructor(quill, options) {
            this.quill = quill;
            this.options = options;
            this.container = document.querySelector(options.container);
            quill.on("text-change", this.update.bind(this));
            this.update(); // Account for initial contents
        }

        update() {
            "use strict";

            // Clear old nodes
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }

            let revAddCounter = (i) => {
                let node = document.createElement("div");

                // showcase - empty lines
                node.classList.add("revLineNumberDigit");
                node.innerHTML = i;

                this.container.appendChild(node);
            };

            let numberOfLineBreaks = (this.quill.root.innerHTML.match(/\n+$/gm) || []).length;

            console.log("Number of breaks: " + numberOfLineBreaks);

            for (let i = 1; i < numberOfLineBreaks + 7; i++) {
                revAddCounter(i);
            }
        }
    }

    let revQuillTollBarArr = [["bold", "italic", "underline", "strike", { "color": [] }, "link"], ["clean"], ["code-block"]];

    if (revVarArgs) {
        if (revVarArgs.revQuillTollBarVisible === false) {
            revQuillTollBarArr = false;
        }
    }

    if (revVarArgs && revVarArgs.revLineNumberContainer_Id) {
        Quill.register("modules/lineNumber", LineNumber, true);

        return new Quill("#" + revNameId, {
            modules: {
                toolbar: revQuillTollBarArr,
                syntax: true,
                lineNumber: {
                    container: "#" + revVarArgs.revLineNumberContainer_Id,
                },
            },
            placeholder: " " + revPromptText,
            scrollingContainer: "#editorcontainer",
            theme: "snow",
        });
    }

    return new Quill("#" + revNameId, {
        modules: {
            toolbar: revQuillTollBarArr,
            syntax: true,
        },
        placeholder: " " + revPromptText,
        scrollingContainer: "#editorcontainer",
        theme: "snow",
    });
};

var revGetQuillPlainText = (revInnerHTML) => {
    if (!revInnerHTML || window.revStringEmpty(revInnerHTML)) {
        return "";
    }

    let revQuill = new Quill("#revPlainText", {
        modules: {
            toolbar: [],
        },
        theme: "snow",
    });

    revQuill.clipboard.dangerouslyPasteHTML(revInnerHTML);

    let revPlainText = revQuill.getText();

    document.getElementById("revPlainText").innerHTML = "";

    return revPlainText;
};

var revNewQuill_MIN_TABS = (revNameId, revPromptText) => {
    let quill = new Quill("#" + revNameId, {
        modules: {
            toolbar: [["bold", "italic", "underline", "strike", { "color": [] }, "link"], ["clean"]],
        },
        placeholder: revPromptText,
        scrollingContainer: "#editorcontainer",
        theme: "snow",
    });

    return quill;
};

var revBootstrapDropdown = (revVarArgs) => {
    let revElementId = "revElementId_";

    window.revSetInterval("revSwitchArea", () => {
        if (revVarArgs && revVarArgs._remoteRevEntityGUID) {
            revElementId = "revElementId_" + revVarArgs._remoteRevEntityGUID;
        }

        window.revSetInterval(revElementId, () => {
            document.getElementById(revElementId).addEventListener("click", function (event) {
                window.revToggleSwitchArea(revElementId);
            });
        });
    });

    return `
    <div class="dropdown show">
        <a class="dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-level-down-alt"></i></a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">            
        </div>
    </div>
    `;
};

var revGetNoticiasPopUpContainer = (revInnerHTML) => {
    let revCloseNoticiasPopUpContainerId = "revCloseNoticiasPopUpContainerId";

    window.revSetInterval(revCloseNoticiasPopUpContainerId, () => {
        document.getElementById(revCloseNoticiasPopUpContainerId).addEventListener("click", (event) => {
            document.getElementById("revNoticiasPopUpContainerId").remove();
        });
    });

    return `
        <div id="revNoticiasPopUpContainerId" class="revPosAbsolute revFlexContainer revNoticiasPopUpContainer">
            ${revInnerHTML}
            <div class="revFlexWrapper revNoticiasPopUpFooterWrapper">
                <div id="${revCloseNoticiasPopUpContainerId}" class="revSmalllBoldWhite revTabLink revCloseNoticiasPopUpContainerTab">CLosE</div>
            </div>
        </div>
    `;
};

var revToggleElementVisibility = (revElementId) => {
    var x = document.getElementById(revElementId);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};

var revTempShowElement = (revChildElement, revParentContainerId, revTimeInterval) => {
    let revChildElementNode = window.revStringToHTMLNode(revChildElement);
    let revChildElementNodeId = revChildElementNode.id;

    if (document.getElementById(revParentContainerId)) {
        document.getElementById(revParentContainerId).appendChild(revChildElementNode);

        setTimeout(() => {
            if (document.getElementById(revChildElementNodeId)) document.getElementById(revChildElementNodeId).remove();
        }, revTimeInterval);
    }
};

var revToggleSwitchArea = (revSwitchData) => {
    let element = document.getElementById("revSwitchArea");
    element.innerHTML = "";

    if (!revSwitchData) {
        element.classList.remove("visible");
        element.classList.add("invisible");
        return;
    }

    if (element.classList) {
        if (element.classList.contains("visible")) {
            element.classList.remove("visible");
            element.classList.add("invisible");
        } else {
            element.classList.remove("invisible");
            element.classList.add("visible");
        }

        element.innerHTML = revSwitchData;
    } else {
        // For IE9
        var classes = element.className.split(" ");
        var i = classes.indexOf("invisible");

        if (i >= 0) {
            var node = document.createElement("<div>@@@</div>"); // Create a text node
            document.getElementById("revSwitchArea").appendChild(node);

            classes.splice(i, 1, "visible");
        } else {
            const element = document.getElementById("revSwitchArea");
            element.innerHTML = "";
            classes.push("invisible");
        }
        element.className = classes.join(" ");
    }
};

var revPageSwitchArea = () => {
    let element = document.getElementById("revSwitchArea");

    if (element && element.length) {
        revToggleSwitchArea(null);
    }

    let revSwitchArea = document.createElement("div");
    revSwitchArea.id = "revSwitchArea";

    revDoClasses(revSwitchArea, ["invisible", "revSwitchArea"]);

    revSwitchArea = window.revNodeToString(revSwitchArea);

    return revSwitchArea;
};

var revArrayMove = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};

var revLoadModules = async (revNameId, revCallback) => {
    let revModule = window.revGetArrItemByNameId(revNameId, window.REV_SCRIPT_MODULES);

    if (!revModule) {
        let revScriptModuleURL = REV_BASE_URL + "/rev_api/rev_get_script_module?revScriptModuleNameId=" + revNameId;
        let revScriptModule = await revGetServerData_JSON_Async(revScriptModuleURL);

        await window.revLoadDynamicScriptData(revScriptModule);

        window.REV_SCRIPT_MODULES.push(revScriptModule);

        if (revCallback) {
            revCallback(revScriptModule.revData);
        } else {
            return revScriptModule.revData;
        }
    } else {
        if (revCallback) {
            revCallback(revModule);
        } else {
            return revModule;
        }
    }
};

var revGetLoadedPluginHookHandlers = async (revPluginHookName) => {
    if (!revNameIdAdded(revPluginHookName, window.REV_SCRIPT_MODULES)) {
        let revScriptModuleURL = REV_BASE_URL + "/rev_api/get_plugin_hook_handlers?rev_plugin_hook_name=" + revPluginHookName;
        let revRetData = await revGetServerData_JSON_Async(revScriptModuleURL);

        let revFilter = revRetData.filter;

        for (let i = 0; i < revFilter.length; i++) {
            let revPluginHookHandler = revFilter[i];
            let revPluginHookHandlersArr = revPluginHookHandler.revPluginHookHandlersArr;

            for (let h = 0; h < revPluginHookHandlersArr.length; h++) {
                let revPluginHookHandler = revPluginHookHandlersArr[h].revHandler;

                await window.revLoadDynamicScriptData({ "revData": revPluginHookHandler });
            }
        }

        return revRetData;
    }

    return null;
};

var revLoadPageAreaMenuAreas = (dataRevPageViewsArr) => {
    let revAdded = (revNameId) => {
        return window.REV_LOADED_MENU_AREAS.some((item) => {
            return item.revNameId.localeCompare(revNameId) == 0;
        });
    };

    for (let i = 0; i < dataRevPageViewsArr.length; i++) {
        let revPageView = dataRevPageViewsArr[i];

        if (revPageView.revMenuAreas.length) {
            let revMenuAreas = revPageView.revMenuAreas;

            for (let m = 0; m < revMenuAreas.length; m++) {
                if (revAdded(revMenuAreas.revNameId)) continue;

                window.REV_LOADED_MENU_AREAS.push(revMenuAreas[m]);
            }
        }
    }
};

var revGetMenuArea = async (revMenuAreaViewName_, revVarArgs) => {
    let revMenuItems = [];

    for (let i = 0; i < window.REV_LOADED_MENU_AREAS.length; i++) {
        let revMenuArea = window.REV_LOADED_MENU_AREAS[i];

        let revMenuAreaViewName = revMenuArea.revMenuAreaViewName;

        if (revMenuAreaViewName && revMenuAreaViewName.localeCompare(revMenuAreaViewName_) == 0) {
            let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
            let revFuncString = revMenuArea.revOverrideView;

            let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));
            let revFunc = new AsyncFunction("revVarArgs", revFuncBody);

            revMenuItems.push(await revFunc(revVarArgs));
        }
    }

    return revMenuItems.join("");
};

var revDownloadDeleteOverrideView = async (revNameId) => {
    let revDeleteOverrideViewURL = "http://127.0.0.1:4000/rev_api/rev_get_delete_override_view?rev_delete_override_view=" + revNameId;

    let revDeleteOverrideView;

    try {
        revDeleteOverrideView = await revGetServerData_JSON_Async(revDeleteOverrideViewURL);
    } catch (error) {
        console.log("ERR -> revDownloadDeleteOverrideView -> " + error);
    }

    if (revDeleteOverrideView && !revNameIdAdded(revDeleteOverrideView.revNameId, window.REV_LOADED_MENU_ITEMS)) {
        window.REV_LOADED_MENU_ITEMS.push(revDeleteOverrideView);
    }

    return revDeleteOverrideView;
};

var revGetDeleteOverrideView = async (revNameId, revVarArgs) => {
    let revDeleteOverrideView;

    for (let i = 0; i < window.REV_LOADED_DELETE_OVERRIDE_VIEWS.length; i++) {
        let _revDeleteOverrideView = window.REV_LOADED_DELETE_OVERRIDE_VIEWS[i];

        if (!_revDeleteOverrideView) {
            continue;
        }

        let _revNameId = _revDeleteOverrideView.revNameId;

        if (_revNameId && _revNameId.localeCompare(revNameId) == 0) {
            revDeleteOverrideView = _revDeleteOverrideView;
            break;
        }
    }

    if (!revDeleteOverrideView) {
        revDeleteOverrideView = await revDownloadDeleteOverrideView(revNameId);
    }

    if (revDeleteOverrideView) {
        if (revDeleteOverrideView.revMenuItems && revDeleteOverrideView.revMenuItems.length) {
            for (let i = 0; i < revDeleteOverrideView.revMenuItems.length; i++) {
                if (revNameIdAdded(revDeleteOverrideView.revMenuItems[i].revNameId, window.REV_LOADED_MENU_ITEMS)) {
                    continue;
                }

                window.REV_LOADED_MENU_ITEMS.push(revDeleteOverrideView.revMenuItems[i]);
            }
        }

        let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
        let revFuncString = revDeleteOverrideView.revDeleteOverrideView;

        let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));
        let revFunc = new AsyncFunction("revVarArgs", revFuncBody);

        revDeleteOverrideView = await revFunc(revVarArgs);
    }

    return revDeleteOverrideView;
};

var revDownloadForms = async (revNameId) => {
    let revFormsURL = `http://127.0.0.1:4000/rev_api/rev_get_rev_forms?rev_forms_arr=${revNameId}&rev_lang_type=${window.REV_LANG}`;
    let dataRevForms = await revGetServerData_JSON_Async(revFormsURL);
    let dataRevFormsArr = dataRevForms.filter;

    for (let i = 0; i < dataRevFormsArr.length; i++) {
        let revForm = dataRevFormsArr[i];
        window.REV_LOADED_FORMS[revForm.revNameId] = revForm;

        window.revLoadCSS(revForm);

        window.revLoadLockedLanguageTranslation(revForm.revPluginViewFinalTranslations);
    }

    return window.REV_LOADED_FORMS[revNameId];
};

var revGetForm = async (revNameId, revVarArgs) => {
    let revForm;

    if (window.REV_LOADED_FORMS.hasOwnProperty(revNameId)) {
        revForm = window.REV_LOADED_FORMS[revNameId];
    }

    if (!revForm || !revForm.revOverrideView) {
        revForm = await window.revDownloadForms(revNameId);
    }

    if (revForm && revForm.revOverrideView) {
        let revFuncString = revForm.revOverrideView;
        let revFunc = window.revAsyncFunctionInit(revFuncString);

        if (!revFunc) {
            console.log("ERR -> revGetForm -> revNameId : " + revNameId);
            return null;
        }

        try {
            revForm = await revFunc(revVarArgs);
        } catch (error) {
            console.log(revNameId + " ERR : revGetForm : " + error);
        }
    }

    return revForm;
};

var revAddMenuItems = (revMenuItemsArr) => {
    if (!revMenuItemsArr) return;

    for (let i = 0; i < revMenuItemsArr.length; i++) {
        if (revNameIdAdded(revMenuItemsArr[i].revNameId, window.REV_LOADED_MENU_ITEMS)) {
            continue;
        }

        window.REV_LOADED_MENU_ITEMS.push(revMenuItemsArr[i]);

        window.revLoadCSS(revMenuItemsArr[i]);
    }
};

var revAddMenuAreas = (revMenuAreasArr) => {
    if (!revMenuAreasArr) {
        return;
    }

    for (let i = 0; i < revMenuAreasArr.length; i++) {
        revAddMenuItems(revMenuAreasArr[i].revMenuItems);

        if (revNameIdAdded(revMenuAreasArr[i].revNameId, window.REV_LOADED_MENU_AREAS)) {
            continue;
        }

        window.REV_LOADED_MENU_AREAS.push(revMenuAreasArr[i]);

        window.revLoadCSS(revMenuAreasArr[i]);
    }
};

var revDownloadContextView = async (revContext, revContextViewName, revVarArgs) => {
    let revContextViewJSON;

    if (REV_LOADED_CONTEXT_VIEWS.hasOwnProperty(revContext)) {
        let revContextViewsArr = REV_LOADED_CONTEXT_VIEWS[revContext];

        for (let i = 0; i < revContextViewsArr.length; i++) {
            let revContextView = revContextViewsArr[i];

            if (revContextView.revNameId.localeCompare(revContextViewName) == 0) {
                revContextViewJSON = revContextView;
                break;
            }
        }
    }

    if (!revContextViewJSON || !revContextViewJSON.revContextView) {
        let revContextViewURL = "http://127.0.0.1:4000/rev_api/rev_get_context_view?rev_context=" + revContext + "&rev_context_view=" + revContextViewName;

        try {
            let revRetData = await window.revGetServerData_JSON_Async(revContextViewURL);

            if (revRetData && revRetData.filter[0]) {
                let revContextViewData = revRetData.filter[0].revContextView;

                if (revContextViewData) {
                    if (REV_LOADED_CONTEXT_VIEWS.hasOwnProperty(revContext)) {
                        window.REV_LOADED_CONTEXT_VIEWS[revContext].push(revContextViewData);
                    } else {
                        for (let i = 0; i < revContextViewData.revContexts.length; i++) {
                            window.REV_LOADED_CONTEXT_VIEWS[revContextViewData.revContexts[i]] = [];
                            window.REV_LOADED_CONTEXT_VIEWS[revContextViewData.revContexts[i]].push(revContextViewData);
                        }
                    }
                }

                revContextViewJSON = revContextViewData;
            }
        } catch (error) {
            console.log("ERR -> revDownloadContextView -> revRetData -> " + error);
        }
    }

    if (!revContextViewJSON || !revContextViewJSON.revContextView) return null;

    let revFuncString = revContextViewJSON.revContextView;

    let revFunc = window.revAsyncFunctionInit(revFuncString);

    if (!revFunc) {
        console.log("ERR -> revDownloadContextView -> revContextViewName : " + revContextViewName);
        return null;
    }

    let revLoadedContextView;

    try {
        revLoadedContextView = await revFunc(revVarArgs);
    } catch (error) {
        console.log("ERR -> revContext: " + revContext + " -> revContextViewName : -> " + revContextViewName);
        console.log(error);
    }

    window.revLoadCSS(revContextViewJSON);

    return revLoadedContextView;
};

var revDownloadpluginHooks = async (revPluginHookName, revVarArgs) => {
    let revPluginHookURL = "http://127.0.0.1:4000/rev_api/rev_get_plugin_hooks?" + "&rev_plugin_hook_name=" + revPluginHookName;
    let revRetData = await window.revGetServerData_JSON_Async(revPluginHookURL);
    let revPluginHooksArr = revRetData.filter;

    if (revPluginHooksArr) {
        window.REV_LOADED_PLUGIN_HOOKS.push(revPluginHooksArr);
    }

    let revHandlerRetVals = [];

    for (let i = 0; i < revPluginHooksArr.length; i++) {
        let revFuncString = revPluginHooksArr[i].revHandler;

        let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));

        let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
        let revFunc = new AsyncFunction("revVarArgs", revFuncBody);

        try {
            let revHandlerRetVal = await revFunc(revVarArgs);
            revHandlerRetVals.push(revHandlerRetVal);
        } catch (error) {
            console.log(">>> revPluginHookName : " + revPluginHookName);
            console.log("ERR\n\t" + revFuncBody);
        }
    }

    return revHandlerRetVals;
};

var revDownloadContextForm = async (revContext, revContextFormName, revVarArgs) => {
    let revContextFormURL = "http://127.0.0.1:4000/rev_api/rev_get_context_form?rev_context=" + revContext + "&rev_context_form=" + revContextFormName;
    let revRetData = await window.revGetServerData_JSON_Async(revContextFormURL);
    let revContextForm = revRetData.filter[0];

    if (revContextForm) {
        window.REV_LOADED_CONTEXT_FORMS.push(revContextForm);
    }

    revContextForm = revContextForm.revContextForm;

    let revFuncString = revContextForm.revContextForm;

    let revFunc = window.revAsyncFunctionInit(revFuncString);

    let revLoadedContextForm;

    try {
        revLoadedContextForm = await revFunc(revVarArgs);
        window.revLoadCSS(revContextForm);
    } catch (error) {
        console.log("ERR -> revDownloadContextForm -> revContext: " + revContext + " >>> revContextFormName : " + revContextFormName + " -> " + error);
        console.log("ERR\n\t" + revFuncBody);
    }

    return revLoadedContextForm;
};

var revDownloadPageViews = async (revPageViewsArr) => {
    let revPageViewsURL = "http://127.0.0.1:4000/rev_api/rev_get_rev_page_views?rev_page_views_arr=" + revPageViewsArr.toString();
    let dataRevPageView = await window.revGetServerData_JSON_Async(revPageViewsURL);
    let dataRevPageViewsArr = dataRevPageView.filter;

    let revPageViewAreas = [];

    for (let i = 0; i < dataRevPageViewsArr.length; i++) {
        let revPageViewContainerName = dataRevPageViewsArr[i].revPageViewContainerName;
        let revAreaContainerData = dataRevPageViewsArr[i].revPageViewContainerData;

        window.revLoadPageAreaMenuAreas(revAreaContainerData);

        let revAdded = window.REV_PAGE_VIEWS.some((item) => {
            return item.revPageViewContainerName.localeCompare(revPageViewContainerName) == 0;
        });

        if (!revAdded) {
            let revWinIndex = window.REV_PAGE_VIEWS.push({ revPageViewContainerName: revPageViewContainerName, revPageViewContainerData: [] });
            window.REV_LOADED_PAGE_VIEWS_AREAS.push(revPageViewContainerName);

            for (let c = 0; c < revAreaContainerData.length; c++) {
                let revPageView = revAreaContainerData[c];
                let revContainerItemName = revPageView.revPageViewContainerName;

                if (revContainerItemName.localeCompare(revPageViewContainerName) == 0) {
                    window.REV_PAGE_VIEWS[revWinIndex - 1].revPageViewContainerData.push(revPageView);

                    window.revAddMenuAreas(revPageView.revMenuAreas[i]);
                }

                window.revLoadCSS(revPageView);

                if (revPageView.revPluginHookHandlers) {
                    window.REV_LOADED_PAGE_VIEW_PLUGIN_HOOK_HANDLERS.push({ "revContext": revPageView.revNameId, "revPluginHookHandlers": revPageView.revPluginHookHandlers });
                }
            }
        } else {
            for (let c = 0; c < revAreaContainerData.length; c++) {
                let revContainerItemName = revAreaContainerData[c].revPageViewContainerName;

                for (let w = 0; w < window.REV_PAGE_VIEWS.length; w++) {
                    let revWindowContainerArea = window.REV_PAGE_VIEWS[w].revPageViewContainerName;

                    if (revWindowContainerArea.localeCompare(revContainerItemName) == 0) {
                        window.REV_PAGE_VIEWS[w].revPageViewContainerData.push(revAreaContainerData[c]);

                        window.revLoadCSS(revAreaContainerData[c]);
                    }
                }
            }
        }
    }

    revPageViewAreas = window.REV_PAGE_VIEWS;

    for (let i = 0; i < revPageViewAreas.length; i++) {
        let revPageViewContainerData = revPageViewAreas[i].revPageViewContainerData;

        for (let v = 0; v < revPageViewContainerData.length; v++) {
            let revPageView = revPageViewContainerData[v];

            if (!revPageView.revBefore) continue;

            let revBeforeArr = revPageView.revBefore;

            for (let b = 0; b < revBeforeArr.length; b++) {
                let revBefore = revBeforeArr[b];

                if (revBefore) {
                    for (let p = 0; p < revPageViewContainerData.length; p++) {
                        let revItem = revPageViewContainerData[p];

                        if (!revItem) continue;

                        if (revItem.revNameId.localeCompare(revBefore) == 0) {
                            let revIndex = revPageViewContainerData.indexOf(revPageView);
                            revPageViewContainerData = revArrayMove(revPageViewContainerData, revIndex, revPageViewContainerData.indexOf(revItem) - 1);
                        }
                    }
                }
            }
        }
    }

    window.REV_PAGE_VIEWS = revPageViewAreas;
};

var revArrangeItems = (revArr) => {
    for (let v = 0; v < revArr.length; v++) {
        let revItem = revArr[v];

        if (!revItem.revBefore) continue;

        let revBeforeArr = revItem.revBefore;

        for (let b = 0; b < revBeforeArr.length; b++) {
            let revBefore = revBeforeArr[b];

            if (revBefore) {
                for (let p = 0; p < revArr.length; p++) {
                    let revItem = revArr[p];

                    if (!revItem) continue;

                    if (revItem.revNameId.localeCompare(revBefore) == 0) {
                        let revIndex = revArr.indexOf(revItem);
                        revArr = revArrayMove(revArr, revIndex, revArr.indexOf(revItem) - 1);
                    }
                }
            }
        }
    }
};

var revGetPageAreaViews = async (revContainerName) => {
    if (!window.REV_LOADED_PAGE_VIEWS_AREAS.includes(revContainerName)) await revDownloadPageViews(revContainerName);

    let revPageViewContainerData = [];

    for (let i = 0; i < window.REV_PAGE_VIEWS.length; i++) {
        let revPageViewContainerName = window.REV_PAGE_VIEWS[i].revPageViewContainerName;

        if (revContainerName.localeCompare(revPageViewContainerName) == 0) {
            revPageViewContainerData = window.REV_PAGE_VIEWS[i].revPageViewContainerData;
            break;
        }
    }

    return revPageViewContainerData;
};

var revGetLoadedPageViewAreaContainer = async (revPageViewContainerName, revVarArgs, callback) => {
    let revPageViews = await window.revGetPageAreaViews(revPageViewContainerName);

    let revNodes = [];

    let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

    for (let i = 0; i < revPageViews.length; i++) {
        let revFuncString = revPageViews[i].revPageView;

        let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));

        let revFunc = "";

        try {
            revFunc = new AsyncFunction("revVarArgs", revFuncBody);
        } catch (error) {
            console.log("ERR -> revFunc -> " + error + "\n" + revFuncBody);
        }

        let revPageViewNode;

        try {
            revPageViewNode = await revFunc(revVarArgs);
        } catch (error) {
            console.log("ERR -> revPageViewContainerName -> " + revPageViewContainerName + " -> " + error);
        }

        if (revPageViewNode) revNodes.push(revPageViewNode);
    }

    if (callback) {
        if (revNodes.length > 0) {
            callback(revNodes.join(""));
        } else {
            callback("");
        }

        for (let i = 0; i < revPageViews.length; i++) {
            if (revPageViews[i].hasOwnProperty("revCallback")) {
                let revCallbackFuncString = revPageViews[i].revCallback;
                let revCallbackFuncBody = revCallbackFuncString.slice(revCallbackFuncString.indexOf("{") + 1, revCallbackFuncString.lastIndexOf("}"));

                let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
                let revCallbackFunc = new AsyncFunction("revVarArgs", revCallbackFuncBody);

                try {
                    await revCallbackFunc(revVarArgs);
                } catch (error) {
                    console.log("ERR -> revGetLoadedPageViewAreaContainer-> " + " revPageViewContainerName -> " + revPageViewContainerName + " -> " + error);
                }
            }
        }
    }

    if (!callback) return revNodes.join("");
};

var revGetLoadedPageView = async (revPageViewContainerName, revVarArgs, callback) => {
    let revPageViews;

    try {
        revPageViews = await window.revGetPageAreaViews(revPageViewContainerName);
    } catch (error) {
        console.log("1 revGetPageAreaViews ERR : " + revPageViewContainerName + "\n\t" + error);
    }

    let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

    let revFuncString = revPageViews[0].revPageView;

    let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));
    let revFunc = new AsyncFunction("revVarArgs", revFuncBody);

    let revPageViewNode = "";

    try {
        revPageViewNode = await revFunc(revVarArgs);
    } catch (error) {
        console.log("revGetLoadedPageView ERR\t" + revPageViews[0].revNameId + "\n\t\t" + error);
    }

    if (callback) {
        callback(revPageViewNode);
    } else {
        return revPageViewNode;
    }
};

var revDownloadDefaultViews = async (revViewsArray) => {
    let revOverrideViewsURL = "http://127.0.0.1:4000/rev_api/rev_get_override_views?rev_override_views_arr=" + revViewsArray.toString();
    let dataRevOverrideViews = await revGetServerData_JSON_Async(revOverrideViewsURL);

    let revOverrideViewsArr = dataRevOverrideViews.filter;

    for (let i = 0; i < revOverrideViewsArr.length; i++) {
        let revOverrideView = revOverrideViewsArr[i];
        REV_LOADED_OVERRIDE_VIEWS.push(revOverrideView);

        window.revLoadCSS(revOverrideView);
    }

    return revOverrideViewsArr;
};

var revGetOverrideViewObject = (revNameId) => {
    let entire = null;

    for (let i = 0; i < REV_LOADED_OVERRIDE_VIEWS.length; i++) {
        if (revNameId === REV_LOADED_OVERRIDE_VIEWS[i].revNameId) {
            entire = REV_LOADED_OVERRIDE_VIEWS[i];
            break;
        }
    }

    return entire;
};

var revGetLoadedOverrideView = async (revNameId, revVarArgs) => {
    let entire;

    for (let i = 0; i < REV_LOADED_OVERRIDE_VIEWS.length; i++) {
        if (revNameId.localeCompare(REV_LOADED_OVERRIDE_VIEWS[i].revNameId) == 0) {
            entire = REV_LOADED_OVERRIDE_VIEWS[i];
            break;
        }
    }

    if (!entire) {
        try {
            entire = (await revDownloadDefaultViews([revNameId]))[0];
        } catch (error) {
            console.log("ERR -> revGetLoadedOverrideView -> !entire -> " + error);
        }
    }

    if (!entire) {
        return null;
    }

    let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

    let revFuncString = entire.revOverrideView;
    let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));

    let revFunc = new AsyncFunction("revVarArgs", revFuncBody);

    let revPageView;

    try {
        revPageView = await revFunc(revVarArgs);
    } catch (err) {
        console.log("ERR -> revGetLoadedOverrideView -> " + revNameId + " -> " + entire.revNameId + " -> " + err);
    }

    return revPageView;
};

var revGetMenuItems = (revMenuAreaViewName_, revMenus) => {
    let revMenuItems;

    for (let i = 0; i < revMenus.length; i++) {
        if (!revMenus[i]) continue;

        let revMenuAreaViewName = revMenus[i].revMenuAreaViewName;

        if (revMenuAreaViewName && revMenuAreaViewName.localeCompare(revMenuAreaViewName_) == 0) {
            revMenuItems = revMenus[i].revMenuItems;
        }
    }

    return revMenuItems;
};

var revGetMenuMenuAreaMenuItemsArr = (revMenuAreaViewName_, revMenus) => {
    let revMenuItems = [];

    for (let i = 0; i < revMenus.length; i++) {
        let revMenuItem = revMenus[i];

        if (!revMenuItem) {
            continue;
        }

        let revContainerMenuAreas = revMenuItem.revContainerMenuAreas;

        if (!revContainerMenuAreas || !revContainerMenuAreas.length) {
            continue;
        }

        for (let c = 0; c < revContainerMenuAreas.length; c++) {
            let revContainerMenuAreaName = revContainerMenuAreas[c];

            if (revContainerMenuAreaName && revContainerMenuAreaName.localeCompare(revMenuAreaViewName_) == 0) {
                revMenuItems.push(revMenus[i]);
            }
        }
    }

    return revMenuItems;
};

var revDownloadMenuArea = async (revMenuAreaViewName) => {
    let revMenuAreaURL = "http://127.0.0.1:4000/rev_api/rev_get_menu_area?rev_menu_area_view_name=" + revMenuAreaViewName;
    let revMenuArea = await revGetServerData_JSON_Async(revMenuAreaURL);

    if (revMenuArea) {
        window.REV_LOADED_MENU_AREAS.push(revMenuArea);
    }

    window.revLoadCSS(revMenuArea);

    return revMenuArea;
};

var revGetMenuAreaView = async (revMenuAreaViewName_, revVarArgs) => {
    let revMenuArea;

    for (let i = 0; i < window.REV_LOADED_MENU_AREAS.length; i++) {
        let _revMenuArea = window.REV_LOADED_MENU_AREAS[i];

        if (!_revMenuArea) {
            continue;
        }

        let revMenuAreaViewName = _revMenuArea.revMenuAreaViewName;

        if (revMenuAreaViewName && revMenuAreaViewName.localeCompare(revMenuAreaViewName_) == 0) {
            revMenuArea = _revMenuArea;
            break;
        }
    }

    if (!revMenuArea) {
        revMenuArea = await revDownloadMenuArea(revMenuAreaViewName_);
    }

    if (revMenuArea && Array.isArray(revMenuArea.revMenuItems)) {
        for (let i = 0; i < revMenuArea.revMenuItems.length; i++) {
            if (revNameIdAdded(revMenuArea.revMenuItems[i].revNameId, window.REV_LOADED_MENU_ITEMS)) {
                continue;
            }

            window.REV_LOADED_MENU_ITEMS.push(revMenuArea.revMenuItems[i]);
        }

        let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
        let revFuncString = revMenuArea.revOverrideView;

        let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));
        let revFunc = new AsyncFunction("revVarArgs", revFuncBody);

        try {
            revMenuArea = await revFunc(revVarArgs);
        } catch (error) {
            console.log(error);
            console.log(revFuncString);
        }
    } else {
        revMenuArea = "";
    }

    return revMenuArea;
};

var revDrawMenuItems = async (revMenuItems, revVarArgs) => {
    let revEntire = [];

    if (revMenuItems) {
        for (let i = 0; i < revMenuItems.length; i++) {
            if (!revMenuItems[i]) continue;

            let revFuncString = revMenuItems[i].revOverrideView;
            let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));

            let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

            let revFunc = new AsyncFunction("revVarArgs", revFuncBody);

            let revMenuItem;

            try {
                revMenuItem = await revFunc(revVarArgs);
            } catch (error) {
                console.log("revDrawMenuItems : " + error + "\n\t\t" + revFuncString);
            }

            if (revMenuItem) revEntire.push(revMenuItem);
        }
    }

    return revEntire;
};

var revDownloadMenuItem = async (revMenuItemNameId) => {
    let revMenuItemURL = "http://127.0.0.1:4000/rev_api/rev_get_menu_item?rev_menu_item_name_id=" + revMenuItemNameId;
    let revMenuItem;

    try {
        revMenuItem = await window.revGetServerData_JSON_Async(revMenuItemURL);
    } catch (error) {
        console.log("revDownloadMenuItem :\n\t" + error);
        console.log("revMenuItemNameId : " + revMenuItemNameId);
    }

    if (revMenuItem && !revNameIdAdded(revMenuItem.revNameId, window.REV_LOADED_MENU_ITEMS)) {
        window.REV_LOADED_MENU_ITEMS.push(revMenuItem);
    }

    window.revLoadCSS(revMenuItem);

    return revMenuItem;
};

var revGetMenuItem = async (revNameId, revVarArgs) => {
    let revMenuItem;

    let revLoadedMenuItems = window.REV_LOADED_MENU_ITEMS;

    for (let i = 0; i < revLoadedMenuItems.length; i++) {
        let revItem = revLoadedMenuItems[i];

        if (revItem.revNameId.localeCompare(revNameId) == 0) {
            revMenuItem = revLoadedMenuItems[i];
            break;
        }
    }

    if (!revMenuItem) {
        try {
            revMenuItem = await window.revDownloadMenuItem(revNameId);
        } catch (error) {
            console.log("1 >>> revGetMenuItem :\n\t" + error);
            console.log("revNameId : " + revNameId);
        }
    }

    if (revMenuItem) {
        let revFuncString = revMenuItem.revOverrideView;

        let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

        let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));
        let revFunc = new AsyncFunction("revVarArgs", revFuncBody);

        if (revMenuItem) {
            try {
                revMenuItem = await revFunc(revVarArgs);
            } catch (error) {
                console.log("2 >>> revGetMenuItem :\n\t" + error);
                console.log(">>> revNameId : " + revNameId);
            }
        }
    }

    return revMenuItem;
};
