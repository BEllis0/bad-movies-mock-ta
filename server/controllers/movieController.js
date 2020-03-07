const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre     

    // https://www.themoviedb.org/account/signup
    // get your API KEY

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    apiHelpers.getMovieGenres()
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        res.send(err);
      });
  },
  saveMovie: (req, res) => {

  },
  deleteMovie: (req, res) => {

  }
}