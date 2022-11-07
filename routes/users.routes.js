//Defines endpoints for handling creation of new users

const express = require('express');
const router = express.Router();
const { users } = require('../controllers/users');


router.post('/', users)

module.exports = router;