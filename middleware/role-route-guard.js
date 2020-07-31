'use strict';

const roleRouteGuard = allowedRoles => {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.role)) {
      next();
    } else {
      next(new Error('User is not authorized to see that page.'));
    }
  };
};

module.exports = roleRouteGuard;
