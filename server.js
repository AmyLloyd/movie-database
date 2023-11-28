//import express.js server
const express = require('express');

//Import and require mysql2
const mysql = require('mysql2');

//identify PORT for use in heroku and local host 3001
const PORT = process.env.PORT || 3001;

//use an instance of express server as app
const app = express();

//express middleware to translate and read languages
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to database 
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Mysql username,
        user: 'root',
        //My SQL password 
        password: '_pie083OUT()',
        database: 'movies_db'
    },
    console.log(`Connected to the movie_database.`)
);

// GET request to the /api/movies route renders a list of all movies.
app.get('/api/movies', (req, res) => {
    const sql = 'SELECT id, movie_name AS title FROM movies';
    
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error:err.message });
            return;
        }
        res.json({
            message: 'success',
            data: results 
        });
    });
});

// GET request to the /api/movie-reviews route renders a list of all reviews with movie data.
app.get('api/movie-reviews', (req, res) => {
    const sql = 'SELECT movies.movie_name AS title, reviews.review AS review FROM reviews JOIN movies ON reviews.movie_id=movies.id;'

    db.query(sql, (err, results) => {
        if(err) {
            res.status(500).json({ error:err.message });
            return;
        }
        res.json({
            message: 'success',
            data: results
        });
    });
});

//POST request to the /api/add-movie route adds a movie when tested using Insomnia.
app.post('api/add-movie', (req, res) => {
    const sql = `INSERT INTO movies (id, movie_name) VALUES (++, ?);`

    db.query(sql, (err, results) => {
        if(err) {
            res.status(500).json({ error:err.message });
            return;
        }
        res.json({
            message: 'Movie successfully added',
            data: results
        });
    });
});

//PUT request to the /api/review/:id route updates a movie review.
app.put('/api/review/:id', (req, res) => {
    const sql = `UPDATE reviews.review SET review = ? WHERE id = ?;`
    const params = [req.body.review, req.params.id];

    db.query(sql, params, (err, results) => {
        if(err) {
            res.status(500).json({ error:err.message });
            return;
        }
        res.json({
            message: "Review sucessfully updated",
            data: results
        });
    });
});

//DELETE request to /api/movie/:id route deletes a movie when tested using Insomnia.
app.delete('api/movie/:id', (req, res) => {
    const sql = 'DELETE FROM movies WHERE id = ?'
    const params = [req.params.id]; 

    db.query(sql, params, (err, results) => {
        if(err) {
            res.status(500).json({ error:err.message });
            return;
        }
        res.json({
            message: "Movie successfully deleted from database",
            data: results
        });
    });
});

//Default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});

//Identify where to access the running app
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

