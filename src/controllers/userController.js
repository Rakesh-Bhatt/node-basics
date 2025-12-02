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
};

exports.addNewUser = (req, res, next) => {
  try {
    const user = userService.addNewUser(req.body)

    if(user) {
      res.status(201)
      res.json(user)
    } else {
      res.status(503)
      res.json ({
        message: "Failed creating a new user"
      })
    }
  } catch {
    next(err);
  }
};

exports.updateUser = (rea, res, next) => {
  try {
    const updatedUser = userService.updateUser(req.params.id, req.body)

    if (updatedUser) {
      res.status(200)
      res.json({
        message: "User Updated Successfully",
        body: updatedUser
      })

    } else {
      res.status(404)
      res.json({
        message: "User with given id could not be Found!!"
      })
    }

  } catch {
    next(err)
  }
}