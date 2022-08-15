const Pool = require("pg").Pool;
const uuid = require("node-uuid")

const {
    getPGConnectString
} = require("./pg")

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fruits",
  password: "password",
  port: 5432,
});
const tableName = "fruit";

//get all the fruits in order to list them off

const GET = (request, response) => {
  pool.query("SELECT * FROM fruit ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
//insert a specific fruit into the data base

const POST = (request, response) => {
  const { name } = request.body;

  pool.query(
    "INSERT INTO fruit (name) VALUE ($1)",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Fruit added with ID: ${results.insertId}`);
    }
  );
};
//update a fruit in the data base

const PUT = (request, response) => {
  const { name, id } = request.body;

  pool.query(
    "UPDATE fruit SET name = $1, id = $2",
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Fruit modified with ID: ${id}`);
    }
  );
};
//delete a specific fruit in the database

const DELETE = (request, response) => {
  const { name, id } = request.body;

  pool.query(
    "DELETE FROM fruit WHERE name = $1",
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Fruit deleted with ID: ${id}`);
    }
  );
};

function createFruit(fruit) {

}

const listFruits = (req, rep) => {
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

module.exports = {
  POST,
  PUT,
  GET,
  DELETE,
  createFruit,
  listFruits,
};
