const rev_json_functions = require("../../../../rev_helper_functions/rev_json_functions");

const rev_pers_read_rev_entity_metadat_accessor = require("../rev_pers_lib_read/rev_accessor/rev_pers_read_rev_entity_metadat_accessor");

var revEntityMetadataFillerResolver = (revEntityMetadataDBRes) => {
    if (!revEntityMetadataDBRes || rev_json_functions.revIsEmptyJSONObject(revEntityMetadataDBRes)) {
        return null;
    }

    let revObjectEntityJSONConst = {};

    revObjectEntityJSONConst["_resolveStatus"] = revEntityMetadataDBRes.REV_RESOLVE_STATUS;
    revObjectEntityJSONConst["remoteRevMetadataId"] = revEntityMetadataDBRes.METADATA_ID;
    revObjectEntityJSONConst["_revMetadataEntityGUID"] = revEntityMetadataDBRes.REV_ENTITY_GUID;
    revObjectEntityJSONConst["_revMetadataName"] = revEntityMetadataDBRes.METADATA_NAME;
    revObjectEntityJSONConst["_metadataValue"] = revEntityMetadataDBRes.METADATA_VALUE;
    revObjectEntityJSONConst["_timeCreated"] = revEntityMetadataDBRes.CREATED_DATE;
    revObjectEntityJSONConst["_revPublishedDate"] = revEntityMetadataDBRes.REV_PUBLISHED_DATE;

    return revObjectEntityJSONConst;
};

var REV_ENTITY_METADATA_STRUCT = () => {
    return {
        "_resolveStatus": -1,
        "remoteRevMetadataId": -1,
        "_revMetadataEntityGUID": -1,
        "_revMetadataName": "",
        "_metadataValue": "",
        "_timeCreated": "",
        "_revTimeCreated": "",
        "_revPublishedDate": "",
    };
};

var REV_METADATA_FILLER = (revMetadataName, revMetadataVal) => {
    let revMetadata = REV_ENTITY_METADATA_STRUCT();
    revMetadata._revMetadataName = revMetadataName;
    revMetadata._metadataValue = revMetadataVal;

    return revMetadata;
};

var revGetMetadataValue = (revEntityMetadataList, revMetadataName) => {
    let revMetadataValue;

    if (!revMetadataName) {
        return;
    }

    for (let i = 0; i < revEntityMetadataList.length; i++) {
        if (!revEntityMetadataList[i]._revMetadataName) {
            continue;
        }

        let revIsinfo = revEntityMetadataList[i]._revMetadataName.localeCompare(revMetadataName);
        let revCurrMetadataValue = revEntityMetadataList[i]._metadataValue;

        if (revIsinfo == 0) {
            revMetadataValue = revCurrMetadataValue;
            break;
        }
    }

    return revMetadataValue;
};

var revGetMetadata_By_Metadata_Name = (revEntityMetadataList, revMetadataName) => {
    let revMetadata;

    if (!revMetadataName) {
        return;
    }

    for (let i = 0; i < revEntityMetadataList.length; i++) {
        if (!revEntityMetadataList[i]._revMetadataName) {
            continue;
        }

        if (revEntityMetadataList[i]._revMetadataName.localeCompare(revMetadataName) == 0) {
            revMetadata = revEntityMetadataList[i];
            break;
        }
    }

    return revMetadata;
};

var revGetMetadataValuesArr = (revEntityMetadataList, revMetadataName) => {
    let revMetadataValuesArr = [];

    if (!revMetadataName) {
        return;
    }

    for (let i = 0; i < revEntityMetadataList.length; i++) {
        if (!revEntityMetadataList[i]._revMetadataName) {
            continue;
        }

        let revIsinfo = revEntityMetadataList[i]._revMetadataName.localeCompare(revMetadataName);
        let revMetadataValue = revEntityMetadataList[i]._metadataValue;

        if (revIsinfo == 0 && revMetadataValue) {
            revMetadataValuesArr.push(revMetadataValue);
        }
    }

    return revMetadataValuesArr;
};

var revEntityMetadataFiller_Serv = async (remoteRevEntityGUID, callback) => {
    let revEntityMetadataList = [];

    let revMetadataDBResArr = await new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_metadat_accessor.revPersReadRevEntityMetadataByRemoteRevEntityGUID(remoteRevEntityGUID, (revArrItems) => {
            resolve(revArrItems);
        });
    });

    for (let i = 0; i < revMetadataDBResArr.length; i++) {
        revEntityMetadataList.push(revEntityMetadataFillerResolver(revMetadataDBResArr[i]));
    }

    if (callback) {
        callback(revEntityMetadataList);
    }

    return revEntityMetadataList;
};

module.exports.revEntityMetadataFillerResolver = revEntityMetadataFillerResolver;

module.exports.revEntityMetadataFiller_Serv = revEntityMetadataFiller_Serv;
module.exports.REV_ENTITY_METADATA_STRUCT = REV_ENTITY_METADATA_STRUCT;
module.exports.REV_METADATA_FILLER = REV_METADATA_FILLER;

module.exports.revGetMetadataValue = revGetMetadataValue;
module.exports.revGetMetadata_By_Metadata_Name = revGetMetadata_By_Metadata_Name;
module.exports.revGetMetadataValuesArr = revGetMetadataValuesArr;
