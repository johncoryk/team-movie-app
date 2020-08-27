const Movie = require('../models/movie');

const movieController = {};

movieController.index = (req, res, next) => {
  Movie.getAll()
    .then((movies) => {
      res.json({
        message: 'ok',
        data: { movies },
      });
    })
    .catch(next);
};

movieController.show = (req, res, next) => {
  Movie.getById(req.params.id)
    .then((movie) => {
      res.json({
        message: 'ok',
        data: { movie },
      });
    })
    .catch(next);
};

movieController.create = (req, res, next) => {
  new Movie({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    user_id: req.user.id,
  })
    .save()
    .then((movie) => {
      res.json({
        message: 'Movie added successfully!',
        data: { movie },
      });
    })
    .catch(next);
};

movieController.update = (req, res, next) => {
  Movie.getById(req.params.id)
    .then((movie) =>
      movie.update({
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre,
      })
    )
    .then((movie) => {
      res.json({
        message: 'Movie updated successfully!',
        data: { movie },
      });
    })
    .catch(next);
};

movieController.delete = (req, res, next) => {
  Movie.getById(req.params.id)
    .then((movie) => movie.delete())
    .then(() => {
      res.json({
        message: 'Movie deleted successfully!',
      });
    })
    .catch(next);
};

module.exports = movieController;