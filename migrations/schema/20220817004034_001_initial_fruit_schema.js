/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
 await knex.schema.raw("CREATE TABLE IF NOT EXISTS fruit(id varchar(100) PRIMARY KEY , name varchar(100), quantity varchar(11) null, description varchar(200) null)");
// return knex.schema
//     .createTable('users', function (table) {
//         table.increments('id');
//         table.string('name', 255).notNullable();
//         table.string('email', 255);
//         table.timestamps();
//     });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {};
