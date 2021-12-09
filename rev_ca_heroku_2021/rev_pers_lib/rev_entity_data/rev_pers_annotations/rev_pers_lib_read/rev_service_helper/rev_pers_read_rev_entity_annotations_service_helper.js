const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

const rev_db_entity_annotation_const_resolver = require("../../rev_db_models/rev_db_entity_annotation_const_resolver");

const rev_pers_read_rev_entity_annotations_accessor = require("../rev_accessor/rev_pers_read_rev_entity_annotations_accessor");

var revPersCountRevEntyAnn_By_Entity_GUID_Ann_Val_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_annotations_accessor.revPersCountRevEntyAnn_By_Entity_GUID_Ann_Val(revVarArgs, (revResAnnCount) => {
            resolve(revResAnnCount);
        });
    });
};

var revPersReadAnnId_By_AnnNameId_OwnerEntityGUID_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_annotations_accessor.revPersReadAnnId_By_AnnNameId_OwnerEntityGUID(revVarArgs, (revAnn) => {
            if (!revAnn) {
                resolve(null);
            } else resolve({ "revAnnotationRemoteId": revAnn.ANNOTATION_ID, "revAnnotationValue": revAnn.ANNOTATION_VALUE });
        });
    });
};

var revPersReadRevEntityAnn_By_RemoteRevEntityGUID_Serv = (revEntityGUID) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_annotations_accessor.revPersReadRevEntityAnn_By_RemoteRevEntityGUID(revEntityGUID, (revRetAnnData) => {
            resolve(revRetAnnData);
        });
    });
};

var revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID_serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_annotations_accessor.revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID(revVarArgs, (revEntityGUIDsArr) => {
            let revRetEntityGUIDsArr = [];

            for (let i = 0; i < revEntityGUIDsArr.length; i++) {
                revRetEntityGUIDsArr.push({ "revEntityGUID": revEntityGUIDsArr[i].REV_ENTITY_GUID });
            }

            resolve(revRetEntityGUIDsArr);
        });
    });
};

var revPersReadAnns_By_AnnId_OwnerEntityGUID_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_read_rev_entity_annotations_accessor.revPersReadAnns_By_AnnId_OwnerEntityGUID(revVarArgs, (revEntityAnnsArr) => {
            resolve(revEntityAnnsArr);
        });
    });
};

var revPersReadAnns_By_AnnId_OwnerEntityGUID_Serv_EXPO = async (revVarArgs) => {
    let revPersedAnnsArr = [];

    let revEntityAnnsArr = await revPersReadAnns_By_AnnId_OwnerEntityGUID_Serv(revVarArgs);

    for (let i = 0; i < revEntityAnnsArr.length; i++) {
        let revCurrPersedAnn = rev_db_entity_annotation_const_resolver.revEntityAnnFillerResolver(revEntityAnnsArr[i]);

        if (rev_json_functions.revIsEmptyJSONObject(revCurrPersedAnn)) {
            continue;
        }

        revPersedAnnsArr.push(revCurrPersedAnn);
    }

    return revPersedAnnsArr;
};

module.exports.revPersCountRevEntyAnn_By_Entity_GUID_Ann_Val_Serv = revPersCountRevEntyAnn_By_Entity_GUID_Ann_Val_Serv;

module.exports.revPersReadAnnId_By_AnnNameId_OwnerEntityGUID_Serv = revPersReadAnnId_By_AnnNameId_OwnerEntityGUID_Serv;

module.exports.revPersReadRevEntityAnn_By_RemoteRevEntityGUID_Serv = revPersReadRevEntityAnn_By_RemoteRevEntityGUID_Serv;
module.exports.revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID_serv = revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID_serv;

module.exports.revPersReadAnns_By_AnnId_OwnerEntityGUID_Serv = revPersReadAnns_By_AnnId_OwnerEntityGUID_Serv;
module.exports.revPersReadAnns_By_AnnId_OwnerEntityGUID_Serv_EXPO = revPersReadAnns_By_AnnId_OwnerEntityGUID_Serv_EXPO;
