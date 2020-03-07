
--create the database
CREATE DATABASE IF NOT EXISTS badmovies;

--use db
USE badmovies;

--create a table of movies (favorites)
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    movie_id int,
    title VARCHAR(100),
    poster_path VARCHAR(100),
    release_date VARCHAR(100),
    popularity FLOAT(7,4)
);