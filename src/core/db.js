const mongoose = require("mongoose");


const connect = () => {
    return new Promise((resolve, reject) => {

        if (process.env.IS_TEST === 'test'){
        const Mockgoose = require("mockgoose").Mockgoose;
        const mockgoose = new Mockgoose(mongoose);

        mockgoose.prepareStorage()
            .then(() => {
                mongoose.connect(process.env.DB_URI,
                    {
                        useUnifiedTopology: true,
                        useNewUrlParser: true
                    })
                    .then((res, err) => {
                        if (err) {
                            return reject(err)
                        }
                        console.info('Connection to DB established');
                        resolve()
                    })
            })
        } else {
            mongoose.connect(
                process.env.DB_URI,
                {
                    useUnifiedTopology: true,
                    useNewUrlParser: true
                })
                .then((res, err) => {
                    if (err) {
                        return reject(err)
                    }
                    console.info('Connection to DB established');
                    resolve()
                })
        }
    })
}

module.exports = connect;