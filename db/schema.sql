-- Creates the database --
DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

-- Make all code affect movies_db --
USE movies_db;

--Create table 

CREATE TABLE movies (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    movie_name VARCHAR(100) NOT NULL
);

CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (movie_id)
    REFERENCES movies(id)
    ON DELETE SET NULL
    review TEXT NOT NULL 
)