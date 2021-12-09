const rev_strings_helper_funcs = require("../../../../../rev_helper_functions/rev_strings_helper_funcs");
const rev_json_functions = require("../../../../../rev_helper_functions/rev_json_functions");

const rev_plugins_objects = require("../../../rev_plugins_objects");

/** REV START READ ENTITY */
const rev_pers_read_rev_entity_info_wrapper = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_entity_info_wrapper");
const rev_db_entity_const_resolver = require("../../../../../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");
/** REV END READ ENTITY */

/** REV START READ METADATA */
const rev_db_entity_metadata_const_resolver = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_db_models/rev_db_entity_metadata_const_resolver");
const rev_pers_read_rev_entity_metadata_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");
/** REV END READ METADATA */

/** REV START READ RELS */
const rev_pers_read_rev_entity_relationship_service_helper = require("../../../../../rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");
/** REV END READ RELS */

const rev_lib_read_langs = require("../rev_read/rev_lib_read_langs");

var revLangCodeDetailsConst = (revLangEntity) => {
    let revLangDetails = {};

    if (rev_strings_helper_funcs.revIsEmptyVar(revLangEntity) || rev_strings_helper_funcs.revIsEmptyVar(revLangEntity._revInfoEntity) || rev_json_functions.revIsEmptyJSONObject(revLangEntity._revInfoEntity)) {
        return;
    }

    let revLangEntityInfo = revLangEntity._revInfoEntity;
    let revLangEntityInfoMetadataList = revLangEntityInfo._revEntityMetadataList;

    let revLangCode = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revLangEntityInfoMetadataList, "rev_lang_code");
    let revLangName = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revLangEntityInfoMetadataList, "rev_lang_name");
    let revCountry = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revLangEntityInfoMetadataList, "rev_lang_counrty");
    let revRegion = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revLangEntityInfoMetadataList, "rev_lang_region");
    let revParentLang = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revLangEntityInfoMetadataList, "rev_lang_parent_lang");
    let revLangFormality = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revLangEntityInfoMetadataList, "rev_lang_formality_lang");

    if (revLangCode) {
        revLangDetails["revLangCode"] = revLangCode;
    }

    if (revLangName) {
        revLangDetails["revLangName"] = revLangName;
    }

    if (revCountry) {
        revLangDetails["revCountry"] = revCountry;
    }

    if (revRegion) {
        revLangDetails["revRegion"] = revRegion;
    }

    if (revParentLang) {
        revLangDetails["revParentLang"] = revParentLang;
    }

    if (revLangFormality) {
        revLangDetails["revLangFormality"] = revLangFormality;
    }

    return revLangDetails;
};

var revGetLangCodeEntity = async (revLangCode) => {
    let revLangCodeInfoEntityGUID = await rev_pers_read_rev_entity_metadata_service_helper.revPersMetadataValueExists_By_MetadataName_MetadataValue_Serv("rev_lang_code", revLangCode);

    if (revLangCodeInfoEntityGUID < 1) {
        return;
    }

    let revLangCodeEntityGUID = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId_Serv(revLangCodeInfoEntityGUID, 0);

    if (revLangCodeEntityGUID < 1) {
        return;
    }

    let revLangCodeEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revLangCodeEntityGUID);

    return revLangCodeEntity;
};

var reResetTransLocksCountPriority = (revTransListArr, revPluginLang) => {
    if (revTransListArr.length == 0) {
        revPluginLang["rev_translation_active"] = true;
        revTransListArr.push(revPluginLang);

        return;
    }

    let revPluginLangTransLockCount = Number(revPluginLang.rev_translation_locks_count);
    let revCurrTranslationLocksCount = Number(revTransListArr[0].rev_translation_locks_count);

    if (revPluginLangTransLockCount >= revCurrTranslationLocksCount) {
        revPluginLang["rev_translation_active"] = true;

        delete revTransListArr[0].rev_translation_active;

        revTransListArr.splice(0, 0, revPluginLang);

        return;
    }

    let revPhraseEntityGUID = Number(revPluginLang.revPhraseEntityGUID);

    if (revTransListArr.length == 1) {
        revTransListArr.push(revPluginLang);

        return;
    }

    let i = 1;

    while (i < revTransListArr.length) {
        let revCurrTransObj = revTransListArr[i];

        let revCurrPhraseEntityGUID = Number(revCurrTransObj.revPhraseEntityGUID);

        let revCurrTranslationLocksCount = Number(revCurrTransObj.rev_translation_locks_count);

        if (revCurrPhraseEntityGUID == revPhraseEntityGUID) {
            break;
        }

        if (revPluginLangTransLockCount >= revCurrTranslationLocksCount) {
            revTransListArr.splice(i, 0, revPluginLang);

            break;
        }

        if (i == revTransListArr.length) {
            revTransListArr.push(revPluginLang);

            break;
        }

        i = i + 1;
    }

    return;
};

var revLangPhraseConstructor = (revPhraseEntity) => {
    if (!revPhraseEntity._revInfoEntity._revEntityMetadataList || !revPhraseEntity._revInfoEntity._revEntityMetadataList[0]) {
        return;
    }

    let revCurrMetadata = revPhraseEntity._revInfoEntity._revEntityMetadataList[0];

    let revTranslationLocksCount = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revPhraseEntity._revEntityMetadataList, "rev_translation_locks_count");

    if (!revTranslationLocksCount) {
        revTranslationLocksCount = 0;
    }

    let revMetadataName = revCurrMetadata._revMetadataName;
    let revMetadataValue = revCurrMetadata._metadataValue;

    let revCurrPluginLang = {};

    revCurrPluginLang[revMetadataName] = revMetadataValue;
    revCurrPluginLang["revPhraseEntityGUID"] = revPhraseEntity._remoteRevEntityGUID;
    revCurrPluginLang["revPhrasePublisherGUID"] = revPhraseEntity._revEntityOwnerGUID;
    revCurrPluginLang["_revTimePublished"] = revPhraseEntity._revTimePublished;
    revCurrPluginLang["rev_translation_locks_count"] = revTranslationLocksCount;

    return { "revLangKey": revMetadataName, "revPluginLang": revCurrPluginLang };
};

var revPluginLangConstructor = async (revEntity) => {
    if (rev_json_functions.revIsEmptyJSONObject(revEntity) || rev_json_functions.revIsEmptyJSONObject(revEntity._revInfoEntity)) {
        return;
    }

    let revInfoEntity = revEntity._revInfoEntity;

    let revInfoEntityMetadataListArr = revInfoEntity._revEntityMetadataList;

    let revPluginLang = {};

    let revPluginNameId = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntityMetadataListArr, "rev_plugin_lang_name_id");
    let revPluginViewLangCode = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntityMetadataListArr, "rev_plugin_lang_view_code");
    let revViewType = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntityMetadataListArr, "rev_plugin_lang_view_type");
    let revViewNameId = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntityMetadataListArr, "rev_plugin_lang_view_name_id");

    if (!rev_plugins_objects.revPluginsObjects.revLangs.hasOwnProperty(revPluginViewLangCode)) {
        rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode] = {};
        rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode] = {};
    }

    if (!rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode].hasOwnProperty(revPluginNameId)) {
        rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId] = {};
        rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId] = {};
    }

    if (!rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId].hasOwnProperty(revViewType)) {
        rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId][revViewType] = {};
        rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType] = {};
    }

    if (!rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId][revViewType].hasOwnProperty(revViewNameId)) {
        rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId] = {};
        rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId] = {};
    }

    if (!rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].hasOwnProperty("revTransSuggestionsArr")) {
        rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId]["revTransSuggestionsArr"] = [];
    }

    let revLangCodeEntity = await revGetLangCodeEntity(revPluginViewLangCode);

    if (!revLangCodeEntity) {
        return;
    }

    let revLangDetails = revLangCodeDetailsConst(revLangCodeEntity);

    rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId]["revLangDetails"] = revLangDetails;
    rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId]["revLangDetails"] = revLangDetails;

    let revTransSuggestionsArr = rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].revTransSuggestionsArr;

    let revLangIsAdded = (revPluginLang, revLangKey) => {
        if (rev_json_functions.revIsEmptyJSONObject(revPluginLang)) {
            return false;
        }

        let revCurrLangVal = revPluginLang[revLangKey];

        for (let i = 0; i < revTransSuggestionsArr.length; i++) {
            let revCurrTransSuggestion = revTransSuggestionsArr[i];

            if (!revCurrTransSuggestion[revLangKey]) {
                continue;
            }

            if (revCurrTransSuggestion.hasOwnProperty(revLangKey) && revCurrLangVal.localeCompare(revCurrTransSuggestion[revLangKey]) == 0) {
                return true;
            }
        }

        return false;
    };

    let revPersLangPhraseEntitiesArr = revEntity.revPersLangPhraseEntitiesArr;

    if (!rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].hasOwnProperty("revLang")) {
        rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId]["revLang"] = {};
        rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId]["revLang"] = {};
    }

    let revPublishersGUIDsArr = [];

    for (let i = 0; i < revPersLangPhraseEntitiesArr.length; i++) {
        let revCurrPersLangPhraseEntity = revPersLangPhraseEntitiesArr[i];

        if (rev_json_functions.revIsEmptyJSONObject(revCurrPersLangPhraseEntity)) {
            continue;
        }

        let revPersLangPhraseEntityInfo = revCurrPersLangPhraseEntity._revInfoEntity;

        if (!revPersLangPhraseEntityInfo._revEntityMetadataList[0]) {
            continue;
        }

        let revCurrMetadata = revPersLangPhraseEntityInfo._revEntityMetadataList[0];

        let revMetadataName = revCurrMetadata._revMetadataName;
        let revMetadataValue = revCurrMetadata._metadataValue;

        rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].revLang[revMetadataName] = revMetadataValue;
        rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].revLang[revMetadataName] = revMetadataValue;

        let revCurrPluginLang = revLangPhraseConstructor(revCurrPersLangPhraseEntity);
        revCurrPluginLang = revCurrPluginLang.revPluginLang;

        if (rev_json_functions.revIsEmptyJSONObject(revCurrPluginLang)) {
            continue;
        }

        let revIsAdded = revLangIsAdded(revCurrPluginLang, revMetadataName);

        revPluginLang = revCurrPluginLang;

        let revTranslationLocksCount = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revCurrPersLangPhraseEntity._revEntityMetadataList, "rev_translation_locks_count");

        if (!revTranslationLocksCount) {
            revTranslationLocksCount = 0;
        }

        if (!rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].hasOwnProperty("revPublishersArr")) {
            rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId]["revPublishersArr"] = [];
        }

        if (!revIsAdded) {
            let revPublishersArr = rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].revPublishersArr;

            if (!rev_json_functions.revEntitiesArrIncludesEntityGUID(revPublishersArr, revCurrPersLangPhraseEntity._revEntityOwnerGUID) && !revPublishersGUIDsArr.includes(revCurrPersLangPhraseEntity._revEntityOwnerGUID)) {
                revPublishersGUIDsArr.push(revCurrPersLangPhraseEntity._revEntityOwnerGUID);
            }

            rev_plugins_objects.revPluginsObjects.revLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].revTransSuggestionsArr.push(revCurrPluginLang);

            if (!rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].hasOwnProperty(revMetadataName)) {
                rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revMetadataName] = {
                    "revTransSuggestionsArr": [],
                };
            }

            reResetTransLocksCountPriority(rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revMetadataName].revTransSuggestionsArr, revCurrPluginLang);
        }

        /** REV START GET PUBLISHERS */
        let revPublishersArr = await rev_pers_read_rev_entity_info_wrapper.revGetFilledEntities_Serv(revPublishersGUIDsArr);

        let revAddedPublishersArr = rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].revPublishersArr;

        for (let i = 0; i < revPublishersArr.length; i++) {
            if (!rev_json_functions.revEntitiesArrIncludesEntityGUID(revAddedPublishersArr, revPublishersArr[i]._remoteRevEntityGUID)) {
                rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].revPublishersArr.push(revPublishersArr[i]);
            }
        }
        /** REV END GET PUBLISHERS */

        if (
            /** */
            rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId] &&
            rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType] &&
            rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId] &&
            rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId].revLangDetails &&
            rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId].revLang &&
            rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId].revLang[revMetadataName]
        ) {
            if (
                /** */
                !rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revMetadataName].hasOwnProperty("revDefLangDetails") ||
                rev_json_functions.revIsEmptyJSONObject(rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revMetadataName].revLang)
            ) {
                rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revMetadataName]["revDefLangDetails"] = rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId].revLangDetails;
                rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revMetadataName]["revDefLangPhrase"] = rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId].revLang[revMetadataName];
            }

            /** REV START SET UP FINALS */
            if (!rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal.hasOwnProperty(revPluginViewLangCode)) {
                rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revPluginViewLangCode] = {};
            }

            if (!rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revPluginViewLangCode].hasOwnProperty(revPluginNameId)) {
                rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revPluginViewLangCode][revPluginNameId] = {};
            }

            if (!rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revPluginViewLangCode][revPluginNameId].hasOwnProperty(revViewType)) {
                rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revPluginViewLangCode][revPluginNameId][revViewType] = {};
            }

            if (!rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revPluginViewLangCode][revPluginNameId][revViewType].hasOwnProperty(revViewNameId)) {
                rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId] = {
                    "revDefLangDetails": rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId].revLangDetails,
                };
            }

            if (!rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].hasOwnProperty(revMetadataName)) {
                rev_plugins_objects.revPluginsObjects.revPluginLangsTranslationsFinal[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revMetadataName] = {
                    "revDefLangPhrase": rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId].revLang[revMetadataName],
                    "revCurrentTranslation": rev_plugins_objects.revPluginsObjects.revPluginLangs[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revMetadataName].revTransSuggestionsArr[0],
                    "revPublishersArr": revAddedPublishersArr,
                };
            }
            /** REV END SET UP FINALS */
        }
    }

    return revPluginLang;
};

var revPluginLangDefaultsConstructor = async (revEntity, revPluginNameId, revPluginLangCode) => {
    if (rev_json_functions.revIsEmptyJSONObject(revEntity) || rev_json_functions.revIsEmptyJSONObject(revEntity._revInfoEntity)) {
        return;
    }

    let revInfoEntity = revEntity._revInfoEntity;

    let revInfoEntityMetadataListArr = revInfoEntity._revEntityMetadataList;

    let revPluginLang = {};

    let revViewType = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntityMetadataListArr, "rev_plugin_lang_view_type");
    let revViewNameId = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntityMetadataListArr, "rev_plugin_lang_view_name_id");

    let revPersLangPhraseEntitiesArr = revEntity.revPersLangPhraseEntitiesArr;

    for (let i = 0; i < revPersLangPhraseEntitiesArr.length; i++) {
        let revCurrPersLangPhraseEntity = revPersLangPhraseEntitiesArr[i];

        if (rev_json_functions.revIsEmptyJSONObject(revCurrPersLangPhraseEntity)) {
            continue;
        }

        let revPersLangPhraseEntityInfo = revCurrPersLangPhraseEntity._revInfoEntity;

        let revCurrMetadata = revPersLangPhraseEntityInfo._revEntityMetadataList[0];

        let revMetadataName = revCurrMetadata._revMetadataName;
        let revMetadataValue = revCurrMetadata._metadataValue;

        revPluginLang[revMetadataName] = revMetadataValue;
    }

    if (!rev_plugins_objects.revPluginsObjects.revLangsDefaults.hasOwnProperty(revPluginNameId)) {
        rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId] = {};
    }

    if (!rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId].hasOwnProperty(revViewType)) {
        rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType] = {};
    }

    if (!rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType].hasOwnProperty(revViewNameId)) {
        rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId] = {};
    }

    let revLangCodeEntity = await revGetLangCodeEntity(revPluginLangCode);

    let revLangDetails = revLangCodeDetailsConst(revLangCodeEntity);

    rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId]["revLangDetails"] = revLangDetails;
    rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId]["revLang"] = revPluginLang;

    return revPluginLang;
};

var revGetViewLang = (revLangCode, revPluginNameId, revViewNameId) => {
    if (
        /** */
        !rev_plugins_objects.revPluginsObjects.revLangs[revLangCode] ||
        !rev_plugins_objects.revPluginsObjects.revLangs[revLangCode][revPluginNameId] ||
        !rev_plugins_objects.revPluginsObjects.revLangs[revLangCode][revPluginNameId].rev_form ||
        !rev_plugins_objects.revPluginsObjects.revLangs[revLangCode][revPluginNameId].rev_form[revViewNameId]
    ) {
        return;
    }

    return rev_plugins_objects.revPluginsObjects.revLangs[revLangCode][revPluginNameId].rev_form[revViewNameId];
};

var revPluginViewLangs = (revLangCode, revPluginNameId, revViewNameId) => {
    if (
        /** */
        !rev_plugins_objects.revPluginsObjects.revPluginLangs[revLangCode] ||
        !rev_plugins_objects.revPluginsObjects.revPluginLangs[revLangCode][revPluginNameId] ||
        !rev_plugins_objects.revPluginsObjects.revPluginLangs[revLangCode][revPluginNameId].rev_form ||
        !rev_plugins_objects.revPluginsObjects.revPluginLangs[revLangCode][revPluginNameId].rev_form[revViewNameId]
    ) {
        return;
    }

    return rev_plugins_objects.revPluginsObjects.revPluginLangs[revLangCode][revPluginNameId].rev_form[revViewNameId];
};

var revLoadSavedLangCodes = async () => {
    let revLangCodeEntitiesArr = await rev_db_entity_const_resolver.revPersReadRevEntities_By_Subtype_Expo_Serv("rev_lang_code");

    let revLangIsAdded = (revObjectsJSONArr, revLangCode, revLangName) => {
        return revObjectsJSONArr.some((element, index, array) => {
            return element.revLangCode === revLangCode && element.revLangName === revLangName;
        });
    };

    for (let i = 0; i < revLangCodeEntitiesArr.length; i++) {
        let revCurrLangCodeEntity = revLangCodeEntitiesArr[i];

        if (rev_json_functions.revIsEmptyJSONObject(revCurrLangCodeEntity)) {
            continue;
        }

        let revLangCode = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revCurrLangCodeEntity._revInfoEntity._revEntityMetadataList, "rev_lang_code");
        let revLangName = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revCurrLangCodeEntity._revInfoEntity._revEntityMetadataList, "rev_lang_name");

        let revIsAdded = revLangIsAdded(rev_plugins_objects.revPluginsObjects.revLangsDetailsArr, revLangCode, revLangName);

        if (revIsAdded) {
            continue;
        }

        rev_plugins_objects.revPluginsObjects.revLangsDetailsArr.push(revLangCodeDetailsConst(revCurrLangCodeEntity));
    }
};

var revLoadSavedLangs = async () => {
    let revPluginEntitiesArr = await rev_db_entity_const_resolver.revPersReadRevEntities_By_Subtype_Expo_Serv("rev_plugin");

    for (let i = 0; i < revPluginEntitiesArr.length; i++) {
        let revCurrPlugin = revPluginEntitiesArr[i];

        let revPluginViewGUIDsArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelIdServ(revCurrPlugin._remoteRevEntityGUID, 24);
        revPluginViewGUIDsArr = revPluginViewGUIDsArr.filter;

        for (let pViewGUIDI = 0; pViewGUIDI < revPluginViewGUIDsArr.length; pViewGUIDI++) {
            let revPluginViewGUID = revPluginViewGUIDsArr[pViewGUIDI];

            let revCurrPluginViewEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revPluginViewGUID);

            let revCurrPluginViewInfoEntity = revCurrPluginViewEntity._revInfoEntity;
            let revCurrPluginViewInfoEntityMetadataListArr = revCurrPluginViewInfoEntity._revEntityMetadataList;

            let revPluginViewNameId = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revCurrPluginViewInfoEntityMetadataListArr, "rev_plugin_lang_view_name_id");
            let revPluginNameId = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revCurrPluginViewInfoEntityMetadataListArr, "rev_plugin_lang_name_id");
            let revLangViewType = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revCurrPluginViewInfoEntityMetadataListArr, "rev_plugin_lang_view_type");

            let revLangCodeEntityGUID = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadSingleRevEntityRelsSubjectGUID_By_RevTargetGUID_RevRelId_Serv(revPluginViewGUID, 25);
            let revCurrLangCodeEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revLangCodeEntityGUID);

            if (rev_json_functions.revIsEmptyJSONObject(revCurrLangCodeEntity) || rev_json_functions.revIsEmptyJSONObject(revCurrLangCodeEntity._revInfoEntity)) {
                continue;
            }

            let revCurrLangCodeInfoEntity = revCurrLangCodeEntity._revInfoEntity;

            let revInfoEntityMetadataListArr = revCurrLangCodeInfoEntity._revEntityMetadataList;

            let revLangCode = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntityMetadataListArr, "rev_lang_code");

            let revPluginViewEntity = await rev_lib_read_langs.revGetPluginLangViewEntity(revCurrPlugin._remoteRevEntityGUID, revLangViewType, revPluginViewNameId, revLangCode);

            let revLangPhrasesEntityGUIDsArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelIdServ(revPluginViewEntity._remoteRevEntityGUID, 26);

            revPluginViewEntity["revPersLangPhraseEntitiesArr"] = [];

            let revLangPhrasesEntitiesArr = await rev_pers_read_rev_entity_info_wrapper.revGetFilledEntities_Serv(revLangPhrasesEntityGUIDsArr.filter);

            for (let phraseI = 0; phraseI < revLangPhrasesEntitiesArr.length; phraseI++) {
                let revCurrLangPhrasesEntity = revLangPhrasesEntitiesArr[phraseI];

                revPluginViewEntity.revPersLangPhraseEntitiesArr.push(revCurrLangPhrasesEntity);
            }

            if (revPluginViewEntity && !rev_json_functions.revIsEmptyJSONObject(revPluginViewEntity)) {
                /** REV START LOAD SUMMURY */
                rev_plugins_objects.revPluginsObjects.revPluginViewTransGUIDsArr.push(revPluginViewEntity._remoteRevEntityGUID);
                /** REV END LOAD SUMMURY */

                let revPluginLang = await revPluginLangConstructor(revPluginViewEntity);
            }
        }
    }
};

var revGetPluginViewLangs_By_OwnerGUID = async (revVarArgs) => {
    let revOwnerGUID = revVarArgs.revOwnerGUID;

    let revPluginViewTransGUIDsArr = rev_plugins_objects.revPluginsObjects.revPluginViewTransGUIDsArr;

    let revRetLangs = {};

    for (let i = 0; i < revPluginViewTransGUIDsArr.length; i++) {
        let revPluginViewEntityGUID = revPluginViewTransGUIDsArr[i];

        let revPluginViewEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revPluginViewEntityGUID);

        if (rev_json_functions.revIsEmptyJSONObject(revPluginViewEntity) || rev_json_functions.revIsEmptyJSONObject(revPluginViewEntity._revInfoEntity)) {
            return;
        }

        let revInfoEntity = revPluginViewEntity._revInfoEntity;

        let revInfoEntityMetadataListArr = revInfoEntity._revEntityMetadataList;

        let revPluginNameId = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntityMetadataListArr, "rev_plugin_lang_name_id");
        let revPluginViewLangCode = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntityMetadataListArr, "rev_plugin_lang_view_code");
        let revViewType = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntityMetadataListArr, "rev_plugin_lang_view_type");
        let revViewNameId = rev_db_entity_metadata_const_resolver.revGetMetadataValue(revInfoEntityMetadataListArr, "rev_plugin_lang_view_name_id");

        let revLangPhrasesGUIDsFilterArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelsSubjectGUIDs_By_OwnerGUID_RevTargetGUID_RevRelId_Serv(revOwnerGUID, revPluginViewEntityGUID, 26);

        if (revLangPhrasesGUIDsFilterArr.filter.length < 1) {
            continue;
        }

        let revSavedPluginLangEntitiesArr = await rev_pers_read_rev_entity_info_wrapper.revGetFilledEntities_Serv(revLangPhrasesGUIDsFilterArr.filter);

        let revLangCodeEntity = await revGetLangCodeEntity(revPluginViewLangCode);
        let revLangDetails = revLangCodeDetailsConst(revLangCodeEntity);

        let revPluginView = {
            [revPluginViewLangCode]: {
                [revPluginNameId]: {
                    [revViewType]: {
                        [revViewNameId]: {
                            "revLangDetails": revLangDetails,
                        },
                    },
                },
            },
        };

        for (let i = 0; i < revSavedPluginLangEntitiesArr.length; i++) {
            let revCurrPluginLangEntity = revSavedPluginLangEntitiesArr[i];

            let revCurrPluginLang = revLangPhraseConstructor(revCurrPluginLangEntity);

            if (!revCurrPluginLang || rev_json_functions.revIsEmptyJSONObject(revCurrPluginLang)) {
                continue;
            }

            revPluginView[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId]["revDefLangDetails"] = rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId];

            let revPluginLang = revCurrPluginLang.revPluginLang;
            let revLangKey = revCurrPluginLang.revLangKey;

            if (!revPluginView[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].hasOwnProperty(revLangKey)) {
                revPluginView[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revLangKey] = {};
            }

            if (
                revPluginView[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].hasOwnProperty(revLangKey) &&
                (!revPluginView[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revLangKey].hasOwnProperty("revDefLangPhrase") ||
                    /** */
                    rev_strings_helper_funcs.revIsEmptyVar(revPluginView[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revLangKey].revDefLangPhrase))

                /** */
            ) {
                revPluginView[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revLangKey]["revDefLangPhrase"] = rev_plugins_objects.revPluginsObjects.revLangsDefaults[revPluginNameId][revViewType][revViewNameId][revLangKey];
            }

            if (
                revPluginView[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId].hasOwnProperty(revLangKey) &&
                !revPluginView[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revLangKey].hasOwnProperty("revTransSuggestionsArr")
                /** */
            ) {
                revPluginView[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revLangKey]["revTransSuggestionsArr"] = [];
            }

            revPluginView[revPluginViewLangCode][revPluginNameId][revViewType][revViewNameId][revLangKey].revTransSuggestionsArr.push(revPluginLang);
        }

        if (!revRetLangs.hasOwnProperty(revPluginViewLangCode)) {
            revRetLangs[revPluginViewLangCode] = revPluginView[revPluginViewLangCode];
        }
    }

    return revRetLangs;
};

module.exports.revLoadSavedLangCodes = revLoadSavedLangCodes;
module.exports.revLoadSavedLangs = revLoadSavedLangs;
module.exports.revGetLangCodeEntity = revGetLangCodeEntity;
module.exports.revPluginLangConstructor = revPluginLangConstructor;
module.exports.revPluginLangDefaultsConstructor = revPluginLangDefaultsConstructor;
module.exports.revGetViewLang = revGetViewLang;
module.exports.revPluginViewLangs = revPluginViewLangs;
module.exports.revGetPluginViewLangs_By_OwnerGUID = revGetPluginViewLangs_By_OwnerGUID;
