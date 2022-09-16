//Defines control logic for creating new users
const user = require('../models/user');
const nodemailer = require('nodemailer');
const verifier = require('../common/verifier')
const bcrypt = require('bcrypt');





module.exports.users = async(req, res) => {
    try {
        const { email, firstName, lastName, password, confirmPassword, phoneNumber } = req.body


        let emailValidation = verifier.verifyEmail(email);
        if (emailValidation.status === 404 || emailValidation.status === 400) {
            res.status(emailValidation.status).json({ message: emailValidation.message });
        }
        let firstNameValidation = verifier.verifyFirstName(firstName);
        if (firstNameValidation.status === 404 || firstNameValidation.status === 411) {
            res.status(firstNameValidation.status).json({ message: firstNameValidation.message });
        }
        let lastNameValidation = verifier.verifyLastName(lastName);
        if (lastNameValidation.status === 404 || lastNameValidation.status === 411) {
            res.status(lastNameValidation.status).json({ message: lastNameValidation.message });
        }
        let passwordValidation = verifier.verifyPassword(password, confirmPassword);
        if (passwordValidation.status === 404 || passwordValidation.status === 411) {
            res.status(passwordValidation.status).json({ message: passwordValidation.message });
        }
        let phoneValidation = verifier.verifyPhone(phoneNumber);
        if (phoneValidation.status === 404 || phoneValidation === 400) {
            res.status(phoneValidation.status).json({ message: phoneValidation.message });
        }

        let User = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            phone: req.body.phoneNumber

        })

        bcrypt.genSalt(10, async(err, salt) => {
            if (err) throw err;
            return user.password = await bcrypt.hash(user.password, salt);
        });
        await User.save();
        let mailer = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        let details = {
            from: process.env.SMTP_USER,
            to: user.password,
            subject: `Welcome on board`,
            text: 'Hi there and welcome'

        }
        mailer.sendMail(details, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('email sent', info);
            }
        })



    } catch (err) {
        res.status(500).send('Something went wrong');
        console.warn(err);
    }


}