const user = require('../models/user')

module.exports = {
    verifyEmail: async(email) => {

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const emailExists = await user.findOne({ email });

        if (!email) {
            return { message: 'Email is required' }
        } else if (!emailRegex.test(email)) {
            return { message: "Invalid email" };
        } else if (emailExists) {
            return { message: "Email already exists" };
        } else {
            return true;
        }

    },
    verifyFirstName: (firstName) => {
        if (!firstName) {
            return { message: 'First name is required' }
        } else if (firstName.length < 3 || firstName.length > 20) {
            return { message: 'length must be between 3 and 20 characters' }
        } else {
            return true;
        }
    },
    verifyLastName: (lastName) => {
        if (!lastName) {
            return { message: 'Last name is required' }
        } else if (lastName.length < 3 || lastName.length > 20) {
            return { message: 'length must be between 3 and 20 characters' }
        } else {
            return true;
        }
    },
    verifyPassword: (password, confirmPassword) => {

        let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;
        if (!password) {
            return { message: 'Password field is required' }
        } else if (password.length < 5) {
            return { message: 'Password is too short' }
        } else if (!passRegex.test(password)) {
            return { message: 'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character' }
        } else if (password !== confirmPassword) {
            return { message: 'passwords do not match' }
        } else {
            return true;
        }
    },
    verifyPhone: (phoneNumber) => {
        let phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
        if (!phoneNumber) {
            return { message: 'Phone number is required' }
        } else if (!phoneRegex.test(phoneNumber)) {
            return { message: 'Please add a valid phone number' }
        } else {
            return true;
        }
    }

};