import React from 'react';
import Axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedMovieId: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    Axios.get('/genres')
      .then(response => {
        return response.data.genres;
      })
      .then(genres => {
        this.setState({ genres })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleChange(event) {
    this.setState({
      selectedMovieId: event.target.value
    });
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}
  
        <select value={this.state.selectedMovieId} onChange={this.handleChange}>
        {this.state.genres.map(item => {
          return (
          <option key={item.id} value={item.id}>{item.name}</option>
          )
        })}

        </select>
        <br/><br/>

        <button onClick={(e) => { e.preventDefault(); this.props.getMovies(this.state.selectedMovieId)}}>Search</button>

      </div>
    );
  }
}

export default Search;