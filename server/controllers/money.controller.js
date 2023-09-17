const Money = require('../models/money.model');

module.exports = {

    findAllMoney: (req, res) => {
        Money.find()
            .then((allMoney) => {
                console.log(allMoney);
                res.json(allMoney)
            })
            .catch((err) => {
                console.log("findAllMoney has failed!");
                res.json({ message: "Something went wrong in findAll", error: err })
            })
    },

    createNewMoney: (req, res) => {
        Money.create(req.body)
            .then((newMoney) => {
                console.log(newMoney);
                res.json(newMoney);
            })
            .catch((err) => {
                console.log("createNewMoney has failed!");
                res.status(400).json(err)
            })
    },

    findOneMoney: (req, res) => {
        Money.findOne({ _id: req.params.id })
            .then((oneMoney) => {
                console.log(oneMoney);
                res.json(oneMoney);
            })
            .catch((err) => {
                console.log("findOneMoney failed!");
                res.json({ message: "Something went wrong in findOneMoney", error: err })
            })
    },

    deleteOneMoney: (req, res) => {
        Money.deleteOne({ _id: req.params.id })
            .then((deleteMoney) => {
                console.log(deleteMoney);
                res.json(deleteMoney);
            })
            .catch((err) => {
                console.log("deleteOneMoney failed!");
                res.json({ message: "Something went wrong with deleteOneMoney", error: err })
            })
    },

    updateMoney: (req, res) => {
        Money.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then((updatedMoney) => {
                console.log(updatedMoney)
                res.json(updatedMoney)
            })
            .catch((err) => {
                console.log("Something went wrong with updateMoney!")
                res.status(400).json(err)
            })
    }

}