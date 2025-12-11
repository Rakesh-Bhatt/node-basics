const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserByID,
  addNewUser,
  updateUser,
  deleteUser
 } = require('../controllers/userController');

const { validateUser } = require('../middleware/validateUser');
const upload = require("../middleware/upload")

router.get("/users", getUsers);
router.get("/users/:id", getUserByID);
router.post("/users",validateUser, addNewUser);
router.put("/users/:id", validateUser, updateUser)
router.delete("/users/:id", deleteUser)

router.post("/upload", upload.single("avatar"), (req, res) => {
  res.json({ message: "File uploaded successfully", file: req.file });
})

module.exports = router;