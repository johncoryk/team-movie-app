const db = require('../db/config');

class Movie {
    constructor({ id, title, description, genre, user_id }) {
        this.id = id || null;
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.user_id = user_id;
    }
}