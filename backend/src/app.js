const express = require('express');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const notFound = require('./middleware/notFound');
const errorhandler = require('./middleware/errorHandler');
const requestTime = require('./middleware/requestTime');
const responseHandler = require('./middleware/responseHandler');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(cors());
app.use(morgan);
app.use(helmet);
app.use(bodyParser.json());

app.use(requestTime);
app.use(responseHandler);

app.use('/api/user', userRoute);

app.use(notFound);
app.use(errorhandler);

module.exports = app;
