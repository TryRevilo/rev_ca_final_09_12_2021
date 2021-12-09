import React, { Component } from 'react';

import RevItemListingShareMenuItem from './rev_views/rev_menu_items/revItemListingShareMenuItem';

var revInitPlugin = (props) => {
    return {
        'revPluginName': 'revSharePlugin',
        'revMenuItems': revMenuItemsArr(props)
    }
}

var revMenuItemsArr = (props) => {
    return [
        {
            'REV_NAME_ID': 'revItemListingShareMenuItem',
            'revMenuName': 'revItemListingShareMenuItem',
            'revMenuAreaName': 'revItemListingOptionsMenuItemArea',
            'revMenuItem': <RevItemListingShareMenuItem props={props} />
        }
    ];
}

export { revInitPlugin };
