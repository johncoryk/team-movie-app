import React, { Component } from 'react';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      dataLoaded: false,
      auth: props.auth,
    };
  }

  componentDidMount() {
    this.getAllMovies();
  }

  getAllMovies() {
    fetch('/api/movies', { credentials: 'include' })
      .then(res => res.json())
      .then(res => {
        this.setState({
          movies: res.data.movies,
          dataLoaded: true,
        });
      })
      .catch(err => console.log(err));
  }

  handleFormSubmit(method, e, data, id) {
    e.preventDefault();
    fetch(`/api/movies/${id || ''}`, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.getAllMovies();
      })
      .catch(err => console.log(err));
  }

  renderMovieList() {
    if (this.state.dataLoaded) {
      return this.state.movies.map(movie => {
        return <Movie key={movie.id} movie={movie} />;
      });
    } else return <p>Loading...</p>;
  }

  render() {
    return <div className='movielist'>{this.renderMovieList()}</div>;
  }
}

export default MovieList;
