require('dotenv').config();

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
const client = require('prom-client');

// Create a Registry to register the metrics
const register = new client.Registry();
client.collectDefaultMetrics({register});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
