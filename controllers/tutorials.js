//Defines control logic for tutorial endpoints.

const ApiError = require("../middleware/error");
const Tutorial = require("../models/tutorialSchema");
const {
  verifyTitle,
  verifyContent,
  verifyTags,
} = require("../common/verifier");
const auth = require("../helpers/jwt.helper");

const getTutorials = async (req, res, next) => {
  try {
    const tutorial = await Tutorial.find();
    res.status(200).json(tutorial);
  } catch (err) {
    next(ApiError.notFound(err.message));
  }
};
const getOneTutorial = async (req, res, next) => {
  try {
    const tutorial = await Tutorial.findById({ _id: req.params._id });
    res.status(200).json(tutorial);
  } catch (err) {
    next(ApiError.notFound(err.message));
  }
};
const postTutorial = async (req, res, next) => {
  try {
    const {
      title,
      tags,
      content,
      author,
      image,
      videoUrl,
      description,
      postDate
    } = req.body;

    let titleValidation = verifyTitle(title);
    if (titleValidation.message) {
      return res.status(400).json({ message: titleValidation.message });
    }

    let contentValidation = verifyContent(content);
    if (contentValidation.message) {
      return res.status(400).json({ message: contentValidation.message });
    }

    let tagValidation = verifyTags(tags);
    if (tagValidation.message) {
      return res.status(400).json({ message: tagValidation.message });
    }

    const tut = await new Tutorial({
      title,
      tags,
      content,
      author,
      image,
      videoUrl,
      description,
      postDate
    }).save();
    console.log(tut);
    res.send(tut);
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
};

module.exports = { getTutorials, getOneTutorial, postTutorial };
