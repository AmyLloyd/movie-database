//import express.js server
const express = require('express');

//import routes
const api = require('./routes/index.js');

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
        database: 'movie_db'
    },
    console.log(`Connected to the movie_database.`)
);

//Query database
db.query('SELECT * FROM movie', function (err, results)
{
    console.log(results);
});

//Default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});

//Identify where to access the running app
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

