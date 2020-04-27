const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide both email and password." });
  }
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
    const newUser = new User({ email, password });
    newUser.save(err => {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(newUser), email });
    });
  });
};

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user), email: req.user.email });
};
