const isAuth = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  return res.status(400).json({ msg: "Unauthorised" });
};

module.exports = isAuth