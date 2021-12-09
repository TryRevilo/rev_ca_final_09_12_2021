var revObjectWidget = async (revVarArgs) => {
    let revKiwiForm = await window.revGetForm('rev_kiwi', revVarArgs);

    return (
        `
        <div class="revPublisherContainer">
            <div class="revpageOwnerHeader">
                <div class="revPageOwnerNames">
                    <i class="fa fa-user revUserIcon"></i><i class="fas fa-long-arrow-alt-right revUserIconArrowRight"></i><span class="revPageOwnerNames"> Oliver Muchai</span>
                </div>

                <nav class="nav">
                    <a class="nav-link" href="" class="revOptionsStab">iNFo</a>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="dropdown" class="revOptionsStab} href=" #" role="button" aria-haspopup="true" aria-expanded="false"><i class="fas fa-compress"></i></a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Separated link</a>
                        </div>
                    </li>

                <a class="nav-link" href="#" class="revOptionsStab"><i class="fas fa-user-plus"></i></a>
                <a class="nav-link" href="#" class="revOptionsStab"><i class="fas fa-search"></i></a>
                </nav>

            <div class="revOptionsStabsWrapper">
                <div class="revOptionsStab"><span><i class="fas fa-plus"></i></span></div>
                <div class="revOptionsStab"><span><i class="fas fa-braille"></i> FAmiLy</span></div>
            </div>
        </div>
        <div class="revPubAreaContainer">
            <div>HELLO HERE >>>></div>
            ${revKiwiForm}
            <div id="revProfilePubArea" class="revProfilePubArea"></div>
            
            <div class="revPublisherTabsMenuArea">
                <a class="revBtnColorOverride"><i class="fa fa-upload" class="revUploadTab"></i></a>
                &nbsp;
                <a class="revEmojiItemTab"><i class="far fa-smile"></i></a>
                <div class="revPublishItemTab">puBLisH <i class="fa fa-level-up"></i></div>
            </div>
        </div>
    </div >
    `);
}

module.exports.revObjectWidget = revObjectWidget;