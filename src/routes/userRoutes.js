const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserByID
 } = require('../controllers/userController');

router.get("/users", getUsers);
router.get("/users/:id", getUserByID);

router.post("/users", (req, res) => {
  const user = req.body;
  res.json({
    message: "User created!",
    user
  });
});

module.exports = router;
