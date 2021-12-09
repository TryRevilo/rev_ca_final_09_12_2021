const revPageViewTimeLineStoresWidget = require("./rev_page_view_widgets/revPageViewTimeLineStoresWidget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_stores",
        "revNameId": "revPageViewTimeLineStores",
        "revPageViewContainerName": "revPageViewTimeLineStores",
        "revBefore": [],
        "revPageViewName": "revPageViewTimeLineStores",
        "revPageView": revPageViewTimeLineStoresWidget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_stores/rev_views/rev_page_views/rev_page_view_widgets/revPageViewTimeLineStoresWidget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
