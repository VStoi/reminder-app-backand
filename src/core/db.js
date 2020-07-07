const mongoose = require("mongoose");

mongoose.connect(
    process.env.DB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    (err) => {
        if (err) {
            throw Error(err);
        }
        console.info('Connection to DB established');
    }
);