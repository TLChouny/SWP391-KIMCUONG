// exports.allAccess = (req, res) => {
//   res.status(200).json("Public Content.");
// };

// exports.userBoard = (req, res) => {
//   res.status(200).json("User Content.");
// };

// exports.adminBoard = (req, res) => {
//   res.status(200).json("Admin Content.");
// };

// exports.moderatorBoard = (req, res) => {
//   res.status(200).json("Moderator Content.");
// };

const db = require("../models");
const User = db.user;

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updateUserProfile = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateUserProfile) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updateUserProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};