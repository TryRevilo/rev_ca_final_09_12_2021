var revPluginHookCallback = async (revVarArgs) => {
    console.log("NEW M ALLERT . . . . " + JSON.stringify(revVarArgs));

    return revVarArgs;
};

module.exports.revPluginHookCallback = revPluginHookCallback;
