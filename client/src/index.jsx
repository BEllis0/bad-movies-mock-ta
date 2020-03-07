import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    
    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
  }

  getMoviesFromDb () {
    fetch('/favorites')
      .then(response => {
        return response.json();
      })
      .then(favorites => {
        this.setState({ favorites });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getMoviesFromDb();
  }

  getMovies(id) {

    Axios.get(`/search/${id}`)
      .then(response => {
        return response.data.results;
      })
      .then(movies => {
        this.setState({ movies })
      })
      .catch(err => {
        console.log(err);
      })
  }

  saveMovie(movie) {

    fetch('/save', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(movie)
    })
    .then(response => {
      return response.json()
    })
    .then(favorites => {
      this.setState({ favorites })
    })
    .catch(err => {
      console.log(err);
    })
    
  }

  deleteMovie(movie) {
    console.log(movie)
    fetch('/delete', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(movie)
    })
      .then(response => {
        console.log(response);
        this.getMoviesFromDb();
      })
      .catch(err => {
        console.log(err);
      })
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search getMovies={this.getMovies} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies deleteMovie={this.deleteMovie} saveMovie={this.saveMovie} movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));