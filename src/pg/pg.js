const pgBinding = require("kube-service-bindings")
const Pool = require("pg").Pool;
const Client = require("pg").Client;
const assert = require('assert');

const USERID = process.env.USERID;

console.log("THE USERID in PGJS: " + USERID);

var bindingInfo;
function getPGConnectString() {
    //let bindingInfo;
    try {
        bindingInfo = pgBinding.getBinding('POSTGRESQL', 'pg')
        // bindingInfo['ssl']=true;
        // delete bindingInfo['options']
        console.log("This is BindingInfo: ");
        console.log(bindingInfo);
    } catch (err) {
        console.log(err)
    }
    return bindingInfo;
}


//REDUNDANCY CHECK FOR KNEX


testBindings = pgBinding.getBinding('POSTGRESQL', 'pg')
console.log("TEST BINDING:  ");
console.log(testBindings);

console.log(" CA cert :::: ");
console.log(testBindings.ssl.ca);


const pool = new Pool({
    user: testBindings.user,
    password: testBindings.password,
    host: testBindings.host,
    database: testBindings.database,
    port: testBindings.port,
    sslmode: testBindings.sslmode,
    options: testBindings.options,
    ssl: {
        rejectUnauthorized: false,
        ca:testBindings.ssl.ca
    }
})

//checking connection with pg driver to cockroachdb
/*
pool
  .connect()
  .then(client => {
    console.log('connected to cockroachdb')
    client.release()
  })
  .catch(err => console.error('error connecting', err.stack))
  .then(() => pool.end())
*/

var create_database = "CREATE DATABASE IF NOT EXISTS " + USERID;
pool.query(create_database, function(err, rows){
        if(err){
            console.error(err);
            return;
        }else{
            console.log(rows);
            console.log("Database created");
            return;
        }
    });
console.log("Database created")

async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/*
async function ledLoop() {
  for (i=0; i < 1; i++) {
    console.log("Wait started");  
    await sleep(2500);
    console.log("Wait ended");  
  }
}

ledLoop();
*/

var create_table = "CREATE TABLE IF NOT EXISTS " + USERID + ".fruit(id varchar(100) PRIMARY KEY , name varchar(100), quantity varchar(11) null, description varchar(200) null)";
async function fruitTable() {
  for (i=0; i < 1; i++) {
    console.log("Wait started");  
    await sleep(1000);
    pool.query(create_table, function(err, rows){
        if(err){
            console.error(err);
            return;
        }else{
            console.log(rows);
            console.log("Fruit table created");
            return;
        }
    });  
    console.log("Wait ended");  
  }
}

fruitTable();


var create_outboxtable = "CREATE TABLE IF NOT EXISTS " + USERID + ".fruitoutbox(id varchar(100) PRIMARY KEY , name varchar(100), quantity varchar(11) null, description varchar(200) null)";
async function fruitOutboxTable() {
  for (i=0; i < 1; i++) {
    console.log("Wait started");  
    await sleep(1500);
    pool.query(create_outboxtable, function(err, rows){
        if(err){
            console.error(err);
            return;
        }else{
            console.log(rows);
            console.log("Fruit Outbox table created");
            return;
        }
    });  
    console.log("Wait ended");  
  }
}
fruitOutboxTable();

//END REDUNDANCY CHECK


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
    console.log("Migration wait started");
    await sleep(7500);        //new
    console.log("Migration wait ended");
    await client.migrate.latest();
    await client.seed.run();
}

(async () => {
    console.log("initializing fruit schema");
    await sleep(7500); //new
    console.log("The USERID is : " + USERID);
    try {
        const client = Knex(config);

        await initTable(client);
    } catch (err) {
        console.log("ignoring migration error")
        console.log(err.message);
    }

})().catch((err) => console.log(err.stack));
