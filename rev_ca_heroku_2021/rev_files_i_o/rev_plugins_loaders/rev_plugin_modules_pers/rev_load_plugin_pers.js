const rev_pers_create_rev_entity_service_helper = require("../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");

var rev_db_entity_const_resolver = require("../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");

var rev_db_entity_metadata_const_resolver = require("../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
let rev_pers_read_rev_entity_metadata_service_helper = require("../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");

/** REV START RELS */
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");
/** REV END RELS */

var revSavePlugin = async (revPlugin) => {
    let revPluginName = revPlugin.revPluginName;

    if (!revPluginName) {
        return;
    }

    let revPluginInfoEntityGUID = await rev_pers_read_rev_entity_metadata_service_helper.revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv("rev_plugin_name_id", revPluginName);

    let revPersEntity;

    if (revPluginInfoEntityGUID < 1) {
        revPersEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
        revPersEntity._revEntityResolveStatus = -1;
        revPersEntity._revEntityChildableStatus = 1;
        revPersEntity._revEntityType = "rev_object";
        revPersEntity._revEntitySubType = "rev_plugin";
        revPersEntity._remoteRevEntityGUID = -1;
        revPersEntity._revEntityOwnerGUID = 1;
        revPersEntity._revEntityContainerGUID = -1;
        revPersEntity._revTimeCreated = new Date().getTime();

        let revPersInfoEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
        revPersInfoEntity._revEntityResolveStatus = -1;
        revPersInfoEntity._revEntityChildableStatus = 1;
        revPersInfoEntity._revEntityType = "rev_object";
        revPersInfoEntity._revEntitySubType = "rev_entity_info";

        revPersInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_plugin_name_id", revPluginName));

        revPersEntity._revInfoEntity = revPersInfoEntity;

        let revPersRet = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPersEntity]);

        revPersEntity._remoteRevEntityGUID = revPersRet.filter[0]._remoteRevEntityGUID;
    } else {
        let revPluginFormEntityGUID = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId_Serv(revPluginInfoEntityGUID, 0);
        revPersEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revPluginFormEntityGUID);
    }

    return revPersEntity;
};

module.exports.revSavePlugin = revSavePlugin;
