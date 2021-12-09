const revContextFormTimelineSentimentSaveWidget = require('./rev_context_form_view_widgets/revContextFormTimelineSentimentSaveWidget');

var revContextView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_sentiments',
        'revNameId': 'revSentiment',
        'revContexts': ['revContextTimeline'],
        'revContextForm': revContextFormTimelineSentimentSaveWidget.revFormViewWidget.toString(),
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_forms/rev_form_view_widgets/revKiwiWidget.css']
    }
};

module.exports.revContextView = revContextView;