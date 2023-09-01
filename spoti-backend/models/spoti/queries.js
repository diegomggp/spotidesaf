const { sql } = require("slonik");

const insertList = (listName, listURL, userId) => sql.unsafe`
    INSERT INTO lists (
        list_name, list_url, created_by
    ) VALUES (
        ${listName}, ${listURL}, ${userId}
    )
`;

module.exports = {
  insertList,
};
