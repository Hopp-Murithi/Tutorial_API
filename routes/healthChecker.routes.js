const express = require('express');
const router = express.Router();
const { health } = require('../controllers/healthChecker');


router.get('/', health);


module.exports = router;