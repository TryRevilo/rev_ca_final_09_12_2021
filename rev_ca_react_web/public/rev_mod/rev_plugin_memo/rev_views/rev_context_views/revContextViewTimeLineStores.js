const revContextViewTimeLineStoresWidget = require("./rev_context_view_widgets/revContextViewTimeLineStoresWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_memo",
        "revNameId": "revStore",
        "revContexts": ["revContextTimeline"],
        "revContextView": "",
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_comms/rev_views/rev_page_views/rev_page_view_widgets/revContextViewTimeLineStoresWidget.css']
    };
};

module.exports.revContextView = revPluginPageView;
