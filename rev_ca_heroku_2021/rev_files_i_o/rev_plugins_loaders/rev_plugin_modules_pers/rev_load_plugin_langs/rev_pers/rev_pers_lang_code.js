const rev_load_plugin_lang_const_resolver = require("../rev_read/rev_load_plugin_lang_const_resolver");

const rev_pers_create_rev_entity_service_helper = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");

/** REV START READ METADATA */
const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
/** REV END READ METADATA */

/** REV START READ ENTITIES */
const rev_db_entity_const_resolver = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");
/** REV END READ ENTITIES */

var revCreateLangCodeEntity = async (revVarArgs) => {
    let revLoggedInEntityGUID = revVarArgs.revLoggedInEntityGUID;
    let revLangDetails = revVarArgs.revLangDetails;

    let revLangCode = revLangDetails.revLangCode;
    let revLangName = revLangDetails.revLangName;
    let revCountry = revLangDetails.revCountry;
    let revRegion = revLangDetails.revRegion;
    let revParentLang = revLangDetails.revParentLang;
    let revLangFormality = revLangDetails.revLangFormality;

    let revPluginLangCodeEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPluginLangCodeEntity._revEntityResolveStatus = -1;
    revPluginLangCodeEntity._revEntityChildableStatus = 1;
    revPluginLangCodeEntity._revEntityType = "rev_object";
    revPluginLangCodeEntity._revEntitySubType = "rev_lang_code";
    revPluginLangCodeEntity._remoteRevEntityGUID = -1;
    revPluginLangCodeEntity._revEntityOwnerGUID = revLoggedInEntityGUID;
    revPluginLangCodeEntity._revEntityContainerGUID = -1;
    revPluginLangCodeEntity._revTimeCreated = new Date().getTime();

    let revPersPluginLangInfoEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPersPluginLangInfoEntity._revEntityResolveStatus = -1;
    revPersPluginLangInfoEntity._revEntityChildableStatus = 1;
    revPersPluginLangInfoEntity._revEntityType = "rev_object";
    revPersPluginLangInfoEntity._revEntitySubType = "rev_entity_info";

    if (!revLangCode) {
        return -1;
    }

    revPersPluginLangInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_lang_code", revLangCode));

    if (revLangName) {
        revPersPluginLangInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_lang_name", revLangName));
    }

    if (revCountry) {
        revPersPluginLangInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_lang_counrty", revCountry));
    }

    if (revRegion) {
        revPersPluginLangInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_lang_region", revRegion));
    }

    if (revParentLang) {
        revPersPluginLangInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_lang_parent_lang", revParentLang));
    }

    if (revLangFormality) {
        revPersPluginLangInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_lang_formality_lang", revLangFormality));
    }

    revPluginLangCodeEntity._revInfoEntity = revPersPluginLangInfoEntity;

    let revPluginLangCodeEntityRetArr = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPluginLangCodeEntity]);

    revPluginLangCodeEntity._remoteRevEntityGUID = revPluginLangCodeEntityRetArr.filter[0]._remoteRevEntityGUID;

    await rev_load_plugin_lang_const_resolver.revLoadSavedLangCodes();

    return revPluginLangCodeEntityRetArr.filter[0]._remoteRevEntityGUID;
};

module.exports.revCreateLangCodeEntity = revCreateLangCodeEntity;
