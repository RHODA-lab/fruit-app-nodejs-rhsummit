const srvBinding = require("kube-service-bindings")

function getMYSQLConnectConfig() {
    let bindingInfo;
    try {
        bindingInfo = srvBinding.getBinding('MYSQL', 'mysql')
        console.log(bindingInfo)
    } catch (err) {
        console.log(err)
    }
    return bindingInfo;
}

module.exports = {
    getMYSQLConnectConfig,
}

const Knex = require("knex");

const config = {
    client: "mysql2",
    connection: getMYSQLConnectConfig(),
    migrations: {
        directory: "migrations/schema",
    },
    seeds: {
        directory: "migrations/data",
    },
}

async function initTable(client) {
    await client.migrate.latest();
    await client.seed.run();
}

(async () => {
    console.log("initializing fruit schema");
    try {
        // Connect to database
        const client = Knex(config);

        await initTable(client);
    } catch (err) {
        console.log("ignoring migration error")
        console.log(err.message);
    }

})().catch((err) => console.log(err.stack));
