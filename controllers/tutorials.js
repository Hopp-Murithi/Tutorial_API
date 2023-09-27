//Defines control logic for tutorial endpoints.

const ApiError = require("../middleware/error");
const Tutorial = require("../models/tutorialSchema");
const {
  verifyTitle,
  verifyTags,
  verifyUrl,
  verifyDescription,
  verifyAuthor,
} = require("../common/verifier");
//const auth = require("../helpers/jwt.helper");

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
const createTutorial = async (req, res, next) => {
  try {
    const { title, tags, author, description, url } = req.body;

    console.log(title);

    let descriptionValidation = await verifyDescription(description);
    if (descriptionValidation.message) {
      return res.status(400).json({ message: descriptionValidation.message });
    }

    let titleValidation = verifyTitle(title);
    if (titleValidation.message) {
      return res.status(400).json({ message: titleValidation.message });
    }

    let urlValidation = verifyUrl(url);
    if (urlValidation.message) {
      return res.status(400).json({ message: urlValidation.message });
    }

    let tagValidation = verifyTags(tags);
    if (tagValidation.message) {
      return res.status(400).json({ message: tagValidation.message });
    }

    let authorValidation = verifyAuthor(author);
    if (authorValidation.message) {
      return res.status(400).json({ message: authorValidation.message });
    }

    const createdAt = Date.now();

    const tut = await new Tutorial({
      ...req.body,
      postDate: createdAt,
      lastUpdate:createdAt
    }).save();
    return res.status(201).json(tut);
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
};

const updateTutorial = async(req,res,next) =>{
  try {
    const addInfo = await Tutorial.findByIdAndUpdate(
      req.params._id,
      {
        title: req.body.title,
        url: req.body.url,
        description: req.body.description,
        lastUpdate:Date.now()
      },
      { new: true }
    );

    res.status(201).send(addInfo);
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
} 

const deleteTutorial = async(req,res,next) =>{
  try {
    const tutorial = await Tutorial.findByIdAndRemove(req.params._id);
    if (!tutorial) return res.status(404).send('Tutorial not found.');
    res.status(204).send(tutorial);
  } catch (err) {
    next(ApiError.internalServerError(err.message));
  }
}

module.exports = { getTutorials, getOneTutorial, createTutorial,updateTutorial,deleteTutorial };
