//Defines control logic for creating new users
const user = require('../models/user');
const nodemailer = require('nodemailer');
const { phone } = require('phone');
const _ = require('lodash');
const bcrypt = require('bcrypt');


let mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USER_MAIL,
        pass: USER_SECRET
    }
});

let details = {
    from: USER_MAIL,
    to: user.email,
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



exports.users('', async(req, res) => {
    try {
        const email = await user.findOne({ email: req.body.email });
        const filterEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filterEmail.test(email.value)) return
        res.send('Please provide a valid email address');;
        if (email) {
            res.send('Email already exists');
        };

        const firstName = await user.find({ firstName: req.body.firstName });
        if (firstName.length < 3 || firstName.length > 20) return
        res.send('First name must be at least 3 characters and less than 20 characters');;
        const lastName = await user.find({ lastName: req.body.lastName });
        if (lastName.length < 3 || lastName.length > 20) return
        res.send('Last name must be at least 3 characters and less than 20 characters')

        const password = await user.find({ password: req.body.password });
        const confirmPassword = await user.find({ confirmPassword: req.body.confirmPassword });
        const filterPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;
        if (!filterPassword.test(password.value)) return
        res.send('Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character');
        if (password.value !== confirmPassword.value) return res.send('Passwords do not match');

        const phoneNumber = await user.find({ phoneNumber: req.body.phoneNumber });
        phone(phoneNumber.value);

        let User = new user(_.pick(req.body, ['firstName', 'lastName', 'email', 'phoneNumber', 'password']));

        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            return user.password = await bcrypt.hash(user.password, salt);
        });
        await User.save();


    } catch (err) {}


})