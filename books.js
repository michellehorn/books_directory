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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const books_filtered = books.filter((book) => book.id !== parseInt(id));
  const response = {
    data: books_filtered,
    message: `Book with id #${id} has been deleted`
  };
  res.json(response);
});

router.post('/', (req, res) => {
  const { name, author } = req.body;
  let errk = [];
  if (name === undefined) errk.push('name');
  if (author === undefined) errk.push('author');

  if (errk.length > 0) res.json(`Field(s) missing: ${errk.join(', ')}`);
  let books_list = books;
  books_list.push({
    id: books.length + 1,
    name: name,
    author: author
  });

  const response = {
    data: books_list,
    message: 'Book added successfully!'
  };

  res.json(response);
});

router.put('/:id', (req, res) => {
  const { name, author } = req.body;
  const { id } = req.params;
  let books_list = books;
  books_list = books_list.map((book) =>
    book.id === parseInt(id)
      ? {
          id: book.id,
          name: name,
          author: author
        }
      : book
  );

  const response = {
    data: books_list,
    message: 'Book updated successfully!'
  };

  res.json(response);
});

module.exports = router;
