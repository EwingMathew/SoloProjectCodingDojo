const mongoose = require("mongoose");

const moneyDB = "moneyDBnew";

mongoose.connect(`mongodb://127.0.0.1:27017/` + moneyDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connected to ${moneyDB} database`))
    .catch((err) =>
        console.log(`Error connecting to ${moneyDB}. Here is your error: `, err))