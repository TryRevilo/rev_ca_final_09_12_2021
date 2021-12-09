const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");
const rev_strings_helper_funcs = require("../../../../../rev_helper_functions/rev_strings_helper_funcs");

const rev_pers_create_rev_entity_service_helper = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");

/** REV START READ METADATA */
const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
const rev_pers_read_rev_entity_metadata_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");
/** REV END READ METADATA */

const rev_db_rels_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");

/** REV START READ ENTITIES */
const rev_db_entity_const_resolver = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");
/** REV END READ ENTITIES */

/** REV START READ RELS */
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");
/** REV END READ RELS */

/** REV START CREATE RELS */
const rev_pers_create_rev_entity_rel_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_create/rev_pers_create/rev_service_heper/rev_pers_create_rev_entity_rel_service_helper");
/** REV END CREATE RELS */

var revCreateLangPhraseEntity = async (revVarArgs) => {
    if (
        rev_strings_helper_funcs.revIsEmptyVar(revVarArgs) ||
        !revVarArgs.revLoggedInEntityGUID ||
        revVarArgs.revLoggedInEntityGUID < 1 ||
        rev_strings_helper_funcs.revIsEmptyVar(revVarArgs.revLangPhraseKey) ||
        rev_strings_helper_funcs.revIsEmptyVar(revVarArgs.revLangPhraseVal)
        /** */
    ) {
        return;
    }

    let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;
    let revPluginViewGUID = revVarArgs.revPluginViewGUID;

    let revLangPhraseKey = revVarArgs.revLangPhraseKey;
    let revLangPhraseVal = revVarArgs.revLangPhraseVal;

    if (!revLangPhraseKey || !revLangPhraseVal) {
        return;
    }

    let revPersLangPhraseEntityInfoGUID = await rev_pers_read_rev_entity_metadata_service_helper.revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv(revLangPhraseKey, revLangPhraseVal);

    let revPersLangPhraseEntity;

    if (revPersLangPhraseEntityInfoGUID > 0) {
        let revPersLangPhraseEntityGUID = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId_Serv(revPersLangPhraseEntityInfoGUID, 0);

        let revRelId = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelId_By_SubjectGUID_TargetGUID_RevRelValId_Serv(revPersLangPhraseEntityGUID, revPluginViewGUID, 26);

        revPersLangPhraseEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revPersLangPhraseEntityGUID);

        if (revRelId > 0) {
            return revPersLangPhraseEntity;
        } else {
            /** REV START RELATE TO VIEW */
            let revPersLangPhraseEntityRel = rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT();
            revPersLangPhraseEntityRel._revResolveStatus = 0;
            revPersLangPhraseEntityRel._revEntityRelationshipType = "rev_lang_phrase_of";
            revPersLangPhraseEntityRel._revOwnerGUID = revLoggedInEntityGUID;
            revPersLangPhraseEntityRel._remoteRevEntityTargetGUID = revPluginViewGUID;
            revPersLangPhraseEntityRel._remoteRevEntitySubjectGUID = revPersLangPhraseEntity._remoteRevEntityGUID;

            let filterRevRetArr = await rev_pers_create_rev_entity_rel_service_helper.createNewRevEntitiesRelationshipsArrayService([revPersLangPhraseEntityRel]);

            let revEntityRelationshipRemoteId = filterRevRetArr.filter[0]._revEntityRelationshipRemoteId;

            if (revEntityRelationshipRemoteId && revEntityRelationshipRemoteId > 0) {
                return revPersLangPhraseEntity;
            }
            /** REV END RELATE TO VIEW */
        }

        return;
    }

    revPersLangPhraseEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPersLangPhraseEntity._revEntityResolveStatus = -1;
    revPersLangPhraseEntity._revEntityChildableStatus = 1;
    revPersLangPhraseEntity._revEntityType = "rev_object";
    revPersLangPhraseEntity._revEntitySubType = "rev_lang_phrase";
    revPersLangPhraseEntity._remoteRevEntityGUID = -1;
    revPersLangPhraseEntity._revEntityOwnerGUID = revLoggedInEntityGUID;
    revPersLangPhraseEntity._revEntityContainerGUID = -1;
    revPersLangPhraseEntity._revTimeCreated = new Date().getTime();

    let revPersLangPhraseEntityInfo = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPersLangPhraseEntityInfo._revEntityResolveStatus = -1;
    revPersLangPhraseEntityInfo._revEntityChildableStatus = 1;
    revPersLangPhraseEntityInfo._revEntityType = "rev_object";
    revPersLangPhraseEntityInfo._revEntitySubType = "rev_entity_info";

    revPersLangPhraseEntityInfo._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER(revLangPhraseKey, revLangPhraseVal));

    revPersLangPhraseEntity._revInfoEntity = revPersLangPhraseEntityInfo;

    /** REV START RELATE TO VIEW */
    let revPersLangPhraseEntityRel = rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT();
    revPersLangPhraseEntityRel._revResolveStatus = 0;
    revPersLangPhraseEntityRel._revEntityRelationshipType = "rev_lang_phrase_of";
    revPersLangPhraseEntityRel._revOwnerGUID = revLoggedInEntityGUID;
    revPersLangPhraseEntityRel._remoteRevEntityTargetGUID = revPluginViewGUID;
    revPersLangPhraseEntityRel._remoteRevEntitySubjectGUID = revPersLangPhraseEntity._remoteRevEntityGUID;

    revPersLangPhraseEntity._revSubjectEntityRelationships.push(revPersLangPhraseEntityRel);
    /** REV END RELATE TO VIEW */

    let revPersLangPhraseEntityRetArr = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPersLangPhraseEntity]);

    revPersLangPhraseEntity._remoteRevEntityGUID = revPersLangPhraseEntityRetArr.filter[0]._remoteRevEntityGUID;

    return revPersLangPhraseEntity;
};

module.exports.revCreateLangPhraseEntity = revCreateLangPhraseEntity;
