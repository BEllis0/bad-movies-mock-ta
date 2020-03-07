const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file
let getGenreOptions = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`

const getMovieGenres = () => {
    return new Promise((resolve, reject) => {
        request(getGenreOptions, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body))
            }
        }); 
    });
};

const getMovies = (genreId) => {
    return new Promise((resolve, reject) => {

        let getMovieOptions = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`;

        request(getMovieOptions, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
};

module.exports.getMovieGenres = getMovieGenres;
module.exports.getMovies = getMovies;