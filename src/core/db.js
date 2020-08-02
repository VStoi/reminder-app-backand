const mongoose = require("mongoose");


const connect = () => {
    return new Promise(async (resolve, reject) => {
        mongoose.connect(
            process.env.DB_URI,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            })
            .then((res, err) => {
                if (err) {
                    return reject(err);
                }
                console.log("Connection to DB established");
                resolve();
            });
    });
};

module.exports = connect;