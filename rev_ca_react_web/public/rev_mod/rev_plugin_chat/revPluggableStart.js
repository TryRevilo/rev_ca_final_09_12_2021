/** REV START FORMS */
const revChatMessagingSetingsForm = require("./rev_views/rev_forms/revChatMessagingSetingsForm");
const revComment = require("./rev_views/rev_forms/revChatMessagingForm");
/** REV END FORMS */

/** REV START PAGE VIEWS */
const revPageViewNewChatAlertsListingArea = require("./rev_views/rev_page_views/revPageViewNewChatAlertsListingArea");
const revPageViewReceivedChatView = require("./rev_views/rev_page_views/revPageViewReceivedChatView");
const revPageViewSentChatView = require("./rev_views/rev_page_views/revPageViewSentChatView");

const revObjectChatMessagesListing = require("./rev_views/rev_object_views/revObjectChatMessagesListing");
/** REV END PAGE VIEWS */

const revPageViewLiveUsersListingAreaWidget = require("./rev_views/rev_page_views/rev_page_view_widgets/revPageViewLiveUsersListingAreaWidget");
const revPluginModuleWebRTCResponce_NewMessages_Chat = require("./rev_libs_functions/revPluginModuleWebRTCResponce_NewMessages_Chat");

var revStart = () => {
    return {
        "revPluginName": "rev_plugin_chat",
        "revMenuItems": [],
        "revMenuAreas": [],
        "revPageViews": [revPageViewNewChatAlertsListingArea.revPluginPageView, revObjectChatMessagesListing.revPluginPageView, revPageViewReceivedChatView.revPluginPageView, revPageViewSentChatView.revPluginPageView],
        "revOverrideViews": [],
        "revForms": [revChatMessagingSetingsForm.revPluginOverrideView, revComment.revPluginOverrideView],
        "revPluginHookHandlers": [
            { "revNameID": "revPluginModuleWebRTCResponce_NewLiveUser", "revPluginHookName": "revPluginModuleWebRTCResponce", "revHandler": revPageViewLiveUsersListingAreaWidget.revPageViewWidget.toString() },
            { "revNameID": "revPluginModuleWebRTCResponce_NewMessages_Chat", "revPluginHookName": "revPluginModuleWebRTCResponce_NewMessages", "revHandler": revPluginModuleWebRTCResponce_NewMessages_Chat.revPluginHookCallback.toString() },
        ],
        "revPluginHookContextsRemoteArr": [],
        "revPluginHookHandlersRemote": [],
    };
};

module.exports.revStart = revStart;
