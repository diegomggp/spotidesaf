const { createList } = require("../../models/spoti");
const errors = require("../../misc/errors");

module.exports = (db) => async (req, res, next) => {
  const { listName, listURL, userId } = req.body;

  const newList = await createList(await db)(listName, listURL, userId);

  if (!newList.ok) return next(errors[500]);

  res.status(200).json({
    success: true,
    data: newList.data,
  });
};
