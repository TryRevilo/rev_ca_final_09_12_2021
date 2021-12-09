var revGetMetadataValue = (revEntityMetadataList, revMetadataName) => {
    if (!revEntityMetadataList || !revEntityMetadataList.length) return "";

    let revMetadataValue = "";

    for (let i = 0; i < revEntityMetadataList.length; i++) {
        let revIsinfo = revEntityMetadataList[i]._revMetadataName.localeCompare(revMetadataName);

        if (revIsinfo == 0 && revEntityMetadataList[i]._metadataValue) {
            revMetadataValue = revEntityMetadataList[i]._metadataValue;
            break;
        }
    }

    return revMetadataValue;
};

var revGetMetadataValuesArr = (revEntityMetadataList, revMetadataName) => {
    let revMetadataValuesArr = [];

    if (!revEntityMetadataList || !revEntityMetadataList.length) {
        return revMetadataValuesArr;
    }

    for (let i = 0; i < revEntityMetadataList.length; i++) {
        let revIsinfo = revEntityMetadataList[i]._revMetadataName.localeCompare(revMetadataName) == 0;

        if (revIsinfo && revEntityMetadataList[i]._metadataValue) {
            revMetadataValuesArr.push(revEntityMetadataList[i]._metadataValue);
        }
    }

    return revMetadataValuesArr;
};

var revGetMetadataContainingMetadataName = (revEntityMetadataList, revMetadataName) => {
    if (!revEntityMetadataList) return;

    let revRetMetadata;

    for (let i = 0; i < revEntityMetadataList.length; i++) {
        let revCurrMetadataName = revEntityMetadataList[i]._revMetadataName;

        if (revMetadataName.localeCompare(revCurrMetadataName) == 0) {
            revRetMetadata = revEntityMetadataList[i];
            break;
        }
    }

    return revRetMetadata;
};

var revGetRevEntityMetadataContainingMetadataName = (revEntity, revMetadataName) => {
    let revRetMetadata;

    let revItRevEntityChild = (revChildEntity) => {
        for (let i = 0; i < revChildEntity._revEntityChildrenList.length; i++) {
            revRetMetadata = revGetMetadataContainingMetadataName(revChildEntity._revEntityChildrenList[i]._revEntityMetadataList, revMetadataName);

            if (revRetMetadata) {
                break;
            }
        }
    };

    if (revEntity._revEntityChildrenList.length > 0) {
        for (let i = 0; i < revEntity._revEntityChildrenList.length; i++) {
            let revCurrEntity = revEntity._revEntityChildrenList[i];

            if (revCurrEntity._revEntityChildrenList.length > 0) revItRevEntityChild(revCurrEntity);

            if (revRetMetadata) {
                break;
            }

            if (revCurrEntity && revCurrEntity._revEntityMetadataList) {
                revRetMetadata = window.revGetMetadataContainingMetadataName(revCurrEntity._revEntityMetadataList, revMetadataName);

                if (revRetMetadata) {
                    break;
                }
            }
        }
    } else revRetMetadata = window.revGetMetadataContainingMetadataName(revEntity._revEntityMetadataList, revMetadataName);

    return revRetMetadata;
};

var revGetRevEntityContainingMetadataValue = (revEntityParent, revMetadataValue) => {
    let revEntity;

    if (!revEntityParent || !Array.isArray(revEntityParent._revEntityChildrenList)) return null;

    if (revEntityParent._revEntityChildrenList.length > 0) {
        for (let i = 0; i < revEntityParent._revEntityChildrenList.length; i++) {
            let revCurrEntity = revEntityParent._revEntityChildrenList[i];

            if (!revCurrEntity || revCurrEntity._revEntityMetadataList.length < 0) continue;

            let revEntityMetadataList = revCurrEntity._revEntityMetadataList;

            for (let i = 0; i < revEntityMetadataList.length; i++) {
                let revIsEqStr = revEntityMetadataList[i]._metadataValue.localeCompare(revMetadataValue);

                if (revEntityMetadataList[i]._metadataValue && revIsEqStr == 0) {
                    revEntity = revCurrEntity;
                    break;
                }
            }

            if (revEntity) {
                break;
            } else if (revCurrEntity && revCurrEntity._revEntityChildrenList) {
                revEntity = window.revGetRevEntityContainingMetadataValue(revCurrEntity, revMetadataValue);

                if (revEntity) {
                    break;
                }
            }
        }
    }

    return revEntity;
};

var revGetRemoteMetadataId = (revEntityMetadataList, revMetadataName) => {
    let revRemoteMetadataId = -1;

    for (let i = 0; i < revEntityMetadataList.length; i++) {
        let revIsinfo = revEntityMetadataList[i]._revMetadataName.localeCompare(revMetadataName);
        let revMetadataValue = revEntityMetadataList[i]._metadataValue;

        if (revIsinfo == 0 && revMetadataValue) {
            revRemoteMetadataId = revEntityMetadataList[i].remoteRevMetadataId;
            break;
        }
    }

    return revRemoteMetadataId;
};

var revMetadataFiller = (revMetadataName, revMetadataVal) => {
    let revMetadata = window.REV_ENTITY_METADATA_STRUCT();
    revMetadata._revMetadataName = revMetadataName;
    revMetadata._metadataValue = revMetadataVal;

    return revMetadata;
};

var revRemoveMetadata_By_NameId = (revEntityMetadaList, revMetadataNamesArr) => {
    let revNewMetadataListArr = [];

    for (let i = 0; i < revEntityMetadaList.length; i++) {
        let revMetadataName = revEntityMetadaList[i]._revMetadataName;

        if (!window.revArrIncludesElement(revMetadataNamesArr, revMetadataName)) {
            revNewMetadataListArr.push(revEntityMetadaList[i]);
        }
    }

    return revNewMetadataListArr;
};

var revGetDuplicateMetadataArr = (revMetadataList) => {
    let revDuplicatesArr = [];
    let revIteratedIdsArr = [];

    if (!revMetadataList) {
        return revDuplicatesArr;
    }

    for (let i = 0; i < revMetadataList.length; i++) {
        let revCurrMetadata = revMetadataList[i];

        let revMetadataValsArr = window.revGetMetadataValuesArr(revMetadataList, revCurrMetadata._revMetadataName);

        // If the value appears more than once it's a duplicate == revMetadataValsArr.length > 1
        for (let val = 0; val < revMetadataValsArr.length; val++) {
            if (revIteratedIdsArr.indexOf(revCurrMetadata.remoteRevMetadataId) !== -1) {
                continue;
            }

            if (window.revIsDuplicateInArr(revMetadataValsArr, revCurrMetadata._metadataValue)) {
                revDuplicatesArr.push(revCurrMetadata);
                revIteratedIdsArr.push(revCurrMetadata.remoteRevMetadataId);
            }
        }
    }

    return revDuplicatesArr;
};

var revIsDuplicateMetadata = (revMetadataList, revMetadata) => {
    let revDuplicateMetadataArr = window.revGetDuplicateMetadataArr(revMetadataList);

    if (revDuplicateMetadataArr.length < 2) {
        return false;
    } else {
        let revDuplicateMetadataValsArr = window.revGetMetadataValuesArr(revMetadataList, revMetadata._revMetadataName);

        let revDuplicatesCount = 0;

        for (let i = 0; i < revDuplicateMetadataValsArr.length; i++) {
            let revDuplicateMetadataVal = revDuplicateMetadataValsArr[i];

            if (revDuplicateMetadataVal.localeCompare(revMetadata._metadataValue) == 0) {
                revDuplicatesCount = revDuplicatesCount + 1;
            }

            if (revDuplicatesCount > 1) {
                return true;
            }
        }
    }

    return true;
};
