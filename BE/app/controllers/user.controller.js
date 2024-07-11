const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Other functions...

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { email, ...updateData } = req.body;
    const updateUserProfile = await User.findByIdAndUpdate(req.userId, updateData, { new: true });
    if (!updateUserProfile) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updateUserProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get user info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("roles", "-__v");
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.currentPassword, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid current password' });
    }

    user.password = bcrypt.hashSync(req.body.newPassword, 8);
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};