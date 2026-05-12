const express = require('express');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const notFound = require('./src/middleware/notFound');
const errorhandler = require('./src/middleware/errorHandler');
const requestTime = require('./src/middleware/requestTime');
const responseHandler = require('./src/middleware/responseHandler');

const authRouter = require('./src/routes/authRoute');
const userRoute = require('./src/routes/userRoute');
const toolRouter = require('./src/routes/toolRoute');
const taskRouter = require('./src/routes/taskRoute');
const materialsRouter = require('./src/routes/authRoute');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());

app.use(requestTime);
app.use(responseHandler);

app.use('/api/auth', authRouter);
app.use('/api/user', userRoute);
app.use('/api/tool', toolRouter);
app.use('/api/task', taskRouter);
app.use('/api/materials', materialsRouter);

app.use(notFound);
app.use(errorhandler);

module.exports = app;
