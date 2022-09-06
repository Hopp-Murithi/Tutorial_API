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

    }

}