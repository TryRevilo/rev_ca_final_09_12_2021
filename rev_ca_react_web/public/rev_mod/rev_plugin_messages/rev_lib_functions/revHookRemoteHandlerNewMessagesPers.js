var revHookRemoteHandlerCallback = async (revVarArgs) => {
    if (revVarArgs && revVarArgs.filter && (revVarArgs.filter[0]._revSubjectEntityRelationships) && (revVarArgs.filter[0]._revSubjectEntityRelationships.filter)) {
        let revSubjectEntityRelationships = revVarArgs.filter[0]._revSubjectEntityRelationships.filter;
        let revSendToLiveEntities_Serv = revVarArgs.revPersOptions.revSendToLiveEntities_Serv;
        let revCallFunc = revVarArgs.revPersOptions.revCallFunc;

        for (let i = 0; i < revSubjectEntityRelationships.length; i++) {
            let remoteRevEntityGUID = revSubjectEntityRelationships[i]._remoteRevEntityTargetGUID;
            revSendToLiveEntities_Serv([{ 'type': 'revRemoteHook', 'remoteRevEntityGUID': remoteRevEntityGUID, 'revVarArgs': 'HI THER >>> HOME' }]);

            let revCallFuncData = revCallFunc('WEWE');

            console.log('revCallFuncData : ' + revCallFuncData);
            console.log('---> +++');
        }

        console.log('---> +++ AFter');
    }

    return revVarArgs;
};

module.exports.revHookRemoteHandlerCallback = revHookRemoteHandlerCallback;