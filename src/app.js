const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");

dotenv.config();

const connect = require("./core/db");
const userRouter = require("./routes/userRouter");
const reminderRouter = require("./routes/reminderRouter");

const app = express();
const http = createServer(app);

app.use(bodyParser.json());
app.use(cors());

userRouter(app);
reminderRouter(app);

const PORT = process.env.PORT ? process.env.PORT : 3000;

connect()
    .then(() => {
        http.listen(PORT, function () {
            console.log(`Server: http://localhost:${PORT}`);
        });
    });

module.exports = app;