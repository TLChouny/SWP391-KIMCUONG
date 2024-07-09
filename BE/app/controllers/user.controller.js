const db = require("../models");
const User = db.user;

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    // Loại bỏ trường email khỏi req.body nếu có
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