//Defines endpoints for handling creation of new users

const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:_id", getOneUser);
router.put("/:_id", updateUser);
router.delete("/:_id", deleteUser);

module.exports = router;
