const { sql } = require("slonik");

const insertUser = (username, email, password) => sql.unsafe`
INSERT INTO users (
    username, email, password
    ) VALUES (
    ${username}, ${email}, ${password}
    );
`;

module.exports = {
  insertUser,
};
