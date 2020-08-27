const db = require('../db/config');

class Movie {
    constructor({ id, title, description, genre, user_id }) {
        this.id = id || null;
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.user_id = user_id;
    }
    
    static getAll() {
        return db
            .manyOrNone(`SELECT * FROMmovies ORDER BY id ASC`)
            .then((movies)=> movies.map((movie) => new this(movie)));
    }

    static getById(id){
        return db  
            .oneOrNone(`SELECT * FROM movies WHERE id = $1`, [id])
            .then((movie) => {
                if (movie) return new this(movie);
                throw new Error (`Movie ${id} not found`);
            });
    }

    save(){
        return db
            .one(
                `INSERT INTO movies
                (title, description, genre, user_id)
                VALUES ($/title/, $/description/, $/genre/, $/user_id/)
                RETURNING *`,
                    this
            )
            .then((movie)=> Object.assign(this.movie));
    }

    update(changes){
        Object.assign(this, changes);
        return db
            .one(
                `
            UPDATE movies SET
            title = $/title/,
            description = $/description/,
            genre = $/genre/
            WHERE id = $/id/
            RETURNING *
            `, 
                this
            )
            .then((movie)=> Object.assign(this.movie));
    }

    delete(){
        return db.none(`DELETE FROM movies WHERE id = $1`, this.id);
    }

}

module.exports = Movie;
