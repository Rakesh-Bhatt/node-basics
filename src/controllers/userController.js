const userService = require('../services/userService');

exports.getUsers = (req, res, next) => {
  try {
    const users = userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserByID = (req, res, next) => {
  try{
    const user = userService.getUserByID(Number(req.params.id));

    if (user) {
      res.json(user);
    } else {
      res.status(404)
      res.json({
        message: "User not found by given Id"
      });
    }
  } catch(err) {
    next(err);
  }
}
