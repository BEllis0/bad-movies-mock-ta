var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
const Axios = require('axios');
const { API_KEY } = require('../config.js');
const db = require('../db/sql/index.js')


// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup


//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));


//OPTION 1: Use regular routes

app.get('/genres', function(req, res) {
  // make an axios request to get the official list of genres from themoviedb
  apiHelpers.getMovieGenres()
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.send(err);
      });
});

app.get('/search/:movieId', function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  apiHelpers.getMovies(req.params.movieId)
    .then(response => {
      console.log(response)
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    })
});

//get saved favorites on page load
app.get('/favorites', (req, res) => {
  const getQuery = `SELECT * FROM movies`;

  db.connection.query(getQuery, (error, getResults, getFields) => {
    if (error) {
      res.status(400).json({message: "Error getting favorites", error: err});
    } else {
      res.status(200).json(getResults);
    }
  });
});


app.post('/save', function(req, res) {

  //TODO modify query to not add duplicates
  //save movie as favorite
  const postQuery = `INSERT INTO movies (movie_id, title, poster_path, release_date, popularity) VALUES (
    ${req.body.id}, 
    "${req.body.title}",
    "${req.body.poster_path}",
    "${req.body.release_date}",
    ${req.body.popularity}
    )`;

  const getQuery = `SELECT * FROM movies`;

    db.connection.query(postQuery, (err, results, fields) => {
      if (err) {
        res.status(400).json({message: "Error adding item to favorites", error: err});
        //add error saving to html
      } else {
        //get db records and send in response
        db.connection.query(getQuery, (error, getResults, getFields) => {
          if (error) {
            res.status(400).json({message: "Error getting favorites", error: err});
          } else {
            res.status(200).json(getResults);
          }
        });
      }
    })

});

app.post('/delete', function(req, res) {

  console.log(req.body.movie_id)

  const deleteQuery = `DELETE FROM movies WHERE movie_id = ${req.body.movie_id}`

  db.connection.query(deleteQuery, (err, results, fields) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).send("successfully deleted");
    }
  });

});


//OPTION 2: Use Express Router

//IF you decide to go with this option, delete OPTION 1 to continue

//Routes

const movieRoutes = require('./routes/movieRoutes.js');

//Use routes
app.use('/movies', movieRoutes);


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
