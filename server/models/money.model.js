const mongoose = require("mongoose");

const MoneySchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "A date is required"]
    },
    amount: {
        type: Number,
        required: [true, "An amount is required"]
    },
    description: {
        type: String,
        required: [true, "A description is required"]
    },
    transaction: {
        type: String,
        required: [true, "Must select an Withdraw or Deposit!"]
    }
}, { timestamps: true })

const Money = mongoose.model("Money", MoneySchema);

module.exports = Money;
