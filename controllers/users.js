//Defines control logic for creating new users
const user = require('../models/user');
const nodemailer = require('nodemailer');
const { phone } = require('phone');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const emailVerifier = require('../common/verifier')


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
        const email = await user.findOne({ email: req.body.email });
        const firstName = await user.find({ firstName: req.body.firstName });
        const lastName = await user.find({ lastName: req.body.lastName });
        const password = await user.find({ password: req.body.password });
        const confirmPassword = await user.find({ confirmPassword: req.body.confirmPassword });
        const phoneNumber = await user.find({ phoneNumber: req.body.phoneNumber });

        

        const filterEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
        // This will perform all email checks
        emailVerifier.verifyEmail(email);
        if (email) {
            res.send('Email already exists');
        };

        if (!firstName) return res.send('First Name is required');
        if (firstName.length < 3 || firstName.length > 20) return
        res.send('First name must be at least 3 characters and less than 20 characters');;

        if (!lastName) return res.send('Last Name is required');
        if (lastName.length < 3 || lastName.length > 20) return
        res.send('Last name must be at least 3 characters and less than 20 characters')

        if (!password) return res.send('PassWord is required');
        const filterPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;
        if (!filterPassword.test(password.value)) return
        res.send('Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character');
        if (!confirmPassword) return res.send(' Please confirm password');
        if (password.value !== confirmPassword.value) return res.send('Passwords do not match');

        if (!phoneNumber) return res.send('Phone Number is required');
        phone(phoneNumber.value);

        let User = new user(_.pick(req.body, ['firstName', 'lastName', 'email', 'phoneNumber', 'password']));

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