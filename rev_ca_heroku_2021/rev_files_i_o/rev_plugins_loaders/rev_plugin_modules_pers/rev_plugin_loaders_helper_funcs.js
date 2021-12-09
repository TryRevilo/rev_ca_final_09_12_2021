const fs = require("fs");
const path = require("path");

var revRemoveAllWhiteSpaces = (revStr) => {
    if (!revStr) return "";

    revStr = revStr.replace(/\s/g, "");
    return revStr;
};

var revStringEmpty = (revString) => {
    return !revString || !revString.length || revRemoveAllWhiteSpaces(revString) == "";
};

var revIsNameIdAdded = (revPluginHookContextRemoteContainer, revNameID) => {
    return revPluginHookContextRemoteContainer.some((item) => {
        return item.revNameID == revNameID;
    });
};

var revLoadCSS = (revPluginView) => {
    let revBaseModulesPath = path.resolve("../../rev_ca_react_web/public/rev_mod");

    if (revPluginView.revCSSFiles && revPluginView.revCSSFiles.length) {
        for (let f = 0; f < revPluginView.revCSSFiles.length; f++) {
            let revCSSPath = revPluginView.revCSSFiles[f];
            revCSSPath = revBaseModulesPath + revCSSPath;

            // try {
            //     let revData = fs.readFileSync(revCSSPath, "utf8");

            //     if (revData) {
            //         let revCSS = { "revCSSModuleName": revPluginView.revNameId, "revCSS": revData.replace(/\r|\n/g, "") };
            //         revPluginView["revCSSModules"] = [revCSS];
            //     }
            // } catch (error) {
            //     console.log("ERR -> revLoadCSS - > " + error);
            // }
        }
    }
};

var revAsyncFunctionInit = (revFuncString) => {
    if (revStringEmpty(revFuncString)) {
        return null;
    }

    let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));

    let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

    if (revStringEmpty(revFuncBody)) {
        return null;
    }

    let revFunc = new AsyncFunction("revVarArgs", revFuncBody);

    return revFunc;
};

var revFunctionInit = (revFuncString) => {
    if (revStringEmpty(revFuncString)) {
        return null;
    }

    let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));

    if (revStringEmpty(revFuncBody)) {
        return null;
    }

    let revFunc = new Function("revVarArgs", revFuncBody);

    return revFunc;
};

module.exports.revIsNameIdAdded = revIsNameIdAdded;

module.exports.revLoadCSS = revLoadCSS;

module.exports.revAsyncFunctionInit = revAsyncFunctionInit;
module.exports.revFunctionInit = revFunctionInit;
