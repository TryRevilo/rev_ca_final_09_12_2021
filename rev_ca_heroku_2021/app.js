/** 

REV_CHILDABLE_STATUS  
- - - - - - - - - - - - -

3  : REV_ENTITY HAS CHILDREN IN IT'S CONTAINER  
301: REV_ENTITY HAS CHILDREN RELATED BY RELATIONSHIP  
2  : REV_ENTITY HAS PARENT RELATED BY RELATIONSHIP

**/

/** https://gist.github.com/anvk/5602ec398e4fdc521e2bf9940fd90f84 **/

// custom middleware create

const express = require("express");
const app = express();

app.use(express.json());

var request = require("request");

var http = require("http"),
    inspect = require("util").inspect;

var Busboy = require("busboy");

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

var cookieParser = require("cookie-parser");

app.use(cookieParser());

// creating 24 hours from milliseconds
const revOneDay = 1000 * 60 * 60 * 24;

app.set("trust proxy", 1); // trust first proxy

// const redis = require("redis");
// const sessions = require("express-session");

// let RedisStore = require("connect-redis")(sessions);
// let redisClient = redis.createClient();

// app.use(
//     sessions({
//         // store: new RedisStore({ host: 'localhost', port: 4000, client: redisClient, ttl : 260}),
//         store: new RedisStore({ client: redisClient }),
//         saveUninitialized: true,
//         secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//         cookie: { maxAge: revOneDay },
//         resave: false,
//     })
// );

// redisClient.set("foo_rand000000000000", "OK");

// redisClient.get("foo_rand000000000000", function (err, reply) {
//     console.log("foo_rand000000000000 >>> " + reply.toString()); // Will print `OK`
// });

//username and password
const myusername = "user1";
const mypassword = "mypassword";

// a variable to save a session
var session;

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware

    next();
});

// application level middleware

var revHandleHooks = async (revPluginHookHandlersArr, revVarArgs, revExcludePresinctCall) => {
    for (let i = 0; i < revPluginHookHandlersArr.length; i++) {
        let revPluginHookHandler = revPluginHookHandlersArr[i];

        if (revPluginHookHandler.hasOwnProperty("revPresinctCall") && revPluginHookHandler.revPresinctCall.localeCompare(revExcludePresinctCall) == 0) {
            continue;
        }

        let revHookFunc = revPluginHookHandler.revHookFunc;

        try {
            let revRetVarArgs = await revHookFunc(revVarArgs);

            if (!rev_json_functions.revIsEmptyJSONObject(revRetVarArgs)) {
                revVarArgs = revRetVarArgs;
            }

            if (revPluginHookHandlersArr[i].hasOwnProperty("revPostHookCallsArr")) {
                let revPostHookCallsArr = revPluginHookHandlersArr[i].revPostHookCallsArr;

                for (let i = 0; i < revPostHookCallsArr.length; i++) {
                    try {
                        let revRetVarArgs = await revPostHookCallsArr[i](revVarArgs);

                        if (!rev_json_functions.revIsEmptyJSONObject(revRetVarArgs)) {
                            revVarArgs = revRetVarArgs;
                        }
                    } catch (error) {
                        console.log("revPostHookCallFunc = revPostHookCallsArr[i].revPostHookCallsArr; : " + error);
                    }
                }
            }
        } catch (error) {
            console.log(">>> ERR await revHookFunc(revVarArgs) \t" + error);
        }
    }

    return revVarArgs;
};

const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (!user.verifyPassword(password)) {
                return done(null, false);
            }

            return done(null, user);
        });
    })
);

// const revSessionCheck = (req, res, next) => {
//     passport.authenticate("local"), (session = req.session);
//     session.userid = myusername;
//     console.log("session : " + JSON.stringify(req.session));

//     if (req.session.page_views) {
//         req.session.page_views++;
//         // res.send("You visited this page " + req.session.page_views + " times");
//     } else {
//         req.session.page_views = 1;
//         // res.send("Welcome to this page for the first time!");
//     }

//     next();
// };

const revPrePersMiddleware = async (req, res, next) => {
    let revReqQuery = req.query;
    let revReqBody = req.body;

    /** START REV CALL PLUGIN HOOKS */
    let revPluginHookContextsRemoteArr;

    if (revReqQuery.revPluginHookContextsRemoteArr) {
        revPluginHookContextsRemoteArr = revReqQuery.revPluginHookContextsRemoteArr.toString().split(",");
    }

    if (Array.isArray(revPluginHookContextsRemoteArr)) {
        let revPreData = {};
        revPreData["revRemoteHookMethods"] = rev_plugin_init.revRemoteHookMethods();
        revPreData["revReqParams"] = revGenReqParams(req);
        revPreData["revReqBody"] = revReqBody;

        let revPluginHookContextRemoteContainers = rev_plugins_objects.revPluginsObjects.revPluginHookContextRemoteContainers;

        for (let i = 0; i < revPluginHookContextsRemoteArr.length; i++) {
            let revPluginHookContextName = revPluginHookContextsRemoteArr[i];

            if (revPluginHookContextRemoteContainers.hasOwnProperty(revPluginHookContextName)) {
                let revPluginHookHandlersArr = revPluginHookContextRemoteContainers[revPluginHookContextName];

                for (let i = 0; i < revPluginHookHandlersArr.length; i++) {
                    let revPluginHookHandler = revPluginHookHandlersArr[i];

                    if (revPluginHookHandler.hasOwnProperty("revPresinctCall") && revPluginHookHandler.revPresinctCall.localeCompare("revPre_PersistenceCalls") == 0) {
                        try {
                            let revRetData = await revHandleHooks(revPluginHookHandlersArr, revPreData, "ok_go");

                            if (!rev_json_functions.revIsEmptyJSONObject(revRetData)) {
                                revPreData = revRetData;
                            }
                        } catch (error) {
                            console.log("err -> " + error);
                        }
                    }
                }
            }
        }

        req.revPreData = revPreData;
    }
    /** END REV CALL PLUGIN HOOKS */

    next();
};

const revPersCreateMiddleware = async (req, res, next) => {
    let revData = req.body;

    if (revData && revData.hasOwnProperty("revPersOptions") && revData.revPersOptions.revPersType.localeCompare("rev_create") == 0) {
        let revHookRemoteNewEntityPersArr = rev_plugins_objects.revPluginsObjects.revPluginHookContextRemoteContainers.revHookRemoteNewEntityPers;

        let revHandle = async (revFilter) => {
            let revFuncRetData;

            for (let i = 0; i < revHookRemoteNewEntityPersArr.length; i++) {
                let revHookFunc = revHookRemoteNewEntityPersArr[i].revHookFunc;

                try {
                    revFuncRetData = await revHookFunc(revFilter);
                } catch (error) {
                    console.log(">>> ERR\t" + error);
                }
            }

            return revFuncRetData;
        };

        for (let i = 0; i < revHookRemoteNewEntityPersArr.length; i++) {
            revData.revPersOptions["revPathName"] = req._parsedUrl.pathname;
            revData.revPersOptions["revSendToLiveEntities_Serv"] = revWebSocketServer.revSendToLiveEntities_Serv;
            revData.revPersOptions["revCallFunc"] = (revB) => {
                return revB;
            };

            revData = await revHandle(revData);
        }
    }

    next();
};

const revPostPersMiddleware = async (req, res, next) => {
    let revReqQuery = req.query;

    let send = res.send;
    res.send = async function (body) {
        // It might be a little tricky here, because send supports a variety of arguments, and you have to make sure you support all of them!
        let revData = body;

        if (rev_json_functions.revIsEmptyJSONObject(revData)) {
            revData = {};
        }

        if (req.revPreData) {
            Object.assign(revData, req.revPreData);
        }

        let revPluginHookContextRemoteContainers = rev_plugins_objects.revPluginsObjects.revPluginHookContextRemoteContainers;

        /** START REV CALL PLUGIN HOOKS */
        let revPluginHookContextsRemoteArr;

        if (revReqQuery.revPluginHookContextsRemoteArr) {
            revPluginHookContextsRemoteArr = revReqQuery.revPluginHookContextsRemoteArr.toString().split(",");
        }

        if (Array.isArray(revPluginHookContextsRemoteArr)) {
            revData["revRemoteHookMethods"] = rev_plugin_init.revRemoteHookMethods();
            revData["revReqParams"] = revGenReqParams(req);

            for (let i = 0; i < revPluginHookContextsRemoteArr.length; i++) {
                let revPluginHookContextName = revPluginHookContextsRemoteArr[i];

                if (revPluginHookContextRemoteContainers.hasOwnProperty(revPluginHookContextName)) {
                    let revPluginHookHandlersArr = revPluginHookContextRemoteContainers[revPluginHookContextName];

                    for (let i = 0; i < revPluginHookHandlersArr.length; i++) {
                        try {
                            let revRetData = await revHandleHooks(revPluginHookHandlersArr, revData, "revPre_PersistenceCalls");

                            if (!rev_json_functions.revIsEmptyJSONObject(revRetData)) {
                                revData = revRetData;
                            }
                        } catch (error) {
                            console.log("err -> " + error);
                        }
                    }
                }
            }
        }
        /** END REV CALL PLUGIN HOOKS */

        if (revData.hasOwnProperty("revRemoteHookMethods")) {
            delete revData.revRemoteHookMethods;
        }

        if (revData.hasOwnProperty("revReqParams")) {
            delete revData.revReqParams;
        }

        if (revData.hasOwnProperty("revReqBody")) {
            delete revData.revReqBody;
        }

        send.call(this, revData);
    };

    next();
};

// app.use(revSessionCheck);

app.use(revPrePersMiddleware);
app.use(revPersCreateMiddleware);
app.use(revPostPersMiddleware);

var cors = require("cors");
app.use(cors());

/** ********************************** */

var multer = require("multer");

var path = require("path");
var mime = require("mime");
var fs = require("fs");

/** FIRST WITH OUR DB-SERVER SESSION */

const mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 10,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: "localhost",
    user: "root",
    password: "",
    database: "rev_c_a",
});

module.exports.pool = pool;

/** END WITH OUR DB-SERVER SESSION */

const revWebSocketServer = require("./rev_helper_functions/rev_server_resolver_services/revWebSocketServer");

const rev_json_functions = require("./rev_helper_functions/rev_json_functions");

/** REV PLUGINS LOADER */
const rev_plugins_objects = require("./rev_files_i_o/rev_plugins_loaders/rev_plugins_objects");
const rev_load_plugin_lang_const_resolver = require("./rev_files_i_o/rev_plugins_loaders/rev_plugin_modules_pers/rev_load_plugin_langs/rev_read/rev_load_plugin_lang_const_resolver");
const rev_read_plugin_object_langs_expo = require("./rev_files_i_o/rev_plugins_loaders/rev_plugin_modules_pers/rev_load_plugin_langs/rev_read/rev_read_plugin_object_langs_expo");

const rev_plugin_init = require("./rev_files_i_o/rev_plugins_loaders/rev_plugin_modules_pers/rev_plugin_init");

/** REV ENTITY TABLES */
const rev_entity_table_init = require("./rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/db_create/rev_entity_table_init");
const rev_pers_read_rev_entity_service_helper = require("./rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_entity_service_helper");

const rev_object_entity_table_init = require("./rev_pers_lib/rev_entity/rev_pers_rev_object_entity/rev_pers_lib_create/db_create/rev_object_entity_table_init");

/** REV INSERT ENTITY */
const rev_pers_create_rev_entity_service_helper = require("./rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_service_helper");
const rev_pers_create_contacts_book_service_helper = require("./rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_contacts_book_service_helper");
const rev_pers_update_rev_entity_serv = require("./rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_update/rev_service_heper/rev_pers_update_rev_entity_serv");
const get_all_owner_GUID_rev_entities_service_helper = require("./rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_service_heper/get_all_owner_GUID_rev_entities_service_helper");
const rev_pers_read_rev_user_entity_service_helper = require("./rev_pers_lib/rev_entity/rev_pers_rev_user_entity/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_user_entity_service_helper");

/** REV ENTITY */
const rev_db_entity_const_resolver = require("./rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_db_models/rev_db_entity_const_resolver");

const rev_pers_read_rev_entity_info_wrapper = require("./rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_service_heper/rev_pers_read_rev_entity_info_wrapper");
const rev_pers_fill_rev_entity_children = require("./rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_read/rev_service_heper/rev_pers_fill_rev_entity_children");

const rev_pers_delete_rev_entity_serv = require("./rev_pers_lib/rev_entity/rev_pers_rev_entity/rev_pers_lib_delete/rev_service_heper/rev_pers_delete_rev_entity_serv");

/** REV USER ENTITY */
const rev_user_entity_table_init = require("./rev_pers_lib/rev_entity/rev_pers_rev_user_entity/rev_pers_lib_create/db_create/rev_user_entity_table_init");

/** REV GROUP ENTITY */
const rev_group_entity_table_init = require("./rev_pers_lib/rev_entity/rev_pers_rev_group_entity/rev_pers_lib_create/db_create/rev_group_entity_table_init");

/** REV ENTITY RELATIONSHIPS */
const rev_entity_relationships_table_init = require("./rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_create/db_create/rev_entity_relationships_table_init");
const rev_db_rels_const_resolver = require("./rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_db_models/rev_db_rels_const_resolver");
const rev_pers_create_rev_entity_rel_service_helper = require("./rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_create/rev_pers_create/rev_service_heper/rev_pers_create_rev_entity_rel_service_helper");
const rev_pers_read_rev_entity_relationship_service_helper = require("./rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_relationship_service_helper");
const rev_pers_update_rel_resolve_status_service_helper = require("./rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_update/rev_resolve_status/rev_service_heper/rev_pers_update_rel_resolve_status_service_helper");
const rev_pers_delete_rels_serv = require("./rev_pers_lib/rev_entity_data/rev_pers_relationships/rev_pers_lib_delete/rev_service_heper/rev_pers_delete_rels_serv");

/** REV ENTITY METADATA */
const rev_entity_metadata_table_init = require("./rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_create/db_create/rev_entity_metadata_table_init");
const rev_pers_create_metadata_service_helper = require("./rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_create/rev_pers_create/rev_service_heper/rev_pers_create_metadata_service_helper");

const rev_pers_read_rev_entity_metadata_service_helper = require("./rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_metadata_service_helper");

const rev_pers_delete_metadata_serv = require("./rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_delete/rev_service_heper/rev_pers_delete_metadata_serv");

// Updates
const rev_pers_update_rev_entity_metadata_value_serv = require("./rev_pers_lib/rev_entity_data/rev_pers_metadata/rev_pers_lib_update/rev_service_helper/rev_pers_update_rev_entity_metadata_value_serv");

/** REV_ANNOTATIONS */
const rev_entity_annotations_table_init = require("./rev_pers_lib/rev_entity_data/rev_pers_annotations/rev_pers_lib_create/db_create/rev_entity_annotations_table_init");
const rev_pers_create_rev_entity_annotation_service_helper = require("./rev_pers_lib/rev_entity_data/rev_pers_annotations/rev_pers_lib_create/rev_pers_create/rev_service_helper/rev_pers_create_rev_entity_annotation_service_helper");

const rev_pers_read_rev_entity_annotations_service_helper = require("./rev_pers_lib/rev_entity_data/rev_pers_annotations/rev_pers_lib_read/rev_service_helper/rev_pers_read_rev_entity_annotations_service_helper");
/** REV_ANNOTATIONS */

const rev_entity_metastrings_table_init = require("./rev_pers_lib/rev_entity_data/rev_pers_metastrings/rev_pers_lib_create/db_create/rev_entity_metastrings_table_init");

/** - - - - - */
const rev_load_plugins = require("./rev_files_i_o/rev_plugins_loaders/rev_load_plugins");

var filterRevRetArr = {
    filter: [],
};

rev_entity_table_init.revTableCreate_REV_ENTITY(function (result) {
    console.log(result);
});

rev_object_entity_table_init.revTableCreate_REV_OBJECT_ENTITY(function (result) {
    console.log(result);
});

rev_group_entity_table_init.revTableCreate_REV_GROUP_ENTITY(function (result) {
    console.log(result);
});

rev_user_entity_table_init.revTableCreate_REV_USER_ENTITY(function (result) {
    console.log(result);
});

rev_entity_metadata_table_init.revTableCreate_REV_ENTITY_METADATA((result) => {
    console.log(result);
});

rev_entity_annotations_table_init.revTableCreate_REV_ENTITY_ANNOTATIONS((result) => {
    console.log(result);
});

rev_entity_metastrings_table_init.revTableCreate_REV_ENTITY_METASTRINGS(function (result) {
    console.log(result);
});

rev_entity_relationships_table_init.revTableCreate_REV_ENTITY_RELATIONSHIPS(function (result) {
    console.log(result);
});

let myModuleMethodString = 'var myModuleMethod = (varArgs) => { console.log("Dynamic Call : " + varArgs) }';
myModuleMethodString = myModuleMethodString.slice(myModuleMethodString.indexOf("{") + 1, myModuleMethodString.lastIndexOf("}"));

let myModuleMethod = new Function("varArgs", 'console.log("Dynamic Call : " + varArgs)');
rev_load_plugins.revPushModules(myModuleMethod);
myModuleMethod(">>> HELLO WORLD PARAMS!");

var revGenReqParams = (revReq) => {
    let revReqParams = {};
    let revParamsArr = revReq._parsedUrl.query.split("&");

    for (let i = 0; i < revParamsArr.length; i++) {
        let revParam = revParamsArr[i];
        revParam = revParam.split("=");
        revReqParams[revParam[0]] = revParam[1];
    }

    return revReqParams;
};

rev_plugin_init.revInitRemoteHookMethods();

/** REV START LOADED PLUGINS */
(async () => {
    let revPluginEntitiesArr = await rev_db_entity_const_resolver.revPersReadRevEntities_By_Subtype_Expo_Serv("rev_plugin");
    rev_plugins_objects.revPluginsObjects.revPluginsInstalledArr = revPluginEntitiesArr;

    await rev_load_plugins.revLoadPluginModules(
        path.resolve("../../rev_ca_web/rev_ca_react_web/public/rev_mod"),
        { "REV_REMOTE_HOOK_METHODS": rev_plugin_init.revRemoteHookMethods() },
        1
        /** */
    );

    let revPluginViewLangs = await rev_load_plugin_lang_const_resolver.revGetPluginViewLangs_By_OwnerGUID({ "revOwnerGUID": 5 });
})();
/** REV END LOADED PLUGINS */

(async () => {
    let revDelArr = [];

    let revDelRange = { "revStart": 0, "revEnd": 0 };

    for (i = revDelRange.revStart; i < revDelRange.revEnd; i++) {
        revDelArr.push(i);
    }

    if (Array.isArray(revDelArr)) {
        console.log(revDelArr.length + " -> revDelArr : " + JSON.stringify(revDelArr) + " : Len : " + revDelArr.length);

        let revEntityChildsDeleteGUIDs = await rev_pers_delete_rev_entity_serv.revGetEntityChildsDeleteGUIDs(revDelArr);
        let revDelResData = await rev_pers_delete_rev_entity_serv.revDelRevEntity_By_remoteRevEntityGUID_Serv(revEntityChildsDeleteGUIDs);

        console.log(">>> revDelResData : " + JSON.stringify(revDelResData) + " : Len : " + revDelArr.length);
    }

    await rev_load_plugin_lang_const_resolver.revLoadSavedLangCodes();
    await rev_load_plugin_lang_const_resolver.revLoadSavedLangs();
})();

/** START REV BASE */
app.get("/rev_api", (req, res) => {
    let filterRevRetArr = {
        filter: [],
    };

    res.send(filterRevRetArr);
});

app.post("/rev_base_api_post", (req, res) => {
    let filterRevRetArr = {
        filter: [],
    };

    res.send(filterRevRetArr);
});
/** END REV BASE */

/** START REV VIEWS */
app.get("/rev_api/rev_get_listed_plugins", async (req, res) => {
    res.send({ filter: rev_plugins_objects.revPluginsObjects.revListedPlugins });
});

app.get("/rev_api/rev_get_script_module", async (req, res) => {
    let revScriptModuleNameId = req.query.revScriptModuleNameId;

    let revScriptModules = rev_plugins_objects.revPluginsObjects.revScriptModules;

    let revScriptModule;

    for (let i = 0; i < revScriptModules.length; i++) {
        let revNameId = revScriptModules[i].revNameId;

        if (revScriptModuleNameId.localeCompare(revNameId) == 0) {
            revScriptModule = revScriptModules[i];
            break;
        }
    }

    res.send(revScriptModule);
});

app.get("/rev_api/rev_get_rev_forms", async (req, res) => {
    let revLangCode = req.query.rev_lang_type;

    let revFormNameIds = req.query.rev_forms_arr;
    let revFormNameIdsArr = revFormNameIds.split(",");

    let filterRevRetArr = {
        filter: [],
        revLang: {},
    };

    let revForms = rev_plugins_objects.revPluginsObjects.revForms;

    for (let i = 0; i < revForms.length; i++) {
        let revCurrForm = revForms[i];

        let revViewNameId = revCurrForm.revNameId;

        if (revFormNameIdsArr.includes(revViewNameId)) {
            let revPluginName = revCurrForm.revPluginName;

            /** REV START GET CURR LOCKED TRANS */
            let revPluginViewFinalTranslations = rev_read_plugin_object_langs_expo.revGetPluginViewFinalTranslations({
                "revLangCode": revLangCode,
                "rev_plugin_name_id": revPluginName,
                "revLangViewType": "rev_form",
                "revViewNameId": revViewNameId,
            });
            /** REV END GET CURR LOCKED TRANS */

            if (!rev_json_functions.revIsEmptyJSONObject(revPluginViewFinalTranslations)) {
                revCurrForm["revPluginViewFinalTranslations"] = {
                    "revLangCode": revLangCode,
                    "rev_plugin_name_id": revPluginName,
                    "revLangViewType": "rev_form",
                    "revViewNameId": revViewNameId,
                    "revLangTrans": revPluginViewFinalTranslations,
                };
            }

            filterRevRetArr.filter.push(revCurrForm);
        }
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/rev_get_context_form", async (req, res) => {
    let revContext = req.query.rev_context;
    let revContextForm = req.query.rev_context_form;

    let filterRevRetArr = {
        filter: [],
    };

    let revContextForms = rev_plugins_objects.revPluginsObjects.revContextForms;

    for (let i = 0; i < revContextForms.length; i++) {
        let revContextsContainer = revContextForms[i];
        let revCurrContext = revContextsContainer.revContext;

        if (revCurrContext && revCurrContext.localeCompare(revContext) == 0) {
            let revContextFormsArr = revContextsContainer.revContextFormsArr;

            for (let c = 0; c < revContextFormsArr.length; c++) {
                let revCurrContextForm = revContextFormsArr[c];
                let revCurrNameId = revCurrContextForm.revNameId;

                if (revCurrNameId && revCurrNameId.localeCompare(revContextForm) == 0) {
                    filterRevRetArr.filter.push(revCurrContextForm);
                }
            }
        }
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/rev_get_menu_item", async (req, res) => {
    let revMenuItemNameId = req.query.rev_menu_item_name_id;

    let revMenuItem;

    let revMenuItems = rev_plugins_objects.revPluginsObjects.revMenuItems;

    for (let i = 0; i < revMenuItems.length; i++) {
        let revNameId = revMenuItems[i].revNameId;

        if (revMenuItemNameId.localeCompare(revNameId) == 0) {
            revMenuItem = revMenuItems[i];
            break;
        }
    }

    res.send(revMenuItem);
});

app.get("/rev_api/rev_get_menu_area", async (req, res) => {
    let _revMenuAreaViewName = req.query.rev_menu_area_view_name;

    let revMenuArea;

    let revMenuAreas = rev_plugins_objects.revPluginsObjects.revMenuAreas;

    for (let i = 0; i < revMenuAreas.length; i++) {
        let revMenuAreaViewName = revMenuAreas[i].revMenuAreaViewName;

        if (_revMenuAreaViewName.localeCompare(revMenuAreaViewName) == 0) {
            revMenuArea = revMenuAreas[i];
            break;
        }
    }

    res.send(revMenuArea);
});

app.get("/rev_api/rev_get_rev_page_views", async (req, res) => {
    var reqParams = req.query.rev_page_views_arr;
    var reqParamsArr = reqParams.split(",");

    let filterRevRetArr = {
        filter: [],
    };

    let revPageViews = rev_plugins_objects.revPluginsObjects.revPageViews;

    for (let i = 0; i < revPageViews.length; i++) {
        let revPageViewContainerName = revPageViews[i].revPageViewContainerName;

        if (reqParamsArr.includes(revPageViewContainerName)) {
            filterRevRetArr.filter.push(revPageViews[i]);
        }
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/rev_get_context_view", async (req, res) => {
    let revContext = req.query.rev_context;
    let revContextView = req.query.rev_context_view;

    let filterRevRetArr = {
        filter: [],
    };

    let revContextViews = rev_plugins_objects.revPluginsObjects.revContextViews;

    for (let i = 0; i < revContextViews.length; i++) {
        let revContextsContainer = revContextViews[i];
        let revCurrContext = revContextsContainer.revContext;

        if (revCurrContext && revCurrContext.localeCompare(revContext) == 0) {
            let revContextViewsArr = revContextsContainer.revContextViewsArr;

            for (let c = 0; c < revContextViewsArr.length; c++) {
                let revCurrContextView = revContextViewsArr[c];
                let revCurrNameId = revCurrContextView.revNameId;

                if (revCurrNameId && revCurrNameId.localeCompare(revContextView) == 0) {
                    filterRevRetArr.filter.push(revCurrContextView);
                }
            }
        }
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/rev_get_plugin_hooks", async (req, res) => {
    let revPluginHookName = req.query.rev_plugin_hook_name;

    let filterRevRetArr = {
        filter: [],
    };

    let revPluginHookHandlers = rev_plugins_objects.revPluginsObjects.revPluginHookHandlers;

    for (let i = 0; i < revPluginHookHandlers.length; i++) {
        let revAddedPluginHookHandlersContainer = revPluginHookHandlers[i];
        let revCurrPluginHookName = revAddedPluginHookHandlersContainer.revPluginHookName;

        if (revCurrPluginHookName && revCurrPluginHookName.localeCompare(revPluginHookName) == 0) {
            let revPluginHookHandlersArr = revAddedPluginHookHandlersContainer.revPluginHookHandlersArr;
            filterRevRetArr.filter = revPluginHookHandlersArr;
            break;
        }
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/get_plugin_hook_handlers", async (req, res) => {
    let revPluginHookName = req.query.rev_plugin_hook_name;

    let filterRevRetArr = {
        filter: [],
    };

    let revPluginHookHandlers = rev_plugins_objects.revPluginsObjects.revPluginHookHandlers;

    for (let i = 0; i < revPluginHookHandlers.length; i++) {
        let revAddedPluginHookHandlersContainer = revPluginHookHandlers[i];
        let revCurrPluginHookName = revAddedPluginHookHandlersContainer.revPluginHookName;

        if (revCurrPluginHookName && revCurrPluginHookName.localeCompare(revPluginHookName) == 0) {
            filterRevRetArr.filter.push(revAddedPluginHookHandlersContainer);
        }
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/rev_get_override_views", async (req, res) => {
    var reqParams = req.query.rev_override_views_arr;
    var reqParamsArr = reqParams.split(",");

    let revOverrideViews = rev_plugins_objects.revPluginsObjects.revOverrideViews;

    let filterRevRetArr = {
        filter: [],
    };

    for (let i = 0; i < revOverrideViews.length; i++) {
        let revNameId = revOverrideViews[i].revNameId;

        if (reqParamsArr.includes(revNameId)) {
            filterRevRetArr.filter.push(revOverrideViews[i]);
        }
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/rev_get_delete_override_view", async (req, res) => {
    let revDeleteOverrideViewName = req.query.rev_delete_override_view;

    let revDeleteOverrideViews = rev_plugins_objects.revPluginsObjects.revDeleteOverrideViews;

    let revDeleteOverrideView;

    for (let i = 0; i < revDeleteOverrideViews.length; i++) {
        let revNameId = revDeleteOverrideViews[i].revNameId;

        if (revDeleteOverrideViewName.localeCompare(revNameId) == 0) {
            revDeleteOverrideView = revDeleteOverrideViews[i];
        }
    }

    res.send(revDeleteOverrideView);
});

/** END REV VIEWS */

app.post("/rev_api/rev_delete/rev_delete_rev_entity_by_rev_entity_guids", async (req, res) => {
    let revDelResData = await rev_pers_delete_rev_entity_serv.revDelRevEntity_By_remoteRevEntityGUID_Serv(req.body["filter"]);

    res.send({ filter: revDelResData });
});

app.post("/rev_api/rev_delete/rev_delete_rev_entity_with_childs_by_rev_entity_guids", async (req, res) => {
    console.log("req.body.filter : " + JSON.stringify(req.body.filter));

    let revEntityChildsDeleteGUIDs = await rev_pers_delete_rev_entity_serv.revGetEntityChildsDeleteGUIDs(req.body.filter);

    if (revEntityChildsDeleteGUIDs) {
        await rev_pers_delete_rev_entity_serv.revDelRevEntity_By_remoteRevEntityGUID_Serv(revEntityChildsDeleteGUIDs);
    }

    res.send({ filter: revEntityChildsDeleteGUIDs });
});

app.get("/rev_api/rev_reg_ip", function (req, res) {
    let revIP = req.connection.remoteAddress;
    let revConnectionObject = { "revLoggedInEntityGUID": req.params.rev_logged_in_entity_guid, "revClientIP": revIP };
    // rev_client_connections_resolver_service.regNewClientConnectionObject(revConnectionObject);

    res.send(revConnectionObject);
});

/** START REV ENTITIES */

app.post("/rev_api/sync_new_users", async (req, res) => {
    let revEntitiesArray = req.body["filter"];

    /** 
    rev_pers_create_rev_user_entity_service_helper.createNewRevUserEntitiesArrayService(req.body["filter"], function (result) {
        res.send(result);
    });
    **/

    let result = await rev_pers_create_contacts_book_service_helper.revUserRegistration(revEntitiesArray);
    res.send(result);
});

app.post("/rev_api/confirm_account", async (req, res) => {
    let revReqFilterData = req.body["filter"];
    let revConfirmCode = revReqFilterData.revConfirmCode;
    let revShadowUserEntityGUID = revReqFilterData.revShadowUserEntityGUID;

    let revEntityMetadata = await rev_pers_read_rev_entity_metadata_service_helper.revPersReadRevEntityMetadata_By_UniqueId_Serv(revConfirmCode);
    let revMetadataId = revEntityMetadata.remoteRevMetadataId;
    let revMetadataEntityGUID = revEntityMetadata._revMetadataEntityGUID;

    let revMetadataOwnerEntityGUID = await rev_pers_read_rev_entity_service_helper.revPersReadOwnerEntityGUID_By_RevEntityGUID_Serv(revMetadataEntityGUID);

    // await rev_pers_update_rev_entity_metadata_value_serv.revPersUpdateMetadataGUID_By_MetadataId_Serv(revMetadataId, revMetadataOwnerEntityGUID);

    if (revShadowUserEntityGUID == revMetadataEntityGUID) {
        let revConn = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(revMetadataEntityGUID);

        console.log(JSON.stringify(revConn));

        res.send(revConn);
    } else {
        res.send({ "revResERR": "REV NON UNIQUE!" });
    }
});

app.get("/api/rev_entity/get_all_rev_entity_type", async (req, res) => {
    var reqParams = req.query.rev_entity_type;
    var reqParamsArr = reqParams.split(", ");

    let filterRevRetArr = {
        filter: [],
    };

    let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.getRevPersReadAllRevEntityType(reqParamsArr[0]);

    for (let i = 0; i < revEntityDBRes.length; i++) {
        await rev_db_entity_const_resolver.revEntityFiller(revEntityDBRes[i], (revEntity) => {
            filterRevRetArr.filter.push(revEntity);
        });
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/rev_get_entity_info_wrapper_by_remote_entity_GUID", async (req, res) => {
    let revConn = await rev_pers_read_rev_entity_info_wrapper.revPersReadRevEntityInfoWrapper_By_RemoteRevEntityGUID(req.query);

    revConn["revAds"] = revGetAdsBatch();

    res.send(revConn);
});

app.get("/rev_api/rev_get_flat_entity_info_wrapper", async (req, res) => {
    let reqParams = req.query.rev_items;
    let reqParamsArr = reqParams.split(",");

    let filterRevRetArr = {
        filter: [],
    };

    await reqParamsArr.reduce((previousPromise, nextID) => {
        return previousPromise.then(() => {
            return new Promise(async (resolve, reject) => {
                let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(nextID);

                if (revEntityDBRes) {
                    let revRetEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);

                    if (revRetEntity) {
                        filterRevRetArr.filter.push({ revRetEntity: revRetEntity });
                    }
                }

                resolve();
            });
        });
    }, Promise.resolve());

    res.send(filterRevRetArr);
});

app.get("/rev_api/get_all_revEntities_by_ownerGUIDs", async function (req, res) {
    let filterRevRetArr = {
        filter: [],
    };

    let reqParams = req.query.rev_entity_guids;
    let reqParamsArr = reqParams.split(",");

    let jsonData = [];

    for (var i = 0; i < reqParamsArr.length; i++) {
        jsonData.push(reqParamsArr[i]);
    }

    let revCaller = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_OF_RemoteRevEntityGUIDs_Serv(jsonData);

    await revCaller.reduce((previousPromise, nextId) => {
        return previousPromise.then(() => {
            return new Promise(async (resolve, reject) => {
                await rev_db_entity_const_resolver.revEntityNonUserFiller(nextId, async (result) => {
                    if (result != null) {
                        filterRevRetArr.filter.push(result);
                    }
                });

                resolve();
            });
        });
    }, Promise.resolve());

    res.send(filterRevRetArr);
});

app.get("/rev_api/get_all_revEntities_by_owner_guids_sub_types", async function (req, res) {
    let filterRevRetArr = {
        filter: [],
    };

    let revEntityOwnerGUIDsArray = req.query.rev_entity_guids;
    revEntityOwnerGUIDsArray = revEntityOwnerGUIDsArray.split(",");

    let revEntitySubtypesArray = req.query.rev_entity_sub_types_array;
    revEntitySubtypesArray = revEntitySubtypesArray.split(",");

    let revEntitiesDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_OF_OwnerGUIDArr_SubTypeArr_Serv({
        "revEntityOwnerGUIDsArray": revEntityOwnerGUIDsArray,
        "revEntitySubtypesArray": revEntitySubtypesArray,
    });

    await revEntitiesDBRes.reduce((previousPromise, nextId) => {
        return previousPromise.then(() => {
            return new Promise(async (resolve, reject) => {
                await rev_db_entity_const_resolver.revEntityNonUserFiller(nextId, async (result) => {
                    if (result != null) {
                        filterRevRetArr.filter.push(result);
                    }
                });

                resolve();
            });
        });
    }, Promise.resolve());

    res.send(filterRevRetArr);
});

app.get("/", function (req, res) {
    rev_entity_table_init.revTableCreate_REV_ENTITY(function (result) {
        res.send(result);
    });
});

app.get("/api/rev_entity", function (req, res) {
    rev_pers_read_rev_entity_service_helper.revPersReadRevEntity(function (result) {
        res.send(result);
    });
});

app.get("/rev_api/get_flat_entity/", async (req, res) => {
    let remoteRevEntityGUID = req.query.remote_rev_entity_guid;

    let revFlatEntity = await rev_db_entity_const_resolver.revGetFlatEntity_Serv(remoteRevEntityGUID);

    res.send({ filter: [revFlatEntity] });
});

app.get("/rev_api/get_entity_single/", async (req, res) => {
    let remoteRevEntityGUID = req.query.remote_rev_entity_guid;

    let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(remoteRevEntityGUID);

    let revRetEntity = await rev_db_entity_const_resolver.revEntityFiller(revEntityDBRes);

    res.send({ filter: [revRetEntity] });
});

app.get("/api/rev_entity/get_all_filled_rev_entity_type_with_info", async (req, res) => {
    var reqParams = req.query.rev_entity_type;
    var reqParamsArr = reqParams.split(", ");

    let filterRevRetArr = {
        filter: [],
    };

    let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.getRevPersReadAllRevEntityType(reqParamsArr[0]);

    for (let i = 0; i < revEntityDBRes.length; i++) {
        let revFilledEntityWithInfo = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes[i]);
        filterRevRetArr.filter.push(revFilledEntityWithInfo);
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/get_all_filled_rev_entity_with_info_by_entity_guids", async (req, res) => {
    var revEntityGUIDs = req.query.rev_entity_guids;
    var revEntityGUIDsArr = revEntityGUIDs.split(",");

    let filterRevRetArr = {
        filter: [],
    };

    let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.revPersReadAllRevEntity_By_RevEntityGUIDs_Serv(revEntityGUIDsArr);

    for (let i = 0; i < revEntityDBRes.length; i++) {
        let revFilledEntityWithInfo = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes[i]);
        filterRevRetArr.filter.push(revFilledEntityWithInfo);
    }

    res.send(filterRevRetArr);
});

app.get("/api/rev_entity/get_all_filled_rev_entity_type", async (req, res) => {
    var reqParams = req.query.rev_entity_type;
    var reqParamsArr = reqParams.split(", ");

    let filterRevRetArr = {
        filter: [],
    };

    let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.getRevPersReadAllRevEntityType(reqParamsArr[0]);

    for (let i = 0; i < revEntityDBRes.length; i++) {
        let revFilledEntityWithInfo = await rev_db_entity_const_resolver.revFilledRevEntity_Serv(revEntityDBRes[i]);
        filterRevRetArr.filter.push(revFilledEntityWithInfo);
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/read_all_entity_subtypes", async (req, res) => {
    let reqParams = req.query.rev_entity_subtypes_arr;

    let revEntitySubtypesArr = reqParams.split(",");

    let filterRevRetArr = {
        filter: [],
    };

    let revEntities = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_By_SubtypesArr_Serv(revEntitySubtypesArr);

    for (let i = 0; i < revEntities.length; i++) {
        await rev_db_entity_const_resolver.revEntityFiller(revEntities[i], (revEntities) => {
            filterRevRetArr.filter.push(revEntities);
        });
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/read_all_entity_subtypes_with_rel_container", async (req, res) => {
    let reqParams = req.query;

    let revEntitySubtypesArr = reqParams.rev_entity_subtypes_arr.split(",");
    let revRelRemoteId = reqParams.rev_rel_remote_id;
    let revQueryLimit = reqParams.rev_query_limit;

    let filterRevRetArr = {
        filter: [],
        revPublishersArr: [],
        revAds: [],
    };

    let revPublishersGUIDsArr = [];

    let revEntities = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_By_SubtypesArr_Serv(revEntitySubtypesArr, revQueryLimit);

    for (let i = 0; i < revEntities.length; i++) {
        let revEntitesArray = [];

        let revVidsAlbumGUID = revEntities[i].REMOTE_REV_ENTITY_GUID;

        let revEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revEntities[i]);

        if (!revEntity) {
            return null;
        }

        let revEntityFilesGUIDs = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelsSubjectGUIDs_By_RevTargetGUID_RevRelIdServ(revVidsAlbumGUID, 8);

        let revEntityFilesGUIDsFilterReduce = revEntityFilesGUIDs.filter.reduce((previousPromise, nextId) => {
            return previousPromise.then(async () => {
                let revEntityRetDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(nextId);
                return rev_db_entity_const_resolver.revEntityFiller(revEntityRetDBRes, (filledRevEntity) => {
                    if (filledRevEntity !== null) {
                        revEntitesArray.push(filledRevEntity);
                    }
                });
            });
        }, Promise.resolve());

        await revEntityFilesGUIDsFilterReduce;

        Array.prototype.push.apply(revEntity._revEntityChildrenList, revEntitesArray);

        let revTargetGUID = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelTargetGUID_By_SubjectGUID_RevRelId_Serv(revEntity._remoteRevEntityGUID, revRelRemoteId);

        if (revTargetGUID < 1) {
            continue;
        }

        if (!revPublishersGUIDsArr.includes(revEntity._revEntityOwnerGUID)) {
            revPublishersGUIDsArr.push(revEntity._revEntityOwnerGUID);
        }

        let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revTargetGUID);
        let revContainerEntity = await rev_db_entity_const_resolver.revEntityFiller(revEntityDBRes);

        revEntity["_revContainerEntity"] = revContainerEntity;

        filterRevRetArr.filter.push(revEntity);
    }

    for (let i = 0; i < revPublishersGUIDsArr.length; i++) {
        let revPublisherEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revPublishersGUIDsArr[i]);
        let revPublisherEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revPublisherEntityDBRes);

        filterRevRetArr.revPublishersArr.push(revPublisherEntity);
    }

    filterRevRetArr.revAds = rev_plugin_init.revRemoteHookMethods().revGetAdsBatch();

    res.send(filterRevRetArr);
});

app.get("/api/rev_entity/get_all_owner_GUID_rev_entities", function (req, res) {
    var reqParams = req.query.revEntityOwnerGUID;
    var reqParamsArr = reqParams.split(", ");

    get_all_owner_GUID_rev_entities_service_helper.revPersReadAllOwnerGUIDRevEntitiesByRemoteRevEntityGUIDServ(reqParamsArr[0]).then((result) => {
        res.send(result);
    });
});

app.get("/api/rev_entity/registeredUserData", function (req, res) {
    let reqParams = req.query.revUserEntityUniqueRep;

    rev_pers_read_rev_user_entity_service_helper.revPersReadRevUserEntityByRevUserEntityUserName_EMAIL_PHONENUMBER_Serv(reqParams).then((result) => {
        res.send(result);
    });
});

app.post("/rev_api/rev_create_new_entity", function (req, res) {
    let revEntitiesArray = req.body["filter"];

    if (Array.isArray(revEntitiesArray) && revEntitiesArray.length > 0) {
        rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv(revEntitiesArray, (result) => {
            res.send(result);
        });
    } else {
        res.send({ filter: [] });
    }
});

app.post("/rev_api/rev_create_new_ad_entity", function (req, res) {
    let revEntitiesArray = req.body["filter"];

    if (revEntitiesArray != null) {
        rev_pers_create_rev_entity_service_helper.createNewRevEntitiesArray_Serv(revEntitiesArray, async (result) => {
            let revRetEntity = result.filter[0];
            let revEntityGUID = revRetEntity._remoteRevEntityGUID;
            let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revEntityGUID);

            rev_db_entity_const_resolver.revEntityFiller(revEntityDBRes, (revEntity) => {
                rev_plugin_init.revAdsArr.push(revEntity);
                res.send(result);
            });
        });
    } else {
        res.send({ filter: [] });
    }
});

app.post("/rev_api/rev_create_new_contacts_book_entity", async (req, res) => {
    if (req.body != null) {
        let revRes = await rev_pers_create_contacts_book_service_helper.revPersSaveContactsBook_Serv(req.body);
        res.send(revRes);
    } else {
        res.send({ filter: [] });
    }
});

app.get("/rev_api/rev_get_container_children_by_guids", async function (req, res) {
    let revReqQuery = req.query;

    let revContainerChildEntities = await rev_pers_read_rev_entity_service_helper.revPersReadContainerChilds_Serv(revReqQuery);

    let filterRevRetArr = {
        filter: [],
        revEntityPublishersArr: [],
    };

    let revAddedPublishers = [];

    for (let i = 0; i < revContainerChildEntities.length; i++) {
        let revRetEntity = await rev_db_entity_const_resolver.revEntityFiller(revContainerChildEntities[i]);

        filterRevRetArr.filter.push(revRetEntity);

        if (!revAddedPublishers.includes(revRetEntity._revEntityOwnerGUID)) {
            revAddedPublishers.push(revRetEntity._revEntityOwnerGUID);
        }
    }

    res.send(filterRevRetArr);
});

app.post("/rev_api/rev_get_children_by_container_guids", async function (req, res) {
    let reqParams = req.body;

    let revloggedInEntityGUID = reqParams.revloggedInRemoteEntityGUID;
    let revEntityContainerGUIDsArray = reqParams.revContainerGUIDs.split(",");
    let revEntitySubtypesArray = reqParams.revEntitySubTypes.split(",");
    let revLastCheckDate = reqParams.revLastCheckDate;
    let revSelectItemslimit = reqParams.revSelectItemslimit;

    let revTimelineEntities = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntities_OF_RemoteRevEntityGUIDs_SubType_Serv(revSelectItemslimit, revEntityContainerGUIDsArray, revEntitySubtypesArray, revLastCheckDate);

    let filterRevRetArr = {
        filter: [],
        revEntityPublishersArr: [],
    };

    let revAddedPublishers = [];

    for (let i = 0; i < revTimelineEntities.length; i++) {
        let revTimelineGUID_Target = await rev_pers_read_rev_entity_service_helper.revPersReadRevEntityGUID_By_OwnerGUID_ContainerGUID_Subtype_Serv(revloggedInEntityGUID, revTimelineEntities[i].REV_ENTITY_CONTAINER_GUID, "rev_timeline");
        let _remoteRevEntitySubjectGUID = revTimelineEntities[i].REMOTE_REV_ENTITY_GUID;

        let revRetTimelineRel = null;

        if (revTimelineGUID_Target > 0 && _remoteRevEntitySubjectGUID > 0) {
            let revRelExista = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelId_By_SubjectGUID_TargetGUID_RevRelValId_Serv(_remoteRevEntitySubjectGUID, revTimelineGUID_Target, 1);
            if (revRelExista > 0) {
                continue;
            }

            revRetTimelineRel = await rev_pers_create_rev_entity_rel_service_helper.revPersSaveRevRelItem_serv({ _revResolveStatus: -818, _remoteRevEntitySubjectGUID: revTimelineEntities[i].REMOTE_REV_ENTITY_GUID, _remoteRevEntityTargetGUID: revTimelineGUID_Target, _revEntityRelationshipType: "rev_timeline_entry" });
        }

        await rev_db_entity_const_resolver.revEntityFiller(revTimelineEntities[i], (revRetEntity) => {
            filterRevRetArr.filter.push(revRetEntity);

            if (!revAddedPublishers.includes(revRetEntity._revEntityOwnerGUID)) revAddedPublishers.push(revRetEntity._revEntityOwnerGUID);
        });
    }

    for (let i = 0; i < revAddedPublishers.length; i++) {
        let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revAddedPublishers[i]);
        let revFilledEntityWithInfo = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);

        if (revFilledEntityWithInfo) {
            filterRevRetArr.revEntityPublishersArr.push(revFilledEntityWithInfo);
        }
    }

    res.send(filterRevRetArr);
});

app.post("/rev_api/get_rev_entity_container_entities_by_rev_entity_guids", async (req, res) => {
    var revUnresolvedContainersJSONArr = req.body["filter"];

    let filterRevRetArr = {
        filter: [],
    };

    if (!revUnresolvedContainersJSONArr) {
        res.send(filterRevRetArr);
    }

    let revResult = revUnresolvedContainersJSONArr.reduce((accumulatorPromise, nextID) => {
        return accumulatorPromise.then(() => {
            return new Promise(async (resolve, reject) => {
                let revReqContainerEntityGUID = nextID._revEntityContainerGUID;

                if (revReqContainerEntityGUID < 0) {
                    resolve();
                }

                let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revReqContainerEntityGUID);
                let revContainerEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);

                filterRevRetArr.filter.push({ _revReqChildEntityGUID: nextID._revReqChildEntityGUID, _revContainerEntity: revContainerEntity });

                resolve();
            });
        });
    }, Promise.resolve());

    revResult.then(() => {
        res.send(filterRevRetArr);
    });
});

app.get("/rev_api/get_remote_entity_guid_by_creation_date", async (req, res) => {
    let reqParams = req.query.rev_items;
    let reqParamsArr = reqParams.split(",");

    let jsonData = [];

    for (var i = 0; i < reqParamsArr.length; i++) {
        jsonData.push(reqParamsArr[i]);
    }

    if (jsonData != null) {
        rev_pers_read_rev_entity_service_helper.revPersReadRevEntityGUID_By_CreationDate_Serv(jsonData, (result) => {
            res.send(result);
        });
    }
});

// START REV UPDATE
app.post("/rev_api/rev_update_entities", async (req, res) => {
    let revEntitiesDataArray = req.body["filter"];

    if (revEntitiesDataArray != null) {
        let revAffecetedRowsRes = await rev_pers_update_rev_entity_serv.revUpdateRevEntityData_Serv(revEntitiesDataArray);
        res.send({ "revAffecetedRows": revAffecetedRowsRes });
    } else res.send({ "revAffecetedRows": 0 });
});
// END REV UPDATE

/** END REV ENTITIES */

/** START REV ENTITY METADATA */

app.post("/rev_api/save_rev_entity_metadata", async (req, res) => {
    let revRes = await rev_pers_create_metadata_service_helper.createNewRevMetadataArrayService(req.body["filter"]);
    res.send(revRes);
});

app.get("/rev_api/get_metadata_entity_guids", async (req, res) => {
    let reqParams = req.query.rev_metadata_vals;
    let reqParamsArr_MetadataUnqueIdsArr = reqParams.split(",");

    let filterRevRetArr = {
        filter: [],
    };

    if (Array.isArray(reqParamsArr_MetadataUnqueIdsArr)) {
        for (let i = 0; i < reqParamsArr_MetadataUnqueIdsArr.length; i++) {
            let revMetadataUniqueId = reqParamsArr_MetadataUnqueIdsArr[i];

            let revMetadataEntityGUID = await rev_pers_read_rev_entity_metadata_service_helper.revPersReadRevEntityMetadataOwnerGUID_By_UniqueId_Serv(revMetadataUniqueId);

            filterRevRetArr.filter.push({ "revMetadataUniqueId": revMetadataUniqueId, "revMetadataEntityGUID": revMetadataEntityGUID });
        }

        res.send(filterRevRetArr);
    } else res.send(filterRevRetArr);
});

app.post("/rev_api/get_partials_metadata", function (req, res) {
    var revEntityMetadataList = req.body["filter"];

    rev_pers_read_rev_entity_metadata_service_helper.revPersReadMetadataID_By_CreationDate_MetadataEntityGUID_Serv(revEntityMetadataList, (result) => {
        res.send(result);
    });
});

app.post("/rev_api/rev_update_rev_entity_metadata_value", function (req, res) {
    let revEntitiesMetadataArray = req.body["filter"];

    if (revEntitiesMetadataArray != null) {
        rev_pers_update_rev_entity_metadata_value_serv.revPersUpdaterevEntityMetadataValueList_By_MetadataId_Serv(revEntitiesMetadataArray, (result) => {
            res.send(result);
        });
    }
});

app.post("/rev_api/rev_update_rev_entity_metadata_guid", function (req, res) {
    let revEntityMetadata = req.body["filter"];
    revEntityMetadata = revEntityMetadata[0];

    if (revEntitiesMetadataArray != null) {
        rev_pers_update_rev_entity_metadata_value_serv.revPersUpdateMetadataGUID_By_MetadataId_Serv(revEntityMetadata, (result) => {
            res.send(result);
        });
    }
});

app.post("/rev_api/rev_delete_entity_metadata_by_id", function (req, res) {
    let revEntitiesMetadataIdsArray = req.body["filter"];

    if (revEntitiesMetadataIdsArray != null) {
        rev_pers_delete_metadata_serv.revPersDeleteMetadataMulti_By_MetadataIds_Serv(revEntitiesMetadataIdsArray, (result) => {
            res.send(result);
        });
    }
});

/** END REV ENTITY METADATA */

/** START REV ENTITY ANNOTATIONS */

app.post("/rev_api/rev_post_rev_annotation", async (req, res) => {
    let revAnnArray = req.body["filter"];

    let revRetData = await rev_pers_create_rev_entity_annotation_service_helper.revPersSaveRevEntityAnnotation_Serv(revAnnArray);

    res.send(revRetData);
});

app.get("/rev_api/get_rev_entities_by_ann_id_owner_guid", async (req, res) => {
    let revEntityGUIDs = await rev_pers_read_rev_entity_annotations_service_helper.revPersReadAnnEntityGUIDs_By_AnnId_OwnerEntityGUID_serv(req.query);

    let filterRevRetArr = {
        filter: [],
    };

    let revAddedEntities = {};

    let revCurrEntityGUID;

    for (let i = 0; i < revEntityGUIDs.length; i++) {
        let revEntityGUID = revEntityGUIDs[i].revEntityGUID;

        if (revEntityGUID === revCurrEntityGUID) continue;

        revCurrEntityGUID = revEntityGUID;

        let revEntity = revAddedEntities.revEntityGUID;

        if (!revEntity) {
            let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revEntityGUID);

            await rev_db_entity_const_resolver.revEntityFiller(revEntityDBRes, (revEntity) => {
                revAddedEntities[revEntityGUID] = revEntity;
                filterRevRetArr.filter.push(revEntity);
            });
        } else {
            filterRevRetArr.filter.push(revEntity);
        }
    }

    res.send(filterRevRetArr);
});

/** END REV ENTITY ANNOTATIONS */

/** START REV REL */

app.get("/rev_api/count_rels_by_target_guid_rel_val_id", async (req, res) => {
    let revRelsCount = await rev_pers_read_rev_entity_relationship_service_helper.revCountRels_By_TargetGUID_RelValId_Serv(req.query);
    res.send({ "revRelsCount": revRelsCount });
});

app.post("/rev_api/sync_new_rev_relationship", (req, res) => {
    let filterRevRetArr = {
        filter: [],
    };

    if (req.body.filter === undefined) {
        res.send(filterRevRetArr);
        return;
    }

    rev_pers_create_rev_entity_rel_service_helper.createNewRevEntitiesRelationshipsArrayService(req.body.filter, (result) => {
        res.send(result);
    });
});

app.post("/rev_api/sync_accepted_rels", async (req, res) => {
    let filterRevRetArr = {
        filter: [],
    };

    let revAcceptedRels = req.body["filter"];

    if (revAcceptedRels == undefined || rev_json_functions.revIsEmptyJSONObject(req.body["filter"])) {
        res.send(filterRevRetArr);
    }

    rev_pers_update_rel_resolve_status_service_helper.revPersUpdateRevEntityRelAcceptedServiceArrayService(revAcceptedRels, (result) => {
        res.send(result);
    });
});

app.post("/rev_api/get_partial_sync_rel_id", async (req, res) => {
    let revAnnArray = req.body["filter"];

    await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRelId_RelSubjectGUID_RelTargetGUID_CreationDate_Serv(revAnnArray, (revRetData) => {
        res.send(revRetData);
    });
});

app.post("/rev_api/confirm_local_rel_save", async (req, res) => {
    let filterRevRetArr = {
        filter: [],
    };

    await req.body["filter"].reduce((promise, item) => {
        return promise
            .then(() => {
                return rev_pers_update_rel_resolve_status_service_helper.revSetRelResStatusServ(item["_revResolveStatus"], item["_remoteRevEntityRelationshipId"]).then((revDbUpdateRes) => {
                    if (revDbUpdateRes.filter[0]._revResolveStatus == 0) {
                        filterRevRetArr.filter.push({ _remoteRevEntityRelationshipId: item._remoteRevEntityRelationshipId, _revResolveStatus: item._revResolveStatus });
                    }
                });
            })
            .catch(console.error);
    }, Promise.resolve());

    res.send(filterRevRetArr);
});

app.post("/rev_api/rev_set_rel_res_status_by_rel_id", async (req, res) => {
    let filterRevRetArr = {
        filter: [],
    };

    if (req.body["filter"] == undefined || rev_json_functions.revIsEmptyJSONObject(req.body["filter"])) {
        res.send(filterRevRetArr);
    }

    let revRelsJSONArray = req.body["filter"];

    let reqParamsRevResStatus = revRelsJSONArray[0]._revResolveStatus;
    let reqParamsRevRelIds = revRelsJSONArray[0]._remoteRevEntityRelationshipId.split(",");

    let arrReducePromise = reqParamsRevRelIds.reduce((promise, item) => {
        return promise
            .then(async () => {
                return rev_pers_update_rel_resolve_status_service_helper.revSetRelResStatusServ(reqParamsRevResStatus, item).then((revDbUpdateRes) => {
                    filterRevRetArr.filter.push(revDbUpdateRes);
                });
            })
            .catch(console.error);
    }, Promise.resolve());

    arrReducePromise.then(() => {
        res.send(filterRevRetArr);
    });
});

app.get("/rev_api/get_rev_rel_ids_by_res_status_subject_GUID", async (req, res) => {
    let filterRevRetArr = {
        filter: [],
    };

    let reqParamsRevResStatus = req.query.rev_res_status;
    let reqParamsRevSubjectGUID = req.query.rev_subject_guid;

    let revItems = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelIds_By_ResStatus_SubjectGUID_Serv(reqParamsRevResStatus, reqParamsRevSubjectGUID);

    revItems.forEach(function (obj) {
        filterRevRetArr.filter.push(obj.RELATIONSHIP_ID);
    });
    res.send(filterRevRetArr);
});

app.get("/rev_api/get_all_revEntity_rels_by_remote_rev_entity_GUID_rel_value_ids", async (req, res) => {
    let reqParamsRevEntityGUID = req.query.remote_rev_entity_guid;

    let filterRevRetArr = {
        filter: [],
        revRelatedEntities: {},
        filledRevRel: [],
        filledRelEntities: {},
    };

    let reqParamsRelValIds = req.query.rel_values_ids;
    let reqParamsArr = reqParamsRelValIds.split(",");

    let relValIdsArr = [];

    for (var i = 0; i < reqParamsArr.length; i++) {
        relValIdsArr.push(reqParamsArr[i]);
    }

    let relRevEntityGUIDs = [];

    let revRels = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadAllRevEntityRelsGUIDs_By_RevEntityGUID_RevRelIds_Serv(reqParamsRevEntityGUID, relValIdsArr);

    if (revRels.length == 0) {
        res.send(filterRevRetArr);
        return;
    }

    await revRels.reduce((previousPromise, nextId) => {
        return previousPromise.then(() => {
            return new Promise((resolve, reject) => {
                if (!relRevEntityGUIDs.includes(nextId.SUBJECT_GUID) && !relRevEntityGUIDs.includes(nextId.TARGET_GUID)) {
                    reqParamsRevEntityGUID == nextId ? relRevEntityGUIDs.push(nextId.TARGET_GUID) : relRevEntityGUIDs.push(nextId.SUBJECT_GUID);
                }

                resolve();
            });
        });
    }, Promise.resolve());

    filterRevRetArr["revRelatedEntities"] = await rev_db_entity_const_resolver.revPersReadRevEntityFiller_BY_RemoteRevEntityGUIDsServ(relRevEntityGUIDs);

    let revEntityRels = [];

    for (var i = 0; i < revRels.length; i++) {
        let revRel = revRels[i];
        let filledRevRel = rev_db_rels_const_resolver.revFillRevRel(revRel);
        revEntityRels.push(filledRevRel);
    }

    filterRevRetArr["filledRevRel"] = revEntityRels;

    let filledRelEntities = await rev_db_entity_const_resolver.revPersReadRevEntityFiller_BY_RemoteRevEntityGUIDsServ(relRevEntityGUIDs);

    filterRevRetArr["filledRelEntities"] = filledRelEntities;

    res.send(filterRevRetArr);
});

app.get("/rev_api/get_all_revEntity_rels_by_target_guid_rel_value", async (req, res) => {
    let filterRevRetArr = {
        filter: [],
        revPublishersArr: [],
    };

    let relRevEntityGUIDs = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Serv(req.query);

    if (relRevEntityGUIDs.filter.length == 0) {
        res.send(filterRevRetArr);
        return;
    }

    for (let i = 0; i < relRevEntityGUIDs.filter.length; i++) {
        let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(relRevEntityGUIDs.filter[i].SUBJECT_GUID);

        let revRetEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);

        filterRevRetArr.filter.push(revRetEntity);
    }

    let revParamsPublishersLimit;

    if (req.query.rev_publishers_limit) {
        revParamsPublishersLimit = req.query.rev_publishers_limit;
    }

    if (revParamsPublishersLimit) {
        for (let i = 0; i < filterRevRetArr.filter.length; i++) {
            let revEntity = filterRevRetArr.filter[i];

            if (!revEntity || !revEntity._revEntityOwnerGUID || revEntity._revEntityOwnerGUID < 1) {
                continue;
            }

            let revPublisherEntityDBRs = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(filterRevRetArr.filter[i]._revEntityOwnerGUID);
            let revPublisherEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revPublisherEntityDBRs);

            filterRevRetArr.revPublishersArr.push(revPublisherEntity);

            if (i == revParamsPublishersLimit) {
                break;
            }
        }
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/get_rel_id_container_entities_by_target_guid", async (req, res) => {
    let revRelIdConEntities = await rev_pers_fill_rev_entity_children.revPersReadRevRelsIdSubjectsContainer_By_TargetGUID_RelID_Serv(req.query);

    // console.log(JSON.stringify(revRelIdConEntities));

    res.send(revRelIdConEntities);
});

app.get("/rev_api/get_rel_target_entities", async (req, res) => {
    let filterRevRetArr = {
        filter: [],
    };

    let revReqQuery = req.query;

    if (!req.query.rev_subject_guid) return;

    let remoteRevEntityGUID = revReqQuery.rev_subject_guid;

    let revRelTypeValId;
    if (revReqQuery.rev_rel_val_id) revRelTypeValId = revReqQuery.rev_rel_val_id;

    let revRelsArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId_serv(remoteRevEntityGUID, revRelTypeValId);
    revRelsArr = revRelsArr.filter;

    for (let i = 0; i < revRelsArr.length; i++) {
        let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revRelsArr[i].TARGET_GUID);
        let revRetEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);
        filterRevRetArr.filter.push(revRetEntity);
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/get_entity_with_admins", async (req, res) => {
    let filterRevRetArr = {
        filter: [],
        revAdminsArr: [],
    };

    let revReqQuery = req.query;

    if (!revReqQuery.rev_subject_guid) {
        return;
    }

    let revEntityGUID = revReqQuery.rev_entity_guid;

    /** REV START GET ENTITY WE WANT TO ATTACH ADMINS TO */
    let revTargetEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revEntityGUID);
    let revTargetEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revTargetEntityDBRes);
    /** REV END GET ENTITY WE WANT TO ATTACH ADMINS TO */

    let revAddedAdminGUIDsArr = [];

    revTargetEntity["revAdminGUIDsArr"] = [];

    let revSubjectGUIDsArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Serv({ "rev_entity_target_guid": revEntityGUID, "rev_rel_type_val_id_arr": 11 });
    revSubjectGUIDsArr = revSubjectGUIDsArr.filter;

    for (let i = 0; i < revSubjectGUIDsArr.length; i++) {
        let revSubjectGUID = revSubjectGUIDsArr[i].SUBJECT_GUID;
        revTargetEntity.revAdminGUIDsArr.push(revSubjectGUID);

        if (revAddedAdminGUIDsArr.includes(revSubjectGUID)) {
            continue;
        }

        let revSubjectEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revSubjectGUID);

        let revSubjectEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revSubjectEntityDBRes);

        filterRevRetArr.revAdminsArr.push(revSubjectEntity);

        revAddedAdminGUIDsArr.push(revSubjectGUID);
    }

    filterRevRetArr.filter.push(revTargetEntity);

    res.send(filterRevRetArr);
});

app.get("/rev_api/get_entities_with_admins", async (req, res) => {
    let filterRevRetArr = {
        filter: [],
        revAdminsArr: [],
    };

    let revReqQuery = req.query;

    if (!revReqQuery.rev_subject_guid) return;

    let remoteRevEntityGUID = revReqQuery.rev_subject_guid;
    let revRelTypeValId = revReqQuery.rev_rel_type_val_id_arr;

    let revTargetGUIDsArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevRelsTargetGUIDs_By_RemoteRevEntityGUID_RelID_Serv(remoteRevEntityGUID, revRelTypeValId);
    revTargetGUIDsArr = revTargetGUIDsArr.filter;

    let revAddedAdminGUIDsArr = [];

    for (let i = 0; i < revTargetGUIDsArr.length; i++) {
        let revTargetGUID = revTargetGUIDsArr[i].TARGET_GUID;

        let revTargetEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revTargetGUID);
        let revTargetEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revTargetEntityDBRes);

        if (!revTargetEntity) continue;

        revTargetEntity["revAdminGUIDsArr"] = [];

        let revSubjectGUIDsArr = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevRelsSubjects_By_RemoteRevEntityGUID_RelID_Serv({ "rev_entity_target_guid": revTargetGUID, "rev_rel_type_val_id_arr": revRelTypeValId });
        revSubjectGUIDsArr = revSubjectGUIDsArr.filter;

        for (let s = 0; s < revSubjectGUIDsArr.length; s++) {
            let revSubjectGUID = revSubjectGUIDsArr[s].SUBJECT_GUID;
            revTargetEntity.revAdminGUIDsArr.push(revSubjectGUID);

            if (revAddedAdminGUIDsArr.includes(revSubjectGUID)) continue;

            let revSubjectEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revSubjectGUID);

            let revSubjectEntity = await rev_db_entity_const_resolver.revFillrevEntityType(revSubjectEntityDBRes);

            filterRevRetArr.revAdminsArr.push(revSubjectEntity);

            revAddedAdminGUIDsArr.push(revSubjectGUID);
        }

        filterRevRetArr.filter.push(revTargetEntity);
    }

    res.send(filterRevRetArr);
});

app.post("/rev_api/rev_rel_id_by_subject_target_rel_val_id", (req, res) => {
    let filterRevRetArr = {
        filter: [],
    };

    if (req.body["filter"] == undefined || rev_json_functions.revIsEmptyJSONObject(req.body["filter"])) {
        res.send(filterRevRetArr);
        return;
    }

    let revRelsJSONArray = req.body["filter"];

    let arrReducePromise = revRelsJSONArray.reduce((promise, item) => {
        return promise
            .then(async () => {
                return rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRelId_By_SubjectGUID_TargetGUID_RevRelValId_Serv(item._remoteRevEntitySubjectGUID, item._remoteRevEntityTargetGUID, item._revEntityRelationshipTypeValueId).then((revRelRemoteId) => {
                    filterRevRetArr.filter.push({ _revEntityRelationshipId: item._revEntityRelationshipId, _remoteRevEntityRelationshipId: revRelRemoteId });
                });
            })
            .catch(console.error);
    }, Promise.resolve());

    arrReducePromise.then(() => {
        res.send(filterRevRetArr);
    });
});

app.get("/rev_api/getNewRevRelationships", async (req, res) => {
    var remoteRevEntityGUID = req.query.remoteRevEntityGUID;
    await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRels_By_RemoteRevEntityGUIDServ(remoteRevEntityGUID).then((result) => {
        res.send(result);
    });
});

app.get("/rev_api/getNewRevRelationshipsTargets", async function (req, res) {
    let filterRevRetArr = {
        filter: [],
    };

    var remoteRevEntityGUID = req.query.remoteRevEntityGUID;
    await rev_pers_read_rev_entity_relationship_service_helper.revPersReadNewRevEntityRelsTargetsByRemoteRevEntityGUIDServ(remoteRevEntityGUID).then((result) => {
        result.filter.forEach(function (obj) {
            filterRevRetArr.filter.push(rev_db_rels_const_resolver.revRelFiller(obj));
        });

        res.send(filterRevRetArr);
    });
});

app.get("/rev_api/delete_rev_rel_by_rev_val_id_rel_entity_guids", async function (req, res) {
    var relTypeValId = req.query.rev_rel_type_val_id;
    var revEntityGUIDsArr = req.query.rev_rel_entity_guids.split(",");

    rev_pers_delete_rels_serv.revPersDeleteRel_By_revRelValId_EntityGUIDs_Serv(relTypeValId, revEntityGUIDsArr).then((result) => {
        res.send({ "revDelStatus": result });
    });
});

app.get("/rev_api/rev_pers_read_revEntityRels_subjects_by_target_guid_rel_val_id_res_status", (req, res) => {
    let remoteRevEntityTargetGUID = req.query.rev_entity_target_guid;
    let revResStatus = req.query.rev_res_status;
    let revQueryLimit = req.query.rev_query_limit;

    let revRelTypeValIdsArr = req.query.rev_rel_type_val_id_arr.split(",");

    let revVarArgs = {
        "remoteRevEntityTargetGUID": remoteRevEntityTargetGUID,
        "revRelTypeValIdsArr": revRelTypeValIdsArr,
        "revResStatus": revResStatus,
        "revQueryLimit": revQueryLimit,
    };

    rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRels_By_TargetRevEntityGUID_Serv(revVarArgs).then((result) => {
        res.send(result);
    });
});

app.get("/rev_api/get_rev_entities_by_entity_guid_rel_type", async (req, res) => {
    let relTypeValId = req.query.relTypeValId;
    let remoteRevEntityGUID = req.query.remoteRevEntityGUID;

    let revEntityGUIDs_DBRes = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId_serv(remoteRevEntityGUID, relTypeValId);
    revEntityGUIDs_DBRes = revEntityGUIDs_DBRes.filter;

    let revEntityGUIDsArr = [];

    for (let i = 0; i < revEntityGUIDs_DBRes.length; i++) {
        let revRel = revEntityGUIDs_DBRes[i];
        let revSubjectGUID = Number(revRel.SUBJECT_GUID);
        let revTargetGUID = Number(revRel.TARGET_GUID);

        let remoteRevEntityGUIDNum = Number(remoteRevEntityGUID);

        if (remoteRevEntityGUID == revSubjectGUID) {
            revEntityGUIDsArr.push(revTargetGUID);
        } else {
            revEntityGUIDsArr.push(revSubjectGUID);
        }
    }

    let filterRevRetArr = {
        filter: [],
    };

    for (let i = 0; i < revEntityGUIDsArr.length; i++) {
        let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revEntityGUIDsArr[i]);
        let revFilledEntityWithInfo = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);
        filterRevRetArr.filter.push(revFilledEntityWithInfo);
    }

    res.send(filterRevRetArr);
});

app.get("/rev_api/get_rev_entities_posts_by_entity_guid_rel_type", async (req, res) => {
    let filterRevRetArr = {
        filter: [],
        revEntityPublishersArr: [],
    };

    let relTypeValId = req.query.relTypeValId;
    let remoteRevEntityGUID = req.query.remoteRevEntityGUID;

    let revEntityGUIDs_DBRes = await rev_pers_read_rev_entity_relationship_service_helper.revPersReadRevEntityRels_Subjects_Targets_By_RemoteRevEntityGUID_RevRelValId_serv(remoteRevEntityGUID, relTypeValId);

    let revEntityGUIDsArr = [];

    for (let i = 0; i < revEntityGUIDs_DBRes.filter.length; i++) {
        let revRel = revEntityGUIDs_DBRes.filter[i];
        let revSubjectGUID = Number(revRel.SUBJECT_GUID);
        let revTargetGUID = Number(revRel.TARGET_GUID);

        if (remoteRevEntityGUID == revSubjectGUID) revEntityGUIDsArr.push(revTargetGUID);
        else revEntityGUIDsArr.push(revSubjectGUID);
    }

    revEntityGUIDsArr.push(remoteRevEntityGUID);

    let revEntityPosts = await rev_pers_read_rev_entity_service_helper.revPersReadAllRevEntities_OF_RevEntityContainerGUIDs_Serv(revEntityGUIDsArr);

    let revEntitiesOwnerGUIDsArr = [];

    for (let i = 0; i < revEntityPosts.length; i++) {
        let revEntityDBRes = revEntityPosts[i];

        if (!revEntityDBRes || !revEntityDBRes.REV_ENTITY_OWNER_GUID || revEntityDBRes.REV_ENTITY_OWNER_GUID < 1) continue;

        let revEntityOwnerGUID = revEntityDBRes.REV_ENTITY_OWNER_GUID;
        revEntitiesOwnerGUIDsArr.push(revEntityOwnerGUID);

        let revFilledEntityWithInfo = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);

        if (!revFilledEntityWithInfo) continue;

        filterRevRetArr.filter.push(revFilledEntityWithInfo);
    }

    for (let i = 0; i < revEntitiesOwnerGUIDsArr.length; i++) {
        let revEntityDBRes = await rev_pers_read_rev_entity_service_helper.promiseToReadRevEntityByRemoteRevEntityGUID(revEntitiesOwnerGUIDsArr[i]);
        let revFilledEntityWithInfo = await rev_db_entity_const_resolver.revFillrevEntityType(revEntityDBRes);

        if (revFilledEntityWithInfo) filterRevRetArr.revEntityPublishersArr.push(revFilledEntityWithInfo);
    }

    res.send(filterRevRetArr);
});

/** END REV REL */

var cleanUnresolvedLocals = (revItemData) => {
    return new Promise(function (resolve, reject) {
        resolve(revItemData);
    });
};

function unresolvedLocals(arr) {
    let itemsArr = [];

    for (var myKey in arr) {
        itemsArr.push(myKey);
    }

    return itemsArr.reduce((promise, item) => {
        return promise
            .then((result) => {
                return cleanUnresolvedLocals(item).then((result) => filterRevRetArr.filter.push(result));
            })
            .catch(console.error);
    }, Promise.resolve());
}

app.post("/unresolvedLocals", function (req, res) {
    unresolvedLocals(req.body).then(() => {
        res.send(filterRevRetArr);
    });
});

let promiseRevFinalSync = function (remoteRevEntityGUID) {
    return new Promise(function (resolve, reject) {
        rev_pers_update_rev_entity_serv.promiseToRevPersUpdateResolvedRevEntity_Serv(remoteRevEntityGUID, function (result) {
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};

app.post("/final_sync", function (req, res) {
    var revYeArray = req.body;
    let responsePromises = [];

    for (var i = 0; i < revYeArray["filter"].length; i++) {
        var revEl = revYeArray["filter"][i];
        responsePromises.push(promiseRevFinalSync(revEl["_remoteRevEntityGUID"]));
    }

    Promise.all(responsePromises).then((result) => {
        var revRetArr = {
            filter: [],
        };

        for (var i in JSON.parse(JSON.stringify(result))) {
            var item = JSON.parse(JSON.stringify(result))[i];
            revRetArr.filter.push(item);
        }

        res.send(revRetArr);
    });
});

app.post("/rev_api/delete_rev_entity", function (req, res) {
    let reqParams = req.query.rev_entity_guids;
    let reqParamsArr = reqParams.split(",");

    var jsonData = {};

    for (let i = 0; i < reqParamsArr.length; i++) {
        let delId = reqParamsArr[i];
        jsonData[delId] = "true";
    }

    res.send(jsonData);
});

var path = require("path");
const { Console } = require("console");
const { resolve } = require("path");
const { strict } = require("assert");
const { stringify } = require("querystring");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("../../rev_node/rev_uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/file_upload", upload.any(), (req, res, next) => {
    let filterRevRetArr = {
        filter: [],
    };

    console.log("req.files.length : " + JSON.stringify(req.files.length));

    console.log("UPLOADINg . . . . " + req.files.length);

    if (!req.files) {
        console.log("File was not found");
        res.send(filterRevRetArr);
        return;
    }

    for (let i = 0; i < req.files.length; i++) {
        filterRevRetArr.filter.push(req.files[i].filename);
    }

    console.log("UPLOADING DONE . . . .\n\t\t" + JSON.stringify(filterRevRetArr));

    res.send(filterRevRetArr);
});

app.get("/api/download/rev_view_js", function (req, res) {
    var reqParams = req.query.filePath;

    // var file = __dirname + "/rev_uploads/" + reqParams;
    var file = path.resolve("../rev_files/") + "/" + reqParams;

    var stats = fs.statSync(file);
    var fileSizeInBytes = stats["size"];
    // Convert the file size to megabytes (optional)
    // var fileSizeInMegabytes = fileSizeInBytes / 1000000.0

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader("Content-disposition", "attachment; filename=" + filename);
    res.setHeader("Content-type", mimetype);
    res.setHeader("Content-Length", fileSizeInBytes);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});

app.get("/api/download", function (req, res) {
    var reqParams = req.query.filePath;

    // var file = __dirname + "/rev_uploads/" + reqParams;
    var file = path.resolve("../rev_uploads/") + reqParams;

    var stats = fs.statSync(file);
    var fileSizeInBytes = stats["size"];
    // Convert the file size to megabytes (optional)
    // var fileSizeInMegabytes = fileSizeInBytes / 1000000.0

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader("Content-disposition", "attachment; filename=" + filename);
    res.setHeader("Content-type", mimetype);
    res.setHeader("Content-Length", fileSizeInBytes);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});

app.get("/rev_api/pipe_file", function (req, res) {
    const path = "assets/sample.mp4";
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

/** PORT **/
const revPort = process.env.PORT || 4000;

var server = http.createServer(app);

server.on("listening", function () {
    console.log("ok, server is running");
});

server.listen(revPort, () => {
    console.log(`Listening on port ${revPort} . . . .`);
    console.log(`CORS-enabled web server listening on port : ${revPort}`);
});

revWebSocketServer.revInitWebSocketServer(server);
