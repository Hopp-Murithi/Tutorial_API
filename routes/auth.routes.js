//Defines routes for logging in/out users
const express = require('express');
const router = express.Router();
const {auth} = require('../controllers/auth');


router.post('/', auth);

module.exports = router;