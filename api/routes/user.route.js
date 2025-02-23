const express = require('express');
const { register, login , generateToken } = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/token', generateToken);

module.exports = router;
