const express = require('express');
const userMiddleware = require('../middleware/user.middleware');
const isAdmin = require('../middleware/user.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const router = express.Router();
router.get('/admin', userMiddleware, isAdmin,roleMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard!', admin: req.user });
});

router.get('/userProfile', userMiddleware, roleMiddleware(['admin', 'user']), (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}`, user: req.user });
});

module.exports = router;
