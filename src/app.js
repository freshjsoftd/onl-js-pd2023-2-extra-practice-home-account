const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// =============================
const router = require('./routers');
const {errorHandlers: {
  authErrorHandler,
  validationErrorHandler,
  sequelizeErrorHandler,
  errorHandler
}} = require('./middlewares')

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);
app.use(authErrorHandler,
  validationErrorHandler,
  sequelizeErrorHandler,
  errorHandler)

module.exports = app;
