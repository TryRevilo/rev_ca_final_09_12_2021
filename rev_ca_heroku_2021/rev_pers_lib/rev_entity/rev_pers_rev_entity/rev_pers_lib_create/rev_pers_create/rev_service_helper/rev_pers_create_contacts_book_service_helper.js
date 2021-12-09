const rev_pers_create_rev_entity_service_helper = require("./rev_pers_create_rev_entity_service_helper");
const rev_pers_create_metadata_service_helper = require("../../../../../rev_entity_data/rev_pers_metadata/rev_pers_lib_create/rev_pers_create/rev_service_heper/rev_pers_create_metadata_service_helper");

const rev_db_entity_const_resolver = require("../../../rev_db_models/rev_db_entity_const_resolver");
const rev_db_entity_metadata_const_resolver = require("../../../../../rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
const rev_db_rels_const_resolver = require("../../../../../rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");

const rev_pers_read_rev_entity_service_helper = require("../../../rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_entity_service_helper");
const rev_pers_read_rev_entity_metadata_service_helper = require("../../../../../rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");

const rev_pers_update_rev_entity_metadata_value_serv = require("../../../../../rev_entity_data/rev_pers_metadata/rev_pers_lib_update/rev_service_helper/rev_pers_update_rev_entity_metadata_value_serv");

const rev_strings_helper_funcs = require("../../../../../../rev_helper_functions/rev_strings_helper_funcs");
const rev_files_helper_functions = require("../../../../../../rev_helper_functions/rev_files_helper_functions");

/** REV START RELS */
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../../../rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");
const rev_pers_create_rev_entity_rel_service_helper = require("../../../../../rev_entity_data/rev_pers_relationships/rev_pers_lib_create/rev_pers_create/rev_service_heper/rev_pers_create_rev_entity_rel_service_helper");
/** REV END RELS */

var path = require("path");

var revShadowUserContactEntity = (revContactName, revEntityGUID) => {
    let revPersEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPersEntity._revEntityResolveStatus = -1;
    revPersEntity._revEntityChildableStatus = 1;
    revPersEntity._revEntityType = "rev_user_entity";
    revPersEntity._revEntitySubType = "rev_user_entity";
    revPersEntity._remoteRevEntityGUID = -1;
    revPersEntity._revEntityOwnerGUID = -1;
    revPersEntity._revEntityContainerGUID = -1;
    revPersEntity._revTimeCreated = new Date().getTime();

    if (revContactName) {
        let revPersInfoEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
        revPersInfoEntity._revEntityResolveStatus = -1;
        revPersInfoEntity._revEntityChildableStatus = 1;
        revPersInfoEntity._revEntityType = "rev_object";
        revPersInfoEntity._revEntitySubType = "rev_entity_info";

        revPersInfoEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_entity_full_names_value", revContactName));

        revPersEntity._revInfoEntity = revPersInfoEntity;
    }

    if (revEntityGUID && revEntityGUID > 0) {
        let revEntityConnectRel = rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT();
        revEntityConnectRel._revResolveStatus = -101;
        revEntityConnectRel._revEntityRelationshipType = "rev_entity_connect_members";
        revEntityConnectRel._remoteRevEntityTargetGUID = -1;
        revEntityConnectRel._remoteRevEntitySubjectGUID = revEntityGUID;

        revPersEntity._revTargetEntityRelationships.push(revEntityConnectRel);
    }

    return revPersEntity;
};

let revFillContactEntity = (revOwnerEntityGUID, revContactsBookGUID, revMetadataList) => {
    let revPhoneNumberContactEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
    revPhoneNumberContactEntity._revEntityType = "rev_object";
    revPhoneNumberContactEntity._revEntitySubType = "rev_contact";
    revPhoneNumberContactEntity._revEntityOwnerGUID = revOwnerEntityGUID;
    revPhoneNumberContactEntity._revEntityMetadataList = revMetadataList;

    if (revContactsBookGUID && revContactsBookGUID > 0) {
        let revContactRel = rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT();
        revContactRel._revEntityRelationshipType = "rev_contact_of";
        revContactRel._remoteRevEntityTargetGUID = revContactsBookGUID;
        revContactRel._remoteRevEntitySubjectGUID = -1;

        revPhoneNumberContactEntity._revSubjectEntityRelationships.push(revContactRel);
    }

    return revPhoneNumberContactEntity;
};

var revPersSaveContactsBook_Serv = async (revReqData) => {
    let revLoggedInEntityGUID = revReqData.revLoggedInEntityGUID;
    let revContactsBookArr = revReqData.filter;

    /** START REV SAVE CONTACT BOOK IF AT LEAST ONE PHONE ! SAVED */

    let revContactsBookGUID = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntityGUID_By_RevEntityOwnerGUID_Subtype_Serv(revLoggedInEntityGUID, "rev_contact_book");

    let revPersContactBookEntity;

    if (revContactsBookGUID > 1) {
        revPersContactBookEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revContactsBookGUID);
    } else {
        /** START REV SAVE CONTACT BOOK ENTITY */
        revPersContactBookEntity = rev_db_entity_const_resolver.REV_ENTITY_STRUCT();
        revPersContactBookEntity._revEntityOwnerGUID = revLoggedInEntityGUID;
        revPersContactBookEntity._revEntityResolveStatus = -1;
        revPersContactBookEntity._revEntityType = "revObject";
        revPersContactBookEntity._revEntitySubType = "rev_contact_book";
        revPersContactBookEntity._revEntityContainerGUID = -1;
        revPersContactBookEntity._revEntityChildableStatus = 3;
        /** END REV SAVE CONTACT BOOK ENTITY */

        let revContactsBookGUIDFilter = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPersContactBookEntity]);
        revContactsBookGUIDFilter = revContactsBookGUIDFilter.filter;
        revContactsBookGUID = revContactsBookGUIDFilter[0]._remoteRevEntityGUID;

        revPersContactBookEntity._remoteRevEntityGUID = revContactsBookGUID;
    }
    /** END REV SAVE CONTACT BOOK IF AT LEAST ONE PHONE ! SAVED */

    /** START REV SAVE CONTACTS */
    let revNewConnRelsArr = [];

    let revAddedPhoneNumbersArr = [];

    for (let i = 0; i < revContactsBookArr.length; i++) {
        if (i >= 5) {
            break;
        }

        let revContactName = revContactsBookArr[i].revContactName;

        let revPhoneNumbersMetadataArr = revContactsBookArr[i].revPhoneNumbersMetadataArr;

        for (let p = 0; p < revPhoneNumbersMetadataArr.length; p++) {
            let revPhoneNumberMetadata = revPhoneNumbersMetadataArr[p].revPhoneNumberMetadata;
            let revPhoneNumber = revPhoneNumberMetadata._metadataValue;
            let revContactMetadata = rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_phone_number", revPhoneNumber);

            if (rev_strings_helper_funcs.revIsEmptyVar(revPhoneNumber)) {
                revPhoneNumber = -1;
            }

            if (revAddedPhoneNumbersArr.includes(revPhoneNumber)) {
                continue;
            }

            let revContactEntityMetadataArr = [revContactMetadata];

            let revPhoneNumberEntityGUID = -1;

            revPhoneNumberEntityGUID = await rev_pers_read_rev_entity_metadata_service_helper.revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv("rev_phone_number", revPhoneNumber);

            let revShadowUserEntity = revShadowUserContactEntity(revContactName, revLoggedInEntityGUID);

            let revPhoneNumberContactEntity;

            if (!revPhoneNumberEntityGUID || revPhoneNumberEntityGUID < 1) {
                /** START REV SAVE SHADOW ENTITY */
                let revShadowUsersFilter;

                try {
                    revShadowUsersFilter = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revShadowUserEntity]);

                    let revShadowUserEntityGUID = revShadowUsersFilter.filter[0]._remoteRevEntityGUID;
                    revShadowUserEntity._remoteRevEntityGUID = revShadowUserEntityGUID;
                    /** END REV SAVE SHADOW ENTITY */

                    /** START REV SAVE CONTACT ENTITY */
                    revPhoneNumberContactEntity = revFillContactEntity(revShadowUserEntityGUID, revContactsBookGUID, revContactEntityMetadataArr);
                    let revPhoneNumberContactEntityFilter = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPhoneNumberContactEntity]);

                    revPhoneNumberEntityGUID = revPhoneNumberContactEntityFilter.filter[0]._remoteRevEntityGUID;
                    /** END REV SAVE CONTACT ENTITY */
                } catch (error) {
                    console.log("error -> " + error);
                }
            } else {
                let revShadowUserEntityGUID = await rev_pers_read_rev_entity_service_helper.revPersReadOwnerEntityGUID_By_RevEntityGUID_Serv(revPhoneNumberEntityGUID);
                revShadowUserEntity._remoteRevEntityGUID = revShadowUserEntityGUID;
                revPhoneNumberContactEntity = revFillContactEntity(revShadowUserEntityGUID, revContactsBookGUID, revContactEntityMetadataArr);
            }

            revPhoneNumberContactEntity._remoteRevEntityGUID = revPhoneNumberEntityGUID;

            let revPhoneNumberContactEntityOwnerGUID = revPhoneNumberContactEntity._revEntityOwnerGUID;

            let revConnRelId = await rev_pers_read_rev_entity_relationship_service_helper.revPersRelExists_By_RevEntityGUIDs_RevRelValId_Serv({
                "revSubjectGUID": revLoggedInEntityGUID,
                "revTargetGUID": revPhoneNumberContactEntityOwnerGUID,
                "revRevValId": 5,
            });

            if (revConnRelId < 1) {
                let revEntityConnectRel = rev_db_rels_const_resolver.REV_ENTITY_RELATIONSHIP_STRUCT();
                revEntityConnectRel._revResolveStatus = -101;
                revEntityConnectRel._revEntityRelationshipType = "rev_entity_connect_members";
                revEntityConnectRel._revOwnerGUID = revLoggedInEntityGUID;
                revEntityConnectRel._revEntityTargetGUID = revPhoneNumberContactEntityOwnerGUID;
                revEntityConnectRel._remoteRevEntityTargetGUID = revPhoneNumberContactEntityOwnerGUID;
                revEntityConnectRel._revEntitySubjectGUID = revLoggedInEntityGUID;
                revEntityConnectRel._remoteRevEntitySubjectGUID = revLoggedInEntityGUID;

                revNewConnRelsArr.push(revEntityConnectRel);
            }

            if (revPhoneNumberEntityGUID > 0) {
                revPersContactBookEntity._revEntityChildrenList.push(revPhoneNumberContactEntity);
            }

            if (revPhoneNumber > 0) {
                revAddedPhoneNumbersArr.push(revPhoneNumber);
            }
        }

        let revContactPhotosURLsArr = revContactsBookArr[i].revContactPhotosURLsArr;

        if (revContactPhotosURLsArr && Array.isArray(revContactPhotosURLsArr)) {
            const revServerIconsDir = path.resolve("../") + "/rev_node_pers_remote/rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/__REV__TEMP___";

            for (let i = 0; i < revContactPhotosURLsArr.length; i++) {
                let revIconPath = revContactPhotosURLsArr[i];
                // rev_files_helper_functions.revSaveRemoteFileToDisk(revIconPath, revServerIconsDir + rev_files_helper_functions.revGetFileNameFromURL(revIconPath));
            }
        }
    }

    if (revNewConnRelsArr.length > 0) {
        let revNewPersRelsArr = await rev_pers_create_rev_entity_rel_service_helper.createNewRevEntitiesRelationshipsArrayService(revNewConnRelsArr);
        console.log("revNewPersRelsArr : " + JSON.stringify(revNewPersRelsArr));
    }
    /** END REV SAVE CONTACTS */

    return revPersContactBookEntity;
};

var revUserRegistration = async (revContactEntityMetadataArr) => {
    let revLoggedInEntityGUID = 1;

    let revContactName = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revContactEntityMetadataArr, "rev_entity_full_names_value");
    let revPhoneNumber = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revContactEntityMetadataArr, "rev_phone_number");

    let revPhoneNumberEntityGUID = await rev_pers_read_rev_entity_metadata_service_helper.revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv("rev_phone_number", revPhoneNumber);

    let revShadowUserEntityGUID;

    if (revPhoneNumberEntityGUID && revPhoneNumberEntityGUID > 0) {
        console.log("revPhoneNumberEntityGUID : " + revPhoneNumberEntityGUID);

        revShadowUserEntityGUID = await rev_pers_read_rev_entity_service_helper.revPersReadOwnerEntityGUID_By_RevEntityGUID_Serv(revPhoneNumberEntityGUID);
    } else {
        let revShadowUserEntity = revShadowUserContactEntity(revContactName, revLoggedInEntityGUID);

        if (revPhoneNumber) {
            revShadowUserEntity._revEntityMetadataList.push(rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_entity_unique_id", revPhoneNumber));
        }

        /** START REV SAVE SHADOW ENTITY */
        let revShadowUsersFilter = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revShadowUserEntity]);

        revShadowUserEntityGUID = revShadowUsersFilter.filter[0]._remoteRevEntityGUID;
        revShadowUserEntity._remoteRevEntityGUID = revShadowUserEntityGUID;
        /** END REV SAVE SHADOW ENTITY */

        /** START REV SAVE CONTACT ENTITY */
        let revPhoneNumberContactEntity = revFillContactEntity(revShadowUserEntityGUID, -1, revContactEntityMetadataArr);
        let revPhoneNumberContactEntityFilter = await rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv([revPhoneNumberContactEntity]);

        revPhoneNumberEntityGUID = revPhoneNumberContactEntityFilter.filter[0]._remoteRevEntityGUID;
    }

    /** START REV CONFIRMATION CODE */
    let revConfirmCode = rev_strings_helper_funcs.revGenRandString(5);

    if (revShadowUserEntityGUID && revShadowUserEntityGUID > 0 && revPhoneNumberEntityGUID && revPhoneNumberEntityGUID > 0) {
        let revConfirmCodeMetadata = rev_db_entity_metadata_const_resolver.REV_METADATA_FILLER("rev_confirmation_code", revConfirmCode);

        let revMetadataId = await rev_pers_read_rev_entity_metadata_service_helper.revPersGetMetadataId_By_MetadataName_EntityGUID_Serv("rev_confirmation_code", revShadowUserEntityGUID);

        if (!revMetadataId || revMetadataId < 1) {
            let revRetMetadata = await rev_pers_create_metadata_service_helper.promiseToSaveRevEntityMetadataItem(revConfirmCodeMetadata, revShadowUserEntityGUID);
            revConfirmCodeMetadata.remoteRevMetadataId = revRetMetadata.metadataId;
        } else {
            revConfirmCodeMetadata.remoteRevMetadataId = revMetadataId;
            let revUpdateMetadataStatus = await rev_pers_update_rev_entity_metadata_value_serv.revPersUpdaterevEntityMetadataValue_By_MetadataId_Serv(revConfirmCodeMetadata);

            if (revUpdateMetadataStatus < 1) revConfirmCodeMetadata = null;
        }
    }
    /** END REV CONFIRMATION CODE */

    return { filter: { "revShadowUserEntityGUID": revShadowUserEntityGUID, "revConfirmCode": revConfirmCode } };
};

module.exports.revPersSaveContactsBook_Serv = revPersSaveContactsBook_Serv;
module.exports.revUserRegistration = revUserRegistration;
