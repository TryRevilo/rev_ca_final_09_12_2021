const rev_strings_helper_funcs = require("../rev_helper_functions/rev_strings_helper_funcs");
var rev_json_functions = require("../rev_helper_functions/rev_json_functions");
var rev_plugins_objects = require("../rev_files_i_o/rev_plugins_loaders/rev_plugins_objects");

let REV_GET_DEFAULT_PERM_EXPO_SETTINGS = () => {
    return {
        "revWriter": 1,
        "revReader": 1,
        "revDataObjectPluginOwnerGUID": 1,
        "revIsWritable": false,
        "revIsReadable": true,
    };
};

var revIsValidDataType = (revValue) => {
    let revType = typeof revValue;

    return revType == "string" || revType == "number" || revType == "number" || revType == "boolean";
};

var revCacheDataObjectInit = (revVarArgs) => {
    /** REV START CHECK LOGGED IN ENTITY GUID */
    if (!revVarArgs.revLoggedInEntityGUID || revVarArgs.revLoggedInEntityGUID < 1) {
        return { "ERR": { "revVarArgs.revLoggedInEntityGUID": revVarArgs.revLoggedInEntityGUID } };
    }
    /** REV END CHECK LOGGED IN ENTITY GUID */

    /** REV START CHECK OWNER ENTITY GUID */
    if (!revVarArgs.revDataObjectPluginOwnerGUID || revVarArgs.revDataObjectPluginOwnerGUID < 1) {
        revVarArgs["revDataObjectPluginOwnerGUID"] = revVarArgs.revLoggedInEntityGUID;
    }
    /** REV END CHECK OWNER ENTITY GUID */

    /** REV START CHECK ENTITY GUID */
    if (!revVarArgs.revEntityGUID || revVarArgs.revEntityGUID < 1) {
        return { "ERR": { "revVarArgs.revEntityGUID": revVarArgs.revEntityGUID } };
    }
    /** REV END CHECK ENTITY GUID */

    /** REV START CHECK SESSION ID */
    if (!revVarArgs.revSessionId) {
        return { "ERR": { "revVarArgs.revSessionId": revVarArgs.revSessionId } };
    }
    /** REV END CHECK SESSION ID */

    /** REV START CHECK DATA OBJECT ID */
    if (!revVarArgs.revDataObjectId) {
        return { "ERR": { "revVarArgs.revDataObjectId": revVarArgs.revDataObjectId } };
    }
    /** REV END CHECK DATA OBJECT ID */

    if (!revVarArgs.revDataObjectValIdsArr && !revVarArgs.revDataObjectUpdateVals) {
        return { "ERR": { "revVarArgs.revDataObjectValIdsArr": revVarArgs.revDataObjectValIdsArr, "revVarArgs.revDataObjectUpdateVals": revVarArgs.revDataObjectUpdateVals } };
    }

    let revSessionId = revVarArgs.revSessionId;

    let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;
    let revEntityGUID = revVarArgs.revEntityGUID;

    let revDataObjectId = revVarArgs.revDataObjectId;

    if (revDataObjectId.length >= 64) {
        return { "Err": revDataObjectId + " : Too long. Max length is 64" };
    }

    if (!rev_json_functions.revIsEmptyJSONObject(rev_plugins_objects.revPluginsObjects.revPluginDataObjects[revDataObjectId])) {
        return rev_plugins_objects.revPluginsObjects.revPluginDataObjects[revDataObjectId];
    }

    let revPermExpoSettings = REV_GET_DEFAULT_PERM_EXPO_SETTINGS();

    revPermExpoSettings["revDataObjectPluginOwnerGUID"] = revVarArgs.revDataObjectPluginOwnerGUID;

    if (revVarArgs.revWriter) {
        revPermExpoSettings["revWriter"] = revVarArgs.revWriter;
    }

    if (revVarArgs.revReader) {
        revPermExpoSettings["revReader"] = revVarArgs.revReader;
    }

    if (!rev_strings_helper_funcs.revIsEmptyVar(revVarArgs.revIsWritable)) {
        revPermExpoSettings["revIsWritable"] = revVarArgs.revIsWritable;
    }

    if (!rev_strings_helper_funcs.revIsEmptyVar(revVarArgs.revIsReadable)) {
        revPermExpoSettings["revIsReadable"] = revVarArgs.revIsReadable;
    }

    let revDataObjectVals = {};

    let revDataObject = {
        "revDataObjectId": revDataObjectId,
        "revPermExpoSettings": revPermExpoSettings,
        "revDataObjectVals": {},
    };

    if (revVarArgs.revDataObjectValIdsArr) {
        let revDataObjectValIdsArr = revVarArgs.revDataObjectValIdsArr;

        for (let i = 0; i < revDataObjectValIdsArr.length; i++) {
            let revCurrDataObjectValId = revDataObjectValIdsArr[i];

            if (revCurrDataObjectValId.length >= 32) {
                continue;
            }

            revDataObject.revDataObjectVals[revCurrDataObjectValId] = "";

            if (i == 19) {
                break;
            }
        }
    } else {
        let revDataObjectUpdateVals = revVarArgs.revDataObjectUpdateVals;

        for (let revCurrDataObjectUpdateValId in revDataObjectUpdateVals) {
            if (revCurrDataObjectUpdateValId.localeCompare("revPermExpoSettings") == 0 || revCurrDataObjectUpdateValId.localeCompare("revDataObjectId") == 0) {
                continue;
            }

            let revCurrDataObjectUpdateVal = revDataObjectUpdateVals[revCurrDataObjectUpdateValId];

            if (!revIsValidDataType(revCurrDataObjectUpdateVal)) {
                revDataObject.revDataObjectVals[revCurrDataObjectUpdateValId] = "ERR! You can only set string data types";
                continue;
            }

            if (revCurrDataObjectUpdateVal.length > 64) {
                revDataObject.revDataObjectVals[revCurrDataObjectUpdateValId] = `ERR! ${rev_strings_helper_funcs.revTruncateString(revCurrDataObjectUpdateVal, 22)} : > length > 64`;
                continue;
            }

            revDataObject.revDataObjectVals[revCurrDataObjectUpdateValId] = revDataObjectUpdateVals[revCurrDataObjectUpdateValId];
        }
    }

    rev_plugins_objects.revPluginsObjects.revPluginDataObjects[revDataObjectId] = { [revEntityGUID]: revDataObject };

    return revDataObject;
};

var revGetPluginsObject = (revVarArgs) => {
    if (!revVarArgs || rev_json_functions.revIsEmptyJSONObject(revVarArgs)) {
        console.log(`revVarArgs : ${revVarArgs}`);

        return;
    }

    if (!revVarArgs.revDataObjectId) {
        console.log(`revVarArgs.revDataObjectId : ${revVarArgs.revDataObjectId}`);

        return;
    }

    if (!revVarArgs.revDataObjectId) {
        console.log(`revVarArgs.revDataObjectId : ${revVarArgs.revDataObjectId}`);

        return;
    }

    /** REV START CHECK LOGGED IN ENTITY GUID */
    if (!revVarArgs.revLoggedInEntityGUID || revVarArgs.revLoggedInEntityGUID < 1) {
        console.log(`!revVarArgs.revLoggedInEntityGUID || revVarArgs.revLoggedInEntityGUID < 1`);

        return;
    }
    /** REV END CHECK LOGGED IN ENTITY GUID */

    /** REV START CHECK SESSION ID */
    if (!revVarArgs.revSessionId) {
        console.log(`revVarArgs.revSessionId : ${revVarArgs.revSessionId}`);

        return;
    }
    /** REV END CHECK SESSION ID */

    let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;
    let revSessionId = revVarArgs.revSessionId;
    let revDataObjectId = revVarArgs.revDataObjectId;
    let revEntityGUID = revVarArgs.revEntityGUID;

    if (!rev_plugins_objects.revPluginsObjects.revPluginDataObjects.hasOwnProperty(revDataObjectId) || !rev_plugins_objects.revPluginsObjects.revPluginDataObjects[revDataObjectId].hasOwnProperty(revEntityGUID)) {
        return;
    } else {
        return rev_plugins_objects.revPluginsObjects.revPluginDataObjects[revDataObjectId][revEntityGUID];
    }
};

var revGetCachedPluginsObjectVals = (revVarArgs) => {
    if (!revVarArgs || rev_json_functions.revIsEmptyJSONObject(revVarArgs)) {
        console.log(`revVarArgs : ${revVarArgs}`);

        return;
    }

    if (!revVarArgs.revDataObjectId) {
        console.log(`revVarArgs.revDataObjectId : ${revVarArgs.revDataObjectId}`);

        return;
    }

    if (!revVarArgs.revDataObjectId) {
        console.log(`revVarArgs.revDataObjectId : ${revVarArgs.revDataObjectId}`);

        return;
    }

    if (!revVarArgs.revDataObjectValIdsArr) {
        console.log(`revVarArgs.revDataObjectValIdsArr : ${revVarArgs.revDataObjectValIdsArr}`);

        return;
    }

    /** REV START CHECK LOGGED IN ENTITY GUID */
    if (!revVarArgs.revLoggedInEntityGUID || revVarArgs.revLoggedInEntityGUID < 1) {
        console.log(`!revVarArgs.revLoggedInEntityGUID || revVarArgs.revLoggedInEntityGUID < 1`);

        return;
    }
    /** REV END CHECK LOGGED IN ENTITY GUID */

    /** REV START CHECK SESSION ID */
    if (!revVarArgs.revSessionId) {
        console.log(`revVarArgs.revSessionId : ${revVarArgs.revSessionId}`);

        return;
    }
    /** REV END CHECK SESSION ID */

    let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;
    let revSessionId = revVarArgs.revSessionId;
    let revDataObjectId = revVarArgs.revDataObjectId;
    let revEntityGUID = revVarArgs.revEntityGUID;
    let revDataObjectValId = revVarArgs.revDataObjectValId;
    let revDataObjectValIdsArr = revVarArgs.revDataObjectValIdsArr;

    let revDataObject = revGetPluginsObject(revVarArgs);

    if (rev_strings_helper_funcs.revIsEmptyVar(revDataObject) || rev_strings_helper_funcs.revIsEmptyVar(revDataObject.revPermExpoSettings)) {
        return;
    }

    let revPermExpoSettings = revDataObject.revPermExpoSettings;

    if (!revPermExpoSettings.revIsReadable) {
        if (revPermExpoSettings.revDataObjectPluginOwnerGUID !== revLoggedInEntityGUID) {
            console.log("revPermExpoSettings.revIsReadable : " + revPermExpoSettings.revIsReadable);
            return;
        }
    }

    let revDataObjectVals = revDataObject.revDataObjectVals;

    let revRetDataObjectVals = {};

    for (let i = 0; i < revDataObjectValIdsArr.length; i++) {
        let revCurrDataObjectValId = revDataObjectValIdsArr[i] + "";

        if (rev_strings_helper_funcs.revIsEmptyVar(revCurrDataObjectValId) || revCurrDataObjectValId.localeCompare("revPermExpoSettings") == 0 || revCurrDataObjectValId.localeCompare("revDataObjectId") == 0) {
            continue;
        }

        revRetDataObjectVals[revCurrDataObjectValId] = revDataObjectVals[revCurrDataObjectValId];
    }

    return revRetDataObjectVals;
};

var revSetCaheDataObjectVals = (revVarArgs) => {
    /** REV START CHECK LOGGED IN ENTITY GUID */
    if (!revVarArgs.revLoggedInEntityGUID || revVarArgs.revLoggedInEntityGUID < 1) {
        return { "ERR_LOG_IN": `You have to be Logged In to Edit this entity's data values` };
    }
    /** REV END CHECK LOGGED IN ENTITY GUID */

    if (!revVarArgs.revDataObjectUpdateVals) {
        return;
    }

    let revDataObjectUpdateVals = revVarArgs.revDataObjectUpdateVals;

    let revDataObject = revGetPluginsObject(revVarArgs);

    if (rev_strings_helper_funcs.revIsEmptyVar(revDataObject)) {
        revDataObject = revCacheDataObjectInit(revVarArgs);
    }

    let revPermExpoSettings = revDataObject.revPermExpoSettings;

    if (!revPermExpoSettings.revIsWritable) {
        let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;

        if (revPermExpoSettings.revDataObjectPluginOwnerGUID !== revLoggedInEntityGUID) {
            return { "ERR -> ": `You do not have permission to Edit this entity's data values` };
        }
    }

    let revDataObjectVals = revDataObject.revDataObjectVals;

    let revRetSetDataObjects = {};

    for (let revCurrDataObjectUpdateValId in revDataObjectUpdateVals) {
        if (revCurrDataObjectUpdateValId.localeCompare("revPermExpoSettings") == 0 || revCurrDataObjectUpdateValId.localeCompare("revDataObjectId") == 0) {
            continue;
        }

        let revCurrDataObjectUpdateVal = revDataObjectUpdateVals[revCurrDataObjectUpdateValId];

        if (!revIsValidDataType(revCurrDataObjectUpdateVal)) {
            revRetSetDataObjects[revCurrDataObjectUpdateValId] = "ERR! You can only set string data types";
            continue;
        }

        if (revCurrDataObjectUpdateVal.length > 64) {
            revRetSetDataObjects[revCurrDataObjectUpdateValId] = `ERR! ${rev_strings_helper_funcs.revTruncateString(revCurrDataObjectUpdateVal, 22)} : > length > 64`;
            continue;
        }

        if (revDataObjectVals.hasOwnProperty(revCurrDataObjectUpdateValId)) {
            revDataObjectVals[revCurrDataObjectUpdateValId] = revDataObjectUpdateVals[revCurrDataObjectUpdateValId];

            revRetSetDataObjects[revCurrDataObjectUpdateValId] = revDataObjectUpdateVals[revCurrDataObjectUpdateValId];
        }
    }

    return revRetSetDataObjects;
};

module.exports.revCacheDataObjectInit = revCacheDataObjectInit;
module.exports.revGetCachedPluginsObjectVals = revGetCachedPluginsObjectVals;
module.exports.revSetCaheDataObjectVals = revSetCaheDataObjectVals;
