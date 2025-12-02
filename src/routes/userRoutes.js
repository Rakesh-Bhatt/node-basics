const express = require("express");
const router = express.Router();
const { getUsers } = require('../controllers/userController');

router.get('/users', getUsers);

router.post("/users", (req, res) => {
  const user = req.body;
  res.json({
    message: "User created!",
    user
  });
});

module.exports = router;
