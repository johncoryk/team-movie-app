import React from 'react';

const Movie = props => {
  return (
    <div className='movie'>
      <h3>{props.movie.title}</h3>
      <h4>{props.movie.genre}</h4>
      <p>{props.movie.description}</p>
      {props.auth ? (
        <span className='edit' onClick={() => props.setEditing(props.movie.id)}>
          Edit
        </span>
      ) : (
        ''
      )}
    </div>
  );
};

export default Movie;
