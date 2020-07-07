const bodyParser = require("body-parser");

const userRouter = (app) => {
    // app.use(bodyParser.json());
    app.get('/', (req, res) => {
        res.json({text: "hello!!"})
    })
};

module.exports = userRouter;