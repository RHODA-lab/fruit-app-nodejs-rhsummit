const pgBinding = require("kube-service-bindings")
const Pool = require("pg").Pool;
const Client = require("pg").Client;
const assert = require('assert');

//var app_pg = require('../../app_pg');
//var USER_ID = app_pg.USERID;

//const USERID = require('../../app_pg.js');
//console.log("This is the USERID from PJ.JS " + USERID.toString());
//console.log(typeof USERID);

//import USERID from '../../app_pg.js';

const USERID = process.env.USERID;

console.log("THE USERID in PGJS: " + USERID);

function getPGConnectString() {
    let bindingInfo;
    try {
        bindingInfo = pgBinding.getBinding('POSTGRESQL', 'pg')
        // bindingInfo['ssl']=true;
        // delete bindingInfo['options']
        console.log(bindingInfo)
    } catch (err) {
        console.log(err)
    }
    return bindingInfo;
}

module.exports = {
    getPGConnectString,
}

const Knex = require("knex");

const config = {
    client: "cockroachdb",
    connection: getPGConnectString(),
    migrations: {
        directory: "migrations/schema",
    },
    seeds: {
        directory: "migrations/data",
    },
}

// Connect to database

async function initTable(client) {
    await client.migrate.latest();
    await client.seed.run();
}

(async () => {
    console.log("initializing fruit schema");
    console.log("The USERID is : " + USERID);
    try {
        const client = Knex(config);

        await initTable(client);
    } catch (err) {
        console.log("ignoring migration error")
        console.log(err.message);
    }

})().catch((err) => console.log(err.stack));
