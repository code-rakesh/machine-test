require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const router = require('./app/routers/index');
const PORT = 3001
const app = express();
const env = process.env
app.use(bodyParser.json());
const connection_string = env.connection_string

mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err.message));

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log('Server is running');
});