var revEntityAnnFillerResolver = (revEntityAnnotationDBRes) => {
    let revObjectEntityJSONConst = {};

    revObjectEntityJSONConst["_revAnnotationResStatus"] = revEntityAnnotationDBRes.REV_RESOLVE_STATUS;
    revObjectEntityJSONConst["_revAnnotationRemoteId"] = revEntityAnnotationDBRes.ANNOTATION_ID;
    revObjectEntityJSONConst["_revAnnotationNameId"] = revEntityAnnotationDBRes.ANNOTATION_NAME_ID;
    revObjectEntityJSONConst["_revAnnotationValue"] = revEntityAnnotationDBRes.ANNOTATION_VALUE;
    revObjectEntityJSONConst["_revAnnotationRemoteEntityGUID"] = revEntityAnnotationDBRes.REV_ENTITY_GUID;
    revObjectEntityJSONConst["_revRemoteOwnerEntityGUID"] = revEntityAnnotationDBRes.REV_ENTITY_OWNER_GUID;
    revObjectEntityJSONConst["_revAnnotationTimeCreated"] = revEntityAnnotationDBRes.CREATED_DATE;
    revObjectEntityJSONConst["_revAnnotationTimeUpdated"] = revEntityAnnotationDBRes.UPDATED_DATE;

    return revObjectEntityJSONConst;
};

var REV_ENTITY_ANNOTATION_STRUCT = () => {
    return {
        "_revAnnotationId": -1,
        "_revAnnotationResStatus": -1,
        "_revAnnotationNameId": -1,
        "_revAnnotationValue": "",
        "_revAnnotationRemoteEntityGUID": -1,
        "_revAnnRemoteOwnerEntityGUID": -1,
        "_revUnique": false,
        "_revIncremental": false,
    };
};

module.exports.revEntityAnnFillerResolver = revEntityAnnFillerResolver;
module.exports.REV_ENTITY_ANNOTATION_STRUCT = REV_ENTITY_ANNOTATION_STRUCT;
