'use strict';

const { Router } = require('express');
const router = Router();

const routeGuard = require('../middleware/route-guard');
const roleRouteGuard = require('./../middleware/role-route-guard');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('authentication/private');
});

router.get(
  '/student-dashboard',
  routeGuard,
  roleRouteGuard(['student', 'assistant', 'teacher']),
  (req, res) => {
    res.render('student');
  }
);

router.get(
  '/assistant-dashboard',
  routeGuard,
  roleRouteGuard(['assistant', 'teacher']),
  (req, res, next) => {
    res.render('assistant');
  }
);

router.get(
  '/teacher-dashboard',
  routeGuard,
  roleRouteGuard(['teacher']),
  (req, res, next) => {
    res.render('teacher');
  }
);

module.exports = router;
