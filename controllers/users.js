//Defines control logic for creating new users
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { verifyEmail, verifyFirstName, verifyLastName, verifyPassword, verifyPhone } = require('../common/verifier');
const bcrypt = require('bcrypt');

module.exports.users = async(req, res) => {
    try {
        const { email, firstName, lastName, password, confirmPassword, phoneNumber } = req.body;
        console.log(email)

        let emailValidation = await verifyEmail(email);
        if (emailValidation.message) { return res.status(400).json({ message: emailValidation.message }); }

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
        const regs = await new User({...req.body, password: hashedPassword }).save();
        regs.confirmPassword = null;
        console.log(regs)
        let mailer = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        let details = {
            from: process.env.SMTP_USER,
            to: email,
            subject: `Welcome on board ${firstName} ${lastName}`,
            text: 'Hi there and welcome to HOPP Softwares Inc. We are glad to have you on board. We hope you enjoy your stay with us.'

        }
        mailer.sendMail(details, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('email sent', info);
            }
        })

        res.status(200).json({ message: 'email sent' })


    } catch (err) {
        res.status(500).send('Something went wrong');
        console.warn(err);
    }


}