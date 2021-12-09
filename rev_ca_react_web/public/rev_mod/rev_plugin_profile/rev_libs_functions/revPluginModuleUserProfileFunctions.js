(function (revPluginModuleUserProfileFunctions, $, undefined) {
    revPluginModuleUserProfileFunctions.revGetUserIconPath = (revVarArgs) => {
        let revProfileIconPath = "";

        if (!revVarArgs) {
            return revProfileIconPath;
        }

        let revProfileIconEntity = window.revGetRevEntityContainingMetadataValue(revVarArgs, "rev_profile_icon");

        if (revProfileIconEntity) {
            revProfileIconPath = window.revGetMetadataValue(revProfileIconEntity._revEntityMetadataList, "rev_remote_file_name");
        }

        return revProfileIconPath;
    };
})((window.revPluginModuleUserProfileFunctions = window.revPluginModuleUserProfileFunctions || {}), jQuery);
