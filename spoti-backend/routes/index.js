const router = require("express").Router();

const spotiRoutes = require("./spoti");

module.exports = (db) => {
  router.use("/spoti", spotiRoutes(db));

  return router;
};
