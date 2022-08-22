const {
    listFruits,
    createFruit,
    deleteFruit,
    updateFruit,
} = require("./queries")

module.exports = function (app) {
    app.get("/fruits", listFruits);
    app.post("/fruits", createFruit);
    app.delete("/fruits/:id", deleteFruit);
    app.put("/fruits/:id", updateFruit);
}
