function revIsEmptyJSONObject(obj) {
    if (obj == undefined) {
        return true;
    }

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return !obj || JSON.stringify(obj) === JSON.stringify({});
}

var revJSONArrContains_NameId = (revJSONArr, revNameIdCheck) => {
    let revInJSONArr = false;

    if (!revJSONArr || revJSONArr == undefined || !revJSONArr.length) {
        return revInJSONArr;
    }

    for (let i = 0; i < revJSONArr.length; i++) {
        let revCurrItem = revJSONArr[i];

        if (revCurrItem.revNameId && revCurrItem["revNameId"].localeCompare(revNameIdCheck) == 0) {
            revInJSONArr = true;
            break;
        }
    }

    return revInJSONArr;
};

var revCloneJsObject = (revJsONObject) => {
    if (revIsEmptyJSONObject(revJsONObject)) {
        return null;
    }

    return JSON.parse(JSON.stringify(revJsONObject));
};

var revArrIncludesElement = (revArr, revVal) => {
    let revIncludesElement = false;

    for (let i = 0; i < revArr.length; i++) {
        if (revArr[i] == revVal) {
            revIncludesElement = true;
            break;
        }
    }

    return revIncludesElement;
};

var revEntitiesArrIncludesEntityGUID = (revEntitiesArr, revEntityGUID) => {
    let revIsAdded = false;

    if (!revEntitiesArr) {
        return revIsAdded;
    }

    for (let i = 0; i < revEntitiesArr.length; i++) {
        if (revEntitiesArr[i]._remoteRevEntityGUID == revEntityGUID) {
            revIsAdded = true;
            break;
        }
    }

    return revIsAdded;
};

var revEntitiesDBResArrIncludesEntityGUID = (revEntitiesDBResArr, revEntityGUID) => {
    let revIsAdded = false;

    for (let i = 0; i < revEntitiesDBResArr.length; i++) {
        if (revEntitiesDBResArr[i].REMOTE_REV_ENTITY_GUID == revEntityGUID) {
            revIsAdded = true;
            break;
        }
    }

    return revIsAdded;
};

module.exports.revIsEmptyJSONObject = revIsEmptyJSONObject;
module.exports.revJSONArrContains_NameId = revJSONArrContains_NameId;
module.exports.revCloneJsObject = revCloneJsObject;
module.exports.revArrIncludesElement = revArrIncludesElement;
module.exports.revEntitiesArrIncludesEntityGUID = revEntitiesArrIncludesEntityGUID;
module.exports.revEntitiesDBResArrIncludesEntityGUID = revEntitiesDBResArrIncludesEntityGUID;
