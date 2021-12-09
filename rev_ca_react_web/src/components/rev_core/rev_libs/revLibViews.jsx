import React, { Component } from 'react';

var revDrawItemListingOptionsMenu = (props, revViewParentName) => {
    import('../rev_sessions/revPageViewsData').then(revModule => {
        revModule.revGetPageViewItems(props, (revPageViewItems) => {
            let revPageItemsView = revPageViewItems.map((revPageViewItem) => {
                if (revPageViewItem.revViewParentContainerName.localeCompare(revViewParentName) == 0)
                    return <React.Fragment>{revPageViewItem.revViewItem}</React.Fragment>;
            });

            props.revResetRevMainCenterView(revPageItemsView)
        });
    });
};

var revGetOverrideView = (revOverrideViewsArrayMap, revOverrideViewName) => {
    let revretOverrideView;

    for (let i = 0; i < revOverrideViewsArrayMap.length; i++) {
        let revOverrideView = revOverrideViewsArrayMap[i];

        if (revOverrideViewName.localeCompare(revOverrideView.REV_NAME_ID) == 0) {
            revretOverrideView = revOverrideView.revOverrideView.revViewItem;
            break;
        }
    }

    return revretOverrideView;
};

export { revDrawItemListingOptionsMenu, revGetOverrideView };
