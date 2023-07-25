const bodyParser = require("body-parser");
const express = require("express");
const port = 8080;
const app = express();
const USERID = process.env.USERID;

console.log("THE USERID is: " + USERID);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.static('public'));

const controller = require("./src/pg/server")
controller(app);

//create the server on a port
app.listen(port, () => {
    console.log(`App (Postgresql) running on port ${port}.`);
});

//exports.USERID = USERID;
//module.exports = {USERID};
export default USERID;
