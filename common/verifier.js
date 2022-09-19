const user = require('../models/user')

module.exports = {
    verifyEmail: async(email) => {
        if (!email) {
            return { status: (404), message: 'Email is required' }
        }
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(regex)) {
            return { status: (400), message: 'invalid email address' }
        }
        let User = await user.findOne({ email });
        if (User) {
            return { status: (400), message: 'User already exists' }
        }

    },
    verifyFirstName: (firstName) => {
        if (!firstName) {
            return { status: (404), message: 'First name is required' }
        }
        if (firstName.length < 3 || firstName.length > 20) {
            return { status: (400), message: 'length must be between 3 and 20 characters' }
        }
    },
    verifyLastName: (lastName) => {
        if (!lastName) {
            return { status: (404), message: 'Last name is required' }
        }
        if (lastName.length < 3 || lastName.length > 20) {
            return { status: (400), message: 'length must be between 3 and 20 characters' }
        }
    },
    verifyPassword: (password, confirmPassword) => {
        if (!password) {
            return { status: (404), message: 'Password field is required' }
        }
        if (password.length < 5) {
            return { status: (400), message: 'Password is too short' }
        }
        let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;
        if (!password.match(passRegex)) {
            return { status: (400), message: 'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character' }
        }
        if (password !== confirmPassword) {
            return { status: (400), message: 'passwords do not match' }
        }
    },
    verifyPhone: (phoneNumber) => {
        if (!phoneNumber) {
            return { status: (404), message: 'Phone number is required' }
        }
        let phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
        if (!phoneNumber.match(phoneRegex)) {
            return { status: (400), message: 'Please add a valid phone number' }
        }
    }

};