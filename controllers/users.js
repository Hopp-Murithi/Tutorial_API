//Defines control logic for creating new users
const user = require('../models/user');
const nodemailer = require('nodemailer');
const verifier = require('../common/verifier')
const _ = require('lodash');
const bcrypt = require('bcrypt');


let mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

let details = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_RECIPIENT,
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



module.exports.users = async(req, res) => {
    try {
        verifier.verifyEmail(email);
        verifier.verifyFirstName(firstName);
        verifier.verifyLastName(lastName);
        verifier.verifyPassword(password, confirmPassword);
        verifier.phoneNumber(phoneNumber);


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


    } catch (err) {
        res.status(500).send('Something went wrong');
        console.warn(err);
    }


}