const express = require('express');
const router = express.Router();
const books = require('./books.json');

router.get('/', (req, res) => res.json(books));

router.post('/search', function (req, res) {
  // Filter: name, author, orderBy, order
  const filter = req.body;

  const books_filtered = books.filter((item) => {
    for (var key in filter) {
      if (
        item[key] === undefined ||
        !item[key].toLowerCase().includes(filter[key].toLowerCase())
      )
        return false;
    }
    return true;
  });

  return res.json(books_filtered);
});

module.exports = router;

