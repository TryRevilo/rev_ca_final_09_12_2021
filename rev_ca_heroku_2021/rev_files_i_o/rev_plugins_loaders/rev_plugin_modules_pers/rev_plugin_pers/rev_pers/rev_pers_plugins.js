const rev_plugins_objects = require("../../../rev_plugins_objects");

const rev_pers_create_rev_entity_service_helper = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");

/** REV START READ METADATA */
const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
/** REV END READ METADATA */

const rev_db_rels_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");

/** REV START READ ENTITIES */
const rev_db_entity_const_resolver = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");
/** REV END READ ENTITIES */

var revCreatePlugin = async (revPluginNameId, revPluginDisplayName) => {
    let revPluginEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPluginEntity._revEntityResolveStatus = -1;
    revPluginEntity._revEntityChildableStatus = 1;
    revPluginEntity._revEntityType = "rev_object";
    revPluginEntity._revEntitySubType = "rev_plugin";
    revPluginEntity._remoteRevEntityGUID = -1;
    revPluginEntity._revEntityOwnerGUID = 1;
    revPluginEntity._revEntityContainerGUID = -1;
    revPluginEntity._revTimeCreated = new Date().getTime();

    let revPersPluginLangInfoEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPersPluginLangInfoEntity._revEntityResolveStatus = -1;
    revPersPluginLangInfoEntity._revEntityChildableStatus = 1;
    revPersPluginLangInfoEntity._revEntityType = "rev_object";
    revPersPluginLangInfoEntity._revEntitySubType = "rev_entity_info";

    revPersPluginLangInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_name_id", revPluginNameId));
    revPersPluginLangInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_display_name", revPluginDisplayName));

    revPluginEntity._revInfoEntity = revPersPluginLangInfoEntity;

    let revPluginEntityRetArr = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPluginEntity]);

    revPluginEntity._remoteRevEntityGUID = revPluginEntityRetArr.filter[0]._remoteRevEntityGUID;

    rev_plugins_objects.revPluginsObjects.revPluginsInstalledArr.push(revPluginEntity);

    return revPluginEntityRetArr.filter[0]._remoteRevEntityGUID;
};

module.exports.revCreatePlugin = revCreatePlugin;
