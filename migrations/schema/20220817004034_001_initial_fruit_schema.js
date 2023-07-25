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
