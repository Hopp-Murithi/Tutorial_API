//defines end points for CRUD operations in tutorials

const express = require("express");
const router = express.Router();
const {
  getTutorials,
  getOneTutorial,
  createTutorial,
  updateTutorial,
  deleteTutorial
} = require("../controllers/tutorials");

router.post("/",createTutorial);
router.get("/", getTutorials);
router.get("/:_id", getOneTutorial);
router.put('/:_id', updateTutorial);
router.delete("/:_id",deleteTutorial)

module.exports = router;
