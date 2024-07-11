// point.model.js

const mongoose = require("mongoose");

const PointSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  points: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
});

const Point = mongoose.model("Point", PointSchema);

module.exports = Point;
