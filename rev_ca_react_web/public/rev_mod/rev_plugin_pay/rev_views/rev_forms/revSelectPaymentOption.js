const revSelectPaymentOptionWidget = require('./rev_form_view_widgets/revSelectPaymentOptionWidget');

var revPluginOverrideView = () => {
    return {
        'rev_plugin_name': 'rev_plugin_pay',
        'revNameId': 'revSelectPaymentOption',
        'revOverrideView': revSelectPaymentOptionWidget.revFormViewWidget.toString(),
        'revMenuAreas': [
        ],
        'revMenuItems': [],
        // 'revCSSFiles': ['/rev_plugin_kiwi/rev_views/rev_forms/rev_form_view_widgets/revSelectPaymentOptionWidget.css']
    }
};

module.exports.revPluginOverrideView = revPluginOverrideView;