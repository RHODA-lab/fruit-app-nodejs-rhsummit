/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const USERID = process.env.USERID;

console.log("THE USERID is: " + USERID);

exports.up = async function(knex) {
 console.log("The USERID is inside schema creation: " + USERID);
 await knex.schema.raw("CREATE DATABASE IF NOT EXISTS " + USERID);
 await knex.schema.raw("CREATE TABLE IF NOT EXISTS " + USERID + ".fruit(id varchar(100) PRIMARY KEY , name varchar(100), quantity varchar(11) null, description varchar(200) null)");
 await knex.schema.raw("CREATE TABLE IF NOT EXISTS " + USERID + ".fruitoutbox(id varchar(100) PRIMARY KEY , name varchar(100), quantity varchar(11) null, description varchar(200) null)");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {};


//REDUNDANCY CHECK

'use strict';

//var MongoClient = require('mongodb').MongoClient;
var serviceBindings = require('kube-service-bindings');
var config = require('./config');
var { Pool } = require("pg");
var _db;

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

var bindings;
try {
    // check if the deployment has been bound to a pg instance through
    // service bindings. If so use that connect info
    bindings = serviceBindings.getBinding('POSTGRESQL', 'pg');
    console.log('check bindings');
    console.log(bindings);
    console.log('verifying if cert can be read from the binding object:');
    console.log(bindings["root.crt"]);
} catch (err) { // proper error handling here
    console.log('bindings failed');
};


const pool = new Pool({
    user: bindings.user,
    password: bindings.password,
    host: bindings.host,
    database: bindings.database,
    port: bindings.port,
    sslmode: bindings.sslmode,
    options: bindings.options,
    ssl: {
        rejectUnauthorized: false,
        ca: bindings["root.crt"].toString()
    }
})

//checking connection with pg driver to cockroachdb
pool
  .connect()
  .then(client => {
    console.log('connected to cockroachdb')
    client.release()
  })
  .catch(err => console.error('error connecting', err.stack))
  .then(() => pool.end())

/*
var delete_table = "DROP TABLE higscores CASCADE";
pool.query(delete_table, function(err, rows){
        if(err){
            console.error(err);
            return;
        }else{
            console.log(rows);
            return;
        }
    });
*/


var create_table = "CREATE DATABASE IF NOT EXISTS " + USERID;
pool.query(create_table, function(err, rows){
        if(err){
            console.error(err);
            return;
        }else{
            console.log(rows);
            return;
        }
    });


function Database() {
    this.connect = function(app, callback) {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    _db = pool;
    app.locals.db = pool;
    }

    this.getDb = function(app, callback) {
        if (!_db) {
            this.connect(app, function(err) {
                if (err) {
                    console.log('Failed to connect to database server');
                } else {
                    console.log('Connected to database server successfully');
                }

                callback(err, _db);
            });
        } else {
            callback(null, _db);
        }

    }
}

module.exports = exports = new Database(); // Singleton
