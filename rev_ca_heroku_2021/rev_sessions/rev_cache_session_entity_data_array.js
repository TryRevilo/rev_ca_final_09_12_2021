const rev_strings_helper_funcs = require("../rev_helper_functions/rev_strings_helper_funcs");
var rev_json_functions = require("../rev_helper_functions/rev_json_functions");
var rev_plugins_objects = require("../rev_files_i_o/rev_plugins_loaders/rev_plugins_objects");

let REV_GET_DEFAULT_PERM_EXPO_SETTINGS = () => {
    return {
        "revWriter": 1,
        "revReader": 1,
        "revPluginDataArrayOwnerGUID": 1,
        "revIsWritable": false,
        "revIsReadable": true,
    };
};

var revIsValidDataType = (revValue) => {
    let revType = typeof revValue;

    return revType == "string" || revType == "number" || revType == "number" || revType == "boolean";
};

var revCacheDataArrayInit = (revVarArgs) => {
    /** REV START CHECK LOGGED IN ENTITY GUID */
    if (!revVarArgs.revLoggedInEntityGUID || revVarArgs.revLoggedInEntityGUID < 1) {
        console.log(`revVarArgs.revLoggedInEntityGUID : ${revVarArgs.revLoggedInEntityGUID}`);

        return;
    }
    /** REV END CHECK LOGGED IN ENTITY GUID */

    /** REV START CHECK OWNER ENTITY GUID */
    if (!revVarArgs.revPluginDataArrayOwnerGUID || revVarArgs.revPluginDataArrayOwnerGUID < 1) {
        console.log(`revVarArgs.revPluginDataArrayOwnerGUID : ${revVarArgs.revPluginDataArrayOwnerGUID}`);

        return;
    }
    /** REV END CHECK OWNER ENTITY GUID */

    /** REV START CHECK ENTITY GUID */
    if (!revVarArgs.revEntityGUID || revVarArgs.revEntityGUID < 1) {
        console.log(`revVarArgs.revEntityGUID : ${revVarArgs.revEntityGUID}`);

        return;
    }
    /** REV END CHECK ENTITY GUID */

    /** REV START CHECK SESSION ID */
    if (!revVarArgs.revSessionId) {
        console.log(`revVarArgs.revSessionId : ${revVarArgs.revSessionId}`);

        return;
    }
    /** REV END CHECK SESSION ID */

    /** REV START CHECK DATA OBJECT ID */
    if (!revVarArgs.revDataArrayId) {
        console.log("revVarArgs : " + JSON.stringify(revVarArgs));

        console.log(`revVarArgs.revDataArrayId : ${revVarArgs.revDataArrayId}`);

        return;
    }
    /** REV END CHECK DATA OBJECT ID */

    let revSessionId = revVarArgs.revSessionId;

    let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;
    let revDataArrayId = revVarArgs.revDataArrayId;

    if (revDataArrayId.length >= 64) {
        return { "Err": revDataArrayId + " : Too long. Max length is 256" };
    }

    if (!rev_json_functions.revIsEmptyJSONObject(rev_plugins_objects.revPluginsObjects.revPluginDataArrays[revDataArrayId])) {
        return { "Err": "An Array with that ID already exists" };
    }

    let revPermExpoSettings = REV_GET_DEFAULT_PERM_EXPO_SETTINGS();

    revPermExpoSettings["revPluginDataArrayOwnerGUID"] = revVarArgs.revPluginDataArrayOwnerGUID;

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

    let revDataObject = {
        "revDataArrayId": revDataArrayId,
        "revPermExpoSettings": revPermExpoSettings,
        "revDataArrayVals": [],
    };

    let revRetDataArrayVals = {};

    if (revVarArgs.revDataObjectUpdateVals) {
        let revDataObjectUpdateVals = revVarArgs.revDataObjectUpdateVals;

        for (let i = 0; i < revDataObjectUpdateVals.length; i++) {
            let revCurrDataObjectUpdateVal = revDataObjectUpdateVals[i];

            if (!revIsValidDataType(revCurrDataObjectUpdateVal)) {
                revRetDataArrayVals[i] = `ERR! You can only set string data types`;
                continue;
            }

            if (revCurrDataObjectUpdateVal.length > 64) {
                revRetDataArrayVals[i] = `ERR! ${rev_strings_helper_funcs.revTruncateString(revCurrDataObjectUpdateVal, 22)} : > length > 64`;
                continue;
            }

            revRetDataArrayVals[i] = revCurrDataObjectUpdateVal;
            revDataObject.revDataArrayVals.push(revCurrDataObjectUpdateVal);
        }
    }

    rev_plugins_objects.revPluginsObjects.revPluginDataArrays[revDataArrayId] = revDataObject;

    return rev_json_functions.revCloneJsObject(rev_plugins_objects.revPluginsObjects.revPluginDataArrays[revDataArrayId]);
};

var revGetPluginDataArray = (revVarArgs) => {
    if (!revVarArgs || rev_json_functions.revIsEmptyJSONObject(revVarArgs)) {
        console.log(`revVarArgs : ${revVarArgs}`);

        return;
    }

    if (!revVarArgs.revDataArrayId) {
        console.log(`revVarArgs.revDataArrayId : ${revVarArgs.revDataArrayId}`);

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
    let revDataArrayId = revVarArgs.revDataArrayId;

    return rev_plugins_objects.revPluginsObjects.revPluginDataArrays[revDataArrayId];
};

var revSetCaheArrayDataVals = (revVarArgs) => {
    /** REV START CHECK LOGGED IN ENTITY GUID */
    if (!revVarArgs.revLoggedInEntityGUID || revVarArgs.revLoggedInEntityGUID < 1) {
        return { "ERR_LOG_IN": `You have to be Logged In to Edit this entity's data values` };
    }
    /** REV END CHECK LOGGED IN ENTITY GUID */

    if (!revVarArgs.revDataObjectUpdateVals) {
        return;
    }

    let revDataObjectUpdateVals = revVarArgs.revDataObjectUpdateVals;

    let revDataObject = revGetPluginDataArray(revVarArgs);

    if (rev_strings_helper_funcs.revIsEmptyVar(revDataObject) || rev_strings_helper_funcs.revIsEmptyVar(revDataObject.revPermExpoSettings)) {
        return { "ERR_UNDEFINED": "Undefined" };
    }

    let revPermExpoSettings = revDataObject.revPermExpoSettings;

    if (!revPermExpoSettings.revIsWritable) {
        let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;

        if (revPermExpoSettings.revPluginDataArrayOwnerGUID !== revLoggedInEntityGUID) {
            return { "ERR -> ": `You do not have permission to Edit this entity's data values` };
        }
    }

    let revDataArrayVals = revDataObject.revDataArrayVals;

    let revRetSetDataObjects = {};

    for (let i = 0; i < revDataObjectUpdateVals.length; i++) {
        let revCurrDataObjectUpdateVal = revDataObjectUpdateVals[i];

        if (!revIsValidDataType(revCurrDataObjectUpdateVal)) {
            revRetSetDataObjects[i] = "ERR! You can only set string data types";
            continue;
        }

        if (revCurrDataObjectUpdateVal.length > 64) {
            revRetSetDataObjects[i] = `ERR! ${rev_strings_helper_funcs.revTruncateString(revCurrDataObjectUpdateVal, 22)} : > length > 64`;
            continue;
        }

        revDataArrayVals.push(revCurrDataObjectUpdateVal);

        revRetSetDataObjects[i] = revCurrDataObjectUpdateVal;
    }

    return revRetSetDataObjects;
};

var revSpliceCaheArrayDataVals = (revVarArgs) => {
    /** REV START CHECK LOGGED IN ENTITY GUID */
    if (!revVarArgs.revLoggedInEntityGUID || revVarArgs.revLoggedInEntityGUID < 1) {
        return { "ERR_LOG_IN": `You have to be Logged In to Edit this entity's data values` };
    }
    /** REV END CHECK LOGGED IN ENTITY GUID */

    let revDataObjectUpdateVal;

    if (!rev_strings_helper_funcs.revIsEmptyVar(revVarArgs.revDataObjectUpdateVal)) {
        revDataObjectUpdateVal = revVarArgs.revDataObjectUpdateVal;

        if (!revIsValidDataType(revDataObjectUpdateVal)) {
            return { "ERR": "invalid data type" };
        }

        if (revDataObjectUpdateVal.length > 64) {
            return `ERR! ${rev_strings_helper_funcs.revTruncateString(revDataObjectUpdateVal, 22)} : > length > 64`;
        }
    }

    let revDataObject = revGetPluginDataArray(revVarArgs);

    if (rev_strings_helper_funcs.revIsEmptyVar(revDataObject) || rev_strings_helper_funcs.revIsEmptyVar(revDataObject.revPermExpoSettings)) {
        return { "ERR_UNDEFINED": "Undefined" };
    }

    let revPermExpoSettings = revDataObject.revPermExpoSettings;

    if (!revPermExpoSettings.revIsWritable) {
        let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;

        if (revPermExpoSettings.revPluginDataArrayOwnerGUID !== revLoggedInEntityGUID) {
            return { "ERR -> ": `You do not have permission to Edit this entity's data values` };
        }
    }

    let revDataArrayVals = revDataObject.revDataArrayVals;

    let revSpliceStartIndex = revDataArrayVals.length - 1;

    if (revVarArgs.revSpliceStartIndex || revVarArgs.revSpliceStartIndex >= 0) {
        revSpliceStartIndex = revVarArgs.revSpliceStartIndex;
    }

    let revDeleteCount = 0;

    if (revVarArgs.revDeleteCount && revVarArgs.revDeleteCount > 0) {
        revDeleteCount = revVarArgs.revDeleteCount;
    }

    if (!rev_strings_helper_funcs.revIsEmptyVar(revDataObjectUpdateVal)) {
        revDataArrayVals.splice(revSpliceStartIndex, revDeleteCount, revDataObjectUpdateVal);
    } else {
        revDataArrayVals.splice(revSpliceStartIndex, revDeleteCount);
    }

    return { "revSpliceStartIndex": revSpliceStartIndex };
};

var revCaheArrayDataValIndices = (revVarArgs) => {
    /** REV START CHECK LOGGED IN ENTITY GUID */
    if (!revVarArgs.revLoggedInEntityGUID || revVarArgs.revLoggedInEntityGUID < 1) {
        return { "ERR_LOG_IN": `You have to be Logged In to Edit this entity's data values` };
    }
    /** REV END CHECK LOGGED IN ENTITY GUID */

    if (!revVarArgs.revDataObjectUpdateVals) {
        return { "ERR": "Update data cannot be null" };
    }

    let revDataObjectVal = revVarArgs.revDataObjectVal;

    if (!revIsValidDataType(revDataObjectVal)) {
        return { "ERR": "invalid data type" };
    }

    if (revDataObjectVal.length > 64) {
        return `ERR! ${rev_strings_helper_funcs.revTruncateString(revDataObjectVal, 22)} : > length > 64`;
    }

    let revDataObject = revGetPluginDataArray(revVarArgs);

    if (rev_strings_helper_funcs.revIsEmptyVar(revDataObject) || rev_strings_helper_funcs.revIsEmptyVar(revDataObject.revPermExpoSettings)) {
        return { "ERR_UNDEFINED": "Undefined" };
    }

    let revPermExpoSettings = revDataObject.revPermExpoSettings;

    if (!revPermExpoSettings.revIsWritable) {
        let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;

        if (revPermExpoSettings.revPluginDataArrayOwnerGUID !== revLoggedInEntityGUID) {
            return { "ERR -> ": `You do not have permission to Edit this entity's data values` };
        }
    }

    let revDataArrayVals = revDataObject.revDataArrayVals;

    let revValIndexesArr = [];

    for (let i = 0; i < revDataArrayVals.length; i++) {
        let revCurrvDataArrayVal = revDataArrayVals[i];

        if (revCurrvDataArrayVal == revDataObjectVal) {
            revValIndexesArr.push(i);
        }
    }

    return revValIndexesArr;
};

module.exports.revCacheDataArrayInit = revCacheDataArrayInit;
module.exports.revGetPluginDataArray = revGetPluginDataArray;
module.exports.revSetCaheArrayDataVals = revSetCaheArrayDataVals;
module.exports.revCaheArrayDataValIndices = revCaheArrayDataValIndices;
module.exports.revSpliceCaheArrayDataVals = revSpliceCaheArrayDataVals;
