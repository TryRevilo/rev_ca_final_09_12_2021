const rev_pers_rev_entity_annotation_accessor = require("../rev_accessor/rev_pers_rev_entity_annotation_accessor");
const rev_pers_update_ann_serv = require("../../../rev_pers_lib_update/rev_service_heper/rev_pers_update_ann_serv");
const rev_pers_delete_rev_ann_serv = require("../../../rev_pers_lib_delete/rev_service_heper/rev_pers_delete_rev_ann_serv");

const rev_pers_read_rev_entity_annotations_service_helper = require("../../../rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_annotations_service_helper");

var revSaveNewAnn_Serv = (revNewAnnArr) => {
    return new Promise(function (resolve, reject) {
        rev_pers_rev_entity_annotation_accessor.revPersSaveRevEntityAnnotation(revNewAnnArr, (result) => {
            resolve(result);
        });
    });
};

let revPersSaveRevEntityAnnotation_Serv = async (revData) => {
    let revNewAnnArr = [];
    let revUpdateAnnArr = [];
    let revOffsetDelArr = [];
    let revDelAnnIdsArr = [];

    for (let i = 0; i < revData.length; i++) {
        let revUpdateAnn = revData[i];

        let revAnn_Id_Val = await rev_pers_read_rev_entity_annotations_service_helper.revPersReadAnnId_By_AnnNameId_OwnerEntityGUID_Serv(revUpdateAnn);

        if (!revAnn_Id_Val || !revAnn_Id_Val.hasOwnProperty("revAnnotationRemoteId")) {
            revNewAnnArr.push(revUpdateAnn);

            continue;
        }

        /** REV EXISTING VALS */
        let revAnnotationRemoteId = revAnn_Id_Val.revAnnotationRemoteId;
        let revExistingAnnotationValue = revAnn_Id_Val.revAnnotationValue;

        if (revAnn_Id_Val.revAnnotationValue == revUpdateAnn._revAnnotationValue) {
            revDelAnnIdsArr.push(revAnnotationRemoteId);

            continue;
        }

        revUpdateAnn._revAnnotationRemoteId = revAnnotationRemoteId;

        if (revUpdateAnn._revIncremental) {
            let revAdjustedAnnVal = Number(revUpdateAnn._revAnnotationValue) + Number(revExistingAnnotationValue);

            if (revAdjustedAnnVal == 0) {
                revOffsetDelArr.push(revAnnotationRemoteId);

                continue;
            } else {
                revUpdateAnn._revAnnotationValue = revAdjustedAnnVal;
            }
        }

        revUpdateAnnArr.push(revUpdateAnn);
    }

    let revPersUpdateAnnRes = 0;

    /** REV START UPDATE ANN ARR */
    if (revUpdateAnnArr.length > 0) {
        try {
            revPersUpdateAnnRes = await rev_pers_update_ann_serv.revPersMultiUpdateAnnValue_By_AnnId_Serv(revUpdateAnnArr);
        } catch (error) {
            console.log("!revPersUpdateAnnRes - error -> " + error);
        }
    }
    /** REV END UPDATE ANN ARR */

    /** REV START NEW ANN ARR */
    let revPersNewAnnRes = [];

    if (revNewAnnArr.length > 0) {
        try {
            revPersNewAnnRes = await revSaveNewAnn_Serv(revNewAnnArr);
        } catch (error) {
            console.log("!revPersNewAnnRes - error -> " + error);
        }
    }
    /** REV END NEW ANN ARR */

    /** REV START DEL ANN ARR */
    let revPersDelAnnRes = 0;

    if (revOffsetDelArr.length > 0 || revDelAnnIdsArr.length > 0) {
        let revMergedDels = revOffsetDelArr.concat(revDelAnnIdsArr);
        try {
            revPersDelAnnRes = await rev_pers_delete_rev_ann_serv.revPersDeleteAnn_By_AnnId_Multi_Serv(revMergedDels);
        } catch (error) {
            console.log("!revPersDelAnnRes - error -> " + error);
        }
    }
    /** REV END DEL ANN ARR */

    return {
        "revNewAnnPersRes": revPersNewAnnRes,
        "revUpdateAnnRes": revPersUpdateAnnRes,
        "revOffsetDels": revOffsetDelArr.length,
        "revDelAnnRes": revPersDelAnnRes,
    };
};

module.exports.revPersSaveRevEntityAnnotation_Serv = revPersSaveRevEntityAnnotation_Serv;
