const rev_pers_delete_metadata = require('../rev_accessor/rev_pers_delete_metadata');

var revPersDeleteMetadata_By_EntityGUID_Serv = (revEntityGUIDsArr) => {
    return new Promise((res, rej) => {
        rev_pers_delete_metadata.revPersDeleteMetadata_By_EntityGUID(revEntityGUIDsArr, (revRes) => {
            res(revRes);
        });
    });
};

var revPersDeleteMetadataMulti_By_MetadataIds_Serv = (revMetadataIdsArr) => {
    return new Promise((res, rej) => {
        rev_pers_delete_metadata.revPersDeleteMetadata_By_MetadataId(revMetadataIdsArr, (revAffectedRowsRes) => {
            res(revAffectedRowsRes);
        });
    });
}

module.exports.revPersDeleteMetadata_By_EntityGUID_Serv = revPersDeleteMetadata_By_EntityGUID_Serv;
module.exports.revPersDeleteMetadataMulti_By_MetadataIds_Serv = revPersDeleteMetadataMulti_By_MetadataIds_Serv;