const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserByID,
  addNewUser
 } = require('../controllers/userController');

router.get("/users", getUsers);
router.get("/users/:id", getUserByID);
router.post("/users", addNewUser);
