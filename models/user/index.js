const bcrypt = require('bcrypt');
const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'summary_db_test'
});

const User = {};

User.create = (user) => {
  const password = bcrypt.hashSync(user.password, 10);

  return db.oneOrNone(`
    INSERT INTO Users
    (email, password_digest, number_of_bookmarks)
    VALUES
    ($1, $2, $3)
    RETURNING *;`,
    [ user.email, password, 0 ]
  );
};

User.findByEmail = (email) => {
  return db.oneOrNone(`
    SELECT *
    FROM users
    WHERE email = $1;`,
    [email]
  );
};

module.exports = User;
