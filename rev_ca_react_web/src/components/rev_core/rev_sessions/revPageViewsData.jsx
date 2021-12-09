import React, { Component } from 'react';

var revGetRegisteredPluginsStartPaths = () => {
    return [
        'rev_plugin_likes/revPluginStart',
        'rev_plugin_bookmark/revPluginStart',
        'rev_plugin_share/revPluginStart',
    ];
}

var getRevPluginModulesPromises = (revPluginPaths) => {
    let revPluginMudulesArr = [];

    for (let i = 0; i < revPluginPaths.length; i++) {
        revPluginMudulesArr.push(import('../../rev_mod/' + revPluginPaths[i]));
    }

    return revPluginMudulesArr;
}

var revGetPageMenuItems = (props, callback) => {
    let revPluginModulesPromises = getRevPluginModulesPromises(revGetRegisteredPluginsStartPaths());

    let revPageMenuItems = [];

    for (let i = 0; i < revPluginModulesPromises.length; i++) {
        revPluginModulesPromises[i].then((revModule) => {
            let revPluginInitsArr = revModule.revInitPlugin(props);
            let revMenuItems = revPluginInitsArr.revMenuItems;

            if (!revMenuItems) return;

            for (let iMenu = 0; iMenu < revMenuItems.length; iMenu++) {
                revPageMenuItems.push(revMenuItems[iMenu]);
            }
        }).then(() => callback(revPageMenuItems));
    }
}

var revGetPageViewItems = (props, callback) => {
    let revPluginModulesPromises = getRevPluginModulesPromises(revGetRegisteredPluginsStartPaths());

    let revPageViewItems = [];

    for (let i = 0; i < revPluginModulesPromises.length; i++) {
        revPluginModulesPromises[i].then((revModule) => {
            let revPluginInitsArr = revModule.revInitPlugin(props);
            let revViewItemsArr = revPluginInitsArr.revViewItemsArr;

            if (!revViewItemsArr) return;

            for (let iView = 0; iView < revViewItemsArr.length; iView++) {
                revPageViewItems.push(revViewItemsArr[iView]);
            }
        }).then(() => callback(revPageViewItems));
    }
}

var revGetOverrideViewItemsMappedArr = (props, callback) => {
    let revPluginModulesPromises = getRevPluginModulesPromises(revGetRegisteredPluginsStartPaths());

    let revViewItems = [];
    let revOverrideViewsObjects = [];

    for (let i = 0; i < revPluginModulesPromises.length; i++) {
        revPluginModulesPromises[i].then((revModule) => {
            let revPluginInitsArr = revModule.revInitPlugin(props);
            let revOverrideViewItemsArr = revPluginInitsArr.revOverrideViewItemsArr;

            if (!revOverrideViewItemsArr) return;

            for (let iView = 0; iView < revOverrideViewItemsArr.length; iView++) {
                revViewItems.push(revOverrideViewItemsArr[iView]);
            }

            for (let iView = 0; iView < revOverrideViewItemsArr.length; iView++) {
                revOverrideViewsObjects.push({
                    'REV_NAME_ID': [revOverrideViewItemsArr[iView].REV_NAME_ID],
                    'revOverrideView': revOverrideViewItemsArr[iView]
                });
            }
        }).then(() => {
            callback(revOverrideViewsObjects);
        });
    }
}

var revGetOverridePluginView = async (revNameId, props) => {
    let revPluginModulesPromises = getRevPluginModulesPromises(revGetRegisteredPluginsStartPaths());

    let revViewItems = [];
    let revViewItem;

    for (let i = 0; i < revPluginModulesPromises.length; i++) {
        let revModule = await revPluginModulesPromises[i];

        let revPluginInitsArr = revModule.revInitPlugin(props);

        if (!revPluginInitsArr.hasOwnProperty('revOverrideViewItemsArr')) continue;

        let revOverrideViewItemsArr = revPluginInitsArr.revOverrideViewItemsArr;

        if (!revOverrideViewItemsArr) return;

        for (let iView = 0; iView < revOverrideViewItemsArr.length; iView++) {
            revViewItems.push(revOverrideViewItemsArr[iView]);
        }

        for (let iView = 0; iView < revOverrideViewItemsArr.length; iView++) {
            if (revNameId.localeCompare(revOverrideViewItemsArr[iView].REV_NAME_ID) == 0) {
                revViewItem = revOverrideViewItemsArr[iView].revViewItem;
                break;
            }
        }
    }

    return revViewItem;
}

export { revGetPageMenuItems, revGetPageViewItems, revGetOverrideViewItemsMappedArr, revGetOverridePluginView };