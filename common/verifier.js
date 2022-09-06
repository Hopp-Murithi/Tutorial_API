//defines validation logic

const user = require('../models/user');

module.exports = {
    verifyEmail: async(email) => {
        if (!email) {
            return res.status(404).json({ message: 'Email is required' })
        }
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(regex)) {
            return res.status(400).json({
                message: 'invalid email address'
            })
        }
        let User = await user.findOne({ email });
        if (User) {
            return res.status(400).json({ message: 'User already exists' })
        }

    },
    verifyFirstName: (firstName) => {
        if (!firstName) {
            return res.status(404).json({ message: 'First name is required' });
        }
        if (firstName.length < 3 || firstName.length > 20) {
            return res.status(411).json({ message: 'length must be between 3 and 20 characters' });
        }
    },
    verifyLastName: (lastName) => {
        if (!lastName) {
            return res.status(404).json({ message: 'First name is required' });
        }
        if (lastName.length < 3 || lastName.length > 20) {
            return res.status(411).json({ message: 'length must be between 3 and 20 characters' });
        }
    },
    verifyPassword: (password, confirmPassword) => {
        if (!password) {
            return res.status(404).json({ message: 'Password field is required' })
        }
        if (password.length < 5) {
            return res.status(411).json({ message: 'Password is too short' })
        }
        let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;
        if (!password.match(passRegex)) {
            return res.status(400).json({ message: 'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character' });
        }
        if (password !== confirmPassword) {
            return res.status(417).json({ message: 'passwords do not match' })
        }
    }

}