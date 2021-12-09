var REV_BASE_URL = "http://127.0.0.1:4000";
var REV_CREATE_NEW_REV_ENTITY_URL = REV_BASE_URL + "/rev_api/rev_create_new_entity";
var REV_CREATE_NEW_REV_ENTITY_RELATIONSHIP_URL = REV_BASE_URL + "/rev_api/sync_new_rev_relationship";

var REV_CREATE_NEW_AD_REV_ENTITY_URL = REV_BASE_URL + "/rev_api/rev_create_new_ad_entity";
var REV_CREATE_NEW_CONTACT_BOOK_ENTITY_URL = REV_BASE_URL + "/rev_api/rev_create_new_contacts_book_entity";
var REV_CREATE_NEW_REL_URL = REV_BASE_URL + "/rev_api/sync_new_rev_relationship";
var REV_CREATE_NEW_ANN_URL = REV_BASE_URL + "/rev_api/rev_post_rev_annotation";

var REV_UPDATE_REV_ENTITIES_DATA_URL = REV_BASE_URL + "/rev_api/rev_update_entities";

var REV_UPDATE_METADATA_ARR_URL = REV_BASE_URL + "/rev_api/rev_update_rev_entity_metadata_value";
var REV_NEW_METADATA_ARR_URL = REV_BASE_URL + "/rev_api/save_rev_entity_metadata";
var REV_DELETE_METADATA_ID_ARR_URL = REV_BASE_URL + "/rev_api/rev_delete_entity_metadata_by_id";

var REV_DELETE_REV_ENTITY_URL = REV_BASE_URL + "/rev_api/rev_delete/rev_delete_rev_entity_by_rev_entity_guids";
var REV_DELETE_REV_ENTITY_WITH_CHILDS_URL = REV_BASE_URL + "/rev_api/rev_delete/rev_delete_rev_entity_with_childs_by_rev_entity_guids";
var REV_DELETE_REV_REL_SINGLE_URL = REV_BASE_URL + "/rev_api/delete_rev_rel_by_rev_val_id_rel_entity_guids";

var REV_ENTITY_STRUCT = () => {
    return {
        "_revEntityType": "",
        "_revEntitySubType": "",
        "_revEntityGUID": -1,
        "_remoteRevEntityGUID": -1,
        "_revEntityOwnerGUID": -1,
        "_revEntityContainerGUID": -1,
        "_revEntityRemoteContainerGUID": -1,
        "_revEntitySiteGUID": -1,
        "_revEntityAccessPermission": -1,
        "_revEntityResolveStatus": -1,
        "_revEntityChildableStatus": -1,
        "_revEntityMetadataList": [],
        "_revEntityAnnotations": [],
        "_revEntityChildrenList": [],
        "_revInfoEntity": {},
        "_timeCreated": "",
        "_timeUpdated": "",
        "_revTimeCreated": new Date().getTime(),
        "_revTimePublished": "",
        "_revTimePublishedUpdated": -1,
        "_revPersContainerChildren": [],
        "_revTargetEntityRelationships": [],
        "_revSubjectEntityRelationships": [],
    };
};

var REV_ENTITY_METADATA_STRUCT = () => {
    return {
        "_resolveStatus": -1,
        "remoteRevMetadataId": -1,
        "_revMetadataName": "",
        "_metadataValue": "",
        "_timeCreated": "",
        "_revTimeCreated": "",
        "_revIsUnique": true,
    };
};

var REV_ENTITY_RELATIONSHIP_STRUCT = () => {
    return {
        "_revResolveStatus": -1,
        "_revOwnerGUID": window.REV_LOGGED_IN_ENTITY_GUID,
        "_revEntitySubjectGUID": -1,
        "_remoteRevEntitySubjectGUID": -1,
        "_revEntityTargetGUID": -1,
        "_remoteRevEntityTargetGUID": -1,
        "_revEntityRelationshipType": "",
        "_revEntityRelationshipId": -1,
        "_revEntityRelationshipRemoteId": -1,
    };
};

var REV_ENTITY_ANNOTATION = () => {
    return {
        "_revAnnotationResStatus": -1,
        "_revAnnotationRemoteId": -1,
        "_revAnnotationNameId": -1,
        "_revAnnotationValue": "",
        "_revAnnotationRemoteEntityGUID": -1,
        "_revAnnRemoteOwnerEntityGUID": -1,
        "_revUnique": false,
        "_revIncremental": false,
    };
};

var revSetNewRemoteFile = (revLocalFile, revSeedId) => {
    let revNewFile;

    setTimeout(
        (function (revFile) {
            let revCurrTime = new Date().getTime();

            let revNewFileNameConst = window.REV_LOGGED_IN_ENTITY_GUID + "_" + revCurrTime;

            if (revSeedId) revNewFileNameConst = revNewFileNameConst + "_" + revSeedId;

            let revFileType = window.revGetFileType(revLocalFile);
            let revNewFileName = revNewFileNameConst + "." + revFileType;

            revNewFile = new File([revLocalFile], revNewFileName, { type: revLocalFile.type });
        })(revLocalFile),
        100
    );

    return revNewFile;
};

var revSetFileObject = (revEntitySubType, revEntityContainerGUID, revFileName) => {
    let revFileEntity = window.REV_ENTITY_STRUCT();
    revFileEntity._revEntityResolveStatus = 0;
    revFileEntity._revEntityType = "rev_object";
    revFileEntity._revEntitySubType = revEntitySubType;
    revFileEntity._revRemoteEntityGUID = -1;
    revFileEntity._revEntityOwnerGUID = window.REV_LOGGED_IN_ENTITY_GUID;
    revFileEntity._revEntityContainerGUID = revEntityContainerGUID;
    revFileEntity._revTimeCreated = new Date().getTime();
    revFileEntity._revEntityChildableStatus = 2;

    let revFileMetadataFileNameVal = window.REV_ENTITY_METADATA_STRUCT();
    revFileMetadataFileNameVal._revMetadataName = "rev_remote_file_name";
    revFileMetadataFileNameVal._metadataValue = revFileName;

    let revFileEntityMetadataList = [revFileMetadataFileNameVal];

    revFileEntity._revEntityMetadataList = revFileEntityMetadataList;

    return revFileEntity;
};

var revPostServerData = (revURL, revJSONData, callback) => {
    fetch(revURL, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(revJSONData),
    })
        .then((response) => response.json())
        .then((revData) => {
            callback(revData);
        })
        .catch((error) => {
            console.error("Error : revPostServerData : " + revURL + "\n", error);
        });
};

var revGetServerData_JSON = (revURL, callback) => {
    const revHeaders = new Headers();

    fetch(revURL, {
        method: "GET",
        headers: revHeaders,
        mode: "cors",
        cache: "default",
        credentials: "omit",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok!");
            }
            return res.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch((err) => console.log("revGetServerData_JSON : " + revURL + "\n" + err));
};

var revUploadFile = (revURL) => {
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    formData.append("username", "abc123");
    formData.append("avatar", fileField.files[0]);

    fetch(revURL, {
        method: "PUT",
        body: formData,
    })
        .then((response) => response.json())
        .then((result) => {
            console.log("Success:", result);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

var revUploadFiles = (revURL, revFiles, callback) => {
    const formData = new FormData();

    formData.append("title", "My Vegas Vacation");
    for (let i = 0; i < revFiles.length; i++) {
        formData.append("photos", revFiles[i]);
    }

    fetch(revURL, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((result) => {
            callback(result);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

var revGetServerData_Async = async (revURL) => {
    let response;
    try {
        response = await fetch(revURL);
    } catch (err) {
        console.log("fet err");
    }

    return response;
};

var revGetServerData_JSON_Async = async (revURL) => {
    let response = await revGetServerData_Async(revURL);
    let data = await response.json();
    return data;
};

var revGetServerData_Text_Async = async (revURL) => {
    let response;

    try {
        response = await revGetServerData_Async(revURL);
    } catch (error) {
        console.log(error);
        return "err";
    }

    if (!response) return "err";

    let data = await response.text();

    return data;
};

/** START REV ENTITY UPDATE */

var revEntityUdateData = (revEntityOriginal, revEntityUpdate) => {
    let revEntityGUID = revEntityOriginal._remoteRevEntityGUID;

    let revWalkRevEntityMetadata = (revEntityUpdateMetadataArr, revOriginalMetatadataArr) => {
        let revEntityNewMetaDataArr = [];
        let revEntityUpdateMetaDataArr = [];
        let revEntityDeleteMetadataArr = [];

        /** REV START DELETE SAVED DUPLICATES */
        let revSavedMetadataDuplicatesArr = window.revGetDuplicateMetadataArr(revOriginalMetatadataArr);

        for (let i = 0; i < revSavedMetadataDuplicatesArr.length; i++) {
            let revCurrDuplicateMetadata = revSavedMetadataDuplicatesArr[i];

            /** REV START GET LAST ONES ADDED */
            for (let t = 0; t < revSavedMetadataDuplicatesArr.length; t++) {
                if (revCurrDuplicateMetadata.remoteRevMetadataId == revSavedMetadataDuplicatesArr[t].remoteRevMetadataId) {
                    continue;
                }

                let revIsDuplicate = window.revIsDuplicateMetadata(revSavedMetadataDuplicatesArr, revCurrDuplicateMetadata);

                if (revIsDuplicate === false) {
                    continue;
                }

                let revCurrDuplicateMetadataDate = Number(revCurrDuplicateMetadata._revPublishedDate);
                let revSavedMetadataDuplicateDate = Number(revSavedMetadataDuplicatesArr[t]._revPublishedDate);

                if (revCurrDuplicateMetadataDate && revCurrDuplicateMetadataDate <= revSavedMetadataDuplicateDate) {
                    continue;
                }

                revEntityDeleteMetadataArr.push(revCurrDuplicateMetadata);
            }

            /** REV END GET LAST ONES ADDED */
        }

        /** REV START DELETE SAVED DUPLICATES */

        for (let i = 0; i < revEntityUpdateMetadataArr.length; i++) {
            let revUpdateMetadata = revEntityUpdateMetadataArr[i];

            let revMetadataName = revUpdateMetadata._revMetadataName;

            let revUpdateMetadataValue = revUpdateMetadata._metadataValue;
            let revOriginalMetadataValue = window.revGetMetadataValue(revOriginalMetatadataArr, revMetadataName);

            if (!revOriginalMetadataValue || !revUpdateMetadata._revIsUnique) {
                let revIsInOriginalMetadataList = window.revArrIncludesElement(window.revGetMetadataValuesArr(revOriginalMetatadataArr, revMetadataName), revUpdateMetadata._metadataValue);
                let revIsUpdateDuplicateVal = window.revIsDuplicateMetadata(revEntityUpdateMetaDataArr, revUpdateMetadata);

                if (!revIsInOriginalMetadataList && !revIsUpdateDuplicateVal) {
                    revUpdateMetadata["revEntityGUID"] = revEntityGUID;

                    revEntityNewMetaDataArr.push(revUpdateMetadata);
                }
            } else if (revOriginalMetadataValue && revOriginalMetadataValue.localeCompare(revUpdateMetadataValue) !== 0) {
                let remoteRevMetadataId = window.revGetRemoteMetadataId(revOriginalMetatadataArr, revMetadataName);

                if (remoteRevMetadataId && remoteRevMetadataId > 0) {
                    revUpdateMetadata.remoteRevMetadataId = remoteRevMetadataId;
                    revEntityUpdateMetaDataArr.push(revUpdateMetadata);
                }
            }

            for (let i = 0; i < revOriginalMetatadataArr.length; i++) {
                let revOriginalMetatadata = revOriginalMetatadataArr[i];

                if (revUpdateMetadata._revIsUnique) {
                    let revDeleteMetadataValue = window.revGetMetadataValue(revEntityUpdateMetadataArr, revOriginalMetatadata._revMetadataName);

                    if (!revDeleteMetadataValue) {
                        revEntityDeleteMetadataArr.push(revOriginalMetatadata);
                    }
                } else {
                    let revUpdateMetadataValuesArr = window.revGetMetadataValuesArr(revEntityUpdateMetadataArr, revOriginalMetatadata._revMetadataName);

                    if (!window.revArrIncludesElement(revUpdateMetadataValuesArr, revOriginalMetatadata._metadataValue)) {
                        revEntityDeleteMetadataArr.push(revOriginalMetatadata);
                    }
                }
            }

            /** REV START REMOVE DUPLICATES */
            let revMetadataDuplicatesArr = window.revGetDuplicateMetadataArr(revEntityUpdateMetadataArr);
            revMetadataDuplicatesArr = revMetadataDuplicatesArr.concat(window.revGetDuplicateMetadataArr(revEntityUpdateMetadataArr));

            for (let dup = 0; dup < revMetadataDuplicatesArr.length; dup++) {
                let revMetadata = revMetadataDuplicatesArr[dup];

                if (revMetadata.remoteRevMetadataId < 1) {
                    continue;
                }

                /** REV START GET LAST ONES ADDED */
                for (let i = 0; i < revMetadataDuplicatesArr.length; i++) {
                    if (revMetadata._revPublishedDate && revMetadata._revPublishedDate < revMetadataDuplicatesArr[i]._revTimePublished) {
                        continue;
                    }

                    revEntityDeleteMetadataArr.push(revMetadata);
                }
                /** REV END GET LAST ONES ADDED */
            }
            /** REV END REMOVE DUPLICATES */
        }

        return {
            "revEntityNewMetaDataArr": revEntityNewMetaDataArr,
            "revEntityUpdateMetaDataArr": revEntityUpdateMetaDataArr,
            "revEntityDeleteMetadataArr": revEntityDeleteMetadataArr,
        };
    };

    return revWalkRevEntityMetadata(revEntityUpdate._revEntityMetadataList, revEntityOriginal._revEntityMetadataList);
};

/** END REV ENTITY UPDATE */
