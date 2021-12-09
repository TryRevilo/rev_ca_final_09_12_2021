var revAsyncFunctionInit = (revFuncString) => {
    if (window.revStringEmpty(revFuncString)) {
        return null;
    }

    let revFuncBody = revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));

    let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

    if (window.revStringEmpty(revFuncBody)) {
        return null;
    }

    let revFunc = new AsyncFunction("revVarArgs", revFuncBody);

    return revFunc;
};

var revNodeToString = (revNode) => {
    if (!revNode || revNode == null) {
        return "";
    }

    let revTempNode = document.createElement("div");
    revTempNode.appendChild(revNode.cloneNode(true));

    let revHTMLStr = revTempNode.innerHTML;
    revTempNode = revNode = null; // prevent memory leaks in IE

    return revHTMLStr;
};

var revStringToHTMLNode = (stringHTML) => {
    let div = document.createElement("div");
    div.innerHTML = stringHTML.trim();

    return div.firstChild;
};

var revCloneJsArr = (revJsArr) => {
    let revCloneJsArr = [];

    for (let i = 0; i < revJsArr.length; i++) {
        revCloneJsArr.push(revJsArr[i]);
    }

    return revCloneJsArr;
};

var revCloneJsObject = (revJsONObject) => {
    if (window.revIsEmptyJSONObject(revJsONObject)) {
        console.log("revJsONObject : " + JSON.stringify(revJsONObject));

        return null;
    }

    return JSON.parse(JSON.stringify(revJsONObject));
};

var revIsEmptyJSONObject = (obj) => {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
};

var revIsEmptyVar = (v) => {
    let type = typeof v;

    if (type === "undefined") {
        return true;
    }

    if (type === "boolean") {
        return !v;
    }

    if (v === null) {
        return true;
    }

    if (v === undefined) {
        return true;
    }

    if (v instanceof Array) {
        if (v.length < 1) {
            return true;
        }
    } else if (type === "string") {
        if (v.length < 1) {
            return true;
        }
        if (v === "0") {
            return true;
        }
    } else if (type === "object") {
        if (Object.keys(v).length < 1) {
            return true;
        }
    } else if (type === "number") {
        if (v === 0) {
            return true;
        }
    }

    return false;
};

var revGenUniqueId = () => {
    let revMin = 1;
    let revMax = new Date().getTime();
    let revRand = Math.floor(Math.random() * (revMax - revMin + 1) + revMin);

    return revRand;
};

var revGetFuncBody = (revFuncString) => {
    if (window.revIsEmptyVar(revFuncString)) {
        return;
    }

    return revFuncString.slice(revFuncString.indexOf("{") + 1, revFuncString.lastIndexOf("}"));
};

var revInitFunction = async (revFuncBodyString, revVarArgs) => {
    let AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

    let revFunc = new AsyncFunction("revVarArgs", revFuncBodyString);

    let revFuncRetVal;

    try {
        revFuncRetVal = await revFunc(revVarArgs);
    } catch (error) {
        console.log("ERR -> revInitFunction -> " + error);
        console.log("ERR\n\t" + revFuncBodyString);
    }

    return revFuncRetVal;
};

var revInitHookHandlers = async (revHookName, revPluginHookHandlersArr, revVarArgs) => {
    for (let i = 0; i < revPluginHookHandlersArr.length; i++) {
        let revPluginHookName = revPluginHookHandlersArr[i].revPluginHookName;

        if (revPluginHookName.localeCompare(revHookName) == 0) {
            let revHandler = revPluginHookHandlersArr[i].revHandler;
            let revHandlerFuncBody = revGetFuncBody(revHandler);

            if (window.revIsEmptyVar(revHandlerFuncBody)) {
                return revVarArgs;
            }

            revVarArgs = await revInitFunction(revHandlerFuncBody, revVarArgs);
        }
    }

    return revVarArgs;
};

var revInitPluginHookHandlers = async (revHookName, revEntityPlugins, revVarArgs) => {
    for (let p = 0; p < revEntityPlugins.length; p++) {
        let revPlugin = revEntityPlugins[p];

        if (!revPlugin || !revPlugin.revPluginHookHandlers) {
            continue;
        }

        let revPluginHookHandlers = revPlugin.revPluginHookHandlers;

        for (let i = 0; i < revPluginHookHandlers.length; i++) {
            if (!revPluginHookHandlers[i] || !revPluginHookHandlers[i].revPluginHookHandlersArr) {
                continue;
            }

            let revPluginHookHandlersArr = revPluginHookHandlers[i].revPluginHookHandlersArr;

            for (let h = 0; h < revPluginHookHandlersArr.length; h++) {
                if (!revPluginHookHandlersArr[h] || !revPluginHookHandlersArr[h].revPluginHookName) {
                    continue;
                }

                let revPluginHookName = revPluginHookHandlersArr[h].revPluginHookName;

                if (revPluginHookName.localeCompare(revHookName) == 0) {
                    let revHandler = revPluginHookHandlersArr[h].revHandler;
                    let revHandlerFuncBody = revGetFuncBody(revHandler);

                    revVarArgs = await revInitFunction(revHandlerFuncBody, revVarArgs);
                }
            }
        }
    }

    return revVarArgs;
};

var revGetPageWidth = () => {
    let revPageWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;

    return revPageWidth;
};

var revGetPageHeight = () => {
    let height = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;

    return height;
};

var revStringEmpty = (revString) => {
    return !revString || !revString.length || window.revRemoveAllWhiteSpaces(revString) == "";
};

var revRemoveLineBreaks = (revHTMLString) => {
    if (!revHTMLString) {
        return "";
    }

    revHTMLString = revHTMLString.replace(/<p>/g, " ");
    revHTMLString = revHTMLString.replace(/<br>/g, " ");
    revHTMLString = revHTMLString.replace(/<\/p>/g, " ");

    revHTMLString = revHTMLString.replace(/  /g, " ");

    return revHTMLString;
};

var revEscapeHtml = (revUnsafe) => {
    return revUnsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};

var revIsEmptyHTML = (revHTMLString) => {
    if (!revHTMLString) {
        return true;
    }

    revHTMLString = revHTMLString.replace(/(\r\n|\n|\r)/gm, "");

    revHTMLString = revHTMLString.replace(/<p>/g, "");
    revHTMLString = revHTMLString.replace(/<br>/g, "");
    revHTMLString = revHTMLString.replace(/<\/p>/g, "");

    return !revHTMLString || !revHTMLString.length || window.revStringEmpty(revHTMLString);
};

var revTruncateString = (revStr, revLen, revIncludeHellipse) => {
    if (window.revStringEmpty(revStr)) {
        return "";
    }

    let revHellipse = " &hellip;";

    if (revIncludeHellipse == false) {
        revHellipse = "";
    }

    return revStr.length > revLen ? revStr.substr(0, revLen - 1) + revHellipse : revStr;
};

var revRemoveAllWhiteSpaces = (revStr) => {
    if (!revStr) {
        return "";
    }

    revStr = revStr.replace(/\s/g, "");
    return revStr;
};

var revGetRawHTML = (revStr) => {
    revStr = revStr.replace(/&/gi, "&amp;");
    revStr = revStr.replace(/</gi, "&lt;");

    return revStr;
};

var revGetFileType = (revFile) => {
    let filename = revFile.name;
    let revFileType = filename.slice((Math.max(0, filename.lastIndexOf(".")) || Infinity) + 1);

    return revFileType;
};

var revGetFileObjectSubType = (revFile) => {
    let revFileType = window.revGetFileType(revFile);

    if (!revFileType) {
        return;
    }

    let revEntitySubType;

    switch (revFileType) {
        case "jpg":
        case "jpeg":
        case "png":
            revEntitySubType = "rev_file";
            break;

        case "mp4":
        case "MOV":
        case "WMV":
        case "AVI":
        case "AVCHD":
        case "FLV":
        case "F4V":
        case "SWF":
        case "MKV":
        case "mkv":
        case "WEBM":
        case "HTML5":
        case "MPEG-2":
            revEntitySubType = "rev_video";
            break;

        case "mp3":
            revEntitySubType = "rev_audio";
            break;

        default:
            revEntitySubType = "rev_file";
    }

    console.log("revEntitySubType : " + revEntitySubType);

    return revEntitySubType;
};

var revSetInterval = (revElementID, revCallback) => {
    if (!revElementID) {
        console.log("ERR -> !revElementID : -> " + revElementID);
        return;
    }

    let checkExist = setInterval(function () {
        if ($("#" + revElementID) && $("#" + revElementID).length) {
            revCallback();
            clearInterval(checkExist);
        }
    }, 100);
};

var revSetIntervalMulti = (revElementIdsArr, revCallback) => {
    let i = revElementIdsArr.length;

    for (let i = 0; i < revElementIdsArr.length; i++) {
        let revCurrElementId = revElementIdsArr[i];

        if (window.revIsDomElementIdExists(revCurrElementId)) {
            window.revRemoveArrElement(revElementIdsArr, revCurrElementId);
        }

        if (!revCurrElementId) {
            revElementIdsArr.splice(i, 1);

            continue;
        }

        let checkExist = setInterval(function () {
            if ($("#" + revCurrElementId) && $("#" + revCurrElementId).length) {
                window.revRemoveArrElement(revElementIdsArr, revCurrElementId);
                clearInterval(checkExist);
            }

            if (!revElementIdsArr.length) {
                revCallback();
            }
        }, 100);
    }
};

var revSetIntervalBoolean = (revBooleanCallback, revCallback) => {
    let checkExist = setInterval(function () {
        if (revBooleanCallback()) {
            revCallback();
            clearInterval(checkExist);
        }
    }, 100);
};

var revGetElementById = (revId) => {
    return document.getElementById(revId);
};

var revFormatLongDate = (revLongDate) => {
    if (!revLongDate || parseInt(revLongDate) < 1) {
        return " ( !TimE uNsET ) ";
    }

    return window.revFormatDate(new Date(parseInt(revLongDate)), "dddd h:mmtt d MMM yyyy");
};

var revFormatDate = (date, format, utc) => {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
};

/** REV START ARR FUNCS */

var revGetElementArrElement = (revArr, revVal) => {
    let revArrElement;

    for (let i = 0; i < revArr.length; i++) {
        if (revArr[i] == revVal) {
            revArrElement = revArr[i];
            break;
        }
    }

    return revArrElement;
};

var revArrIncludesElement = (revArr, revVal) => {
    let revIncludesElement = false;

    for (let i = 0; i < revArr.length; i++) {
        if (revArr[i] == revVal) {
            revIncludesElement = true;
            break;
        }
    }

    return revIncludesElement;
};

var revIsDuplicateInArr = (revArr, revElement) => {
    let revDuplicatesArr = [];

    for (let i = 0; i < revArr.length; i++) {
        let revCurrVal = revArr[i];

        if (revCurrVal.localeCompare(revElement) == 0) {
            revDuplicatesArr.push(revCurrVal);
        }
    }

    return revDuplicatesArr.length > 1;
};

var revRemoveArrElement = (revArr, revVal) => {
    let revRemovedVal;

    let i = 0;
    while (i < revArr.length) {
        if (revArr[i] == revVal) {
            revRemovedVal = revArr.splice(i, 1);
            {
                continue;
            }
        }

        ++i;
    }

    return revRemovedVal;
};

var revJSONArrContains_NameId = (revJSONArr, revKey, revNameIdCheck) => {
    revNameIdCheck = revNameIdCheck + "";

    let revInJSONArr = false;

    if (window.revIsEmptyVar(revJSONArr)) {
        return revInJSONArr;
    }

    for (let i = 0; i < revJSONArr.length; i++) {
        let revCurrItem = revJSONArr[i];

        if (window.revIsEmptyJSONObject(revCurrItem)) {
            continue;
        }

        let revCurrItemKey = revCurrItem[revKey] + "";

        if (revCurrItemKey && revCurrItemKey.localeCompare(revNameIdCheck) == 0) {
            revInJSONArr = true;
            break;
        }
    }

    return revInJSONArr;
};
