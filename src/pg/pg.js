const pgBinding = require("kube-service-bindings")
const Pool = require("pg").Pool;
const Client = require("pg").Client;
const assert = require('assert');

function getPGConnectString() {
    let bindingInfo;
    try {
        bindingInfo = pgBinding.getBinding('POSTGRESQL', 'pg-crdb')
        console.log(bindingInfo)
    } catch (err) {
        console.log(err)
    }
    return bindingInfo.connectionString;
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
    try {
        const client = Knex(config);

        await initTable(client);
    } catch (err) {
        console.log("ignoring migration error")
        console.log(err.message);
    }

})().catch((err) => console.log(err.stack));
