module.exports = (db) => async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(errors[400]);

  const response = await selectUser(await db)(email, hash.compare(password));

  if (!response.ok) return next(errors[response.error_code || 500]);

  serialize(res, response.content, { value: 1, type: "d" });

  res.status(200).json({
    success: true,
  });
};
