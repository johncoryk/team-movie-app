const db = require('../db/config');

class User {
  constructor({ id, username, email, password_digest }) {
    this.id = id || null;
    this.username = username;
    this.email = email;
    this.password_digest = password_digest;
  }

  static findByUserName() {
    return db.oneOrNone(`
      SELECT * FROM users WHERE username = $1
    `, username)
      .then(user => {
        if (user) return new this(user);
        throw new Error(`No user with username ${username} found`);
      })
  }

  save() {
    return db.one(`INSERT INTO users
    (username, email, password_digest)
    VALUES ($/username/, $/email/, $/password_digest) RETURNING *`, this)
      .then(user => Object.assign(this, user));
  }
}

module.exports = User;