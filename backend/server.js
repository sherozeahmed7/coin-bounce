const express = require('express');
const dbConnect = require("./database/index");
const {PORT} = require('./config/index');
const router = require('./routes/index');
const errorHandle = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
    credentials: true,
    origin: "http://localhost:5173"
}

const app = express();

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());

app.use(router);

dbConnect();

app.use('/storage', express.static('storage'));

app.use(errorHandle);

app.listen(PORT, console.log(`express is running on port: ${PORT} ` ));
