import React, { Component } from 'react';

import Movie from './Movie';

import MovieForm from './MovieForm';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      dataLoaded: false,
      auth: props.auth,
      currentlyEditing: null,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setEditing = this.setEditing.bind(this);
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

  setEditing(id) {
    this.setState({
      currentlyEditing: id,
    });
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
        if (movie.id === this.state.currentlyEditing)
          return (
            <MovieForm
              movie={movie}
              handleFormSubmit={this.handleFormSubmit}
              isAdd={false}
              key={movie.id}
            />
          );
        else
          return (
            <Movie
              key={movie.id}
              movie={movie}
              auth={this.state.auth}
              setEditing={this.setEditing}
            />
          );
      });
    } else return <p>Loading...</p>;
  }

  render() {
    return (
      <div className='movielist'>
        {this.state.auth ? (
          <MovieForm isAdd={true} handleFormSubmit={this.handleFormSubmit} />
        ) : (
          ''
        )}
        {this.renderMovieList()}
      </div>
    );
  }
}

export default MovieList;
