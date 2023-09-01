const router = require("express").Router();

const spotiControllers = require("../controllers/spoti");

module.exports = (db) => {
  router.post("/create", spotiControllers.addList(db));

  return router;
};
