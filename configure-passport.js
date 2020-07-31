'use strict';

const passport = require('passport');
const passportLocal = require('passport-local');

const bcryptjs = require('bcryptjs');
const User = require('./models/user');

passport.use(
  'sign-up',
  new passportLocal.Strategy(
    { passReqToCallback: true },
    (req, username, password, callback) => {
      const role = req.body.role;
      console.log(role);
      bcryptjs
        .hash(password, 10)
        .then(hash => {
          return User.create({
            username,
            role,
            passwordHash: hash
          });
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

passport.use(
  'sign-in',
  new passportLocal.Strategy({}, (username, password, callback) => {
    let user;
    User.findOne({ username })
      .then(document => {
        if (!document) {
          return Promise.reject(new Error("There's no user with that email."));
        } else {
          user = document;
          return bcryptjs.compare(password, user.passwordHash);
        }
      })
      .then(result => {
        if (result) {
          callback(null, user);
        } else {
          return Promise.reject(new Error('Wrong password.'));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);

// Passport Strategy configuration
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
});
