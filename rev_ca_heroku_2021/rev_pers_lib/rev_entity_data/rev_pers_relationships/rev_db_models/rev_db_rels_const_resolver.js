const rev_pers_read_rev_entity_relationship_service_helper = require("../rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");

var REV_ENTITY_RELATIONSHIP_STRUCT = () => {
    return {
        "_revResolveStatus": -1,
        "_revEntitySubjectGUID": -1,
        "_remoteRevEntitySubjectGUID": -1,
        "_revOwnerGUID": -1,
        "_revEntityTargetGUID": -1,
        "_remoteRevEntityTargetGUID": -1,
        "_revEntityRelationshipType": "",
        "_revEntityRelationshipId": -1,
        "_revEntityRelationshipRemoteId": -1,
    };
};

var revFillRevRel = (revRelDBRes) => {
    let revEntityRelationshipType = rev_pers_read_rev_entity_relationship_service_helper.revGetRelationshipTypeVal(revRelDBRes.RELATIONSHIP_TYPE_VALUE_ID);

    let revRelJSONConst = {};

    revRelJSONConst._revResolveStatus = revRelDBRes.REV_RESOLVE_STATUS;
    revRelJSONConst._remoteRevEntityRelationshipId = revRelDBRes.RELATIONSHIP_ID;

    revRelJSONConst._revOwnerGUID = revRelDBRes.OWNER_GUID;
    revRelJSONConst._remoteRevEntitySubjectGUID = revRelDBRes.SUBJECT_GUID;
    revRelJSONConst._remoteRevEntityTargetGUID = revRelDBRes.TARGET_GUID;
    revRelJSONConst._revEntityRelationshipType = revEntityRelationshipType;
    revRelJSONConst._revEntityRelationshipTypeValueId = revRelDBRes.RELATIONSHIP_TYPE_VALUE_ID;

    revRelJSONConst._revEntityContainerGUID = revRelDBRes.CREATED_DATE;
    revRelJSONConst._timeUpdated = revRelDBRes.UPDATED_DATE;

    return revRelJSONConst;
};

module.exports.REV_ENTITY_RELATIONSHIP_STRUCT = REV_ENTITY_RELATIONSHIP_STRUCT;
module.exports.revFillRevRel = revFillRevRel;
