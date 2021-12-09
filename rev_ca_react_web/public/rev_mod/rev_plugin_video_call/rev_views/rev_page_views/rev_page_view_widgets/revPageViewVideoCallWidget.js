var revPageViewWidget = (revVarArgs) => {
    let revView = `
        <div class="revFlexContainer revPosRelative">
            <div class="revFlexWrapper revPosRelative revOngoingVideoCallHeaderWrapper">
                <div class="revFlexWrapper revPosAbsolute revOngoingVideoCallHeaderWrapperBackBorder"></div>
                <div class="revFlexContainer revLocalVideoContainer"></div>
                <div class="revFlexWrapper revVideoCallOptionsTabsWrapper">
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revVidCallOptionTabWrapper">
                        <div class="revVidCallOptionTabTxt revVidCallOptionTabTxtNewCall"><i class="fa fa-plus fa-lg revFontSizeMedium "></i></div>
                    </div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revVidCallOptionTabWrapper">
                        <div class="revVidCallOptionTabTxt revVidCallOptionTabTxtMsg"><i class="far fa-comment-alt fa-lg revFontSizeMedium "></i></div>
                    </div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revVidCallOptionTabWrapper">
                        <div class="revVidCallOptionTabTxt">LeAve</div>
                    </div>
                    <div class="revTabLink revFontSiteBlueTxtColor revFontSizeNormal revFlexWrapper revVidCallOptionTabWrapper">
                        <div class="revVidCallOptionTabTxt">END</div>
                    </div>
                </div>
            </div>
            <div class="revFlexWrapper revPosAbsolute revRemoteVideosWrapper">
                <div class="revFlexContainer revRemoteCallVideoContainer"></div>
            </div>
        </div>
    `;

    return revView;
};

module.exports.revPageViewWidget = revPageViewWidget;
