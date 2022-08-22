const bodyParser = require("body-parser");
const express = require("express");
const port = 8080;
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.static('public'));

const controller = require("./src/mysql/server")
controller(app);

//create the server on a port
app.listen(port, () => {
    console.log(`App (MYSQL) running on port ${port}.`);
});
