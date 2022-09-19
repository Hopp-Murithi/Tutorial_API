//Defines control logic for creating new users
const User = require('../models/user');
const nodemailer = require('nodemailer');
const verifier = require('../common/verifier')
const bcrypt = require('bcrypt');

module.exports.users = async(req, res) => {
    try {
        const { email, firstName, lastName, password, confirmPassword, phoneNumber } = req.body;
        console.log(email)

        verifier.verifyEmail(email);
        verifier.verifyFirstName(firstName);
        verifier.verifyLastName(lastName);
        verifier.verifyPassword(password, confirmPassword);
        verifier.verifyPhone(phoneNumber);


        const salt = await bcrypt.genSalt(Number(10));
        const hashedPassword = await bcrypt.hash(password, salt);
        await new User({...req.body, password: hashedPassword }).save();
        //nodemailer
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
            subject: `Welcome on board ${firstName}`,
            text: 'Hi there and welcome'

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