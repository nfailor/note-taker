const express = require('express');

const htmlRoutes = require('./htmlRoutes')
const apiRoutes = require('./apiRoutes')

const app = express();

app.use(htmlRoutes);
app.use('/api', apiRoutes);

module.exports = app;