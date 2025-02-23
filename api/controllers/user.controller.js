const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await crypto.createHmac('sha256', process.env.JWT_SECRET).update(password).digest('hex');
    let userRole = 'user';
    
    if (role && role === 'admin' && req.user && req.user.role === 'admin') {
      userRole = 'admin';
    }

    const user = await User.create({ name, email, password: hashedPassword, role: userRole });
    const userData = user.get({ plain: true }); 
    delete userData.password; 
    res.status(201).json(userData);
  } catch (error) {
    next(error)
  }
};

exports.login = async (req, res, next) => {
  // console.log('Request Body:', req.body);
  try {
    const { role, email, name, password } = req.body;

    // if (!password || !role) {
    //   return res.status(400).json({ message: 'Role and password are required' });
    // }
    let user;

    if (role === 'user') {
      user = await User.findOne({ where: { email } });
    } else if (role === 'admin') {
      user = await User.findOne({ where: { name } });
    }

    if (user === '') {
      return res.status(400).json({ message: 'User not found' });
    }
    let updateUser;

    if (role === 'user') {
      updateUser = await User.findOne({ where: { name } });

      if (updateUser === '') {
        return res.status(400).json({ message: 'User Name not found' });
      }
    } 

    const hashedPassword = await crypto.createHmac('sha256', process.env.JWT_SECRET).update(req.body.password).digest('hex');
    if (hashedPassword !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }

};

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
