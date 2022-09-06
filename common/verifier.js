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
    }

}