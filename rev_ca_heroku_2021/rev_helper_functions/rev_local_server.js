const net = require('net')

const rev_pers_read_rev_entity_accessor = require('../rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_accessor/rev_pers_read_rev_entity_accessor')


/** Rev Client Connections Resolver */
const rev_client_connections_resolver_service = require('./rev_server_resolver_services/rev_client_connections_resolver_service')

/** CLIENT */

function revResolveLocal(revConnectionObject, revPri) {
    let revClientIPAddress = revConnectionObject.rev_client_ip;
    let revSocket = revConnectionObject.revSocket;

    const client = new net.Socket()

    client.connect(revSocket, revClientIPAddress, () => {
        rev_pers_read_rev_entity_accessor.revPersReadUnresolvedRevEntity(function (result) {
            // console.log('MADDY : \n' + '\tnth ' + Object.keys(result).length + ' : ' + JSON.stringify(result[Object.keys(result).length - 1]))
        })

        client.write(JSON.stringify(revPri));

    })

    client.on('data', (data) => {
        // callback, when app replies with data
        client.destroy();
    })

    client.on('close', (data) => {
        // callback, when socket is closed
        rev_client_connections_resolver_service.deleteConnectionObjectRef(revConnectionObject);
        console.log('Closing Time')
    })
}


module.exports.revResolveLocal = revResolveLocal
