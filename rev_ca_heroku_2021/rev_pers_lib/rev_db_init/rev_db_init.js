const app = require('../../app')

var getRevConnection = function (callback) {
    let pool = app.pool;

    pool.getConnection(function (err, connection) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        callback(connection);
    });
};


module.exports.getRevConnection = getRevConnection;