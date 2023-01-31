//defines end points for CRUD operations in tutorials

const express = require("express");
const router = express.Router();
const {
  getTutorials,
  getOneTutorial,
  postTutorial,
} = require("../controllers/tutorials");

router.post("/", postTutorial);
router.get("/", getTutorials);
router.get("/:_id", getOneTutorial);

module.exports = router;
