const express = require('express');
const books = require('./books');

const port = 5000;

const app = express();

app.use(express.json());
app.use('/api/v1/books', books);

app.listen(port, () =>
  console.log(`This api is running on: https://localhost:${port}`)
);
