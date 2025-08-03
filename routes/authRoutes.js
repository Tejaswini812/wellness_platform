const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
      message: 'Signup successful'
    });
  } catch (err) {
    console.error('Signup Error:', err);
    return res.status(500).json({ success: false, message: 'Server error during signup' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// Users Count Route
router.get('/users-count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    return res.json({ success: true, count });
  } catch (err) {
    console.error('Count Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to get users count' });
  }
});

// Delete All Users Route
router.delete('/delete-all-users', async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ success: true, message: 'All users deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ success: false, message: 'Error deleting users' });
  }
});

module.exports = router;