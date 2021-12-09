var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.revRemoteHookMethods) {
        let revRemoteHookMethods = revVarArgs.revRemoteHookMethods;
        let revReqParams = revVarArgs.revReqParams;

        let revLoggedInEntityGUID = revReqParams.rev_logged_in_entity_guid;
        let revPluginId = revReqParams.rev_plugin_id;

        /** REV START LOEDED PLUGINS */
        let revPassVarArgs = {
            "revLoggedInEntityGUID": revLoggedInEntityGUID,
        };

        let revLoadedPluginsNamesArr = revRemoteHookMethods.revGetLoadedPluginsNamesArr(revPassVarArgs);

        revVarArgs["revLoadedPluginsNamesArr"] = revLoadedPluginsNamesArr;
        /** REV END LOEDED PLUGINS */

        return revVarArgs;
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;
