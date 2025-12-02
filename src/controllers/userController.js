const userService = require('../services/userService');

exports.getUsers = (req, res, next) => {
  try {
    const users = userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};
