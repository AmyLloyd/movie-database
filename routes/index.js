//Import express.js
const express = require('express');

const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving all information
//It's done when a GET request to the /api/movies route renders a list of all movies.
app.get('/api/movies', (req, res) => {
    const sql = 'SELECT movies.movie_name AS movie, reviews.review FROM '
    readFromFile('./db/diagnostics.json').then((data) =>
      res.json(JSON.parse(data))
    );
  });