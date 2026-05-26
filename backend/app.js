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
const materialRouter = require('./src/routes/materialRoute');
const toolRecordsRouter = require('./src/routes/toolRecordsRoute');
const materialRecordsRouter = require('./src/routes/materialRecordsRoute');

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
app.use('/api/material', materialRouter);
app.use('/api/toolRecords', toolRecordsRouter);
app.use('/api/materialRecords', materialRecordsRouter);

app.get('/test', (req, res) => {
  res.send('后端接口成功');
});

app.use(notFound);
app.use(errorhandler);

module.exports = app;
