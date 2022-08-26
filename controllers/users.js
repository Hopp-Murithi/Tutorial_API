//Defines control logic for creating new users
const user = require('../models/user');

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
        const filterPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;
        if (!filterPassword.test(password.value)) return res.send('Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character');




    } catch (err) {}


})