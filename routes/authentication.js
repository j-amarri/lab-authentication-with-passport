'use strict';

const { Router } = require('express');
const authenticationRouter = Router();

// User model
const User = require('../models/user');
const passport = require('passport');

authenticationRouter.get('/sign-up', (req, res, next) => {
  res.render('authentication/sign-up');
});

authenticationRouter.post(
  '/signup',
  passport.authenticate('sign-up', {
    successRedirect: '/private',
    failureRedirect: '/authentication/sign-up'
  })
);

authenticationRouter.get('/sign-in', (req, res, next) => {
  res.render('authentication/sign-in');
});

authenticationRouter.post(
  '/sign-in',
  passport.authenticate('sign-in', {
    successRedirect: '/private',
    failureRedirect: '/authentication/sign-in'
  })
);

authenticationRouter.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = authenticationRouter;
