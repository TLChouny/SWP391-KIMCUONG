// pointController.js
const db = require("../models");
const User = db.user;

exports.addPoints = async (userId, points) => {
  try {
    const user = await User.findById(userId);
    user.points += points;
    await user.save();
  } catch (error) {
    console.error("Error adding points:", error);
    throw error;
  }
};