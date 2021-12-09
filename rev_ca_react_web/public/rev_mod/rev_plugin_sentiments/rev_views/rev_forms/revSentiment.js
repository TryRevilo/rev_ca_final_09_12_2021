const revSentimentWidget = require('./rev_form_view_widgets/revSentimentWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_sentiments',
        'revNameId': 'revSentiment',
        'revOverrideView': revSentimentWidget.revFormViewWidget.toString(),
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_forms/rev_form_view_widgets/revSentimentWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;