const revSpaceType_Social = require('./rev_views/rev_forms/revSpaceType_Social');
const revSpace_Social = require('./rev_views/rev_forms/revSpace_Social');
const revPageViewSpaceBriefInfo_Social = require('./rev_views/rev_page_views/revPageViewSpaceBriefInfo_Social');
const revPageViewSpaceProfilePage_Social = require('./rev_views/rev_page_views/revPageViewSpaceProfilePage_Social');

var revStart = () => {

    return {
        'revPluginName': 'rev_plugin_space_social',
        'revPageViews': [
            revPageViewSpaceBriefInfo_Social.revPluginPageView,
            revPageViewSpaceProfilePage_Social.revPluginPageView,
        ],
        'revContextViews': [
        ],
        'revForms': [
            revSpaceType_Social.revPluginOverrideView,
            revSpace_Social.revPluginOverrideView,
        ],
        'revMenuItems': [
        ],
    }
};

module.exports.revStart = revStart;