const express = require('express');
const dotenv = require('dotenv');
const { createServer } = require('http');

dotenv.config();

require('./core/db');
const userRouter = require('./routes/userRouter');

const app = express();
const http = createServer(app);

userRouter(app);

const PORT = process.env.PORT ? process.env.PORT : 3003;

http.listen(PORT, function () {
    console.log(`Server: http://localhost:${PORT}`);
});