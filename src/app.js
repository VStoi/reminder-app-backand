const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const { createServer } = require('http');

dotenv.config();

require('./core/db');
const userRouter = require('./routes/userRouter');
const reminderRouter = require('./routes/reminderRouter');

const app = express();
const http = createServer(app);

app.use(bodyParser.json())

userRouter(app);
reminderRouter(app);

const PORT = process.env.PORT ? process.env.PORT : 3000;

http.listen(PORT, function () {
    console.log(`Server: http://localhost:${PORT}`);
});