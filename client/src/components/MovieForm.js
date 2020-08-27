import React, { Component } from 'react';

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.movie ? props.movie.title : '',
      genre: props.movie ? props.movie.genre : '',
      description: props.movie ? props.movie.description : '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form
        onSubmit={
          this.props.isAdd
            ? e => this.props.handleFormSubmit('POST', e, this.state)
            : e =>
                this.props.handleFormSubmit(
                  'PUT',
                  e,
                  this.state,
                  this.props.movie.id
                )
        }
      >
        <input
          type='text'
          name='title'
          placeholder='title'
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='description'
          placeholder='description'
          value={this.state.description}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='genre'
          placeholder='genre'
          value={this.state.genre}
          onChange={this.handleChange}
        />
        <input
          type='submit'
          value={this.props.isAdd ? 'Add it!' : 'Edit it!'}
        />
      </form>
    );
  }
}

export default MovieForm;
