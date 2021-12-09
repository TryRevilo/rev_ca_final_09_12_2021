const rev_pers_update_ann_accessor = require("../rev_accessor/rev_pers_update_ann_accessor");

var revPersMultiUpdateAnnValue_By_AnnId_Serv = (revVarArgs) => {
    return new Promise((resolve, reject) => {
        rev_pers_update_ann_accessor.revPersMultiUpdateAnnValue_By_AnnId(revVarArgs, (revAnnUpdateRes) => {
            resolve(revAnnUpdateRes);
        });
    });
};

module.exports.revPersMultiUpdateAnnValue_By_AnnId_Serv = revPersMultiUpdateAnnValue_By_AnnId_Serv;