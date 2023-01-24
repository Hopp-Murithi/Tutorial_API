//Defines control logic for creating new users
const User = require("../models/user");
const nodemailer = require("nodemailer");
const {
  verifyEmail,
  verifyFirstName,
  verifyLastName,
  verifyPassword,
  verifyPhone,
} = require("../common/verifier");
const bcrypt = require("bcrypt");
const ApiError = require("../middleware/error");

const createUser = async (req, res, next) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      phoneNumber,
    } = req.body;
    console.log(email);

    let emailValidation = await verifyEmail(email);
    if (emailValidation.message) {
      return res.status(400).json({ message: emailValidation.message });
    }

    let firstNameValidation = verifyFirstName(firstName);
    if (firstNameValidation.message) {
      return res.status(400).json({ message: firstNameValidation.message });
    }
    let lastNameValidation = verifyLastName(lastName);
    if (lastNameValidation.message) {
      return res.status(400).json({ message: lastNameValidation.message });
    }

    let passwordValidation = verifyPassword(password, confirmPassword);
    if (passwordValidation.message) {
      return res.status(400).json({ message: passwordValidation.message });
    }
    let phoneValidation = verifyPhone(phoneNumber);
    if (phoneValidation.message) {
      return res.status(400).json({ message: phoneValidation.message });
    }

    const salt = await bcrypt.genSalt(Number(10));

    const hashedPassword = await bcrypt.hash(password, salt);

    const regs = await new User({
      ...req.body,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    }).save();

    console.log(regs);

    //node mailer
    let mailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let details = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `Welcome on board ${firstName} ${lastName}`,
      text: "Hi there and welcome to HOPP Softwares Inc. We are glad to have you on board. We hope you enjoy your stay with us.",
    };
    mailer.sendMail(details, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("email sent", info);
      }
    });

    res.status(200).json({ message: "email sent" });
  } catch (err) {
    next(ApiError.internalServerError(err.message));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (err) {
    next(ApiError.internalServerError(err.message));
  }
};

const getOneUser = async (req, res, next) => {
  try {
    const oneUser = await User.findOne({ _id: req.params._id })
      .select("-password")
      .select("-confirmPassword");

    res.send(oneUser);
  } catch (err) {
    next(ApiError.notFound(err.message));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const addInfo = await User.findByIdAndUpdate(
      req.params._id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
      },
      { new: true }
    );

    res.send(addInfo);
  } catch (err) {
    next(ApiError.badRequest(err.message));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findOneAndUpdate({ _id: req.params._id }, { deleted: true });

    const undeleted = await User.find({ deleted: false });
    res.send(undeleted);
    
  } catch (err) {
    next(ApiError.internalServerError(err.message));
  }
};

module.exports = { createUser, getUsers, getOneUser, updateUser, deleteUser };
