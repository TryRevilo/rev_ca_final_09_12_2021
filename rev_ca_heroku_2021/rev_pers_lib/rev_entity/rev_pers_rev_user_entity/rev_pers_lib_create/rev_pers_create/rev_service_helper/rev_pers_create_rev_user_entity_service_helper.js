const rev_pers_rev_user_entity_accessor = require('../rev_accessor/rev_pers_rev_user_entity_accessor');

/** START NEW USERS API- - - - - - - - - - - - - - - - - - */

var filterRevRetArr = {
    filter: []
}

let cleanSyncNewRevUsers = (revData) => {
    return new Promise(function (resolve, reject) {
        rev_pers_rev_user_entity_accessor.revPersSaveRevUserEntity(revData, function (result) {
            resolve(result);
        })
    })
}

function syncNewRevUsersCollection(arr) {
    return arr.reduce((promise, item) => {
        return promise
            .then((result) => {
                if (item.hasOwnProperty('revUserEntity'))
                    return cleanSyncNewRevUsers(item).then(result => filterRevRetArr.filter.push(result));
            })
            .catch(console.error);
    }, Promise.resolve());
}

var createNewRevUserEntitiesArrayService = (revUserEntities, callback) => {
    syncNewRevUsersCollection(revUserEntities)
        .then(() => {
            callback(filterRevRetArr);
        });
}

/** END NEW USERS API - - - - - - - - - - - - - - - - - - */

module.exports.createNewRevUserEntitiesArrayService = createNewRevUserEntitiesArrayService