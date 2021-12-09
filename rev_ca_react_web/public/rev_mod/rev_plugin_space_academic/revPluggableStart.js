const revSpaceType_Academic = require('./rev_views/rev_forms/revSpaceType_Academic');
const revSpace_AcademicForm = require('./rev_views/rev_forms/revSpace_Academic');

const revPageViewSpaceBriefInfo_Academic = require('./rev_views/rev_context_views/revPageViewSpaceBriefInfo_Academic');
const revPageViewSpaceFullInfo_Academic = require('./rev_views/rev_context_views/revPageViewSpaceFullInfo_Academic');
const revPageViewSpaceActivity_Academic = require('./rev_views/rev_context_views/revPageViewSpaceActivity_Academic');

const revPageViewSpaceHeaderArea_Academic = require('./rev_views/rev_page_views/revPageViewSpaceHeaderArea_Academic');

var revStart = () => {

    return {
        'revPluginName': 'rev_plugin_space_academic',
        'revPageViews': [
            revPageViewSpaceHeaderArea_Academic.revPluginPageView,
        ],
        'revContextViews': [
            revPageViewSpaceBriefInfo_Academic.revContextView,
            revPageViewSpaceFullInfo_Academic.revContextView,
            revPageViewSpaceActivity_Academic.revContextView,
        ],
        'revForms': [
            revSpaceType_Academic.revPluginOverrideView,
            revSpace_AcademicForm.revPluginOverrideView,
        ],
        'revMenuItems': [
        ],
    }
};

module.exports.revStart = revStart;