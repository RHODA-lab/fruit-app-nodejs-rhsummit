const Pool = require("pg").Pool;
const {Client} = require("pg");
const uuid = require("uuid")

const {
    getPGConnectString,
} = require("./pg")

const dbConn = new Client(getPGConnectString());
try {
    dbConn.connect();
} catch (err) {
    console.log("failed to connect to database.")
}

const createFruit = (req, rep) => {
    (async () => {
        let fruit = {
            id: uuid.v4(),
            name: req.body.name,
        }
        console.log('post called', fruit);
        try {
            let res = await dbConn.query(`insert into fruit (id, name) values ($1, $2)`, [fruit.id, fruit.name]);
            // await pgPool.end();
        } catch (err) {
            console.log(`fail to use db ${err.status}`);
        }
        rep.send(fruit);
    })().catch((err) => console.log("err from async: " + err.stack));
}

const listFruits = (req, rep) => {
    (async () => {
        dbConn.query('select * from fruit').then(res => {
            rep.status(200).send(res.rows);
        }).catch(e => console.error(e.stack));
    })().catch((err) => console.log("err from async: " + err.stack));
}

const listFruitsv2 = (req, rep) => {
    (async () => {
        const connectionString = getPGConnectString()
        console.log("connstr", connectionString)

        const pool2 = new Pool({connectionString});

        // Connect to database
        const client = await pool2.connect();

        client.query('select * from fruit').then(res => {
            rep.status(200).send(res.rows);
            client.release();
        }).catch(e => console.error(e.stack));
    })().catch((err) => console.log("err from async: " + err.stack));
}

const deleteFruit = (req, rep) => {
    (async () => {
        console.log("deleting", req.params.id);

        dbConn.query("delete from fruit where id = $1", [req.params.id]).then(res => {
            rep.status(200).send(res.rows);
            // client.release();
        }).catch(e => console.error(e.stack));
    })().catch((err) => console.log("err from async: " + err.stack));

}

const updateFruit = (req, rep) => {
    (async () => {
        // const connectionString = getPGConnectString();
        // console.log("connstr", connectionString, req.param.id);
        //
        // const pool2 = new Pool({connectionString});
        //
        // // Connect to database
        // const client = await pool2.connect();
        console.log("updating", req.params.id, req.body.name);

        dbConn.query("update fruit set name = $1 where id = $2", [req.body.name, req.params.id]).then(res => {
            rep.status(200).send(res.rows);
        }).catch(e => console.error(e.stack));
    })().catch((err) => console.log("err from async: " + err.stack));
}

async function createDBClient() {
    const connectionString = getPGConnectString()
    console.log("connstr", connectionString)

    const client = new Client(connectionString);
    return client
}

// ??
async function createDBPool() {
    const connectionString = getPGConnectString()
    console.log("connstr", connectionString)

    const pool2 = new Pool({connectionString});

    // Connect to database
    const client = await pool2.connect();
    return client
}

module.exports = {
    createFruit,
    listFruitsv2,
    listFruits,
    deleteFruit,
    updateFruit,
};
