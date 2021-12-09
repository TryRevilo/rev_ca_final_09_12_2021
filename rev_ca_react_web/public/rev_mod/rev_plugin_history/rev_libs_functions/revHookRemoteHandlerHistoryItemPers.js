var revHookRemoteHandlerCallback = async (revVarArgs) => {
    let REV_ENTITY_ANNOTATION = () => {
        return {
            "_revAnnotationId": -1,
            "_revAnnotationResStatus": -1,
            "_revAnnotationNameId": -1,
            "_revAnnotationValue": '',
            "_revAnnotationRemoteEntityGUID": -1,
            "_revAnnRemoteOwnerEntityGUID": -1,
            "_revUnique": false,
            "_revIncremental": false,
        }
    }

    if (revVarArgs && revVarArgs.filter && (revVarArgs.filter[0]._revEntityType.localeCompare('rev_group_entity') == 0)) {
        let revLoggedInEntityGUID = revVarArgs.revReqParams.rev_logged_in_entity_guid;
        let revEntityGUID = revVarArgs.filter[0]._remoteRevEntityGUID;

        let revReqQuerry = { 'rev_logged_in_entity_guid': revLoggedInEntityGUID, 'rev_ann_name_id': 2, 'rev_limit': 1 };
        let revLastAnn = await revVarArgs.revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID_serv(revReqQuerry);
        revLastAnn = revLastAnn[0];

        if (revLastAnn && (revLastAnn.revEntityGUID == revEntityGUID)) {
            console.log('revLastAnn : ' + JSON.stringify(revLastAnn));

            return revVarArgs;
        }

        let revAnn = REV_ENTITY_ANNOTATION();
        revAnn._revAnnotationId = 0;
        revAnn._revAnnotationResStatus = 0;
        revAnn._revAnnotationNameId = 2;
        revAnn._revAnnotationValue = 'rev_history';
        revAnn._revAnnotationRemoteEntityGUID = revEntityGUID;
        revAnn._revAnnRemoteOwnerEntityGUID = revLoggedInEntityGUID;

        let revAnnData = await revVarArgs.revPersSaveRevEntityAnnotation_Serv([revAnn]);

        if (revAnnData)
            console.log('revAnnData : ' + JSON.stringify(revAnnData));
        else console.log('NULL revData');
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;