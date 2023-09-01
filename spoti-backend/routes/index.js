const router = require("express").Router();

const spotiRoutes = require("./spoti");
const authRoutes = require("./auth");

module.exports = (db) => {
  router.use("/auth", authRoutes());
  router.use("/spoti", spotiRoutes(db));

  return router;
};
