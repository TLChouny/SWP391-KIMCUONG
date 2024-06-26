const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmailOrPhoneNumber = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (user) {
      res.status(400).json({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }

      if (user) {
        res.status(400).json({ message: "Failed! Email is already in use!" });
        return;
      }

      // Phone Number
      User.findOne({
        phoneNumber: req.body.phoneNumber,
      }).exec((err, user) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }

        if (user) {
          res
            .status(400)
            .json({ message: "Failed! Phone number is already in use!" });
          return;
        }

        next();
      });
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmailOrPhoneNumber,
  checkRolesExisted,
};

module.exports = verifySignUp;
