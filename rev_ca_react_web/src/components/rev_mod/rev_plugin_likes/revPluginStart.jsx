import React, { Component } from 'react';

import RevItemListingLikesMenuItem from './rev_views/rev_menu_items/revItemListingLikesMenuItem';

var revInitPlugin = (props) => {
    return {
        'revPluginName': 'revLikesPlugin',
        'revMenuItems': revMenuItemsArr(props)
    }
}

var revMenuItemsArr = (props) => {
    return [
        {
            'REV_NAME_ID': 'revItemListingLikesMenuItem',
            'revMenuName': 'revItemListingLikesMenuItem',
            'revMenuAreaName': 'revItemListingOptionsMenuItemArea',
            'revMenuItem': <RevItemListingLikesMenuItem props={props} />
        }
    ];
}

export { revInitPlugin };
