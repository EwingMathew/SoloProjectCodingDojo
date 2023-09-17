const MoneyController = require("../controllers/money.controller");
const Money = require("../models/money.model");

module.exports = (app) => {
    app.get("/api/money", MoneyController.findAllMoney);
    app.post("/api/money", MoneyController.createNewMoney);
    app.get("/api/money/:id", MoneyController.findOneMoney);
    app.delete("/api/money/:id", MoneyController.deleteOneMoney);
    app.put("/api/money/:id", MoneyController.updateMoney);
}