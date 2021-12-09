var revIsDomElementIdExists = (revElement_Id) => {
    return !window.revStringEmpty(window.revNodeToString(document.getElementById(revElement_Id)));
};

var revToggleVisibility = (revElement_Id) => {
    window.revSetInterval(revElement_Id, () => {
        let revElement = document.getElementById(revElement_Id);

        if (revElement.classList) {
            if (revElement.classList.contains("visible")) {
                revElement.classList.remove("visible");
                revElement.classList.add("invisible");
            } else {
                revElement.classList.remove("invisible");
                revElement.classList.add("visible");
            }
        } else {
            // For IE9
            let revClasses = revElement.className.split(" ");
            let i = revClasses.indexOf("invisible");

            if (i >= 0) {
                revClasses.splice(i, 1, "visible");
            } else {
                revClasses.push("invisible");
            }

            revElement.className = revClasses.join(" ");
        }
    });
};

var revShowVisibility = (revElement_Id) => {
    window.revSetInterval(revElement_Id, () => {
        let revElement = document.getElementById(revElement_Id);

        if (revElement.classList) {
            if (revElement.classList.contains("invisible")) {
                revElement.classList.remove("invisible");
            }

            revElement.classList.add("visible");
        } else {
            // For IE9
            let revClasses = revElement.className.split(" ");
            let i = revClasses.indexOf("invisible");

            if (i >= 0) {
                revClasses.splice(i, 1, "invisible");
            } else {
                revClasses.push("visible");
            }

            revElement.className = revClasses.join(" ");
        }
    });
};

var revHideVisibility = (revElement_Id) => {
    window.revSetInterval(revElement_Id, () => {
        let revElement = document.getElementById(revElement_Id);

        if (revElement.classList) {
            if (revElement.classList.contains("visible")) {
                revElement.classList.remove("visible");
            }

            revElement.classList.add("invisible");
        } else {
            // For IE9
            let revClasses = revElement.className.split(" ");
            let i = revClasses.indexOf("invisible");

            if (i >= 0) {
                revClasses.splice(i, 1, "visible");
            } else {
                revClasses.push("invisible");
            }

            revElement.className = revClasses.join(" ");
        }
    });
};

var revAddRemoveToggleView = (revPos, revContainerElementId, revChildElementId, revHTMLString) => {
    if (typeof document.getElementById(revChildElementId) != "undefined" && document.getElementById(revChildElementId) != null) {
        document.getElementById(revChildElementId).remove();
    } else {
        document.getElementById(revContainerElementId).insertAdjacentHTML(revPos, revHTMLString);
    }
};

var revLoadContainerInnerHTMLContent = (revNodeId, revHTMLViewArea) => {
    if (!revNodeId || !revHTMLViewArea) return;

    let revNode = document.getElementById(revNodeId);

    if (!revNode) return;

    revNode.innerHTML = revHTMLViewArea;
};

var revLoadUserIcon = (revEntity, revIconArea_Id) => {
    window.revSetInterval(revIconArea_Id, () => {
        let revEntityInfo = revEntity._revInfoEntity;

        window.revLoadModules("revPluginModuleUserProfileFunctions", (revScriptModule) => {
            let revProfileIconPath = window.revPluginModuleUserProfileFunctions.revGetUserIconPath(revEntityInfo);
            revProfileIconPath = window.REV_UPLOAD_FILES_DIR_PATH + "/" + revProfileIconPath;

            let revProfileIconView = `<img class="revListingIconCurvedTiny" src="${revProfileIconPath}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_USER_ICON_PATH}';">`;

            document.getElementById(revIconArea_Id).innerHTML = revProfileIconView;
        });
    });
};

var revInputTextAreaAddLineNumbers = (revEditorInputArea_Id, revLineNumberContainer_Id) => {
    let revAddLineNumberCounter = (i) => {
        let node = document.createElement("div");

        // showcase - empty lines
        node.classList.add("revLineNumberDigit");
        node.innerHTML = i;

        document.getElementById(revLineNumberContainer_Id).appendChild(node);
    };

    document.getElementById(revLineNumberContainer_Id).innerHTML = "";

    let numberOfLineBreaks = document.getElementById(revEditorInputArea_Id).innerHTML.split("\n");

    numberOfLineBreaks = document.getElementById(revEditorInputArea_Id).innerHTML.split(/\r\n|\r|\n|<br>/).length;

    numberOfLineBreaks = numberOfLineBreaks + 1;

    console.log("Number of breaks: " + numberOfLineBreaks);

    for (let i = 1; i < numberOfLineBreaks; i++) {
        revAddLineNumberCounter(i);
    }
};

var revPrettifyCode = (revCodeString) => {
    let revPretty_Id = "revPretty_Id_" + window.revGenUniqueId();

    window.revSetInterval(revPretty_Id, () => {
        hljs.highlightElement(document.getElementById(revPretty_Id));

        // hljs.highlightAll();
    });

    revCodeString = js_beautify(revCodeString, {
        "indent_size": 4,
        "indent_char": " ",
        "indent_with_tabs": false,
        "editorconfig": false,
        "eol": "\n",
        "end_with_newline": false,
        "indent_level": 0,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "space_in_paren": false,
        "space_in_empty_paren": false,
        "jslint_happy": false,
        "space_after_anon_function": false,
        "space_after_named_function": false,
        "brace_style": "collapse",
        "unindent_chained_methods": false,
        "break_chained_methods": false,
        "keep_array_indentation": false,
        "unescape_strings": false,
        "wrap_line_length": 0,
        "e4x": false,
        "comma_first": false,
        "operator_position": "before-newline",
        "indent_empty_lines": false,
        "templating": ["auto"],
    });

    return `<pre id="${revPretty_Id}"><code>${revCodeString}</code></pre>`;
};

var revGetLineNumberedTextArea = (revVarArgs) => {
    let revLineNumberContainer_Id = "revLineNumberContainer_Id_" + window.revGenUniqueId();
    let revEditorInputArea_Id = "revEditorInputArea_Id_" + window.revGenUniqueId();

    let revSetEditorInnerHTML = (revInnerHTMLVal) => {
        window.revSetInterval(revEditorInputArea_Id, () => {
            let revRawHTML = window.revGetRawHTML(revInnerHTMLVal);
            let revPrettyCode = window.revPrettifyCode(revRawHTML);

            document.getElementById(revEditorInputArea_Id).innerHTML = revPrettyCode;

            window.revInputTextAreaAddLineNumbers(revEditorInputArea_Id, revLineNumberContainer_Id);
        });
    };

    window.revSetInterval(revEditorInputArea_Id, () => {
        document.getElementById(revEditorInputArea_Id).addEventListener("input", function () {
            console.log("contenteditable element changed");

            document.getElementById(revEditorInputArea_Id).innerHTML = window.revPrettifyCode(document.getElementById(revEditorInputArea_Id));

            window.revInputTextAreaAddLineNumbers(revEditorInputArea_Id, revLineNumberContainer_Id);
        });
    });

    let revNumberedTextArea = `
        <div class="revFlexWrapper revPluginEditorInputAreaWrapper">
            <div id="${revLineNumberContainer_Id}" class="revFlexContainer revLineNumberContainer">
                <div class="revLineNumberDigit">1</div>
            </div>
            <div id="${revEditorInputArea_Id}" class="revFlexContainer revPluginEditorInputArea" spellcheck=false contenteditable="true"></div>
        </div>
    `;

    return {
        "revNumberedTextArea": revNumberedTextArea,
        "revSetEditorInnerHTML": revSetEditorInnerHTML,
    };
};

var revMonacoCodeEditorLoader = (revMonacoCodeEditorContainer_Id, defaultCode, revCodeLang) => {
    if (window.revIsEmptyVar(revCodeLang)) {
        revCodeLang = "javascript";
    }

    monaco.editor.defineTheme("myTheme", {
        base: "vs",
        inherit: true,
        rules: [{ background: "f9fbe7" }],
        colors: {
            "editor.foreground": "#000000",
            "editor.background": "#f9fbe7",
            "editorCursor.foreground": "#8B0000",
            "editor.lineHighlightBackground": "#f3e5f5",
            "editorLineNumber.foreground": "#008800",
            "editor.selectionBackground": "#88000030",
            "editor.inactiveSelectionBackground": "#88000015",
        },
    });

    monaco.editor.setTheme("myTheme");

    let editor = monaco.editor.create(document.getElementById(revMonacoCodeEditorContainer_Id), {
        value: [defaultCode].join("\n"),
        language: revCodeLang,
        fontFamily: "Arial",
        fontSize: 14,
    });

    return editor;
};

var revColouredBlinkers = () => {
    return `
    <div class="revFlexWrapper">
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-light" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-dark" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    `;
};

var revInlineHeaderArrowDown = (revHeaderTxt) => {
    let revHTML = `
        <div class="revFlexContainer revInlineHeaderContainer">
            <div class="revInlineHeaderTitleTxt">${revHeaderTxt}</div>
            <div class="revInlineHeaderTitleIcon"><i class="fas fa-long-arrow-alt-down"></i></div>
        </div>
        `;

    return revHTML;
};

var revInlineHeaderArrowDown_LeftAligned = (revHeaderTxt) => {
    let revHTML = `
        <div class="revFlexContainer revInlineHeaderContainer">
            <div class="revInlineHeaderTitleTxt_LeftAligned">${revHeaderTxt}</div>
            <div class="revInlineHeaderTitleIcon_LeftAligned"><i class="fas fa-long-arrow-alt-down"></i></div>
        </div>
        `;

    return revHTML;
};

var revInlineRightPoiterTxtTopTxt = (revHeaderTxt) => {
    let revHTML = `
        <div class="revFlexWrapper revInlineRightPoiterTxtCompacWrapper">
            <div class="revInlineRightPoiterTxtCompactBorder"></div>
            <div class="revInlineRightPoiterTxtCompactIcon"><span><i class="fas fa-long-arrow-alt-right"></i></span></div>
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revWordWrap revInlineRightPoiterTxtCompactTxt">${revHeaderTxt}</div>
        </div>
        `;

    return revHTML;
};

var revInlineRightPoiterTxtSlim = (revHeaderTxt) => {
    let revHTML = `
        <div class="revFlexWrapper">
            <div class="revInlineRightPoiterTxtCompactBorderFooterTxt"></div>
            <div class="revInlineRightPoiterTxtCompactIconFooterTxt"><span><i class="fas fa-long-arrow-alt-right"></i></span></div>
            <div class="revFlexWrapper revFontSiteGreyTxtColor revFontSizeNormal revWordWrap revInlineRightPoiterTxtCompactTxtFooterTxt">${revHeaderTxt}</div>
        </div>
        `;

    return revHTML;
};

var revPageHeader = (revHeaderText) => {
    return `<div class="revFlexWrapper revPageHeader">${revHeaderText}</div>`;
};

var revGetFileTempPath = (revFile) => {
    return URL.createObjectURL(revFile);
};

var revReadFileToImage = (revFile, revIconClass, callback) => {
    var reader = new FileReader();
    reader.onload = function (e) {
        let revIconImage = `
        <img class="${revIconClass}" src="${e.target.result}" />
        `;

        callback(revIconImage);
    };

    reader.readAsDataURL(revFile); // convert to base64 string
};

var revReadFileToImageFromPath = (revFile, revIconClass, revImageId) => {
    if (!revImageId) revImageId = "revImageId_" + window.revGenUniqueId();
    return `<img id="${revImageId}" class="${revIconClass}" src="${window.revGetFileTempPath(revFile)}" />`;
};

var revReadFileToImageFromURL = (revSrc, revIconClass) => {
    return `<img class="${revIconClass}" src="${revSrc}" onerror="this.onerror=null;this.src='${window.REV_DEFAULT_PIC_ICON_PATH}';" />`;
};

var revGetFileName = (revAbsolutePath) => {
    return revAbsolutePath.split(/(\\|\/)/g).pop();
};

var revGetSimpleFileName = (revAbsolutePath) => {
    return revAbsolutePath.replace(/\.[^/.]+$/, "");
};

var revEntityIconSelectionArea = async (revSelectEntityIconVarArgs) => {
    let revFilesSelectedCallback = revSelectEntityIconVarArgs.revFilesSelectedCallback;

    let revEntitySelectedIconsDrawId = "revEntitySelectedIconsDrawId_" + window.revGenUniqueId();

    revSelectEntityIconVarArgs["revFilesSelectedCallback"] = (revSelectedFiles) => {
        revFilesSelectedCallback({ "revSelectedFiles": revSelectedFiles, "revMainSelectedFileIndex": 0 });

        window.revSetInterval(revEntitySelectedIconsDrawId, () => {
            let revCheckBoxesArr = [];

            for (let i = 0; i < revSelectedFiles.length; i++) {
                let revIconImage = window.revReadFileToImageFromPath(revSelectedFiles[i], "revListingUserIconBlock");

                if (!revIconImage) return;

                let revSelectedIconCBId = i + "_revSelectedIconId_" + window.revGenUniqueId();
                revCheckBoxesArr.push(revSelectedIconCBId);

                let revCheckBoxCallback = (revCBVarArgs) => {
                    let revCheckBoxChecked = revCBVarArgs.revCheckBoxChecked;
                    let revCurrCheckBoxId = revCBVarArgs.revCheckBoxId;

                    let revMainSelectedFileIndex = -1;

                    if (revCheckBoxChecked) {
                        revMainSelectedFileIndex = revCheckBoxesArr.indexOf(revCurrCheckBoxId);
                    }

                    for (let cB = 0; cB < revCheckBoxesArr.length; cB++) {
                        if (revCheckBoxesArr[cB].localeCompare(revCurrCheckBoxId) == 0) {
                            continue;
                        }

                        document.getElementById(revCheckBoxesArr[cB]).checked = false;
                    }

                    revFilesSelectedCallback({ "revSelectedFiles": revSelectedFiles, "revMainSelectedFileIndex": revMainSelectedFileIndex });
                };

                let revCBVarArgs = {
                    "revCheckBoxCallback": revCheckBoxCallback,
                    "revCheckBoxId": revSelectedIconCBId,
                };

                let revSelectMainIconCheckBox = window.revGetCheckBox(revCBVarArgs);

                let revIconNodeView = `
                    <div class="revFlexContainer">
                        <div class="revSelectedIconImage">${revIconImage}</div>
                        <div class="revSelectedIconViewFooter">
                            ${revSelectMainIconCheckBox}
                        </div>
                    </div>
                    `;

                let revIconNode = document.createElement("div");
                revIconNode.classList.add("revSelectedIconView");
                revIconNode.innerHTML = revIconNodeView;

                document.getElementById(revEntitySelectedIconsDrawId).appendChild(revIconNode);
            }
        });
    };

    if (!revSelectEntityIconVarArgs.revEntityIconSelectDrawId) {
        return;
    }

    let revEntityIconSelectDrawId = revSelectEntityIconVarArgs.revEntityIconSelectDrawId;
    let revFileExplorerMenuItem = await window.revGetMenuItem("revMenuItemFileExplorerTab", revSelectEntityIconVarArgs);

    return `
        <div class="revFlexContainer">
            <div class="revFlexWrapper revSelectEntityIconWrapper">
                ${revFileExplorerMenuItem}
                <div id="${revEntityIconSelectDrawId}" class="revEntityIconSelectDraw"></div>
            </div>
            <div id="${revEntitySelectedIconsDrawId}" class="revFlexWrapper revFlexWrapperScroll"></div>
        </div>
    `;
};

var revGetTextInputVal = (revTextInputId) => {
    return document.getElementById(revTextInputId).value;
};

var revInputText = (revVarArgs) => {
    if (!revVarArgs.revId) {
        return JSON.stringify(revVarArgs);
    }

    let revId = revVarArgs.revId;

    let revIcon = "";
    if (revVarArgs.revIcon) {
        revIcon = revVarArgs.revIcon;
    }

    let revTextValue = "";
    if (revVarArgs.revTextValue) {
        revTextValue = revVarArgs.revTextValue;
    }

    let revTitle = "";
    if (revVarArgs.revTitle) {
        revTitle = revVarArgs.revTitle;
    }

    let revPlaceholderText = "";
    if (revVarArgs.revPlaceholderText) {
        revPlaceholderText = revVarArgs.revPlaceholderText;
    }

    let revBorderStyle = "revInputTextBorder_Bottom_Left";

    if (revVarArgs.revBorderStyle) {
        revBorderStyle = revVarArgs.revBorderStyle;
    }

    return `
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexContainer revRegStatusContainer_Edit">
            <div class="revRegStatusItemWrapper_Edit">
                <div class="revRegStatusItemIcon_Edit">${revIcon}</div>
                <div class="revRegStatusItemText_Edit"> ${revTitle}</div>
            </div>
            <div class="revInputContainer">
                <input type="text" id="${revId}" class="revInputText ${revBorderStyle}" value="${revTextValue}" placeholder="${revPlaceholderText}"><br>
            </div>
        </div>
    `;
};

var revInputText_Flat = (revVarArgs) => {
    if (!revVarArgs.revId) {
        return JSON.stringify(revVarArgs);
    }

    let revId = revVarArgs.revId;

    let revTextValue = "";
    if (revVarArgs.revTextValue) {
        revTextValue = revVarArgs.revTextValue;
    }

    let revTitle = "";
    if (revVarArgs.revTitle) {
        revTitle = revVarArgs.revTitle;
    }

    let revPlaceholderText = "";
    if (revVarArgs.revPlaceholderText) {
        revPlaceholderText = revVarArgs.revPlaceholderText;
    }

    let revBorderStyle = "revInputTextBorder_Bottom_Left";

    if (revVarArgs.revBorderStyle) {
        revBorderStyle = revVarArgs.revBorderStyle;
    }

    let revInputTextHeader = `
        <div class="revRegStatusItemWrapper_Edit">
            <span class="revRegStatusItemText_Edit"> ${revTitle}</span>
        </div>
        `;

    if (revVarArgs.revInputTextHeader) {
        revInputTextHeader = revVarArgs.revInputTextHeader;
    }

    return `
        <div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexContainer revRegStatusContainer_Edit">
            ${revInputTextHeader}
            <div class="revInputContainer">
                <input type="text" id="${revId}" class="revInputText ${revBorderStyle}" value="${revTextValue}" placeholder="${revPlaceholderText}"><br>
            </div>
        </div>
    `;
};

var revGetCheckBox = (revVarArgs) => {
    let revCheckBoxCallback = revVarArgs.revCheckBoxCallback;
    let revCheckBoxId = revVarArgs.revCheckBoxId;

    let revCBTxt = "";

    if (revVarArgs.revCBTxt) {
        let revCBTxt_Id = "revCBTxt_Id_" + window.revGenUniqueId();

        window.revSetInterval(revCBTxt_Id, () => {
            document.getElementById(revCBTxt_Id).addEventListener("click", (event) => {
                document.getElementById(revCheckBoxId).checked = !document.getElementById(revCheckBoxId).checked;

                revCheckBoxCallback({
                    "revCheckBoxChecked": document.getElementById(revCheckBoxId).checked == true,
                    "revCheckBoxId": revCheckBoxId,
                    "revCheckBoxVal": revCheckBoxVal,
                });
            });
        });

        revCBTxt = `<div id="${revCBTxt_Id}" class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revCBTxtWrapper">${revVarArgs.revCBTxt}</div>`;
    }

    let revCheckBoxVal;

    if (revVarArgs.revCheckBoxVal) {
        revCheckBoxVal = revVarArgs.revCheckBoxVal;
    }

    if (revVarArgs.revIsChecked) {
        window.revSetInterval(revCheckBoxId, () => {
            document.getElementById(revCheckBoxId).checked = true;
        });
    }

    window.revSetInterval(revCheckBoxId, () => {
        document.getElementById(revCheckBoxId).addEventListener("click", (event) => {
            revCheckBoxCallback({
                "revCheckBoxChecked": document.getElementById(revCheckBoxId).checked == true,
                "revCheckBoxId": revCheckBoxId,
                "revCheckBoxVal": revCheckBoxVal,
            });
        });
    });

    return `
    <div class="revFlexContainer revCheckboxContainer">
        <div class="revFlexWrapper revCBWrapper">
            <label class="revFlexContainer revCBContainer">
                <input id="${revCheckBoxId}" type="checkbox">
                <span class="checkmark"></span>
            </label>
            ${revCBTxt}
        </div>
    </div>
    `;
};

var revCheckBoxesToggler = (revVarArgs) => {
    let revCheckedIndex = -1;

    if (revVarArgs.revCheckBoxesArr && revVarArgs.revCheckedCheckBoxId) {
        let revCheckBoxesArr = revVarArgs.revCheckBoxesArr;
        let revCheckedCheckBoxId = revVarArgs.revCheckedCheckBoxId;

        revCheckedIndex = revCheckBoxesArr.indexOf(revCheckedCheckBoxId);

        for (let i = 0; i < revCheckBoxesArr.length; i++) {
            if (revCheckBoxesArr[i].localeCompare(revCheckedCheckBoxId) == 0) {
                continue;
            }

            document.getElementById(revCheckBoxesArr[i]).checked = false;
        }

        if (document.getElementById(revCheckedCheckBoxId).checked == false) revCheckedIndex = -1;
    }

    return revCheckedIndex;
};

var revFormSubmitTab = (revVarArgs) => {
    if (!revVarArgs.revId || revVarArgs.revId.localeCompare("") == 0) return;
    let revId = revVarArgs.revId;

    if (!revVarArgs.revSubmitCallback) return;
    let revSubmitCallback = revVarArgs.revSubmitCallback;
    window.revSetInterval(revId, () => {
        document.getElementById(revId).addEventListener("click", async (event) => {
            await revSubmitCallback();
        });
    });

    let revTitle = "Submit";
    if (revVarArgs.revTitle && "".localeCompare(revVarArgs.revTitle) !== 0) revTitle = revVarArgs.revTitle;

    let revIcon = "";
    if (revVarArgs.revIcon) {
        revIcon = `<div class="revSubmitTabIcon">${revVarArgs.revIcon}</div>`;
    }

    let revFormSubmitTab = `
        <div id="${revId}" class="revTabLink revFlexWrapper revSubmitTabWrapper">
            <div class="revSmalllBoldBlue">${revTitle}</div>
            <div class="revSubmitTabIcon">
                ${revIcon}
            </div>
        </div>
    `;

    return revFormSubmitTab;
};

var revSubmitTabCurvedPointerRight = (revVarArgs) => {
    if (!revVarArgs.revId || revVarArgs.revId.localeCompare("") == 0) return;
    let revId = revVarArgs.revId;

    if (!revVarArgs.revSubmitCallback) return;
    let revSubmitCallback = revVarArgs.revSubmitCallback;
    window.revSetInterval(revId, () => {
        document.getElementById(revId).addEventListener("click", async (event) => {
            await revSubmitCallback();
        });
    });

    let revTitle = "Submit";
    if (revVarArgs.revTitle && "".localeCompare(revVarArgs.revTitle) !== 0) revTitle = revVarArgs.revTitle;

    return `
    <div id="${revId}" class="revTabLink revFlexWrapper revSubmitTabCurvedPointerRightWrapper">
        <div class="revSmalllBoldWhite revSubmitTabCurvedPointerRightTabTxt">${revTitle}</div>
        <div class="revFontSiteBlueTxtColor revFontSizeNormal"><i class="fa fa-arrow-right"></i></div>
    </div>
    `;
};

var revDropdownMenu = async (revVarArgs) => {
    let revText = "";

    if (!window.revIsEmptyVar(revVarArgs.revText)) {
        revText = `<span class="revFontSiteBlueTxtColor revDropdownMenuTxt">${revVarArgs.revText}</span>`;
    }

    let revMenuAreaViewName = "";
    let revData;

    if (revVarArgs.revData) {
        revData = revVarArgs.revData;
    }

    if (revVarArgs.revMenuAreaViewName) {
        revMenuAreaViewName = revVarArgs.revMenuAreaViewName;
    }

    let revMenuItemsArr;
    let revMenuItemsContainer;

    if (revVarArgs.revMenuItemsArr) {
        revMenuItemsArr = revVarArgs.revMenuItemsArr;
        revMenuItemsContainer = `<div class="revFlexContainer">${revMenuItemsArr.join("")}</div>`;
    } else {
        revMenuItemsArr = window.revGetMenuMenuAreaMenuItemsArr(revMenuAreaViewName, window.REV_LOADED_MENU_ITEMS);
        revMenuItemsContainer = await window.revDrawMenuItems(revMenuItemsArr, revData);
        revMenuItemsContainer = revMenuItemsContainer.join("");
    }

    let revMenuAreaContainerContainerHeight = window.revGetPageHeight() * 0.72;

    let revMenuAreaContainer = `
    <div class="dropdown">
        <a class="dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${revText}<i class="fas fa-level-down-alt"></i></a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" style="max-height: ${revMenuAreaContainerContainerHeight}px;">
            ${revMenuItemsContainer}
        </div>
    </div>
    `;

    return revMenuAreaContainer;
};

var revVisualizerLoadingBlinker = () => {
    return `
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-light" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-dark" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    `;
};

var revSmallDividerWrapper = () => {
    return `
        <div class="revFlexWrapper revSmallDividerWrapper">
            <div class="revSmall-H-Line"></div>
            <div class="revTiny-V-Line"></div>
            <div class="revSmall-H-Line"></div>
        </div>
    `;
};

var revSmallDividerWrapper_BorderRight = () => {
    return `
        <div class="revFlexWrapper revSmallDividerWrapper">
            <div class="revSmall-H-Line"></div>
            <div class="revTiny-V-Line"></div>
        </div>
    `;
};

var revSmallDividerWrapper_BorderLeft = () => {
    return `
        <div class="revFlexWrapper revSmallDividerWrapper">
            <div class="revTiny-V-Line"></div>
            <div class="revSmall-H-Line"></div>
        </div>
    `;
};

var revSmallDividerWrapper_BorderLeft_1em = () => {
    return `
        <div class="revFlexWrapper revSmallDividerWrapper_NoPad">
            <div class="revSmall-V-Line-1em"></div>
            <div class="revSmall-H-Line"></div>
        </div>
    `;
};
