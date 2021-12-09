const revContextViewSentimentsTimeLine = require('./rev_views/rev_context_views/revContextViewSentimentsTimeLine');
const revContextFormTimelineSentimentSave = require('./rev_views/rev_context_forms/revContextFormTimelineSentimentSave');
const revSentimentForm = require('./rev_views/rev_forms/revSentiment');

var revStart = () => {
    return {
        'revPluginName': 'rev_plugin_sentiments',
        'revPageViews': [
        ],
        'revContextViews': [
            revContextViewSentimentsTimeLine.revContextView
        ],
        'revForms': [
            revSentimentForm.revPluginOverrideView
        ],
        'revContextForms': [
            revContextFormTimelineSentimentSave.revContextView
        ],
        'revMenuItems': [
        ],
    }
};

module.exports.revStart = revStart;