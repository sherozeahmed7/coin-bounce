const express = require('express');
const dbConnect = require("./database/index");
const {PORT} = require('./config/index');
const router = require('./routes/index');
const errorHandle = require('./middleware/errorHandler');


const app = express();

app.use(express.json());

app.use(router);

dbConnect();

app.use(errorHandle);

app.listen(PORT, console.log(`express is running on port: ${PORT} ` ));
