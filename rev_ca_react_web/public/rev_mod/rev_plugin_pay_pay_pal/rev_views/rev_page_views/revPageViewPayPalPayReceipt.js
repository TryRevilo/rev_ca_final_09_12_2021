const revPageViewPayPalPayReceipt_Widget = require("./rev_page_view_widgets/revPageViewPayPalPayReceipt_Widget");

var revPluginPageView = () => {
    return {
        "rev_plugin_name": "rev_plugin_pay_pay_pal",
        "revNameId": "revPageViewPayPalPayReceipt",
        "revPageViewContainerName": "revPageViewPayPalPayReceipt",
        "revBefore": [],
        "revPageViewName": "revPageViewPayPalPayReceipt",
        "revPageView": revPageViewPayPalPayReceipt_Widget.revPageViewWidget.toString(),
        "revContainerMenuAreas": [],
        "revMenuAreas": [],
        "revMenuItems": [],
        // 'revCSSFiles': ['/rev_plugin_pay_pay_pal/rev_views/rev_page_views/rev_page_view_widgets/revPageViewPayPalPayReceipt_Widget.css']
    };
};

module.exports.revPluginPageView = revPluginPageView;
