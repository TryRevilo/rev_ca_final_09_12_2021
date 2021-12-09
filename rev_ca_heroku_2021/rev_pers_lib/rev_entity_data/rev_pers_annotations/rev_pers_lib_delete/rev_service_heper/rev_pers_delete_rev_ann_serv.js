const rev_pers_delete_rev_ann_accessor = require('../rev_accessor/rev_pers_delete_rev_ann_accessor');

var revPersDeleteAnn_By_AnnId_Multi_Serv = async (revAnnIdsArr) => {
    return new Promise((res, rej) => {
        rev_pers_delete_rev_ann_accessor.revPersDeleteAnn_By_AnnId_Multi(revAnnIdsArr, (revDelAnnsAffectedRows) => {
            res(revDelAnnsAffectedRows);
        });
    });
};

module.exports.revPersDeleteAnn_By_AnnId_Multi_Serv = revPersDeleteAnn_By_AnnId_Multi_Serv;