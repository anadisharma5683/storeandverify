
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 👇 Import the export function from utils folder
const exportUsersToSheet = require('../utils/exportToSheet');

// ✅ Route 1: Check user logic
router.post('/check-user', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ status: 'error', message: 'All fields are required' });
  }

  try {
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail && existingUsername) {
      if (existingEmail.username === username) {
        if (existingEmail.password === password) {
          return res.json({ status: 'old', message: 'Old user, login successful' });
        } else {
          return res.json({ status: 'wrong', message: 'Wrong password' });
        }
      } else {
        return res.status(409).json({ status: 'error', message: 'Email already exists' });
      }
    }

    if (existingEmail) {
      return res.status(409).json({ status: 'error', message: 'Email already exists' });
    }

    if (existingUsername) {
      return res.status(409).json({ status: 'error', message: 'Username already exists' });
    }

    const newUser = new User({ email, username, password });
    await newUser.save();
    return res.json({ status: 'new', message: 'New user created' });

  } catch (err) {
    console.error('❌ Server error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});


// ✅ Route 2: Export users to Google Sheet
router.get('/export-users', async (req, res) => {
  try {
    const message = await exportUsersToSheet();
    res.json({ success: true, message });
  } catch (error) {
    console.error('❌ Export Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to export users to Google Sheet' });
  }
});

module.exports = router;
