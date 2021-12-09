const revNoticiaItemOverrideViewWidget = require("./rev_override_view_widgets/revNoticiaItemOverrideViewWidget");

var revPluginOverrideView = () => {
    return {
        "rev_plugin_name": "rev_plugin_noticias",
        "revNameId": "rev_noticia",
        "revOverrideView": revNoticiaItemOverrideViewWidget.revPluginOverrideViewWidget.toString(),
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_override_views/rev_override_view_widgets/revNoticiaItemOverrideViewWidget.css']
    };
};

module.exports.revPluginOverrideView = revPluginOverrideView;
