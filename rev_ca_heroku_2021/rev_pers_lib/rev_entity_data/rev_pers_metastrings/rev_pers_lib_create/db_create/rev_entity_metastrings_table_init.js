const revDb = require('../../../../rev_db_init/rev_db_init')

function revTableCreate_REV_ENTITY_METASTRINGS(callback) {

    let createTodos = "CREATE TABLE IF NOT EXISTS REV_ENTITY_METASTRINGS_TABLE( \n" +
        "REV_RESOLVE_STATUS     INT     DEFAULT -1, \n" +
        "METASTRING_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \n" +
        "METASTRING_VALUE           TEXT    NOT NULL, \n" +
        "CREATED_DATE            TEXT, \n" +
        "UPDATED_DATE           TEXT);\n";


    revDb.getRevConnection((connection) => {
        connection.query(createTodos, function (err, results, res) {
            if (err) console.log('ERR -> revTableCreate_REV_ENTITY_METASTRINGS -> ' + err.message);

            callback("Rev LOG : REV_ENTITY_METASTRINGS TABLE CREATE > >> " + results);
        })

        connection.release();
    })
}


module.exports.revTableCreate_REV_ENTITY_METASTRINGS = revTableCreate_REV_ENTITY_METASTRINGS;