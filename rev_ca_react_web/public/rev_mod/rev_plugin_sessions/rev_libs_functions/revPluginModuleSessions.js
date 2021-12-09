(function (revPluginModuleSessions, $, undefined) {
    var isHot = true;

    //Public Property
    revPluginModuleSessions.ingredient = "Bacon Strips";

    //Public Method
    revPluginModuleSessions.fry = function () {
        var oliveOil;

        addItem("\t\n Butter \n\t");
        addItem(oliveOil);
        console.log("Frying " + revPluginModuleSessions.ingredient);
    };

    //Private Method
    function addItem(item) {
        if (item !== undefined) {
            console.log("Adding " + $.trim(item));
        }
    }

    revPluginModuleSessions.revGetLoggedInEntity = (callback) => {
        if (!window.REV_LOGGED_IN_ENTITY) {
            callback(null);
        } else callback(window.REV_LOGGED_IN_ENTITY);
    };

    let REV_EXPLORED_ENTITIES_ARR = [];
    revPluginModuleSessions.REV_EXPLORED_ENTITIES_ARR = REV_EXPLORED_ENTITIES_ARR;

    revPluginModuleSessions.revAddExploredEntity = (revVarArgs, callback) => {
        let revResStatus = REV_EXPLORED_ENTITIES_ARR.push(revVarArgs);

        callback(revResStatus);
    };

    revPluginModuleSessions.revGetCurrPageOwnerEntity = () => {
        if (REV_EXPLORED_ENTITIES_ARR) return REV_EXPLORED_ENTITIES_ARR[REV_EXPLORED_ENTITIES_ARR.length - 1];
    };

    revPluginModuleSessions.isRevPageOwnerEntity = (remoteRevEntityGUID) => {
        return window.REV_LOGGED_IN_ENTITY_GUID == remoteRevEntityGUID;
    };
})((window.revPluginModuleSessions = window.revPluginModuleSessions || {}), jQuery);
