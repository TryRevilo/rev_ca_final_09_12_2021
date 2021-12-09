var revPageViewWidget = async (revVarArgs) => {
    let revMenuNamesArr = ['Posts', 'Edit', 'Membership', 'Contacts', 'Admins'];

    let revMenuesArr = [];

    let revPrepMenuItemView = (revMenuName) => {
        if (!revMenuName) return '';

        if (revMenuName.localeCompare('Edit') == 0) {
            let revMenuId = 'revMenuId_' + window.revGenUniqueId();

            window.revSetInterval(revMenuId, () => {
                document.getElementById(revMenuId).addEventListener('click', async (event) => {
                    let revAcademicSpaceTypeForm = await window.revGetForm(revVarArgs._revEntitySubType, revVarArgs);
                    document.getElementById('revPageContextViewSpaceActivityId').innerHTML = `<div class="revFlexContainer revSettingsEditSpaceContainer">${revAcademicSpaceTypeForm}</div>`;
                });
            });

            let revMenuView = `<div id="${revMenuId}" class="revSmalllBoldBlue revTabLink revMenuName">${revMenuName}</div>`;

            return revMenuView;
        }

        return `<div class="revSmalllBoldBlue revTabLink revMenuName">${revMenuName}</div>`;
    };

    for (let i = 0; i < revMenuNamesArr.length; i++) {
        revMenuesArr.push(revPrepMenuItemView(revMenuNamesArr[i]));
    }


    let revSpaceOptionElements = [
        'Anyone',
        'Members only',
    ];

    let revSpaceOptionsArr = [];

    let revGetSpaceOptionViewItem = (revSpaceOption) => {
        let revCheckBoxCallback = (revCBVarArgs) => {
            console.log('>>> | > ' + JSON.stringify(revCBVarArgs));
        };

        let revCBVarArgs = {
            'revCheckBoxCallback': revCheckBoxCallback,
            'revCheckBoxId': 'revSelectStoreCheckBoxId_' + window.revGenUniqueId(),
        };

        let revSelectOptionCheckBox = window.revGetCheckBox(revCBVarArgs);

        return `<div class="revFontSiteGreyTxtColor revFontSizeNormal revFlexWrapper revCheckBoxOptionWrapper">${revSelectOptionCheckBox}<span class="revCheckBoxOptionTxt">${revSpaceOption}</span></div>`;
    };

    for (let i = 0; i < revSpaceOptionElements.length; i++) {
        revSpaceOptionsArr.push(revGetSpaceOptionViewItem(revSpaceOptionElements[i]));
    }

    let revDeleteSpaceTabId = 'revDeleteSpaceTabId_' + window.revGenUniqueId();

    window.revSetInterval(revDeleteSpaceTabId, () => {
        document.getElementById(revDeleteSpaceTabId).addEventListener('click', async (event) => {
            let revDeleteOverrideView = await window.revGetDeleteOverrideView(revVarArgs._revEntityType, revVarArgs);
            window.revToggleSwitchArea(revDeleteOverrideView);
        });
    });

    let revSpaceSettingsContainer = `
        <div class="revFlexContainer revSettingsOptionsContainer">
            <div class="revFontSiteGreyTxtColor revFontSizeNormal revSpaceSettingsTell">Who can view this Space</div>
            <div class="revFlexContainer revSpaceVisibilityOptionsContainer">
                ${revSpaceOptionsArr.join('')}
            </div>
            <div class="revFlexContainer revSpaceVisibilityOptionsContainer">
                ${(revGetSpaceOptionViewItem('My connections'))}
                ${revGetSpaceOptionViewItem('All my contacts')}
            </div>

            <div class="revFlexWrapper revSettingsFooterWRapper">
                <div class="revFontSizeNormal revFontSiteWhitextColor revTabLink">
                    <span class="revSaveTabTxt">Save</span><span class="revFontSizeNormal revFontSiteBlueTxtColor"><i class="fas fa-long-arrow-alt-right"></i></span>
                </div>
                <div id="${revDeleteSpaceTabId}" class="revFontSizeNormal revFontSiteRedTxtColor revTabLink revDeleteSpaceTab">DELETE SPACE</div>
            </div>
        </div>
    `;

    return `
        <div class="revFlexContainer">
            <div class="revFlexWrapper revMenuesArrWrapper">${revMenuesArr.join('')}</div>
            <div id="revSettingsContentArea" class="revFlexContainer revSettingsContentArea">${revSpaceSettingsContainer}</div>
        </div>
    `;
}

module.exports.revPageViewWidget = revPageViewWidget;