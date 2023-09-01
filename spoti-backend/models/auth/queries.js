const { sql } = require("slonik");

const insertUser = (username, email, password) => sql.unsafe`
    INSERT INTO users (
        username, email, password
        ) VALUES (
        ${username}, ${email}, ${password}
        );
`;

const selectByEmail = (email) => sql.unsafe`
    SELECT email, username, password, id
    FROM users
    WHERE email LIKE ${email};
`;

module.exports = {
  insertUser,
  selectByEmail,
};
